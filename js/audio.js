// ==========================================================================
// Atelier Mariem - Web Audio API Sound Effects Synthesizer
// Zero external files, pure synthesized tactile audio effects
// ==========================================================================

let audioCtx = null;
let isMuted = localStorage.getItem("atelier_muted") === "true";
let sewingOscillators = [];

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isAudioMuted() {
  return isMuted;
}

export function toggleAudioMute() {
  isMuted = !isMuted;
  localStorage.setItem("atelier_muted", isMuted ? "true" : "false");
  if (isMuted) {
    stopSewingSound();
  }
  return isMuted;
}

/**
 * Play procedural sound effects
 */
export function playSound(type, volumeMultiplier = 0.2) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(volumeMultiplier, now);
    masterGain.connect(ctx.destination);

    if (type === "click" || type === "button") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.05);

    } else if (type === "pop" || type === "typewriter") {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      const freq = 450 + Math.random() * 150;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, now + 0.03);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.03);

    } else if (type === "swatch_select") {
      // Pleasant dual tone
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "triangle";
      osc2.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc2.frequency.setValueAtTime(659.25, now); // E5

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.25);
      osc2.stop(now + 0.25);

    } else if (type === "tada") {
      // Fanfare chord progression C-E-G-C (high) with celebratory chime
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        const noteStart = now + idx * 0.08;
        const noteEnd = noteStart + 0.8;
        gain.gain.setValueAtTime(0.18, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteEnd);

        osc.connect(gain);
        gain.connect(masterGain);

        osc.start(noteStart);
        osc.stop(noteEnd);
      });

    } else if (type === "whoosh" || type === "door_open") {
      // Filtered noise swoosh
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(300, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.18);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      noise.start(now);

    } else if (type === "door_close") {
      // Solid wooden latch click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 0.12);

    } else if (type === "equip") {
      // Delicate dress-up rustle
      const notes = [440, 554.37, 659.25];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);

        const startTime = now + idx * 0.04;
        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(startTime);
        osc.stop(startTime + 0.18);
      });
    }
  } catch (e) {
    console.warn("Audio playback error:", e);
  }
}

/**
 * Start rhythmic sewing machine sound loop
 */
export function startSewingSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  stopSewingSound();

  try {
    const motorGain = ctx.createGain();
    motorGain.gain.setValueAtTime(0.04, ctx.currentTime);
    motorGain.connect(ctx.destination);

    // Motor hum
    const motorOsc = ctx.createOscillator();
    motorOsc.type = "sawtooth";
    motorOsc.frequency.setValueAtTime(75, ctx.currentTime);
    motorOsc.connect(motorGain);
    motorOsc.start();
    sewingOscillators.push(motorOsc);

    // Rhythmic needle clicks (repeated pulse)
    const intervalId = setInterval(() => {
      if (isMuted || sewingOscillators.length === 0) {
        clearInterval(intervalId);
        return;
      }
      try {
        const now = ctx.currentTime;
        const needleOsc = ctx.createOscillator();
        const needleGain = ctx.createGain();

        needleOsc.type = "triangle";
        needleOsc.frequency.setValueAtTime(380, now);
        needleOsc.frequency.exponentialRampToValueAtTime(90, now + 0.04);

        needleGain.gain.setValueAtTime(0.1, now);
        needleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

        needleOsc.connect(needleGain);
        needleGain.connect(ctx.destination);

        needleOsc.start(now);
        needleOsc.stop(now + 0.04);
      } catch (err) {
        // ignore
      }
    }, 110);

    sewingOscillators.push({
      stop: () => clearInterval(intervalId)
    });
  } catch (e) {
    console.warn("Sewing sound error:", e);
  }
}

export function stopSewingSound() {
  if (sewingOscillators && sewingOscillators.length > 0) {
    sewingOscillators.forEach(osc => {
      try {
        if (typeof osc.stop === "function") osc.stop();
      } catch (e) {}
    });
    sewingOscillators = [];
  }
}
