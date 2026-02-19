use anyhow::{bail, Result};
#[cfg(windows)]
use anyhow::Context;
use serde::Serialize;

#[derive(Debug, Clone, Serialize)]
pub struct MemoryOptimizationReport {
    pub standby_list_cleared: bool,
}

#[cfg(windows)]
pub fn optimize_ram() -> Result<MemoryOptimizationReport> {
    enable_privilege("SeProfileSingleProcessPrivilege")
        .context("Impossible d'activer SeProfileSingleProcessPrivilege")?;

    clear_standby_list().context("Impossible de vider la Standby List")?;

    Ok(MemoryOptimizationReport {
        standby_list_cleared: true,
    })
}

#[cfg(not(windows))]
pub fn optimize_ram() -> Result<MemoryOptimizationReport> {
    bail!(
        "L'optimisation RAM est disponible uniquement sous Windows. Exécutez ce binaire Windows (x86_64-pc-windows-gnu)."
    )
}

#[cfg(windows)]
fn enable_privilege(privilege_name: &str) -> Result<()> {
    use windows::core::PCWSTR;
    use windows::Win32::Foundation::{CloseHandle, GetLastError, ERROR_NOT_ALL_ASSIGNED, HANDLE, LUID};
    use windows::Win32::Security::{
        AdjustTokenPrivileges, LookupPrivilegeValueW, LUID_AND_ATTRIBUTES,
        SE_PRIVILEGE_ENABLED, TOKEN_ADJUST_PRIVILEGES, TOKEN_PRIVILEGES, TOKEN_QUERY,
    };
    use windows::Win32::System::Threading::{GetCurrentProcess, OpenProcessToken};

    unsafe {
        let mut token = HANDLE::default();
        OpenProcessToken(
            GetCurrentProcess(),
            TOKEN_ADJUST_PRIVILEGES | TOKEN_QUERY,
            &mut token,
        )?;

        let wide_name: Vec<u16> = privilege_name.encode_utf16().chain(std::iter::once(0)).collect();
        let mut luid = LUID::default();
        LookupPrivilegeValueW(None, PCWSTR(wide_name.as_ptr()), &mut luid)?;

        let mut new_state = TOKEN_PRIVILEGES {
            PrivilegeCount: 1,
            Privileges: [LUID_AND_ATTRIBUTES {
                Luid: luid,
                Attributes: SE_PRIVILEGE_ENABLED,
            }],
        };

        AdjustTokenPrivileges(token, false, Some(&mut new_state), 0, None, None)?;
        let close_result = CloseHandle(token);

        if GetLastError() == ERROR_NOT_ALL_ASSIGNED {
            close_result?;
            bail!("Le privilège demandé n'a pas été assigné au token courant");
        }

        close_result?;
    }

    Ok(())
}

#[cfg(windows)]
fn clear_standby_list() -> Result<()> {
    use std::ffi::c_void;

    const SYSTEM_MEMORY_LIST_INFORMATION: u32 = 80;
    const MEMORY_PURGE_STANDBY_LIST: u32 = 4;

    unsafe extern "system" {
        fn NtSetSystemInformation(
            system_information_class: u32,
            system_information: *mut c_void,
            system_information_length: u32,
        ) -> i32;
    }

    let mut command: u32 = MEMORY_PURGE_STANDBY_LIST;
    let status = unsafe {
        NtSetSystemInformation(
            SYSTEM_MEMORY_LIST_INFORMATION,
            (&mut command as *mut u32).cast::<c_void>(),
            std::mem::size_of::<u32>() as u32,
        )
    };

    if status < 0 {
        bail!("NtSetSystemInformation a échoué avec le statut NTSTATUS {status:#x}");
    }

    Ok(())
}