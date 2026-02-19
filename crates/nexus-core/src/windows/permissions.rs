use anyhow::{bail, Result};

#[cfg(windows)]
pub fn ensure_admin() -> Result<()> {
    use std::{ffi::c_void, mem::size_of};

    use windows::Win32::Foundation::{CloseHandle, HANDLE};
    use windows::Win32::Security::{
        GetTokenInformation, TokenElevation, TOKEN_ELEVATION, TOKEN_QUERY,
    };
    use windows::Win32::System::Threading::{GetCurrentProcess, OpenProcessToken};

    unsafe {
        let mut token = HANDLE::default();
        OpenProcessToken(GetCurrentProcess(), TOKEN_QUERY, &mut token)?;

        let mut elevation = TOKEN_ELEVATION::default();
        let mut bytes_returned = 0u32;

        let result = GetTokenInformation(
            token,
            TokenElevation,
            Some((&mut elevation as *mut TOKEN_ELEVATION).cast::<c_void>()),
            size_of::<TOKEN_ELEVATION>() as u32,
            &mut bytes_returned,
        );

        let close_result = CloseHandle(token);
        result?;
        close_result?;

        if elevation.TokenIsElevated == 0 {
            bail!(
                "Cette opération nécessite les privilèges Administrateur Windows. Relancez l'application en tant qu'administrateur."
            );
        }
    }

    Ok(())
}

#[cfg(not(windows))]
pub fn ensure_admin() -> Result<()> {
    bail!(
        "Vérification Administrateur disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}
