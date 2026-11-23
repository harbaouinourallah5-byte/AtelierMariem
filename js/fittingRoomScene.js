// ==========================================================================
// Atelier Mariem - Fitting Room Scene
// Layered SVG mannequin, mix & match wardrobe rack, dynamic slots & PNG export
// ==========================================================================

import { getFittingMannequinBaseSvg, getLayeredGarmentSvg, getStandaloneGarmentSvg } from "./garmentSvg.js";
import { t, getLang } from "./i18n.js";
import { state } from "./state.js";
import { playSound } from "./audio.js";
import { icon } from "./icons.js";
import { SLOT_TABLE } from "./clothingData.js";

export class FittingRoomController {
  constructor(container) {
    this.container = container;
    this.activeDrawerFilter = "all";
  }

  init() {
    this.render();
  }

  render() {
    const lang = getLang();
    const outfit = state.fittingRoom;
    const wardrobeItems = state.wardrobe;

    const filteredWardrobe = this.activeDrawerFilter === "all"
      ? wardrobeItems
      : wardrobeItems.filter(item => {
          const slot = item.slot || SLOT_TABLE[item.pieceId];
          if (this.activeDrawerFilter === "tops") return item.category === "tops" || slot === "top";
          if (this.activeDrawerFilter === "bottoms") return item.category === "bottoms" || slot === "bottom";
          if (this.activeDrawerFilter === "outerwear") return item.category === "outerwear" || slot === "outerwear";
          if (this.activeDrawerFilter === "onepiece") return item.category === "onepiece" || slot === "onepiece";
          if (this.activeDrawerFilter === "accessories") return item.category === "accessories" || slot === "head" || slot === "neck" || slot === "feet";
          return true;
        });

    this.container.innerHTML = `
      <section class="scene scene-fitting" id="scene-fitting" aria-label="Atelier Fitting Room">
        <!-- Fitting Room Header -->
        <div class="fitting-header">
          <div class="fitting-titles">
            <h2 class="fitting-title" data-i18n="fitting_title">${t("fitting_title")}</h2>
            <p class="fitting-sub" data-i18n="fitting_subtitle">${t("fitting_subtitle")}</p>
          </div>

          <!-- Quick Action Buttons -->
          <div class="fitting-top-controls">
            <button class="btn btn-secondary btn-sm" id="btn-fitting-random">
              <span class="btn-icon">${icon("shuffle", 16, 16)}</span>
              <span>${t("fitting_action_random")}</span>
            </button>
            <button class="btn btn-ghost btn-sm" id="btn-fitting-reset">
              <span class="btn-icon">${icon("rotateCcw", 16, 16)}</span>
              <span>${t("fitting_action_reset")}</span>
            </button>
            <button class="btn btn-primary btn-sm pulse-glow" id="btn-fitting-download">
              <span class="btn-icon">${icon("download", 16, 16)}</span>
              <span>${t("fitting_action_download")}</span>
            </button>
          </div>
        </div>

        <!-- Main Fitting Layout: Mannequin Stage + Wardrobe Rack -->
        <div class="fitting-layout">
          <!-- Left Column: Mannequin Showcase & Slot Badges -->
          <div class="mannequin-col">
            <!-- Model Customization Bar (Gender & Skin Tone) -->
            <div class="model-custom-bar">
              <div class="gender-toggle-group">
                <button class="gender-btn ${outfit.gender === 'femme' ? 'active' : ''}" data-model-gender="femme">
                  <span class="btn-icon">${icon("dress", 14, 14)}</span>
                  <span>${t("model_femme")}</span>
                </button>
                <button class="gender-btn ${outfit.gender === 'homme' ? 'active' : ''}" data-model-gender="homme">
                  <span class="btn-icon">${icon("suit", 14, 14)}</span>
                  <span>${t("model_homme")}</span>
                </button>
              </div>

              <div class="skin-tone-group">
                <span class="tone-label">${t("model_skin_tone")}</span>
                <button class="tone-dot ${outfit.skinTone === 'fair' ? 'active' : ''}" data-tone="fair" style="background-color: #FDF0E8;" title="Fair"></button>
                <button class="tone-dot ${outfit.skinTone === 'warm' ? 'active' : ''}" data-tone="warm" style="background-color: #F5DDD1;" title="Warm"></button>
                <button class="tone-dot ${outfit.skinTone === 'sand' ? 'active' : ''}" data-tone="sand" style="background-color: #E4BA97;" title="Sand"></button>
                <button class="tone-dot ${outfit.skinTone === 'caramel' ? 'active' : ''}" data-tone="caramel" style="background-color: #C68E65;" title="Caramel"></button>
                <button class="tone-dot ${outfit.skinTone === 'deep' ? 'active' : ''}" data-tone="deep" style="background-color: #6F4532;" title="Deep"></button>
              </div>
            </div>

            <!-- Mannequin Studio Mirror Stage -->
            <div class="mannequin-mirror-stage" id="mannequin-mirror-stage">
              <div class="mirror-arch-frame">
                <div class="mirror-ambient-glow"></div>

                <!-- Layered Mannequin SVG (Shared 0 0 400 800 Coordinate System) -->
                <svg id="mannequin-composite-svg" viewBox="0 0 400 800" width="300" height="600" xmlns="http://www.w3.org/2000/svg">
                  <!-- Layer 1: Mannequin Base Body -->
                  ${getFittingMannequinBaseSvg(outfit.gender, outfit.skinTone)}

                  <!-- Layer 2: Feet (Socks & Atelier Footwear) -->
                  ${outfit.slots.feet ? getLayeredGarmentSvg(outfit.slots.feet, "feet", outfit.gender) : ""}

                  <!-- Layer 3: Bottom (Pants, Jeans, Skirts, Shorts - if not onepiece) -->
                  ${outfit.slots.bottom ? getLayeredGarmentSvg(outfit.slots.bottom, "bottom", outfit.gender) : ""}

                  <!-- Layer 4: Top (Shirts, Sweaters, Tees, Hoodies - if not onepiece) -->
                  ${outfit.slots.top ? getLayeredGarmentSvg(outfit.slots.top, "top", outfit.gender) : ""}

                  <!-- Layer 5: One-Piece (Bespoke Dress or Full Suit) -->
                  ${outfit.slots.onepiece ? getLayeredGarmentSvg(outfit.slots.onepiece, "onepiece", outfit.gender) : ""}

                  <!-- Layer 6: Outerwear (Jackets & Overcoats) -->
                  ${outfit.slots.outerwear ? getLayeredGarmentSvg(outfit.slots.outerwear, "outerwear", outfit.gender) : ""}

                  <!-- Layer 7: Neck (Woven Scarf) -->
                  ${outfit.slots.neck ? getLayeredGarmentSvg(outfit.slots.neck, "neck", outfit.gender) : ""}

                  <!-- Layer 8: Head Accessories (Bonnet, Casquette) -->
                  ${outfit.slots.head ? getLayeredGarmentSvg(outfit.slots.head, "head", outfit.gender) : ""}
                </svg>

                <!-- Floor Stand Base -->
                <div class="mannequin-floor-stand"></div>
              </div>
            </div>

            <!-- Active Slots Badges Row with dedicated remove buttons -->
            <div class="equipped-slots-summary">
              ${this.renderEquippedSlotPill("head", outfit.slots.head, t("slot_head"))}
              ${this.renderEquippedSlotPill("neck", outfit.slots.neck, lang === 'fr' ? 'Écharpe' : 'Scarf')}
              ${outfit.slots.onepiece
                ? this.renderEquippedSlotPill("onepiece", outfit.slots.onepiece, lang === 'fr' ? 'Robe / Costume' : 'Dress / Suit')
                : `
                  ${this.renderEquippedSlotPill("top", outfit.slots.top, t("slot_top"))}
                  ${this.renderEquippedSlotPill("bottom", outfit.slots.bottom, t("slot_bottom"))}
                `
              }
              ${this.renderEquippedSlotPill("outerwear", outfit.slots.outerwear, t("slot_outerwear"))}
              ${this.renderEquippedSlotPill("feet", outfit.slots.feet, lang === 'fr' ? 'Chaussettes' : 'Socks')}
            </div>
          </div>

          <!-- Right Column: Interactive Wardrobe Closet Rack -->
          <div class="wardrobe-rack-col">
            <div class="closet-rack-panel">
              <div class="rack-header">
                <div class="rack-titles">
                  <h3 class="rack-title">${t("fitting_wardrobe_drawer_title")}</h3>
                  <span class="rack-hint">${t("fitting_click_to_wear")}</span>
                </div>
                <button class="btn btn-ghost btn-sm" id="btn-closet-order-new">
                  <span class="btn-icon">${icon("scissors", 14, 14)}</span>
                  <span>${t("wardrobe_btn_order_new")}</span>
                </button>
              </div>

              <!-- Drawer Filter Pills -->
              <div class="drawer-filters-row">
                <button class="drawer-filter ${this.activeDrawerFilter === 'all' ? 'active' : ''}" data-cat="all">All</button>
                <button class="drawer-filter ${this.activeDrawerFilter === 'tops' ? 'active' : ''}" data-cat="tops">Tops</button>
                <button class="drawer-filter ${this.activeDrawerFilter === 'bottoms' ? 'active' : ''}" data-cat="bottoms">Bottoms</button>
                <button class="drawer-filter ${this.activeDrawerFilter === 'outerwear' ? 'active' : ''}" data-cat="outerwear">Outerwear</button>
                <button class="drawer-filter ${this.activeDrawerFilter === 'onepiece' ? 'active' : ''}" data-cat="onepiece">One-Piece</button>
                <button class="drawer-filter ${this.activeDrawerFilter === 'accessories' ? 'active' : ''}" data-cat="accessories">Accessories</button>
              </div>

              <!-- Available Pieces Grid in Rack -->
              <div class="rack-items-scroll">
                ${filteredWardrobe.length === 0 ? `
                  <div class="rack-empty-message">
                    <p>No pieces in this category yet!</p>
                  </div>
                ` : `
                  <div class="rack-items-grid">
                    ${filteredWardrobe.map(piece => {
                      const isEquipped = this.isPieceEquipped(piece, outfit);
                      return `
                        <div class="rack-item-card ${isEquipped ? 'is-worn' : ''}" data-piece-id="${piece.id}">
                          <div class="rack-item-preview">
                            ${getStandaloneGarmentSvg(piece, { width: 90, height: 105, showHanger: true })}
                          </div>
                          <div class="rack-item-caption">
                            <span class="rack-item-name">${piece.pieceId.toUpperCase()}</span>
                            <span class="rack-item-style">${piece.styleId}</span>
                            <span class="rack-item-status">${isEquipped ? 'Equipped' : '+ Wear'}</span>
                          </div>
                        </div>
                      `;
                    }).join("")}
                  </div>
                `}
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    this.attachEvents();
  }

  isPieceEquipped(piece, outfit) {
    return Object.values(outfit.slots).some(worn => worn && worn.id === piece.id);
  }

  renderEquippedSlotPill(slotKey, piece, label) {
    if (!piece) {
      return `
        <div class="slot-pill empty" data-slot="${slotKey}">
          <span class="slot-label">${label}:</span>
          <span class="slot-empty-text">${t("fitting_empty_slot")}</span>
        </div>
      `;
    }
    return `
      <div class="slot-pill occupied" data-slot="${slotKey}">
        <span class="slot-color-dot" style="background-color: ${piece.colorHex};"></span>
        <span class="slot-label">${label}:</span>
        <span class="slot-piece-name">${piece.pieceId.toUpperCase()}</span>
        <button class="btn-unequip-slot" data-slot="${slotKey}" title="Unequip">×</button>
      </div>
    `;
  }

  attachEvents() {
    // Model gender toggle
    this.container.querySelectorAll(".gender-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        const gender = btn.getAttribute("data-model-gender");
        state.setFittingModel(gender, null);
        this.render();
      });
    });

    // Skin tone buttons
    this.container.querySelectorAll(".tone-dot").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        const tone = btn.getAttribute("data-tone");
        state.setFittingModel(null, tone);
        this.render();
      });
    });

    // Drawer filter tabs
    this.container.querySelectorAll(".drawer-filter").forEach(btn => {
      btn.addEventListener("click", () => {
        playSound("click");
        this.activeDrawerFilter = btn.getAttribute("data-cat");
        this.render();
      });
    });

    // Unequip buttons on slot pills
    this.container.querySelectorAll(".btn-unequip-slot").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        playSound("pop");
        const slot = btn.getAttribute("data-slot");
        state.unequipSlot(slot);
        this.render();
      });
    });

    // Rack item card clicks (equip / unequip toggle)
    this.container.querySelectorAll(".rack-item-card").forEach(card => {
      card.addEventListener("click", () => {
        const pieceId = card.getAttribute("data-piece-id");
        const piece = state.getWardrobePiece(pieceId);
        if (!piece) return;

        const isEquipped = this.isPieceEquipped(piece, state.fittingRoom);
        if (isEquipped) {
          playSound("pop");
          // Find slot and unequip
          for (const [slot, item] of Object.entries(state.fittingRoom.slots)) {
            if (item && item.id === piece.id) {
              state.unequipSlot(slot);
              break;
            }
          }
        } else {
          playSound("equip");
          state.equipPiece(piece);
        }
        this.render();
      });
    });

    // Reset button
    const resetBtn = this.container.querySelector("#btn-fitting-reset");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        playSound("pop");
        state.resetFittingOutfit();
        this.render();
      });
    }

    // Surprise Me / Randomize button
    const randomBtn = this.container.querySelector("#btn-fitting-random");
    if (randomBtn) {
      randomBtn.addEventListener("click", () => {
        playSound("equip");
        this.randomizeOutfit();
        this.render();
      });
    }

    // Download PNG Lookbook
    const downloadBtn = this.container.querySelector("#btn-fitting-download");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        playSound("click");
        this.exportLookbookPng();
      });
    }

    // Order new button in rack
    const newBtn = this.container.querySelector("#btn-closet-order-new");
    if (newBtn) {
      newBtn.addEventListener("click", () => {
        playSound("click");
        state.emit("navigateScene", "order");
      });
    }
  }

  randomizeOutfit() {
    state.resetFittingOutfit();
    const items = state.wardrobe;
    if (items.length === 0) return;

    // Pick a random top or onepiece
    const onepieces = items.filter(i => (i.slot || SLOT_TABLE[i.pieceId]) === "onepiece");
    const tops = items.filter(i => (i.slot || SLOT_TABLE[i.pieceId]) === "top");
    const bottoms = items.filter(i => (i.slot || SLOT_TABLE[i.pieceId]) === "bottom");
    const outerwear = items.filter(i => (i.slot || SLOT_TABLE[i.pieceId]) === "outerwear");
    const neck = items.filter(i => (i.slot || SLOT_TABLE[i.pieceId]) === "neck");
    const head = items.filter(i => (i.slot || SLOT_TABLE[i.pieceId]) === "head");
    const feet = items.filter(i => (i.slot || SLOT_TABLE[i.pieceId]) === "feet");

    if (onepieces.length > 0 && Math.random() > 0.6) {
      const p = onepieces[Math.floor(Math.random() * onepieces.length)];
      state.equipPiece(p);
    } else {
      if (tops.length > 0) {
        state.equipPiece(tops[Math.floor(Math.random() * tops.length)]);
      }
      if (bottoms.length > 0) {
        state.equipPiece(bottoms[Math.floor(Math.random() * bottoms.length)]);
      }
    }

    if (outerwear.length > 0 && Math.random() > 0.4) {
      state.equipPiece(outerwear[Math.floor(Math.random() * outerwear.length)]);
    }
    if (neck.length > 0 && Math.random() > 0.4) {
      state.equipPiece(neck[Math.floor(Math.random() * neck.length)]);
    }
    if (head.length > 0 && Math.random() > 0.5) {
      state.equipPiece(head[Math.floor(Math.random() * head.length)]);
    }
    if (feet.length > 0 && Math.random() > 0.4) {
      state.equipPiece(feet[Math.floor(Math.random() * feet.length)]);
    }
  }

  exportLookbookPng() {
    const svgElem = this.container.querySelector("#mannequin-composite-svg");
    if (!svgElem) return;

    const svgXml = new XMLSerializer().serializeToString(svgElem);
    const svgBlob = new Blob([svgXml], { type: "image/svg+xml;charset=utf-8" });
    const URL = window.URL || window.webkitURL || window;
    const blobURL = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      // Create high-res Lookbook Polaroid Canvas (640 x 920 with 1:2 model ratio)
      const canvas = document.createElement("canvas");
      canvas.width = 640;
      canvas.height = 920;
      const ctx = canvas.getContext("2d");

      // Polaroid Paper Background
      ctx.fillStyle = "#FAF7F2";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Inner Photo Border with soft warm studio gradient
      const grad = ctx.createLinearGradient(40, 40, 600, 750);
      grad.addColorStop(0, "#F5EFEB");
      grad.addColorStop(1, "#EED8C9");
      ctx.fillStyle = grad;
      ctx.fillRect(40, 40, 560, 710);

      // Arch decorative border
      ctx.strokeStyle = "#D96B43";
      ctx.lineWidth = 3;
      ctx.strokeRect(40, 40, 560, 710);

      // Draw the SVG character centered in 1:2 aspect ratio (340 x 680)
      ctx.drawImage(img, 150, 55, 340, 680);

      // Polaroid Bottom Text - Clean Architectural Typography (Poppins)
      ctx.fillStyle = "#181615";
      ctx.font = "600 24px 'Poppins', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("ATELIER MARIEM", 320, 795);

      ctx.fillStyle = "#B85028";
      ctx.font = "500 13px 'Poppins', sans-serif";
      ctx.fillText("Bespoke Couture Archive • " + new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).toUpperCase(), 320, 825);

      ctx.fillStyle = "#5E5652";
      ctx.font = "400 12px 'Poppins', sans-serif";
      ctx.fillText("Architectural tailoring with reinforced french seams", 320, 856);

      // Download file
      const pngURL = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `Atelier-Mariem-Look-${Date.now()}.png`;
      downloadLink.href = pngURL;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobURL);
    };

    img.src = blobURL;
  }
}
