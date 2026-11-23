// ==========================================================================
// Atelier Mariem - Main Application Controller
// Orchestrates scene routing, header controls, sound, i18n & About modal
// ==========================================================================

import { renderStudioScene } from "./studioScene.js";
import { OrderFlowController } from "./orderFlow.js";
import { WorkshopController } from "./workshopScene.js";
import { WardrobeController } from "./wardrobeScene.js";
import { FittingRoomController } from "./fittingRoomScene.js";
import { state } from "./state.js";
import { t, getLang, setLang } from "./i18n.js";
import { toggleAudioMute, isAudioMuted, playSound } from "./audio.js";
import { icon } from "./icons.js";

class AtelierApp {
  constructor() {
    this.mainContainer = document.getElementById("app-main-viewport");
    this.orderController = null;
    this.workshopController = null;
    this.wardrobeController = null;
    this.fittingController = null;
  }

  init() {
    this.setupNavigation();
    this.setupHeaderActions();
    this.setupAboutModal();
    this.setupEventListeners();

    this.updateWardrobeBadge();
    this.updateLanguageButton();
    this.updateSoundButton();

    // Start on Studio home scene
    this.navigateTo("studio");
  }

  setupNavigation() {
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        playSound("click");
        const targetScene = link.getAttribute("data-scene");
        this.navigateTo(targetScene);
      });
    });
  }

  setupHeaderActions() {
    // Sound Toggle
    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        toggleAudioMute();
        this.updateSoundButton();
        if (!isAudioMuted()) playSound("click");
      });
    }

    // Language Toggle
    const langBtn = document.getElementById("btn-toggle-lang");
    if (langBtn) {
      langBtn.addEventListener("click", () => {
        playSound("click");
        const nextLang = getLang() === "en" ? "fr" : "en";
        setLang(nextLang);
      });
    }

    // About Mariem Header Button
    const aboutBtn = document.getElementById("btn-nav-about");
    if (aboutBtn) {
      aboutBtn.addEventListener("click", () => {
        playSound("click");
        this.openAboutModal();
      });
    }

    // Logo Brand Link returns to Studio
    const logo = document.getElementById("brand-logo-link");
    if (logo) {
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        playSound("click");
        this.navigateTo("studio");
      });
    }
  }

  setupAboutModal() {
    const modal = document.getElementById("about-mariem-modal");
    const closeBtn = document.getElementById("btn-close-about-modal");

    if (closeBtn && modal) {
      closeBtn.addEventListener("click", () => {
        playSound("click");
        modal.style.display = "none";
      });
    }

    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    }
  }

  openAboutModal() {
    const modal = document.getElementById("about-mariem-modal");
    if (modal) {
      modal.style.display = "flex";
      this.updateStaticTranslations();
    }
  }

  setupEventListeners() {
    state.on("navigateScene", (sceneName) => {
      this.navigateTo(sceneName);
    });

    state.on("navigateSceneWithFlyIn", (data) => {
      this.navigateTo(data.scene, { flyInPiece: data.piece });
    });

    state.on("openAboutModal", () => {
      this.openAboutModal();
    });

    state.on("wardrobeChanged", () => {
      this.updateWardrobeBadge();
    });

    document.addEventListener("languageChanged", () => {
      this.updateLanguageButton();
      this.updateStaticTranslations();
      // Re-render current scene with updated language smoothly
      if (state.currentScene === "order" && this.orderController) {
        this.orderController.reRender();
      } else {
        this.navigateTo(state.currentScene);
      }
    });
  }

  updateWardrobeBadge() {
    const badge = document.getElementById("nav-wardrobe-count");
    if (badge) {
      const count = state.wardrobe.length;
      badge.textContent = count;
      badge.setAttribute("aria-label", `${count} ${t("wardrobe_count_label")}`);
    }
  }

  updateLanguageButton() {
    const langBtn = document.getElementById("btn-toggle-lang");
    if (langBtn) {
      const current = getLang();
      langBtn.innerHTML = `${icon("globe", 16, 16)} <span class="lang-text">${current === "en" ? "FR" : "EN"}</span>`;
      langBtn.title = t("lang_toggle");
    }
  }

  updateSoundButton() {
    const soundBtn = document.getElementById("btn-toggle-sound");
    if (soundBtn) {
      const muted = isAudioMuted();
      soundBtn.innerHTML = icon(muted ? "volumeX" : "volume", 18, 18);
      soundBtn.classList.toggle("muted", muted);
      soundBtn.title = t("sound_toggle");
    }
  }

  updateStaticTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(elem => {
      const key = elem.getAttribute("data-i18n");
      elem.textContent = t(key);
    });
  }

  navigateTo(sceneName, options = {}) {
    // Teardown previous controller if applicable
    if (this.workshopController && sceneName !== "workshop") {
      this.workshopController.destroy();
      this.workshopController = null;
    }

    state.currentScene = sceneName;

    // Update nav active classes
    document.querySelectorAll(".nav-link").forEach(link => {
      link.classList.toggle("active", link.getAttribute("data-scene") === sceneName);
    });

    // Clean viewport
    this.mainContainer.innerHTML = "";
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Render corresponding scene
    switch (sceneName) {
      case "studio":
        renderStudioScene(this.mainContainer);
        break;

      case "order":
        this.orderController = new OrderFlowController(this.mainContainer);
        this.orderController.init();
        break;

      case "workshop":
        this.workshopController = new WorkshopController(this.mainContainer);
        this.workshopController.init();
        break;

      case "wardrobe":
        this.wardrobeController = new WardrobeController(this.mainContainer);
        this.wardrobeController.init(options);
        break;

      case "fitting":
        this.fittingController = new FittingRoomController(this.mainContainer);
        this.fittingController.init();
        break;

      default:
        renderStudioScene(this.mainContainer);
    }

    this.updateStaticTranslations();
  }
}

// Bootstrap once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const app = new AtelierApp();
  app.init();
  window.__ATELIER_APP__ = app;
});
