#[cfg(windows)]
use std::process::Command;

use anyhow::Result;
#[cfg(windows)]
use anyhow::{bail, Context};

#[cfg_attr(feature = "ui", tauri::command)]
pub fn set_power_mode(mode: &str) -> Result<String, String> {
    set_power_mode_impl(mode).map_err(|e| e.to_string())
}

#[cfg(windows)]
fn set_power_mode_impl(mode: &str) -> Result<String> {
    let guid = match mode.to_ascii_lowercase().as_str() {
        "eco" => "a1841308-3541-4fab-bc81-f71556f20b4a",
        "balanced" => "381b4222-f694-41f0-9685-ff5bb260df2e",
        "performance" => "8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c",
        other => bail!("Mode d'énergie non supporté: {other}"),
    };

    let output = Command::new("powercfg")
        .args(["/setactive", guid])
        .output()
        .context("Impossible d'exécuter powercfg")?;

    if !output.status.success() {
        let stdout = String::from_utf8_lossy(&output.stdout);
        let stderr = String::from_utf8_lossy(&output.stderr);
        bail!(
            "Échec powercfg /setactive (code {:?}): {} {}",
            output.status.code(),
            stdout.trim(),
            stderr.trim()
        );
    }

    Ok(format!("Mode d'énergie activé: {mode}"))
}

#[cfg(not(windows))]
fn set_power_mode_impl(_mode: &str) -> Result<String> {
    anyhow::bail!(
        "La gestion d'énergie est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}