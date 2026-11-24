// ==========================================================================
// Atelier Mariem - Unified Garment SVG & Mannequin Architecture
// Shared ViewBox: 0 0 400 800 across both models and all 16 garments
// Continuous smooth croquis mannequins, neutral base layer undergarments,
// blank smooth oval heads (no cartoon faces), strictly clipped pattern overlays
// ==========================================================================

import { SLOT_TABLE } from "./clothingData.js";

/**
 * Named anatomical anchors per model for precision fitting (0 0 400 800)
 */
export const MODEL_ANCHORS = {
  femme: {
    viewBox: "0 0 400 800",
    center: 200,
    head: { top: 68, center: 115, bottom: 160, rx: 28, ry: 40 },
    neck: { top: 158, bottom: 215, width: 20, left: 190, right: 210 },
    shoulders: { y: 224, left: 144, right: 256, span: 112 },
    bust: { y: 270, left: 142, right: 258, width: 116 },
    waist: { y: 330, left: 164, right: 236, width: 72 },
    hips: { y: 395, left: 150, right: 250, width: 100 },
    crotch: { y: 426 },
    knees: { y: 540, leftX: 172, rightX: 228 },
    ankles: { y: 705, leftX: 174, rightX: 226, width: 18 },
    feet: { top: 712, bottom: 755, leftX: 170, rightX: 230 },
    wrists: { y: 435, leftX: 122, rightX: 278 }
  },
  homme: {
    viewBox: "0 0 400 800",
    center: 200,
    head: { top: 66, center: 114, bottom: 160, rx: 30, ry: 42 },
    neck: { top: 158, bottom: 215, width: 28, left: 186, right: 214 },
    shoulders: { y: 218, left: 124, right: 276, span: 152 },
    bust: { y: 260, left: 130, right: 270, width: 140 },
    waist: { y: 330, left: 152, right: 248, width: 96 },
    hips: { y: 395, left: 150, right: 250, width: 100 },
    crotch: { y: 424 },
    knees: { y: 540, leftX: 172, rightX: 228 },
    ankles: { y: 705, leftX: 172, rightX: 228, width: 22 },
    feet: { top: 712, bottom: 755, leftX: 166, rightX: 234 },
    wrists: { y: 435, leftX: 108, rightX: 292 }
  }
};

/**
 * Solid, clearly visible skin tone palette that stands out boldly from cream backgrounds
 */
export const SKIN_TONES = {
  fair: {
    name: "Fair",
    base: "#F0CEB9",
    shadow: "#DCA78E",
    contour: "#C48A70",
    underwear: "#DFD5CB",
    underwearSeam: "#BEB1A4"
  },
  warm: {
    name: "Warm",
    base: "#E2AE88",
    shadow: "#CA9168",
    contour: "#AD7349",
    underwear: "#D6CCC2",
    underwearSeam: "#B7A89B"
  },
  sand: {
    name: "Sand",
    base: "#CE9366",
    shadow: "#B2784D",
    contour: "#965D32",
    underwear: "#D0C5BA",
    underwearSeam: "#B0A193"
  },
  caramel: {
    name: "Caramel",
    base: "#A5683C",
    shadow: "#894F25",
    contour: "#6D3712",
    underwear: "#C9BEB2",
    underwearSeam: "#A79788"
  },
  deep: {
    name: "Deep",
    base: "#5F3620",
    shadow: "#462310",
    contour: "#2E1407",
    underwear: "#C2B6AA",
    underwearSeam: "#9E9081"
  }
};

/**
 * Returns reusable SVG pattern definitions
 */
export function getSvgPatternDefs(prefix = "pat") {
  return `
    <defs>
      <!-- 1. Tailor Stripes -->
      <pattern id="${prefix}_stripes" width="16" height="16" patternUnits="userSpaceOnUse">
        <line x1="0" y1="0" x2="0" y2="16" stroke="rgba(255,255,255,0.48)" stroke-width="2.2" />
        <line x1="8" y1="0" x2="8" y2="16" stroke="rgba(0,0,0,0.22)" stroke-width="1.5" />
      </pattern>

      <!-- 2. Polka Dots -->
      <pattern id="${prefix}_dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="6" cy="6" r="2.8" fill="rgba(255,255,255,0.5)" />
        <circle cx="16" cy="16" r="2.8" fill="rgba(255,255,255,0.5)" />
        <circle cx="16" cy="6" r="1.6" fill="rgba(0,0,0,0.22)" />
        <circle cx="6" cy="16" r="1.6" fill="rgba(0,0,0,0.22)" />
      </pattern>

      <!-- 3. Windowpane Checks -->
      <pattern id="${prefix}_checks" width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="none" />
        <path d="M28 0 L0 0 0 28" fill="none" stroke="rgba(255,255,255,0.42)" stroke-width="2" />
        <path d="M14 0 L14 28 M0 14 L28 14" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="1.2" stroke-dasharray="2 2" />
      </pattern>

      <!-- 4. Micro Houndstooth -->
      <pattern id="${prefix}_houndstooth" width="16" height="16" patternUnits="userSpaceOnUse">
        <polygon points="0,0 8,0 4,8 0,8" fill="rgba(255,255,255,0.45)" />
        <polygon points="8,8 16,8 12,16 8,16" fill="rgba(255,255,255,0.45)" />
        <polygon points="8,0 12,0 16,8 8,8" fill="rgba(0,0,0,0.25)" />
        <polygon points="0,8 4,8 8,16 0,16" fill="rgba(0,0,0,0.25)" />
      </pattern>

      <!-- 5. Botanical Floral Sprigs -->
      <pattern id="${prefix}_floral" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M15,10 C13,6 17,6 15,10 C19,8 19,12 15,10 C17,14 13,14 15,10 C11,12 11,8 15,10 Z" fill="rgba(255,255,255,0.52)" />
        <circle cx="15" cy="10" r="2" fill="#F7DC6F" opacity="0.9" />
        <path d="M15,10 Q14,18 20,20" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1.2" />
      </pattern>
    </defs>
  `;
}

/**
 * Returns the fully drawn base mannequin body (Female or Male)
 * Clean continuous silhouette, neutral base layer undergarments, blank oval head
 */
export function getFittingMannequinBaseSvg(gender = "femme", skinToneKey = "warm") {
  const isFemme = gender === "femme";
  const tone = SKIN_TONES[skinToneKey] || SKIN_TONES.warm;

  if (isFemme) {
    return `
      <!-- FEMALE FASHION CROQUIS MANNEQUIN BASE (0 0 400 800) -->
      <g class="mannequin-base mannequin-femme" id="mannequin-base-body">
        <!-- Neck -->
        <path d="M190,158 L190,215 Q200,218 210,215 L210,158 Z" fill="${tone.shadow}" />
        <path d="M192,160 L192,213 Q200,216 208,213 L208,160 Z" fill="${tone.base}" />
        <path d="M174,217 Q187,221 200,217 Q213,221 226,217" stroke="${tone.contour}" stroke-width="1.4" fill="none" stroke-linecap="round" />

        <!-- Continuous Smooth Torso, Pelvis & Legs (No Lumps or Sharp Corners) -->
        <!-- Torso Body Silhouette -->
        <path d="M190,215 L144,224 C140,245 142,270 144,285 C146,305 158,320 164,330 C170,345 156,370 150,395 C146,415 150,432 154,435 L200,432 L246,435 C250,432 254,415 250,395 C244,370 230,345 236,330 C242,320 254,305 256,285 C258,270 260,245 256,224 L210,215 Z" fill="${tone.base}" />

        <!-- Left Leg: Natural Flow from Hip/Pelvis down to Ankle & Foot -->
        <g class="leg-left">
          <path d="M154,435 C158,475 162,510 166,540 C170,565 162,630 166,705 L182,705 C182,630 180,565 178,540 C178,510 186,470 200,426 L154,435 Z" fill="${tone.base}" />
          <!-- Knee & Calf Shading Contour -->
          <ellipse cx="172" cy="540" rx="6" ry="4" fill="${tone.shadow}" opacity="0.4" />
          <!-- Left Foot -->
          <path d="M166,705 L158,744 C156,754 168,758 178,756 C184,754 184,735 182,705 Z" fill="${tone.base}" />
        </g>

        <!-- Right Leg: Symmetrical Smooth Contour -->
        <g class="leg-right">
          <path d="M246,435 C242,475 238,510 234,540 C230,565 238,630 234,705 L218,705 C218,630 220,565 222,540 C222,510 214,470 200,426 L246,435 Z" fill="${tone.base}" />
          <!-- Knee & Calf Shading Contour -->
          <ellipse cx="228" cy="540" rx="6" ry="4" fill="${tone.shadow}" opacity="0.4" />
          <!-- Right Foot -->
          <path d="M234,705 L242,744 C244,754 232,758 222,756 C216,754 216,735 218,705 Z" fill="${tone.base}" />
        </g>

        <!-- Relaxed Arms Along Torso -->
        <g class="arm-left">
          <path d="M144,224 L132,330 L122,435 L129,435 L140,332 L150,230 Z" fill="${tone.base}" />
          <path d="M122,435 Q118,452 119,472 Q122,478 126,475 Q129,462 129,435 Z" fill="${tone.base}" />
        </g>
        <g class="arm-right">
          <path d="M256,224 L268,330 L278,435 L271,435 L260,332 L250,230 Z" fill="${tone.base}" />
          <path d="M278,435 Q282,452 281,472 Q278,478 274,475 Q271,462 271,435 Z" fill="${tone.base}" />
        </g>

        <!-- Neutral Base Layer: Studio Fitted Tank Top & Short Briefs (Always Visible Under Garments) -->
        <g class="neutral-base-layer">
          <!-- Fitted Tank Top -->
          <path d="M156,236 C168,248 184,254 200,254 C216,254 232,248 244,236 L248,255 C244,290 238,328 236,338 L164,338 C162,328 156,290 152,255 Z" fill="${tone.underwear}" stroke="${tone.underwearSeam}" stroke-width="1.2" />
          <!-- Tank Straps -->
          <path d="M156,225 L164,225 L164,244 L156,236 Z" fill="${tone.underwear}" />
          <path d="M244,225 L236,225 L236,244 L244,236 Z" fill="${tone.underwear}" />
          <line x1="164" y1="338" x2="236" y2="338" stroke="${tone.underwearSeam}" stroke-width="1.8" />

          <!-- Fitted Short Briefs -->
          <path d="M162,342 L238,342 C248,375 250,405 248,426 L222,426 C214,410 206,420 200,420 C194,420 186,410 178,426 L152,426 C150,405 152,375 162,342 Z" fill="${tone.underwear}" stroke="${tone.underwearSeam}" stroke-width="1.2" />
          <line x1="162" y1="344" x2="238" y2="344" stroke="${tone.underwearSeam}" stroke-width="1.5" />
        </g>

        <!-- Hair Layer: Long Voluminous Auburn-Brown Curls -->
        <g class="hair-layer-female">
          <!-- Back Curl Mass Framing Head & Shoulders -->
          <ellipse cx="200" cy="115" rx="42" ry="52" fill="#2C160F" />
          <circle cx="160" cy="125" r="28" fill="#3D1E16" />
          <circle cx="240" cy="125" r="28" fill="#3D1E16" />
          <circle cx="152" cy="165" r="24" fill="#4E271D" />
          <circle cx="248" cy="165" r="24" fill="#4E271D" />
          <circle cx="156" cy="205" r="20" fill="#3D1E16" />
          <circle cx="244" cy="205" r="20" fill="#3D1E16" />
          <circle cx="162" cy="245" r="16" fill="#4E271D" />
          <circle cx="238" cy="245" r="16" fill="#4E271D" />
        </g>

        <!-- Blank Smooth Oval Head (Clean Fashion-Croquis Look, No Facial Features) -->
        <g class="head-group-croquis">
          <path d="M174,115 C174,78 185,68 200,68 C215,68 226,78 226,115 C226,145 215,162 200,162 C185,162 174,145 174,115 Z" fill="${tone.base}" stroke="${tone.contour}" stroke-width="1.2" />
        </g>
      </g>
    `;
  } else {
    return `
      <!-- MALE FASHION CROQUIS MANNEQUIN BASE (0 0 400 800) -->
      <g class="mannequin-base mannequin-homme" id="mannequin-base-body">
        <!-- Neck -->
        <path d="M186,158 L186,215 Q200,219 214,215 L214,158 Z" fill="${tone.shadow}" />
        <path d="M188,160 L188,213 Q200,217 212,213 L212,160 Z" fill="${tone.base}" />
        <path d="M168,217 Q184,221 200,217 Q216,221 232,217" stroke="${tone.contour}" stroke-width="1.5" fill="none" stroke-linecap="round" />

        <!-- Broad Athletic Torso (Shoulders 124..276) -->
        <path d="M186,215 L124,218 C120,240 126,270 130,285 C136,305 146,320 152,330 C154,350 148,375 150,395 C152,415 154,428 156,432 L200,430 L244,432 C246,428 248,415 250,395 C252,375 246,350 248,330 C254,320 264,305 270,285 C274,270 280,240 276,218 L214,215 Z" fill="${tone.base}" />

        <!-- Left Leg -->
        <g class="leg-left">
          <path d="M156,432 C160,475 164,510 168,540 C170,565 166,630 168,705 L186,705 C186,630 186,565 184,540 C184,510 190,470 200,424 L156,432 Z" fill="${tone.base}" />
          <ellipse cx="176" cy="540" rx="7" ry="4" fill="${tone.shadow}" opacity="0.4" />
          <path d="M168,705 L160,744 C158,754 170,758 182,756 C188,754 188,735 186,705 Z" fill="${tone.base}" />
        </g>

        <!-- Right Leg -->
        <g class="leg-right">
          <path d="M244,432 C240,475 236,510 232,540 C230,565 234,630 232,705 L214,705 C214,630 214,565 216,540 C216,510 210,470 200,424 L244,432 Z" fill="${tone.base}" />
          <ellipse cx="224" cy="540" rx="7" ry="4" fill="${tone.shadow}" opacity="0.4" />
          <path d="M232,705 L240,744 C242,754 230,758 218,756 C212,754 212,735 214,705 Z" fill="${tone.base}" />
        </g>

        <!-- Relaxed Athletic Arms -->
        <g class="arm-left">
          <path d="M124,218 L112,330 L104,435 L112,435 L124,332 L136,226 Z" fill="${tone.base}" />
          <path d="M104,435 Q100,452 102,472 Q105,478 110,475 Q112,462 112,435 Z" fill="${tone.base}" />
        </g>
        <g class="arm-right">
          <path d="M276,218 L288,330 L296,435 L288,435 L276,332 L264,226 Z" fill="${tone.base}" />
          <path d="M296,435 Q300,452 298,472 Q295,478 290,475 Q288,462 288,435 Z" fill="${tone.base}" />
        </g>

        <!-- Neutral Base Layer: Athletic Tank Top & Boxer Briefs -->
        <g class="neutral-base-layer">
          <path d="M140,230 C156,242 178,248 200,248 C222,248 244,242 260,230 L266,252 C262,290 252,328 248,338 L152,338 C148,328 138,290 134,252 Z" fill="${tone.underwear}" stroke="${tone.underwearSeam}" stroke-width="1.2" />
          <!-- Tank Straps -->
          <path d="M138,219 L148,220 L148,236 L138,230 Z" fill="${tone.underwear}" />
          <path d="M262,219 L252,220 L252,236 L262,230 Z" fill="${tone.underwear}" />

          <!-- Boxer Briefs -->
          <path d="M150,342 L250,342 C252,375 252,405 250,428 L222,428 C216,412 206,420 200,420 C194,420 184,412 178,428 L150,428 C148,405 148,375 150,342 Z" fill="${tone.underwear}" stroke="${tone.underwearSeam}" stroke-width="1.2" />
          <line x1="150" y1="344" x2="250" y2="344" stroke="${tone.underwearSeam}" stroke-width="1.6" />
        </g>

        <!-- Hair Layer: Short Tailored Dark-Brown Hair -->
        <g class="hair-layer-male">
          <path d="M166,110 C166,70 178,60 200,60 C222,60 234,70 234,110 C230,80 220,72 200,72 C180,72 170,80 166,110 Z" fill="#241712" />
        </g>

        <!-- Blank Smooth Oval Head (Clean Fashion-Croquis Look, No Facial Features) -->
        <g class="head-group-croquis">
          <path d="M172,112 C172,74 184,65 200,65 C216,65 228,74 228,112 C228,144 216,162 200,162 C184,162 172,144 172,112 Z" fill="${tone.base}" stroke="${tone.contour}" stroke-width="1.2" />
        </g>
      </g>
    `;
  }
}

/**
 * Renders a specific garment piece on the mannequin in the shared 0 0 400 800 viewBox
 * Strictly clips any patterns using clipPath so patterns never bleed onto backdrop or body
 */
export function getLayeredGarmentSvg(piece, gender = "femme", options = {}) {
  if (!piece) return "";
  const isFemme = gender === "femme";
  const slot = SLOT_TABLE[piece.pieceId] || piece.slot || "top";
  const hex = piece.colorHex || "#C2542B";
  const pat = piece.patternId || "plain";
  const style = piece.styleId || "classic";
  const tag = piece.embroideryText || "";
  const thread = piece.threadColorHex || "#FFFDF6";
  const patPrefix = options.patternPrefix || "pat";
  const uniqueId = "clip_" + piece.pieceId + "_" + (isFemme ? "f" : "m") + "_" + Math.floor(Math.random() * 10000);

  let pieceSvg = "";

  // 1. HEAD (bonnet, casquette)
  if (slot === "head") {
    if (piece.pieceId === "bonnet") {
      const topY = isFemme ? 50 : 48;
      const cuffY = isFemme ? 94 : 92;
      const cuffH = 18;
      const pompom = style === "pompom" ? `<circle cx="200" cy="${topY - 10}" r="14" fill="${hex}" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />` : "";
      const pathD = `M154,${cuffY + cuffH} L154,${cuffY} C150,${topY} 250,${topY} 246,${cuffY} L246,${cuffY + cuffH} Z`;

      pieceSvg = `
        <g class="garment-layer-bonnet">
          <defs>
            <clipPath id="${uniqueId}"><path d="${pathD}" /></clipPath>
          </defs>
          ${pompom}
          <!-- Crown Dome -->
          <path d="M154,${cuffY} C150,${topY} 250,${topY} 246,${cuffY} Z" fill="${hex}" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- Ribbed Folded Cuff -->
          <rect x="150" y="${cuffY}" width="100" height="${cuffH}" rx="4" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          <!-- Woven Atelier Label on Cuff -->
          <rect x="186" y="${cuffY + 3}" width="28" height="12" rx="2" fill="#FAF7F2" stroke="#D96B43" stroke-width="0.8" />
          <text x="200" y="${cuffY + 11.5}" font-family="'Poppins', sans-serif" font-size="6" font-weight="700" fill="${thread}" text-anchor="middle">${tag || "ATELIER"}</text>
        </g>
      `;
    } else {
      // Casquette
      const baseY = isFemme ? 82 : 80;
      const pathD = `M152,${baseY + 14} C152,${baseY - 26} 248,${baseY - 26} 248,${baseY + 14} Z`;
      pieceSvg = `
        <g class="garment-layer-casquette">
          <defs>
            <clipPath id="${uniqueId}"><path d="${pathD}" /></clipPath>
          </defs>
          <path d="${pathD}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- Visor -->
          <path d="M148,${baseY + 12} Q200,${baseY + 28} 252,${baseY + 12} Q200,${baseY + 16} 148,${baseY + 12} Z" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5" />
          ${tag ? `<text x="200" y="${baseY + 4}" font-family="'Poppins', sans-serif" font-size="6.5" font-weight="700" fill="${thread}" text-anchor="middle">${tag}</text>` : ""}
        </g>
      `;
    }
  }

  // 2. NECK (écharpe)
  else if (slot === "neck") {
    const wrapY = isFemme ? 188 : 185;
    const pathD = `M170,${wrapY} C170,${wrapY - 14} 230,${wrapY - 14} 230,${wrapY} L234,${wrapY + 36} C220,${wrapY + 44} 180,${wrapY + 44} 166,${wrapY + 36} Z M174,${wrapY + 36} L174,${wrapY + 130} L206,${wrapY + 130} L206,${wrapY + 36} Z`;
    pieceSvg = `
      <g class="garment-layer-echarpe">
        <defs>
          <clipPath id="${uniqueId}"><path d="${pathD}" /></clipPath>
        </defs>
        <!-- Neck Wrap -->
        <path d="M170,${wrapY} C170,${wrapY - 14} 230,${wrapY - 14} 230,${wrapY} L234,${wrapY + 36} C220,${wrapY + 44} 180,${wrapY + 44} 166,${wrapY + 36} Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
        <!-- Draping Tail -->
        <path d="M174,${wrapY + 36} L174,${wrapY + 130} L206,${wrapY + 130} L206,${wrapY + 36} Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
        ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
        <!-- Fringe Tassels -->
        <line x1="176" y1="${wrapY + 130}" x2="176" y2="${wrapY + 138}" stroke="${hex}" stroke-width="2" />
        <line x1="184" y1="${wrapY + 130}" x2="184" y2="${wrapY + 138}" stroke="${hex}" stroke-width="2" />
        <line x1="192" y1="${wrapY + 130}" x2="192" y2="${wrapY + 138}" stroke="${hex}" stroke-width="2" />
        <line x1="200" y1="${wrapY + 130}" x2="200" y2="${wrapY + 138}" stroke="${hex}" stroke-width="2" />
      </g>
    `;
  }

  // 3. TOP (chemise, pull, tshirt, hoodie, debardeur)
  else if (slot === "top") {
    if (piece.pieceId === "chemise") {
      // Bespoke Shirt: covers hips down to upper thigh (Y=450), sleeves along arms to wrists (Y=435)
      const shL = isFemme ? 144 : 124;
      const shR = isFemme ? 256 : 276;
      const shY = isFemme ? 224 : 218;
      const hemY = isFemme ? 440 : 450;
      const wrL = isFemme ? 122 : 108;
      const wrR = isFemme ? 278 : 292;
      const sideL = isFemme ? 152 : 144;
      const sideR = isFemme ? 248 : 256;

      const pathBody = `M184,${shY - 6} L${shL},${shY} L${sideL},${hemY} Q200,${hemY + 10} ${sideR},${hemY} L${shR},${shY} L216,${shY - 6} Z`;
      const pathSleeves = `M${shL},${shY} L${wrL},435 L${wrL + 14},435 L${shL + 16},${shY + 40} Z M${shR},${shY} L${wrR},435 L${wrR - 14},435 L${shR - 16},${shY + 40} Z`;
      const fullPath = `${pathBody} ${pathSleeves}`;

      pieceSvg = `
        <g class="garment-layer-chemise">
          <defs>
            <clipPath id="${uniqueId}"><path d="${fullPath}" /></clipPath>
          </defs>
          <!-- Sleeves to Wrists -->
          <path d="M${shL},${shY} L${wrL},435 L${wrL + 14},435 L${shL + 16},${shY + 40} Z" fill="${hex}" stroke="rgba(0,0,0,0.18)" stroke-width="1.2" />
          <path d="M${shR},${shY} L${wrR},435 L${wrR - 14},435 L${shR - 16},${shY + 40} Z" fill="${hex}" stroke="rgba(0,0,0,0.18)" stroke-width="1.2" />
          <!-- Cuffs at Wrists -->
          <rect x="${wrL - 1}" y="425" width="16" height="12" rx="1" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
          <rect x="${wrR - 15}" y="425" width="16" height="12" rx="1" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
          <!-- Shirt Body Covering Hips to Upper Thigh -->
          <path d="${pathBody}" fill="${hex}" stroke="rgba(0,0,0,0.22)" stroke-width="1.4" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- Center Button Placket -->
          <line x1="200" y1="${shY + 8}" x2="200" y2="${hemY}" stroke="rgba(0,0,0,0.25)" stroke-width="6" />
          <line x1="200" y1="${shY + 8}" x2="200" y2="${hemY}" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" />
          <!-- Pearl Buttons -->
          <circle cx="200" cy="${shY + 35}" r="2" fill="#FAF7F2" stroke="rgba(0,0,0,0.3)" stroke-width="0.5" />
          <circle cx="200" cy="${shY + 75}" r="2" fill="#FAF7F2" stroke="rgba(0,0,0,0.3)" stroke-width="0.5" />
          <circle cx="200" cy="${shY + 115}" r="2" fill="#FAF7F2" stroke="rgba(0,0,0,0.3)" stroke-width="0.5" />
          <circle cx="200" cy="${shY + 155}" r="2" fill="#FAF7F2" stroke="rgba(0,0,0,0.3)" stroke-width="0.5" />
          <circle cx="200" cy="${shY + 195}" r="2" fill="#FAF7F2" stroke="rgba(0,0,0,0.3)" stroke-width="0.5" />
          <!-- Tailored Collar -->
          <polygon points="186,${shY - 8} 200,${shY + 8} 214,${shY - 8} 226,${shY + 12} 200,${shY + 16} 174,${shY + 12}" fill="${hex}" stroke="rgba(0,0,0,0.35)" stroke-width="1.5" />
          <!-- Chest Pocket with Embroidery Tag -->
          <rect x="${isFemme ? 162 : 155}" y="${shY + 45}" width="24" height="26" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1" />
          ${tag ? `<text x="${isFemme ? 174 : 167}" y="${shY + 61}" font-family="'Poppins', sans-serif" font-size="6" font-weight="700" fill="${thread}" text-anchor="middle">${tag}</text>` : ""}
        </g>
      `;
    } else if (piece.pieceId === "pull") {
      // Knit Sweater: Cozy textured knit, ribbed collar, wrist cuffs, hem at hips
      const shL = isFemme ? 144 : 124;
      const shR = isFemme ? 256 : 276;
      const shY = isFemme ? 224 : 218;
      const hemY = isFemme ? 415 : 425;
      const wrL = isFemme ? 122 : 108;
      const wrR = isFemme ? 278 : 292;
      const pathFull = `M180,${shY - 4} L${shL},${shY} L${wrL},435 L${wrL + 16},435 L${shL + 18},${shY + 45} L${isFemme ? 154 : 146},${hemY} L${isFemme ? 246 : 254},${hemY} L${shR - 18},${shY + 45} L${wrR - 16},435 L${wrR},435 L${shR},${shY} L220,${shY - 4} Z`;

      pieceSvg = `
        <g class="garment-layer-pull">
          <defs>
            <clipPath id="${uniqueId}"><path d="${pathFull}" /></clipPath>
          </defs>
          <path d="${pathFull}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- Ribbed Collar -->
          <path d="M182,${shY} Q200,${shY + 16} 218,${shY}" stroke="rgba(0,0,0,0.3)" stroke-width="4" fill="none" />
          <!-- Ribbed Waistband -->
          <rect x="${isFemme ? 154 : 146}" y="${hemY - 14}" width="${isFemme ? 92 : 108}" height="14" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
          <!-- Ribbed Cuffs -->
          <rect x="${wrL - 1}" y="423" width="16" height="12" rx="1" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
          <rect x="${wrR - 15}" y="423" width="16" height="12" rx="1" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1" />
          ${tag ? `<text x="200" y="${shY + 50}" font-family="'Poppins', sans-serif" font-size="7" font-weight="700" fill="${thread}" text-anchor="middle">${tag}</text>` : ""}
        </g>
      `;
    } else if (piece.pieceId === "tshirt") {
      const shL = isFemme ? 144 : 124;
      const shR = isFemme ? 256 : 276;
      const shY = isFemme ? 224 : 218;
      const hemY = isFemme ? 395 : 405;
      const slL = isFemme ? 128 : 106;
      const slR = isFemme ? 272 : 294;
      const pathFull = `M182,${shY - 4} L${shL},${shY} L${slL},295 L${slL + 18},295 L${shL + 16},${shY + 38} L${isFemme ? 156 : 148},${hemY} L${isFemme ? 244 : 252},${hemY} L${shR - 16},${shY + 38} L${slR - 18},295 L${slR},295 L${shR},${shY} L218,${shY - 4} Z`;

      pieceSvg = `
        <g class="garment-layer-tshirt">
          <defs>
            <clipPath id="${uniqueId}"><path d="${pathFull}" /></clipPath>
          </defs>
          <path d="${pathFull}" fill="${hex}" stroke="rgba(0,0,0,0.22)" stroke-width="1.4" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <path d="M182,${shY} Q200,${shY + 14} 218,${shY}" stroke="rgba(0,0,0,0.3)" stroke-width="3.5" fill="none" />
          ${tag ? `<text x="200" y="${shY + 50}" font-family="'Poppins', sans-serif" font-size="7" font-weight="700" fill="${thread}" text-anchor="middle">${tag}</text>` : ""}
        </g>
      `;
    } else if (piece.pieceId === "hoodie") {
      const shL = isFemme ? 142 : 122;
      const shR = isFemme ? 258 : 278;
      const shY = isFemme ? 222 : 216;
      const hemY = isFemme ? 420 : 430;
      const wrL = isFemme ? 122 : 108;
      const wrR = isFemme ? 278 : 292;
      const pathFull = `M176,${shY - 8} L${shL},${shY} L${wrL},435 L${wrL + 16},435 L${shL + 18},${shY + 45} L${isFemme ? 152 : 144},${hemY} L${isFemme ? 248 : 256},${hemY} L${shR - 18},${shY + 45} L${wrR - 16},435 L${wrR},435 L${shR},${shY} L224,${shY - 8} Z`;

      pieceSvg = `
        <g class="garment-layer-hoodie">
          <defs>
            <clipPath id="${uniqueId}"><path d="${pathFull}" /></clipPath>
          </defs>
          <path d="${pathFull}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- Kangaroo Pouch Pocket -->
          <path d="M170,${hemY - 55} L230,${hemY - 55} L238,${hemY - 14} L162,${hemY - 14} Z" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5" />
          <!-- Drawstring Cords -->
          <line x1="192" y1="${shY + 10}" x2="190" y2="${shY + 55}" stroke="#FAF7F2" stroke-width="2" />
          <line x1="208" y1="${shY + 10}" x2="210" y2="${shY + 55}" stroke="#FAF7F2" stroke-width="2" />
          <!-- Hood Collar -->
          <path d="M174,${shY} C168,${shY - 30} 232,${shY - 30} 226,${shY} Z" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.5" />
          ${tag ? `<text x="200" y="${hemY - 30}" font-family="'Poppins', sans-serif" font-size="7" font-weight="700" fill="${thread}" text-anchor="middle">${tag}</text>` : ""}
        </g>
      `;
    } else {
      // Default top fallback
      const shL = isFemme ? 144 : 124;
      const shR = isFemme ? 256 : 276;
      const shY = isFemme ? 224 : 218;
      const hemY = isFemme ? 395 : 405;
      const pathFull = `M180,${shY} L${shL},${shY} L${isFemme ? 156 : 148},${hemY} L${isFemme ? 244 : 252},${hemY} L${shR},${shY} L220,${shY} Z`;

      pieceSvg = `
        <g class="garment-layer-top-generic">
          <defs><clipPath id="${uniqueId}"><path d="${pathFull}" /></clipPath></defs>
          <path d="${pathFull}" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
        </g>
      `;
    }
  }

  // 4. ONEPIECE (robe, costume)
  else if (slot === "onepiece") {
    if (piece.pieceId === "robe") {
      // Atelier Dress (Robe): Skirt starts EXACTLY at waist seam (Y=330) with NO floating belt, flows over hips to midi hem (Y=560)
      const shL = 144;
      const shR = 256;
      const shY = 224;
      const waistY = 330;
      const hemY = 560;

      const pathBodice = `M176,${shY + 8} L${shL},${shY} L142,265 L164,${waistY} L236,${waistY} L258,265 L${shR},${shY} L224,${shY + 8} Z`;
      const pathSkirt = `M164,${waistY} C156,365 146,415 138,470 L128,${hemY} Q200,${hemY + 12} 272,${hemY} L262,470 C254,415 244,365 236,${waistY} Z`;
      const fullRobePath = `${pathBodice} ${pathSkirt}`;

      pieceSvg = `
        <g class="garment-layer-robe">
          <defs>
            <clipPath id="${uniqueId}"><path d="${fullRobePath}" /></clipPath>
          </defs>
          <!-- Bodice & Flared Midi Skirt -->
          <path d="${pathBodice}" fill="${hex}" stroke="rgba(0,0,0,0.22)" stroke-width="1.4" />
          <path d="${pathSkirt}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- Natural Tailored Waistline Seam (Integrated, No Floating Belt) -->
          <line x1="164" y1="${waistY}" x2="236" y2="${waistY}" stroke="rgba(0,0,0,0.35)" stroke-width="2.5" />
          <line x1="164" y1="${waistY + 1}" x2="236" y2="${waistY + 1}" stroke="rgba(255,255,255,0.3)" stroke-width="1" />
          <!-- Elegant Neckline -->
          <path d="M176,${shY + 8} Q200,${shY + 22} 224,${shY + 8}" stroke="rgba(0,0,0,0.3)" stroke-width="2.5" fill="none" />
          <!-- Hem Detail -->
          <path d="M128,${hemY} Q200,${hemY + 12} 272,${hemY}" stroke="rgba(0,0,0,0.3)" stroke-width="2" fill="none" />
          <!-- Atelier Monogram Tag on Chest -->
          <rect x="186" y="${shY + 36}" width="28" height="12" rx="2" fill="#FAF7F2" stroke="#D96B43" stroke-width="0.8" />
          <text x="200" y="${shY + 44.5}" font-family="'Poppins', sans-serif" font-size="6" font-weight="700" fill="${thread}" text-anchor="middle">${tag || "MARIEM"}</text>
        </g>
      `;
    } else {
      // Costume (Tailored 2-piece Suit)
      const shL = isFemme ? 144 : 124;
      const shR = isFemme ? 256 : 276;
      const shY = isFemme ? 224 : 218;
      const hemY = isFemme ? 435 : 445;
      const pathTrousers = `M${isFemme ? 164 : 152},330 L${isFemme ? 154 : 148},425 L${isFemme ? 168 : 166},705 L${isFemme ? 186 : 188},705 L200,425 L${isFemme ? 214 : 212},705 L${isFemme ? 232 : 234},705 L${isFemme ? 246 : 252},425 L${isFemme ? 236 : 248},330 Z`;
      const pathJacket = `M182,${shY} L${shL},${shY} L${isFemme ? 148 : 140},${hemY} L${isFemme ? 252 : 260},${hemY} L${shR},${shY} L218,${shY} Z`;
      const fullPath = `${pathTrousers} ${pathJacket}`;

      pieceSvg = `
        <g class="garment-layer-costume">
          <defs><clipPath id="${uniqueId}"><path d="${fullPath}" /></clipPath></defs>
          <path d="${pathTrousers}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          <path d="${pathJacket}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- Lapels -->
          <polygon points="184,${shY} 200,${shY + 70} 168,${shY + 40}" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.2" />
          <polygon points="216,${shY} 200,${shY + 70} 232,${shY + 40}" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.2" />
        </g>
      `;
    }
  }

  // 5. BOTTOM (pantalon, jean, short, jupe)
  else if (slot === "bottom") {
    if (piece.pieceId === "pantalon") {
      const wL = isFemme ? 164 : 152;
      const wR = isFemme ? 236 : 248;
      const wY = 330;
      const pathPants = `M${wL},${wY} L${isFemme ? 152 : 148},395 L${isFemme ? 156 : 154},435 L${isFemme ? 168 : 166},705 L${isFemme ? 186 : 188},705 L200,426 L${isFemme ? 214 : 212},705 L${isFemme ? 232 : 234},705 L${isFemme ? 244 : 246},435 L${isFemme ? 248 : 252},395 L${wR},${wY} Z`;

      pieceSvg = `
        <g class="garment-layer-pantalon">
          <defs><clipPath id="${uniqueId}"><path d="${pathPants}" /></clipPath></defs>
          <path d="${pathPants}" fill="${hex}" stroke="rgba(0,0,0,0.28)" stroke-width="1.5" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- Crease Lines -->
          <line x1="${isFemme ? 176 : 176}" y1="${wY + 40}" x2="${isFemme ? 177 : 177}" y2="702" stroke="rgba(255,255,255,0.22)" stroke-width="1.2" />
          <line x1="${isFemme ? 224 : 224}" y1="${wY + 40}" x2="${isFemme ? 223 : 223}" y2="702" stroke="rgba(255,255,255,0.22)" stroke-width="1.2" />
          <!-- Waistband -->
          <rect x="${wL}" y="${wY}" width="${wR - wL}" height="14" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.2" />
        </g>
      `;
    } else if (piece.pieceId === "jean") {
      const wL = isFemme ? 164 : 152;
      const wR = isFemme ? 236 : 248;
      const wY = 330;
      const pathJeans = `M${wL},${wY} L${isFemme ? 152 : 148},395 L${isFemme ? 156 : 154},435 L${isFemme ? 168 : 166},705 L${isFemme ? 186 : 188},705 L200,426 L${isFemme ? 214 : 212},705 L${isFemme ? 232 : 234},705 L${isFemme ? 244 : 246},435 L${isFemme ? 248 : 252},395 L${wR},${wY} Z`;

      pieceSvg = `
        <g class="garment-layer-jean">
          <defs><clipPath id="${uniqueId}"><path d="${pathJeans}" /></clipPath></defs>
          <path d="${pathJeans}" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.6" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- Copper Rivet & Waistband -->
          <rect x="${wL}" y="${wY}" width="${wR - wL}" height="15" fill="${hex}" stroke="rgba(0,0,0,0.35)" stroke-width="1.4" />
          <circle cx="200" cy="${wY + 8}" r="2.5" fill="#CD7F32" stroke="rgba(0,0,0,0.4)" stroke-width="0.8" />
          <!-- Topstitching -->
          <line x1="${wL + 1}" y1="${wY + 12}" x2="${wR - 1}" y2="${wY + 12}" stroke="#D4A373" stroke-width="1" stroke-dasharray="3 2" />
        </g>
      `;
    } else if (piece.pieceId === "short") {
      const wL = isFemme ? 164 : 152;
      const wR = isFemme ? 236 : 248;
      const wY = 330;
      const hemY = 535;
      const pathShorts = `M${wL},${wY} L${isFemme ? 152 : 148},395 L${isFemme ? 158 : 154},${hemY} L${isFemme ? 190 : 188},${hemY} L200,426 L${isFemme ? 210 : 212},${hemY} L${isFemme ? 242 : 246},${hemY} L${isFemme ? 248 : 252},395 L${wR},${wY} Z`;

      pieceSvg = `
        <g class="garment-layer-short">
          <defs><clipPath id="${uniqueId}"><path d="${pathShorts}" /></clipPath></defs>
          <path d="${pathShorts}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <rect x="${wL}" y="${wY}" width="${wR - wL}" height="14" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.2" />
        </g>
      `;
    } else if (piece.pieceId === "jupe") {
      const wL = 164;
      const wR = 236;
      const wY = 330;
      const hemY = 550;
      const pathSkirt = `M${wL},${wY} C154,375 144,430 134,${hemY} Q200,${hemY + 10} 266,${hemY} C256,430 246,375 ${wR},${wY} Z`;

      pieceSvg = `
        <g class="garment-layer-jupe">
          <defs><clipPath id="${uniqueId}"><path d="${pathSkirt}" /></clipPath></defs>
          <path d="${pathSkirt}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
          <!-- High Waistband -->
          <rect x="${wL}" y="${wY}" width="${wR - wL}" height="14" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.2" />
        </g>
      `;
    }
  }

  // 6. OUTERWEAR (veste, manteau, cardigan)
  else if (slot === "outerwear") {
    const shL = isFemme ? 142 : 122;
    const shR = isFemme ? 258 : 278;
    const shY = isFemme ? 222 : 216;
    const isManteau = piece.pieceId === "manteau";
    const hemY = isManteau ? 610 : 445;
    const wrL = isFemme ? 120 : 106;
    const wrR = isFemme ? 280 : 294;

    const pathJacket = `M180,${shY - 6} L${shL},${shY} L${wrL},435 L${wrL + 16},435 L${shL + 20},${shY + 45} L${isFemme ? 146 : 138},${hemY} L${isFemme ? 254 : 262},${hemY} L${shR - 20},${shY + 45} L${wrR - 16},435 L${wrR},435 L${shR},${shY} L220,${shY - 6} Z`;

    pieceSvg = `
      <g class="garment-layer-outerwear">
        <defs><clipPath id="${uniqueId}"><path d="${pathJacket}" /></clipPath></defs>
        <path d="${pathJacket}" fill="${hex}" stroke="rgba(0,0,0,0.3)" stroke-width="1.6" />
        ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
        <!-- Open Front Lapels -->
        <polygon points="182,${shY} 190,${shY + 80} 160,${shY + 50}" fill="${hex}" stroke="rgba(0,0,0,0.35)" stroke-width="1.2" />
        <polygon points="218,${shY} 210,${shY + 80} 240,${shY + 50}" fill="${hex}" stroke="rgba(0,0,0,0.35)" stroke-width="1.2" />
      </g>
    `;
  }

  // 7. FEET (chaussettes, chaussures)
  else if (slot === "feet") {
    const leftFoot = isFemme
      ? `M166,665 L182,665 L182,705 L182,754 C176,756 166,754 158,744 L166,705 Z`
      : `M168,665 L186,665 L186,705 L186,754 C178,756 168,754 160,744 L168,705 Z`;
    const rightFoot = isFemme
      ? `M218,665 L234,665 L234,705 L242,744 C234,754 224,756 218,754 L218,705 Z`
      : `M214,665 L232,665 L232,705 L240,744 C232,754 222,756 214,754 L214,705 Z`;
    const fullFeet = `${leftFoot} ${rightFoot}`;

    pieceSvg = `
      <g class="garment-layer-feet">
        <defs><clipPath id="${uniqueId}"><path d="${fullFeet}" /></clipPath></defs>
        <path d="${leftFoot}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
        <path d="${rightFoot}" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
        ${pat !== "plain" ? `<rect x="0" y="0" width="400" height="800" fill="url(#${patPrefix}_${pat})" clip-path="url(#${uniqueId})" opacity="0.65" />` : ""}
        <!-- Ribbed Cuff Top -->
        <line x1="${isFemme ? 166 : 168}" y1="670" x2="${isFemme ? 182 : 186}" y2="670" stroke="rgba(0,0,0,0.3)" stroke-width="2" />
        <line x1="${isFemme ? 218 : 214}" y1="670" x2="${isFemme ? 234 : 232}" y2="670" stroke="rgba(0,0,0,0.3)" stroke-width="2" />
      </g>
    `;
  }

  return pieceSvg;
}

/**
 * Standalone garment card with hanger for celebration & wardrobe
 */
export function getStandaloneGarmentSvg(piece, options = {}) {
  const { width = 200, height = 240, showHanger = true } = options;
  if (!piece) return "";

  const hex = piece.colorHex || "#C2542B";
  const pat = piece.patternId || "plain";
  const patPrefix = "thumb_" + piece.pieceId;
  const patternDefs = getSvgPatternDefs(patPrefix);

  const hangerSvg = showHanger ? `
    <g class="hanger-group">
      <path d="M100,28 C100,16 112,16 112,24 C112,32 100,34 100,42" fill="none" stroke="#D4A373" stroke-width="3" stroke-linecap="round" />
      <polygon points="100,42 35,76 165,76" fill="none" stroke="#8D5B28" stroke-width="4" stroke-linejoin="round" />
      <line x1="42" y1="74" x2="158" y2="74" stroke="#8D5B28" stroke-width="3" stroke-linecap="round" />
    </g>
  ` : "";

  return `
    <svg viewBox="0 0 200 240" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" class="standalone-garment-svg">
      ${patternDefs}
      ${hangerSvg}
      <g transform="translate(0, 18) scale(0.5) translate(-100, -180)">
        ${getLayeredGarmentSvg(piece, piece.gender === "homme" ? "homme" : "femme", { patternPrefix: patPrefix })}
      </g>
    </svg>
  `;
}
