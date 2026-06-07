# Project conventions

UI library: **Adobe React Spectrum — Spectrum 2 (`@react-spectrum/s2`)**. Not v3
(`@adobe/react-spectrum`), not shadcn/Radix/Tailwind (all removed).

## Where to look things up
- Component APIs / examples / icons / illustrations: use the **`react-spectrum-s2`
  Agent Skill** (installed in `.claude/skills/`, official Adobe docs) and the
  **`react-spectrum-s2` MCP server** (`.mcp.json`). Don't guess S2 APIs from memory.

## Hard constraints (project-specific — not in the generic skill)
- **Build = webpack, not Turbopack.** S2 styles compile via build-time macros
  (`unplugin-parcel-macros`), which don't support Turbopack. `dev`/`build` therefore
  run with `--webpack` (see `package.json`). `next.config.ts` holds the macro webpack
  plugin + the `s2-styles` splitChunks group — don't remove them.
- **S2 components are client-only.** Every S2 component module (both the barrel
  `@react-spectrum/s2` and subpaths like `@react-spectrum/s2/CardView`) imports
  `client-only`, so any file using one needs `"use client";` at the top.
- **Import from subpaths, not the barrel** (`@react-spectrum/s2/CardView`,
  `@react-spectrum/s2/Button`, …) — better tree-shaking; the skill docs match this.
- **Styling = the `style()` macro** from `@react-spectrum/s2/style` imported
  `with { type: "macro" }`. No Tailwind, no global CSS. Prefer Spectrum tokens
  (e.g. `font: "heading"`, spacing on a 4px grid). Native HTML elements take
  `className={style(...)}`; S2 components take a layout-only `styles={style(...)}`.
- **Provider/layout are already wired** in `src/app/provider.tsx` (`<Provider
  elementType="html">` + App Router navigation) and `src/app/layout.tsx` (locale
  resolved server-side from `accept-language`). Don't render `<html>` manually.

## Dependencies
- Keep (non-design): `react-hook-form`, `@hookform/resolvers`, `@tanstack/react-query`, `zod`.
- Don't add design libs (shadcn, Radix, Tailwind, lucide-react, sonner, next-themes).
  Use S2's own icons.

## Status
- Design tokens are intentionally not configured yet — set them once the design is final.
