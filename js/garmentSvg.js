// ==========================================================================
// Atelier Mariem - Garment SVG Engine & Mannequin Renderer
// Layered SVGs colored through CSS variables & dynamic fills with shading overlays
// Distinct silhouettes for all 16 garment types & seamless SVG pattern fills
// ==========================================================================

/**
 * Returns reusable SVG pattern definitions for plain, stripes, dots, checks, houndstooth, floral
 */
export function getSvgPatternDefs(prefix = "pat") {
  return `
    <defs>
      <!-- Subtle Fabric Weave Texture -->
      <filter id="${prefix}_fabric_grain" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise" />
        <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.07 0" />
        <feComposite in2="SourceGraphic" in="glare" operator="in" />
      </filter>

      <!-- 1. Tailor Stripes -->
      <pattern id="${prefix}_stripes" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
        <line x1="0" y1="0" x2="0" y2="16" stroke="rgba(255,255,255,0.32)" stroke-width="2" />
        <line x1="8" y1="0" x2="8" y2="16" stroke="rgba(0,0,0,0.14)" stroke-width="1.5" />
      </pattern>

      <!-- 2. Polka Dots -->
      <pattern id="${prefix}_dots" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="2.4" fill="rgba(255,255,255,0.4)" />
        <circle cx="15" cy="15" r="2.4" fill="rgba(255,255,255,0.4)" />
        <circle cx="15" cy="5" r="1.5" fill="rgba(0,0,0,0.15)" />
        <circle cx="5" cy="15" r="1.5" fill="rgba(0,0,0,0.15)" />
      </pattern>

      <!-- 3. Windowpane Checks -->
      <pattern id="${prefix}_checks" width="28" height="28" patternUnits="userSpaceOnUse">
        <rect width="28" height="28" fill="none" />
        <path d="M28 0 L0 0 0 28" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.8" />
        <path d="M14 0 L14 28 M0 14 L28 14" fill="none" stroke="rgba(0,0,0,0.16)" stroke-width="1" stroke-dasharray="2 2" />
      </pattern>

      <!-- 4. Micro Houndstooth -->
      <pattern id="${prefix}_houndstooth" width="16" height="16" patternUnits="userSpaceOnUse">
        <polygon points="0,0 8,0 4,8 0,8" fill="rgba(255,255,255,0.35)" />
        <polygon points="8,8 16,8 12,16 8,16" fill="rgba(255,255,255,0.35)" />
        <polygon points="8,0 12,0 16,8 8,8" fill="rgba(0,0,0,0.18)" />
        <polygon points="0,8 4,8 8,16 0,16" fill="rgba(0,0,0,0.18)" />
      </pattern>

      <!-- 5. Botanical Floral Sprigs -->
      <pattern id="${prefix}_floral" width="30" height="30" patternUnits="userSpaceOnUse">
        <path d="M15,10 C13,6 17,6 15,10 C19,8 19,12 15,10 C17,14 13,14 15,10 C11,12 11,8 15,10 Z" fill="rgba(255,255,255,0.45)" />
        <circle cx="15" cy="10" r="1.8" fill="#F7DC6F" opacity="0.8" />
        <path d="M15,10 Q14,18 20,20" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="1" />
        <ellipse cx="18" cy="15" rx="2" ry="1" transform="rotate(30 18 15)" fill="rgba(255,255,255,0.3)" />
      </pattern>
    </defs>
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
          <!-- Torso & Arms -->
          <path d="M48,32 L20,95 L44,102 L56,62 L56,170 Q100,180 144,170 L144,62 L156,102 L180,95 L152,32 Q100,42 48,32 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Shading folds -->
          <path d="M56,62 L56,170 M144,62 L144,170" stroke="rgba(0,0,0,0.12)" stroke-width="2" />
          <path d="M100,42 L100,175" stroke="rgba(0,0,0,0.15)" stroke-width="1.8" />
          <!-- Placket & Buttons -->
          <line x1="97" y1="42" x2="97" y2="175" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
          <circle cx="100" cy="65" r="2.2" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <circle cx="100" cy="95" r="2.2" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <circle cx="100" cy="125" r="2.2" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <circle cx="100" cy="155" r="2.2" fill="#FFFDF6" stroke="#C8B898" stroke-width="0.8" />
          <!-- Collar Points -->
          <polygon points="100,45 80,32 75,54 100,45" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
          <polygon points="100,45 120,32 125,54 100,45" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
          <!-- Chest Pocket -->
          <rect x="68" y="75" width="22" height="24" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.18)" stroke-width="1.2" />
        </g>
      `;
      break;

    case "pull":
      garmentPath = `
        <g class="garment-pull">
          <!-- Chunky Knit Body -->
          <path d="M42,32 L15,105 L40,112 L54,65 L54,172 Q100,178 146,172 L146,65 L160,112 L185,105 L158,32 Q100,45 42,32 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Knit Ribbed Hems & Cuffs -->
          <rect x="54" y="162" width="92" height="10" fill="rgba(0,0,0,0.15)" />
          <rect x="18" y="103" width="22" height="8" fill="rgba(0,0,0,0.15)" transform="rotate(-15 28 107)" />
          <rect x="160" y="103" width="22" height="8" fill="rgba(0,0,0,0.15)" transform="rotate(15 172 107)" />
          <!-- Ribbed Collar -->
          <ellipse cx="100" cy="38" rx="28" ry="10" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="4" />
          <ellipse cx="100" cy="38" rx="26" ry="8" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
          <!-- Soft Fold Lines -->
          <path d="M75,65 Q85,115 80,162 M125,65 Q115,115 120,162" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="3" stroke-linecap="round" />
        </g>
      `;
      break;

    case "tshirt":
      garmentPath = `
        <g class="garment-tshirt">
          <path d="M45,34 L18,80 L42,88 L58,58 L58,165 Q100,170 142,165 L142,58 L158,88 L182,80 L155,34 Q100,48 45,34 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Crew Collar -->
          <ellipse cx="100" cy="40" rx="24" ry="9" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="3.5" />
          <path d="M58,158 Q100,163 142,158" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
        </g>
      `;
      break;

    case "hoodie":
      garmentPath = `
        <g class="garment-hoodie">
          <!-- Hood Droop at top -->
          <path d="M72,25 C72,6 128,6 128,25 C120,38 80,38 72,25 Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
          <!-- Body & Arms -->
          <path d="M42,32 L12,108 L38,116 L52,68 L52,174 Q100,180 148,174 L148,68 L162,116 L188,108 L158,32 Q100,45 42,32 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Kangaroo Pocket -->
          <path d="M70,118 L130,118 L138,155 L62,155 Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
          <!-- Pocket Openings -->
          <line x1="70" y1="118" x2="62" y2="155" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
          <line x1="130" y1="118" x2="138" y2="155" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
          <!-- Thick Hood Drawstrings -->
          <path d="M88,38 L86,85" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="86" cy="86" r="2.2" fill="#CCA02A" />
          <path d="M112,38 L114,85" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="114" cy="86" r="2.2" fill="#CCA02A" />
        </g>
      `;
      break;

    case "pantalon":
    case "jean":
      garmentPath = `
        <g class="garment-trousers">
          <!-- Waistband & Belt Loops -->
          <rect x="55" y="30" width="90" height="14" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
          <rect x="70" y="29" width="4" height="16" fill="rgba(0,0,0,0.2)" />
          <rect x="98" y="29" width="4" height="16" fill="rgba(0,0,0,0.2)" />
          <rect x="126" y="29" width="4" height="16" fill="rgba(0,0,0,0.2)" />
          <!-- Trouser Legs -->
          <path d="M56,44 L48,185 L92,185 L98,90 L104,185 L148,185 L144,44 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Center Creases / Seams -->
          <line x1="72" y1="44" x2="70" y2="185" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
          <line x1="128" y1="44" x2="130" y2="185" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" />
          <line x1="100" y1="44" x2="100" y2="88" stroke="rgba(0,0,0,0.2)" stroke-width="1.8" />
        </g>
      `;
      break;

    case "short":
      garmentPath = `
        <g class="garment-short">
          <rect x="58" y="30" width="84" height="14" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <path d="M58,44 L50,118 L94,118 L99,75 L104,118 L148,118 L142,44 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Rolled Cuffs -->
          <rect x="49" y="112" width="46" height="7" fill="rgba(0,0,0,0.15)" />
          <rect x="103" y="112" width="46" height="7" fill="rgba(0,0,0,0.15)" />
        </g>
      `;
      break;

    case "jupe":
      garmentPath = `
        <g class="garment-jupe">
          <rect x="65" y="32" width="70" height="12" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <!-- Pleated / Flare Skirt Silhouette -->
          <path d="M66,44 L32,175 Q100,188 168,175 L134,44 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Pleats -->
          <line x1="80" y1="44" x2="55" y2="178" stroke="rgba(0,0,0,0.16)" stroke-width="1.5" />
          <line x1="93" y1="44" x2="85" y2="182" stroke="rgba(0,0,0,0.16)" stroke-width="1.5" />
          <line x1="107" y1="44" x2="115" y2="182" stroke="rgba(0,0,0,0.16)" stroke-width="1.5" />
          <line x1="120" y1="44" x2="145" y2="178" stroke="rgba(0,0,0,0.16)" stroke-width="1.5" />
        </g>
      `;
      break;

    case "robe":
      garmentPath = `
        <g class="garment-robe">
          <!-- Bodice & Straps/Sleeves -->
          <path d="M72,25 L76,60 L60,182 Q100,195 140,182 L124,60 L128,25 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Waist Sash / Belt -->
          <rect x="73" y="80" width="54" height="10" rx="2" fill="rgba(0,0,0,0.2)" />
          <circle cx="100" cy="85" r="3" fill="#E0B354" />
          <!-- Gentle folds -->
          <path d="M85,90 Q90,140 82,185 M115,90 Q110,140 118,185" fill="none" stroke="rgba(0,0,0,0.12)" stroke-width="2" />
        </g>
      `;
      break;

    case "costume":
      garmentPath = `
        <g class="garment-suit">
          <!-- Tailored Blazer Jacket -->
          <path d="M45,30 L16,98 L44,106 L55,62 L55,160 Q100,165 145,160 L145,62 L156,106 L184,98 L155,30 Q100,42 45,30 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Peak Lapels -->
          <polygon points="100,55 70,30 65,75 92,105 100,95" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          <polygon points="100,55 130,30 135,75 108,105 100,95" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          <!-- Welt Pockets -->
          <rect x="62" y="120" width="26" height="5" rx="1" fill="rgba(0,0,0,0.2)" />
          <rect x="112" y="120" width="26" height="5" rx="1" fill="rgba(0,0,0,0.2)" />
          <!-- Horn Buttons -->
          <circle cx="100" cy="110" r="2.8" fill="#3B2E24" stroke="#D4AF37" stroke-width="0.8" />
          <circle cx="100" cy="130" r="2.8" fill="#3B2E24" stroke="#D4AF37" stroke-width="0.8" />
        </g>
      `;
      break;

    case "veste":
    case "manteau":
      garmentPath = `
        <g class="garment-outerwear">
          <path d="M40,28 L10,105 L38,112 L50,65 L48,182 Q100,190 152,182 L150,65 L162,112 L190,105 L160,28 Q100,40 40,28 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Collar / Lapels -->
          <polygon points="100,50 68,28 62,68 100,90" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          <polygon points="100,50 132,28 138,68 100,90" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          <!-- Flap Pockets -->
          <rect x="58" y="128" width="30" height="14" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
          <rect x="112" y="128" width="30" height="14" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
          <!-- Center Placket & Buttons -->
          <line x1="100" y1="90" x2="100" y2="184" stroke="rgba(0,0,0,0.2)" stroke-width="2" />
          <circle cx="100" cy="108" r="3" fill="#D4AF37" />
          <circle cx="100" cy="140" r="3" fill="#D4AF37" />
          <circle cx="100" cy="168" r="3" fill="#D4AF37" />
        </g>
      `;
      break;

    case "echarpe":
      garmentPath = `
        <g class="garment-echarpe">
          <!-- Loop around neck -->
          <ellipse cx="100" cy="65" rx="42" ry="22" fill="${hex}" stroke="rgba(0,0,0,0.18)" stroke-width="1.5" />
          ${patternOverlay}
          <!-- Draped Tails -->
          <path d="M78,75 L74,175 L102,175 L104,78 Z" fill="${hex}" stroke="rgba(0,0,0,0.15)" stroke-width="1" />
          <path d="M100,75 L98,155 L122,155 L124,78 Z" fill="${hex}" stroke="rgba(0,0,0,0.15)" stroke-width="1" />
          <!-- Tassels / Fringe -->
          <line x1="75" y1="175" x2="75" y2="188" stroke="${hex}" stroke-width="2" stroke-linecap="round" />
          <line x1="82" y1="175" x2="82" y2="188" stroke="${hex}" stroke-width="2" stroke-linecap="round" />
          <line x1="89" y1="175" x2="89" y2="188" stroke="${hex}" stroke-width="2" stroke-linecap="round" />
          <line x1="96" y1="175" x2="96" y2="188" stroke="${hex}" stroke-width="2" stroke-linecap="round" />
          <line x1="102" y1="175" x2="102" y2="188" stroke="${hex}" stroke-width="2" stroke-linecap="round" />
        </g>
      `;
      break;

    case "bonnet":
      garmentPath = `
        <g class="garment-bonnet">
          <!-- Beanie Crown -->
          <path d="M52,110 C52,45 148,45 148,110 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Foldover Ribbed Cuff -->
          <rect x="46" y="98" width="108" height="28" rx="6" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
          <line x1="48" y1="112" x2="152" y2="112" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" stroke-dasharray="3 3" />
          <!-- Optional Pompom if pompom style -->
          ${style === "pompom" ? `<circle cx="100" cy="46" r="14" fill="${hex}" stroke="rgba(0,0,0,0.15)" stroke-width="1" />` : ""}
        </g>
      `;
      break;

    case "casquette":
      garmentPath = `
        <g class="garment-casquette">
          <!-- Cap Crown -->
          <path d="M58,95 C58,45 142,45 142,95 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Button on top -->
          <circle cx="100" cy="50" r="4.5" fill="#1A1A1A" />
          <!-- Curved Visor / Brim -->
          <path d="M45,95 Q100,85 155,95 Q175,115 100,118 Q25,115 45,95 Z" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
          <path d="M55,95 Q100,90 145,95" stroke="rgba(255,255,255,0.3)" stroke-width="2" />
        </g>
      `;
      break;

    case "chaussettes":
      garmentPath = `
        <g class="garment-socks">
          <!-- Left Sock -->
          <path d="M62,45 L62,130 Q60,155 75,155 L95,155 Q102,155 98,138 L88,130 L88,45 Z" fill="${hex}" />
          <!-- Right Sock -->
          <path d="M112,45 L112,130 L102,138 Q98,155 105,155 L125,155 Q140,155 138,130 L138,45 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Ribbed Cuff Stripes -->
          <line x1="62" y1="52" x2="88" y2="52" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" />
          <line x1="62" y1="58" x2="88" y2="58" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" />
          <line x1="112" y1="52" x2="138" y2="52" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" />
          <line x1="112" y1="58" x2="138" y2="58" stroke="rgba(255,255,255,0.4)" stroke-width="2.5" />
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

/**
 * Returns Base SVG Mannequin Character for the Fitting Room
 */
export function getFittingMannequinBaseSvg(gender = "femme", skinTone = "warm") {
  const skinColors = {
    warm: { base: "#F5DDD1", shadow: "#E5C2B2" },
    fair: { base: "#FDEDE4", shadow: "#F2D5C7" },
    caramel: { base: "#C68E65", shadow: "#AD754F" },
    deep: { base: "#6F4532", shadow: "#553221" }
  };
  const tone = skinColors[skinTone] || skinColors.warm;

  const isFemme = gender === "femme";

  return `
    <!-- Mannequin Base Body Layer -->
    <g class="mannequin-base">
      <!-- Head & Neck -->
      <path d="M140,40 C140,15 160,5 175,5 C190,5 210,15 210,40 C210,65 195,85 175,85 C155,85 140,65 140,40 Z" fill="${tone.base}" />
      <!-- Face Features Minimalist Tailor Dummy Lines -->
      <path d="M165,75 Q175,78 185,75" stroke="${tone.shadow}" stroke-width="1.5" stroke-linecap="round" fill="none" />
      <path d="M175,35 L175,60 Q177,63 180,60" stroke="${tone.shadow}" stroke-width="1.5" stroke-linecap="round" fill="none" />
      <circle cx="163" cy="45" r="2.2" fill="${tone.shadow}" />
      <circle cx="187" cy="45" r="2.2" fill="${tone.shadow}" />

      <!-- Neck -->
      <path d="M166,80 L166,110 L184,110 L184,80 Z" fill="${tone.shadow}" />

      <!-- Minimal Hair / Cap -->
      <path d="M138,36 C138,10 162,2 175,2 C188,2 212,10 212,36 C205,32 188,30 175,30 C162,30 145,32 138,36 Z" fill="#4A342B" />

      <!-- Torso -->
      ${isFemme ? `
        <!-- Female Silhouette (Graceful waist taper) -->
        <path d="M135,110 Q175,116 215,110 L205,190 Q175,195 145,190 Z" fill="${tone.base}" />
        <path d="M145,190 Q175,195 205,190 L212,250 Q175,258 138,250 Z" fill="${tone.shadow}" />
      ` : `
        <!-- Male Silhouette (Broader shoulders) -->
        <path d="M125,110 Q175,118 225,110 L212,200 Q175,204 138,200 Z" fill="${tone.base}" />
        <path d="M138,200 Q175,204 212,200 L216,255 Q175,260 134,255 Z" fill="${tone.shadow}" />
      `}

      <!-- Arms & Hands -->
      <g class="arms">
        <!-- Left Arm -->
        <path d="M135,115 L108,240 Q106,260 112,275 L118,272 L124,235 L142,125 Z" fill="${tone.base}" />
        <ellipse cx="114" cy="275" rx="5.5" ry="7" fill="${tone.shadow}" />

        <!-- Right Arm -->
        <path d="M215,115 L242,240 Q244,260 238,275 L232,272 L226,235 L208,125 Z" fill="${tone.base}" />
        <ellipse cx="236" cy="275" rx="5.5" ry="7" fill="${tone.shadow}" />
      </g>

      <!-- Legs & Bare Feet -->
      <g class="legs">
        <!-- Left Leg -->
        <path d="M145,250 L145,430 L136,448 L152,448 L168,430 L168,250 Z" fill="${tone.base}" />
        <!-- Right Leg -->
        <path d="M182,250 L182,430 L198,448 L214,448 L205,430 L205,250 Z" fill="${tone.base}" />
        <!-- Knee hints -->
        <ellipse cx="156" cy="335" rx="7" ry="4" fill="${tone.shadow}" opacity="0.4" />
        <ellipse cx="194" cy="335" rx="7" ry="4" fill="${tone.shadow}" opacity="0.4" />
      </g>
    </g>
  `;
}

/**
 * Returns layered SVG elements for a piece to snap onto the fitting room mannequin
 */
export function getLayeredGarmentSvg(piece, slot, gender = "femme") {
  if (!piece) return "";

  const hex = piece.colorHex || "#C2542B";
  const pat = piece.patternId || "plain";
  const patPrefix = `fit_${piece.id || Math.random().toString(36).substring(7)}`;
  const tag = piece.embroideryText || "";
  const thread = piece.threadColorHex || "#FFFDF6";

  const patDefs = getSvgPatternDefs(patPrefix);
  const patternOverlay = pat !== "plain"
    ? `<rect width="350" height="460" fill="url(#${patPrefix}_${pat})" opacity="0.85" />`
    : "";

  let pieceSvg = "";

  if (slot === "head") {
    if (piece.pieceId === "bonnet") {
      pieceSvg = `
        <g class="layer-head-bonnet">
          <path d="M136,36 C136,2 214,2 214,36 Z" fill="${hex}" />
          ${patternOverlay}
          <rect x="132" y="28" width="86" height="15" rx="4" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
        </g>
      `;
    } else if (piece.pieceId === "casquette") {
      pieceSvg = `
        <g class="layer-head-casquette">
          <path d="M138,32 C138,5 212,5 212,32 Z" fill="${hex}" />
          ${patternOverlay}
          <path d="M130,32 Q175,25 220,32 Q235,46 175,48 Q115,46 130,32 Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
        </g>
      `;
    } else if (piece.pieceId === "echarpe") {
      pieceSvg = `
        <g class="layer-head-echarpe">
          <ellipse cx="175" cy="100" rx="36" ry="18" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.5" />
          ${patternOverlay}
          <path d="M162,108 L158,190 L178,190 L180,110 Z" fill="${hex}" stroke="rgba(0,0,0,0.15)" stroke-width="1" />
          <path d="M176,108 L174,175 L192,175 L194,110 Z" fill="${hex}" stroke="rgba(0,0,0,0.15)" stroke-width="1" />
        </g>
      `;
    }
  }

  if (slot === "top") {
    if (piece.pieceId === "chemise") {
      pieceSvg = `
        <g class="layer-top-chemise">
          <path d="M125,110 L104,200 L122,204 L132,150 L134,228 Q175,232 216,228 L218,150 L228,204 L246,200 L225,110 Q175,118 125,110 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Collar & Buttons -->
          <polygon points="175,122 155,108 152,126 175,122" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <polygon points="175,122 195,108 198,126 175,122" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <line x1="175" y1="122" x2="175" y2="230" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
          <circle cx="175" cy="145" r="2" fill="#FFFDF6" />
          <circle cx="175" cy="175" r="2" fill="#FFFDF6" />
          <circle cx="175" cy="205" r="2" fill="#FFFDF6" />
        </g>
      `;
    } else if (piece.pieceId === "pull") {
      pieceSvg = `
        <g class="layer-top-pull">
          <path d="M124,110 L98,222 L118,226 L130,160 L132,232 Q175,238 218,232 L220,160 L232,226 L252,222 L226,110 Q175,120 124,110 Z" fill="${hex}" />
          ${patternOverlay}
          <ellipse cx="175" cy="114" rx="20" ry="7" fill="none" stroke="rgba(0,0,0,0.22)" stroke-width="3" />
          <path d="M132,226 Q175,232 218,226" stroke="rgba(0,0,0,0.18)" stroke-width="3" />
        </g>
      `;
    } else if (piece.pieceId === "hoodie") {
      pieceSvg = `
        <g class="layer-top-hoodie">
          <!-- Hood draped at shoulders -->
          <path d="M148,100 C148,82 202,82 202,100 Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
          <path d="M120,110 L94,226 L116,230 L128,165 L130,235 Q175,242 220,235 L222,165 L234,230 L256,226 L230,110 Q175,122 120,110 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Kangaroo Pouch -->
          <path d="M152,185 L198,185 L204,220 L146,220 Z" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1.2" />
          <line x1="166" y1="112" x2="164" y2="150" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
          <line x1="184" y1="112" x2="186" y2="150" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" />
        </g>
      `;
    } else {
      // T-shirt or generic top
      pieceSvg = `
        <g class="layer-top-tshirt">
          <path d="M125,110 L108,165 L124,170 L133,140 L135,224 Q175,228 215,224 L217,140 L226,170 L242,165 L225,110 Q175,118 125,110 Z" fill="${hex}" />
          ${patternOverlay}
          <ellipse cx="175" cy="115" rx="18" ry="6" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="2.5" />
        </g>
      `;
    }
  }

  if (slot === "bottom") {
    if (piece.pieceId === "jupe") {
      pieceSvg = `
        <g class="layer-bottom-jupe">
          <rect x="142" y="215" width="66" height="10" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <path d="M142,225 L108,340 Q175,355 242,340 L208,225 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Pleat Lines -->
          <line x1="156" y1="225" x2="135" y2="345" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
          <line x1="175" y1="225" x2="175" y2="348" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
          <line x1="194" y1="225" x2="215" y2="345" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
        </g>
      `;
    } else if (piece.pieceId === "short") {
      pieceSvg = `
        <g class="layer-bottom-short">
          <rect x="140" y="215" width="70" height="12" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
          <path d="M140,227 L132,295 L170,295 L175,255 L180,295 L218,295 L210,227 Z" fill="${hex}" />
          ${patternOverlay}
        </g>
      `;
    } else {
      // Pantalon or Jean
      pieceSvg = `
        <g class="layer-bottom-pants">
          <rect x="138" y="215" width="74" height="12" rx="2" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1" />
          <path d="M138,227 L132,430 L168,430 L175,280 L182,430 L218,430 L212,227 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Leg Creases -->
          <line x1="150" y1="227" x2="150" y2="430" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" />
          <line x1="200" y1="227" x2="200" y2="430" stroke="rgba(255,255,255,0.2)" stroke-width="1.2" />
        </g>
      `;
    }
  }

  if (slot === "onepiece") {
    if (piece.pieceId === "robe") {
      pieceSvg = `
        <g class="layer-onepiece-robe">
          <path d="M145,110 L152,145 L144,215 L118,360 Q175,372 232,360 L206,215 L198,145 L205,110 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Waist Ribbon -->
          <rect x="144" y="205" width="62" height="10" rx="2" fill="rgba(0,0,0,0.2)" />
        </g>
      `;
    } else {
      // Full Suit (Costume)
      pieceSvg = `
        <g class="layer-onepiece-costume">
          <!-- Suit Pants -->
          <path d="M138,225 L132,430 L168,430 L175,280 L182,430 L218,430 L212,225 Z" fill="${hex}" />
          <!-- Suit Jacket Over top -->
          <path d="M122,108 L100,210 L120,214 L130,155 L130,245 Q175,250 220,245 L220,155 L230,214 L250,210 L228,108 Q175,116 122,108 Z" fill="${hex}" />
          ${patternOverlay}
          <!-- Peak Lapels -->
          <polygon points="175,130 148,110 142,145 168,175 175,165" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
          <polygon points="175,130 202,110 208,145 182,175 175,165" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.2" />
          <circle cx="175" cy="180" r="2.8" fill="#D4AF37" />
          <circle cx="175" cy="205" r="2.8" fill="#D4AF37" />
        </g>
      `;
    }
  }

  if (slot === "outerwear") {
    pieceSvg = `
      <g class="layer-outerwear">
        <path d="M118,106 L92,230 L115,235 L128,160 L126,275 Q175,282 224,275 L222,160 L235,235 L258,230 L232,106 Q175,115 118,106 Z" fill="${hex}" opacity="0.98" />
        ${patternOverlay}
        <!-- Wide Lapels & Collar -->
        <polygon points="175,125 142,105 136,150 175,175" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
        <polygon points="175,125 208,105 214,150 175,175" fill="${hex}" stroke="rgba(0,0,0,0.25)" stroke-width="1.5" />
        <rect x="136" y="220" width="24" height="12" rx="1.5" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
        <rect x="190" y="220" width="24" height="12" rx="1.5" fill="${hex}" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
        <circle cx="175" cy="195" r="3.2" fill="#D4AF37" />
        <circle cx="175" cy="235" r="3.2" fill="#D4AF37" />
      </g>
    `;
  }

  if (slot === "shoes") {
    pieceSvg = `
      <g class="layer-shoes-socks">
        <!-- Socks -->
        <path d="M132,410 L132,444 L154,444 L154,410 Z" fill="${hex}" />
        <path d="M196,410 L196,444 L218,444 L218,410 Z" fill="${hex}" />
        ${patternOverlay}
        <!-- Loafers / Sneakers over socks -->
        <ellipse cx="140" cy="446" rx="14" ry="7" fill="#242426" />
        <ellipse cx="210" cy="446" rx="14" ry="7" fill="#242426" />
      </g>
    `;
  }

  // Embroidery Tag
  let embroideryBadge = "";
  if (tag && (slot === "top" || slot === "outerwear" || slot === "onepiece")) {
    embroideryBadge = `
      <g class="embroidery-tag" transform="translate(195, 160)">
        <rect x="-14" y="-6" width="28" height="12" rx="1.5" fill="#FAF7F2" stroke="#D96B43" stroke-width="0.8" />
        <text x="0" y="3" font-family="'Poppins', sans-serif" font-size="6.5" font-weight="600" fill="${thread}" text-anchor="middle">${tag}</text>
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
