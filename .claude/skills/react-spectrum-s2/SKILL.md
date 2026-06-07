---
name: react-spectrum-s2
description: >-
  このプロジェクトの UI は Adobe React Spectrum (Spectrum 2 / @react-spectrum/s2) で構築する。
  S2 コンポーネントの追加・利用・スタイリング、Provider/レイアウト、ビルド設定(webpack マクロ)を
  扱うときに参照する。トリガー: 「React Spectrum」「Spectrum 2」「@react-spectrum/s2」「CardView」
  「S2 のコンポーネント」「UI を作る/追加する」「style() マクロ」「Provider」、または src/app 配下で
  UI を実装・編集するとき。shadcn/Radix/Tailwind はこのプロジェクトでは使わない(撤去済み)。
---

# React Spectrum (Spectrum 2) 開発ガイド

このリポジトリの UI ライブラリは **Adobe React Spectrum の Spectrum 2 (`@react-spectrum/s2`)**。
v3 (`@adobe/react-spectrum`) でも `react-aria-components` でもない。shadcn/Radix/Tailwind は撤去済みなので使わない。

## 0. まず MCP を使う(最重要)

コンポーネントの Props・利用例・アイコン名・推奨パターンは**記憶で書かず、必ず公式 MCP を引く**。
学習データは古く API が変わっている。

- MCP サーバー: `react-spectrum-s2`(`.mcp.json` に登録済み / 公式 `@react-spectrum/mcp`)
- ツール例: `mcp__react-spectrum-s2__*`(ドキュメント検索・コンポーネント詳細・アイコン/イラスト検索 等)
- 初回は**ユーザー承認待ち(`pending approval`)**になることがある。未承認でツールが無いときは
  公式ドキュメント(https://react-spectrum.adobe.com/ )を WebFetch で確認する。

## 1. 必須の制約(ハマりどころ)

- **client-only**: `@react-spectrum/s2` のルート(バレル)は `client-only` を import する。
  S2 コンポーネントを使うファイルの先頭には **`"use client";`** を付ける(Server Component では使えない)。
- **ビルドは webpack 固定**: S2 のスタイルはビルド時マクロで生成され、`unplugin-parcel-macros` は
  **Turbopack 非対応**。`package.json` の `dev`/`build` は **`--webpack`** で起動する(設定済み)。
- `next.config.ts` に macros webpack プラグインと `s2-styles` の splitChunks が入っている。**消さない**。

## 2. スタイリングは `style()` マクロ(Tailwind は使わない)

```tsx
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
// className に渡す
<main className={style({ padding: 24 })}>...</main>
// S2 コンポーネントの styles prop に渡す
<CardView styles={style({ width: "full", height: 500 })} ... />
```

- `with { type: "macro" }` の import 属性を必ず付ける(これがビルド時に CSS へ変換される)。
- 任意の CSS ではなく **Spectrum のトークン値**(spacing/サイズ/色など)を使う。値の一覧は MCP/docs で確認。
- デザイントークンの本格設定は**デザイン確定後**に行う(現状は最小構成)。

## 3. import パス

```tsx
// ルートから
import { Button, Heading } from "@react-spectrum/s2";
// サブパス(コレクション系などはこちらが用意されている)
import { CardView, AssetCard, CardPreview, Image, Content, Text } from "@react-spectrum/s2/CardView";
```

正確な export 元・Props は MCP で確認すること。

## 4. Provider / レイアウト(設定済み・踏襲する)

- `src/app/provider.tsx`: `"use client"` な `ClientProvider`。S2 の `<Provider elementType="html">` で
  `<html>` を描画し、App Router の `router={{ navigate: router.push }}` を配線。
- `src/app/layout.tsx`: `headers()` の `accept-language` から locale をサーバ解決して `ClientProvider` に渡す
  (SSR とクライアントで `<html lang>` を一致させ、フォントを正しくロードするため)。
- レイアウトは `<html>` を自前で書かない(Provider が描画する)。`page.css` は SSR+Provider 構成では不要。

## 5. 新しい画面/コンポーネントを足すとき

1. MCP で対象コンポーネントの Props と例を取得する。
2. ファイル先頭に `"use client";`(S2 を使う場合)。
3. レイアウト/スタイルは `style()` マクロ。生 CSS や Tailwind を持ち込まない。
4. 動作確認は `npm run build`(= `next build --webpack`)が通ること。必要なら `npm run dev` で目視。

## 6. 依存の方針

- 残す(非デザイン): `react-hook-form` / `@hookform/resolvers` / `@tanstack/react-query` / `zod`。
- 入れない(デザイン系): shadcn, Radix, Tailwind, lucide-react, sonner, next-themes など。
  アイコンは S2 のアイコンを使う(MCP で検索)。
