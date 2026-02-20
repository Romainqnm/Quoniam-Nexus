#[cfg(windows)]
use std::fs;
#[cfg(windows)]
use std::path::{Path, PathBuf};

#[cfg(windows)]
use std::process::Command;
#[cfg(windows)]
use std::thread;
#[cfg(windows)]
use std::time::{Duration, Instant};

use anyhow::{bail, Result};
#[cfg(windows)]
use anyhow::Context;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize)]
pub struct CleanerReport {
    pub scanned_paths: Vec<String>,
    pub removed_entries: u64,
    pub failed_entries: u64,
    pub failures: Vec<String>,
}

#[derive(Debug, Clone, Copy, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DeepCleanSelection {
    pub clean_windows_temp: bool,
    pub clean_windows_update: bool,
    pub clean_browser_cache: bool,
    pub clean_prefetch: bool,
}

impl DeepCleanSelection {
    fn all() -> Self {
        Self {
            clean_windows_temp: true,
            clean_windows_update: true,
            clean_browser_cache: true,
            clean_prefetch: true,
        }
    }
}

impl CleanerReport {
    #[cfg(windows)]
    fn new() -> Self {
        Self {
            scanned_paths: Vec::new(),
            removed_entries: 0,
            failed_entries: 0,
            failures: Vec::new(),
        }
    }
}

#[cfg(windows)]
pub fn deep_clean() -> Result<CleanerReport> {
    deep_clean_selected_impl(DeepCleanSelection::all())
}

#[cfg(windows)]
pub fn deep_clean_selected(selection: DeepCleanSelection) -> Result<CleanerReport> {
    deep_clean_selected_impl(selection)
}

#[cfg(windows)]
fn deep_clean_selected_impl(selection: DeepCleanSelection) -> Result<CleanerReport> {
    let mut report = CleanerReport::new();

    if selection.clean_windows_temp {
        for target in windows_temp_targets() {
            report.scanned_paths.push(target.display().to_string());
            if target.exists() {
                purge_directory_contents(&target, &mut report)
                    .with_context(|| format!("Impossible d'énumérer {}", target.display()))?;
            }
        }
    }

    if selection.clean_windows_update {
        clean_windows_update_download_cache(&mut report)?;
    }

    if selection.clean_browser_cache {
        clean_chromium_caches(&mut report)?;
    }

    if selection.clean_prefetch {
        let target = prefetch_target();
        report.scanned_paths.push(target.display().to_string());
        if target.exists() {
            purge_directory_contents(&target, &mut report)
                .with_context(|| format!("Impossible d'énumérer {}", target.display()))?;
        }
    }

    Ok(report)
}

#[cfg(not(windows))]
pub fn deep_clean() -> Result<CleanerReport> {
    bail!(
        "Le deep clean est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}

#[cfg(not(windows))]
pub fn deep_clean_selected(_selection: DeepCleanSelection) -> Result<CleanerReport> {
    bail!(
        "Le deep clean est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}

#[cfg(windows)]
fn windows_temp_targets() -> Vec<PathBuf> {
    let mut targets = Vec::new();

    if let Some(temp) = std::env::var_os("TEMP") {
        targets.push(PathBuf::from(temp));
    }

    let system_temp = std::env::temp_dir();
    if !targets.iter().any(|item| item == &system_temp) {
        targets.push(system_temp);
    }

    targets.push(PathBuf::from(r"C:\Windows\Temp"));

    targets
}

#[cfg(windows)]
fn prefetch_target() -> PathBuf {
    PathBuf::from(r"C:\Windows\Prefetch")
}

#[cfg(windows)]
fn clean_windows_update_download_cache(report: &mut CleanerReport) -> Result<()> {
    let wu_cache = PathBuf::from(r"C:\Windows\SoftwareDistribution\Download");
    report.scanned_paths.push(wu_cache.display().to_string());

    stop_service_and_wait("wuauserv", Duration::from_secs(30))
        .context("Impossible d'arrêter le service wuauserv")?;

    let cleanup_result = if wu_cache.exists() {
        purge_directory_contents(&wu_cache, report)
            .with_context(|| format!("Impossible d'énumérer {}", wu_cache.display()))
    } else {
        Ok(())
    };

    let restart_result = start_service_and_wait("wuauserv", Duration::from_secs(30))
        .context("Impossible de redémarrer le service wuauserv");

    if let Err(clean_error) = cleanup_result {
        if let Err(restart_error) = restart_result {
            bail!(
                "Nettoyage Windows Update échoué: {clean_error}; redémarrage service échoué: {restart_error}"
            );
        }
        return Err(clean_error);
    }

    restart_result?;
    Ok(())
}

#[cfg(windows)]
fn clean_chromium_caches(report: &mut CleanerReport) -> Result<()> {
    let local_app_data = std::env::var_os("LOCALAPPDATA")
        .map(PathBuf::from)
        .context("Variable d'environnement LOCALAPPDATA introuvable")?;

    let browser_roots = [
        local_app_data.join("Google/Chrome/User Data"),
        local_app_data.join("Microsoft/Edge/User Data"),
        local_app_data.join("BraveSoftware/Brave-Browser/User Data"),
    ];

    let relative_cache_paths = [
        PathBuf::from("Cache"),
        PathBuf::from("Code Cache"),
        PathBuf::from("GPUCache"),
        PathBuf::from("Network/Cache"),
        PathBuf::from("Service Worker/CacheStorage"),
        PathBuf::from("Service Worker/ScriptCache"),
    ];

    for root in browser_roots {
        if !root.exists() {
            continue;
        }

        for profile_dir in chromium_profile_dirs(&root)? {
            for relative in &relative_cache_paths {
                let target = profile_dir.join(relative);
                report.scanned_paths.push(target.display().to_string());

                if target.exists() {
                    purge_directory_contents(&target, report)
                        .with_context(|| format!("Impossible d'énumérer {}", target.display()))?;
                }
            }
        }
    }

    Ok(())
}

#[cfg(windows)]
fn chromium_profile_dirs(root: &Path) -> Result<Vec<PathBuf>> {
    let mut profiles = Vec::new();
    for entry in fs::read_dir(root)? {
        let entry = match entry {
            Ok(value) => value,
            Err(_) => continue,
        };

        let path = entry.path();
        if !path.is_dir() {
            continue;
        }

        let file_name = match path.file_name().and_then(|value| value.to_str()) {
            Some(name) => name,
            None => continue,
        };

        let is_profile = file_name == "Default"
            || file_name == "System Profile"
            || file_name == "Guest Profile"
            || file_name.starts_with("Profile ");

        if is_profile {
            profiles.push(path);
        }
    }

    Ok(profiles)
}

#[cfg(windows)]
fn stop_service_and_wait(name: &str, timeout: Duration) -> Result<()> {
    execute_sc(["stop", name])?;
    wait_for_service_state(name, "STOPPED", timeout)
}

#[cfg(windows)]
fn start_service_and_wait(name: &str, timeout: Duration) -> Result<()> {
    execute_sc(["start", name])?;
    wait_for_service_state(name, "RUNNING", timeout)
}

#[cfg(windows)]
fn execute_sc<const N: usize>(args: [&str; N]) -> Result<()> {
    let output = Command::new("sc").args(args).output().with_context(|| {
        format!(
            "Impossible d'exécuter sc {}",
            args.into_iter().collect::<Vec<_>>().join(" ")
        )
    })?;

    if output.status.success() {
        return Ok(());
    }

    let stderr = String::from_utf8_lossy(&output.stderr);
    let stdout = String::from_utf8_lossy(&output.stdout);
    bail!(
        "Commande sc échouée (code {:?}): {} {}",
        output.status.code(),
        stdout.trim(),
        stderr.trim()
    )
}

#[cfg(windows)]
fn wait_for_service_state(name: &str, expected_state: &str, timeout: Duration) -> Result<()> {
    let start = Instant::now();

    while start.elapsed() < timeout {
        let output = Command::new("sc")
            .args(["query", name])
            .output()
            .with_context(|| format!("Impossible d'interroger l'état du service {name}"))?;

        let text = format!(
            "{}\n{}",
            String::from_utf8_lossy(&output.stdout),
            String::from_utf8_lossy(&output.stderr)
        );

        if text.contains(expected_state) {
            return Ok(());
        }

        thread::sleep(Duration::from_millis(500));
    }

    bail!("Timeout en attendant l'état {expected_state} pour le service {name}")
}

#[cfg(windows)]
fn purge_directory_contents(dir: &Path, report: &mut CleanerReport) -> Result<()> {
    let entries = fs::read_dir(dir)?;

    for entry_result in entries {
        let entry = match entry_result {
            Ok(entry) => entry,
            Err(error) => {
                report.failed_entries += 1;
                report.failures.push(format!("{}: {}", dir.display(), error));
                continue;
            }
        };

        let path = entry.path();
        let metadata = match entry.metadata() {
            Ok(metadata) => metadata,
            Err(error) => {
                report.failed_entries += 1;
                report
                    .failures
                    .push(format!("{}: {}", path.display(), error));
                continue;
            }
        };

        let deletion_result = if metadata.is_dir() {
            fs::remove_dir_all(&path)
        } else {
            fs::remove_file(&path)
        };

        match deletion_result {
            Ok(_) => report.removed_entries += 1,
            Err(error) => {
                report.failed_entries += 1;
                report
                    .failures
                    .push(format!("{}: {}", path.display(), error));
            }
        }
    }

    Ok(())
}