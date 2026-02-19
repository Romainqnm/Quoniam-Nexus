#[cfg(windows)]
use std::process::Command;

#[cfg(windows)]
use anyhow::Context;
use anyhow::Result;

#[cfg_attr(feature = "ui", tauri::command)]
pub fn flush_dns() -> Result<String, String> {
    run_command("ipconfig", &["/flushdns"])
        .map(|_| "Flush DNS terminé".to_string())
        .map_err(|e| e.to_string())
}

#[cfg_attr(feature = "ui", tauri::command)]
pub fn reset_network() -> Result<String, String> {
    run_command("netsh", &["int", "ip", "reset"])
        .and_then(|_| run_command("netsh", &["winsock", "reset"]))
        .map(|_| "Reset réseau terminé".to_string())
        .map_err(|e| e.to_string())
}

#[cfg_attr(feature = "ui", tauri::command)]
pub fn set_fast_dns(provider: &str) -> Result<String, String> {
    let dns = match provider.to_ascii_lowercase().as_str() {
        "cloudflare" => "'1.1.1.1','1.0.0.1'",
        "google" => "'8.8.8.8','8.8.4.4'",
        other => return Err(format!("Provider DNS non supporté: {other}")),
    };

    let script = format!(
        "$iface = Get-NetAdapter | Where-Object {{$_.Status -eq 'Up' -and $_.HardwareInterface -eq $true}} | Select-Object -First 1 -ExpandProperty Name; \
if (-not $iface) {{ throw 'Aucune interface réseau active détectée.' }}; \
Set-DnsClientServerAddress -InterfaceAlias $iface -ServerAddresses @({dns})"
    );

    run_command(
        "powershell",
        &["-NoProfile", "-ExecutionPolicy", "Bypass", "-Command", &script],
    )
    .map(|_| format!("DNS rapide appliqué: {}", provider.to_ascii_lowercase()))
    .map_err(|e| e.to_string())
}

#[cfg(windows)]
fn run_command(binary: &str, args: &[&str]) -> Result<()> {
    let output = Command::new(binary)
        .args(args)
        .output()
        .with_context(|| format!("Impossible d'exécuter la commande {binary}"))?;

    if output.status.success() {
        return Ok(());
    }

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);
    anyhow::bail!(
        "Commande {binary} échouée (code {:?}): {} {}",
        output.status.code(),
        stdout.trim(),
        stderr.trim()
    )
}

#[cfg(not(windows))]
fn run_command(_binary: &str, _args: &[&str]) -> Result<()> {
    anyhow::bail!(
        "Les commandes réseau sont disponibles uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}