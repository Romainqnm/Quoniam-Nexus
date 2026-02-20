pub mod daemon;
pub mod windows;

pub use windows::{CleanerReport, DebloatReport, DeepCleanSelection, MemoryOptimizationReport, StartupApp, UpdateReport};
pub type CleanupReport = CleanerReport;

pub fn deep_clean() -> anyhow::Result<CleanerReport> {
    windows::deep_clean()
}

pub fn deep_clean_selected(selection: DeepCleanSelection) -> anyhow::Result<CleanerReport> {
    windows::deep_clean_selected(selection)
}

pub fn clean_temp_files() -> anyhow::Result<CleanerReport> {
    deep_clean()
}

pub fn optimize_ram() -> anyhow::Result<MemoryOptimizationReport> {
    windows::optimize_ram()
}

pub fn debloat() -> anyhow::Result<DebloatReport> {
    windows::disable_telemetry()
}

pub fn update_all() -> anyhow::Result<UpdateReport> {
    windows::update_all_packages()
}

pub fn run_cli() -> anyhow::Result<CleanerReport> {
    deep_clean()
}

pub fn run_daemon() -> anyhow::Result<()> {
    daemon::run_daemon_loop()
}

pub fn set_advanced_cpu_tweak(guid: &str, value: u32) -> anyhow::Result<String> {
    windows::set_advanced_cpu_tweak(guid, value)
}

pub fn optimize_ntfs_settings() -> anyhow::Result<String> {
    windows::optimize_ntfs_settings()
}

pub fn disable_telemetry_services() -> anyhow::Result<String> {
    windows::disable_telemetry_services()
}

pub fn get_system_stats() -> anyhow::Result<windows::monitor::SystemStats> {
    windows::get_system_stats()
}

pub fn get_extended_stats() -> anyhow::Result<windows::monitor::ExtendedStats> {
    windows::get_extended_stats()
}

pub fn set_gpu_hags(enable: bool) -> anyhow::Result<String> {
    windows::set_gpu_hags(enable)
}

pub fn clear_shader_cache() -> anyhow::Result<String> {
    windows::clear_shader_cache()
}
