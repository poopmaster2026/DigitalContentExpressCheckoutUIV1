# Project conventions

## デザインシステム

**新規コードは shadcn/ui + Tailwind CSS v4** を使う。既存の React Spectrum S2 コンポーネントは
移行フェーズ中のため共存しているが、新しい画面・コンポーネントは必ず shadcn/ui で書く。

### shadcn/ui（新規コード）

- **shadcn/ui（new-york スタイル）** が唯一のデザインシステム。`src/shared/components/ui/` に展開。
- スタイルは **Tailwind CSS v4 utility classes + `cn()` helper のみ**（raw hex 禁止）。
- デザイントークンは **`src/app/globals.css`** の CSS 変数で管理（`--background`, `--primary` 等）。
- カラーは **semantic token 経由のみ**（`bg-background`, `text-foreground`, `bg-primary` 等）。`bg-[#xxx]` 形式は禁止。
- アイコンは **`lucide-react`** を使う。
- コンポーネント追加: `npx shadcn@latest add <name>`。生成ファイルは直接編集しない（CLIで再生成される）。
- shadcn にない部品が必要な場合: shadcn MCP → `vercel-plugin:shadcn` Skill → `npx shadcn@latest list` の順で確認してからエスカレーション。

### React Spectrum S2（移行中・既存コードのみ）

- 既存の S2 コンポーネントはそのまま動作し続ける。新規で S2 コードを書かない。
- **Build = webpack, not Turbopack.** S2 マクロ（`unplugin-parcel-macros`）は Turbopack 非対応。
  `next.config.ts` の webpack プラグイン・splitChunks 設定は削除しない。
- S2 コンポーネントは client-only。使用するファイルには `"use client"` が必要。

## Directory structure

`src/app`（ルーティングのみ）/ `src/features/{feature}`（api / types / queries / actions /
hooks / {page}/{section} の Container+Presentational）/ `src/shared`（components,
providers, types, mock）/ `src/lib`（query-client 等）。依存方向: app → features → shared / lib。

詳細は [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) を参照。

## Where to look things up

- **shadcn/ui** コンポーネント・API: **`shadcn` MCP**（`.mcp.json` 登録済み）または `vercel-plugin:shadcn` Skill。記憶で書かない。
- **TanStack Query** API: **`tanstack` MCP**（`.mcp.json` 登録済み）または `tanstack-query` Skill。
- **デザイントークン・コンポーネント仕様**: [`docs/DESIGN-SYSTEM.md`](./docs/DESIGN-SYSTEM.md)（実体は `src/app/globals.css`）。
- **構造規約・実装パターン**: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)。
- **Figma を起点にする場合**: `figma-shadcn-design` / `figma-shadcn-implement` スキルに従う（`.claude/skills/` に配置済み）。
- **React Spectrum S2**（移行中既存コードのみ）: `react-spectrum-s2` MCP と `/Users/ryoheiokuma/work/Ours/react-spectrum` ローカルソース。

## Hard constraints

- **新規コードに S2 は使わない。** shadcn/ui + Tailwind CSS v4 で書く。
- **Turbopack は使わない。** `dev`/`build` は `--webpack` フラグで実行する（`package.json` 参照）。
- **任意値 className 禁止。** `bg-[#xxx]`, `gap-[10px]` 等の形式は使わない。token 経由のみ。
- **Provider/layout は `src/app/provider.tsx` + `src/app/layout.tsx` で結線済み**。`<html>` を手動でレンダリングしない。

## フォームバリデーション規約（react-hook-form + zod）

- **ビジネスバリデーションは必ず Zod スキーマに書く。** コンポーネント側で `minValue` 等の制約を持たない。
- **`setError` / `clearErrors` は `Controller` の render prop 内（子コンポーネント含む）では呼ばない。**
  react-hook-form の内部状態を render 中に書き換えると「Cannot update a component while rendering a different component」警告が出る。
  - ❌ `Controller` render → `PriceInputField` → `useFormContext().setError(...)` を呼ぶ
  - ✅ `setError` が必要なら `Controller` の外（親コンポーネント or `useEffect`）で呼ぶ
- **入力文字の正規化・拒否（例: 半角数字以外を弾く）はローカル `useState` で管理する。** これは UI の入力処理であり、Zod のビジネスルールではないため `setError` は使わない。
- **cross-field バリデーション（例: `isFree` が false なら `price > 0`）は `superRefine` で書く。**
  フォームの submit 時と、触れたフィールドの onChange/onBlur 時に自動で走る。

## Dependencies

- **Keep**: `react-hook-form`, `@hookform/resolvers`, `@tanstack/react-query`, `zod`
- **Keep (shadcn/ui stack)**: `tailwindcss`, `@tailwindcss/postcss`, `tw-animate-css`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `radix-ui`, `@radix-ui/react-slot`, `next-themes`
- **Keep (transitional)**: `@react-spectrum/s2`, `react-aria-components`, `unplugin-parcel-macros`（S2 移行完了後に削除）
- **Don't add**: Storybook / Vitest。検証は `npm run build` + `npm run lint`。

## Status

- デザインシステム移行中: **既存コードは S2、新規コードは shadcn/ui + Tailwind CSS v4**。
- `src/app/globals.css` に Tailwind v4 + shadcn デザイントークン（CSS 変数）を設定済み。
- `src/lib/utils.ts` に `cn()` ヘルパー追加済み。
- `src/shared/components/ui/` — shadcn コンポーネントの追加先（まだ空）。
- TanStack Query: `src/lib/query-client.ts` + `src/shared/providers/query-provider.tsx` で結線済み。
  Phase 0 のモック段階では意図的に未使用（`@/shared/mock/*` を直接読む）。実 API 接続時に差し替え。

## MCP サーバー（`.mcp.json`）

- **shadcn** (`npx shadcn@latest mcp`): shadcn registry の検索・コンポーネント情報取得。
- **tanstack** (`npx -y @gihan92/tanstack-mcp`): TanStack エコシステムのドキュメント検索・scaffolding。
- **react-spectrum-s2** (`@react-spectrum/mcp`): S2 コンポーネント参照（移行中既存コード用）。

## スキル（`.claude/skills/`）

- **figma-shadcn-design** (`/figma-shadcn-design <意図>`): shadcn/ui Figma kit を使って Figma にデザインを起こす。
- **figma-shadcn-implement** (`/figma-shadcn-implement <Figma URL>`): Figma から React + shadcn/ui を実装する。
- いずれも `DigitalContentExpressCheckoutUI` から移植・調整済み。**操作対象 Figma の fileKey は未設定** — 初回利用時にユーザーから受領してスキル内のプレースホルダを差し替える。
