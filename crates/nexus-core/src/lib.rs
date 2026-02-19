pub mod daemon;
pub mod windows;

pub use windows::{CleanerReport, DebloatReport, MemoryOptimizationReport, StartupApp, UpdateReport};
pub type CleanupReport = CleanerReport;

pub fn deep_clean() -> anyhow::Result<CleanerReport> {
    windows::deep_clean()
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
