// ==========================================================================
// Atelier Mariem - Dialogue Engine
// Pools selection without consecutive repeats, typewriter effect & reactions
// ==========================================================================

import { DIALOGUE_POOLS } from "./dialogueData.js";
import { getLang } from "./i18n.js";
import { playSound } from "./audio.js";

class DialogueEngine {
  constructor() {
    this.history = {
      greetings: null,
      study_remarks: null,
      gender_reactions: null,
      color_reactions: null,
      piece_reactions: null,
      style_reactions: null,
      pattern_reactions: null,
      embroidery_reactions: null,
      workshop_banter: null,
      completion_celebration: null
    };

    this.typewriterTimer = null;
    this.typingTimeoutId = null;
    this.isTyping = false;
  }

  /**
   * Select a random line from the given category pool, ensuring no immediate repeat
   */
  getRandomLine(category) {
    const raw = DIALOGUE_POOLS[category];
    const pool = Array.isArray(raw) ? raw : (raw?.fr || raw?.en || []);
    if (!pool || pool.length === 0) return "";

    let available = pool.filter(line => line !== this.history[category]);
    if (available.length === 0) available = pool;

    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];
    this.history[category] = chosen;
    return chosen;
  }

  /**
   * Render a message into a container with typewriter effect and typing indicator
   */
  async displayMariemMessage(container, text, options = {}) {
    return new Promise((resolve) => {
      // Clear previous typewriter and timeout if running
      if (this.typewriterTimer) {
        clearInterval(this.typewriterTimer);
        this.typewriterTimer = null;
      }
      if (this.typingTimeoutId) {
        clearTimeout(this.typingTimeoutId);
        this.typingTimeoutId = null;
      }

      const {
        typingDelay = 450, // simulated thinking/typing indicator duration
        charSpeed = 16,    // ms per character
        onComplete = null
      } = options;

      // 1. Show typing indicator
      container.innerHTML = `
        <div class="chat-bubble mariem-bubble typing-indicator-bubble" aria-live="polite">
          <div class="typing-indicator">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
          </div>
        </div>
      `;

      this.typingTimeoutId = setTimeout(() => {
        this.typingTimeoutId = null;
        this.isTyping = true;
        container.innerHTML = `
          <div class="chat-bubble mariem-bubble" aria-live="polite">
            <p class="bubble-text"></p>
          </div>
        `;

        const textElem = container.querySelector(".bubble-text");
        let i = 0;
        let soundCounter = 0;

        this.typewriterTimer = setInterval(() => {
          if (i < text.length) {
            textElem.textContent += text.charAt(i);
            i++;

            soundCounter++;
            if (soundCounter % 4 === 0) {
              playSound("pop", 0.04);
            }
          } else {
            clearInterval(this.typewriterTimer);
            this.typewriterTimer = null;
            this.isTyping = false;
            if (onComplete) onComplete();
            resolve();
          }
        }, charSpeed);
      }, typingDelay);
    });
  }

  /**
   * Skip active typing to show full text immediately
   */
  skipTyping(container, fullText) {
    if (this.typingTimeoutId) {
      clearTimeout(this.typingTimeoutId);
      this.typingTimeoutId = null;
    }
    if (this.typewriterTimer) {
      clearInterval(this.typewriterTimer);
      this.typewriterTimer = null;
    }
    this.isTyping = false;
    const textElem = container.querySelector(".bubble-text");
    if (textElem) {
      textElem.textContent = fullText;
    }
  }
}

export const dialogueEngine = new DialogueEngine();
