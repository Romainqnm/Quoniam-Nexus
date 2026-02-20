use anyhow::Result;
#[cfg(windows)]
use serde::Deserialize;
use serde::Serialize;
use sysinfo::{Disks, System};

#[cfg(windows)]
use nvml_wrapper::{
    enum_wrappers::device::{Clock, TemperatureSensor},
    Nvml,
};
#[cfg(windows)]
use wmi::{COMLibrary, WMIConnection};

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct SystemStats {
    pub cpu_usage: f32,
    pub ram_usage_percent: f32,
    pub hostname: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CoreStat {
    pub index: usize,
    pub usage_percent: f32,
    pub frequency_mhz: u64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CpuStats {
    pub name: String,
    pub physical_cores: usize,
    pub logical_cores: usize,
    pub performance_cores: Option<usize>,
    pub efficiency_cores: Option<usize>,
    pub global_usage_percent: f32,
    pub package_temperature_celsius: Option<f32>,
    pub max_frequency_mhz: u64,
    pub cores: Vec<CoreStat>,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct RamStats {
    pub ram_type: String,
    pub speed_mt_s: Option<u32>,
    pub total_bytes: u64,
    pub used_bytes: u64,
    pub available_bytes: u64,
    pub usage_percent: f32,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct GpuStats {
    pub name: String,
    pub load_percent: f32,
    pub temperature_celsius: Option<f32>,
    pub fan_speed_rpm: Option<u32>,
    pub vram_total_bytes: Option<u64>,
    pub vram_used_bytes: Option<u64>,
    pub source: String,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DiskStats {
    pub name: String,
    pub file_system: String,
    pub mount_point: String,
    pub total_bytes: u64,
    pub available_bytes: u64,
    pub used_bytes: u64,
    pub usage_percent: f32,
    pub smart_health: String,
    pub temperature_celsius: Option<f32>,
    pub read_bytes_per_sec: u64,
    pub write_bytes_per_sec: u64,
}

#[derive(Debug, Clone, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ExtendedStats {
    pub hostname: String,
    pub uptime_seconds: u64,
    pub os_version: String,
    pub motherboard_model: String,
    pub ram_speed_mhz: u32,
    pub gpu_core_clock: u32,
    pub gpu_vram_clock: u32,
    pub cpu: CpuStats,
    pub ram: RamStats,
    pub gpu: GpuStats,
    pub storage: Vec<DiskStats>,
    pub system_score: f32,
}

pub fn get_system_stats() -> Result<SystemStats> {
    let stats = get_extended_stats()?;
    Ok(SystemStats {
        cpu_usage: stats.cpu.global_usage_percent,
        ram_usage_percent: stats.ram.usage_percent,
        hostname: stats.hostname,
    })
}

pub fn get_extended_stats() -> Result<ExtendedStats> {
    let mut system = System::new_all();
    system.refresh_all();

    let hostname = System::host_name().unwrap_or_else(|| "Unknown Host".to_string());
    let uptime_seconds = System::uptime();
    let os_version = get_os_version();
    let motherboard_model = read_motherboard_model();
    let ram_speed_mhz = read_ram_speed_mhz();

    let cpu_cores: Vec<CoreStat> = system
        .cpus()
        .iter()
        .enumerate()
        .map(|(index, cpu)| CoreStat {
            index,
            usage_percent: cpu.cpu_usage(),
            frequency_mhz: cpu.frequency(),
        })
        .collect();

    let max_frequency_mhz = cpu_cores
        .iter()
        .map(|core| core.frequency_mhz)
        .max()
        .unwrap_or(0);

    let cpu_temperature = read_cpu_temperature_celsius();
    let cpu_name = system
        .cpus()
        .first()
        .map(|cpu| cpu.brand().to_string())
        .unwrap_or_else(|| "Unknown CPU".to_string());

    let physical_cores = system.physical_core_count().unwrap_or(cpu_cores.len());
    let logical_cores = cpu_cores.len();

    let cpu = CpuStats {
        name: cpu_name,
        physical_cores,
        logical_cores,
        performance_cores: None,
        efficiency_cores: None,
        global_usage_percent: system.global_cpu_info().cpu_usage(),
        package_temperature_celsius: cpu_temperature,
        max_frequency_mhz,
        cores: cpu_cores,
    };

    let total_memory = system.total_memory();
    let used_memory = system.used_memory();
    let available_memory = system.available_memory();

    let ram_usage_percent = if total_memory > 0 {
        (used_memory as f32 / total_memory as f32) * 100.0
    } else {
        0.0
    };

    let ram = RamStats {
        ram_type: "Unknown".to_string(),
        speed_mt_s: None,
        total_bytes: total_memory,
        used_bytes: used_memory,
        available_bytes: available_memory,
        usage_percent: ram_usage_percent,
    };

    let gpu_readout = read_gpu_stats();
    let gpu = gpu_readout.stats;

    let disks = Disks::new_with_refreshed_list();
    let mut storage = Vec::new();
    for disk in disks.list() {
        let total = disk.total_space();
        let available = disk.available_space();
        let used = total.saturating_sub(available);
        let usage_percent = if total > 0 {
            (used as f32 / total as f32) * 100.0
        } else {
            0.0
        };

        storage.push(DiskStats {
            name: disk.name().to_string_lossy().to_string(),
            file_system: disk.file_system().to_string_lossy().to_string(),
            mount_point: disk.mount_point().to_string_lossy().to_string(),
            total_bytes: total,
            available_bytes: available,
            used_bytes: used,
            usage_percent,
            smart_health: "Unknown".to_string(),
            temperature_celsius: None,
            read_bytes_per_sec: 0,
            write_bytes_per_sec: 0,
        });
    }

    let system_score = compute_system_score(&cpu, &ram);

    Ok(ExtendedStats {
        hostname,
        uptime_seconds,
        os_version,
        motherboard_model,
        ram_speed_mhz,
        gpu_core_clock: gpu_readout.core_clock_mhz,
        gpu_vram_clock: gpu_readout.vram_clock_mhz,
        cpu,
        ram,
        gpu,
        storage,
        system_score,
    })
}

fn get_os_version() -> String {
    let os_name = System::name().unwrap_or_else(|| "Windows".to_string());
    let long = System::long_os_version().or_else(System::os_version);
    let bitness = if cfg!(target_pointer_width = "64") {
        "64-bit"
    } else {
        "32-bit"
    };

    match long {
        Some(value) if !value.is_empty() => format!("{} {} {}", os_name, value, bitness),
        _ => format!("{} {}", os_name, bitness),
    }
}

#[cfg(windows)]
#[derive(Debug, Deserialize)]
struct BaseBoardRow {
    #[serde(rename = "Manufacturer")]
    manufacturer: Option<String>,
    #[serde(rename = "Product")]
    product: Option<String>,
}

#[cfg(windows)]
#[derive(Debug, Deserialize)]
struct PhysicalMemoryRow {
    #[serde(rename = "Speed")]
    speed: Option<u32>,
}

#[cfg(windows)]
fn read_motherboard_model() -> String {
    let Ok(com) = COMLibrary::new() else {
        return "Unknown Motherboard".to_string();
    };

    let Ok(wmi_con) = WMIConnection::new(com.into()) else {
        return "Unknown Motherboard".to_string();
    };

    let query = "SELECT Manufacturer, Product FROM Win32_BaseBoard";
    let Ok(rows) = wmi_con.raw_query::<BaseBoardRow>(query) else {
        return "Unknown Motherboard".to_string();
    };

    let Some(first) = rows.first() else {
        return "Unknown Motherboard".to_string();
    };

    let manufacturer = first
        .manufacturer
        .as_deref()
        .unwrap_or("Unknown")
        .trim();
    let product = first.product.as_deref().unwrap_or("Model").trim();

    format!("{} {}", manufacturer, product).trim().to_string()
}

#[cfg(not(windows))]
fn read_motherboard_model() -> String {
    "Unknown Motherboard".to_string()
}

#[cfg(windows)]
fn read_ram_speed_mhz() -> u32 {
    let Ok(com) = COMLibrary::new() else {
        return 0;
    };

    let Ok(wmi_con) = WMIConnection::new(com.into()) else {
        return 0;
    };

    let query = "SELECT Speed FROM Win32_PhysicalMemory";
    let Ok(rows) = wmi_con.raw_query::<PhysicalMemoryRow>(query) else {
        return 0;
    };

    rows.first().and_then(|row| row.speed).unwrap_or(0)
}

#[cfg(not(windows))]
fn read_ram_speed_mhz() -> u32 {
    0
}

fn compute_system_score(cpu: &CpuStats, ram: &RamStats) -> f32 {
    let current_avg_freq = if cpu.cores.is_empty() {
        0.0
    } else {
        let sum: u64 = cpu.cores.iter().map(|core| core.frequency_mhz).sum();
        sum as f32 / cpu.cores.len() as f32
    };

    let freq_ratio = if cpu.max_frequency_mhz > 0 {
        (current_avg_freq / cpu.max_frequency_mhz as f32).clamp(0.0, 1.0)
    } else {
        0.0
    };

    let cpu_health = (100.0 - cpu.global_usage_percent).clamp(0.0, 100.0) / 100.0;
    let ram_health = (100.0 - ram.usage_percent).clamp(0.0, 100.0) / 100.0;

    ((freq_ratio * 45.0) + (cpu_health * 30.0) + (ram_health * 25.0)).clamp(0.0, 100.0)
}

fn read_cpu_temperature_celsius() -> Option<f32> {
    None
}

#[cfg(windows)]
struct GpuReadout {
    stats: GpuStats,
    core_clock_mhz: u32,
    vram_clock_mhz: u32,
}

#[cfg(windows)]
fn read_gpu_stats() -> GpuReadout {
    let Ok(nvml) = Nvml::init() else {
        return GpuReadout {
            stats: GpuStats {
                name: "Unknown GPU".to_string(),
                load_percent: 0.0,
                temperature_celsius: None,
                fan_speed_rpm: None,
                vram_total_bytes: None,
                vram_used_bytes: None,
                source: "fallback".to_string(),
            },
            core_clock_mhz: 0,
            vram_clock_mhz: 0,
        };
    };

    let Ok(device) = nvml.device_by_index(0) else {
        return GpuReadout {
            stats: GpuStats {
                name: "Unknown GPU".to_string(),
                load_percent: 0.0,
                temperature_celsius: None,
                fan_speed_rpm: None,
                vram_total_bytes: None,
                vram_used_bytes: None,
                source: "fallback".to_string(),
            },
            core_clock_mhz: 0,
            vram_clock_mhz: 0,
        };
    };

    let name = device.name().unwrap_or_else(|_| "NVIDIA GPU".to_string());
    let load_percent = device
        .utilization_rates()
        .map(|util| util.gpu as f32)
        .unwrap_or(0.0);

    let temperature_celsius = device
        .temperature(TemperatureSensor::Gpu)
        .ok()
        .map(|temp| temp as f32);

    let fan_speed_rpm = device.fan_speed(0).ok();

    let (vram_total_bytes, vram_used_bytes) = match device.memory_info() {
        Ok(memory) => (Some(memory.total), Some(memory.used)),
        Err(_) => (None, None),
    };

    let core_clock_mhz = device.clock_info(Clock::Graphics).unwrap_or(0);
    let vram_clock_mhz = device.clock_info(Clock::Memory).unwrap_or(0);

    GpuReadout {
        stats: GpuStats {
            name,
            load_percent,
            temperature_celsius,
            fan_speed_rpm,
            vram_total_bytes,
            vram_used_bytes,
            source: "nvml".to_string(),
        },
        core_clock_mhz,
        vram_clock_mhz,
    }
}

#[cfg(not(windows))]
struct GpuReadout {
    stats: GpuStats,
    core_clock_mhz: u32,
    vram_clock_mhz: u32,
}

#[cfg(not(windows))]
fn read_gpu_stats() -> GpuReadout {
    GpuReadout {
        stats: GpuStats {
            name: "Unknown GPU".to_string(),
            load_percent: 0.0,
            temperature_celsius: None,
            fan_speed_rpm: None,
            vram_total_bytes: None,
            vram_used_bytes: None,
            source: "fallback".to_string(),
        },
        core_clock_mhz: 0,
        vram_clock_mhz: 0,
    }
}
