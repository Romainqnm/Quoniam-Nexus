#[cfg(windows)]
use std::process::Command;

use anyhow::Result;
#[cfg(windows)]
use anyhow::Context;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct DebloatReport {
    pub registry_changes: Vec<String>,
    pub tasks_disabled: Vec<String>,
    pub task_failures: Vec<String>,
}

#[cfg(windows)]
pub fn disable_telemetry() -> Result<DebloatReport> {
    let mut report = DebloatReport {
        registry_changes: Vec::new(),
        tasks_disabled: Vec::new(),
        task_failures: Vec::new(),
    };

    set_telemetry_registry_values(&mut report)?;
    disable_tracking_tasks(&mut report);

    Ok(report)
}

#[cfg(not(windows))]
pub fn disable_telemetry() -> Result<DebloatReport> {
    anyhow::bail!(
        "Le debloat confidentialité est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}

#[cfg(windows)]
fn set_telemetry_registry_values(report: &mut DebloatReport) -> Result<()> {
    use winreg::enums::HKEY_LOCAL_MACHINE;
    use winreg::RegKey;

    let path = r"SOFTWARE\Policies\Microsoft\Windows\DataCollection";
    let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
    let (key, _) = hklm
        .create_subkey(path)
        .context("Impossible d'ouvrir/créer la clé de politique DataCollection")?;

    key.set_value("AllowTelemetry", &0u32)
        .context("Impossible d'écrire AllowTelemetry=0")?;
    report
        .registry_changes
        .push(format!("HKLM\\{path}\\AllowTelemetry=0"));

    Ok(())
}

#[cfg(windows)]
fn disable_tracking_tasks(report: &mut DebloatReport) {
    let tasks = [
        r"\Microsoft\Windows\Application Experience\Microsoft Compatibility Appraiser",
        r"\Microsoft\Windows\Application Experience\ProgramDataUpdater",
        r"\Microsoft\Windows\Autochk\Proxy",
        r"\Microsoft\Windows\Customer Experience Improvement Program\Consolidator",
        r"\Microsoft\Windows\Customer Experience Improvement Program\UsbCeip",
        r"\Microsoft\Windows\DiskDiagnostic\Microsoft-Windows-DiskDiagnosticDataCollector",
    ];

    for task in tasks {
        let output = Command::new("schtasks")
            .args(["/Change", "/TN", task, "/Disable"])
            .output();

        match output {
            Ok(result) if result.status.success() => {
                report.tasks_disabled.push(task.to_string());
            }
            Ok(result) => {
                let stderr = String::from_utf8_lossy(&result.stderr);
                let stdout = String::from_utf8_lossy(&result.stdout);
                report.task_failures.push(format!(
                    "{} (code {:?}): {} {}",
                    task,
                    result.status.code(),
                    stdout.trim(),
                    stderr.trim()
                ));
            }
            Err(error) => {
                report
                    .task_failures
                    .push(format!("{}: {}", task, error));
            }
        }
    }
}