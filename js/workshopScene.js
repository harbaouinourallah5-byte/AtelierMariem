// ==========================================================================
// Atelier Mariem - Workshop Scene & Confetti Celebration
// Precision mechanical sewing machine mechanics (needle, flywheel, sliding fabric)
// Rotating studio banter, architectural textbook glance & celebration
// Pinterest atelier aesthetic, uniform button heights, zero emojis
// ==========================================================================

import { getMariemSvg, getMariemAvatarImg } from "./characterSvg.js";
import { getStandaloneGarmentSvg, getSvgPatternDefs } from "./garmentSvg.js";
import { dialogueEngine } from "./dialogueEngine.js";
import { icon } from "./icons.js";
import { t, getLang } from "./i18n.js";
import { state } from "./state.js";
import { playSound, startSewingSound, stopSewingSound } from "./audio.js";

export class WorkshopController {
  constructor(container) {
    this.container = container;
    this.progress = 0;
    this.timer = null;
    this.banterTimer = null;
    this.isFastForward = false;
    this.savedPiece = null;
  }

  init() {
    this.progress = 0;
    this.isFastForward = false;
    this.render();
    this.startCrafting();
  }

  render() {
    const lang = getLang();
    const order = state.currentOrder;
    const hex = order.colorHex || "#B85028";
    const pat = order.patternId || "plain";

    this.container.innerHTML = `
      <section class="scene scene-workshop" id="scene-workshop" aria-label="Mariem's Sewing Workshop">
        <!-- Canvas for Confetti Fireworks -->
        <canvas id="confetti-canvas" class="confetti-canvas"></canvas>

        <!-- Workshop Header -->
        <div class="workshop-header">
          <div class="workshop-title-box">
            <h2 class="workshop-title" data-i18n="workshop_title">${t("workshop_title")}</h2>
            <p class="workshop-sub" data-i18n="workshop_subtitle">${t("workshop_subtitle")}</p>
          </div>
          <button class="btn btn-ghost btn-fast-forward" id="btn-fast-stitch">
            <span class="btn-icon">${icon("zap")}</span>
            <span data-i18n="fast_forward_btn">${t("fast_forward_btn")}</span>
          </button>
        </div>

        <!-- Center Workbench Stage -->
        <div class="workshop-stage">
          <!-- Active Sewing Scene View -->
          <div class="workbench-layout" id="workbench-active-view">
            <!-- Left: Animated Banter Bubble & Textbook Notes -->
            <div class="workshop-banter-col">
              <div class="workshop-bubble-card" id="workshop-bubble-card">
                <span class="bubble-sparkle">${icon("scissors")}</span>
                <p class="workshop-banter-text" id="workshop-banter-text">
                  ${dialogueEngine.getRandomLine("workshop_banter")}
                </p>
              </div>

              <!-- Textbook glance card -->
              <div class="workshop-textbook-card" id="workshop-textbook-card">
                <div class="textbook-cover">
                  <div class="book-mini-header">
                    <span class="book-mini-icon">${icon("bookOpen")}</span>
                    <span class="book-mini-title">ARCHITECTURE REVIEW</span>
                  </div>
                  <p class="book-mini-body">Chapter 4: Vaulted spans & tensile cloth structures...</p>
                </div>
              </div>
            </div>

            <!-- Center: Mariem Leaning & Animated Machine -->
            <div class="workshop-mariem-col">
              <div class="mariem-sewing-holder" id="mariem-sewing-holder">
                ${getMariemSvg("sewing", { width: "100%", height: "100%" })}
              </div>

              <!-- Animated Mechanical Sewing Machine Stage -->
              <div class="animated-machine-bench">
                <svg viewBox="0 0 280 180" width="280" height="180" class="detailed-machine-svg">
                  ${getSvgPatternDefs("pat")}
                  <!-- Machine Table Base -->
                  <rect x="10" y="145" width="260" height="15" rx="3" fill="#9C663D" stroke="#683B1A" stroke-width="2" />

                  <!-- Sewing Machine Heavy Metal Body -->
                  <path d="M40,145 L240,145 L240,130 L195,130 L195,45 C195,25 180,18 160,18 L60,18 C45,18 38,28 38,45 L38,90 L75,90 L75,45 L155,45 L155,130 L40,130 Z" fill="#2E3A3F" stroke="#1D2A44" stroke-width="2" />
                  <rect x="35" y="130" width="210" height="15" rx="2" fill="#B85028" />

                  <!-- Flywheel with Rapid Rotation -->
                  <g class="machine-flywheel-active" transform="translate(205, 55)">
                    <circle cx="0" cy="0" r="22" fill="#94A3B8" stroke="#1D2A44" stroke-width="3" />
                    <line x1="-18" y1="0" x2="18" y2="0" stroke="#475569" stroke-width="3" />
                    <line x1="0" y1="-18" x2="0" y2="18" stroke="#475569" stroke-width="3" />
                    <circle cx="0" cy="0" r="7" fill="#1E293B" />
                  </g>

                  <!-- Spool of Thread & Line Guide -->
                  <rect x="135" y="4" width="16" height="18" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" />
                  <line x1="143" y1="4" x2="143" y2="-4" stroke="#64748B" stroke-width="2.5" />
                  <path d="M143,4 L110,18 L55,18 L55,90" fill="none" stroke="#FAF7F2" stroke-width="1.8" stroke-dasharray="4 2" class="thread-vibrate" />

                  <!-- Presser Foot & Rapidly Oscillating Needle -->
                  <rect x="52" y="80" width="6" height="42" fill="#CBD5E1" class="needle-rapid-bounce" />
                  <polygon points="50,122 60,122 55,128" fill="#64748B" />
                  <path d="M46,128 L64,128 L58,134 L48,134 Z" fill="#94A3B8" stroke="#475569" stroke-width="1" />

                  <!-- Sliding Fabric Strip Matching Chosen Color & Pattern -->
                  <g class="sliding-fabric-group">
                    <rect x="15" y="127" width="115" height="10" rx="2" fill="${hex}" class="fabric-slide-motion" />
                    ${pat !== 'plain' ? `<rect x="15" y="127" width="115" height="10" fill="url(#pat_${pat})" opacity="0.6" class="fabric-slide-motion" />` : ""}
                    <!-- Stitched Seam Line Appearing -->
                    <line x1="15" y1="132" x2="80" y2="132" stroke="#FFFFFF" stroke-width="1.5" stroke-dasharray="3 2" class="seam-line-stitch" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <!-- Finished Piece Celebration View (Initially Hidden) -->
          <div class="workbench-celebration-view" id="workbench-celebration-view" style="display: none;">
            <div class="celebration-content">
              <!-- Tada Banner -->
              <div class="tada-banner">
                <span class="tada-icon">${icon("checkCircle")}</span>
                <h3 class="tada-title" data-i18n="tada_title">${t("tada_title")}</h3>
                <p class="tada-sub" id="tada-dynamic-celebration-text">${t("tada_subtitle")}</p>
              </div>

              <!-- Proud Mariem & Finished Garment Showcase -->
              <div class="celebration-showcase-row">
                <!-- Proud Pose Avatar -->
                <div class="celebration-avatar-box">
                  ${getMariemAvatarImg("proud", { width: "100%", height: "100%", className: "celebration-proud-img" })}
                </div>

                <!-- Finished Garment Card -->
                <div class="celebration-garment-card">
                  <div class="garment-card-preview">
                    ${getStandaloneGarmentSvg(order, { width: 180, height: 210, showHanger: true })}
                  </div>
                  <div class="garment-card-meta">
                    <span class="meta-name">${order.pieceId.toUpperCase()}</span>
                    <span class="meta-detail">Tone: ${lang === 'fr' ? order.colorNameFr : order.colorNameEn}</span>
                    <span class="meta-detail">Cut: ${order.styleId}</span>
                    ${order.embroideryText ? `
                      <span class="meta-tag">
                        <span class="meta-tag-icon">${icon("tag")}</span>
                        <span>“${order.embroideryText}”</span>
                      </span>
                    ` : ""}
                  </div>
                </div>
              </div>

              <!-- Post-Crafting Actions (Uniform Large Button Heights) -->
              <div class="celebration-actions">
                <button class="btn btn-primary btn-large pulse-glow" id="btn-save-to-wardrobe">
                  <span class="btn-icon">${icon("wardrobe")}</span>
                  <span data-i18n="send_to_wardrobe_btn">${t("send_to_wardrobe_btn")}</span>
                </button>
                <button class="btn btn-secondary btn-large" id="btn-direct-fitting">
                  <span class="btn-icon">${icon("hanger")}</span>
                  <span data-i18n="direct_fitting_btn">${t("direct_fitting_btn")}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Progress Bar & Status Footer -->
        <div class="workshop-progress-footer" id="workshop-progress-footer">
          <div class="progress-info-row">
            <span class="progress-label" data-i18n="workshop_progress">${t("workshop_progress")}</span>
            <span class="progress-percent" id="craft-progress-text">0%</span>
          </div>
          <div class="craft-progress-track">
            <div class="craft-progress-bar" id="craft-progress-bar" style="width: 0%;"></div>
          </div>
        </div>
      </section>
    `;

    // Fast Forward button
    const ffBtn = this.container.querySelector("#btn-fast-stitch");
    if (ffBtn) {
      ffBtn.addEventListener("click", () => {
        playSound("click");
        this.isFastForward = true;
      });
    }
  }

  startCrafting() {
    startSewingSound();

    const progressBar = this.container.querySelector("#craft-progress-bar");
    const progressText = this.container.querySelector("#craft-progress-text");
    const banterText = this.container.querySelector("#workshop-banter-text");
    const textbookCard = this.container.querySelector("#workshop-textbook-card");

    const stepInterval = 90; // ~9 seconds total duration

    // Rotate banter lines every 2.4s
    this.banterTimer = setInterval(() => {
      if (banterText) {
        banterText.textContent = dialogueEngine.getRandomLine("workshop_banter");
        playSound("pop", 0.08);
      }
    }, 2400);

    this.timer = setInterval(() => {
      const increment = this.isFastForward ? 8 : 1;
      this.progress += increment;

      if (this.progress > 100) this.progress = 100;

      if (progressBar) progressBar.style.width = `${this.progress}%`;
      if (progressText) progressText.textContent = `${this.progress}%`;

      // Textbook glance at ~45%
      if (this.progress >= 40 && this.progress <= 55) {
        if (textbookCard) textbookCard.classList.add("visible-glance");
      } else {
        if (textbookCard) textbookCard.classList.remove("visible-glance");
      }

      if (this.progress >= 100) {
        clearInterval(this.timer);
        clearInterval(this.banterTimer);
        this.timer = null;
        this.banterTimer = null;
        this.finishCrafting();
      }
    }, stepInterval);
  }

  finishCrafting() {
    stopSewingSound();

    // Save piece to wardrobe state
    this.savedPiece = state.addWardrobePiece(state.currentOrder);

    // Switch views
    const activeView = this.container.querySelector("#workbench-active-view");
    const celebrationView = this.container.querySelector("#workbench-celebration-view");
    const progressFooter = this.container.querySelector("#workshop-progress-footer");
    const celebrationText = this.container.querySelector("#tada-dynamic-celebration-text");

    if (activeView) activeView.style.display = "none";
    if (progressFooter) progressFooter.style.display = "none";
    if (celebrationView) celebrationView.style.display = "block";

    if (celebrationText) {
      celebrationText.textContent = dialogueEngine.getRandomLine("completion_celebration");
    }

    // Sound and Confetti
    playSound("tada", 0.35);
    this.launchConfetti();

    // Attach celebration button events
    const wardrobeBtn = this.container.querySelector("#btn-save-to-wardrobe");
    if (wardrobeBtn) {
      wardrobeBtn.addEventListener("click", () => {
        playSound("click");
        state.emit("navigateSceneWithFlyIn", { scene: "wardrobe", piece: this.savedPiece });
      });
    }

    const fittingBtn = this.container.querySelector("#btn-direct-fitting");
    if (fittingBtn) {
      fittingBtn.addEventListener("click", () => {
        playSound("click");
        state.equipPiece(this.savedPiece);
        state.emit("navigateScene", "fitting");
      });
    }
  }

  launchConfetti() {
    const canvas = this.container.querySelector("#confetti-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#B85028", "#181615", "#D98880", "#C4973B", "#6C8267", "#FAF7F2", "#E8DFD8"];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width * 0.5 + (Math.random() * 200 - 100),
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        opacity: 1
      });
    }

    let animationFrame;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let activeParticles = 0;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0) {
          activeParticles++;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
          ctx.restore();
        }
      });

      if (activeParticles > 0) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();
  }

  destroy() {
    stopSewingSound();
    if (this.timer) clearInterval(this.timer);
    if (this.banterTimer) clearInterval(this.banterTimer);
  }
}
