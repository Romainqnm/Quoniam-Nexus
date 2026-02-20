use anyhow::Result;

#[cfg(windows)]
use anyhow::Context;

pub const GUID_PROCESSOR_SETTINGS_SUBGROUP: &str = "54533251-82be-4824-96c1-47b60b740d00";
pub const GUID_PROCESSOR_PERF_BOOST_MODE: &str = "be337238-0d82-4146-a960-4f3749d470c7";
pub const GUID_PROCESSOR_CORE_PARKING_MAX: &str = "ea062031-0e34-4ff1-9b6d-eb1059334028";

#[cfg(windows)]
pub fn set_advanced_cpu_tweak(guid: &str, value: u32) -> Result<()> {
    let value_str = value.to_string();

    std::process::Command::new("powercfg")
        .args([
            "-setacvalueindex",
            "SCHEME_CURRENT",
            GUID_PROCESSOR_SETTINGS_SUBGROUP,
            guid,
            &value_str,
        ])
        .status()
        .context("Impossible d'appliquer le tweak CPU avancé (mode secteur)")?;

    std::process::Command::new("powercfg")
        .args([
            "-setdcvalueindex",
            "SCHEME_CURRENT",
            GUID_PROCESSOR_SETTINGS_SUBGROUP,
            guid,
            &value_str,
        ])
        .status()
        .context("Impossible d'appliquer le tweak CPU avancé (mode batterie)")?;

    std::process::Command::new("powercfg")
        .args(["-setactive", "SCHEME_CURRENT"])
        .status()
        .context("Impossible de recharger le schéma d'alimentation courant")?;

    Ok(())
}

#[cfg(not(windows))]
pub fn set_advanced_cpu_tweak(_guid: &str, _value: u32) -> Result<()> {
    anyhow::bail!(
        "Les tweaks CPU avancés sont disponibles uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}