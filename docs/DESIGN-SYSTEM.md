# DESIGN-SYSTEM.md — Adobe Express 準拠デザインシステム（React Spectrum S2）

このプロジェクトの UI は **Adobe Express の見た目**を再現する。実装基盤は **React Spectrum S2**
（`@react-spectrum/s2`、`style()` マクロ）。Adobe Express 自体が Spectrum 製なので、見た目と
実装ライブラリは一直線で一致する。

## 基本方針（重要）

1. **S2 トークン・ファースト。** 色・タイポ・余白・角丸は `style()` マクロの**トークン名**で書く
   （`gray-100` / `accent` / `heading-lg` 等）。hex・rgb・`var(--…)` をマクロに渡さない（型エラー）。
2. **ブランド層は S2 が持たないものだけ。** Adobe Express 固有の **黒 chrome（header/sidebar）** と
   **マルチカラー Hero グラデ**は S2 に存在しないため、`src/app/globals.css` の CSS 変数＋
   `src/styles/brand-tokens.ts` の定数で持つ。これ以外でブランド層を増やさない。
3. **フォントは Adobe Clean（S2 同梱）。** `@react-spectrum/s2` が `adobe-clean-spectrum-vf` を
   Typekit から読み込む。別フォントを足さない。日本語は S2 が locale 解決でフォールバックを当てる。

> 実色は **Adobe Express の実スクショからピクセルサンプリング**して確定した（Mobbin、PIL）。
> S2 トークン実値は `@adobe/spectrum-tokens` から取得。

---

## 1. カラー

### 1-1. ブランド層（S2 に無い・`globals.css` / `brand-tokens.ts`）

| 用途 | 値（実測） | 備考 |
| --- | --- | --- |
| **chrome（header / sidebar 背景）** | `#1d1d1d` | Adobe Express 実測。S2 近似 = `gray-50` dark `#1b1b1b` |
| chrome テキスト | `#ffffff` | |
| chrome アイコン（非アクティブ） | `#c2c2c2` | |
| chrome 区切り線 | `#3a3a3a` | |
| **accent（＋作成 / CTA / アップグレード）** | `#007AFF` | **Apple system blue（2026-06-11 決定）**。旧アプリの brand-blue を継承。Express 実測 indigo `#5157E4` は廃止 |
| accent hover | `#0062CC` | |
| premium violet | `#9674FF` | プレミアム導線のバッジ等。**ボタンは S2 標準の `variant="premium"`（fuchsia→indigo→blue グラデ）が先** |
| **Hero グラデ** | `linear-gradient(90deg, #FF9416 0%, #FEC082 30%, #9FB6FA 62%, #D795AC 100%)` | 実測。orange→peach→periwinkle→mauve |

### 1-2. S2 トークンへマッピング（こちらを優先して使う）

| 役割 | S2 トークン | 実値(light\|dark) |
| --- | --- | --- |
| アプリ背景（キャンバス） | `gray-75` | `#f3f3f3` \| `#222` |
| カード面 | `gray-25` | `#ffffff` \| `#111` |
| ボーダー | `gray-100` | `#e9e9e9` \| `#2c2c2c` |
| 本文・主要テキスト | `neutral`（= gray-800） | `#292929` \| `#dbdbdb` |
| 副次テキスト | `neutral-subdued`（= gray-700） | `#505050` \| `#afafaf` |
| 主要アクション | ブランド層 `--accent`（`#007AFF` Apple blue） | ※ S2 標準 accent `#3B63FB` とは別。CTA はブランド層トークン + React Aria の `Button variant="accent"` を使う |
| 既定 accent（参考） | `accent-color-900` | `#3B63FB` \| `#5681FF` |
| 成功 / 公開中 | `positive` | — |
| エラー / 返金 | `negative` | — |
| 情報 | `informative` | — |

### 1-3. カテゴリ / 装飾パレット（商品タイプ・KPI ドット）

意味色ではなく**装飾**なので、S2 の hue トークン（`*-900`）か `brand-tokens.ts` の `category` を使う。

マクロでは S2 hue トークンを使う（値は S2 実値に解決される。旧 Tailwind 値とは別物なので注意）:

| カテゴリ | S2 hue | S2 実値 (light) | 旧値（brand-tokens.ts `category`・Tailwind 由来） |
| --- | --- | --- | --- |
| デジタルDL | `green-900` | `#05834E` | `#16a34a` |
| コース | `blue-900` | `#3B63FB` | `#2563eb` |
| サブスク | `purple-900` | `#9A47E2` | `#7c3aed` |
| 予約 | `seafoam-900` | `#07816D` | `#0d9488` |

商品サムネのパステル背景（カード）例: green `#eafaf0→#c9efd8` / blue `#eaf2fe→#cfe0fc` /
amber `#fdf3e6→#f8e0bd` / pink `#fdeaf3→#f9cfe1` / purple `#f3edfe→#ddccfb` / teal `#e7f6f3→#c6ebe3`。

---

## 2. タイポグラフィ

フォント = **Adobe Clean**（S2 同梱）。S2 では生の px ではなく **`font` ロール**で指定する
（`font: 'heading-lg'` 等）。ロールは `fontFamily/fontSize/fontWeight/lineHeight/color` をまとめて設定。

| 画面要素 | デザイン実寸(px) | 使う S2 ロール |
| --- | --- | --- |
| ストア名（Hero） | 28 / Bold | `heading-lg` |
| KPI 数値（¥48,200 等） | 28 / Bold | `heading-lg`（数値は `detail` でも可） |
| セクション見出し（商品 / 最近の注文） | 18 / Bold | `heading-xs`(18) または `title-lg`(18)。`heading-sm` は 20px なので注意 |
| クイックタイル / 商品カードのタイトル | 15 / Bold | `title-sm`(14 にスナップ) |
| 本文・ラベル・ボタン文言 | 13–14 | `ui`(14・無印) / `body-sm`(14)。`ui-sm` は 12px |
| メタ（販売数 / 時刻 / 補足） | 11–12 | `detail-sm` / `ui-xs` |
| Hero URL（ours.store/…） | 14 | `body-sm` |

ロール選択は**サイズでなく役割**で選ぶ: `heading-*`=ページ/セクション見出し、`title-*`=コンポーネント内タイトル、
`body-*`=本文、`detail-*`=メタ/キャプション、`ui-*`=操作系テキスト。サイズ接尾辞 `-xs/-sm/(既定)/-lg/-xl/-2xl/-3xl`。

---

## 3. スペーシング

**4px グリッド**（`0, 2, 4, 8, 12, 16, 20, 24, 32, …`）。マクロには数値 px をそのまま渡す（`'1rem'` 等は不可）。

| 用途 | 値 |
| --- | --- |
| カード内パディング | `24`（実装は 22→24 にスナップ） |
| カード間 / セクション間 gap | `20`–`24` |
| タイル / チップ内 gap | `12` |
| グリッド gap（商品） | `16` |
| chrome（header）左右パディング | `16` |

論理プロパティを使う（`paddingStart/End`、`marginStart/End`）。物理（Left/Right）は使わない（RTL 対応）。

---

## 4. 角丸（borderRadius）

S2 はキーワード指定（`none` / `sm` / `default` / `lg` / `xl` / `full` / `pill`、`md` は無い）。

S2 実値: `sm`=4 / `default`=8 / `lg`=10 / `xl`=16（px）。

| 要素 | デザイン実寸 | S2 |
| --- | --- | --- |
| カード（商品 / KPI / セクション） | 16–20 | `xl`(16) |
| クイックタイル | 13–16 | `xl`(16)。`lg` は 10px なので小チップのみ |
| ピル / バッジ / アバター / ＋作成 | 999 | `full`（ボタン・検索・チップは `pill` = 高さ÷2） |

---

## 5. エレベーション

カードは**極薄ボーダー＋ソフトシャドウ**（フラットすぎない Adobe Express の質感）。
S2 のコンポーネント既定の elevation を優先。マクロでは `boxShadow: 'emphasized' | 'elevated' |
'dragged'`（実値は [`DESIGN-TOKENS.md`](./DESIGN-TOKENS.md) §7）。カスタムが要る場合のみ
ブランド層で `0 2px 8px rgba(13,13,13,.06), 0 8px 24px rgba(13,13,13,.05)` を使う。

---

## 6. Chrome（黒 header / 黒 sidebar）= Adobe Express の要

S2 に「黒い chrome」トークンは無い。`globals.css` のブランド変数で背景 `#1d1d1d` を当て、
内部の S2 コンポーネントは暗背景向けに **`colorScheme="dark"` のスコープ**（または `lightDark()`）で扱う。

- **Header**（高さ 56）: 左＝グラデロゴ＋`Ours`＋ストア名、右＝検索 / アプリ切替 / アバター /
  `アップグレード`（accent `#007AFF`）。背景 `--brand-chrome`。
- **Sidebar（2026-06-11 改定: 黒レール → カプセルレール）**: 幅 80 の**キャンバス色**の列に、
  上から「＋作成（accent `#007AFF`・円形）」→「**白カプセル**（hairline ボーダー）に nav アイコン 5 個・
  ラベルなし・**アクティブ = 黒角丸タイル + 白アイコン**」→ 下端に ⋯/設定 の小カプセル。
  ツールチップ必須（アイコンのみのため）。Figma 基準 = `966:337`。
- （旧仕様・参考）黒 Sidebar: 上に「＋」作成（`full`）、以下アイコン＋ラベルのナビ
  （ホーム/商品/注文/顧客/分析/設定）。アクティブは `rgba(255,255,255,.12)` のハイライト＋白アイコン、
  非アクティブは `#c2c2c2`。アイコンは **S2 の icons**（`@react-spectrum/s2/icons/...`）を使う（lucide 等は入れない）。
- **コンテンツ領域**: 背景 `gray-75`(`#f3f3f3`)、カードは `gray-25` 面 + `gray-100` ボーダー。
  Hero は `--brand-hero-gradient`。

---

## 7. コンポーネント実装の指針

> **2026-06-11 改定**: accent(#007AFF)・選択状態・フォーカスが乗る部品は
> **react-aria-components + トークン CSS** で実装する（S2 は accent 変更不可のため）。
> 下表の S2 名は RAC 同等品で読み替え（詳細は STORE-SCREENS.md §2 注記）。
> S2 をそのまま使ってよいのは、既定見た目で足りる部品（`variant="premium"` 等）のみ。

| デザイン要素 | S2 実装 |
| --- | --- |
| 商品グリッド | `CardView` + `ProductCard`（手書き card div は使わない） |
| KPI / 統計 | ネイティブ要素＋`style()` マクロ（grid）。数値は `heading-lg` |
| タブ（すべて/デジタルDL/…） | `SegmentedControl` / `Tabs` |
| 検索 | `SearchField` |
| 最近の注文リスト | `ListView`（`ListViewItem` + `Avatar` + `Text` slots） |
| ＋新規商品 / プレビュー / 共有 | `Button`（`variant="accent"` 等）/ `ActionButton` |
| プレミアム / アップグレード導線 | `Button variant="premium"`（S2 標準のグラデ。AI 機能は `variant="genai"`） |
| アイコン | `@react-spectrum/s2/icons/*` のみ |

詳細な API・スロット規約は `.claude/skills/react-spectrum-s2`（スキル）と `react-spectrum-s2` MCP を参照。
**S2 API を記憶で書かない。**

---

## 8. ファイル

- `docs/DESIGN-SYSTEM.md` — 本ファイル（仕様）。
- `docs/DESIGN-TOKENS.md` — **S2 トークンの調査済み実値リファレンス**（全色相スケール /
  セマンティック解決表 / タイポロール全表 / 影 / 寸法）。トークン名・実値はここで引く。
- `src/app/globals.css` — ブランド層 CSS 変数（chrome / Hero グラデ / canvas）。`layout.tsx` で import。
- `src/styles/brand-tokens.ts` — 同値の型付き定数（コンポーネントから利用）。

> Figma SoT: fileKey `mXIeaaZlPI1oRmjaIKgnHh` / ページ `852:338`「store画面」。
> Candidate C（黒 chrome）= フレーム `876:337` がこのデザインの基準。
