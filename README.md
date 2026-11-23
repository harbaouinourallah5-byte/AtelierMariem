# Atelier Mariem 

> **Bespoke Couture & Architecture Studio**  
> An interactive web atelier where architecture meets bespoke tailoring.

---

## Concept

A university architecture student runs a tiny clothing atelier on the side. Balancing structural mechanics, urban theory, and studio juries with tailored garment crafting, she creates bespoke garments cut with architectural precision and finished with reinforced french seams.

Visitors interact with Mariem in her cozy studio, commission a bespoke piece through a dialogue-driven ordering suite, watch the garment constructed via an animated mechanical sewing machine, receive it in an interactive 3D wardrobe, and style it on an avatar in the Fitting Room lookbook.

---

## Architectural & Aesthetic Principles

- **Pinterest-Inspired Editorial Aesthetic**: Warm ecru foundation (`#F8F6F2`), deep carbon text (`#181615`), terracotta accents (`#B85028`), and delicate framing.
- **Unified Vector Line Iconography**: Complete absence of casual emojis; 100% vector SVG line icons crafted on a cohesive 24×24, 1.75px stroke grid.
- **Architectural Brand Identity**: Custom vector arched monogram logo in the navigation header and favicon.
- **Uniform Button Geometry**: Strict, standardized button heights (`52px` hero actions, `46px` primary controls, `36px` compact card actions) across all scenes and viewports.
- **Typography**: Clean, architectural presentation using Google Fonts **Poppins**.

---

## Interactive Flow

1. **Studio (Home)**:
   - Cozy illustrated atelier with drafting desk, mechanical sewing machine, textbooks, laptop, fabric rolls, and ambient potted plants.
   - Dynamic idle animations (blinking, notebook flipping, coffee sipping).
   - Live architectural status indicators and bilingual switcher (EN/FR).

2. **Custom Bespoke Order Flow**:
   - Natural dialogue engine with random variant pools (greetings, architectural anecdotes, coffee remarks, tailored responses).
   - Typewriter animation with animated typing indicator.
   - Multi-step configurator:
     - Form Silhouette selection (Femme / Homme).
     - Palette selection with ~16 curated tones + custom dye picker with live fabric swatch sheen.
     - Garment selection across all categories (Tops, Bottoms, Outerwear, One-Piece, Accessories).
     - Style and cut selection per garment.
     - Custom pattern (Plain, Stripes, Micro-Dots, Windowpane Check, Botanical) and bespoke embroidered tag with metallic thread selection.

3. **Workshop & Crafting Animation**:
   - Mechanical sewing machine with reciprocating needle, rotating balance wheel, and sliding fabric.
   - Banter lines and textbook reference moments during construction.
   - Speed acceleration control ("Accelerate Stitch").
   - Celebration view with finished garment display on a wooden hanger.

4. **3D Perspective Wardrobe**:
   - 3D perspective opening doors and gliding hanger animation.
   - Filterable inventory grid with search and category tabs.
   - Individual piece Craft Passports (composition, dye, care instructions, and bespoke tags).
   - Persistent storage in `localStorage`.

5. **Fitting Room & Lookbook**:
   - Layered SVG mannequin with customizable gender and skin tones (Fair, Warm, Caramel, Deep).
   - Mix & match outfit slots (Head, Top, Bottom, One-Piece, Outerwear, Shoes/Socks).
   - Randomize and reset controls.
   - High-resolution Lookbook Polaroid export (PNG) rendered directly via Canvas API.

---

## Tech Stack

- **Vanilla HTML5, CSS3, JavaScript (ES Modules)**
- **No external frameworks, build steps, or API keys required**
- **Web Audio API** for synthesized studio soundscapes (mechanical clicks, scissors, sewing machine motor, door latches)
- **HTML5 Canvas API** for client-side lookbook PNG generation
- **Google Fonts**: Poppins
- **Local Storage API** for persistent wardrobe state

---

## Project Structure

```
├── assets/
│   └── me.png                   # Character reference portrait
├── css/
│   ├── styles.css               # Design system, variables, reset, navbar & footer
│   ├── studio.css               # Studio room scene & idle animations
│   ├── conversation.css         # Dialogue engine, ordering stepper & swatches
│   ├── workshop.css             # Mechanical sewing animation & celebration
│   ├── wardrobe.css             # 3D cabinet, door perspective & archive grid
│   └── fitting-room.css         # Mannequin stage, mirror & rack controls
├── js/
│   ├── main.js                  # Application bootstrapper & scene routing
│   ├── icons.js                 # Cohesive vector SVG icon library & brand logo
│   ├── state.js                 # Reactive state store & localStorage persistence
│   ├── i18n.js                  # English & French localization dictionaries
│   ├── audio.js                 # Web Audio API sound synthesis engine
│   ├── characterSvg.js          # Mariem vector avatar (multiple poses & idle states)
│   ├── garmentSvg.js            # Standalone and layered mannequin garment SVGs
│   ├── clothingData.js           # Wardrobe catalog, cuts, colors & patterns
│   ├── dialogueData.js          # Dynamic dialogue variant pools
│   ├── dialogueEngine.js        # Typewriter text streamer & choice dispatcher
│   ├── studioScene.js           # Studio room controller & ambience
│   ├── orderFlow.js             # Order configuration stepper controller
│   ├── workshopScene.js         # Sewing workshop animation controller
│   ├── wardrobeScene.js         # Wardrobe archive & 3D fly-in controller
│   └── fittingRoomScene.js      # Fitting suite & PNG lookbook exporter
├── index.html                   # Core semantic application document
├── .gitignore
└── README.md
```

---

## Getting Started

To run locally without a build step:

```bash
# Python 3:
python -m http.server 8085

# Or with Node.js:
npx serve .
```

Open `http://localhost:8085` in your browser.

---

## License

Crafted for **Atelier Mariem** — All rights reserved.
