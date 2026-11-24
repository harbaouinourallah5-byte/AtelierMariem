// ==========================================================================
// Atelier Mariem - Module de Textes (100% Français Unifié)
// ==========================================================================

import { TEXT, t as translate } from "./fr.js";

export { TEXT };

export const translations = {
  fr: TEXT
};

export function getLang() {
  return "fr";
}

export function setLang() {
  document.documentElement.lang = "fr";
}

export function t(key) {
  return translate(key);
}
