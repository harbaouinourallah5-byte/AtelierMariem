// ==========================================================================
// Atelier Mariem - Character Illustration System
// ABSOLUTE RULE: DO NOT DRAW MARIEM WITH CODE.
// Hand-coded SVG girl has been deleted.
// All representations use high-resolution transparent PNG assets from assets/mariem/
// ==========================================================================

export const MARIEM_BUSTS = {
  neutral: "assets/mariem/bust-neutral.png",
  greeting: "assets/mariem/bust-neutral.png",
  talking: "assets/mariem/bust-talking.png",
  laugh: "assets/mariem/bust-laugh.png",
  kiss: "assets/mariem/bust-kiss.png",
  kissy: "assets/mariem/bust-kiss.png",
  thinking: "assets/mariem/bust-thinking.png",
  proud: "assets/mariem/bust-proud.png",
  surprised: "assets/mariem/bust-surprised.png",
  wink: "assets/mariem/bust-wink.png",
  sewing: "assets/mariem/bust-thinking.png",
  studying: "assets/mariem/bust-neutral.png"
};

export function getMariemAvatarImg(pose = "neutral", options = {}) {
  const {
    className = "",
    alt = "Mariem • Atelier Tailor & Architecture Student",
    width = "",
    height = "",
    id = ""
  } = options;

  const src = MARIEM_BUSTS[pose] || MARIEM_BUSTS.neutral;
  const styleParts = [];
  if (width) styleParts.push(`width:${width};`);
  if (height) styleParts.push(`height:${height};`);
  const styleAttr = styleParts.length > 0 ? `style="${styleParts.join('')}"` : "";
  const idAttr = id ? `id="${id}"` : "";

  return `<img src="${src}" alt="${alt}" class="mariem-bust-img ${className}" data-pose="${pose}" ${idAttr} ${styleAttr} loading="eager" />`;
}

/**
 * Universal backwards-compatibility wrapper:
 * Returns the transparent PNG image tag directly.
 * NEVER renders SVG character geometry.
 */
export function getMariemSvg(pose = "greeting", options = {}) {
  return getMariemAvatarImg(pose, options);
}
