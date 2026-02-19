#[cfg(not(windows))]
use anyhow::bail;
#[cfg(windows)]
use anyhow::Context;
use anyhow::Result;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct StartupApp {
    pub name: String,
    pub path: String,
}

#[cfg_attr(feature = "ui", tauri::command)]
pub fn get_startup_apps() -> Result<Vec<StartupApp>, String> {
    get_startup_apps_impl().map_err(|e| e.to_string())
}

#[cfg_attr(feature = "ui", tauri::command)]
pub fn disable_startup_app(name: &str) -> Result<String, String> {
    disable_startup_app_impl(name)
        .map(|_| format!("Programme de démarrage désactivé: {name}"))
        .map_err(|e| e.to_string())
}

#[cfg(windows)]
fn get_startup_apps_impl() -> Result<Vec<StartupApp>> {
    use winreg::enums::HKEY_CURRENT_USER;
    use winreg::RegKey;

    let hkey = RegKey::predef(HKEY_CURRENT_USER);
    let run_key = hkey
        .open_subkey(r"Software\Microsoft\Windows\CurrentVersion\Run")
        .context("Impossible d'ouvrir la clé Run dans HKCU")?;

    let mut apps = Vec::new();
    for entry in run_key.enum_values() {
        let (name, _value) = match entry {
            Ok(item) => item,
            Err(_) => continue,
        };

        let path = run_key
            .get_value::<String, _>(&name)
            .unwrap_or_else(|_| String::from("<valeur non lisible>"));
        apps.push(StartupApp { name, path });
    }

    apps.sort_by(|a, b| a.name.to_lowercase().cmp(&b.name.to_lowercase()));
    Ok(apps)
}

#[cfg(not(windows))]
fn get_startup_apps_impl() -> Result<Vec<StartupApp>> {
    bail!(
        "La gestion du démarrage est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}

#[cfg(windows)]
fn disable_startup_app_impl(name: &str) -> Result<()> {
    use winreg::enums::HKEY_CURRENT_USER;
    use winreg::RegKey;

    let hkey = RegKey::predef(HKEY_CURRENT_USER);
    let run_key = hkey
        .open_subkey_with_flags(
            r"Software\Microsoft\Windows\CurrentVersion\Run",
            winreg::enums::KEY_SET_VALUE | winreg::enums::KEY_QUERY_VALUE,
        )
        .context("Impossible d'ouvrir la clé Run en écriture")?;

    run_key
        .delete_value(name)
        .with_context(|| format!("Impossible de supprimer la valeur de démarrage {name}"))?;

    Ok(())
}

#[cfg(not(windows))]
fn disable_startup_app_impl(_name: &str) -> Result<()> {
    bail!(
        "La gestion du démarrage est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}