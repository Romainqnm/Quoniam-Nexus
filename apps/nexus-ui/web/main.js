import { invoke } from "@tauri-apps/api/core";

const i18n = {
  fr: {
    navHome: "Accueil",
    navExpert: "Mode Expert",
    navSettingsLogs: "Paramètres & Logs",
    homeTitle: "Optimisation simple en 1 clic",
    homeSubtitle: "Analysez et appliquez les optimisations principales automatiquement.",
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
    deepClean: "Nettoyage profond",
    optimizeRam: "Optimiser la mémoire",
    debloat: "Désinstaller bloatwares",
    updateAll: "Mettre à jour tout",
    flushDns: "Vider le cache DNS",
    resetNetwork: "Réinitialiser le réseau",
    setDnsCloudflare: "DNS Cloudflare (1.1.1.1)",
    setDnsGoogle: "DNS Google (8.8.8.8)",
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
    cpuMin: "Performance CPU Min",
    cpuMax: "Performance CPU Max",
    screenOff: "Extinction Écran (min)",
    cancel: "Annuler",
    save: "Sauvegarder",
    profileSaved: "Profil sauvegardé"
  },
  en: {
    navHome: "Home",
    navExpert: "Expert Mode",
    navSettingsLogs: "Settings & Logs",
    homeTitle: "Simple one-click optimization",
    homeSubtitle: "Analyze and apply key optimizations automatically.",
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
    deepClean: "Deep clean",
    optimizeRam: "Optimize memory",
    debloat: "Remove bloatware",
    updateAll: "Update everything",
    flushDns: "Flush DNS cache",
    resetNetwork: "Reset network",
    setDnsCloudflare: "Cloudflare DNS (1.1.1.1)",
    setDnsGoogle: "Google DNS (8.8.8.8)",
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
    cpuMin: "CPU Performance Min",
    cpuMax: "CPU Performance Max",
    screenOff: "Screen Timeout (min)",
    cancel: "Cancel",
    save: "Save",
    profileSaved: "Profile saved"
  },
  es: {
    navHome: "Inicio",
    navExpert: "Modo Experto",
    navSettingsLogs: "Configuración y Logs",
    homeTitle: "Optimización simple en 1 clic",
    homeSubtitle: "Analiza y aplica optimizaciones clave automáticamente.",
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
    deepClean: "Limpieza profunda",
    optimizeRam: "Optimizar memoria",
    debloat: "Eliminar bloatware",
    updateAll: "Actualizar todo",
    flushDns: "Vaciar caché DNS",
    resetNetwork: "Restablecer red",
    setDnsCloudflare: "DNS Cloudflare (1.1.1.1)",
    setDnsGoogle: "DNS Google (8.8.8.8)",
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
    cpuMin: "Rendimiento CPU Mín",
    cpuMax: "Rendimiento CPU Máx",
    screenOff: "Apagado de pantalla (min)",
    cancel: "Cancelar",
    save: "Guardar",
    profileSaved: "Perfil guardado"
  },
  ar: {
    navHome: "الرئيسية",
    navExpert: "الوضع المتقدم",
    navSettingsLogs: "الإعدادات والسجلات",
    homeTitle: "تحسين بسيط بنقرة واحدة",
    homeSubtitle: "حلّل وطبّق أهم التحسينات تلقائيًا.",
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
    deepClean: "تنظيف عميق",
    optimizeRam: "تحسين الذاكرة",
    debloat: "إزالة البرامج غير الضرورية",
    updateAll: "تحديث الكل",
    flushDns: "تفريغ DNS",
    resetNetwork: "إعادة ضبط الشبكة",
    setDnsCloudflare: "DNS كلاودفلير (1.1.1.1)",
    setDnsGoogle: "DNS جوجل (8.8.8.8)",
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
    cpuMin: "الحد الأدنى لأداء المعالج",
    cpuMax: "الحد الأقصى لأداء المعالج",
    screenOff: "إطفاء الشاشة (دقيقة)",
    cancel: "إلغاء",
    save: "حفظ",
    profileSaved: "تم حفظ الملف"
  }
};

const logOutput = document.getElementById("log-output");
const themeSelect = document.getElementById("theme-select");
const langSelect = document.getElementById("lang-select");
const startupList = document.getElementById("startup-list");
const modalOverlay = document.getElementById("modal-overlay");
const modalTitle = document.getElementById("profile-modal-title");
const cancelModalBtn = document.getElementById("cancel-modal");
const saveModalBtn = document.getElementById("save-modal");

let currentLanguage = localStorage.getItem("nexus-lang") || "fr";
let currentTheme = localStorage.getItem("nexus-theme") || "dark";
let activeProfile = "";

function t(key) {
  return i18n[currentLanguage]?.[key] || i18n.fr[key] || key;
}

function log(message, isError = false) {
  const timestamp = new Date().toLocaleTimeString();
  const prefix = isError ? "❌" : "✅";
  logOutput.textContent = `[${timestamp}] ${prefix} ${message}\n${logOutput.textContent}`;
}

function applyLanguage() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  langSelect.value = currentLanguage;

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
}

function switchView(viewName) {
  document.querySelectorAll(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.view === viewName);
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
  modalOverlay.hidden = false;
}

function closeProfileModal() {
  modalOverlay.hidden = true;
}

document.querySelectorAll(".nav-btn").forEach((button) => {
  button.addEventListener("click", () => switchView(button.dataset.view));
});

document.getElementById("quick-optimize").addEventListener("click", runQuickOptimize);

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

cancelModalBtn.addEventListener("click", closeProfileModal);
modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay) {
    closeProfileModal();
  }
});

saveModalBtn.addEventListener("click", () => {
  log(`${t("profileSaved")}: ${profileLabel(activeProfile)}`);
  closeProfileModal();
});

document.getElementById("deep-clean").addEventListener("click", () => runAction("deep_clean"));
document.getElementById("optimize-ram").addEventListener("click", () => runAction("optimize_ram"));
document.getElementById("debloat").addEventListener("click", () => runAction("debloat"));
document.getElementById("update-all").addEventListener("click", () => runAction("update_all"));
document.getElementById("flush-dns").addEventListener("click", () => runAction("flush_dns"));
document.getElementById("reset-network").addEventListener("click", () => runAction("reset_network"));
document.getElementById("set-dns-cf").addEventListener("click", () => runAction("set_fast_dns", { provider: "cloudflare" }));
document.getElementById("set-dns-google").addEventListener("click", () => runAction("set_fast_dns", { provider: "google" }));
document.getElementById("refresh-startup").addEventListener("click", loadStartupApps);

themeSelect.addEventListener("change", () => {
  currentTheme = themeSelect.value;
  localStorage.setItem("nexus-theme", currentTheme);
  applyTheme();
});

langSelect.addEventListener("change", () => {
  currentLanguage = langSelect.value;
  localStorage.setItem("nexus-lang", currentLanguage);
  applyLanguage();
  if (document.getElementById("view-expert").classList.contains("active")) {
    loadStartupApps();
  }
});

applyTheme();
applyLanguage();
switchView("home");
log("Quoniam Nexus prêt.");