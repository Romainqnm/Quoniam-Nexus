#[tauri::command]
fn clean_temp() -> Result<nexus_core::CleanupReport, String> {
    nexus_core::clean_temp_files().map_err(|e| e.to_string())
}

#[tauri::command]
fn deep_clean() -> Result<nexus_core::CleanerReport, String> {
    nexus_core::deep_clean().map_err(|e| e.to_string())
}

#[tauri::command]
fn deep_clean_selected(selection: nexus_core::DeepCleanSelection) -> Result<nexus_core::CleanerReport, String> {
    nexus_core::deep_clean_selected(selection).map_err(|e| e.to_string())
}

#[tauri::command]
fn optimize_ram() -> Result<nexus_core::MemoryOptimizationReport, String> {
    nexus_core::optimize_ram().map_err(|e| e.to_string())
}

#[tauri::command]
fn debloat() -> Result<nexus_core::DebloatReport, String> {
    nexus_core::debloat().map_err(|e| e.to_string())
}

#[tauri::command]
fn update_all() -> Result<nexus_core::UpdateReport, String> {
    nexus_core::update_all().map_err(|e| e.to_string())
}

#[tauri::command]
fn flush_dns() -> Result<String, String> {
    nexus_core::windows::network::flush_dns()
}

#[tauri::command]
fn reset_network() -> Result<String, String> {
    nexus_core::windows::network::reset_network()
}

#[tauri::command]
fn set_fast_dns(provider: &str) -> Result<String, String> {
    nexus_core::windows::network::set_fast_dns(provider)
}

#[tauri::command]
fn set_power_mode(mode: &str) -> Result<String, String> {
    nexus_core::windows::power::set_power_mode(mode)
}

#[tauri::command]
fn apply_custom_power_profile(settings: nexus_core::windows::power::PowerSettings) -> Result<String, String> {
    nexus_core::windows::power::apply_custom_power_profile(settings)
}

#[tauri::command]
fn get_startup_apps() -> Result<Vec<nexus_core::StartupApp>, String> {
    nexus_core::windows::startup::get_startup_apps()
}

#[tauri::command]
fn disable_startup_app(name: &str) -> Result<String, String> {
    nexus_core::windows::startup::disable_startup_app(name)
}

#[tauri::command]
fn set_advanced_cpu_tweak(guid: &str, value: u32) -> Result<String, String> {
    nexus_core::set_advanced_cpu_tweak(guid, value).map_err(|e| e.to_string())
}

#[tauri::command]
fn optimize_ntfs_settings() -> Result<String, String> {
    nexus_core::optimize_ntfs_settings().map_err(|e| e.to_string())
}

#[tauri::command]
fn disable_telemetry_services() -> Result<String, String> {
    nexus_core::disable_telemetry_services().map_err(|e| e.to_string())
}

#[tauri::command]
fn get_system_stats() -> Result<nexus_core::windows::monitor::SystemStats, String> {
    nexus_core::get_system_stats().map_err(|e| e.to_string())
}

#[tauri::command]
fn get_extended_stats() -> Result<nexus_core::windows::monitor::ExtendedStats, String> {
    nexus_core::get_extended_stats().map_err(|e| e.to_string())
}

#[tauri::command]
fn set_gpu_hags(enable: bool) -> Result<String, String> {
    nexus_core::set_gpu_hags(enable).map_err(|e| e.to_string())
}

#[tauri::command]
fn clear_shader_cache() -> Result<String, String> {
    nexus_core::clear_shader_cache().map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            clean_temp,
            deep_clean,
            deep_clean_selected,
            optimize_ram,
            debloat,
            update_all,
            flush_dns,
            reset_network,
            set_fast_dns,
            set_power_mode,
            apply_custom_power_profile,
            get_startup_apps,
            disable_startup_app,
            set_advanced_cpu_tweak,
            optimize_ntfs_settings,
            disable_telemetry_services,
            get_system_stats,
            get_extended_stats,
            set_gpu_hags,
            clear_shader_cache
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
