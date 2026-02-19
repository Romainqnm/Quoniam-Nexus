use std::{thread, time::Duration};

use tracing::info;

pub fn run_daemon_loop() -> anyhow::Result<()> {
    info!("Démarrage du daemon Nexus (surveillance non implémentée pour cette itération)");

    loop {
        thread::sleep(Duration::from_secs(30));
    }
}
