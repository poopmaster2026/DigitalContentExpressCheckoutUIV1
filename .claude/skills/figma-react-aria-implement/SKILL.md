---
name: figma-react-aria-implement
description: Figma デザインを React Aria + デザイントークンで実装する。Figma は「構成のイメージ把握」のみに使い、寸法・フォント・色は Adobe Express(S2) スケールとデザインドキュメントから決める。引数に Figma URL を渡す。
argument-hint: <Figma URL (node-id 付き)>
---

# figma-react-aria-implement — Figma を参考に React Aria で実装する

引数: **Figma URL**（例 `https://www.figma.com/design/<fileKey>/...?node-id=952-337`）。
fileKey と node-id を抽出して対象画面を特定する。

## 大原則（このスキルの存在理由）

**Figma は「何を・どういう構成で置くか」を掴むためのイメージボード。実寸の正ではない。**

| 決めるもの | 正（Source of Truth） | Figma から転記してよいか |
| --- | --- | --- |
| 構成・要素・状態・文言 | Figma + `docs/STORE-SCREENS.md` | ✅ |
| **フォントサイズ・ウェイト・行間** | **S2 タイポスケール**（`docs/DESIGN-TOKENS.md` §3。ui=14 基準 / detail 12 / title 16 / heading 22…） | ❌ Figma の px を写さない |
| **コンポーネントの寸法・余白・形状** | **React Aria コンポーネントの標準構造** + S2 寸法（component-height 32 基準・4px グリッド・radius sm4/md8/lg10/xl16/pill） | ❌ Figma に合わせて拡大縮小しない |
| 色 | `src/app/globals.css` のトークンのみ（accent `#007AFF` 等） | ❌ raw hex を拾わない |
| フォントファミリー | Adobe Clean（S2 が自動ロード。変更・追加禁止） | ❌ |

**禁止**: Figma の inspect 値（px / hex / フォント名）をコードへコピーすること。
Figma に引っ張られて部品を大きくする・フォントを変えることは、このスキルの否定である。

## 手順

### 1. 前提を読み込む（毎回・省略禁止）

1. `docs/DESIGN-TOKENS.md` — トークン実値・S2 タイポスケール・Express 視覚言語
2. `docs/DESIGN-SYSTEM.md` + `docs/DESIGN-CONSTRAINTS.md` — 決定と禁止パターン
3. `docs/STORE-SCREENS.md` — 対象画面の要件・コンポーネント対応（RAC 読み替え注記）
4. 旧リポ `../DigitalContentExpressCheckoutUI/docs/ARCHITECTURE.md` — feature 構成
   （api / types / queries / hooks / {page}/{section} の Container+Presentational）

### 2. React Aria の一次資料を引く

- **`.claude/skills/react-aria`**（公式 Agent Skill）: 使うコンポーネントの
  `references/components/<Name>.md` と `references/guides/styling.md` を必ず読む。
  記憶で API を書かない。
- **`react-aria` MCP**（`.mcp.json`）が使えるなら検索に併用する。
- テーブルは [CRUD example](https://react-aria.adobe.com/examples/crud) の型
  （Table + SearchField + 行 Menu + Dialog フォーム + ソート/列リサイズ）を踏襲。

### 3. Figma を「読む」（測らない）

- `get_screenshot` で全体像、`get_metadata` で要素の洗い出し（何があるか・状態・文言）。
- 抽出するのは: セクション構成 / 要素の種類 / 状態（active・empty・draft 等）/ 文言・モックデータ。
- **寸法・座標・フォントサイズ・hex はメモしない。**

### 4. 実装する

- 配置は ARCHITECTURE.md 準拠: `src/features/{feature}/...`。共通部品は
  `src/shared/components/ui/`（基準実装 = `button.tsx` + `button.css` のパターン:
  RAC + コンポーネント CSS + `globals.css` 変数参照 + `data-*` 状態セレクタ）。
- accent(#007AFF)・選択・フォーカスが乗る部品は必ず RAC（S2 コンポーネント不可）。
- フォーカスリングは `data-focus-visible` で 2px solid `var(--focus-ring)` + offset 2px。
- アイコンは `@react-spectrum/s2/icons/*`。絵文字・lucide 禁止。
- データは `features/{feature}/api/`（モック）+ TanStack Query（`queries/`）。

### 5. 自己検証チェックリスト（完了条件）

- [ ] フォントが Adobe Clean で描画される（body のフォントスタック経由）
- [ ] フォントサイズが S2 スケールの値のみ（14/12/16/18/22/28…。13px 等の Figma 値が混入していない）
- [ ] コンポーネント CSS に raw hex がない（`var(--…)` のみ）
- [ ] 4px グリッド・radius トークン・shadow トークンに乗っている
- [ ] キーボード操作とフォーカスリングが機能する（RAC の標準挙動を壊していない）
- [ ] `npm run build` と `npm run lint` が通る
- [ ] Figma と「構成」は一致している（寸法の一致は求めない）
