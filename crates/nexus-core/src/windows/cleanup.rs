use std::fs;
use std::path::{Path, PathBuf};

use anyhow::{Context, Result};
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct CleanupReport {
    pub scanned_paths: Vec<String>,
    pub removed_entries: u64,
    pub failed_entries: u64,
    pub failures: Vec<String>,
}

impl CleanupReport {
    fn new() -> Self {
        Self {
            scanned_paths: Vec::new(),
            removed_entries: 0,
            failed_entries: 0,
            failures: Vec::new(),
        }
    }
}

pub fn clean_temp_files() -> Result<CleanupReport> {
    let mut report = CleanupReport::new();

    let targets = windows_temp_targets();
    for target in targets {
        report.scanned_paths.push(target.display().to_string());

        if !target.exists() {
            continue;
        }

        purge_directory_contents(&target, &mut report)
            .with_context(|| format!("Impossible d'énumérer {}", target.display()))?;
    }

    Ok(report)
}

fn windows_temp_targets() -> Vec<PathBuf> {
    let mut targets = Vec::new();

    if let Some(temp) = std::env::var_os("TEMP") {
        targets.push(PathBuf::from(temp));
    }

    let system_temp = std::env::temp_dir();
    if !targets.iter().any(|item| item == &system_temp) {
        targets.push(system_temp);
    }

    targets.push(PathBuf::from(r"C:\Windows\Temp"));
    targets.push(PathBuf::from(r"C:\Windows\Prefetch"));

    targets
}

fn purge_directory_contents(dir: &Path, report: &mut CleanupReport) -> Result<()> {
    let entries = fs::read_dir(dir)?;

    for entry_result in entries {
        let entry = match entry_result {
            Ok(entry) => entry,
            Err(error) => {
                report.failed_entries += 1;
                report.failures.push(format!("{}: {}", dir.display(), error));
                continue;
            }
        };

        let path = entry.path();
        let metadata = match entry.metadata() {
            Ok(metadata) => metadata,
            Err(error) => {
                report.failed_entries += 1;
                report
                    .failures
                    .push(format!("{}: {}", path.display(), error));
                continue;
            }
        };

        let deletion_result = if metadata.is_dir() {
            fs::remove_dir_all(&path)
        } else {
            fs::remove_file(&path)
        };

        match deletion_result {
            Ok(_) => report.removed_entries += 1,
            Err(error) => {
                report.failed_entries += 1;
                report
                    .failures
                    .push(format!("{}: {}", path.display(), error));
            }
        }
    }

    Ok(())
}
