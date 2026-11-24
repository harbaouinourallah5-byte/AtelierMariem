// ==========================================================================
// Atelier Mariem - Studio Scene (Home)
// Minimalist architectural atelier loft with drafting desk, vintage Singer machine,
// blueprints, ambient window daylight & cohesive vector icon system
// ==========================================================================

import { getMariemAvatarImg } from "./characterSvg.js";
import { icon } from "./icons.js";
import { t } from "./i18n.js";
import { state } from "./state.js";
import { playSound } from "./audio.js";

export function renderStudioScene(container) {
  container.innerHTML = `
    <section class="scene scene-studio" id="scene-studio" aria-label="Mariem's Studio & Drafting Workshop">
      <!-- Ambient Studio Lighting Overlay -->
      <div class="studio-ambient-light"></div>

      <!-- Studio Header Badges (Pro-Coded, Aligned, Unified Vector Icons) -->
      <div class="studio-header-floating">
        <div class="floating-badge student-badge">
          <span class="badge-icon">${icon("compass")}</span>
          <span class="badge-text" data-i18n="studio_welcome_badge">${t("studio_welcome_badge")}</span>
        </div>
        <div class="floating-badge exam-badge">
          <span class="badge-icon">${icon("bookOpen")}</span>
          <span class="badge-text" data-i18n="studio_exam_countdown">${t("studio_exam_countdown")}</span>
        </div>
        <div class="floating-badge coffee-badge">
          <span class="badge-icon">${icon("coffee")}</span>
          <span class="badge-text" data-i18n="studio_coffee_badge">${t("studio_coffee_badge")}</span>
        </div>
      </div>

      <!-- Studio Room Illustration Stage -->
      <div class="studio-stage">
        <!-- Room Architecture / Background Wall -->
        <div class="studio-room-bg">
          <!-- Window with Natural Studio Daylight & Soft Minimalist Linen -->
          <div class="studio-window">
            <div class="window-sunlight"></div>
            <div class="window-frame">
              <div class="curtain curtain-left"></div>
              <div class="curtain curtain-right"></div>
              <div class="window-pane">
                <div class="window-sky">
                  <div class="floating-cloud"></div>
                  <div class="warm-sun"></div>
                </div>
              </div>
            </div>
            <!-- Window Sill with Ceramic Planters -->
            <div class="window-sill">
              <div class="mini-ceramic-pot">
                <div class="succulent-stem"></div>
              </div>
              <div class="mini-ceramic-pot">
                <div class="succulent-stem alt"></div>
              </div>
            </div>
          </div>

          <!-- Hanging Floating Wall Shelves -->
          <div class="floating-shelf shelf-top">
            <div class="potted-monstera">
              <div class="monstera-leaf leaf-1"></div>
              <div class="monstera-leaf leaf-2"></div>
              <div class="monstera-leaf leaf-3"></div>
              <div class="plant-pot"></div>
            </div>
            <div class="shelf-books">
              <span class="book book-terracotta"></span>
              <span class="book book-sage"></span>
              <span class="book book-navy"></span>
            </div>
            <div class="thread-spools-shelf">
              <span class="mini-spool spool-gold"></span>
              <span class="mini-spool spool-rose"></span>
              <span class="mini-spool spool-rust"></span>
            </div>
          </div>

          <!-- Pinned Moodboard / Architectural Sketches -->
          <div class="moodboard-board">
            <div class="mood-pin pin-1"></div>
            <div class="mood-note sketch-facade">
              <span class="sketch-line"></span>
              <span class="sketch-line"></span>
              <span class="sketch-line short"></span>
            </div>
            <div class="mood-note fabric-sample-pin">
              <div class="mini-swatch swatch-rust"></div>
            </div>
            <div class="mood-polaroid">
              <div class="polaroid-inner">${icon("needle")}</div>
            </div>
          </div>
        </div>

        <!-- Central Character Stage: Mariem (Seated Behind Desk) -->
        <div class="mariem-character-container" id="mariem-character-trigger" role="button" tabindex="0" aria-label="Tap Mariem to start conversation">
          <!-- Idle Thought Bubble Floating Above Her -->
          <div class="mariem-speech-bubble" id="mariem-idle-bubble">
            <span class="bubble-sparkle">${icon("needle")}</span>
            <span class="bubble-content" data-i18n="studio_idle_thought">${t("studio_idle_thought")}</span>
          </div>

          <!-- Mariem's Illustrated PNG Avatar (Behind Desk, Head & Shoulders Sit Comfortably Above) -->
          <div class="mariem-image-holder">
            ${getMariemAvatarImg("neutral", { className: "studio-mariem-portrait", alt: "Mariem in her studio" })}
          </div>
        </div>

        <!-- Mariem's Drafting & Sewing Workstation Desk (In Front of Character) -->
        <div class="studio-desk-area" id="studio-desk-trigger" role="button" tabindex="0" aria-label="Start custom sewing order">
          <!-- Studio Wooden Desk Tabletop -->
          <div class="wooden-desk">
            <!-- Brass Desk Lamp with Warm Cone of Light -->
            <div class="desk-lamp">
              <div class="lamp-base"></div>
              <div class="lamp-arm"></div>
              <div class="lamp-shade"></div>
              <div class="lamp-light-cone"></div>
            </div>

            <!-- Laptop (Open with Minimalist Architectural CAD Wireframe) -->
            <div class="study-laptop">
              <div class="laptop-screen">
                <div class="blueprint-grid">
                  <span class="cad-rect"></span>
                  <span class="cad-grid-h"></span>
                  <span class="cad-grid-v"></span>
                </div>
              </div>
              <div class="laptop-keyboard"></div>
            </div>

            <!-- Steaming Ceramic Coffee Mug -->
            <div class="coffee-mug" title="Double espresso">
              <div class="steam steam-1"></div>
              <div class="steam steam-2"></div>
              <div class="steam steam-3"></div>
              <div class="mug-body">
                <div class="mug-brand-dot"></div>
              </div>
            </div>

            <!-- Architecture Textbooks Stack with Minimalist Color-Blocked Spines -->
            <div class="textbooks-stack">
              <div class="textbook book-3">
                <span class="post-it pink"></span>
              </div>
              <div class="textbook book-2">
                <span class="post-it yellow"></span>
              </div>
              <div class="textbook book-1"></div>
            </div>

            <!-- Vintage-Modern Sewing Machine on Table -->
            <div class="studio-sewing-machine">
              <svg viewBox="0 0 160 120" width="130" height="98" class="machine-svg">
                <!-- Machine Cast Body -->
                <path d="M20,105 L140,105 L140,95 L115,95 L115,35 C115,22 105,18 90,18 L35,18 C25,18 20,24 20,35 L20,65 L45,65 L45,35 L95,35 L95,95 L20,95 Z" fill="#2E3A3F" />
                <rect x="15" y="102" width="130" height="12" rx="3" fill="#B85028" opacity="0.95" />
                <!-- Flywheel / Hand Wheel -->
                <circle cx="122" cy="45" r="14" fill="#A4B0B6" stroke="#181615" stroke-width="2" class="flywheel-anim" />
                <circle cx="122" cy="45" r="5" fill="#2E3A3F" />
                <!-- Spool of Thread on Top Pin -->
                <rect x="88" y="8" width="10" height="14" rx="2" fill="#E8998D" />
                <line x1="93" y1="8" x2="93" y2="2" stroke="#68737A" stroke-width="2" />
                <!-- Thread Line Guide -->
                <path d="M93,8 L65,18 L32,18 L32,70" fill="none" stroke="#FAF7F2" stroke-width="1.2" stroke-dasharray="3 1" />
                <!-- Needle Bar & Presser Foot -->
                <rect x="29" y="60" width="5" height="30" fill="#CBD5E1" class="needle-bar" />
                <path d="M26,90 L38,90 L34,95 L28,95 Z" fill="#94A3B8" />
                <!-- Fabric Feed Under Needle -->
                <path d="M10,95 L55,95" stroke="#B85028" stroke-width="5" stroke-linecap="round" />
              </svg>
            </div>
          </div>

          <!-- Fabric Rolls Basket beside desk -->
          <div class="fabric-basket">
            <div class="fabric-roll roll-terracotta"></div>
            <div class="fabric-roll roll-sage"></div>
            <div class="fabric-roll roll-mustard"></div>
            <div class="fabric-roll roll-navy"></div>
            <div class="woven-basket-front"></div>
          </div>
        </div>

        <!-- Tap Prompt Pill: Positioned Cleanly BELOW the Desk (Never Covering Mariem) -->
        <div class="studio-hint-below-desk">
          <div class="tap-hint-pill" id="studio-hint-pill-trigger" role="button" tabindex="0">
            <span class="hint-sparkle">${icon("sparkles")}</span>
            <span data-i18n="studio_hint">${t("studio_hint")}</span>
          </div>
        </div>

        <!-- Cozy Patterned Floor Rug -->
        <div class="studio-rug">
          <div class="rug-pattern"></div>
        </div>
      </div>

      <!-- Studio Bottom Bar Actions (Standardized 46px/52px Heights & Clean Icons) -->
      <div class="studio-bottom-actions">
        <button class="btn btn-primary btn-large pulse-glow" id="btn-start-order-main">
          <span class="btn-icon">${icon("scissors")}</span>
          <span data-i18n="start_order_btn">${t("start_order_btn")}</span>
        </button>
        <button class="btn btn-secondary btn-large" id="btn-open-fitting-quick">
          <span class="btn-icon">${icon("hanger")}</span>
          <span data-i18n="quick_fitting_btn">${t("quick_fitting_btn")}</span>
        </button>
        <button class="btn btn-ghost btn-large" id="btn-open-about-mariem">
          <img src="assets/mariem/bust-wink.png" alt="Mariem" class="btn-mini-avatar" />
          <span data-i18n="meet_mariem_btn">${t("meet_mariem_btn")}</span>
        </button>
      </div>
    </section>
  `;

  // Attach event handlers
  const startOrderHandler = () => {
    playSound("click");
    state.emit("navigateScene", "order");
  };

  const characterTrigger = container.querySelector("#mariem-character-trigger");
  if (characterTrigger) {
    characterTrigger.addEventListener("click", startOrderHandler);
    characterTrigger.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        startOrderHandler();
      }
    });
  }

  const hintPillTrigger = container.querySelector("#studio-hint-pill-trigger");
  if (hintPillTrigger) {
    hintPillTrigger.addEventListener("click", startOrderHandler);
  }

  const deskTrigger = container.querySelector("#studio-desk-trigger");
  if (deskTrigger) {
    deskTrigger.addEventListener("click", startOrderHandler);
  }

  const machineTrigger = container.querySelector("#studio-machine-trigger");
  if (machineTrigger) {
    machineTrigger.addEventListener("click", startOrderHandler);
  }

  const startOrderMain = container.querySelector("#btn-start-order-main");
  if (startOrderMain) {
    startOrderMain.addEventListener("click", startOrderHandler);
  }

  const quickFittingBtn = container.querySelector("#btn-open-fitting-quick");
  if (quickFittingBtn) {
    quickFittingBtn.addEventListener("click", () => {
      playSound("click");
      state.emit("navigateScene", "fitting");
    });
  }

  const aboutBtn = container.querySelector("#btn-open-about-mariem");
  if (aboutBtn) {
    aboutBtn.addEventListener("click", () => {
      playSound("click");
      state.emit("openAboutModal");
    });
  }
}
