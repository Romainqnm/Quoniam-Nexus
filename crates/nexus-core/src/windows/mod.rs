pub mod cleaner;
pub mod debloat;
pub mod memory;
pub mod network;
pub mod permissions;
pub mod power;
pub mod startup;
pub mod updater;

pub use self::cleaner::CleanerReport;
pub use self::debloat::DebloatReport;
pub use self::memory::MemoryOptimizationReport;
pub use self::startup::StartupApp;
pub use self::updater::UpdateReport;

pub fn deep_clean() -> anyhow::Result<CleanerReport> {
    self::permissions::ensure_admin()?;
    self::cleaner::deep_clean()
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
