// ==========================================================================
// Atelier Mariem - Character Illustration System (Vector SVG)
// Stylized representation of Mariem based on the reference photo:
// - Long voluminous curly dark-brown hair with auburn / burgundy tint
// - Round tortoiseshell glasses
// - Light skin with warm blush
// - Warm & playful expressions
// - Black streetwear graphic t-shirt
// Poses: greeting, talking, sewing, studying, proud
// ==========================================================================

export function getMariemSvg(pose = "greeting", options = {}) {
  const {
    width = "100%",
    height = "100%",
    className = "",
    garmentPiece = null, // for proud pose
    interactive = false
  } = options;

  // Shared hair gradients and textures
  const defs = `
    <defs>
      <!-- Skin Gradients -->
      <linearGradient id="mariemSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FCEEE6" />
        <stop offset="100%" stop-color="#F3DACD" />
      </linearGradient>
      <linearGradient id="mariemSkinShadow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#EDC5B5" />
        <stop offset="100%" stop-color="#E2B2A0" />
      </linearGradient>
      <radialGradient id="mariemBlush" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#E58A8A" stop-opacity="0.45" />
        <stop offset="100%" stop-color="#E58A8A" stop-opacity="0" />
      </radialGradient>

      <!-- Hair Gradients: Rich Dark Brown with Auburn/Burgundy Highlights -->
      <linearGradient id="mariemHairDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#261413" />
        <stop offset="50%" stop-color="#3B1D19" />
        <stop offset="100%" stop-color="#1A0D0C" />
      </linearGradient>
      <linearGradient id="mariemHairAuburn" x1="0%" y1="0%" x2="100%" y2="80%">
        <stop offset="0%" stop-color="#5E231D" />
        <stop offset="50%" stop-color="#7B3226" />
        <stop offset="100%" stop-color="#3F1713" />
      </linearGradient>
      <linearGradient id="mariemHairHighlight" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stop-color="#9C4436" />
        <stop offset="100%" stop-color="#5A1E17" />
      </linearGradient>

      <!-- Tortoiseshell Glasses Gradient -->
      <linearGradient id="tortoiseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#4A1C10" />
        <stop offset="30%" stop-color="#84391C" />
        <stop offset="60%" stop-color="#38140B" />
        <stop offset="100%" stop-color="#692812" />
      </linearGradient>

      <!-- T-Shirt Dark Gradient -->
      <linearGradient id="teeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#242426" />
        <stop offset="100%" stop-color="#141415" />
      </linearGradient>
    </defs>
  `;

  // Render pose specific SVGs
  if (pose === "greeting" || pose === "idle") {
    return `
      <svg class="mariem-character-svg pose-greeting ${className}" viewBox="0 0 360 460" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mariem greeting in her atelier">
        ${defs}
        <!-- Back Hair Volume (Deep Auburn Corkscrew Curls) -->
        <g class="hair-back">
          <ellipse cx="180" cy="190" rx="112" ry="125" fill="url(#mariemHairDark)" />
          <!-- Flowing Curl Masses -->
          <circle cx="95" cy="180" r="42" fill="url(#mariemHairAuburn)" />
          <circle cx="85" cy="235" r="46" fill="url(#mariemHairDark)" />
          <circle cx="92" cy="290" r="40" fill="url(#mariemHairAuburn)" />
          <circle cx="265" cy="180" r="42" fill="url(#mariemHairAuburn)" />
          <circle cx="275" cy="235" r="46" fill="url(#mariemHairDark)" />
          <circle cx="268" cy="290" r="40" fill="url(#mariemHairAuburn)" />
          <!-- Bouncy Curly Edge Paths -->
          <path d="M70,220 C60,250 75,280 82,310 C90,340 110,360 125,370 C105,340 100,290 105,250 Z" fill="url(#mariemHairDark)" />
          <path d="M290,220 C300,250 285,280 278,310 C270,340 250,360 235,370 C255,340 260,290 255,250 Z" fill="url(#mariemHairDark)" />
        </g>

        <!-- Body / Black Streetwear Tee -->
        <g class="body-group">
          <!-- Torso -->
          <path d="M125,320 L95,460 L265,460 L235,320 Q180,335 125,320 Z" fill="url(#teeGrad)" />
          <!-- Neck -->
          <path d="M162,260 L162,315 Q180,324 198,315 L198,260 Z" fill="url(#mariemSkinShadow)" />
          <path d="M165,260 L165,310 Q180,318 195,310 L195,260 Z" fill="url(#mariemSkinGrad)" />
          <!-- Ribbed Tee Crew Collar -->
          <path d="M148,315 Q180,336 212,315 Q180,324 148,315 Z" fill="#2E2E32" />
          <!-- Tee Graphic Print (inspired by photo's Porsche Motorsport style) -->
          <g class="tee-graphic" opacity="0.92">
            <rect x="156" y="352" width="48" height="3" fill="#E8453C" rx="1.5" />
            <text x="180" y="367" font-family="'Poppins', sans-serif" font-weight="800" font-size="7.5" fill="#FFFFFF" letter-spacing="1.5" text-anchor="middle">ATELIER</text>
            <text x="180" y="377" font-family="'Poppins', sans-serif" font-weight="600" font-size="5" fill="#CCCCCC" letter-spacing="0.8" text-anchor="middle">STUDIO COUTURE</text>
          </g>
          <!-- Left Arm & Hand (Waving playfully) -->
          <g class="left-arm animated-wave">
            <path d="M102,335 Q60,300 55,240 Q65,230 80,250 Q85,295 115,345 Z" fill="url(#teeGrad)" />
            <path d="M55,240 Q50,210 65,190 Q75,195 72,225 Z" fill="url(#mariemSkinGrad)" />
            <!-- Cute Waving Hand -->
            <ellipse cx="68" cy="188" rx="12" ry="14" fill="url(#mariemSkinGrad)" />
            <path d="M60,182 Q58,168 64,168 Q70,168 68,182" fill="url(#mariemSkinGrad)" stroke="#E2B2A0" stroke-width="1.5" />
            <path d="M66,180 Q67,164 73,165 Q77,166 74,180" fill="url(#mariemSkinGrad)" stroke="#E2B2A0" stroke-width="1.5" />
            <path d="M72,182 Q77,169 82,172 Q84,178 78,186" fill="url(#mariemSkinGrad)" stroke="#E2B2A0" stroke-width="1.5" />
          </g>
          <!-- Right Arm (Resting lightly on desk / holding coffee) -->
          <g class="right-arm">
            <path d="M258,335 Q290,380 280,440 L245,440 Q250,390 240,345 Z" fill="url(#teeGrad)" />
          </g>
        </g>

        <!-- Head & Face -->
        <g class="head-group">
          <!-- Face Shape -->
          <path d="M136,170 C136,120 152,105 180,105 C208,105 224,120 224,170 C224,225 208,265 180,265 C152,265 136,225 136,170 Z" fill="url(#mariemSkinGrad)" />
          <!-- Warm Cheek Blushes -->
          <ellipse cx="148" cy="208" rx="16" ry="9" fill="url(#mariemBlush)" />
          <ellipse cx="212" cy="208" rx="16" ry="9" fill="url(#mariemBlush)" />

          <!-- Playful Expressive Eyebrows -->
          <path d="M145,158 Q158,150 168,155" fill="none" stroke="#261413" stroke-width="3" stroke-linecap="round" />
          <path d="M192,155 Q202,150 215,158" fill="none" stroke="#261413" stroke-width="3" stroke-linecap="round" />

          <!-- Eyes (Blinking animation) -->
          <g class="eyes blink-anim">
            <!-- Left Eye -->
            <ellipse cx="156" cy="178" rx="8" ry="7" fill="#FFFFFF" />
            <ellipse cx="157" cy="178" rx="5.5" ry="5.5" fill="#2E1C16" />
            <circle cx="159" cy="176" r="2.2" fill="#FFFFFF" />
            <!-- Eyelash / Liner -->
            <path d="M147,175 Q156,170 165,175" fill="none" stroke="#1A0D0C" stroke-width="2.2" stroke-linecap="round" />

            <!-- Right Eye -->
            <ellipse cx="204" cy="178" rx="8" ry="7" fill="#FFFFFF" />
            <ellipse cx="203" cy="178" rx="5.5" ry="5.5" fill="#2E1C16" />
            <circle cx="205" cy="176" r="2.2" fill="#FFFFFF" />
            <!-- Eyelash / Liner -->
            <path d="M195,175 Q204,170 213,175" fill="none" stroke="#1A0D0C" stroke-width="2.2" stroke-linecap="round" />
          </g>

          <!-- Cute Button Nose -->
          <path d="M178,188 Q180,198 175,202 Q180,204 185,202" fill="none" stroke="#DCA290" stroke-width="2.2" stroke-linecap="round" />

          <!-- Signature Playful Expression: Full Lips with Warm Smirk / Pout -->
          <g class="mouth-playful">
            <!-- Upper Lip -->
            <path d="M168,226 Q174,221 180,223 Q186,221 192,226 Q180,229 168,226 Z" fill="#C25A5A" />
            <!-- Lower Lip (Full and defined) -->
            <path d="M169,226 Q180,237 191,226 Q180,234 169,226 Z" fill="#D97070" />
            <!-- Soft shine on lower lip -->
            <ellipse cx="180" cy="230" rx="3.5" ry="1.5" fill="#FFC7C7" opacity="0.8" />
          </g>

          <!-- Tortoiseshell Round Glasses (Exact feature from reference photo) -->
          <g class="glasses-group">
            <!-- Bridge -->
            <path d="M168,174 Q180,168 192,174" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3" stroke-linecap="round" />
            <!-- Left Frame -->
            <circle cx="156" cy="178" r="17" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.6" />
            <circle cx="156" cy="178" r="15" fill="#8CE8FF" opacity="0.12" />
            <path d="M144,169 Q152,165 156,166" fill="none" stroke="#FFFFFF" stroke-width="1.8" opacity="0.65" stroke-linecap="round" />
            <!-- Right Frame -->
            <circle cx="204" cy="178" r="17" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.6" />
            <circle cx="204" cy="178" r="15" fill="#8CE8FF" opacity="0.12" />
            <path d="M192,169 Q200,165 204,166" fill="none" stroke="#FFFFFF" stroke-width="1.8" opacity="0.65" stroke-linecap="round" />
            <!-- Temples -->
            <path d="M139,176 L131,173" stroke="url(#tortoiseGrad)" stroke-width="2.8" stroke-linecap="round" />
            <path d="M221,176 L229,173" stroke="url(#tortoiseGrad)" stroke-width="2.8" stroke-linecap="round" />
          </g>
        </g>

        <!-- Front Cascading Hair & Voluminous Corkscrew Curls -->
        <g class="hair-front">
          <!-- Forehead Curls / Ringlets -->
          <path d="M142,126 Q156,110 178,118 Q162,132 152,142 Z" fill="url(#mariemHairAuburn)" />
          <path d="M172,114 Q196,108 212,128 Q194,134 184,136 Z" fill="url(#mariemHairDark)" />
          <path d="M164,122 Q176,140 170,148 Q164,142 165,130 Z" fill="url(#mariemHairHighlight)" />

          <!-- Left Massive Cascading Curly Locks -->
          <g class="curls-left">
            <path d="M140,140 C110,150 90,190 98,230 C105,270 120,310 112,350 C106,375 92,360 88,335 C80,295 72,250 82,205 C90,165 110,135 140,140 Z" fill="url(#mariemHairDark)" />
            <!-- Ringlet strands with Auburn Sheen -->
            <path d="M125,160 Q105,200 115,240 Q122,275 114,310 Q108,340 118,365" fill="none" stroke="url(#mariemHairAuburn)" stroke-width="8" stroke-linecap="round" />
            <path d="M112,190 Q92,230 102,270 Q110,300 102,335" fill="none" stroke="url(#mariemHairHighlight)" stroke-width="5" stroke-linecap="round" />
            <circle cx="100" cy="225" r="14" fill="url(#mariemHairAuburn)" />
            <circle cx="94" cy="275" r="16" fill="url(#mariemHairDark)" />
            <circle cx="106" cy="325" r="15" fill="url(#mariemHairAuburn)" />
          </g>

          <!-- Right Massive Cascading Curly Locks -->
          <g class="curls-right">
            <path d="M220,140 C250,150 270,190 262,230 C255,270 240,310 248,350 C254,375 268,360 272,335 C280,295 288,250 278,205 C270,165 250,135 220,140 Z" fill="url(#mariemHairDark)" />
            <!-- Ringlet strands with Auburn Sheen -->
            <path d="M235,160 Q255,200 245,240 Q238,275 246,310 Q252,340 242,365" fill="none" stroke="url(#mariemHairAuburn)" stroke-width="8" stroke-linecap="round" />
            <path d="M248,190 Q268,230 258,270 Q250,300 258,335" fill="none" stroke="url(#mariemHairHighlight)" stroke-width="5" stroke-linecap="round" />
            <circle cx="260" cy="225" r="14" fill="url(#mariemHairAuburn)" />
            <circle cx="266" cy="275" r="16" fill="url(#mariemHairDark)" />
            <circle cx="254" cy="325" r="15" fill="url(#mariemHairAuburn)" />
          </g>
        </g>
      </svg>
    `;
  }

  if (pose === "talking") {
    return `
      <svg class="mariem-character-svg pose-talking ${className}" viewBox="0 0 360 460" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mariem chatting with client">
        ${defs}
        <!-- Back Hair -->
        <g class="hair-back">
          <ellipse cx="180" cy="190" rx="115" ry="128" fill="url(#mariemHairDark)" />
          <circle cx="92" cy="180" r="44" fill="url(#mariemHairAuburn)" />
          <circle cx="82" cy="240" r="48" fill="url(#mariemHairDark)" />
          <circle cx="268" cy="180" r="44" fill="url(#mariemHairAuburn)" />
          <circle cx="278" cy="240" r="48" fill="url(#mariemHairDark)" />
        </g>

        <!-- Torso & Animated Gesturing Arms -->
        <g class="body-group">
          <path d="M125,320 L95,460 L265,460 L235,320 Q180,335 125,320 Z" fill="url(#teeGrad)" />
          <path d="M162,260 L162,315 Q180,324 198,315 L198,260 Z" fill="url(#mariemSkinGrad)" />
          <path d="M148,315 Q180,336 212,315 Q180,324 148,315 Z" fill="#2E2E32" />

          <!-- Graphic on Tee -->
          <g class="tee-graphic" opacity="0.92">
            <rect x="156" y="352" width="48" height="3" fill="#E8453C" rx="1.5" />
            <text x="180" y="367" font-family="'Poppins', sans-serif" font-weight="800" font-size="7.5" fill="#FFFFFF" letter-spacing="1.5" text-anchor="middle">ATELIER</text>
          </g>

          <!-- Animated Left Hand holding Measuring Tape -->
          <g class="left-arm animated-gesture">
            <path d="M102,335 Q70,360 85,415 Q100,420 115,370 Z" fill="url(#teeGrad)" />
            <path d="M85,415 Q100,445 118,435 Q125,410 115,370 Z" fill="url(#mariemSkinGrad)" />
            <!-- Yellow Tailor Tape draped -->
            <path d="M92,410 Q80,440 90,460 Q105,455 102,420" fill="none" stroke="#F1C40F" stroke-width="4.5" stroke-dasharray="2 1" />
          </g>

          <!-- Right Arm explaining/pointing enthusiastically -->
          <g class="right-arm animated-gesture-alt">
            <path d="M258,335 Q290,340 310,295 Q295,285 270,325 Z" fill="url(#teeGrad)" />
            <path d="M310,295 Q330,270 325,255 Q310,260 295,285 Z" fill="url(#mariemSkinGrad)" />
            <!-- Hand pointing up -->
            <ellipse cx="328" cy="250" rx="9" ry="11" fill="url(#mariemSkinGrad)" />
            <path d="M328,245 L332,230 Q336,230 334,245" fill="url(#mariemSkinGrad)" stroke="#E2B2A0" stroke-width="1.2" />
          </g>
        </g>

        <!-- Head & Expressive Talking Face -->
        <g class="head-group">
          <path d="M136,170 C136,120 152,105 180,105 C208,105 224,120 224,170 C224,225 208,265 180,265 C152,265 136,225 136,170 Z" fill="url(#mariemSkinGrad)" />
          <ellipse cx="148" cy="208" rx="16" ry="9" fill="url(#mariemBlush)" />
          <ellipse cx="212" cy="208" rx="16" ry="9" fill="url(#mariemBlush)" />

          <!-- Curious / Excited Eyebrows -->
          <path d="M144,154 Q156,146 168,152" fill="none" stroke="#261413" stroke-width="3" stroke-linecap="round" />
          <path d="M192,152 Q204,146 216,154" fill="none" stroke="#261413" stroke-width="3" stroke-linecap="round" />

          <!-- Eyes -->
          <g class="eyes">
            <ellipse cx="156" cy="178" rx="8" ry="7" fill="#FFFFFF" />
            <ellipse cx="158" cy="178" rx="5.5" ry="5.5" fill="#2E1C16" />
            <circle cx="160" cy="176" r="2.2" fill="#FFFFFF" />
            <path d="M147,174 Q156,168 165,174" fill="none" stroke="#1A0D0C" stroke-width="2.2" stroke-linecap="round" />

            <ellipse cx="204" cy="178" rx="8" ry="7" fill="#FFFFFF" />
            <ellipse cx="202" cy="178" rx="5.5" ry="5.5" fill="#2E1C16" />
            <circle cx="204" cy="176" r="2.2" fill="#FFFFFF" />
            <path d="M195,174 Q204,168 213,174" fill="none" stroke="#1A0D0C" stroke-width="2.2" stroke-linecap="round" />
          </g>

          <path d="M178,188 Q180,198 175,202 Q180,204 185,202" fill="none" stroke="#DCA290" stroke-width="2.2" stroke-linecap="round" />

          <!-- Animated Talking Mouth -->
          <g class="mouth-talking talk-anim">
            <ellipse cx="180" cy="229" rx="8" ry="6" fill="#7D2424" />
            <path d="M173,227 Q180,230 187,227 Q180,224 173,227 Z" fill="#FFFFFF" />
            <path d="M170,225 Q180,220 190,225 Q180,237 170,225 Z" fill="none" stroke="#C25A5A" stroke-width="2.2" />
          </g>

          <!-- Tortoiseshell Glasses -->
          <g class="glasses-group">
            <path d="M168,174 Q180,168 192,174" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3" stroke-linecap="round" />
            <circle cx="156" cy="178" r="17" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.6" />
            <circle cx="156" cy="178" r="15" fill="#8CE8FF" opacity="0.12" />
            <circle cx="204" cy="178" r="17" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.6" />
            <circle cx="204" cy="178" r="15" fill="#8CE8FF" opacity="0.12" />
            <path d="M139,176 L131,173" stroke="url(#tortoiseGrad)" stroke-width="2.8" stroke-linecap="round" />
            <path d="M221,176 L229,173" stroke="url(#tortoiseGrad)" stroke-width="2.8" stroke-linecap="round" />
          </g>
        </g>

        <!-- Front Cascading Auburn Curls -->
        <g class="hair-front">
          <path d="M142,126 Q156,110 178,118 Q162,132 152,142 Z" fill="url(#mariemHairAuburn)" />
          <path d="M172,114 Q196,108 212,128 Q194,134 184,136 Z" fill="url(#mariemHairDark)" />
          <g class="curls-left">
            <path d="M140,140 C110,150 90,190 98,230 C105,270 120,310 112,350 C106,375 92,360 88,335 C80,295 72,250 82,205 Z" fill="url(#mariemHairDark)" />
            <circle cx="94" cy="275" r="16" fill="url(#mariemHairAuburn)" />
          </g>
          <g class="curls-right">
            <path d="M220,140 C250,150 270,190 262,230 C255,270 240,310 248,350 C254,375 268,360 272,335 C280,295 288,250 278,205 Z" fill="url(#mariemHairDark)" />
            <circle cx="266" cy="275" r="16" fill="url(#mariemHairAuburn)" />
          </g>
        </g>
      </svg>
    `;
  }

  if (pose === "sewing") {
    return `
      <svg class="mariem-character-svg pose-sewing ${className}" viewBox="0 0 420 460" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mariem operating her sewing machine">
        ${defs}
        <!-- Back Hair -->
        <g class="hair-back">
          <ellipse cx="190" cy="170" rx="100" ry="110" fill="url(#mariemHairDark)" />
          <circle cx="110" cy="180" r="38" fill="url(#mariemHairAuburn)" />
          <circle cx="100" cy="230" r="42" fill="url(#mariemHairDark)" />
          <circle cx="270" cy="180" r="40" fill="url(#mariemHairAuburn)" />
        </g>

        <!-- Torso leaned forward toward machine -->
        <g class="body-leaning">
          <path d="M140,290 L105,460 L295,460 L260,290 Q200,310 140,290 Z" fill="url(#teeGrad)" />
          <path d="M175,235 L175,285 Q195,295 215,285 L215,235 Z" fill="url(#mariemSkinGrad)" />
          <path d="M165,285 Q195,305 225,285" fill="none" stroke="#2E2E32" stroke-width="8" />

          <!-- Arms extending forward feeding fabric -->
          <!-- Left Arm -->
          <g class="arm-feed-left">
            <path d="M125,305 Q110,380 180,410 L195,390 Q145,360 145,310 Z" fill="url(#teeGrad)" />
            <!-- Hand guiding cloth -->
            <path d="M180,410 Q215,415 225,400 Q205,390 195,390 Z" fill="url(#mariemSkinGrad)" />
          </g>
          <!-- Right Arm -->
          <g class="arm-feed-right">
            <path d="M275,305 Q300,370 255,410 L240,390 Q270,360 255,310 Z" fill="url(#teeGrad)" />
            <!-- Hand guiding cloth -->
            <path d="M255,410 Q235,418 220,402 Q235,392 240,390 Z" fill="url(#mariemSkinGrad)" />
          </g>
        </g>

        <!-- Head tilted slightly down towards needle -->
        <g class="head-group" transform="rotate(6 195 180)">
          <path d="M150,150 C150,105 165,90 192,90 C220,90 235,105 235,150 C235,200 220,240 192,240 C165,240 150,200 150,150 Z" fill="url(#mariemSkinGrad)" />
          <ellipse cx="160" cy="188" rx="14" ry="8" fill="url(#mariemBlush)" />
          <ellipse cx="224" cy="188" rx="14" ry="8" fill="url(#mariemBlush)" />

          <!-- Focused Eyes looking down at presser foot -->
          <g class="focused-eyes">
            <ellipse cx="170" cy="162" rx="7" ry="5.5" fill="#FFFFFF" />
            <ellipse cx="170" cy="164" rx="4.5" ry="4" fill="#2E1C16" />
            <path d="M162,158 Q170,154 178,160" fill="none" stroke="#1A0D0C" stroke-width="2.2" stroke-linecap="round" />

            <ellipse cx="214" cy="162" rx="7" ry="5.5" fill="#FFFFFF" />
            <ellipse cx="214" cy="164" rx="4.5" ry="4" fill="#2E1C16" />
            <path d="M206,160 Q214,154 222,158" fill="none" stroke="#1A0D0C" stroke-width="2.2" stroke-linecap="round" />
          </g>

          <!-- Focused Cute Pout -->
          <path d="M185,212 Q192,208 199,212 Q192,216 185,212 Z" fill="#D97070" />

          <!-- Glasses perched slightly down nose -->
          <g class="glasses-group" transform="translate(0, 4)">
            <path d="M178,160 Q192,154 206,160" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3" stroke-linecap="round" />
            <circle cx="170" cy="164" r="16" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.4" />
            <circle cx="214" cy="164" r="16" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.4" />
          </g>
        </g>

        <!-- Hair falling forward gracefully -->
        <g class="hair-front">
          <path d="M155,115 Q175,95 200,105 Q180,125 168,135 Z" fill="url(#mariemHairAuburn)" />
          <path d="M135,140 C115,180 120,240 128,300 C110,250 115,190 135,140 Z" fill="url(#mariemHairDark)" />
          <circle cx="122" cy="250" r="16" fill="url(#mariemHairAuburn)" />
          <circle cx="258" cy="250" r="16" fill="url(#mariemHairAuburn)" />
        </g>
      </svg>
    `;
  }

  if (pose === "studying") {
    return `
      <svg class="mariem-character-svg pose-studying ${className}" viewBox="0 0 380 460" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mariem studying architecture notes">
        ${defs}
        <!-- Back Hair -->
        <g class="hair-back">
          <ellipse cx="190" cy="180" rx="105" ry="120" fill="url(#mariemHairDark)" />
          <circle cx="105" cy="190" r="40" fill="url(#mariemHairAuburn)" />
          <circle cx="275" cy="190" r="40" fill="url(#mariemHairDark)" />
        </g>

        <!-- Torso & Study Desk Scene -->
        <g class="body-study">
          <path d="M135,310 L105,460 L275,460 L245,310 Q190,325 135,310 Z" fill="url(#teeGrad)" />
          <path d="M172,250 L172,305 Q190,314 208,305 L208,250 Z" fill="url(#mariemSkinGrad)" />
          <path d="M158,305 Q190,326 222,305" fill="none" stroke="#2E2E32" stroke-width="7" />

          <!-- Left Arm propping chin up thoughtfully -->
          <g class="arm-chin-prop">
            <path d="M112,325 Q90,380 130,420 L150,405 Q125,365 135,325 Z" fill="url(#teeGrad)" />
            <path d="M130,420 Q145,435 155,410 L160,340 Q150,340 142,365 Z" fill="url(#mariemSkinGrad)" />
            <!-- Fist/Hand under chin -->
            <ellipse cx="160" cy="255" rx="11" ry="13" fill="url(#mariemSkinGrad)" />
          </g>

          <!-- Right Hand holding pencil over open textbook -->
          <g class="arm-writing">
            <path d="M265,325 Q285,390 255,430 L235,420 Q250,380 245,330 Z" fill="url(#teeGrad)" />
            <circle cx="245" cy="425" r="9" fill="url(#mariemSkinGrad)" />
            <!-- Wooden Drafting Pencil -->
            <line x1="235" y1="410" x2="260" y2="445" stroke="#CCA02A" stroke-width="3" stroke-linecap="round" />
            <polygon points="260,445 264,451 257,449" fill="#1A1A1A" />
          </g>
        </g>

        <!-- Head tilted thoughtfully -->
        <g class="head-group" transform="rotate(-4 190 170)">
          <path d="M146,160 C146,110 162,95 190,95 C218,95 234,110 234,160 C234,215 218,255 190,255 C162,255 146,215 146,160 Z" fill="url(#mariemSkinGrad)" />
          <ellipse cx="158" cy="198" rx="15" ry="8" fill="url(#mariemBlush)" />
          <ellipse cx="222" cy="198" rx="15" ry="8" fill="url(#mariemBlush)" />

          <!-- Curious contemplative eyebrows -->
          <path d="M154,148 Q166,140 178,146" fill="none" stroke="#261413" stroke-width="2.8" stroke-linecap="round" />
          <path d="M202,144 Q214,140 226,150" fill="none" stroke="#261413" stroke-width="2.8" stroke-linecap="round" />

          <!-- Focused reading eyes -->
          <g class="eyes">
            <ellipse cx="166" cy="168" rx="7.5" ry="6" fill="#FFFFFF" />
            <ellipse cx="168" cy="170" rx="5" ry="5" fill="#2E1C16" />
            <circle cx="170" cy="168" r="2" fill="#FFFFFF" />

            <ellipse cx="214" cy="168" rx="7.5" ry="6" fill="#FFFFFF" />
            <ellipse cx="212" cy="170" rx="5" ry="5" fill="#2E1C16" />
            <circle cx="214" cy="168" r="2" fill="#FFFFFF" />
          </g>

          <path d="M188,178 Q190,188 185,192 Q190,194 195,192" fill="none" stroke="#DCA290" stroke-width="2" stroke-linecap="round" />
          <!-- Gentle thinking smile -->
          <path d="M178,220 Q190,227 202,220" fill="none" stroke="#C25A5A" stroke-width="2.6" stroke-linecap="round" />

          <!-- Glasses -->
          <g class="glasses-group">
            <path d="M178,164 Q190,158 202,164" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3" stroke-linecap="round" />
            <circle cx="166" cy="168" r="16" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.4" />
            <circle cx="214" cy="168" r="16" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.4" />
          </g>
        </g>

        <!-- Hair Cascade -->
        <g class="hair-front">
          <circle cx="108" cy="270" r="16" fill="url(#mariemHairAuburn)" />
          <circle cx="270" cy="270" r="16" fill="url(#mariemHairAuburn)" />
        </g>
      </svg>
    `;
  }

  if (pose === "proud") {
    // Proudly holding up finished garment on wooden hanger
    const garmentColor = (garmentPiece && garmentPiece.colorHex) ? garmentPiece.colorHex : "#C2542B";
    const garmentTag = (garmentPiece && garmentPiece.embroideryText) ? garmentPiece.embroideryText : "M";

    return `
      <svg class="mariem-character-svg pose-proud ${className}" viewBox="0 0 440 480" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mariem proudly holding up the finished custom garment">
        ${defs}
        <!-- Golden Sparkles Background -->
        <g class="sparkles-burst">
          <circle cx="80" cy="100" r="4" fill="#FFD700" opacity="0.9" class="sparkle-anim" />
          <path d="M80,88 L80,112 M68,100 L92,100" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
          <circle cx="360" cy="90" r="4" fill="#FFD700" opacity="0.9" class="sparkle-anim" />
          <path d="M360,78 L360,102 M348,90 L372,90" stroke="#FFD700" stroke-width="2" stroke-linecap="round" />
          <circle cx="390" cy="220" r="3" fill="#E8998D" opacity="0.85" />
          <circle cx="50" cy="240" r="3" fill="#E8998D" opacity="0.85" />
        </g>

        <!-- Back Hair -->
        <g class="hair-back">
          <ellipse cx="220" cy="170" rx="115" ry="125" fill="url(#mariemHairDark)" />
          <circle cx="130" cy="170" r="44" fill="url(#mariemHairAuburn)" />
          <circle cx="310" cy="170" r="44" fill="url(#mariemHairDark)" />
        </g>

        <!-- Torso -->
        <g class="body-group">
          <path d="M165,300 L135,470 L305,470 L275,300 Q220,315 165,300 Z" fill="url(#teeGrad)" />
          <path d="M202,240 L202,295 Q220,304 238,295 L238,240 Z" fill="url(#mariemSkinGrad)" />
          <path d="M188,295 Q220,316 252,295" fill="none" stroke="#2E2E32" stroke-width="7" />

          <!-- Both Arms raised forward proudly presenting the wooden hanger! -->
          <!-- Left Arm -->
          <g class="arm-proud-left">
            <path d="M142,315 Q100,340 135,390 L155,370 Q130,335 160,315 Z" fill="url(#teeGrad)" />
            <path d="M135,390 Q160,405 185,375 L175,360 Q150,380 145,370 Z" fill="url(#mariemSkinGrad)" />
            <circle cx="185" cy="375" r="9" fill="url(#mariemSkinGrad)" />
          </g>

          <!-- Right Arm -->
          <g class="arm-proud-right">
            <path d="M298,315 Q340,340 305,390 L285,370 Q310,335 280,315 Z" fill="url(#teeGrad)" />
            <path d="M305,390 Q280,405 255,375 L265,360 Q290,380 295,370 Z" fill="url(#mariemSkinGrad)" />
            <circle cx="255" cy="375" r="9" fill="url(#mariemSkinGrad)" />
          </g>
        </g>

        <!-- Finished Garment on Wooden Hanger held proudly in front -->
        <g class="finished-garment-showcase" transform="translate(0, 10)">
          <!-- Wooden Hanger Hook -->
          <path d="M220,295 C220,280 230,270 220,260 C210,250 220,240 225,245" fill="none" stroke="#D4AF37" stroke-width="3" stroke-linecap="round" />
          <!-- Wooden Hanger Bar -->
          <path d="M145,315 Q220,290 295,315 Q220,305 145,315 Z" fill="#A86C3E" stroke="#7A4C25" stroke-width="1.5" />

          <!-- Rendered Garment Drape with chosen color -->
          <g class="garment-drape">
            <!-- Main Garment Silhouette -->
            <path d="M160,315 Q220,300 280,315 L295,445 Q220,460 145,445 Z" fill="${garmentColor}" filter="drop-shadow(0px 8px 16px rgba(0,0,0,0.25))" />
            <!-- Soft textile folds & highlights -->
            <path d="M190,312 Q200,380 195,450" fill="none" stroke="#000000" stroke-width="4" opacity="0.15" />
            <path d="M250,312 Q240,380 245,450" fill="none" stroke="#000000" stroke-width="4" opacity="0.15" />
            <path d="M210,310 Q215,370 215,455" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.25" />

            <!-- Little Woven Atelier Tag -->
            <rect x="206" y="325" width="28" height="15" fill="#FAF7F2" rx="2" stroke="#D96B43" stroke-width="1" />
            <text x="220" y="336" font-family="'Poppins', sans-serif" font-size="8" font-weight="600" fill="#2D2321" text-anchor="middle">${garmentTag}</text>
          </g>
        </g>

        <!-- Head with radiant joyful smile -->
        <g class="head-group">
          <path d="M176,150 C176,100 192,85 220,85 C248,85 264,100 264,150 C264,205 248,245 220,245 C192,245 176,205 176,150 Z" fill="url(#mariemSkinGrad)" />
          <ellipse cx="188" cy="188" rx="16" ry="9" fill="url(#mariemBlush)" />
          <ellipse cx="252" cy="188" rx="16" ry="9" fill="url(#mariemBlush)" />

          <!-- Happy Eyebrows -->
          <path d="M184,138 Q196,130 208,136" fill="none" stroke="#261413" stroke-width="3" stroke-linecap="round" />
          <path d="M232,136 Q244,130 256,138" fill="none" stroke="#261413" stroke-width="3" stroke-linecap="round" />

          <!-- Joyful Beaming Eyes (Crescent Curves) -->
          <g class="happy-eyes">
            <path d="M188,160 Q198,150 208,160" fill="none" stroke="#1A0D0C" stroke-width="3.5" stroke-linecap="round" />
            <path d="M232,160 Q242,150 252,160" fill="none" stroke="#1A0D0C" stroke-width="3.5" stroke-linecap="round" />
          </g>

          <path d="M218,170 Q220,180 215,184 Q220,186 225,184" fill="none" stroke="#DCA290" stroke-width="2" stroke-linecap="round" />

          <!-- Big Joyful Open Smile -->
          <g class="smile-open">
            <path d="M204,204 Q220,224 236,204 Q220,202 204,204 Z" fill="#A83232" />
            <path d="M207,204 Q220,208 233,204 Q220,202 207,204 Z" fill="#FFFFFF" />
            <path d="M202,204 Q220,228 238,204" fill="none" stroke="#C25A5A" stroke-width="2.2" stroke-linecap="round" />
          </g>

          <!-- Tortoiseshell Glasses -->
          <g class="glasses-group">
            <path d="M208,154 Q220,148 232,154" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3" stroke-linecap="round" />
            <circle cx="196" cy="158" r="17" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.6" />
            <circle cx="244" cy="158" r="17" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.6" />
          </g>
        </g>

        <!-- Front Voluminous Curls Framing Face -->
        <g class="hair-front">
          <circle cx="134" cy="245" r="16" fill="url(#mariemHairAuburn)" />
          <circle cx="306" cy="245" r="16" fill="url(#mariemHairAuburn)" />
          <circle cx="146" cy="290" r="15" fill="url(#mariemHairDark)" />
          <circle cx="294" cy="290" r="15" fill="url(#mariemHairDark)" />
        </g>
      </svg>
    `;
  }

  // Bonus Pose: "blowing a kiss" / cute kissy-face pose from reference photo
  if (pose === "kiss" || pose === "kissy") {
    return `
      <svg class="mariem-character-svg pose-kiss ${className}" viewBox="0 0 380 460" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mariem blowing a playful kiss">
        ${defs}
        <!-- Sparkle Kiss Magic -->
        <g class="kiss-sparkles">
          <circle cx="120" cy="210" r="3.5" fill="#FFD700" />
          <path d="M120,202 L120,218 M112,210 L128,210" stroke="#FFD700" stroke-width="1.8" stroke-linecap="round" />
          <circle cx="95" cy="190" r="2.5" fill="#E8998D" />
          <circle cx="135" cy="180" r="2" fill="#FFD700" />
        </g>

        <!-- Back Hair Volume (Dense Cascading Corkscrew Curls) -->
        <g class="hair-back">
          <ellipse cx="190" cy="185" rx="116" ry="130" fill="url(#mariemHairDark)" />
          <circle cx="100" cy="175" r="46" fill="url(#mariemHairAuburn)" />
          <circle cx="88" cy="235" r="50" fill="url(#mariemHairDark)" />
          <circle cx="96" cy="295" r="44" fill="url(#mariemHairAuburn)" />
          <circle cx="275" cy="175" r="46" fill="url(#mariemHairAuburn)" />
          <circle cx="288" cy="235" r="50" fill="url(#mariemHairDark)" />
          <circle cx="278" cy="295" r="44" fill="url(#mariemHairAuburn)" />
        </g>

        <!-- Torso & Black Streetwear Tee -->
        <g class="body-group">
          <path d="M135,315 L105,460 L275,460 L245,315 Q190,330 135,315 Z" fill="url(#teeGrad)" />
          <path d="M172,255 L172,310 Q190,320 208,310 L208,255 Z" fill="url(#mariemSkinGrad)" />
          <path d="M158,310 Q190,332 222,310" fill="none" stroke="#2E2E32" stroke-width="8" />

          <!-- Left Arm raised towards lips blowing a kiss -->
          <g class="arm-kiss-left">
            <path d="M115,330 Q80,310 110,260 L128,275 Q105,315 130,335 Z" fill="url(#teeGrad)" />
            <path d="M110,260 Q125,235 152,242 L146,258 Q130,252 124,270 Z" fill="url(#mariemSkinGrad)" />
            <!-- Hand near lips -->
            <ellipse cx="152" cy="242" rx="10" ry="12" fill="url(#mariemSkinGrad)" />
            <path d="M148,236 Q156,228 162,234" stroke="#E2B2A0" stroke-width="1.2" fill="none" />
          </g>

          <!-- Right Arm resting relaxed -->
          <g class="arm-right">
            <path d="M265,330 Q295,380 285,440 L250,440 Q255,390 245,340 Z" fill="url(#teeGrad)" />
          </g>
        </g>

        <!-- Head tilted playfully (like in photo) -->
        <g class="head-group" transform="rotate(-3 190 170)">
          <!-- Rounded soft face -->
          <path d="M146,165 C146,115 162,100 190,100 C218,100 234,115 234,165 C234,220 218,260 190,260 C162,260 146,220 146,165 Z" fill="url(#mariemSkinGrad)" />
          <!-- Warm Cheek Blushes -->
          <ellipse cx="158" cy="204" rx="16" ry="10" fill="url(#mariemBlush)" />
          <ellipse cx="222" cy="204" rx="16" ry="10" fill="url(#mariemBlush)" />

          <!-- Playful Eyebrows -->
          <path d="M154,152 Q166,144 178,150" fill="none" stroke="#261413" stroke-width="3" stroke-linecap="round" />
          <path d="M202,148 Q214,142 226,152" fill="none" stroke="#261413" stroke-width="3" stroke-linecap="round" />

          <!-- Playful Wink: Left Eye Winking Crescent, Right Eye Open Sparkling -->
          <!-- Left Eye (Wink) -->
          <path d="M158,175 Q168,166 178,175" fill="none" stroke="#1A0D0C" stroke-width="3.2" stroke-linecap="round" />
          <!-- Right Eye (Open with Light Hazel sparkle) -->
          <ellipse cx="214" cy="174" rx="8" ry="7" fill="#FFFFFF" />
          <ellipse cx="213" cy="174" rx="5.5" ry="5.5" fill="#2E1C16" />
          <circle cx="215" cy="172" r="2.2" fill="#FFFFFF" />
          <path d="M205,170 Q214,164 223,170" fill="none" stroke="#1A0D0C" stroke-width="2.2" stroke-linecap="round" />

          <!-- Nose -->
          <path d="M188,184 Q190,194 185,198 Q190,200 195,198" fill="none" stroke="#DCA290" stroke-width="2.2" stroke-linecap="round" />

          <!-- The Reference Photo Signature Cute Kissy Pout Lips -->
          <g class="mouth-kissy">
            <ellipse cx="190" cy="222" rx="7.5" ry="6.5" fill="#C25A5A" />
            <ellipse cx="190" cy="222" rx="4.5" ry="3.5" fill="#7D2424" />
            <ellipse cx="190" cy="225" rx="5.5" ry="3" fill="#D97070" />
            <ellipse cx="190" cy="226" rx="2" ry="1" fill="#FFC7C7" opacity="0.9" />
          </g>

          <!-- Tortoiseshell Round Glasses -->
          <g class="glasses-group">
            <path d="M178,170 Q190,164 202,170" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3" stroke-linecap="round" />
            <circle cx="166" cy="174" r="17" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.6" />
            <circle cx="166" cy="174" r="15" fill="#8CE8FF" opacity="0.12" />
            <circle cx="214" cy="174" r="17" fill="none" stroke="url(#tortoiseGrad)" stroke-width="3.6" />
            <circle cx="214" cy="174" r="15" fill="#8CE8FF" opacity="0.12" />
          </g>
        </g>

        <!-- Front Cascading Ringlets -->
        <g class="hair-front">
          <path d="M152,122 Q166,106 188,114 Q172,128 162,138 Z" fill="url(#mariemHairAuburn)" />
          <circle cx="104" cy="270" r="16" fill="url(#mariemHairAuburn)" />
          <circle cx="276" cy="270" r="16" fill="url(#mariemHairAuburn)" />
        </g>
      </svg>
    `;
  }

  // Default fallback
  return getMariemSvg("greeting", options);
}
