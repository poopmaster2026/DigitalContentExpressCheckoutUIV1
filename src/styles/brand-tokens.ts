/**
 * Brand tokens — the custom layer S2 doesn't provide, as typed constants.
 *
 * Single source of truth is src/app/globals.css (CSS variables); these constants
 * mirror it for non-CSS contexts (canvas drawing, inline SVG, email templates).
 * For component styling prefer the CSS variables / React Aria component classes.
 * See docs/DESIGN-TOKENS.md and docs/DESIGN-SYSTEM.md.
 */

export const brand = {
  /** Black chrome (header only — the sidebar is a capsule rail on the canvas). */
  chrome: "#1d1d1d",
  chromeText: "#ffffff",
  chromeIcon: "#c2c2c2",
  chromeIconActive: "#ffffff",
  chromeActiveBg: "rgb(255 255 255 / 12%)",
  chromeDivider: "#3a3a3a",

  /** Accent = Apple system blue (2026-06-11 決定。旧 Express indigo #5157e4 は廃止). */
  accent: "#007aff",
  accentHover: "#0062cc",
  accentTint: "#f2f9ff",
  violet: "#9674ff", // premium 導線のバッジ等のみ

  /** Sidebar rail (white capsules on canvas, black active tile). */
  railCapsule: "#ffffff",
  railIcon: "#6f6f6f",
  railActiveBg: "#0d0d0d",
  railActiveIcon: "#ffffff",

  /** Hero gradient: orange → peach → periwinkle → mauve. */
  heroGradient:
    "linear-gradient(90deg, #FF9416 0%, #FEC082 30%, #9FB6FA 62%, #D795AC 100%)",

  /** Content surfaces (mirror of globals.css for non-CSS contexts). */
  canvas: "#F3F3F3",
  card: "#FFFFFF",
  border: "#E9E9E9",
  ink: "#0D0D0D",
  textSecondary: "#615D59",
  textMuted: "#A39E98",
  positive: "#16A34A",
  negative: "#D73220",
  cardShadow: "0 2px 8px rgb(13 13 13 / 6%), 0 8px 24px rgb(13 13 13 / 5%)",
} as const;

/**
 * Decorative pastel thumbnail backgrounds (Figma の商品サムネ。gradient: top → bottom).
 * Digital-only Phase 0 のため商品タイプ別カラーは廃止 — サムネ装飾にのみ使う。
 */
export const thumbTint = {
  green: ["#eafaf0", "#c9efd8"],
  blue: ["#eaf2fe", "#cfe0fc"],
  amber: ["#fdf3e6", "#f8e0bd"],
  pink: ["#fdeaf3", "#f9cfe1"],
  purple: ["#f3edfe", "#ddccfb"],
  teal: ["#e7f6f3", "#c6ebe3"],
} as const;

export type BrandToken = keyof typeof brand;
