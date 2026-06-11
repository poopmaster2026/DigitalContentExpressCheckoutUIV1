# Project conventions

UI layer (2026-06-11 更新):
- **React Aria Components (`react-aria-components`)** — 主役。カスタムデザイン部分
  （chrome / サイドバーレール / ボタン / テーブル CRUD 等）はこれを
  `src/app/globals.css` のデザイントークン（CSS 変数）でスタイルする。
  コンポーネントは `src/shared/components/ui/`（`button.tsx` + `button.css` が基準実装）。
- **`@react-spectrum/s2`** — app の `<Provider>`（Adobe Clean フォント・locale）として維持。
  S2 既定の見た目で足りる部品にはそのまま使ってよいが、**accent 色は変更不可**
  （S2 標準 blue `#3B63FB`）なので、`--accent: #007AFF` を使う UI は React Aria 側で作る。
- shadcn/Radix/Tailwind/lucide は不使用（撤去済み・追加禁止）。

Directory structure follows the old repo's
`../DigitalContentExpressCheckoutUI/docs/ARCHITECTURE.md`:
`src/app`（ルーティングのみ）/ `src/features/{feature}`（api / types / queries / actions /
hooks / {page}/{section} の Container+Presentational）/ `src/shared`（components/ui,
providers, types, mock）/ `src/lib`（query-client 等）。依存方向: app → features → shared / lib。

## Where to look things up
- Component APIs / examples / icons / illustrations: use the **`react-spectrum-s2`
  Agent Skill** (installed in `.claude/skills/`, official Adobe docs) and the
  **`react-spectrum-s2` MCP server** (`.mcp.json`). Don't guess S2 APIs from memory.
- Design tokens (verified S2 values: color scales, semantic mapping, type roles,
  shadows, sizing): **`docs/DESIGN-TOKENS.md`**. Design decisions: `docs/DESIGN-SYSTEM.md`.
  Forbidden patterns: `docs/DESIGN-CONSTRAINTS.md`.
- **Figma からの画面実装は必ず `/figma-react-aria-implement <Figma URL>` スキルを使う**
  （Figma = 構成のイメージ把握のみ。寸法/フォント/色は S2 スケール + トークンが正）。
  React Aria の API は `.claude/skills/react-aria`（公式 skill）の references を読む。記憶で書かない。

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
- **Styling** — 2 系統を使い分ける（どちらも raw hex のベタ書き禁止）:
  - React Aria Components / ネイティブ要素 → `globals.css` の CSS 変数を参照する
    コンポーネント CSS（`src/shared/components/ui/*.css`）。Tailwind は使わない。
  - S2 コンポーネント → `style()` macro（`with { type: "macro" }`）。S2 トークン名のみ。
    layout-only の `styles={style(...)}`。
- **Provider/layout are already wired** in `src/app/provider.tsx` (`<Provider
  elementType="html">` + App Router navigation) and `src/app/layout.tsx` (locale
  resolved server-side from `accept-language`). Don't render `<html>` manually.

## Dependencies
- Keep (non-design): `react-hook-form`, `@hookform/resolvers`, `@tanstack/react-query`, `zod`.
- Don't add design libs (shadcn, Radix, Tailwind, lucide-react, sonner, next-themes).
  Use S2's own icons.
- **Storybook / Vitest は導入しない**（2026-06-11 決定。旧リポ ARCHITECTURE.md の
  テスト規約はこのリポには適用しない）。検証は `npm run build` + `npm run lint`。

## Status
- Design tokens configured in `src/app/globals.css`（出典: docs/DESIGN-TOKENS.md + Figma SoT）。
  accent = **#007AFF（Apple system blue）**。Express indigo #5157e4 は廃止。
- TanStack Query wired: `src/lib/query-client.ts` + `src/shared/providers/query-provider.tsx`（layout 結線済み）。
