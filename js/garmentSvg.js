// ==========================================================================
// Atelier Mariem - Unified Garment SVG & Mannequin Architecture
// Shared ViewBox: 0 0 400 800 across both models and all 16 garments
// Fully articulated female and male mannequins with named anatomical anchors
// ==========================================================================

import { SLOT_TABLE } from "./clothingData.js";

/**
 * Named anatomical anchors per model for precision fitting
 */
export const MODEL_ANCHORS = {
  femme: {
    viewBox: "0 0 400 800",
    center: 200,
    head: { top: 68, center: 115, bottom: 165, rx: 36, ry: 48 },
    neck: { top: 162, bottom: 214, width: 24, left: 188, right: 212 },
    shoulders: { y: 222, left: 135, right: 265, span: 130 },
    bust: { y: 265, left: 142, right: 258, width: 116 },
    waist: { y: 328, left: 156, right: 244, width: 88 },
    hips: { y: 395, left: 128, right: 272, width: 144 },
    crotch: { y: 430 },
    knees: { y: 545, leftX: 165, rightX: 235 },
    ankles: { y: 705, leftX: 167, rightX: 233, width: 22 },
    feet: { top: 715, bottom: 760, leftX: 160, rightX: 240 },
    wrists: { y: 438, leftX: 105, rightX: 295 }
  },
  homme: {
    viewBox: "0 0 400 800",
    center: 200,
    head: { top: 64, center: 114, bottom: 168, rx: 40, ry: 50 },
    neck: { top: 164, bottom: 214, width: 34, left: 183, right: 217 },
    shoulders: { y: 216, left: 115, right: 285, span: 170 },
    bust: { y: 260, left: 131, right: 269, width: 138 },
    waist: { y: 328, left: 141, right: 259, width: 118 },
    hips: { y: 395, left: 137, right: 263, width: 126 },
    crotch: { y: 428 },
    knees: { y: 545, leftX: 165, rightX: 235 },
    ankles: { y: 705, leftX: 165, rightX: 235, width: 26 },
    feet: { top: 715, bottom: 760, leftX: 156, rightX: 244 },
    wrists: { y: 438, leftX: 90, rightX: 310 }
  }
};

/**
 * Skin tone palette (5 refined realistic tones)
 */
export const SKIN_TONES = {
  fair: {
    base: "#FDF0E8",
    shadow: "#EACBC0",
    contour: "#D8ABA0",
    lip: "#D48B8B"
  },
  warm: {
    base: "#F5DDD1",
    shadow: "#DCB7A6",
    contour: "#C79A88",
    lip: "#C87B7B"
  },
  sand: {
    base: "#E4BA97",
    shadow: "#C89773",
    contour: "#AD7C59",
    lip: "#A8625B"
  },
  caramel: {
    base: "#C68E65",
    shadow: "#A76D45",
    contour: "#885430",
    lip: "#8A4D45"
  },
  deep: {
    base: "#6F4532",
    shadow: "#4D2C1E",
    contour: "#361D13",
    lip: "#4D2825"
  }
};

/**
 * Returns reusable SVG pattern definitions for plain, stripes, dots, checks, houndstooth, floral
 */
export function getSvgPatternDefs(prefix = "pat") {
  return `
    <defs>
      <!-- Subtle Fabric Weave Texture -->
      <filter id="${prefix}_fabric_grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.08 0" />
        <feComposite in2="SourceGraphic" in="glare" operator="in" />
      </filter>

      <!-- 1. Tailor Stripes -->
      <pattern id="${prefix}_stripes" width="16" height="16" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="16" stroke="rgba(255,255,255,0.36)" stroke-width="2" />
        <line x1="8" y1="0" x2="8" y2="16" stroke="rgba(0,0,0,0.16)" stroke-width="1.5" />
      </pattern>

      <!-- 2. Polka Dots -->
      <pattern id="${prefix}_dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="2.5" fill="rgba(255,255,255,0.42)" />
        <circle cx="15" cy="15" r="2.5" fill="rgba(255,255,255,0.42)" />
        <circle cx="15" cy="5" r="1.5" fill="rgba(0,0,0,0.18)" />
        <circle cx="5" cy="15" r="1.5" fill="rgba(0,0,0,0.18)" />
      </pattern>

      <!-- 3. Windowpane Checks -->
      <pattern id="${prefix}_checks" width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="none" />
        <path d="M28 0 L0 0 0 28" fill="none" stroke="rgba(255,255,255,0.32)" stroke-width="1.8" />
        <path d="M14 0 L14 28 M0 14 L28 14" fill="none" stroke="rgba(0,0,0,0.18)" stroke-width="1" stroke-dasharray="2 2" />
      </pattern>

      <!-- 4. Micro Houndstooth -->
      <pattern id="${prefix}_houndstooth" width="16" height="16" patternUnits="userSpaceOnUse">
        <polygon points="0,0 8,0 4,8 0,8" fill="rgba(255,255,255,0.38)" />
        <polygon points="8,8 16,8 12,16 8,16" fill="rgba(255,255,255,0.38)" />
        <polygon points="8,0 12,0 16,8 8,8" fill="rgba(0,0,0,0.2)" />
        <polygon points="0,8 4,8 8,16 0,16" fill="rgba(0,0,0,0.2)" />
      </pattern>

      <!-- 5. Botanical Floral Sprigs -->
      <pattern id="${prefix}_floral" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M15,10 C13,6 17,6 15,10 C19,8 19,12 15,10 C17,14 13,14 15,10 C11,12 11,8 15,10 Z" fill="rgba(255,255,255,0.45)" />
        <circle cx="15" cy="10" r="1.8" fill="#F7DC6F" opacity="0.85" />
        <path d="M15,10 Q14,18 20,20" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="1" />
      </pattern>
    </defs>
  `;
}

/**
 * Returns the fully drawn base mannequin body (Female or Male)
 * Coordinates in shared 0 0 400 800 viewBox
 */
export function getFittingMannequinBaseSvg(gender = "femme", skinToneKey = "warm") {
  const isFemme = gender === "femme";
  const tone = SKIN_TONES[skinToneKey] || SKIN_TONES.warm;

  if (isFemme) {
    return `
      <!-- FEMALE MANNEQUIN BASE (0 0 400 800) -->
      <g class="mannequin-base mannequin-femme" id="mannequin-base-body">
        <!-- Underwear / Studio Slip Baseline -->
        <g class="undergarments" opacity="0.95">
          <!-- Bralette -->
          <path d="M154,250 C146,275 168,295 192,285 L192,275 C176,272 165,260 165,248 Z" fill="#E8DEC8" />
          <path d="M246,250 C254,275 232,295 208,285 L208,275 C224,272 235,260 235,248 Z" fill="#E8DEC8" />
          <path d="M185,280 L215,280 L215,286 L185,286 Z" fill="#E8DEC8" />
          <!-- Briefs -->
          <path d="M154,360 L246,360 L240,405 C222,425 206,432 200,432 C194,432 178,425 160,405 Z" fill="#E8DEC8" />
        </g>

        <!-- Torso & Body Shading -->
        <!-- Neck -->
        <path d="M188,162 L188,216 Q200,220 212,216 L212,162 Z" fill="${tone.shadow}" />
        <path d="M190,165 L190,212 Q200,216 210,212 L210,165 Z" fill="${tone.base}" />
        <!-- Clavicle / Collarbone -->
        <path d="M172,216 Q186,220 200,216 Q214,220 228,216" stroke="${tone.contour}" stroke-width="1.5" fill="none" stroke-linecap="round" />

        <!-- Torso (Narrow shoulders, defined waist, curvy hips) -->
        <path d="M188,212 L135,222 C132,240 140,265 142,280 C144,295 152,315 156,328 C160,345 138,375 128,395 C120,412 128,432 152,434 L180,432 L200,430 L220,432 L248,434 C272,432 280,412 272,395 C262,375 240,345 244,328 C248,315 256,295 258,280 C260,265 268,240 265,222 L212,212 Z" fill="${tone.base}" />
        <!-- Torso Side Contour Shadows -->
        <path d="M135,222 C132,240 140,265 142,280 C144,295 152,315 156,328 C160,345 138,375 128,395 L132,400 C142,378 164,348 160,328 C156,312 148,295 146,280 Z" fill="${tone.shadow}" opacity="0.5" />
        <path d="M265,222 C268,240 260,265 258,280 C256,295 248,315 244,328 C240,345 262,375 272,395 L268,400 C258,378 236,348 240,328 C244,312 252,295 254,280 Z" fill="${tone.shadow}" opacity="0.5" />

        <!-- Arms & Hands -->
        <!-- Left Arm -->
        <g class="arm-left">
          <path d="M135,222 L114,328 L105,438 L114,438 L126,332 L142,228 Z" fill="${tone.base}" />
          <!-- Arm shadow -->
          <path d="M114,328 L105,438 L109,438 L120,332 Z" fill="${tone.shadow}" opacity="0.4" />
          <!-- Left Hand -->
          <path d="M105,438 Q98,455 101,475 Q104,482 108,480 Q114,465 114,438 Z" fill="${tone.base}" />
        </g>
        <!-- Right Arm -->
        <g class="arm-right">
          <path d="M265,222 L286,328 L295,438 L286,438 L274,332 L258,228 Z" fill="${tone.base}" />
          <!-- Arm shadow -->
          <path d="M286,328 L295,438 L291,438 L280,332 Z" fill="${tone.shadow}" opacity="0.4" />
          <!-- Right Hand -->
          <path d="M295,438 Q302,455 299,475 Q296,482 292,480 Q286,465 286,438 Z" fill="${tone.base}" />
        </g>

        <!-- Legs & Feet -->
        <!-- Left Leg -->
        <g class="leg-left">
          <path d="M152,434 C140,465 138,505 150,545 C156,568 152,640 156,705 L178,705 C176,640 178,575 180,545 C180,505 186,465 200,430 L180,432 Z" fill="${tone.base}" />
          <!-- Knee highlight / shadow -->
          <ellipse cx="165" cy="545" rx="8" ry="5" fill="${tone.shadow}" opacity="0.35" />
          <!-- Left Foot -->
          <path d="M156,705 L144,746 C140,758 152,762 168,760 C178,758 178,735 178,705 Z" fill="${tone.base}" />
        </g>
        <!-- Right Leg -->
        <g class="leg-right">
          <path d="M248,434 C260,465 262,505 250,545 C244,568 248,640 244,705 L222,705 C224,640 222,575 220,545 C220,505 214,465 200,430 L220,432 Z" fill="${tone.base}" />
          <!-- Knee highlight / shadow -->
          <ellipse cx="235" cy="545" rx="8" ry="5" fill="${tone.shadow}" opacity="0.35" />
          <!-- Right Foot -->
          <path d="M244,705 L256,746 C260,758 248,762 232,760 C222,758 222,735 222,705 Z" fill="${tone.base}" />
        </g>

        <!-- Head, Face & Chic Brunette Hair (Framing face, hats sit cleanly on top) -->
        <g class="head-group">
          <!-- Back Hair Silhouette -->
          <path d="M160,85 C152,110 150,150 154,178 C160,185 175,188 188,185 L188,160 Z" fill="#3A251D" />
          <path d="M240,85 C248,110 250,150 246,178 C240,185 225,188 212,185 L212,160 Z" fill="#3A251D" />

          <!-- Face Shape -->
          <path d="M164,115 C164,82 178,68 200,68 C222,68 236,82 236,115 C236,145 222,165 200,165 C178,165 164,145 164,115 Z" fill="${tone.base}" />
          <!-- Ears with golden studs -->
          <ellipse cx="163" cy="122" rx="4" ry="7" fill="${tone.shadow}" />
          <circle cx="163" cy="125" r="1.5" fill="#E0B354" />
          <ellipse cx="237" cy="122" rx="4" ry="7" fill="${tone.shadow}" />
          <circle cx="237" cy="125" r="1.5" fill="#E0B354" />

          <!-- Front Hair Styling -->
          <path d="M162,110 C162,75 178,65 200,65 C222,65 238,75 238,110 C234,92 222,78 200,78 C178,78 166,92 162,110 Z" fill="#4A3228" />
          <path d="M165,95 Q185,82 200,88 Q182,105 168,115 Z" fill="#3A251D" />
          <path d="M235,95 Q215,82 200,88 Q218,105 232,115 Z" fill="#3A251D" />

          <!-- Delicate Eyes & Brows -->
          <path d="M172,104 Q182,100 190,103" stroke="#2B1A14" stroke-width="1.6" fill="none" stroke-linecap="round" />
          <path d="M210,103 Q218,100 228,104" stroke="#2B1A14" stroke-width="1.6" fill="none" stroke-linecap="round" />
          <!-- Eyes with lashes -->
          <ellipse cx="181" cy="113" rx="4.5" ry="3" fill="#FFFFFF" />
          <ellipse cx="181" cy="113" rx="2.8" ry="2.8" fill="#3D2B22" />
          <circle cx="182" cy="112" r="1" fill="#FFFFFF" />
          <path d="M175,111 Q181,108 187,112" stroke="#1F120E" stroke-width="1.4" fill="none" />

          <ellipse cx="219" cy="113" rx="4.5" ry="3" fill="#FFFFFF" />
          <ellipse cx="219" cy="113" rx="2.8" ry="2.8" fill="#3D2B22" />
          <circle cx="220" cy="112" r="1" fill="#FFFFFF" />
          <path d="M213,112 Q219,108 225,111" stroke="#1F120E" stroke-width="1.4" fill="none" />

          <!-- Nose -->
          <path d="M200,112 L199,128 Q200,132 204,130" stroke="${tone.contour}" stroke-width="1.2" fill="none" stroke-linecap="round" />

          <!-- Soft Lips -->
          <path d="M193,144 Q200,140 207,144 Q200,149 193,144 Z" fill="${tone.lip}" />
          <!-- Cheeks blush -->
          <ellipse cx="174" cy="126" rx="7" ry="4" fill="#E58A8A" opacity="0.3" />
          <ellipse cx="226" cy="126" rx="7" ry="4" fill="#E58A8A" opacity="0.3" />
        </g>
      </g>
    `;
  } else {
    // MALE MANNEQUIN BASE (0 0 400 800)
    return `
      <!-- MALE MANNEQUIN BASE (0 0 400 800) -->
      <g class="mannequin-base mannequin-homme" id="mannequin-base-body">
        <!-- Underwear / Studio Trunks -->
        <g class="undergarments" opacity="0.95">
          <path d="M141,350 L259,350 L255,420 C235,432 215,434 200,434 C185,434 165,432 145,420 Z" fill="#24262E" />
        </g>

        <!-- Sturdy Neck -->
        <path d="M183,164 L183,216 Q200,220 217,216 L217,164 Z" fill="${tone.shadow}" />
        <path d="M185,166 L185,214 Q200,217 215,214 L215,166 Z" fill="${tone.base}" />
        <path d="M196,188 Q200,192 204,188" stroke="${tone.contour}" stroke-width="1.4" fill="none" />

        <!-- Broad Athletic Torso (Broad shoulders, V-taper) -->
        <path d="M183,214 L115,216 C112,242 124,272 131,295 C136,312 139,322 141,328 C144,348 136,375 137,395 C138,415 142,428 162,430 L185,430 L200,428 L215,430 L238,430 C258,428 262,415 263,395 C264,375 256,348 259,328 C261,322 264,312 269,295 C276,272 288,242 285,216 L217,214 Z" fill="${tone.base}" />
        <!-- Pectoral / Chest Contours -->
        <path d="M145,268 Q170,274 195,268" stroke="${tone.contour}" stroke-width="1.5" fill="none" opacity="0.5" />
        <path d="M205,268 Q230,274 255,268" stroke="${tone.contour}" stroke-width="1.5" fill="none" opacity="0.5" />
        <!-- Abdominal midline -->
        <line x1="200" y1="268" x2="200" y2="340" stroke="${tone.contour}" stroke-width="1.2" opacity="0.35" />

        <!-- Arms & Hands -->
        <!-- Left Arm -->
        <g class="arm-left">
          <path d="M115,216 L94,328 L90,438 L104,438 L114,332 L131,224 Z" fill="${tone.base}" />
          <path d="M94,328 L90,438 L95,438 L108,332 Z" fill="${tone.shadow}" opacity="0.35" />
          <path d="M90,438 Q82,455 86,478 Q90,482 96,480 Q104,465 104,438 Z" fill="${tone.base}" />
        </g>
        <!-- Right Arm -->
        <g class="arm-right">
          <path d="M285,216 L306,328 L310,438 L296,438 L286,332 L269,224 Z" fill="${tone.base}" />
          <path d="M306,328 L310,438 L305,438 L292,332 Z" fill="${tone.shadow}" opacity="0.35" />
          <path d="M310,438 Q318,455 314,478 Q310,482 304,480 Q296,465 296,438 Z" fill="${tone.base}" />
        </g>

        <!-- Athletic Legs & Feet -->
        <!-- Left Leg -->
        <g class="leg-left">
          <path d="M162,430 C150,470 144,510 148,545 C152,572 148,642 152,705 L178,705 C176,642 178,575 182,545 C184,510 190,465 200,428 L185,430 Z" fill="${tone.base}" />
          <ellipse cx="165" cy="545" rx="9" ry="6" fill="${tone.shadow}" opacity="0.35" />
          <!-- Left Foot -->
          <path d="M152,705 L138,746 C134,758 148,762 168,760 C178,758 178,735 178,705 Z" fill="${tone.base}" />
        </g>
        <!-- Right Leg -->
        <g class="leg-right">
          <path d="M238,430 C250,470 256,510 252,545 C248,572 252,642 248,705 L222,705 C224,642 222,575 218,545 C216,510 210,465 200,428 L215,430 Z" fill="${tone.base}" />
          <ellipse cx="235" cy="545" rx="9" ry="6" fill="${tone.shadow}" opacity="0.35" />
          <!-- Right Foot -->
          <path d="M248,705 L262,746 C266,758 252,762 232,760 C222,758 222,735 222,705 Z" fill="${tone.base}" />
        </g>

        <!-- Head, Chiseled Face & Classic Side-Part Hair -->
        <g class="head-group">
          <!-- Back hair -->
          <path d="M156,80 C152,105 152,145 156,160 L183,164 Z" fill="#221815" />
          <path d="M244,80 C248,105 248,145 244,160 L217,164 Z" fill="#221815" />

          <!-- Face Shape (Square, chiseled masculine jaw) -->
          <path d="M160,114 C160,78 176,64 200,64 C224,64 240,78 240,114 C240,146 226,168 200,168 C174,168 160,146 160,114 Z" fill="${tone.base}" />
          <!-- Ears -->
          <ellipse cx="158" cy="120" rx="4.5" ry="8" fill="${tone.shadow}" />
          <ellipse cx="242" cy="120" rx="4.5" ry="8" fill="${tone.shadow}" />

          <!-- Hair (Clean taper & side-part) -->
          <path d="M158,105 C158,70 174,60 200,60 C226,60 242,70 242,105 C238,88 224,72 200,72 C174,72 162,88 158,105 Z" fill="#2F211C" />
          <path d="M160,90 Q180,72 205,76 Q185,92 168,104 Z" fill="#221815" />

          <!-- Strong Masculine Brows & Eyes -->
          <path d="M168,102 Q180,98 190,101" stroke="#1A120E" stroke-width="2.2" fill="none" stroke-linecap="round" />
          <path d="M210,101 Q220,98 232,102" stroke="#1A120E" stroke-width="2.2" fill="none" stroke-linecap="round" />
          <ellipse cx="179" cy="111" rx="4.2" ry="2.8" fill="#FFFFFF" />
          <ellipse cx="179" cy="111" rx="2.8" ry="2.8" fill="#3D2B22" />
          <circle cx="180" cy="110" r="1" fill="#FFFFFF" />

          <ellipse cx="221" cy="111" rx="4.2" ry="2.8" fill="#FFFFFF" />
          <ellipse cx="221" cy="111" rx="2.8" ry="2.8" fill="#3D2B22" />
          <circle cx="222" cy="110" r="1" fill="#FFFFFF" />

          <!-- Strong Chiseled Nose -->
          <path d="M200,108 L198,128 Q200,133 205,130" stroke="${tone.contour}" stroke-width="1.6" fill="none" stroke-linecap="round" />

          <!-- Masculine Defined Lips -->
          <path d="M192,145 Q200,142 208,145 Q200,149 192,145 Z" fill="${tone.lip}" />
        </g>
      </g>
    `;
  }
}

/**
 * Generates layered SVG garment for a mannequin in 0 0 400 800 viewBox
 * Accurately fits anchors for either gender
 */
export function getLayeredGarmentSvg(piece, slot, gender = "femme") {
  if (!piece) return "";

  const isFemme = gender === "femme";
  const hex = piece.colorHex || "#C2542B";
  const pat = piece.patternId || "plain";
  const patPrefix = `fit_${piece.id || Math.random().toString(36).substring(7)}`;
  const style = piece.styleId || "classic";
  const tag = piece.embroideryText || "";
  const thread = piece.threadColorHex || "#FFFDF6";

  const patDefs = getSvgPatternDefs(patPrefix);
  const patternOverlay = pat !== "plain"
    ? `<rect width="400" height="800" fill="url(#${patPrefix}_${pat})" opacity="0.88" />`
    : "";

  let pieceSvg = "";

  // 1. HEAD (bonnet, casquette)
  if (slot === "head") {
    if (piece.pieceId === "bonnet") {
      const topY = isFemme ? 52 : 48;
      const cuffY = isFemme ? 95 : 94;
      const cuffH = 18;
      const pompom = style === "pompom" ? `<circle cx="200" cy="${topY - 10}" r="14" fill="${hex}" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />` : "";

      pieceSvg = `
        <g class="garment-layer-bonnet">
          ${pompom}
          <!-- Crown Dome -->
          <path d="M154,${cuffY} C150,${topY} 250,${topY} 246,${cuffY} Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Ribbed Cuff -->
          <rect x="150" y="${cuffY}" width="100" height="${cuffH}" rx="4" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          <path d="M150,${cuffY + cuffH} Q200,${cuffY + cuffH + 3} 250,${cuffY + cuffH}" stroke="rgba(0,0,0,0.3)" stroke-width="2" fill="none" />
          <!-- Woven Atelier Label on Cuff -->
          <rect x="186" y="${cuffY + 3}" width="28" height="12" rx="2" fill="#FAF7F2" stroke="#D96B43" stroke-width="0.8" />
          <text x="200" y="${cuffY + 11.5}" font-family="'Poppins', sans-serif" font-size="6" font-weight="700" fill="${thread}" text-anchor="middle">${tag || "ATELIER"}</text>
        </g>
      `;
    } else {
      // Casquette
      const capTop = isFemme ? 56 : 52;
      const brimY = isFemme ? 108 : 106;

      pieceSvg = `
        <g class="garment-layer-casquette">
          <!-- 6-Panel Crown -->
          <path d="M156,${brimY} C154,${capTop} 246,${capTop} 244,${brimY} Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Top Button -->
          <circle cx="200" cy="${capTop}" r="3" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
          <!-- Curved Visor Brim -->
          <path d="M148,${brimY} Q200,${brimY - 8} 252,${brimY} Q265,${brimY + 18} 200,${brimY + 20} Q135,${brimY + 18} 148,${brimY} Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
          <path d="M152,${brimY + 2} Q200,${brimY + 16} 248,${brimY + 2}" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" fill="none" />
        </g>
      `;
    }
  }

  // 2. NECK (écharpe)
  if (slot === "neck") {
    pieceSvg = `
      <g class="garment-layer-echarpe">
        <!-- Main Cozy Neck Wrap -->
        <ellipse cx="200" cy="208" rx="42" ry="20" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
        ${patternOverlay}
        <!-- Draped Scarf Tails Falling Gracefully Down Front Torso -->
        <path d="M182,216 L175,345 Q190,348 202,345 L204,218 Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
        <path d="M200,218 L196,325 Q210,328 220,325 L222,218 Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
        <!-- Fringed Tassels -->
        <path d="M175,345 L175,355 M180,346 L180,356 M186,346 L186,356 M192,346 L192,356 M198,345 L198,355" stroke="${thread}" stroke-width="1.8" stroke-linecap="round" />
        <path d="M196,325 L196,335 M202,326 L202,336 M208,326 L208,336 M214,326 L214,336 M220,325 L220,335" stroke="${thread}" stroke-width="1.8" stroke-linecap="round" />
      </g>
    `;
  }

  // 3. TOP (chemise, pull, tshirt, hoodie)
  if (slot === "top") {
    const sL = isFemme ? 135 : 115;
    const sR = isFemme ? 265 : 285;
    const wL = isFemme ? 156 : 141;
    const wR = isFemme ? 244 : 259;
    const hL = isFemme ? 136 : 138;
    const hR = isFemme ? 264 : 262;
    const armWL = isFemme ? 105 : 90;
    const armWR = isFemme ? 295 : 310;
    const armElbL = isFemme ? 114 : 94;
    const armElbR = isFemme ? 286 : 306;

    if (piece.pieceId === "chemise") {
      const hemY = isFemme ? 388 : 398;
      pieceSvg = `
        <g class="garment-layer-chemise">
          <!-- Torso and Full-Length Sleeves down to Wrists -->
          <path d="M188,212 L${sL},220 L${armElbL},328 L${armWL},438 L${armWL + 16},438 L${armElbL + 16},332 L${wL},328 L${hL},${hemY} Q200,${hemY + 12} ${hR},${hemY} L${wR},328 L${armElbR - 16},332 L${armWR - 16},438 L${armWR},438 L${armElbR},328 L${sR},220 L212,212 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Side Seams and Darts -->
          <path d="M${wL},328 L${hL},${hemY} M${wR},328 L${hR},${hemY}" stroke="rgba(0,0,0,0.18)" stroke-width="1.5" />
          <!-- Placket and Pearl Buttons -->
          <line x1="200" y1="225" x2="200" y2="${hemY + 8}" stroke="rgba(0,0,0,0.18)" stroke-width="2" />
          <circle cx="200" cy="245" r="2.4" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <circle cx="200" cy="280" r="2.4" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <circle cx="200" cy="315" r="2.4" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <circle cx="200" cy="350" r="2.4" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <!-- Tailored Collar -->
          <polygon points="200,226 178,212 174,236 200,226" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.4" />
          <polygon points="200,226 222,212 226,236 200,226" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.4" />
          <!-- Cuffs at Wrists -->
          <rect x="${armWL - 2}" y="428" width="18" height="10" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <rect x="${armWR - 16}" y="428" width="18" height="10" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <!-- Pocket -->
          <rect x="${isFemme ? 164 : 158}" y="258" width="22" height="24" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
        </g>
      `;
    } else if (piece.pieceId === "pull") {
      const hemY = isFemme ? 388 : 396;
      const turtleneck = style === "turtleneck" ? `
        <rect x="180" y="172" width="40" height="42" rx="4" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
        <line x1="180" y1="192" x2="220" y2="192" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
      ` : "";

      pieceSvg = `
        <g class="garment-layer-pull">
          ${turtleneck}
          <!-- Knit Body and Full Sleeves -->
          <path d="M188,214 L${sL - 2},220 L${armElbL - 2},328 L${armWL - 2},438 L${armWL + 16},438 L${armElbL + 16},332 L${wL - 2},328 L${hL - 2},${hemY} Q200,${hemY + 4} ${hR + 2},${hemY} L${wR + 2},328 L${armElbR - 16},332 L${armWR - 16},438 L${armWR + 2},438 L${armElbR + 2},328 L${sR + 2},220 L212,214 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Knit Ribbed Hem -->
          <rect x="${hL - 2}" y="${hemY - 14}" width="${(hR - hL) + 4}" height="14" fill="rgba(0,0,0,0.12)" />
          <!-- Ribbed Cuffs -->
          <rect x="${armWL - 2}" y="424" width="18" height="14" fill="rgba(0,0,0,0.12)" />
          <rect x="${armWR - 16}" y="424" width="18" height="14" fill="rgba(0,0,0,0.12)" />
          <!-- Neckline Collar -->
          ${style !== "turtleneck" ? `<ellipse cx="200" cy="222" rx="24" ry="10" fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="4" />` : ""}
        </g>
      `;
    } else if (piece.pieceId === "hoodie") {
      const hemY = isFemme ? 392 : 400;
      pieceSvg = `
        <g class="garment-layer-hoodie">
          <!-- Cozy Draped Hood Behind Neck -->
          <path d="M174,188 C160,200 160,230 178,235 L222,235 C240,230 240,200 226,188 Z" fill="${hex}" stroke="rgba(0,0,0,0.28)" stroke-width="1.5" />
          <!-- Heavy Body & Full Sleeves -->
          <path d="M188,216 L${sL - 4},220 L${armElbL - 4},328 L${armWL - 2},438 L${armWL + 18},438 L${armElbL + 18},332 L${wL - 4},328 L${hL - 2},${hemY} Q200,${hemY + 6} ${hR + 2},${hemY} L${wR + 4},328 L${armElbR - 18},332 L${armWR - 18},438 L${armWR + 2},438 L${armElbR + 4},328 L${sR + 4},220 L212,216 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Kangaroo Pouch -->
          <path d="M172,325 L228,325 L236,375 L164,375 Z" fill="${hex}" stroke="rgba(0,0,0,0.22)" stroke-width="1.5" />
          <!-- Ribbed Hem -->
          <rect x="${hL - 2}" y="${hemY - 14}" width="${(hR - hL) + 4}" height="14" fill="rgba(0,0,0,0.15)" />
          <!-- Drawstrings -->
          <line x1="192" y1="228" x2="190" y2="272" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" />
          <line x1="208" y1="228" x2="210" y2="272" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="round" />
        </g>
      `;
    } else {
      // T-shirt / Débardeur
      const isCrop = style === "cropped";
      const hemY = isCrop ? 332 : (isFemme ? 382 : 390);
      const sleeveY = 295; // stops above elbow

      pieceSvg = `
        <g class="garment-layer-tshirt">
          <!-- Torso and Short Sleeves -->
          <path d="M188,214 L${sL},220 L${armElbL + 4},${sleeveY} L${armElbL + 20},${sleeveY} L${wL},320 L${wL},${hemY} Q200,${hemY + 4} ${wR},${hemY} L${wR},320 L${armElbR - 20},${sleeveY} L${armElbR - 4},${sleeveY} L${sR},220 L212,214 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Crew Collar -->
          <ellipse cx="200" cy="222" rx="20" ry="8" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="3" />
          <!-- Hemline double needle stitch -->
          <line x1="${wL}" y1="${hemY - 4}" x2="${wR}" y2="${hemY - 4}" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" />
        </g>
      `;
    }
  }

  // 4. BOTTOM (pantalon, jean, short, jupe)
  if (slot === "bottom") {
    const waistY = isFemme ? 325 : 328;
    const wL = isFemme ? 156 : 141;
    const wR = isFemme ? 244 : 259;
    const hipL = isFemme ? 128 : 137;
    const hipR = isFemme ? 272 : 263;
    const kneeY = 545;
    const ankleY = 705;

    if (piece.pieceId === "jupe") {
      const isMini = style === "mini";
      const skirtHemY = isMini ? 495 : 605;
      const flare = isMini ? 26 : 42;

      pieceSvg = `
        <g class="garment-layer-jupe">
          <!-- Waistband -->
          <rect x="${wL}" y="${waistY}" width="${wR - wL}" height="12" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
          <!-- Skirt Flare -->
          <path d="M${wL},${waistY + 12} L${hipL - flare},${skirtHemY} Q200,${skirtHemY + 14} ${hipR + flare},${skirtHemY} L${wR},${waistY + 12} Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Pleat Lines -->
          <line x1="${wL + 18}" y1="${waistY + 12}" x2="${hipL - flare + 25}" y2="${skirtHemY}" stroke="rgba(0,0,0,0.18)" stroke-width="1.5" />
          <line x1="${wL + 42}" y1="${waistY + 12}" x2="185" y2="${skirtHemY + 5}" stroke="rgba(0,0,0,0.18)" stroke-width="1.5" />
          <line x1="${wR - 42}" y1="${waistY + 12}" x2="215" y2="${skirtHemY + 5}" stroke="rgba(0,0,0,0.18)" stroke-width="1.5" />
          <line x1="${wR - 18}" y1="${waistY + 12}" x2="${hipR + flare - 25}" y2="${skirtHemY}" stroke="rgba(0,0,0,0.18)" stroke-width="1.5" />
        </g>
      `;
    } else if (piece.pieceId === "short") {
      const shortHemY = 515; // stops comfortably above knees

      pieceSvg = `
        <g class="garment-layer-short">
          <!-- Waistband -->
          <rect x="${wL}" y="${waistY}" width="${wR - wL}" height="14" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
          <!-- Left Leg & Right Leg -->
          <path d="M${wL},${waistY + 14} L${hipL},395 L145,${shortHemY} L190,${shortHemY} L200,430 L210,${shortHemY} L255,${shortHemY} L${hipR},395 L${wR},${waistY + 14} Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Inseam / Crotch Fly Detail -->
          <line x1="200" y1="${waistY + 14}" x2="200" y2="410" stroke="rgba(0,0,0,0.22)" stroke-width="1.8" />
          <!-- Folded Cuffs -->
          <rect x="144" y="${shortHemY - 8}" width="47" height="8" fill="rgba(0,0,0,0.15)" />
          <rect x="209" y="${shortHemY - 8}" width="47" height="8" fill="rgba(0,0,0,0.15)" />
        </g>
      `;
    } else if (piece.pieceId === "jean") {
      pieceSvg = `
        <g class="garment-layer-jean">
          <!-- Denim Waistband with Belt Loops & Shank Button -->
          <rect x="${wL}" y="${waistY}" width="${wR - wL}" height="14" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.28)" stroke-width="1.5" />
          <circle cx="200" cy="${waistY + 7}" r="2.8" fill="#D4AF37" />
          <!-- Pants Legs following thighs, knees and ankles -->
          <path d="M${wL},${waistY + 14} L${hipL},395 L146,${kneeY} L152,${ankleY} L180,${ankleY} L182,${kneeY} L200,428 L218,${kneeY} L220,${ankleY} L248,${ankleY} L254,${kneeY} L${hipR},395 L${wR},${waistY + 14} Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Curved 5-Pocket Details & Fly -->
          <path d="M${wL + 6},${waistY + 14} Q${wL + 25},${waistY + 36} ${wL + 34},${waistY + 14}" stroke="#CCA02A" stroke-width="1.4" fill="none" />
          <path d="M${wR - 6},${waistY + 14} Q${wR - 25},${waistY + 36} ${wR - 34},${waistY + 14}" stroke="#CCA02A" stroke-width="1.4" fill="none" />
          <!-- Golden Outseam Stitching -->
          <line x1="${wL}" y1="${waistY + 14}" x2="152" y2="${ankleY}" stroke="#CCA02A" stroke-width="1.4" stroke-dasharray="3 2" />
          <line x1="${wR}" y1="${waistY + 14}" x2="248" y2="${ankleY}" stroke="#CCA02A" stroke-width="1.4" stroke-dasharray="3 2" />
        </g>
      `;
    } else {
      // Pantalon (Pleated Trousers)
      pieceSvg = `
        <g class="garment-layer-pantalon">
          <!-- Sartorial Waistband -->
          <rect x="${wL}" y="${waistY}" width="${wR - wL}" height="14" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
          <!-- Trousers flowing from waist through thighs, knees to ankles -->
          <path d="M${wL},${waistY + 14} L${hipL - 2},395 L144,${kneeY} L150,${ankleY} L180,${ankleY} L182,${kneeY} L200,428 L218,${kneeY} L220,${ankleY} L250,${ankleY} L256,${kneeY} L${hipR + 2},395 L${wR},${waistY + 14} Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Architectural Front Pleats & Pressed Crease -->
          <line x1="${wL + 24}" y1="${waistY + 14}" x2="165" y2="${ankleY}" stroke="rgba(255,255,255,0.22)" stroke-width="1.8" />
          <line x1="${wR - 24}" y1="${waistY + 14}" x2="235" y2="${ankleY}" stroke="rgba(255,255,255,0.22)" stroke-width="1.8" />
          <!-- Cuffed Ankle Hems -->
          <rect x="150" y="${ankleY - 8}" width="30" height="8" fill="rgba(0,0,0,0.12)" />
          <rect x="220" y="${ankleY - 8}" width="30" height="8" fill="rgba(0,0,0,0.12)" />
        </g>
      `;
    }
  }

  // 5. ONEPIECE (robe, costume) - occupies top + bottom
  if (slot === "onepiece") {
    if (piece.pieceId === "robe") {
      const dressHemY = 615; // elegant midi length
      pieceSvg = `
        <g class="garment-layer-robe">
          <!-- Bodice (Hugging bust and waist) & Fluid Flowing Skirt -->
          <path d="M185,214 L142,226 L144,280 L156,328 L118,${dressHemY} Q200,${dressHemY + 16} 282,${dressHemY} L244,328 L256,280 L258,226 L215,214 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- V-Neck or Slip Darts -->
          <path d="M185,214 Q200,248 215,214" stroke="rgba(0,0,0,0.25)" stroke-width="1.8" fill="none" />
          <!-- Waist Sash / Belt -->
          <rect x="154" y="322" width="92" height="12" rx="2" fill="rgba(0,0,0,0.22)" />
          <!-- Fluid Skirt Drapes -->
          <path d="M175,334 Q165,470 150,${dressHemY}" stroke="rgba(0,0,0,0.16)" stroke-width="2" fill="none" />
          <path d="M225,334 Q235,470 250,${dressHemY}" stroke="rgba(0,0,0,0.16)" stroke-width="2" fill="none" />
        </g>
      `;
    } else {
      // Costume (Two-piece suit set)
      const sL = isFemme ? 135 : 115;
      const sR = isFemme ? 265 : 285;
      const wL = isFemme ? 156 : 141;
      const wR = isFemme ? 244 : 259;
      const hipL = isFemme ? 128 : 137;
      const hipR = isFemme ? 272 : 263;

      pieceSvg = `
        <g class="garment-layer-costume">
          <!-- Suit Pants -->
          <path d="M${wL},328 L${hipL},395 L144,545 L150,705 L180,705 L182,545 L200,428 L218,545 L220,705 L250,705 L256,545 L${hipR},395 L${wR},328 Z" fill="${hex}" />
          <!-- Suit Jacket Over Top -->
          <path d="M188,212 L${sL - 2},218 L${isFemme ? 112 : 92},328 L${isFemme ? 104 : 88},438 L${isFemme ? 120 : 104},438 L${isFemme ? 126 : 114},332 L${wL - 2},328 L${isFemme ? 136 : 138},398 Q200,404 ${isFemme ? 264 : 262},398 L${wR + 2},328 L${isFemme ? 274 : 286},332 L${isFemme ? 280 : 296},438 L${isFemme ? 296 : 312},438 L${isFemme ? 288 : 308},328 L${sR + 2},218 L212,212 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Peak / Notch Lapels -->
          <polygon points="200,230 174,212 168,255 198,285 200,270" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.4" />
          <polygon points="200,230 226,212 232,255 202,285 200,270" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.4" />
          <!-- Horn Buttons -->
          <circle cx="200" cy="300" r="3" fill="#D4AF37" />
          <circle cx="200" cy="335" r="3" fill="#D4AF37" />
          <!-- Jetted Flap Pockets -->
          <rect x="${isFemme ? 148 : 144}" y="348" width="26" height="12" rx="1.5" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
          <rect x="${isFemme ? 226 : 230}" y="348" width="26" height="12" rx="1.5" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
        </g>
      `;
    }
  }

  // 6. OUTERWEAR (veste, manteau)
  if (slot === "outerwear") {
    const sL = isFemme ? 132 : 112;
    const sR = isFemme ? 268 : 288;
    const hemY = piece.pieceId === "manteau" ? 640 : (isFemme ? 398 : 410);

    pieceSvg = `
      <g class="garment-layer-outerwear">
        <!-- Structured Shoulders, Full Sleeves and Overcoat Silhouette -->
        <path d="M188,212 L${sL},216 L${isFemme ? 108 : 88},328 L${isFemme ? 100 : 84},440 L${isFemme ? 118 : 102},440 L${isFemme ? 126 : 112},332 L${isFemme ? 152 : 138},328 L${isFemme ? 132 : 134},${hemY} Q200,${hemY + 8} ${isFemme ? 268 : 266},${hemY} L${isFemme ? 248 : 262},328 L${isFemme ? 274 : 288},332 L${isFemme ? 282 : 298},440 L${isFemme ? 300 : 316},440 L${isFemme ? 292 : 312},328 L${sR},216 L212,212 Z" fill="${hex}" />
        ${patternOverlay}
        <!-- Wide Double-Face Lapels -->
        <polygon points="200,230 168,212 162,260 200,290" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.6" />
        <polygon points="200,230 232,212 238,260 200,290" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.6" />
        <!-- Trench / Overcoat Belt -->
        ${piece.pieceId === "manteau" ? `
          <rect x="146" y="330" width="108" height="16" rx="2" fill="rgba(0,0,0,0.25)" />
          <rect x="194" y="328" width="12" height="20" rx="2" fill="#D4AF37" />
        ` : ""}
      </g>
    `;
  }

  // 7. FEET (chaussettes, chaussures)
  if (slot === "feet") {
    const isAnkle = style === "ankle";
    const isLong = style === "long";
    const sockTopY = isLong ? 575 : (isAnkle ? 695 : 645);

    pieceSvg = `
      <g class="garment-layer-socks">
        <!-- Left Sock Ribbing & Body -->
        <path d="M152,${sockTopY} L152,735 L178,735 L178,${sockTopY} Z" fill="${hex}" />
        <!-- Right Sock Ribbing & Body -->
        <path d="M222,${sockTopY} L222,735 L248,735 L248,${sockTopY} Z" fill="${hex}" />
        ${patternOverlay}
        <!-- Atelier Leather Loafers / Minimalist Shoes on Feet -->
        <path d="M140,735 Q135,758 152,760 Q175,760 178,735 Z" fill="#1C1A18" />
        <ellipse cx="158" cy="746" rx="14" ry="6" fill="#2E2B27" />
        <path d="M260,735 Q265,758 248,760 Q225,760 222,735 Z" fill="#1C1A18" />
        <ellipse cx="242" cy="746" rx="14" ry="6" fill="#2E2B27" />
      </g>
    `;
  }

  // Bespoke Embroidered Monogram Tag
  let embroideryBadge = "";
  if (tag && (slot === "top" || slot === "outerwear" || slot === "onepiece")) {
    const badgeX = isFemme ? 228 : 238;
    const badgeY = 265;
    embroideryBadge = `
      <g class="embroidery-tag" transform="translate(${badgeX}, ${badgeY})">
        <rect x="-16" y="-7" width="32" height="14" rx="2" fill="#FAF7F2" stroke="#D96B43" stroke-width="0.8" opacity="0.95" />
        <text x="0" y="3.5" font-family="'Poppins', sans-serif" font-size="7" font-weight="700" fill="${thread}" text-anchor="middle">${tag}</text>
      </g>
    `;
  }

  return `
    <g class="slot-layer slot-${slot}">
      ${patDefs}
      ${pieceSvg}
      ${embroideryBadge}
    </g>
  `;
}

/**
 * Get SVG markup for standalone garment (for wardrobe cards, modals, or hanger preview)
 */
export function getStandaloneGarmentSvg(piece, options = {}) {
  const {
    width = 160,
    height = 200,
    showHanger = true,
    className = ""
  } = options;

  const hex = piece.colorHex || "#C2542B";
  const pat = piece.patternId || "plain";
  const patPrefix = `stand_${piece.id || Math.random().toString(36).substring(7)}`;
  const style = piece.styleId || "classic";
  const tag = piece.embroideryText || "";
  const thread = piece.threadColorHex || "#FFFDF6";

  const patternDefs = getSvgPatternDefs(patPrefix);
  const patternOverlay = pat !== "plain"
    ? `<rect width="100%" height="100%" fill="url(#${patPrefix}_${pat})" opacity="0.85" />`
    : "";

  let hanger = "";
  if (showHanger) {
    hanger = `
      <!-- Wooden Hanger -->
      <g class="hanger" transform="translate(0, 5)">
        <path d="M100,26 C100,12 110,6 100,0 C90,-6 100,-15 105,-10" fill="none" stroke="#CCA02A" stroke-width="3" stroke-linecap="round" />
        <path d="M35,32 Q100,16 165,32 Q100,26 35,32 Z" fill="#9B5A2B" stroke="#683B1A" stroke-width="1.5" />
      </g>
    `;
  }

  let garmentPath = "";

  switch (piece.pieceId) {
    case "chemise":
      garmentPath = `
        <g class="garment-chemise">
          <path d="M48,32 L20,95 L44,102 L56,62 L56,170 Q100,180 144,170 L144,62 L156,102 L180,95 L152,32 Q100,42 48,32 Z" fill="${hex}" />
          ${patternOverlay}
          <path d="M56,62 L56,170 M144,62 L144,170" stroke="rgba(0,0,0,0.12)" stroke-width="2" />
          <path d="M100,42 L100,175" stroke="rgba(0,0,0,0.15)" stroke-width="1.8" />
          <circle cx="100" cy="65" r="2.2" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <circle cx="100" cy="95" r="2.2" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <circle cx="100" cy="125" r="2.2" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <polygon points="100,45 80,32 75,54 100,45" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
          <polygon points="100,45 120,32 125,54 100,45" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
          <rect x="68" y="75" width="22" height="24" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.18)" stroke-width="1.2" />
        </g>
      `;
      break;

    case "pull":
      garmentPath = `
        <g class="garment-pull">
          <path d="M42,32 L15,105 L40,112 L54,65 L54,172 Q100,178 146,172 L146,65 L160,112 L185,105 L158,32 Q100,45 42,32 Z" fill="${hex}" />
          ${patternOverlay}
          <rect x="54" y="162" width="92" height="10" fill="rgba(0,0,0,0.15)" />
          <rect x="18" y="103" width="22" height="8" fill="rgba(0,0,0,0.15)" transform="rotate(-15 28 107)" />
          <rect x="160" y="103" width="22" height="8" fill="rgba(0,0,0,0.15)" transform="rotate(15 172 107)" />
          <ellipse cx="100" cy="38" rx="28" ry="10" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="4" />
        </g>
      `;
      break;

    case "tshirt":
      garmentPath = `
        <g class="garment-tshirt">
          <path d="M45,34 L18,80 L42,88 L58,58 L58,165 Q100,170 142,165 L142,58 L158,88 L182,80 L155,34 Q100,48 45,34 Z" fill="${hex}" />
          ${patternOverlay}
          <ellipse cx="100" cy="40" rx="24" ry="9" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="3.5" />
        </g>
      `;
      break;

    case "hoodie":
      garmentPath = `
        <g class="garment-hoodie">
          <path d="M40,32 L12,105 L36,112 L52,65 L52,174 Q100,180 148,174 L148,65 L164,112 L188,105 L160,32 Q100,45 40,32 Z" fill="${hex}" />
          ${patternOverlay}
          <path d="M72,125 L128,125 L136,164 L64,164 Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
          <path d="M80,18 C70,25 70,38 85,42 L115,42 C130,38 130,25 120,18 Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
        </g>
      `;
      break;

    case "pantalon":
    case "jean":
      garmentPath = `
        <g class="garment-pants">
          <rect x="58" y="32" width="84" height="14" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <path d="M58,46 L46,180 L85,180 L100,75 L115,180 L154,180 L142,46 Z" fill="${hex}" />
          ${patternOverlay}
          <line x1="72" y1="46" x2="65" y2="180" stroke="rgba(255,255,255,0.25)" stroke-width="1.2" />
          <line x1="128" y1="46" x2="135" y2="180" stroke="rgba(255,255,255,0.25)" stroke-width="1.2" />
        </g>
      `;
      break;

    case "short":
      garmentPath = `
        <g class="garment-short">
          <rect x="58" y="32" width="84" height="14" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <path d="M58,46 L50,118 L94,118 L100,75 L106,118 L150,118 L142,46 Z" fill="${hex}" />
          ${patternOverlay}
        </g>
      `;
      break;

    case "jupe":
      garmentPath = `
        <g class="garment-jupe">
          <rect x="65" y="32" width="70" height="12" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <path d="M65,44 L32,165 Q100,180 168,165 L135,44 Z" fill="${hex}" />
          ${patternOverlay}
          <line x1="80" y1="44" x2="58" y2="170" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
          <line x1="100" y1="44" x2="100" y2="175" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
          <line x1="120" y1="44" x2="142" y2="170" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
        </g>
      `;
      break;

    case "robe":
      garmentPath = `
        <g class="garment-robe">
          <path d="M72,32 L78,65 L68,105 L42,185 Q100,195 158,185 L132,105 L122,65 L128,32 Z" fill="${hex}" />
          ${patternOverlay}
          <rect x="68" y="98" width="64" height="10" rx="2" fill="rgba(0,0,0,0.18)" />
        </g>
      `;
      break;

    case "costume":
      garmentPath = `
        <g class="garment-costume">
          <path d="M64,95 L55,185 L85,185 L100,115 L115,185 L145,185 L136,95 Z" fill="${hex}" />
          <path d="M48,32 L22,95 L45,102 L56,65 L56,128 Q100,134 144,128 L144,65 L155,102 L178,95 L152,32 Q100,42 48,32 Z" fill="${hex}" />
          ${patternOverlay}
          <polygon points="100,48 78,32 72,65 96,88 100,78" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
          <polygon points="100,48 122,32 128,65 104,88 100,78" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
        </g>
      `;
      break;

    case "veste":
    case "manteau":
      garmentPath = `
        <g class="garment-jacket">
          <path d="M45,30 L16,102 L40,110 L54,65 L52,165 Q100,172 148,165 L146,65 L160,110 L184,102 L155,30 Q100,40 45,30 Z" fill="${hex}" />
          ${patternOverlay}
          <polygon points="100,46 76,30 70,68 100,92" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
          <polygon points="100,46 124,30 130,68 100,92" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
        </g>
      `;
      break;

    case "bonnet":
      garmentPath = `
        <g class="garment-bonnet">
          <path d="M60,120 C55,40 145,40 140,120 Z" fill="${hex}" />
          ${patternOverlay}
          <rect x="52" y="112" width="96" height="24" rx="4" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          <circle cx="100" cy="40" r="12" fill="${hex}" />
        </g>
      `;
      break;

    case "casquette":
      garmentPath = `
        <g class="garment-casquette">
          <path d="M60,115 C58,55 142,55 140,115 Z" fill="${hex}" />
          ${patternOverlay}
          <path d="M48,115 Q100,105 152,115 Q168,135 100,138 Q32,135 48,115 Z" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
        </g>
      `;
      break;

    case "echarpe":
      garmentPath = `
        <g class="garment-echarpe">
          <ellipse cx="100" cy="65" rx="45" ry="22" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
          ${patternOverlay}
          <path d="M80,72 L72,165 Q90,168 102,165 L106,75 Z" fill="${hex}" />
          <path d="M102,74 L98,150 Q112,153 124,150 L126,74 Z" fill="${hex}" />
        </g>
      `;
      break;

    case "chaussettes":
      garmentPath = `
        <g class="garment-socks">
          <path d="M70,45 L70,135 Q70,160 95,160 L115,160 Q125,160 120,140 L102,140 L102,45 Z" fill="${hex}" />
          <path d="M130,45 L130,135 Q130,160 155,160 L175,160 Q185,160 180,140 L162,140 L162,45 Z" fill="${hex}" />
          ${patternOverlay}
        </g>
      `;
      break;

    default:
      garmentPath = `<rect x="50" y="40" width="100" height="120" rx="8" fill="${hex}" />`;
  }

  // Embroidery Tag
  let embroideryBadge = "";
  if (tag) {
    embroideryBadge = `
      <g class="embroidery-tag" transform="translate(100, 150)">
        <rect x="-18" y="-7" width="36" height="14" rx="2" fill="#FAF7F2" stroke="#D96B43" stroke-width="0.8" opacity="0.9" />
        <text x="0" y="3" font-family="'Poppins', sans-serif" font-size="7.5" font-weight="600" fill="${thread}" text-anchor="middle">${tag}</text>
      </g>
    `;
  }

  return `
    <svg class="garment-standalone-svg ${className}" viewBox="0 0 200 200" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${piece.pieceId}">
      ${patternDefs}
      ${hanger}
      ${garmentPath}
      ${embroideryBadge}
    </svg>
  `;
}
