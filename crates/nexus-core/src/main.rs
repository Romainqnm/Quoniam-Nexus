use clap::Parser;
use nexus_core::{debloat, deep_clean, optimize_ram, run_cli, run_daemon, update_all};
use tracing::info;

#[derive(Debug, Parser)]
#[command(name = "nexus-core")]
#[command(about = "Moteur Quoniam Nexus (CLI / UI / Daemon)")]
struct Args {
    #[arg(long, conflicts_with = "daemon")]
    cli: bool,

    #[arg(long, conflicts_with = "cli")]
    daemon: bool,

    #[arg(long = "clean-temp", conflicts_with = "daemon")]
    clean_temp: bool,

    #[arg(long = "deep-clean", conflicts_with_all = ["daemon", "optimize_ram", "debloat", "update_all"])]
    deep_clean: bool,

    #[arg(long = "optimize-ram", conflicts_with_all = ["daemon", "deep_clean", "debloat", "update_all"])]
    optimize_ram: bool,

    #[arg(long = "debloat", conflicts_with_all = ["daemon", "deep_clean", "optimize_ram", "update_all"])]
    debloat: bool,

    #[arg(long = "update-all", conflicts_with_all = ["daemon", "deep_clean", "optimize_ram", "debloat"])]
    update_all: bool,
}

fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter("info")
        .with_target(false)
        .compact()
        .init();

    let args = Args::parse();

    if args.deep_clean {
        info!("Deep clean demandé");
        let report = deep_clean()?;
        println!(
            "Deep clean terminé: {} éléments supprimés, {} échecs",
            report.removed_entries, report.failed_entries
        );
        return Ok(());
    }

    if args.optimize_ram {
        info!("Optimisation RAM demandée");
        let report = optimize_ram()?;
        println!(
            "Optimisation RAM terminée: standby_list_cleared={}",
            report.standby_list_cleared
        );
        return Ok(());
    }

    if args.debloat {
        info!("Debloat télémétrie demandé");
        let report = debloat()?;
        println!(
            "Debloat terminé: {} clés registre, {} tâches désactivées, {} échecs tâches",
            report.registry_changes.len(),
            report.tasks_disabled.len(),
            report.task_failures.len()
        );
        return Ok(());
    }

    if args.update_all {
        info!("Mise à jour silencieuse de tous les paquets demandée");
        let report = update_all()?;
        println!("Mise à jour terminée. Code de sortie winget: {:?}", report.exit_code);
        return Ok(());
    }

    if args.clean_temp {
        info!("Nettoyage des dossiers temporaires demandé");
        let report = deep_clean()?;
        println!(
            "Nettoyage terminé: {} éléments supprimés, {} échecs",
            report.removed_entries, report.failed_entries
        );
        return Ok(());
    }

    if args.cli {
        info!("Mode CLI activé");
        let report = run_cli()?;
        println!(
            "Mode CLI terminé: {} éléments supprimés, {} échecs",
            report.removed_entries, report.failed_entries
        );
        return Ok(());
    }

    if args.daemon {
        info!("Mode Daemon activé");
        return run_daemon();
    }

    info!("Mode UI (par défaut) - lancer l'application Tauri nexus-ui");
    Ok(())
}
