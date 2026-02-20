#[cfg(windows)]
use std::process::Command;

use anyhow::Result;
#[cfg(windows)]
use anyhow::{bail, Context};
use serde::Deserialize;

#[derive(Debug, Clone, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct PowerSettings {
    pub cpu_min_percent: u8,
    pub cpu_max_percent: u8,
    pub screen_timeout_minutes: u32,
    pub cooling_policy: String,
    pub disk_timeout_minutes: u32,
    pub wifi_mode: String,
    pub pcie_link_state: String,
    pub core_parking: u8,
    pub boost_mode: u8,
    pub usb_suspend: u8,
}

#[cfg_attr(feature = "ui", tauri::command)]
pub fn set_power_mode(mode: &str) -> Result<String, String> {
    set_power_mode_impl(mode).map_err(|e| e.to_string())
}

#[cfg_attr(feature = "ui", tauri::command)]
pub fn apply_custom_power_profile(settings: PowerSettings) -> Result<String, String> {
    apply_custom_power_profile_impl(settings).map_err(|e| e.to_string())
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

#[cfg(windows)]
fn apply_custom_power_profile_impl(settings: PowerSettings) -> Result<String> {
    if settings.cpu_min_percent > 100 {
        bail!("cpu_min_percent doit être entre 0 et 100");
    }

    if settings.cpu_max_percent > 100 {
        bail!("cpu_max_percent doit être entre 0 et 100");
    }

    if settings.cpu_min_percent > settings.cpu_max_percent {
        bail!("cpu_min_percent ne peut pas dépasser cpu_max_percent");
    }

    if settings.core_parking > 100 {
        bail!("core_parking doit être entre 0 et 100");
    }

    if settings.boost_mode > 3 {
        bail!("boost_mode doit être entre 0 et 3");
    }

    if settings.usb_suspend > 1 {
        bail!("usb_suspend doit être 0 ou 1");
    }

    let cooling_value = match settings.cooling_policy.as_str() {
        "active" => "1",
        "passive" => "0",
        other => bail!("Politique de refroidissement non supportée: {other}"),
    };

    let wifi_value = match settings.wifi_mode.as_str() {
        "max_performance" => "0",
        "low_power" => "1",
        "max_saving" => "3",
        other => bail!("Mode Wi-Fi non supporté: {other}"),
    };

    let pcie_value = match settings.pcie_link_state.as_str() {
        "off" => "0",
        "moderate" => "1",
        "max_saving" => "2",
        other => bail!("Mode PCI Express non supporté: {other}"),
    };

    let cpu_min = settings.cpu_min_percent.to_string();
    let cpu_max = settings.cpu_max_percent.to_string();
    let screen_timeout = settings.screen_timeout_minutes.to_string();
    let disk_timeout = settings.disk_timeout_minutes.to_string();
    let core_parking = settings.core_parking.to_string();
    let boost_mode = settings.boost_mode.to_string();
    let usb_suspend = settings.usb_suspend.to_string();

    const SCHEME_CURRENT: &str = "SCHEME_CURRENT";

    const SUB_PROCESSOR: &str = "54533251-82be-4824-96c1-47b60b740d00";
    const SETTING_CPU_MIN: &str = "893dee8e-2bef-41e0-89c6-b55d0929964c";
    const SETTING_CPU_MAX: &str = "bc5038f7-23e0-4960-96da-33abaf5935ec";
    const SETTING_COOLING_POLICY: &str = "94d3a615-a899-4ac5-ae2b-e4d8f634367f";

    const SUB_DISK: &str = "0012ee47-9041-4b5d-9b77-535fba8b1442";
    const SETTING_DISK_TIMEOUT: &str = "6738e2c4-e8a5-4a42-b16a-e040e769756e";

    const SUB_VIDEO: &str = "7516b95f-f776-4464-8c53-06167f40cc99";
    const SETTING_SCREEN_TIMEOUT: &str = "3c0bc021-c8a8-4e07-a973-6b14cbcb2b7e";

    const SUB_WIFI: &str = "19cbb8fa-5279-450e-9fac-8a3d5fedd0c1";
    const SETTING_WIFI_POWER_SAVING: &str = "12bbebe6-58d6-4636-95bb-3217ef867c1a";

    const SUB_PCIE: &str = "501a4d13-42af-4429-9fd1-a8218c268e20";
    const SETTING_PCIE_LINK_STATE: &str = "ee12f906-d277-404b-b6da-e5fa1a576df5";

    const SETTING_CORE_PARKING_MIN: &str = "0cc5b647-c1df-4637-891a-dec35c318583";
    const SETTING_BOOST_MODE: &str = "be337238-0d82-4146-a960-4f3749d470c7";

    const SUB_USB: &str = "2a737441-1930-4402-8d77-b2bea58455e5";
    const SETTING_USB_SELECTIVE_SUSPEND: &str = "48e6b7a6-50f5-4782-a5d4-53bb8f07e226";

    run_powercfg_set_value(SCHEME_CURRENT, SUB_PROCESSOR, SETTING_CPU_MIN, &cpu_min)?;
    run_powercfg_set_value(SCHEME_CURRENT, SUB_PROCESSOR, SETTING_CPU_MAX, &cpu_max)?;
    run_powercfg_set_value(SCHEME_CURRENT, SUB_VIDEO, SETTING_SCREEN_TIMEOUT, &screen_timeout)?;
    run_powercfg_set_value(SCHEME_CURRENT, SUB_PROCESSOR, SETTING_COOLING_POLICY, cooling_value)?;
    run_powercfg_set_value(SCHEME_CURRENT, SUB_DISK, SETTING_DISK_TIMEOUT, &disk_timeout)?;
    run_powercfg_set_value(SCHEME_CURRENT, SUB_WIFI, SETTING_WIFI_POWER_SAVING, wifi_value)?;
    run_powercfg_set_value(SCHEME_CURRENT, SUB_PCIE, SETTING_PCIE_LINK_STATE, pcie_value)?;
    run_powercfg_set_value(
        SCHEME_CURRENT,
        SUB_PROCESSOR,
        SETTING_CORE_PARKING_MIN,
        &core_parking,
    )?;
    run_powercfg_set_value(SCHEME_CURRENT, SUB_PROCESSOR, SETTING_BOOST_MODE, &boost_mode)?;
    run_powercfg_set_value(
        SCHEME_CURRENT,
        SUB_USB,
        SETTING_USB_SELECTIVE_SUSPEND,
        &usb_suspend,
    )?;

    run_powercfg(&["/setactive", SCHEME_CURRENT])?;

    Ok("Profil d'alimentation personnalisé appliqué".to_string())
}

#[cfg(windows)]
fn run_powercfg_set_value(
    scheme: &str,
    subgroup_guid: &str,
    setting_guid: &str,
    value: &str,
) -> Result<()> {
    run_powercfg(&[
        "/setacvalueindex",
        scheme,
        subgroup_guid,
        setting_guid,
        value,
    ])?;

    run_powercfg(&[
        "/setdcvalueindex",
        scheme,
        subgroup_guid,
        setting_guid,
        value,
    ])
}

#[cfg(windows)]
fn run_powercfg(args: &[&str]) -> Result<()> {
    let output = Command::new("powercfg")
        .args(args)
        .output()
        .with_context(|| format!("Impossible d'exécuter powercfg {}", args.join(" ")))?;

    if output.status.success() {
        return Ok(());
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);
    bail!(
        "Échec powercfg {} (code {:?}): {} {}",
        args.join(" "),
        output.status.code(),
        stdout.trim(),
        stderr.trim()
    )
}

#[cfg(not(windows))]
fn set_power_mode_impl(_mode: &str) -> Result<String> {
    anyhow::bail!(
        "La gestion d'énergie est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}

#[cfg(not(windows))]
fn apply_custom_power_profile_impl(_settings: PowerSettings) -> Result<String> {
    anyhow::bail!(
        "La gestion d'énergie est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}