# Project conventions

UI layer:
- **React Spectrum S2 (`@react-spectrum/s2`)** が唯一のデザインシステム。画面は S2
  コンポーネントで組む。コンポーネント / トークン / アイコン / イラストは
  **`react-spectrum-s2` Agent Skill と S2 MCP で特定する**（記憶で API を書かない）。
- スタイルは **`style()` macro + S2 トークン名のみ**（raw hex のベタ書き禁止）。
  自前のカラー / デザイントークン層は作らない。`src/app/globals.css` は
  デザイントークンを持たない最小スタブ（base reset のみ）。
- S2 に無い部品がどうしても必要なときだけ、S2 公式の手法（`style()` macro +
  React Aria Components を S2 の基盤プリミティブとして）で作る。Express 寄せの見た目や
  独自カラーパレットは作らない。
- shadcn / Radix / Tailwind / lucide は不使用（追加禁止）。S2 のアイコンを使う。

Directory structure follows the old repo's
`../DigitalContentExpressCheckoutUI/docs/ARCHITECTURE.md`:
`src/app`（ルーティングのみ）/ `src/features/{feature}`（api / types / queries / actions /
hooks / {page}/{section} の Container+Presentational）/ `src/shared`（components,
providers, types, mock）/ `src/lib`（query-client 等）。依存方向: app → features → shared / lib。

## Where to look things up
- Component APIs / examples / icons / illustrations: use the **`react-spectrum-s2`
  Agent Skill** (`.claude/skills/react-spectrum-s2/`, official Adobe docs) and the
  **`react-spectrum-s2` MCP server** (`.mcp.json` → `@react-spectrum/mcp`).
  Don't guess S2 APIs from memory.
- **Actual react-spectrum source = ground truth**: `/Users/ryoheiokuma/work/Ours/react-spectrum`
  is a full local checkout of the real `adobe/react-spectrum` monorepo (not a copy/summary —
  the library's own code). Verify component internals, tokens, and default props against it
  directly. Key paths: S2 components `packages/@react-spectrum/s2/src/*.tsx`; style tokens /
  theme `packages/@react-spectrum/s2/style/` (`spectrum-theme.ts`, `index.ts`); the official
  sample app the app-shell / products page were ported from lives at
  `packages/dev/s2-docs/pages/s2/home/` (`ExampleApp.tsx`, `app/Sidebar.tsx`, `app/Photos.tsx`,
  `app/Notifications.tsx`, `app/AccountMenu.tsx`). When skill/MCP/memory disagree, the source
  wins. **Read-only** — it lives outside this repo; never modify it.
- Design policy（S2 一本・スタイリング規約・色の決め方）: **`docs/DESIGN.md`**。
- デザインの考え方 / UX パターン / グリッド・トークン思想（`spectrum.adobe.com` 要点）:
  **`docs/SPECTRUM-GUIDELINES.md`**（application frame・side nav 3 階層ルール・button 階層・responsive grid 等）。
- `spectrum.adobe.com` の**全ページ網羅リファレンス**: **`docs/spectrum/`**
  （`README.md` 索引 + `foundations.md` / `components.md` / `patterns.md` / `content-writing.md`）。
- Figma を起点にする場合も `react-spectrum-s2` skill の「Figma → S2 実装」ガイドに従う
  （Figma = 構成のイメージ把握のみ。寸法 / フォント / 色は S2 スケール + トークンが正）。

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
- **Styling** — `style()` macro（`with { type: "macro" }`）のみ。S2 トークン名だけを使い、
  raw hex は禁止。layout-only は `styles={style(...)}`。`globals.css` 等に自前の
  デザイントークン（CSS 変数）層を作らない。
- **Provider/layout are already wired** in `src/app/provider.tsx` (`<Provider
  elementType="html">` + App Router navigation) and `src/app/layout.tsx` (locale
  resolved server-side from `accept-language`). Don't render `<html>` manually.

## Dependencies
- Keep (non-design): `react-hook-form`, `@hookform/resolvers`, `@tanstack/react-query`, `zod`.
- `react-aria-components` は S2 の基盤パッケージとして残す（S2 公式のカスタム
  コンポーネント手法で使用）。独立した「React Aria デザイン層」としては使わない。
- Don't add design libs (shadcn, Radix, Tailwind, lucide-react, sonner, next-themes).
  Use S2's own icons.
- **Storybook / Vitest は導入しない**。検証は `npm run build` + `npm run lint`。

## Status
- デザインシステムは **React Spectrum S2 一本**。色・トークンは S2（`style()` macro）由来で、
  Spectrum 既定パレットから選ぶ（accent は Spectrum 標準。ブランド色への再定義はしない）。
- `src/app/globals.css` はデザイントークンを持たない最小スタブ。
- TanStack Query wired: `src/lib/query-client.ts` + `src/shared/providers/query-provider.tsx`（layout 結線済み）。
  ただし Phase 0 のモック段階では **意図的に未使用**。各 Container（`ProductsPage` 等）は
  `@/shared/mock/*` を直接読む。実 API 接続時に `features/{feature}/api` + `queries`
  （`queryOptions` + `useQuery`）へ差し替える前提の結線であり、未使用は見落としではない。
