pub mod advanced_power;
pub mod cleaner;
pub mod debloat;
pub mod gpu;
pub mod memory;
pub mod monitor;
pub mod network;
pub mod permissions;
pub mod power;
pub mod startup;
pub mod system_tweaks;
pub mod updater;

pub use self::cleaner::CleanerReport;
pub use self::cleaner::DeepCleanSelection;
pub use self::debloat::DebloatReport;
pub use self::memory::MemoryOptimizationReport;
pub use self::startup::StartupApp;
pub use self::updater::UpdateReport;

pub fn deep_clean() -> anyhow::Result<CleanerReport> {
    self::permissions::ensure_admin()?;
    self::cleaner::deep_clean()
}

pub fn deep_clean_selected(selection: DeepCleanSelection) -> anyhow::Result<CleanerReport> {
    self::permissions::ensure_admin()?;
    self::cleaner::deep_clean_selected(selection)
}

pub fn optimize_ram() -> anyhow::Result<MemoryOptimizationReport> {
    self::permissions::ensure_admin()?;
    self::memory::optimize_ram()
}

pub fn disable_telemetry() -> anyhow::Result<DebloatReport> {
    self::permissions::ensure_admin()?;
    self::debloat::disable_telemetry()
}

pub fn update_all_packages() -> anyhow::Result<UpdateReport> {
    self::updater::update_all_packages()
}

pub fn set_advanced_cpu_tweak(guid: &str, value: u32) -> anyhow::Result<String> {
    self::permissions::ensure_admin()?;
    self::advanced_power::set_advanced_cpu_tweak(guid, value)?;
    Ok("Tweak CPU avancé appliqué".to_string())
}

pub fn optimize_ntfs_settings() -> anyhow::Result<String> {
    self::permissions::ensure_admin()?;
    self::system_tweaks::optimize_ntfs_settings()?;
    Ok("Paramètres NTFS optimisés".to_string())
}

pub fn disable_telemetry_services() -> anyhow::Result<String> {
    self::permissions::ensure_admin()?;
    self::system_tweaks::disable_telemetry_services()?;
    Ok("Services de télémétrie désactivés".to_string())
}

pub fn get_system_stats() -> anyhow::Result<monitor::SystemStats> {
    self::monitor::get_system_stats()
}

pub fn get_extended_stats() -> anyhow::Result<monitor::ExtendedStats> {
    self::monitor::get_extended_stats()
}

pub fn set_gpu_hags(enable: bool) -> anyhow::Result<String> {
    self::permissions::ensure_admin()?;
    self::gpu::set_gpu_hags(enable)
}

pub fn clear_shader_cache() -> anyhow::Result<String> {
    self::gpu::clear_shader_cache()
}
