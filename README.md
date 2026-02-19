# Quoniam-Nexus

Base de projet pour un moteur Rust unique avec 3 modes d'exécution :

- `--cli` : mode automatisation administrateur
- `--daemon` : surveillance et optimisation en arrière-plan
- mode par défaut : UI desktop via Tauri

Cette itération implémente :

- vérification des privilèges administrateur Windows (obligatoire avant nettoyage)
- nettoyage basique des dossiers temporaires Windows
- exposition de la même opération en CLI et via commande Tauri

## Arborescence initiale

```text
.
├── .cargo/
│   └── config.toml
├── .devcontainer/
│   └── devcontainer.json
├── apps/
│   └── nexus-ui/
│       ├── package.json
│       ├── src-tauri/
│       │   ├── Cargo.toml
│       │   ├── build.rs
│       │   ├── tauri.conf.json
│       │   └── src/
│       │       └── main.rs
│       └── web/
│           ├── index.html
│           ├── main.js
│           └── styles.css
├── crates/
│   └── nexus-core/
│       ├── Cargo.toml
│       └── src/
│           ├── daemon.rs
│           ├── lib.rs
│           ├── main.rs
│           └── windows/
│               ├── cleanup.rs
│               ├── mod.rs
│               └── permissions.rs
└── Cargo.toml
```

## Démarrage rapide

Après ouverture du Codespace/rebuild container :

```bash
cargo run -p nexus-core -- --cli
cargo run -p nexus-core -- --daemon
cargo run -p nexus-core -- --clean-temp
```

Build Windows GNU depuis Linux :

```bash
cargo build -p nexus-core --target x86_64-pc-windows-gnu
```

## Itération actuelle : permissions + nettoyage temp

### Permission Windows Administrateur

- Fonction : `ensure_admin()`
- Fichier : `crates/nexus-core/src/windows/permissions.rs`
- Implémentation via `windows-rs` (`OpenProcessToken` + `GetTokenInformation(TokenElevation)`)
- Si non administrateur : erreur explicite renvoyée à la CLI/Tauri

### Nettoyage temp basique

- Fonction : `clean_temp_files()`
- Fichier : `crates/nexus-core/src/windows/cleanup.rs`
- Cibles : `%TEMP%`, `C:\Windows\Temp`, `C:\Windows\Prefetch`
- Retour : `CleanupReport { scanned_paths, removed_entries, failed_entries, failures }`

### Intégration CLI / Tauri

- CLI : flag `--clean-temp` dans `crates/nexus-core/src/main.rs`
- Tauri command : `clean_temp` dans `apps/nexus-ui/src-tauri/src/main.rs`
- Front web : appel `invoke("clean_temp")` dans `apps/nexus-ui/web/main.js`

### Schéma Tauri (Codespaces)

Dans Codespaces, VS Code peut marquer les URLs de schéma distantes comme non fiables.
Le projet référence donc un schéma local versionné :

- `apps/nexus-ui/src-tauri/schemas/tauri-config.schema.json`
- `apps/nexus-ui/src-tauri/tauri.conf.json` -> `"$schema": "./schemas/tauri-config.schema.json"`

UI Tauri :

```bash
cd apps/nexus-ui
npm install
npm run tauri:dev
```