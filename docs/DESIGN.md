# Design policy

このプロジェクトのデザインは **React Spectrum S2 (Spectrum 2) 一本**で行う。
Adobe Express 寄せの見た目・独自カラーパレット・React Aria の独立デザイン層は持たない。

## 基本方針

1. **デザインシステムは S2 のみ。** 画面は `@react-spectrum/s2` のコンポーネントで組む。
2. **コンポーネント / トークン / アイコン / イラストは AI 補助で特定する。**
   記憶で API を書かず、必ず次を参照する:
   - `react-spectrum-s2` Agent Skill（`.claude/skills/react-spectrum-s2/`、Adobe 公式）
   - `react-spectrum-s2` MCP サーバー（`.mcp.json` → `@react-spectrum/mcp`）
3. **スタイルは `style()` macro + S2 トークン名のみ。** raw hex のベタ書き禁止。
   自前の CSS 変数によるデザイントークン層を作らない。Tailwind 不使用。

## 色

- 色は S2 のセマンティックトークン（`accent` / `neutral` / `negative` / `positive` /
  `notice` / `informative` …）と色相スケール（`gray` / `blue` / `red` … の `-100`〜`-1600`）
  から選ぶ。許容値は S2 MCP（`style` macro の property values）で確認する。
- **accent は Spectrum 標準色で固定**。S2 は accent 等の値を再定義できないため、
  独自ブランド色への差し替えは行わない。自社ブランド色が必要になった場合は
  方針自体を再検討する（このリポでは行わない）。
- light / dark は Provider の `colorScheme` で切り替える。

## アイコン / イラスト

- `@react-spectrum/s2/icons` / `@react-spectrum/s2/illustrations` のみを使う。
  lucide 等の外部アイコンは追加しない。S2 アイコン / イラストの検索は S2 MCP を使う。

## カスタムコンポーネント（最終手段）

- S2 に該当部品が無い場合のみ、S2 公式の手法で作る:
  `style()` macro + React Aria Components（S2 の基盤プリミティブ）。
  色は必ず S2 トークンを使い、独自トークンを増やさない。

## Figma を起点にする場合

- Figma は「構成のイメージ把握」にのみ使う。寸法 / フォント / 色は転記せず、
  S2 のスケール・トークンが正。実装は `react-spectrum-s2` skill の
  「Figma → S2 実装」ガイドに従う。

## ビルド / 結線（参考）

- ビルドは webpack（S2 macro が Turbopack 非対応）。`next.config.ts` の macro plugin +
  `s2-styles` splitChunks を維持する。
- S2 コンポーネントは client-only（使うファイルは `"use client";`）。barrel ではなく
  subpath import（`@react-spectrum/s2/Button` など）。
- Provider / layout は結線済み（`src/app/provider.tsx` / `src/app/layout.tsx`）。
- `src/app/globals.css` は base reset のみの最小スタブ。デザイントークンは置かない。
