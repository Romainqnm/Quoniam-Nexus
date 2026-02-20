use anyhow::Result;

#[cfg(windows)]
use anyhow::Context;

#[cfg(windows)]
pub fn optimize_ntfs_settings() -> Result<()> {
    std::process::Command::new("fsutil")
        .args(["behavior", "set", "DisableDeleteNotify", "0"])
        .status()
        .context("Impossible d'optimiser les paramètres NTFS")?;

    Ok(())
}

#[cfg(not(windows))]
pub fn optimize_ntfs_settings() -> Result<()> {
    anyhow::bail!(
        "L'optimisation NTFS est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}

#[cfg(windows)]
pub fn disable_telemetry_services() -> Result<()> {
    for service in ["DiagTrack", "dmwappushservice"] {
        std::process::Command::new("sc")
            .args(["config", service, "start=", "disabled"])
            .status()
            .with_context(|| format!("Impossible de désactiver le service {}", service))?;

        std::process::Command::new("sc")
            .args(["stop", service])
            .status()
            .with_context(|| format!("Impossible d'arrêter le service {}", service))?;
    }

    Ok(())
}

#[cfg(not(windows))]
pub fn disable_telemetry_services() -> Result<()> {
    anyhow::bail!(
        "La désactivation de la télémétrie est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}