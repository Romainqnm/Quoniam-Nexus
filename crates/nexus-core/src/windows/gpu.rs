use anyhow::Result;

#[cfg(windows)]
use anyhow::Context;

#[cfg(windows)]
use std::{
    env,
    fs,
    path::{Path, PathBuf},
};

#[cfg(windows)]
use winreg::{enums::HKEY_LOCAL_MACHINE, RegKey};

#[cfg(windows)]
pub fn set_gpu_hags(enable: bool) -> Result<String> {
    let hklm = RegKey::predef(HKEY_LOCAL_MACHINE);
    let (graphics_drivers, _) = hklm
        .create_subkey("SYSTEM\\CurrentControlSet\\Control\\GraphicsDrivers")
        .context("Impossible d'ouvrir la clé registre GraphicsDrivers")?;

    let value: u32 = if enable { 2 } else { 1 };
    graphics_drivers
        .set_value("HwSchMode", &value)
        .context("Impossible d'écrire HwSchMode")?;

    Ok(if enable {
        "HAGS activé (redémarrage requis)".to_string()
    } else {
        "HAGS désactivé (redémarrage requis)".to_string()
    })
}

#[cfg(not(windows))]
pub fn set_gpu_hags(_enable: bool) -> Result<String> {
    anyhow::bail!(
        "Le réglage HAGS est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}

#[cfg(windows)]
pub fn clear_shader_cache() -> Result<String> {
    let local_app_data = env::var("LOCALAPPDATA").context("Variable LOCALAPPDATA introuvable")?;

    let folders = [
        Path::new(&local_app_data).join("D3DSCache"),
        Path::new(&local_app_data).join("NVIDIA").join("DXCache"),
        Path::new(&local_app_data).join("AMD").join("DxCache"),
    ];

    for folder in folders {
        clear_directory_contents(&folder);
    }

    Ok("Cache shaders DirectX nettoyé".to_string())
}

#[cfg(windows)]
fn clear_directory_contents(path: &Path) {
    let Ok(entries) = fs::read_dir(path) else {
        return;
    };

    for entry in entries.flatten() {
        let entry_path: PathBuf = entry.path();
        let result = if entry_path.is_dir() {
            fs::remove_dir_all(&entry_path)
        } else {
            fs::remove_file(&entry_path)
        };

        let _ = result;
    }
}

#[cfg(not(windows))]
pub fn clear_shader_cache() -> Result<String> {
    anyhow::bail!(
        "Le nettoyage du cache shaders est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}
