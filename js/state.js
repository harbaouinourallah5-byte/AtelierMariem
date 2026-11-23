// ==========================================================================
// Atelier Mariem - State Management Module
// Centralized state, localStorage persistence & reactive event dispatch
// ==========================================================================

import { STARTER_PIECES, COLOR_PALETTE, SLOT_TABLE } from "./clothingData.js";

const WARDROBE_STORAGE_KEY = "atelier_wardrobe_items";
const SAVED_OUTFIT_KEY = "atelier_saved_outfit";

class AppState {
  constructor() {
    this.currentScene = "studio"; // studio | order | workshop | wardrobe | fitting
    this.currentOrder = this.createEmptyOrder();
    this.wardrobe = this.loadWardrobe();
    this.fittingRoom = this.loadFittingState();
    this.listeners = new Map();
  }

  createEmptyOrder() {
    const defaultColor = COLOR_PALETTE[0]; // Terracotta
    return {
      id: null,
      gender: "femme",
      colorId: defaultColor.id,
      colorHex: defaultColor.hex,
      colorNameEn: defaultColor.nameEn,
      colorNameFr: defaultColor.nameFr,
      colorTone: defaultColor.tone,
      pieceId: "chemise",
      category: "tops",
      slot: "top",
      styleId: "classic",
      patternId: "plain",
      embroideryText: "",
      threadColorHex: "#FFFDF6",
      craftedAt: null
    };
  }

  loadWardrobe() {
    try {
      const data = localStorage.getItem(WARDROBE_STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Could not read wardrobe from localStorage:", e);
    }
    // Initialize with starter pieces
    this.saveWardrobe(STARTER_PIECES);
    return [...STARTER_PIECES];
  }

  saveWardrobe(items) {
    try {
      localStorage.setItem(WARDROBE_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Could not save wardrobe to localStorage:", e);
    }
  }

  addWardrobePiece(piece) {
    const newPiece = {
      ...piece,
      id: piece.id || `piece_${Date.now()}_${Math.random().toString(36).substring(4, 9)}`,
      craftedAt: piece.craftedAt || new Date().toISOString()
    };
    this.wardrobe.unshift(newPiece);
    this.saveWardrobe(this.wardrobe);
    this.emit("wardrobeChanged", this.wardrobe);
    return newPiece;
  }

  deleteWardrobePiece(pieceId) {
    this.wardrobe = this.wardrobe.filter(p => p.id !== pieceId);
    this.saveWardrobe(this.wardrobe);

    // Unequip from fitting room if equipped
    let outfitChanged = false;
    for (const slotKey of Object.keys(this.fittingRoom.slots)) {
      if (this.fittingRoom.slots[slotKey] && this.fittingRoom.slots[slotKey].id === pieceId) {
        this.fittingRoom.slots[slotKey] = null;
        outfitChanged = true;
      }
    }
    if (outfitChanged) {
      this.saveFittingState();
      this.emit("fittingRoomChanged", this.fittingRoom);
    }

    this.emit("wardrobeChanged", this.wardrobe);
  }

  getWardrobePiece(pieceId) {
    return this.wardrobe.find(p => p.id === pieceId) || null;
  }

  loadFittingState() {
    try {
      const data = localStorage.getItem(SAVED_OUTFIT_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        // Ensure all slots exist including neck and feet
        return {
          gender: parsed.gender || "femme",
          skinTone: parsed.skinTone || "warm",
          slots: {
            head: parsed.slots?.head || null,
            neck: parsed.slots?.neck || null,
            top: parsed.slots?.top || null,
            bottom: parsed.slots?.bottom || null,
            onepiece: parsed.slots?.onepiece || null,
            outerwear: parsed.slots?.outerwear || null,
            feet: parsed.slots?.feet || parsed.slots?.shoes || null
          }
        };
      }
    } catch (e) {
      // fallback
    }
    return {
      gender: "femme",
      skinTone: "warm",
      slots: {
        head: null,
        neck: null,
        top: null,
        bottom: null,
        onepiece: null,
        outerwear: null,
        feet: null
      }
    };
  }

  saveFittingState() {
    try {
      localStorage.setItem(SAVED_OUTFIT_KEY, JSON.stringify(this.fittingRoom));
    } catch (e) {}
  }

  setFittingModel(gender, skinTone) {
    if (gender) this.fittingRoom.gender = gender;
    if (skinTone) this.fittingRoom.skinTone = skinTone;
    this.saveFittingState();
    this.emit("fittingRoomChanged", this.fittingRoom);
  }

  equipPiece(piece) {
    if (!piece) return;
    const slot = SLOT_TABLE[piece.pieceId] || piece.slot || "top";
    piece.slot = slot;

    // Switch model automatically based on garment gender
    if (piece.gender === "femme" && this.fittingRoom.gender !== "femme") {
      this.fittingRoom.gender = "femme";
    } else if (piece.gender === "homme" && this.fittingRoom.gender !== "homme") {
      this.fittingRoom.gender = "homme";
    }

    // If equipping a dress or suit (onepiece), clear separate top and bottom
    if (slot === "onepiece") {
      this.fittingRoom.slots.top = null;
      this.fittingRoom.slots.bottom = null;
      this.fittingRoom.slots.onepiece = piece;
    } else if (slot === "top" || slot === "bottom") {
      // If equipping top or bottom, clear onepiece
      this.fittingRoom.slots.onepiece = null;
      this.fittingRoom.slots[slot] = piece;
    } else {
      this.fittingRoom.slots[slot] = piece;
    }

    this.saveFittingState();
    this.emit("fittingRoomChanged", this.fittingRoom);
  }

  unequipSlot(slot) {
    if (this.fittingRoom.slots[slot] !== undefined) {
      this.fittingRoom.slots[slot] = null;
      this.saveFittingState();
      this.emit("fittingRoomChanged", this.fittingRoom);
    }
  }

  resetFittingOutfit() {
    this.fittingRoom.slots = {
      head: null,
      neck: null,
      top: null,
      bottom: null,
      onepiece: null,
      outerwear: null,
      feet: null
    };
    this.saveFittingState();
    this.emit("fittingRoomChanged", this.fittingRoom);
  }

  resetCurrentOrder() {
    this.currentOrder = this.createEmptyOrder();
  }

  // Event dispatching
  on(event, handler) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event).push(handler);
  }

  emit(event, data) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(handler => handler(data));
    }
  }
}

export const state = new AppState();
