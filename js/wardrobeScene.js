// ==========================================================================
// Atelier Mariem - Wardrobe Scene & 3D Closet Doors Animation
// 3D perspective doors open/close, flying hanger animation & inventory grid
// ==========================================================================

import { getStandaloneGarmentSvg } from "./garmentSvg.js";
import { t, getLang } from "./i18n.js";
import { state } from "./state.js";
import { playSound } from "./audio.js";
import { icon } from "./icons.js";

export class WardrobeController {
  constructor(container) {
    this.container = container;
    this.currentCategory = "all";
  }

  init(options = {}) {
    this.render();

    // Check if coming from a newly crafted piece for 3D fly-in
    if (options.flyInPiece) {
      this.playWardrobeFlyIn(options.flyInPiece);
    }
  }

  render() {
    const lang = getLang();
    const items = state.wardrobe;
    const filtered = this.currentCategory === "all"
      ? items
      : items.filter(i => i.category === this.currentCategory);

    this.container.innerHTML = `
      <section class="scene scene-wardrobe" id="scene-wardrobe" aria-label="Atelier Wardrobe Inventory">
        <!-- 3D Wardrobe Doors Fly-In Overlay (Modal) -->
        <div class="wardrobe-flyin-overlay" id="wardrobe-flyin-overlay" style="display: none;">
          <div class="wardrobe-3d-cabinet">
            <!-- Left Door -->
            <div class="wardrobe-door door-left" id="door-left">
              <div class="door-inner-wood">
                <div class="door-panel-carving"></div>
                <div class="door-knob"></div>
              </div>
            </div>
            <!-- Right Door -->
            <div class="wardrobe-door door-right" id="door-right">
              <div class="door-inner-wood">
                <div class="door-panel-carving"></div>
                <div class="door-knob"></div>
              </div>
            </div>
            <!-- Cabinet Interior Rail -->
            <div class="cabinet-interior">
              <div class="closet-wooden-rod"></div>
              <div class="closet-back-wall"></div>
              <!-- Floating Piece on Hanger -->
              <div class="flying-piece-container" id="flying-piece-container"></div>
            </div>
          </div>
          <div class="flyin-caption" id="flyin-caption">Hanging your bespoke piece in the atelier wardrobe...</div>
        </div>

        <!-- Wardrobe Header & Actions -->
        <div class="wardrobe-header">
          <div class="wardrobe-titles">
            <h2 class="wardrobe-title" data-i18n="wardrobe_title">${t("wardrobe_title")}</h2>
            <p class="wardrobe-sub" data-i18n="wardrobe_subtitle">${t("wardrobe_subtitle")}</p>
          </div>
          <div class="wardrobe-top-actions">
            <button class="btn btn-primary" id="btn-order-another">
              <span class="btn-icon">${icon("scissors")}</span>
              <span data-i18n="wardrobe_btn_order_new">${t("wardrobe_btn_order_new")}</span>
            </button>
            <button class="btn btn-secondary" id="btn-fitting-nav">
              <span class="btn-icon">${icon("hanger")}</span>
              <span data-i18n="wardrobe_btn_fitting">${t("wardrobe_btn_fitting")}</span>
            </button>
          </div>
        </div>

        <!-- Filter Category Tabs -->
        <div class="wardrobe-filter-bar">
          <button class="wardrobe-tab ${this.currentCategory === 'all' ? 'active' : ''}" data-cat="all">
            ${t("wardrobe_filter_all")} (${items.length})
          </button>
          <button class="wardrobe-tab ${this.currentCategory === 'tops' ? 'active' : ''}" data-cat="tops">
            ${t("category_tops")} (${items.filter(i => i.category === 'tops').length})
          </button>
          <button class="wardrobe-tab ${this.currentCategory === 'bottoms' ? 'active' : ''}" data-cat="bottoms">
            ${t("category_bottoms")} (${items.filter(i => i.category === 'bottoms').length})
          </button>
          <button class="wardrobe-tab ${this.currentCategory === 'outerwear' ? 'active' : ''}" data-cat="outerwear">
            ${t("category_outerwear")} (${items.filter(i => i.category === 'outerwear').length})
          </button>
          <button class="wardrobe-tab ${this.currentCategory === 'onepiece' ? 'active' : ''}" data-cat="onepiece">
            ${t("category_onepiece")} (${items.filter(i => i.category === 'onepiece').length})
          </button>
          <button class="wardrobe-tab ${this.currentCategory === 'accessories' ? 'active' : ''}" data-cat="accessories">
            ${t("category_accessories")} (${items.filter(i => i.category === 'accessories').length})
          </button>
        </div>

        <!-- Items Grid / Empty State -->
        <div class="wardrobe-content-area">
          ${filtered.length === 0 ? `
            <div class="wardrobe-empty-state">
              <div class="empty-icon">${icon("wardrobe", 48, 48)}</div>
              <h3 data-i18n="wardrobe_empty_title">${t("wardrobe_empty_title")}</h3>
              <p data-i18n="wardrobe_empty_desc">${t("wardrobe_empty_desc")}</p>
              <button class="btn btn-primary btn-large" id="btn-empty-start-order">
                <span class="btn-icon">${icon("scissors")}</span>
                <span>${t("wardrobe_btn_order_new")}</span>
              </button>
            </div>
          ` : `
            <div class="wardrobe-items-grid">
              ${filtered.map(piece => this.renderWardrobeCard(piece, lang)).join("")}
            </div>
          `}
        </div>

        <!-- Piece Passport Modal Container -->
        <div class="passport-modal-backdrop" id="passport-modal" style="display: none;">
          <div class="passport-modal-card" id="passport-modal-content"></div>
        </div>

        <!-- Delete Confirmation Modal Container -->
        <div class="confirm-modal-backdrop" id="confirm-modal" style="display: none;">
          <div class="confirm-modal-card">
            <div class="confirm-icon">${icon("trash", 32, 32)}</div>
            <h3 class="confirm-title">${t("wardrobe_delete_confirm")}</h3>
            <div class="confirm-actions">
              <button class="btn btn-ghost" id="btn-cancel-delete">Cancel</button>
              <button class="btn btn-danger" id="btn-confirm-delete">Delete</button>
            </div>
          </div>
        </div>
      </section>
    `;

    this.attachEvents();
  }

  renderWardrobeCard(piece, lang) {
    const colorName = lang === "fr" ? (piece.colorNameFr || piece.colorNameEn) : piece.colorNameEn;

    return `
      <div class="wardrobe-item-card" data-piece-id="${piece.id}">
        <!-- Preview on Hanger -->
        <div class="item-card-visual">
          ${getStandaloneGarmentSvg(piece, { width: 140, height: 160, showHanger: true })}
        </div>

        <!-- Card Meta Info -->
        <div class="item-card-info">
          <div class="item-card-title-row">
            <h4 class="item-card-name">${piece.pieceId.toUpperCase()}</h4>
            <span class="item-gender-badge">${piece.gender}</span>
          </div>

          <div class="item-card-details-list">
            <div class="meta-row">
              <span class="meta-label">${t("wardrobe_card_color")}</span>
              <span class="meta-val">
                <span class="meta-dot" style="background-color: ${piece.colorHex};"></span>
                ${colorName}
              </span>
            </div>
            <div class="meta-row">
              <span class="meta-label">${t("wardrobe_card_style")}</span>
              <span class="meta-val">${piece.styleId}</span>
            </div>
            <div class="meta-row">
              <span class="meta-label">${t("wardrobe_card_pattern")}</span>
              <span class="meta-val">${piece.patternId || "plain"}</span>
            </div>
            ${piece.embroideryText ? `
              <div class="meta-row tag-row">
                <span class="meta-label">${t("wardrobe_card_tag")}</span>
                <span class="meta-val embroidery-highlight">“${piece.embroideryText}”</span>
              </div>
            ` : ""}
          </div>
        </div>

        <!-- Item Card Actions -->
        <div class="item-card-actions">
          <button class="btn btn-primary btn-sm btn-wear-piece" data-piece-id="${piece.id}" title="${t('wardrobe_card_wear')}">
            <span class="btn-icon">${icon("hanger", 16, 16)}</span>
            <span>${t("wardrobe_card_wear")}</span>
          </button>
          <button class="btn btn-ghost btn-sm btn-passport-piece" data-piece-id="${piece.id}" title="${t('wardrobe_card_details')}" aria-label="${t('wardrobe_card_details')}">
            ${icon("fileText", 16, 16)}
          </button>
          <button class="btn btn-ghost btn-sm btn-delete-piece" data-piece-id="${piece.id}" title="${t('wardrobe_card_delete')}" aria-label="${t('wardrobe_card_delete')}">
            ${icon("trash", 16, 16)}
          </button>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Filter tabs
    this.container.querySelectorAll(".wardrobe-tab").forEach(tab => {
      tab.addEventListener("click", () => {
        playSound("click");
        this.currentCategory = tab.getAttribute("data-cat");
        this.render();
      });
    });

    // Top action buttons
    const orderBtn = this.container.querySelector("#btn-order-another");
    if (orderBtn) {
      orderBtn.addEventListener("click", () => {
        playSound("click");
        state.emit("navigateScene", "order");
      });
    }

    const emptyStartBtn = this.container.querySelector("#btn-empty-start-order");
    if (emptyStartBtn) {
      emptyStartBtn.addEventListener("click", () => {
        playSound("click");
        state.emit("navigateScene", "order");
      });
    }

    const fittingBtn = this.container.querySelector("#btn-fitting-nav");
    if (fittingBtn) {
      fittingBtn.addEventListener("click", () => {
        playSound("click");
        state.emit("navigateScene", "fitting");
      });
    }

    // Wear buttons
    this.container.querySelectorAll(".btn-wear-piece").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-piece-id");
        const piece = state.getWardrobePiece(id);
        if (piece) {
          playSound("equip");
          state.equipPiece(piece);
          state.emit("navigateScene", "fitting");
        }
      });
    });

    // Passport buttons
    this.container.querySelectorAll(".btn-passport-piece").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        const id = btn.getAttribute("data-piece-id");
        const piece = state.getWardrobePiece(id);
        if (piece) {
          this.openPassportModal(piece);
        }
      });
    });

    // Delete buttons
    let pieceToDelete = null;
    const confirmModal = this.container.querySelector("#confirm-modal");
    const cancelDeleteBtn = this.container.querySelector("#btn-cancel-delete");
    const confirmDeleteBtn = this.container.querySelector("#btn-confirm-delete");

    this.container.querySelectorAll(".btn-delete-piece").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        pieceToDelete = btn.getAttribute("data-piece-id");
        if (confirmModal) confirmModal.style.display = "flex";
      });
    });

    if (cancelDeleteBtn) {
      cancelDeleteBtn.addEventListener("click", () => {
        pieceToDelete = null;
        if (confirmModal) confirmModal.style.display = "none";
      });
    }

    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener("click", () => {
        if (pieceToDelete) {
          playSound("pop");
          state.deleteWardrobePiece(pieceToDelete);
          pieceToDelete = null;
          if (confirmModal) confirmModal.style.display = "none";
          this.render();
        }
      });
    }
  }

  openPassportModal(piece) {
    const modalBackdrop = this.container.querySelector("#passport-modal");
    const modalContent = this.container.querySelector("#passport-modal-content");
    if (!modalBackdrop || !modalContent) return;

    const lang = getLang();
    const colorName = lang === "fr" ? (piece.colorNameFr || piece.colorNameEn) : piece.colorNameEn;
    const craftDate = piece.craftedAt ? new Date(piece.craftedAt).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-US", { year: "numeric", month: "long", day: "numeric" }) : "November 2026";

    modalContent.innerHTML = `
      <div class="passport-seal">
        ${icon("needle", 22, 22)}
      </div>
      <h3 class="passport-head" data-i18n="passport_title">${t("passport_title")}</h3>
      <div class="passport-inner-card">
        <div class="passport-row">
          <span class="p-label">Piece ID:</span>
          <span class="p-val font-mono">${piece.id}</span>
        </div>
        <div class="passport-row">
          <span class="p-label">Garment Type:</span>
          <span class="p-val">${piece.pieceId.toUpperCase()} (${piece.styleId})</span>
        </div>
        <div class="passport-row">
          <span class="p-label">${t("passport_crafted_on")}</span>
          <span class="p-val">${craftDate}</span>
        </div>
        <div class="passport-row">
          <span class="p-label">Textile & Dye:</span>
          <span class="p-val">${colorName} • Pattern: ${piece.patternId || "plain"}</span>
        </div>
        <div class="passport-row">
          <span class="p-label">Composition:</span>
          <span class="p-val">${t("passport_fabric_composition")}</span>
        </div>
        <div class="passport-row">
          <span class="p-label">Care Instructions:</span>
          <span class="p-val">${t("passport_care_notes")}</span>
        </div>
        ${piece.embroideryText ? `
          <div class="passport-row">
            <span class="p-label">Bespoke Tag:</span>
            <span class="p-val highlight">“${piece.embroideryText}”</span>
          </div>
        ` : ""}
        <div class="passport-signature-block">
          <p class="sig-title">${t("passport_signature")}</p>
          <div class="sig-cursive">Mariem</div>
        </div>
      </div>
      <button class="btn btn-secondary btn-large" id="btn-close-passport">${t("passport_close")}</button>
    `;

    modalBackdrop.style.display = "flex";

    const closeBtn = modalContent.querySelector("#btn-close-passport");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        playSound("click");
        modalBackdrop.style.display = "none";
      });
    }

    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.style.display = "none";
      }
    });
  }

  playWardrobeFlyIn(piece) {
    const overlay = this.container.querySelector("#wardrobe-flyin-overlay");
    const doorLeft = this.container.querySelector("#door-left");
    const doorRight = this.container.querySelector("#door-right");
    const flyingPiece = this.container.querySelector("#flying-piece-container");

    if (!overlay || !doorLeft || !doorRight || !flyingPiece) return;

    overlay.style.display = "flex";
    flyingPiece.innerHTML = getStandaloneGarmentSvg(piece, { width: 150, height: 180, showHanger: true });

    // Step 1: Open doors with sound
    setTimeout(() => {
      playSound("door_open", 0.25);
      doorLeft.classList.add("open");
      doorRight.classList.add("open");
    }, 400);

    // Step 2: Piece glides in smoothly
    setTimeout(() => {
      playSound("whoosh", 0.2);
      flyingPiece.classList.add("glide-into-closet");
    }, 1100);

    // Step 3: Doors close with solid latch sound
    setTimeout(() => {
      playSound("door_close", 0.3);
      doorLeft.classList.remove("open");
      doorRight.classList.remove("open");
      doorLeft.classList.add("closed");
      doorRight.classList.add("closed");
    }, 2500);

    // Step 4: Hide overlay and display updated wardrobe
    setTimeout(() => {
      overlay.style.display = "none";
      this.render();
    }, 3200);
  }
}
