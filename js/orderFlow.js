// ==========================================================================
// Atelier Mariem - Order Flow & Conversation Engine
// Step 1: Silhouette (Femme / Homme)
// Step 2: Tone First (16 curated dyes + custom color picker + tactile swatch)
// Step 3: Piece (Gender-filtered: tops, bottoms, outerwear, onepiece, accessories)
// Step 4: Cut & Proportions (Piece-specific architectural options)
// Step 5: Textile Pattern & Monogram Tag
// Pro-coded, uniform button heights, Pinterest atelier aesthetic, zero emojis
// ==========================================================================

import { getMariemSvg } from "./characterSvg.js";
import { COLOR_PALETTE, GARMENT_PIECES, PATTERNS, EMBROIDERY_PRESETS, THREAD_COLORS } from "./clothingData.js";
import { dialogueEngine } from "./dialogueEngine.js";
import { icon } from "./icons.js";
import { t, getLang } from "./i18n.js";
import { state } from "./state.js";
import { playSound } from "./audio.js";

export class OrderFlowController {
  constructor(container) {
    this.container = container;
    this.currentStep = 1; // 1 to 5
    this.activeFabricSheen = "linen"; // matte | linen | velvet
  }

  init() {
    state.resetCurrentOrder();
    this.currentStep = 1;
    this.render();
  }

  reRender() {
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <section class="scene scene-order" id="scene-order" aria-label="Custom Order Conversation">
        <!-- Progress Stepper Header (Clean, Aligned, Poppins) -->
        <div class="order-stepper-header">
          <div class="stepper-progress-bar">
            <div class="progress-fill" style="width: ${(this.currentStep / 5) * 100}%"></div>
          </div>
          <div class="stepper-steps">
            <span class="step-pill ${this.currentStep >= 1 ? 'active' : ''} ${this.currentStep > 1 ? 'completed' : ''}">01. ${t("step_gender")}</span>
            <span class="step-pill ${this.currentStep >= 2 ? 'active' : ''} ${this.currentStep > 2 ? 'completed' : ''}">02. ${t("step_color")}</span>
            <span class="step-pill ${this.currentStep >= 3 ? 'active' : ''} ${this.currentStep > 3 ? 'completed' : ''}">03. ${t("step_piece")}</span>
            <span class="step-pill ${this.currentStep >= 4 ? 'active' : ''} ${this.currentStep > 4 ? 'completed' : ''}">04. ${t("step_style")}</span>
            <span class="step-pill ${this.currentStep >= 5 ? 'active' : ''} ${this.currentStep > 5 ? 'completed' : ''}">05. ${t("step_pattern")}</span>
          </div>
        </div>

        <!-- Chat Conversation Card -->
        <div class="order-chat-layout">
          <!-- Left Column: Mariem Talking Avatar & Studio Context -->
          <div class="chat-mariem-col">
            <div class="mariem-talking-avatar-card">
              <div class="avatar-header">
                <span class="status-dot"></span>
                <span class="avatar-title">Mariem • Tailoring Desk</span>
              </div>
              <div class="avatar-svg-box" id="order-avatar-box">
                ${getMariemSvg("talking", { width: "100%", height: "100%" })}
              </div>
              <div class="mariem-student-note">
                <span class="note-icon">${icon("ruler")}</span>
                <span id="mariem-dynamic-study-note"></span>
              </div>
            </div>
          </div>

          <!-- Right Column: Speech Bubble & Interactive Choices -->
          <div class="chat-interaction-col">
            <!-- Mariem's Message Bubble Area with Typewriter -->
            <div class="dialogue-container" id="mariem-dialogue-target"></div>

            <!-- Reaction Feedback Bubble (shown briefly after client taps a choice) -->
            <div class="reaction-bubble-target" id="mariem-reaction-target" style="display:none;"></div>

            <!-- Client Choices Container (Buttons Only, Standardized Heights) -->
            <div class="choices-container" id="order-choices-target"></div>
          </div>
        </div>
      </section>
    `;

    // Render random study remark note in sidebar
    const studyNote = this.container.querySelector("#mariem-dynamic-study-note");
    if (studyNote) {
      studyNote.textContent = dialogueEngine.getRandomLine("study_remarks");
    }

    this.runStep(this.currentStep);
  }

  async runStep(stepNumber) {
    this.currentStep = stepNumber;
    this.updateStepper();

    const dialogueTarget = this.container.querySelector("#mariem-dialogue-target");
    const reactionTarget = this.container.querySelector("#mariem-reaction-target");
    const choicesTarget = this.container.querySelector("#order-choices-target");

    if (reactionTarget) reactionTarget.style.display = "none";
    choicesTarget.innerHTML = "";

    if (stepNumber === 1) {
      // Step 1: Greeting + Gender
      const greeting = dialogueEngine.getRandomLine("greetings");
      const question = t("prompt_gender");
      const fullText = `${greeting}\n\n${question}`;

      await dialogueEngine.displayMariemMessage(dialogueTarget, fullText);
      this.renderStep1Choices(choicesTarget);

    } else if (stepNumber === 2) {
      // Step 2: Choose Color First
      const question = t("prompt_color");
      await dialogueEngine.displayMariemMessage(dialogueTarget, question);
      this.renderStep2Choices(choicesTarget);

    } else if (stepNumber === 3) {
      // Step 3: Choose Piece
      const question = t("prompt_piece");
      await dialogueEngine.displayMariemMessage(dialogueTarget, question);
      this.renderStep3Choices(choicesTarget);

    } else if (stepNumber === 4) {
      // Step 4: Choose Style
      const pieceData = GARMENT_PIECES.find(p => p.id === state.currentOrder.pieceId) || GARMENT_PIECES[0];
      const lang = getLang();
      const question = lang === "fr" ? pieceData.styleQuestionFr : pieceData.styleQuestionEn;
      await dialogueEngine.displayMariemMessage(dialogueTarget, question);
      this.renderStep4Choices(choicesTarget, pieceData);

    } else if (stepNumber === 5) {
      // Step 5: Pattern & Details
      const question = t("prompt_pattern");
      await dialogueEngine.displayMariemMessage(dialogueTarget, question);
      this.renderStep5Choices(choicesTarget);
    }
  }

  updateStepper() {
    const pills = this.container.querySelectorAll(".step-pill");
    pills.forEach((pill, idx) => {
      const stepIndex = idx + 1;
      pill.classList.remove("active", "completed");
      if (stepIndex === this.currentStep) pill.classList.add("active");
      if (stepIndex < this.currentStep) pill.classList.add("completed");
    });
    const fill = this.container.querySelector(".progress-fill");
    if (fill) fill.style.width = `${(this.currentStep / 5) * 100}%`;
  }

  showReaction(comment, onNext) {
    const reactionTarget = this.container.querySelector("#mariem-reaction-target");
    if (reactionTarget) {
      reactionTarget.style.display = "block";
      reactionTarget.innerHTML = `
        <div class="reaction-bubble" aria-live="polite">
          <span class="reaction-avatar">${icon("sparkles")}</span>
          <span class="reaction-text">${comment}</span>
        </div>
      `;
      playSound("pop", 0.15);
    }
    setTimeout(() => {
      onNext();
    }, 900);
  }

  // ================= STEP 1: GENDER =================
  renderStep1Choices(container) {
    container.innerHTML = `
      <div class="step-card step-gender-card">
        <div class="choice-buttons-grid">
          <button class="choice-card-btn" data-gender="femme">
            <span class="choice-icon">${icon("dress")}</span>
            <span class="choice-title">${t("gender_femme")}</span>
            <span class="choice-sub">Curved silhouettes, tailored skirts & dresses</span>
          </button>
          <button class="choice-card-btn" data-gender="homme">
            <span class="choice-icon">${icon("suit")}</span>
            <span class="choice-title">${t("gender_homme")}</span>
            <span class="choice-sub">Structured shoulders, trousers & outerwear</span>
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll(".choice-card-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        const gender = btn.getAttribute("data-gender");
        state.currentOrder.gender = gender;

        const reaction = dialogueEngine.getRandomLine("gender_reactions");
        this.showReaction(reaction, () => {
          this.runStep(2);
        });
      });
    });
  }

  // ================= STEP 2: COLOR FIRST =================
  renderStep2Choices(container) {
    const lang = getLang();
    const currentColorHex = state.currentOrder.colorHex;

    container.innerHTML = `
      <div class="step-card step-color-card">
        <!-- Live Fabric Swatch Preview Panel -->
        <div class="fabric-swatch-live-card">
          <div class="swatch-header">
            <span class="swatch-title-label">${t("swatch_preview_title")}</span>
            <div class="sheen-selector">
              <button class="sheen-pill ${this.activeFabricSheen === 'matte' ? 'active' : ''}" data-sheen="matte">${t("swatch_sheen_matte")}</button>
              <button class="sheen-pill ${this.activeFabricSheen === 'linen' ? 'active' : ''}" data-sheen="linen">${t("swatch_sheen_linen")}</button>
              <button class="sheen-pill ${this.activeFabricSheen === 'velvet' ? 'active' : ''}" data-sheen="velvet">${t("swatch_sheen_velvet")}</button>
            </div>
          </div>

          <div class="swatch-display-box sheen-${this.activeFabricSheen}" id="live-swatch-box" style="background-color: ${currentColorHex};">
            <div class="swatch-grain-overlay"></div>
            <div class="swatch-shine-reflection"></div>
            <div class="swatch-info-tag">
              <span class="swatch-color-name" id="live-swatch-name">${lang === 'fr' ? state.currentOrder.colorNameFr : state.currentOrder.colorNameEn}</span>
              <span class="swatch-color-hex" id="live-swatch-hex">${currentColorHex}</span>
            </div>
          </div>
        </div>

        <!-- 16 Curated Atelier Colors Palette -->
        <div class="palette-grid-wrapper">
          <label class="section-label">${t("color_palette_title")}</label>
          <div class="colors-16-grid">
            ${COLOR_PALETTE.map(color => `
              <button class="color-swatch-btn ${color.hex === currentColorHex ? 'selected' : ''}"
                data-hex="${color.hex}"
                data-id="${color.id}"
                data-name-en="${color.nameEn}"
                data-name-fr="${color.nameFr}"
                data-tone="${color.tone}"
                title="${lang === 'fr' ? color.nameFr : color.nameEn}">
                <span class="swatch-circle" style="background-color: ${color.hex};"></span>
                <span class="swatch-label">${lang === 'fr' ? color.nameFr : color.nameEn}</span>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Custom Color Blending Row -->
        <div class="custom-color-row">
          <label class="custom-color-label" for="custom-hex-picker">${t("custom_color_label")}</label>
          <div class="custom-picker-group">
            <input type="color" id="custom-hex-picker" value="${currentColorHex}" class="color-wheel-input" aria-label="Custom Color Picker" />
            <input type="text" id="custom-hex-text" value="${currentColorHex}" maxlength="7" class="hex-text-input" aria-label="Color HEX code" />
          </div>
        </div>

        <!-- Confirm Color Button (Standardized Height 46px) -->
        <div class="step-footer-actions">
          <button class="btn btn-primary btn-large" id="btn-confirm-color">
            <span>${t("confirm_color_btn")}</span>
            <span class="btn-icon">${icon("arrowRight")}</span>
          </button>
        </div>
      </div>
    `;

    // Sheen selector events
    container.querySelectorAll(".sheen-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        playSound("click");
        container.querySelectorAll(".sheen-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        this.activeFabricSheen = pill.getAttribute("data-sheen");
        const swatchBox = container.querySelector("#live-swatch-box");
        swatchBox.className = `swatch-display-box sheen-${this.activeFabricSheen}`;
      });
    });

    const updateColorSelection = (hex, nameEn, nameFr, tone = "custom", id = "custom") => {
      state.currentOrder.colorHex = hex;
      state.currentOrder.colorNameEn = nameEn;
      state.currentOrder.colorNameFr = nameFr;
      state.currentOrder.colorTone = tone;
      state.currentOrder.colorId = id;

      const swatchBox = container.querySelector("#live-swatch-box");
      const nameLabel = container.querySelector("#live-swatch-name");
      const hexLabel = container.querySelector("#live-swatch-hex");
      const hexPicker = container.querySelector("#custom-hex-picker");
      const hexText = container.querySelector("#custom-hex-text");

      if (swatchBox) swatchBox.style.backgroundColor = hex;
      if (nameLabel) nameLabel.textContent = lang === "fr" ? nameFr : nameEn;
      if (hexLabel) hexLabel.textContent = hex;
      if (hexPicker) hexPicker.value = hex;
      if (hexText) hexText.value = hex;

      playSound("swatch_select", 0.15);
    };

    // Color Swatches Clicks
    container.querySelectorAll(".color-swatch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        container.querySelectorAll(".color-swatch-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");

        const hex = btn.getAttribute("data-hex");
        const id = btn.getAttribute("data-id");
        const nameEn = btn.getAttribute("data-name-en");
        const nameFr = btn.getAttribute("data-name-fr");
        const tone = btn.getAttribute("data-tone");
        updateColorSelection(hex, nameEn, nameFr, tone, id);
      });
    });

    // Custom Color Input
    const hexPicker = container.querySelector("#custom-hex-picker");
    const hexText = container.querySelector("#custom-hex-text");

    if (hexPicker) {
      hexPicker.addEventListener("input", (e) => {
        const hex = e.target.value.toUpperCase();
        container.querySelectorAll(".color-swatch-btn").forEach(b => b.classList.remove("selected"));
        updateColorSelection(hex, `Custom Dye (${hex})`, `Nuance Sur-Mesure (${hex})`);
      });
    }

    if (hexText) {
      hexText.addEventListener("change", (e) => {
        let hex = e.target.value.trim();
        if (!hex.startsWith("#")) hex = "#" + hex;
        if (/^#[0-9A-F]{6}$/i.test(hex)) {
          container.querySelectorAll(".color-swatch-btn").forEach(b => b.classList.remove("selected"));
          updateColorSelection(hex.toUpperCase(), `Custom Dye (${hex})`, `Nuance Sur-Mesure (${hex})`);
        }
      });
    }

    // Confirm button
    const confirmBtn = container.querySelector("#btn-confirm-color");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => {
        playSound("click");
        const reaction = dialogueEngine.getRandomLine("color_reactions");
        this.showReaction(reaction, () => {
          this.runStep(3);
        });
      });
    }
  }

  // ================= STEP 3: CHOOSE THE PIECE =================
  renderStep3Choices(container) {
    const lang = getLang();
    const gender = state.currentOrder.gender || "femme";

    // Filter pieces by gender
    const availablePieces = GARMENT_PIECES.filter(p => p.gender === "both" || p.gender === gender);

    // Group by category
    const categories = [
      { id: "all", label: lang === "fr" ? "Toutes" : "All Pieces" },
      { id: "tops", label: t("category_tops") },
      { id: "bottoms", label: t("category_bottoms") },
      { id: "outerwear", label: t("category_outerwear") },
      { id: "onepiece", label: t("category_onepiece") },
      { id: "accessories", label: t("category_accessories") }
    ];

    container.innerHTML = `
      <div class="step-card step-pieces-card">
        <!-- Category Filter Tabs -->
        <div class="category-filter-tabs">
          ${categories.map((cat, i) => `
            <button class="cat-pill ${i === 0 ? 'active' : ''}" data-cat="${cat.id}">${cat.label}</button>
          `).join("")}
        </div>

        <!-- Pieces Grid (Clean Vector Line Icons, Uniform Height) -->
        <div class="pieces-selection-grid" id="pieces-grid">
          ${this.renderPiecesGridItems(availablePieces, lang)}
        </div>
      </div>
    `;

    // Filter clicks
    container.querySelectorAll(".cat-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        playSound("click");
        container.querySelectorAll(".cat-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const cat = pill.getAttribute("data-cat");
        const filtered = cat === "all" ? availablePieces : availablePieces.filter(p => p.category === cat);
        const grid = container.querySelector("#pieces-grid");
        grid.innerHTML = this.renderPiecesGridItems(filtered, lang);
        this.attachPieceClickEvents(grid);
      });
    });

    this.attachPieceClickEvents(container.querySelector("#pieces-grid"));
  }

  renderPiecesGridItems(pieces, lang) {
    return pieces.map(piece => `
      <button class="piece-card-btn" data-piece-id="${piece.id}" data-category="${piece.category}" data-slot="${piece.slot}">
        <span class="piece-icon">${icon(piece.iconName || 'shirt')}</span>
        <span class="piece-name">${lang === 'fr' ? piece.nameFr : piece.nameEn}</span>
        <span class="piece-tag">${piece.category}</span>
      </button>
    `).join("");
  }

  attachPieceClickEvents(grid) {
    grid.querySelectorAll(".piece-card-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        const pieceId = btn.getAttribute("data-piece-id");
        const category = btn.getAttribute("data-category");
        const slot = btn.getAttribute("data-slot");

        state.currentOrder.pieceId = pieceId;
        state.currentOrder.category = category;
        state.currentOrder.slot = slot;

        const reaction = dialogueEngine.getRandomLine("piece_reactions");
        this.showReaction(reaction, () => {
          this.runStep(4);
        });
      });
    });
  }

  // ================= STEP 4: CHOOSE STYLE =================
  renderStep4Choices(container, pieceData) {
    const lang = getLang();

    container.innerHTML = `
      <div class="step-card step-style-card">
        <div class="style-options-grid">
          ${pieceData.styles.map((style, idx) => `
            <button class="style-choice-btn ${idx === 0 ? 'selected' : ''}" data-style-id="${style.id}">
              <div class="style-btn-inner">
                <span class="style-number">0${idx + 1}</span>
                <span class="style-title">${lang === 'fr' ? style.nameFr : style.nameEn}</span>
                <span class="style-desc">${lang === 'fr' ? style.descFr : style.descEn}</span>
              </div>
            </button>
          `).join("")}
        </div>
      </div>
    `;

    container.querySelectorAll(".style-choice-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        const styleId = btn.getAttribute("data-style-id");
        state.currentOrder.styleId = styleId;

        const reaction = dialogueEngine.getRandomLine("style_reactions");
        this.showReaction(reaction, () => {
          this.runStep(5);
        });
      });
    });
  }

  // ================= STEP 5: PATTERN & EMBROIDERY =================
  renderStep5Choices(container) {
    const lang = getLang();
    const currentPattern = state.currentOrder.patternId || "plain";
    const currentEmbroidery = state.currentOrder.embroideryText || "";
    const currentThreadHex = state.currentOrder.threadColorHex || "#FFFDF6";

    container.innerHTML = `
      <div class="step-card step-details-card">
        <!-- 1. Pattern Selector -->
        <div class="details-section">
          <label class="section-label">${t("pattern_title")}</label>
          <div class="patterns-grid">
            ${PATTERNS.map(pat => `
              <button class="pattern-pill-btn ${pat.id === currentPattern ? 'selected' : ''}" data-pat-id="${pat.id}">
                <span class="pattern-preview pat-${pat.id}"></span>
                <span class="pattern-name">${lang === 'fr' ? pat.nameFr : pat.nameEn}</span>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- 2. Embroidery Monogram / Tag -->
        <div class="details-section">
          <label class="section-label">${t("embroidery_title")}</label>
          <div class="embroidery-input-wrapper">
            <input type="text" id="custom-embroidery-input" maxlength="12" value="${currentEmbroidery}" placeholder="${t('embroidery_placeholder')}" class="studio-text-input" />
          </div>

          <label class="sub-label">${t("embroidery_presets_label")}</label>
          <div class="presets-row">
            ${EMBROIDERY_PRESETS.map(preset => `
              <button class="preset-tag-btn" data-preset="${preset}">“${preset}”</button>
            `).join("")}
          </div>
        </div>

        <!-- 3. Thread Color Selection -->
        <div class="details-section">
          <label class="section-label">${t("thread_color_label")}</label>
          <div class="thread-swatches-row">
            ${THREAD_COLORS.map(th => `
              <button class="thread-swatch-btn ${th.hex === currentThreadHex ? 'selected' : ''}"
                data-hex="${th.hex}"
                title="${lang === 'fr' ? th.nameFr : th.nameEn}">
                <span class="thread-dot" style="background-color: ${th.hex};"></span>
                <span class="thread-name">${lang === 'fr' ? th.nameFr : th.nameEn}</span>
              </button>
            `).join("")}
          </div>
        </div>

        <!-- Final Customization Action (Standardized Height 52px) -->
        <div class="step-footer-actions">
          <button class="btn btn-primary btn-large pulse-glow" id="btn-finish-customization">
            <span class="btn-icon">${icon("scissors")}</span>
            <span>${t("finish_customization_btn")}</span>
          </button>
        </div>
      </div>
    `;

    // Pattern clicks
    container.querySelectorAll(".pattern-pill-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        container.querySelectorAll(".pattern-pill-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.currentOrder.patternId = btn.getAttribute("data-pat-id");
      });
    });

    // Preset embroidery clicks
    const embInput = container.querySelector("#custom-embroidery-input");
    container.querySelectorAll(".preset-tag-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        const val = btn.getAttribute("data-preset");
        if (embInput) embInput.value = val;
        state.currentOrder.embroideryText = val;
      });
    });

    if (embInput) {
      embInput.addEventListener("input", (e) => {
        state.currentOrder.embroideryText = e.target.value.trim();
      });
    }

    // Thread swatches
    container.querySelectorAll(".thread-swatch-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        container.querySelectorAll(".thread-swatch-btn").forEach(b => b.classList.remove("selected"));
        btn.classList.add("selected");
        state.currentOrder.threadColorHex = btn.getAttribute("data-hex");
      });
    });

    // Final Workshop button
    const finishBtn = container.querySelector("#btn-finish-customization");
    if (finishBtn) {
      finishBtn.addEventListener("click", () => {
        playSound("click");
        // Save current embroidery from input
        if (embInput) state.currentOrder.embroideryText = embInput.value.trim();

        const reaction = dialogueEngine.getRandomLine("embroidery_reactions");
        this.showReaction(reaction, () => {
          state.emit("navigateScene", "workshop");
        });
      });
    }
  }
}
