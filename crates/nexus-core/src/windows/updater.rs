#[cfg(windows)]
use std::process::Command;

use anyhow::{bail, Result};
#[cfg(windows)]
use anyhow::Context;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct UpdateReport {
    pub exit_code: Option<i32>,
    pub stdout: String,
    pub stderr: String,
}

#[cfg(windows)]
pub fn update_all_packages() -> Result<UpdateReport> {
    let child = Command::new("winget")
        .args([
            "upgrade",
            "--all",
            "--silent",
            "--accept-package-agreements",
            "--accept-source-agreements",
        ])
        .spawn()
        .context("Impossible de lancer winget")?;

    let output = child
        .wait_with_output()
        .context("Impossible d'attendre la fin de winget")?;

    let report = UpdateReport {
        exit_code: output.status.code(),
        stdout: String::from_utf8_lossy(&output.stdout).to_string(),
        stderr: String::from_utf8_lossy(&output.stderr).to_string(),
    };

    if !output.status.success() {
        bail!(
            "winget upgrade --all a échoué (code {:?}): {}",
            report.exit_code,
            report.stderr.trim()
        );
    }

    Ok(report)
}

#[cfg(not(windows))]
pub fn update_all_packages() -> Result<UpdateReport> {
    bail!(
        "La mise à jour silencieuse est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}