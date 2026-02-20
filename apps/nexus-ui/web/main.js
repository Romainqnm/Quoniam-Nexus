const invoke = (() => {
  const tauriInvoke = window.__TAURI__?.core?.invoke;
  if (typeof tauriInvoke === "function") {
    return tauriInvoke;
  }

  return async (command) => {
    throw new Error(`Commande indisponible hors Tauri: ${command}`);
  };
})();

const i18n = {
  fr: {
    navHome: "Accueil",
    navExpert: "Mode Expert",
    navSettingsLogs: "Paramètres & Logs",
    homeTitle: "Optimisation simple en 1 clic",
    homeSubtitle: "Analysez et appliquez les optimisations principales automatiquement.",
    systemStatusTitle: "Statut du système",
    statusCpuLabel: "Utilisation CPU",
    statusRamLabel: "Utilisation RAM",
    statusThreatsLabel: "Menaces / Fichiers inutiles",
    statusStable: "Stable",
    statusHigh: "Élevée",
    statusScanRequired: "Scan requis",
    quickOptimize: "Analyse & Optimisation Rapide",
    powerTitle: "Profil d'énergie",
    powerEco: "Économie",
    powerEcoDesc: "Réduit la consommation pour maximiser l'autonomie.",
    powerBalanced: "Équilibré",
    powerBalancedDesc: "Compromis recommandé entre performance et efficacité.",
    powerPerformance: "Performance",
    powerPerformanceDesc: "Priorise la vitesse et la réactivité du système.",
    expertTitle: "Mode Expert",
    expertWarning: "Outils avancés: utilisez-les si vous comprenez leur impact.",
    expertGroupCleanup: "🧹 Nettoyage & Maintenance",
    expertGroupOptimization: "⚡ Optimisation Système",
    expertGroupNetwork: "🌐 Réseau & Connectivité",
    expertGroupGpu: "🎮 Carte Graphique & Affichage",
    expertGroupGpuDesc: "Optimisations GPU avancées pour latence et fluidité.",
    expertGroupUpdates: "📦 Mises à jour & Démarrage",
    deepClean: "Nettoyage profond",
    cleanWindowsTemp: "Fichiers Temporaires Windows",
    cleanWindowsUpdate: "Cache Windows Update (Nécessite redémarrage service)",
    cleanBrowserCache: "Cache Navigateurs (Chrome/Edge/Brave)",
    cleanPrefetch: "Dossier Prefetch",
    runSelection: "Exécuter la sélection",
    optimizeRam: "Optimiser la mémoire",
    debloat: "Désinstaller bloatwares",
    updateAll: "Mettre à jour tout",
    flushDns: "Vider le cache DNS",
    resetNetwork: "Réinitialiser le réseau",
    setDnsCloudflare: "DNS Cloudflare (1.1.1.1)",
    setDnsGoogle: "DNS Google (8.8.8.8)",
    gpuHagsTitle: "Accélération Matérielle (HAGS)",
    gpuHagsReboot: "(Nécessite un redémarrage)",
    gpuHagsOff: "Désactivé",
    gpuHagsOn: "Activé",
    gpuHagsApply: "Appliquer HAGS",
    gpuShaderTitle: "Cache DirectX",
    gpuShaderClear: "Vider le cache des Shaders",
    startupApps: "Applications au démarrage",
    refresh: "Actualiser",
    settingsTitle: "Paramètres",
    theme: "Thème",
    themeDark: "Sombre",
    themeLight: "Clair",
    language: "Langue",
    logsTitle: "Logs",
    disable: "Désactiver",
    startupEmpty: "Aucune application de démarrage trouvée.",
    startupLoadError: "Erreur de chargement des apps de démarrage",
    actionSuccess: "Action exécutée",
    actionError: "Erreur",
    quickOptimizeStart: "Optimisation rapide lancée...",
    quickOptimizeDone: "Optimisation rapide terminée.",
    powerModeSet: "Mode d'énergie appliqué",
    startupDisabled: "Application désactivée au démarrage",
    profileModalTitle: "Personnaliser le profil",
    powerTabBasic: "Basique",
    powerTabExpert: "Expert",
    cpuMin: "Performance CPU Min",
    cpuMax: "Performance CPU Max",
    coolingPolicy: "Refroidissement",
    coolingActive: "Actif (Ventilateurs en priorité)",
    coolingPassive: "Passif (Ralentissement CPU en priorité)",
    diskTimeout: "Arrêter le disque dur après (minutes)",
    wifiMode: "Carte Wi-Fi",
    wifiMax: "Performances Maximales",
    wifiLow: "Économie d'énergie basse",
    wifiMaxSave: "Économie maximale",
    pciExpress: "PCI Express (Gestion de l'alimentation de la liaison)",
    pciOff: "Désactivé",
    pciModerate: "Économie modérée",
    pciMax: "Économie maximale",
    screenOff: "Extinction Écran (min)",
    coreParking: "Stationnement des cœurs (Core Parking Min)",
    boostMode: "Mode d'accélération (Boost Mode)",
    boostDisabled: "0: Désactivé",
    boostEnabled: "1: Activé",
    boostAggressive: "2: Agressif",
    boostEfficientAggressive: "3: Efficacité agressive",
    usbSuspend: "Suspension sélective USB",
    usbSuspendDisabled: "0: Désactivé (Performance absolue)",
    usbSuspendEnabled: "1: Activé (Économie)",
    cancel: "Annuler",
    save: "Sauvegarder",
    profileSaved: "Profil sauvegardé"
    ,
    btnLoading: "En cours...",
    btnSuccess: "✓ Terminé",
    btnError: "✖ Erreur"
  },
  en: {
    navHome: "Home",
    navExpert: "Expert Mode",
    navSettingsLogs: "Settings & Logs",
    homeTitle: "Simple one-click optimization",
    homeSubtitle: "Analyze and apply key optimizations automatically.",
    systemStatusTitle: "System Status",
    statusCpuLabel: "CPU Usage",
    statusRamLabel: "RAM Usage",
    statusThreatsLabel: "Threats / Junk Files",
    statusStable: "Stable",
    statusHigh: "High",
    statusScanRequired: "Scan required",
    quickOptimize: "Quick Analyze & Optimize",
    powerTitle: "Power profile",
    powerEco: "Eco",
    powerEcoDesc: "Lowers power usage to maximize battery life.",
    powerBalanced: "Balanced",
    powerBalancedDesc: "Recommended balance between speed and efficiency.",
    powerPerformance: "Performance",
    powerPerformanceDesc: "Prioritizes system speed and responsiveness.",
    expertTitle: "Expert Mode",
    expertWarning: "Advanced tools: use only if you understand the impact.",
    expertGroupCleanup: "🧹 Cleanup & Maintenance",
    expertGroupOptimization: "⚡ System Optimization",
    expertGroupNetwork: "🌐 Network & Connectivity",
    expertGroupGpu: "🎮 Graphics & Display",
    expertGroupGpuDesc: "Advanced GPU optimizations for latency and smoothness.",
    expertGroupUpdates: "📦 Updates & Startup",
    deepClean: "Deep clean",
    cleanWindowsTemp: "Windows Temporary Files",
    cleanWindowsUpdate: "Windows Update Cache (Requires service restart)",
    cleanBrowserCache: "Browser Cache (Chrome/Edge/Brave)",
    cleanPrefetch: "Prefetch Folder",
    runSelection: "Run selected cleanup",
    optimizeRam: "Optimize memory",
    debloat: "Remove bloatware",
    updateAll: "Update everything",
    flushDns: "Flush DNS cache",
    resetNetwork: "Reset network",
    setDnsCloudflare: "Cloudflare DNS (1.1.1.1)",
    setDnsGoogle: "Google DNS (8.8.8.8)",
    gpuHagsTitle: "Hardware-Accelerated GPU Scheduling (HAGS)",
    gpuHagsReboot: "(Requires restart)",
    gpuHagsOff: "Disabled",
    gpuHagsOn: "Enabled",
    gpuHagsApply: "Apply HAGS",
    gpuShaderTitle: "DirectX Cache",
    gpuShaderClear: "Clear Shader Cache",
    startupApps: "Startup apps",
    refresh: "Refresh",
    settingsTitle: "Settings",
    theme: "Theme",
    themeDark: "Dark",
    themeLight: "Light",
    language: "Language",
    logsTitle: "Logs",
    disable: "Disable",
    startupEmpty: "No startup apps found.",
    startupLoadError: "Failed to load startup apps",
    actionSuccess: "Action completed",
    actionError: "Error",
    quickOptimizeStart: "Quick optimization started...",
    quickOptimizeDone: "Quick optimization completed.",
    powerModeSet: "Power mode applied",
    startupDisabled: "Startup app disabled",
    profileModalTitle: "Customize profile",
    powerTabBasic: "Basic",
    powerTabExpert: "Expert",
    cpuMin: "CPU Performance Min",
    cpuMax: "CPU Performance Max",
    coolingPolicy: "Cooling",
    coolingActive: "Active (Fans prioritized)",
    coolingPassive: "Passive (CPU throttling prioritized)",
    diskTimeout: "Turn off hard disk after (minutes)",
    wifiMode: "Wi-Fi Adapter",
    wifiMax: "Maximum Performance",
    wifiLow: "Low Power Saving",
    wifiMaxSave: "Maximum Saving",
    pciExpress: "PCI Express (Link State Power Management)",
    pciOff: "Off",
    pciModerate: "Moderate Power Savings",
    pciMax: "Maximum Power Savings",
    screenOff: "Screen Timeout (min)",
    coreParking: "Core Parking (Min Cores)",
    boostMode: "Boost Mode",
    boostDisabled: "0: Disabled",
    boostEnabled: "1: Enabled",
    boostAggressive: "2: Aggressive",
    boostEfficientAggressive: "3: Efficient Aggressive",
    usbSuspend: "USB Selective Suspend",
    usbSuspendDisabled: "0: Disabled (Absolute performance)",
    usbSuspendEnabled: "1: Enabled (Power saving)",
    cancel: "Cancel",
    save: "Save",
    profileSaved: "Profile saved",
    btnLoading: "Running...",
    btnSuccess: "✓ Done",
    btnError: "✖ Error"
  },
  es: {
    navHome: "Inicio",
    navExpert: "Modo Experto",
    navSettingsLogs: "Configuración y Logs",
    homeTitle: "Optimización simple en 1 clic",
    homeSubtitle: "Analiza y aplica optimizaciones clave automáticamente.",
    systemStatusTitle: "Estado del sistema",
    statusCpuLabel: "Uso de CPU",
    statusRamLabel: "Uso de RAM",
    statusThreatsLabel: "Amenazas / Archivos basura",
    statusStable: "Estable",
    statusHigh: "Alta",
    statusScanRequired: "Escaneo requerido",
    quickOptimize: "Análisis y Optimización Rápida",
    powerTitle: "Perfil de energía",
    powerEco: "Ahorro",
    powerEcoDesc: "Reduce el consumo para mejorar la autonomía.",
    powerBalanced: "Equilibrado",
    powerBalancedDesc: "Compromiso recomendado entre rendimiento y eficiencia.",
    powerPerformance: "Rendimiento",
    powerPerformanceDesc: "Prioriza velocidad y capacidad de respuesta.",
    expertTitle: "Modo Experto",
    expertWarning: "Herramientas avanzadas: úsalas si entiendes su impacto.",
    expertGroupCleanup: "🧹 Limpieza y Mantenimiento",
    expertGroupOptimization: "⚡ Optimización del Sistema",
    expertGroupNetwork: "🌐 Red y Conectividad",
    expertGroupGpu: "🎮 Tarjeta Gráfica y Pantalla",
    expertGroupGpuDesc: "Optimizaciones avanzadas de GPU para latencia y fluidez.",
    expertGroupUpdates: "📦 Actualizaciones e Inicio",
    deepClean: "Limpieza profunda",
    cleanWindowsTemp: "Archivos temporales de Windows",
    cleanWindowsUpdate: "Caché de Windows Update (requiere reinicio del servicio)",
    cleanBrowserCache: "Caché de navegadores (Chrome/Edge/Brave)",
    cleanPrefetch: "Carpeta Prefetch",
    runSelection: "Ejecutar selección",
    optimizeRam: "Optimizar memoria",
    debloat: "Eliminar bloatware",
    updateAll: "Actualizar todo",
    flushDns: "Vaciar caché DNS",
    resetNetwork: "Restablecer red",
    setDnsCloudflare: "DNS Cloudflare (1.1.1.1)",
    setDnsGoogle: "DNS Google (8.8.8.8)",
    gpuHagsTitle: "Aceleración por Hardware (HAGS)",
    gpuHagsReboot: "(Requiere reinicio)",
    gpuHagsOff: "Desactivado",
    gpuHagsOn: "Activado",
    gpuHagsApply: "Aplicar HAGS",
    gpuShaderTitle: "Caché DirectX",
    gpuShaderClear: "Vaciar caché de Shaders",
    startupApps: "Aplicaciones de inicio",
    refresh: "Actualizar",
    settingsTitle: "Configuración",
    theme: "Tema",
    themeDark: "Oscuro",
    themeLight: "Claro",
    language: "Idioma",
    logsTitle: "Logs",
    disable: "Desactivar",
    startupEmpty: "No se encontraron aplicaciones de inicio.",
    startupLoadError: "Error al cargar aplicaciones de inicio",
    actionSuccess: "Acción completada",
    actionError: "Error",
    quickOptimizeStart: "Optimización rápida iniciada...",
    quickOptimizeDone: "Optimización rápida completada.",
    powerModeSet: "Modo de energía aplicado",
    startupDisabled: "Aplicación desactivada del inicio",
    profileModalTitle: "Personalizar perfil",
    powerTabBasic: "Básico",
    powerTabExpert: "Experto",
    cpuMin: "Rendimiento CPU Mín",
    cpuMax: "Rendimiento CPU Máx",
    coolingPolicy: "Refrigeración",
    coolingActive: "Activa (prioridad a ventiladores)",
    coolingPassive: "Pasiva (prioridad a limitar CPU)",
    diskTimeout: "Apagar disco duro después de (minutos)",
    wifiMode: "Tarjeta Wi-Fi",
    wifiMax: "Máximo rendimiento",
    wifiLow: "Ahorro de energía bajo",
    wifiMaxSave: "Ahorro máximo",
    pciExpress: "PCI Express (Gestión de energía del enlace)",
    pciOff: "Desactivado",
    pciModerate: "Ahorro moderado",
    pciMax: "Ahorro máximo",
    screenOff: "Apagado de pantalla (min)",
    coreParking: "Aparcamiento de núcleos (Core Parking Min)",
    boostMode: "Modo de aceleración (Boost Mode)",
    boostDisabled: "0: Desactivado",
    boostEnabled: "1: Activado",
    boostAggressive: "2: Agresivo",
    boostEfficientAggressive: "3: Eficiencia agresiva",
    usbSuspend: "Suspensión selectiva USB",
    usbSuspendDisabled: "0: Desactivado (Rendimiento absoluto)",
    usbSuspendEnabled: "1: Activado (Ahorro)",
    cancel: "Cancelar",
    save: "Guardar",
    profileSaved: "Perfil guardado",
    btnLoading: "En curso...",
    btnSuccess: "✓ Completado",
    btnError: "✖ Error"
  },
  ar: {
    navHome: "الرئيسية",
    navExpert: "الوضع المتقدم",
    navSettingsLogs: "الإعدادات والسجلات",
    homeTitle: "تحسين بسيط بنقرة واحدة",
    homeSubtitle: "حلّل وطبّق أهم التحسينات تلقائيًا.",
    systemStatusTitle: "حالة النظام",
    statusCpuLabel: "استخدام المعالج",
    statusRamLabel: "استخدام الذاكرة",
    statusThreatsLabel: "التهديدات / الملفات غير الضرورية",
    statusStable: "مستقر",
    statusHigh: "مرتفع",
    statusScanRequired: "الفحص مطلوب",
    quickOptimize: "تحليل وتحسين سريع",
    powerTitle: "وضع الطاقة",
    powerEco: "توفير",
    powerEcoDesc: "يقلل الاستهلاك لزيادة عمر البطارية.",
    powerBalanced: "متوازن",
    powerBalancedDesc: "توازن موصى به بين الأداء والكفاءة.",
    powerPerformance: "أداء",
    powerPerformanceDesc: "يركز على السرعة والاستجابة.",
    expertTitle: "الوضع المتقدم",
    expertWarning: "أدوات متقدمة: استخدمها فقط إذا كنت تفهم تأثيرها.",
    expertGroupCleanup: "🧹 التنظيف والصيانة",
    expertGroupOptimization: "⚡ تحسين النظام",
    expertGroupNetwork: "🌐 الشبكة والاتصال",
    expertGroupGpu: "🎮 بطاقة الرسوميات والعرض",
    expertGroupGpuDesc: "تحسينات متقدمة للبطاقة الرسومية لتقليل زمن الاستجابة وتحسين السلاسة.",
    expertGroupUpdates: "📦 التحديثات وبدء التشغيل",
    deepClean: "تنظيف عميق",
    cleanWindowsTemp: "الملفات المؤقتة في ويندوز",
    cleanWindowsUpdate: "ذاكرة Windows Update المؤقتة (يتطلب إعادة تشغيل الخدمة)",
    cleanBrowserCache: "ذاكرة المتصفحات المؤقتة (Chrome/Edge/Brave)",
    cleanPrefetch: "مجلد Prefetch",
    runSelection: "تنفيذ التحديد",
    optimizeRam: "تحسين الذاكرة",
    debloat: "إزالة البرامج غير الضرورية",
    updateAll: "تحديث الكل",
    flushDns: "تفريغ DNS",
    resetNetwork: "إعادة ضبط الشبكة",
    setDnsCloudflare: "DNS كلاودفلير (1.1.1.1)",
    setDnsGoogle: "DNS جوجل (8.8.8.8)",
    gpuHagsTitle: "تسريع جدولة GPU (HAGS)",
    gpuHagsReboot: "(يتطلب إعادة تشغيل)",
    gpuHagsOff: "معطل",
    gpuHagsOn: "مفعل",
    gpuHagsApply: "تطبيق HAGS",
    gpuShaderTitle: "ذاكرة DirectX المؤقتة",
    gpuShaderClear: "مسح ذاكرة Shader المؤقتة",
    startupApps: "تطبيقات بدء التشغيل",
    refresh: "تحديث",
    settingsTitle: "الإعدادات",
    theme: "المظهر",
    themeDark: "داكن",
    themeLight: "فاتح",
    language: "اللغة",
    logsTitle: "السجلات",
    disable: "تعطيل",
    startupEmpty: "لا توجد تطبيقات بدء تشغيل.",
    startupLoadError: "فشل تحميل تطبيقات بدء التشغيل",
    actionSuccess: "تم تنفيذ العملية",
    actionError: "خطأ",
    quickOptimizeStart: "بدأ التحسين السريع...",
    quickOptimizeDone: "اكتمل التحسين السريع.",
    powerModeSet: "تم تطبيق وضع الطاقة",
    startupDisabled: "تم تعطيل التطبيق من بدء التشغيل",
    profileModalTitle: "تخصيص الملف",
    powerTabBasic: "أساسي",
    powerTabExpert: "متقدم",
    cpuMin: "الحد الأدنى لأداء المعالج",
    cpuMax: "الحد الأقصى لأداء المعالج",
    coolingPolicy: "التبريد",
    coolingActive: "نشط (أولوية للمراوح)",
    coolingPassive: "سلبي (أولوية لخفض سرعة المعالج)",
    diskTimeout: "إيقاف القرص الصلب بعد (دقائق)",
    wifiMode: "بطاقة Wi-Fi",
    wifiMax: "أقصى أداء",
    wifiLow: "توفير طاقة منخفض",
    wifiMaxSave: "توفير طاقة أقصى",
    pciExpress: "PCI Express (إدارة طاقة الوصلة)",
    pciOff: "معطل",
    pciModerate: "توفير متوسط",
    pciMax: "توفير أقصى",
    screenOff: "إطفاء الشاشة (دقيقة)",
    coreParking: "إيقاف الأنوية (الحد الأدنى)",
    boostMode: "وضع التسريع",
    boostDisabled: "0: معطل",
    boostEnabled: "1: مفعل",
    boostAggressive: "2: عدواني",
    boostEfficientAggressive: "3: كفاءة عدوانية",
    usbSuspend: "تعليق USB الانتقائي",
    usbSuspendDisabled: "0: معطل (أقصى أداء)",
    usbSuspendEnabled: "1: مفعل (توفير الطاقة)",
    cancel: "إلغاء",
    save: "حفظ",
    profileSaved: "تم حفظ الملف",
    btnLoading: "جارٍ التنفيذ...",
    btnSuccess: "✓ اكتمل",
    btnError: "✖ خطأ"
  }
};

const logOutput = document.getElementById("log-output");
const hostNameElement = document.getElementById("host-name");
const uptimeValueElement = document.getElementById("uptime-value");
const uptimeInlineElement = document.getElementById("uptime-inline");
const osVersionElement = document.getElementById("os-version");
const motherboardModelElement = document.getElementById("motherboard-model");
const cpuValueElement = document.getElementById("cpu-value");
const ramValueElement = document.getElementById("ram-value");
const cpuTempElement = document.getElementById("cpu-temp");
const cpuScoreElement = document.getElementById("cpu-score");
const cpuCoresGridElement = document.getElementById("cpu-cores-grid");
const ramRingElement = document.getElementById("ram-ring");
const ramUsedElement = document.getElementById("ram-used");
const ramAvailableElement = document.getElementById("ram-available");
const ramSpeedElement = document.getElementById("ram-speed");
const gpuNameElement = document.getElementById("gpu-name");
const gpuLoadElement = document.getElementById("gpu-load");
const gpuTempElement = document.getElementById("gpu-temp");
const gpuClocksElement = document.getElementById("gpu-clocks");
const gpuFanElement = document.getElementById("gpu-fan");
const gpuVramElement = document.getElementById("gpu-vram");
const storageListElement = document.getElementById("disks-list");
const cpuStatusElement = document.getElementById("cpu-status");
const ramStatusElement = document.getElementById("ram-status");
const themeSelect = document.getElementById("theme-select");
const langSelect = document.getElementById("lang-select");
const themeBtnDark = document.getElementById("theme-btn-dark");
const themeBtnLight = document.getElementById("theme-btn-light");
const langBtnFr = document.getElementById("lang-btn-fr");
const langBtnEn = document.getElementById("lang-btn-en");
const langBtnEs = document.getElementById("lang-btn-es");
const langBtnAr = document.getElementById("lang-btn-ar");
const startupList = document.getElementById("startup-list");
const logCopyBtn = document.getElementById("log-copy");
const logClearBtn = document.getElementById("log-clear");
const logExportBtn = document.getElementById("log-export");
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("profile-modal-title");
const cancelModalBtn = document.getElementById("cancel-modal");
const saveModalBtn = document.getElementById("save-modal");
const runCleanSelectionBtn = document.getElementById("run-clean-selection");
const cpuMinInput = document.getElementById("cpu-min");
const cpuMaxInput = document.getElementById("cpu-max");
const screenTimeoutInput = document.getElementById("screen-timeout");
const coolingPolicyInput = document.getElementById("cooling-policy");
const diskTimeoutInput = document.getElementById("disk-timeout");
const wifiModeInput = document.getElementById("wifi-mode");
const pcieInput = document.getElementById("pci-express");
const coreParkingInput = document.getElementById("core-parking");
const cpuMinValueElement = document.getElementById("cpu-min-val");
const cpuMaxValueElement = document.getElementById("cpu-max-val");
const screenTimeoutValueElement = document.getElementById("screen-timeout-val");
const coreParkingValueElement = document.getElementById("core-parking-val");
const boostModeInput = document.getElementById("boost-mode");
const usbSuspendInput = document.getElementById("usb-suspend");
const powerTabBasicBtn = document.getElementById("power-tab-basic");
const powerTabExpertBtn = document.getElementById("power-tab-expert");

let currentLanguage = localStorage.getItem("nexus-lang") || "fr";
let currentTheme = localStorage.getItem("nexus-theme") || "dark";
let activeProfile = "";
let monitoringIntervalId = null;
let monitoringStopped = false;
let lastDiskThermalUpdateAt = 0;
const animatedValues = new Map();
let monitoringMode = "tauri";
let demoUptimeSeconds = 172800;
let hasLoggedDemoMode = false;

const ACTION_BUTTON_CLASSES = ["btn-loading", "btn-success", "btn-error"];
const PROFILE_SETTINGS_KEY = "nexus-power-profile-settings";
const logEntries = [];

const DEFAULT_PROFILE_SETTINGS = {
  eco: {
    cpuMinPercent: 5,
    cpuMaxPercent: 45,
    screenTimeoutMinutes: 5,
    coolingPolicy: "passive",
    diskTimeoutMinutes: 5,
    wifiMode: "max_saving",
    pcieLinkState: "max_saving",
    coreParking: 10,
    boostMode: 0,
    usbSuspend: 1
  },
  balanced: {
    cpuMinPercent: 25,
    cpuMaxPercent: 85,
    screenTimeoutMinutes: 15,
    coolingPolicy: "active",
    diskTimeoutMinutes: 10,
    wifiMode: "max_performance",
    pcieLinkState: "off",
    coreParking: 50,
    boostMode: 1,
    usbSuspend: 1
  },
  performance: {
    cpuMinPercent: 50,
    cpuMaxPercent: 100,
    screenTimeoutMinutes: 0,
    coolingPolicy: "active",
    diskTimeoutMinutes: 0,
    wifiMode: "max_performance",
    pcieLinkState: "off",
    coreParking: 100,
    boostMode: 2,
    usbSuspend: 0
  }
};

let profileSettingsByMode = loadStoredProfileSettings();

function t(key) {
  return i18n[currentLanguage]?.[key] || i18n.fr[key] || key;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getLogClass(message, isError) {
  const text = String(message).toLowerCase();
  if (isError || text.includes("error") || text.includes("❌")) {
    return "log-error";
  }
  if (text.includes("✅") || text.includes("prêt") || text.includes("ready")) {
    return "log-success";
  }
  return "";
}

function log(message, isError = false) {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = isError ? "❌" : "✅";
  const rawText = `[${timestamp}] ${prefix} ${message}`;
  logEntries.unshift(rawText);

  const cssClass = getLogClass(message, isError);
  const lineHtml = `<div class="log-line ${cssClass}"><span class="log-time">[${escapeHtml(timestamp)}]</span> ${escapeHtml(prefix)} ${escapeHtml(message)}</div>`;
  logOutput.insertAdjacentHTML("afterbegin", lineHtml);
}

function clearLogs() {
  logEntries.length = 0;
  if (logOutput) {
    logOutput.innerHTML = "";
  }
}

async function copyLogsToClipboard() {
  const text = logEntries.join("\n");
  await navigator.clipboard.writeText(text);
}

function exportLogsToFile() {
  const content = logEntries.join("\n") || "";
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `quoniam-nexus-logs-${Date.now()}.log`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  langSelect.value = currentLanguage;

  [langBtnFr, langBtnEn, langBtnEs, langBtnAr].forEach((button) => {
    if (!button) {
      return;
    }
    button.classList.toggle("active", button.dataset.value === currentLanguage);
  });

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = t(key);
    if (value) {
      element.textContent = value;
    }
  });
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", currentTheme);
  themeSelect.value = currentTheme;
  if (themeBtnDark) {
    themeBtnDark.classList.toggle("active", currentTheme === "dark");
  }
  if (themeBtnLight) {
    themeBtnLight.classList.toggle("active", currentTheme === "light");
  }
}

function switchView(viewName) {
  if (modalOverlay && !modalOverlay.hidden) {
    closeProfileModal();
  }

  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
    button.setAttribute("aria-current", button.dataset.view === viewName ? "page" : "false");
  });

  document.querySelectorAll(".view").forEach((view) => {
    view.classList.toggle("active", view.id === `view-${viewName}`);
  });

  if (viewName === "expert") {
    loadStartupApps();
  }
}

async function runAction(command, args = {}, successTextKey = "actionSuccess") {
  try {
    const result = await invoke(command, args);
    log(`${t(successTextKey)}: ${typeof result === "string" ? result : JSON.stringify(result)}`);
    return result;
  } catch (error) {
    log(`${t("actionError")}: ${String(error)}`, true);
    throw error;
  }
}

async function runQuickOptimize() {
  log(t("quickOptimizeStart"));
  try {
    await invoke("deep_clean");
    await invoke("optimize_ram");
    log(t("quickOptimizeDone"));
  } catch (error) {
    log(`${t("actionError")}: ${String(error)}`, true);
  }
}

function formatBytes(bytes) {
  const value = Number(bytes || 0);
  if (value <= 0) return "0 B";

  const units = ["B", "KB", "MB", "GB", "TB"];
  let scaled = value;
  let unitIndex = 0;

  while (scaled >= 1024 && unitIndex < units.length - 1) {
    scaled /= 1024;
    unitIndex += 1;
  }

  return `${scaled.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
}

function formatUptime(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds || 0));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const hhmmss = [hours, minutes, secs].map((value) => String(value).padStart(2, "0")).join(":");
  return days > 0 ? `${days}j ${hhmmss}` : hhmmss;
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function buildDemoStats() {
  const cpuUsage = randomBetween(15, 45);
  const cores = Array.from({ length: 8 }, (_, index) => ({
    index,
    usagePercent: randomBetween(15, 45),
    frequencyMhz: Math.round(randomBetween(3600, 5000))
  }));

  const totalRam = 16 * 1024 ** 3;
  const usedRam = Math.round((8.2 + randomBetween(-0.2, 0.2)) * 1024 ** 3);
  const availableRam = Math.max(0, totalRam - usedRam);

  demoUptimeSeconds += 1;

  return {
    hostname: "DEV-WEB-MODE",
    uptimeSeconds: demoUptimeSeconds,
    osVersion: "Windows 11 Professionnel",
    motherboardModel: "MSI MAG B650 TOMAHAWK WIFI",
    ramSpeedMhz: 6000,
    gpuCoreClock: 2655,
    gpuVramClock: 10501,
    systemScore: randomBetween(78, 90),
    cpu: {
      globalUsagePercent: cpuUsage,
      packageTemperatureCelsius: 55,
      cores
    },
    ram: {
      totalBytes: totalRam,
      usedBytes: usedRam,
      availableBytes: availableRam,
      usagePercent: (usedRam / totalRam) * 100
    },
    gpu: {
      name: "NVIDIA RTX 4070",
      loadPercent: 35,
      temperatureCelsius: 45,
      fanSpeedRpm: 1200,
      vramUsedBytes: 3 * 1024 ** 3,
      vramTotalBytes: 12 * 1024 ** 3
    },
    storage: [
      {
        name: "C: OS",
        usagePercent: 75,
        smartHealth: "Healthy",
        temperatureCelsius: 42,
        readBytesPerSec: 64 * 1024 ** 2,
        writeBytesPerSec: 28 * 1024 ** 2
      },
      {
        name: "D: Data",
        usagePercent: 20,
        smartHealth: "Healthy",
        temperatureCelsius: 36,
        readBytesPerSec: 15 * 1024 ** 2,
        writeBytesPerSec: 8 * 1024 ** 2
      }
    ]
  };
}

function animateNumber(element, key, target, formatFn) {
  if (!element) {
    return;
  }

  const from = animatedValues.has(key) ? animatedValues.get(key) : target;
  const start = performance.now();
  const duration = 280;

  const tick = (now) => {
    const progress = Math.min(1, (now - start) / duration);
    const current = from + (target - from) * progress;
    element.textContent = formatFn(current);

    if (progress < 1) {
      requestAnimationFrame(tick);
      return;
    }

    animatedValues.set(key, target);
  };

  requestAnimationFrame(tick);
}

function renderCpuCores(cores) {
  if (!cpuCoresGridElement) {
    return;
  }

  const safeCores = Array.isArray(cores) ? cores : [];
  cpuCoresGridElement.innerHTML = "";

  for (const core of safeCores.slice(0, 16)) {
    const meter = document.createElement("div");
    meter.className = "core-meter";

    const fill = document.createElement("div");
    fill.className = "core-meter-fill";
    const usagePercent = Math.max(0, Math.min(100, Number(core.usagePercent || 0)));
    fill.style.width = `${usagePercent}%`;

    const label = document.createElement("div");
    label.className = "core-meter-label";
    label.textContent = `C${core.index} ${Math.round(Number(core.frequencyMhz || 0))}MHz`;

    meter.appendChild(fill);
    meter.appendChild(label);
    cpuCoresGridElement.appendChild(meter);
  }
}

function renderStorage(storage, shouldRefreshTemps) {
  if (!storageListElement) {
    return;
  }

  const devices = Array.isArray(storage) ? storage : [];
  storageListElement.innerHTML = "";

  for (const disk of devices) {
    const item = document.createElement("li");
    item.className = "storage-item";

    const top = document.createElement("div");
    top.className = "storage-top";
    const driveLetter = String(disk.name || "Disk").match(/[A-Za-z]:/)?.[0] || "--:";
    top.innerHTML = `<strong>${driveLetter} ${disk.name || "Disk"}</strong><span>${(disk.usagePercent || 0).toFixed(1)}%</span>`;

    const bar = document.createElement("div");
    bar.className = "storage-bar";
    const fill = document.createElement("div");
    fill.className = "storage-fill";
    fill.style.width = `${Math.max(0, Math.min(100, Number(disk.usagePercent || 0)))}%`;
    bar.appendChild(fill);

    const details = document.createElement("div");
    details.className = "gpu-stats-grid";
    const tempText = shouldRefreshTemps ? (disk.temperatureCelsius != null ? `${Number(disk.temperatureCelsius).toFixed(1)}°C` : "--°C") : "--°C";
    details.innerHTML = `
      <span>Health: ${disk.smartHealth || "Unknown"}</span>
      <span>Temp: ${tempText}</span>
      <span>R/W: ${formatBytes(disk.readBytesPerSec || 0)}/s • ${formatBytes(disk.writeBytesPerSec || 0)}/s</span>
    `;

    item.appendChild(top);
    item.appendChild(bar);
    item.appendChild(details);
    storageListElement.appendChild(item);
  }
}

function applyExtendedStats(stats) {
  const cpuUsage = Number(stats?.cpu?.globalUsagePercent ?? 0);
  const ramUsage = Number(stats?.ram?.usagePercent ?? 0);
  const gpuLoad = Number(stats?.gpu?.loadPercent ?? 0);
  const now = Date.now();
  const shouldRefreshTemps = now - lastDiskThermalUpdateAt >= 5000;

  if (hostNameElement) {
    hostNameElement.textContent = stats?.hostname || "Unknown Host";
  }

  if (uptimeValueElement) {
    uptimeValueElement.textContent = formatUptime(stats?.uptimeSeconds || 0);
  }

  if (uptimeInlineElement) {
    uptimeInlineElement.textContent = formatUptime(stats?.uptimeSeconds || 0);
  }

  if (osVersionElement) {
    osVersionElement.textContent = stats?.osVersion || "--";
  }

  if (motherboardModelElement) {
    motherboardModelElement.textContent = stats?.motherboardModel || "--";
  }

  animateNumber(cpuValueElement, "cpu", cpuUsage, (value) => `${value.toFixed(1)}%`);
  animateNumber(ramValueElement, "ram", ramUsage, (value) => `${value.toFixed(1)}%`);
  animateNumber(gpuLoadElement, "gpu", gpuLoad, (value) => `${value.toFixed(1)}%`);

  if (cpuTempElement) {
    cpuTempElement.textContent = stats?.cpu?.packageTemperatureCelsius != null
      ? `${Number(stats.cpu.packageTemperatureCelsius).toFixed(1)}°C`
      : "--°C";
  }

  if (cpuScoreElement) {
    const score = Number(stats?.systemScore ?? 0).toFixed(1);
    cpuScoreElement.textContent = `Score ${score}`;
  }

  renderCpuCores(stats?.cpu?.cores);

  if (ramRingElement) {
    ramRingElement.style.setProperty("--ring", String(Math.max(0, Math.min(100, ramUsage))));
  }

  if (ramUsedElement) {
    ramUsedElement.textContent = `Used: ${formatBytes(stats?.ram?.usedBytes || 0)}`;
  }

  if (ramAvailableElement) {
    ramAvailableElement.textContent = `Available: ${formatBytes(stats?.ram?.availableBytes || 0)}`;
  }

  if (ramSpeedElement) {
    ramSpeedElement.textContent = `Vitesse: ${Number(stats?.ramSpeedMhz || 0)} MHz`;
  }

  if (gpuNameElement) {
    gpuNameElement.textContent = stats?.gpu?.name || "Unknown GPU";
  }

  if (gpuTempElement) {
    gpuTempElement.textContent = `Temp: ${stats?.gpu?.temperatureCelsius != null ? `${Number(stats.gpu.temperatureCelsius).toFixed(1)}°C` : "--°C"}`;
  }

  if (gpuClocksElement) {
    gpuClocksElement.textContent = `Core: ${Number(stats?.gpuCoreClock || 0)} MHz • Mémoire: ${Number(stats?.gpuVramClock || 0)} MHz`;
  }

  if (gpuFanElement) {
    gpuFanElement.textContent = `Fan: ${stats?.gpu?.fanSpeedRpm != null ? `${stats.gpu.fanSpeedRpm} RPM` : "-- RPM"}`;
  }

  if (gpuVramElement) {
    const used = formatBytes(stats?.gpu?.vramUsedBytes || 0);
    const total = formatBytes(stats?.gpu?.vramTotalBytes || 0);
    gpuVramElement.textContent = `VRAM: ${used} / ${total}`;
  }

  if (cpuStatusElement) {
    cpuStatusElement.className = `status-state ${cpuUsage > 85 ? "warning" : "secure"}`;
    cpuStatusElement.textContent = cpuUsage > 85 ? t("statusHigh") : t("statusStable");
  }

  if (ramStatusElement) {
    const isHigh = ramUsage > 80;
    ramStatusElement.className = `status-state ${isHigh ? "error" : "secure"}`;
    ramStatusElement.textContent = isHigh ? t("statusHigh") : t("statusStable");
  }

  if (ramValueElement) {
    ramValueElement.classList.toggle("error", ramUsage > 80);
  }

  renderStorage(stats?.storage, shouldRefreshTemps);

  if (shouldRefreshTemps) {
    lastDiskThermalUpdateAt = now;
  }
}

async function refreshSystemStats() {
  if (monitoringMode === "demo") {
    applyExtendedStats(buildDemoStats());
    return;
  }

  try {
    const stats = await invoke("get_extended_stats");
    applyExtendedStats(stats || {});
  } catch {
    monitoringMode = "demo";
    if (!hasLoggedDemoMode) {
      log("Mode démo activé (Tauri indisponible en dev web).", false);
      hasLoggedDemoMode = true;
    }
    applyExtendedStats(buildDemoStats());
  }
}

function startMonitoring() {
  if (monitoringStopped || monitoringIntervalId) {
    return;
  }

  refreshSystemStats();
  monitoringIntervalId = setInterval(refreshSystemStats, 500);
}

async function loadStartupApps() {
  startupList.innerHTML = "";
  try {
    const apps = await invoke("get_startup_apps");
    if (!Array.isArray(apps) || apps.length === 0) {
      const item = document.createElement("li");
      item.className = "startup-item";
      item.textContent = t("startupEmpty");
      startupList.appendChild(item);
      return;
    }

    for (const app of apps) {
      const item = document.createElement("li");
      item.className = "startup-item";

      const info = document.createElement("div");
      const name = document.createElement("div");
      name.className = "startup-name";
      name.textContent = app.name || "Unknown";

      const path = document.createElement("div");
      path.className = "startup-path";
      path.textContent = app.command || "";

      info.appendChild(name);
      info.appendChild(path);

      const disableBtn = document.createElement("button");
      disableBtn.className = "disable-btn";
      disableBtn.textContent = t("disable");
      disableBtn.addEventListener("click", async () => {
        try {
          const res = await invoke("disable_startup_app", { name: app.name });
          log(`${t("startupDisabled")}: ${res}`);
          await loadStartupApps();
        } catch (error) {
          log(`${t("actionError")}: ${String(error)}`, true);
        }
      });

      item.appendChild(info);
      item.appendChild(disableBtn);
      startupList.appendChild(item);
    }
  } catch (error) {
    const item = document.createElement("li");
    item.className = "startup-item";
    item.textContent = `${t("startupLoadError")}: ${String(error)}`;
    startupList.appendChild(item);
    log(`${t("startupLoadError")}: ${String(error)}`, true);
  }
}

function profileLabel(profile) {
  if (profile === "eco") return t("powerEco");
  if (profile === "balanced") return t("powerBalanced");
  return t("powerPerformance");
}

function openProfileModal(profile) {
  activeProfile = profile;
  modalTitle.textContent = `${t("profileModalTitle")} ${profileLabel(profile)}`;
  fillPowerSettings(profileSettingsByMode[profile] || DEFAULT_PROFILE_SETTINGS.balanced);
  setPowerModalTab("basic");
  modalOverlay.hidden = false;
  modalOverlay.classList.add("is-open");
}

function closeProfileModal() {
  modalOverlay.hidden = true;
  modalOverlay.classList.remove("is-open");
}

function collectPowerSettings() {
  return {
    cpuMinPercent: Number(cpuMinInput.value),
    cpuMaxPercent: Number(cpuMaxInput.value),
    screenTimeoutMinutes: Number(screenTimeoutInput.value),
    coolingPolicy: coolingPolicyInput.value,
    diskTimeoutMinutes: Number(diskTimeoutInput.value),
    wifiMode: wifiModeInput.value,
    pcieLinkState: pcieInput.value,
    coreParking: Number(coreParkingInput.value),
    boostMode: Number(boostModeInput.value),
    usbSuspend: Number(usbSuspendInput.value)
  };
}

function updateSliderValueDisplays() {
  if (cpuMinValueElement) {
    cpuMinValueElement.textContent = `${cpuMinInput.value}%`;
  }
  if (cpuMaxValueElement) {
    cpuMaxValueElement.textContent = `${cpuMaxInput.value}%`;
  }
  if (screenTimeoutValueElement) {
    screenTimeoutValueElement.textContent = `${screenTimeoutInput.value} min`;
  }
  if (coreParkingValueElement) {
    coreParkingValueElement.textContent = `${coreParkingInput.value}%`;
  }
}

function fillPowerSettings(settings) {
  const merged = {
    ...DEFAULT_PROFILE_SETTINGS.balanced,
    ...settings
  };

  cpuMinInput.value = merged.cpuMinPercent;
  cpuMaxInput.value = merged.cpuMaxPercent;
  screenTimeoutInput.value = merged.screenTimeoutMinutes;
  coolingPolicyInput.value = merged.coolingPolicy;
  diskTimeoutInput.value = merged.diskTimeoutMinutes;
  wifiModeInput.value = merged.wifiMode;
  pcieInput.value = merged.pcieLinkState;
  coreParkingInput.value = merged.coreParking;
  boostModeInput.value = String(merged.boostMode);
  usbSuspendInput.value = String(merged.usbSuspend);
  updateSliderValueDisplays();
}

function setPowerModalTab(tabName) {
  document.querySelectorAll(".modal-tab").forEach((button) => {
    const isActive = button.dataset.tab === tabName;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  document.querySelectorAll(".modal-panel").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tabName);
  });
}

function loadStoredProfileSettings() {
  try {
    const raw = localStorage.getItem(PROFILE_SETTINGS_KEY);
    if (!raw) {
      return structuredClone(DEFAULT_PROFILE_SETTINGS);
    }

    const parsed = JSON.parse(raw);
    return {
      eco: { ...DEFAULT_PROFILE_SETTINGS.eco, ...(parsed.eco || {}) },
      balanced: { ...DEFAULT_PROFILE_SETTINGS.balanced, ...(parsed.balanced || {}) },
      performance: { ...DEFAULT_PROFILE_SETTINGS.performance, ...(parsed.performance || {}) }
    };
  } catch {
    return structuredClone(DEFAULT_PROFILE_SETTINGS);
  }
}

function persistProfileSettings() {
  localStorage.setItem(PROFILE_SETTINGS_KEY, JSON.stringify(profileSettingsByMode));
}

function collectDeepCleanSelection() {
  return {
    cleanWindowsTemp: document.getElementById("clean-windows-temp").checked,
    cleanWindowsUpdate: document.getElementById("clean-windows-update").checked,
    cleanBrowserCache: document.getElementById("clean-browser-cache").checked,
    cleanPrefetch: document.getElementById("clean-prefetch").checked
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setActionButtonState(button, state) {
  if (!button) {
    return;
  }

  if (!button.dataset.defaultLabel) {
    button.dataset.defaultLabel = button.textContent.trim();
  }

  button.classList.remove(...ACTION_BUTTON_CLASSES);
  button.disabled = false;

  if (state === "idle") {
    button.textContent = button.dataset.defaultLabel;
    return;
  }

  if (state === "loading") {
    button.classList.add("btn-loading");
    button.disabled = true;
    button.textContent = t("btnLoading");
    return;
  }

  if (state === "success") {
    button.classList.add("btn-success");
    button.disabled = true;
    button.textContent = t("btnSuccess");
    return;
  }

  button.classList.add("btn-error");
  button.disabled = true;
  button.textContent = t("btnError");
}

async function runActionWithFeedback(button, command, args = {}, successTextKey = "actionSuccess") {
  setActionButtonState(button, "loading");

  try {
    const result = await invoke(command, args);
    log(`${t(successTextKey)}: ${typeof result === "string" ? result : JSON.stringify(result)}`);
    setActionButtonState(button, "success");
    await sleep(2000);
    setActionButtonState(button, "idle");
    return result;
  } catch (error) {
    log(`${t("actionError")}: ${String(error)}`, true);
    setActionButtonState(button, "error");
    await sleep(3000);
    setActionButtonState(button, "idle");
    throw error;
  }
}

function safeClick(element, handler) {
  if (!element) {
    return;
  }
  element.addEventListener("click", handler);
}

document.querySelectorAll(".nav-btn").forEach((button) => {
  safeClick(button, () => switchView(button.dataset.view));
});

safeClick(document.getElementById("quick-optimize"), runQuickOptimize);

document.querySelectorAll(".power-card").forEach((card) => {
  card.addEventListener("click", async () => {
    const mode = card.dataset.powerMode;
    await runAction("set_power_mode", { mode }, "powerModeSet");
  });
});

document.querySelectorAll(".gear-btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    openProfileModal(button.dataset.profile);
  });
});

safeClick(cancelModalBtn, closeProfileModal);
if (modalOverlay) {
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeProfileModal();
    }
  });
}

safeClick(saveModalBtn, async () => {
  try {
    const settings = collectPowerSettings();
    profileSettingsByMode[activeProfile] = settings;
    persistProfileSettings();

    await runActionWithFeedback(saveModalBtn, "apply_custom_power_profile", { settings }, "profileSaved");
    log(`${t("profileSaved")}: ${profileLabel(activeProfile)}`);
    closeProfileModal();
  } catch {
    // Le feedback visuel et le log d'erreur sont déjà gérés dans runActionWithFeedback.
  }
});

safeClick(powerTabBasicBtn, () => setPowerModalTab("basic"));
safeClick(powerTabExpertBtn, () => setPowerModalTab("expert"));

if (runCleanSelectionBtn) {
  runCleanSelectionBtn.addEventListener("click", () =>
    runActionWithFeedback(runCleanSelectionBtn, "deep_clean_selected", { selection: collectDeepCleanSelection() })
  );
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modalOverlay.hidden) {
    closeProfileModal();
  }
});

[cpuMinInput, cpuMaxInput, screenTimeoutInput, coreParkingInput].forEach((slider) => {
  if (!slider) {
    return;
  }

  slider.addEventListener("input", updateSliderValueDisplays);
});

const optimizeRamBtn = document.getElementById("optimize-ram");
const debloatBtn = document.getElementById("debloat");
const optimizeNtfsBtn = document.getElementById("optimize-ntfs");
const disableTelemetryServicesBtn = document.getElementById("disable-telemetry-services");
const cpuBoostAggressiveBtn = document.getElementById("cpu-boost-aggressive");
const updateAllBtn = document.getElementById("update-all");
const flushDnsBtn = document.getElementById("flush-dns");
const resetNetworkBtn = document.getElementById("reset-network");
const setDnsCfBtn = document.getElementById("set-dns-cf");
const setDnsGoogleBtn = document.getElementById("set-dns-google");
const gpuHagsModeSelect = document.getElementById("gpu-hags-mode");
const setGpuHagsBtn = document.getElementById("set-gpu-hags");
const clearShaderCacheBtn = document.getElementById("clear-shader-cache");
const refreshStartupBtn = document.getElementById("refresh-startup");

const GUID_PROCESSOR_PERF_BOOST_MODE = "be337238-0d82-4146-a960-4f3749d470c7";

safeClick(optimizeRamBtn, () => runActionWithFeedback(optimizeRamBtn, "optimize_ram"));
safeClick(debloatBtn, () => runActionWithFeedback(debloatBtn, "debloat"));
safeClick(optimizeNtfsBtn, () => runActionWithFeedback(optimizeNtfsBtn, "optimize_ntfs_settings"));
safeClick(disableTelemetryServicesBtn, () => runActionWithFeedback(disableTelemetryServicesBtn, "disable_telemetry_services"));
safeClick(cpuBoostAggressiveBtn, () =>
  runActionWithFeedback(cpuBoostAggressiveBtn, "set_advanced_cpu_tweak", {
    guid: GUID_PROCESSOR_PERF_BOOST_MODE,
    value: 2
  })
);
safeClick(updateAllBtn, () => runActionWithFeedback(updateAllBtn, "update_all"));
safeClick(flushDnsBtn, () => runActionWithFeedback(flushDnsBtn, "flush_dns"));
safeClick(resetNetworkBtn, () => runActionWithFeedback(resetNetworkBtn, "reset_network"));
safeClick(setDnsCfBtn, () => runActionWithFeedback(setDnsCfBtn, "set_fast_dns", { provider: "cloudflare" }));
safeClick(setDnsGoogleBtn, () => runActionWithFeedback(setDnsGoogleBtn, "set_fast_dns", { provider: "google" }));
safeClick(setGpuHagsBtn, () =>
  runActionWithFeedback(setGpuHagsBtn, "set_gpu_hags", {
    enable: gpuHagsModeSelect?.value === "on"
  })
);
safeClick(clearShaderCacheBtn, () => runActionWithFeedback(clearShaderCacheBtn, "clear_shader_cache"));
safeClick(refreshStartupBtn, () => runActionWithFeedback(refreshStartupBtn, "get_startup_apps").then((apps) => {
  startupList.innerHTML = "";
  if (!Array.isArray(apps) || apps.length === 0) {
    const item = document.createElement("li");
    item.className = "startup-item";
    item.textContent = t("startupEmpty");
    startupList.appendChild(item);
    return;
  }

  for (const app of apps) {
    const item = document.createElement("li");
    item.className = "startup-item";

    const info = document.createElement("div");
    const name = document.createElement("div");
    name.className = "startup-name";
    name.textContent = app.name || "Unknown";

    const path = document.createElement("div");
    path.className = "startup-path";
    path.textContent = app.command || "";

    info.appendChild(name);
    info.appendChild(path);

    const disableBtn = document.createElement("button");
    disableBtn.className = "disable-btn";
    disableBtn.textContent = t("disable");
    disableBtn.addEventListener("click", async () => {
      try {
        const res = await invoke("disable_startup_app", { name: app.name });
        log(`${t("startupDisabled")}: ${res}`);
        await loadStartupApps();
      } catch (error) {
        log(`${t("actionError")}: ${String(error)}`, true);
      }
    });

    item.appendChild(info);
    item.appendChild(disableBtn);
    startupList.appendChild(item);
  }
}).catch(() => {
  // Le feedback visuel + log d'erreur sont gérés dans runActionWithFeedback.
}));

themeSelect.addEventListener("change", () => {
  currentTheme = themeSelect.value;
  localStorage.setItem("nexus-theme", currentTheme);
  applyTheme();
});

[themeBtnDark, themeBtnLight].forEach((button) => {
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    currentTheme = button.dataset.value;
    localStorage.setItem("nexus-theme", currentTheme);
    themeSelect.value = currentTheme;
    applyTheme();
  });
});

langSelect.addEventListener("change", () => {
  currentLanguage = langSelect.value;
  localStorage.setItem("nexus-lang", currentLanguage);
  applyLanguage();
  if (document.getElementById("view-expert").classList.contains("active")) {
    loadStartupApps();
  }
});

[langBtnFr, langBtnEn, langBtnEs, langBtnAr].forEach((button) => {
  if (!button) {
    return;
  }

  button.addEventListener("click", () => {
    currentLanguage = button.dataset.value;
    localStorage.setItem("nexus-lang", currentLanguage);
    langSelect.value = currentLanguage;
    applyLanguage();
    if (document.getElementById("view-expert").classList.contains("active")) {
      loadStartupApps();
    }
  });
});

safeClick(logClearBtn, () => {
  clearLogs();
  log("Logs effacés.");
});

safeClick(logCopyBtn, async () => {
  try {
    await copyLogsToClipboard();
    log("Logs copiés dans le presse-papier.");
  } catch (error) {
    log(`Erreur: ${String(error)}`, true);
  }
});

safeClick(logExportBtn, () => {
  exportLogsToFile();
  log("Export des logs terminé.");
});

applyTheme();
applyLanguage();
updateSliderValueDisplays();
switchView("home");
startMonitoring();
log("Quoniam Nexus prêt.");