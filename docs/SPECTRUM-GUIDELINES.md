# Spectrum デザインガイドライン（spectrum.adobe.com 抜粋）

Adobe **Spectrum** の*デザインガイドライン*（`spectrum.adobe.com`）から、このプロジェクトの
画面設計に直結する原則・レイアウト・パターン・トークン思想をまとめた**要点版**。Figma で
デザインを起こすときと、その後の実装方針の拠り所にする。

> **全ページ網羅版は `docs/spectrum/`**（`README.md` 索引 + foundations / components / patterns /
> content-writing）。本書はそこから抜粋した「このプロジェクトで特に効く要点」。

## このドキュメントの位置づけ（3 種の Spectrum ドキュメント）

| 種類 | サイト | 役割 |
|---|---|---|
| **デザインガイドライン** | `spectrum.adobe.com` | 設計の考え方・UX パターン・トークン*思想*（本書の出典） |
| **実装ガイド（Concepts）** | `react-spectrum.adobe.com` | React で組む方法（Layout / Collections / Styling / Forms / Routing 等）。API は S2 MCP / `react-spectrum-s2` skill で引く |
| **チュートリアル** | Adobe Developer "Introduction to Spectrum" | SPA を動かしてデプロイするコードラボ |

> **重要な注意（S1 vs S2）**: `spectrum.adobe.com` は主に **Spectrum 1（classic）** のガイドライン。
> このプロジェクトの実装は **Spectrum 2（S2 / `@react-spectrum/s2`）**。
> **「設計の考え方・UX パターン・命名思想」は S1→S2 で概ね共通**なので本書をそのまま指針に使う。
> ただし**具体的なトークンの実値（hex / px）は S2 が正**で、`docs/DESIGN-TOKENS.md`（git 履歴）/
> S2 MCP の値を使う。本書の px/hex は「Adobe の元規定」として参照に留める。
>
> 出典ページは `spectrum.adobe.com` の SPA を RSC ペイロードから本文抽出して取得（各章末に URL）。

---

## 1. 原則（Principles）

3 つの key principle:

| 原則 | 要旨 |
|---|---|
| **Rational** | 実世界の状況に基づく。全コンポーネント/パターン/原則がリサーチとテストの裏付けを持つ |
| **Human** | 顧客ニーズ第一。アクセシビリティ・誠実さ・ユーザーの注意の尊重に高い基準 |
| **Focused** | 必要なものを必要なときに。不要な装飾・無関係なコンテンツを置かない |

実践の 4 姿勢: **For all platforms**（最初から desktop/mobile 両対応・scale system が一貫性の基盤）/
**For everyone**（可読性・代替入力・スクリーンリーダー・国際化・双方向）/ **Evolving and transparent** /
**Built by a community**。

### Adaptiveness / Platform scale（適応の核）

- Spectrum は **2 つの UI スケール**を持つ: **desktop scale**（カーソル）と **mobile scale**（タッチ）。
- **スケール比は 1:1.25**。mobile は desktop より **+25% 大きく**、desktop は mobile より **−20% 小さい**。
- **border 幅はスケールに依らず常に同一**。フォント・アイコンは **desktop/mobile の 2 セット**（手動拡縮しない）。
- スケール選択: macOS=desktop、iOS/Android=mobile、**Web はブラウザ幅で判定**（web desktop / web mobile）。
  → **このプロジェクト（デスクトップ Web 管理 UI）は desktop scale**。
- **タッチターゲットは可能な限り最小 48×48px**。

---

## 2. レイアウト・グリッド・スペーシング

### Responsive grid

- **12 カラム**。カラム幅は流動的で **8.33%（1/12）**。
- **Gutter は固定値**でブレークポイントごとに切替（代表値 **16px / 24px**）。**Grid margin は gutter 以上**。
- Breakpoint は **`min-width`** 定義。定義間のサイズは**小さい方の寸法を継承**。任意の breakpoint・カスタム breakpoint 可。
- **Layout region**（コンテンツ領域）は任意カラム数にまたがり、グリッドと一緒にリサイズ。

#### Fluid grid と Fixed grid

| | Fluid | Fixed |
|---|---|---|
| 幅 | 画面幅 **100%** | **最大幅あり** |
| 用途 | 複雑な画面・**Web アプリ** | シンプル/コンテンツ中心ページ |

→ **本プロジェクトは fluid grid 前提**。

#### Breakpoint 値（React Spectrum `DEFAULT_BREAKPOINTS`）

```
base : 0      S : 640    M : 768
L    : 1024   XL : 1280  XXL : 1536   （すべて min-width / t-shirt 命名）
```

### Spacing スケール（`@adobe/spectrum-tokens` layout.json）

基準は **8px グリッド**（`spacing-100`=8px）。微調整に 1/2/4/6px。

| token | px | | token | px |
|---|---|---|---|---|
| spacing-25 | 1 | | spacing-300 | 16 |
| spacing-50 | 2 | | spacing-350 | 20 |
| spacing-75 | 4 | | spacing-400 | 24 |
| spacing-85 | 6 | | spacing-500 | 32 |
| spacing-100 | 8 | | spacing-600 | 40 |
| spacing-200 | 12 | | spacing-700 | 48 |
| | | | spacing-800 / 900 / 1000 | 64 / 80 / 96 |

- spacing トークンは**コンポーネント「間」の余白**に使う（コンポーネント内 padding には使わない）。
  例: text field 間 `spacing-200`、field とボタン間 `spacing-400`、横並び field 間 `spacing-300`。
- 全体レイアウトは spacing ではなく **responsive grid** を使う。

### 固定スケール（参考値・実装は S2 値が正）

- **component-height**（desktop / mobile）: 50=20/26・75=24/30・**100=32/40**・200=40/50・300=48/60・400=56/70・500=64/80
- **workflow-icon-size**（desktop / mobile）: 50=14/16・75=16/18・100=20/24・200=22/28・300=26/30
- **border-width**: 100=1 / 200=2 / 400=4
- **corner-radius**: 100=4 / 500=8(medium default) / 700=10(large default) / 800=16 / full
- **focus-indicator-gap**: 2px

### Page / Application frame（アプリフレーム）

全 Adobe アプリは同じ基本構造を共有し、横断的な一貫体験と学習コスト低減を保証する。フレームは
static で安定が原則。一時的な状態（メニュー・設定・追加アクション）は popover / tray で表す。

リージョン:
1. **Header bar**（上端 sticky・全幅）— グローバル/製品全体のアクション・ナビ・ブランディング。
2. **Side navigation / rail**（左に持続）— コンテンツ/機能のナビ。collapsed rail 幅 = **48px**。
3. **Panel** — コンテンツ整理。**幅は 304px か 240px の 2 種**。単一 or 縦積みグループ（間に divider）。
4. **Main content area** — responsive grid 上に載る実コンテンツ。

レスポンシブ:
- rail/panel があるとき main grid = **100% −（rail/panel 幅）**。
- **ビューポート < 1280px** では展開 rail/panel は**オーバーレイ**、**≥ 1280px** では**オフセット**。
- **Dividers** は desktop 2px / mobile 1px、不透明で bar/panel より濃い色。

---

## 3. ナビゲーション & アプリ UX パターン

### Header bar

- **常に sticky**（スクロールで隠れない）。含めるパーツの配置は変えない。
- **グローバル/恒久アクション = 右、一時/コンテキスト依存 = 左**。グループは小 divider で区切る。
- **ブランディング or home アイコンはどちらか一方のみ**（両方は持たない）。ブランドの右に製品名可。
- **検索は製品全体を検索**（製品横断はしない）。タブ/ドキュメント名が無ければ検索は畳まず開いたまま。
- レスポンシブ時は要素を消さず「more actions」に畳む。
- ヘッダーは本体と同じか**より暗い**テーマに（明ヘッダー+暗本体は禁止）。暗ヘッダー+明本体なら divider 不要。

### Side navigation（最重要ルール）

- バリアント: **single level** / **single level with headers**（header は非インタラクティブ）/ **multi-level**。
  1 メニュー内で挙動・スタイルを混在させない。
- **階層は 3 レベルまで**。> *"Adding more than three levels will make the indentation indiscernible,
  which becomes a major usability issue."* → **4 階層以上は禁止**。
- 挙動の一貫性: 最上位項目に遷移先があるなら「遷移+sub 展開」、無いなら「sub 展開のみ」。**同一体験で混在させない**。
- **アイコンは first-level のみ**。multi-level の sub-level は**常にテキストのみ**。装飾アイコン禁止。
- 幅は可変（デフォルト `size-3000`）。ラベルは **descriptive かつ concise・sentence case**。
- RTL はミラーリング（左寄せ・アイコンはテキスト右）。

### Tabs

- **同等の重要度のセクションにのみ**。フロー置換には使わず pagination を。**ネストを避ける**。
- 既定 horizontal。vertical は項目が横に収まらない/on-page アンカー用。**選択は常に 1 つ**。
- **quiet** = sub-level/コンテナ内、divider なし。**emphasized**（選択時テキスト青）= メインナビ。
- タブが多すぎるときは横スクロール or quiet picker。**収めるために truncate しない**。

### Breadcrumbs

- **階層ナビ専用**。**root 含め 4 項目程度**を表示、**5 以上 or 幅不足で truncation**。
- truncation メニューは**インデントしない**（フラットに root→現在地）。**truncate は 1 ラベルまで**。アイコン不可。

### Button（強調の階層）

| variant | 使いどころ |
|---|---|
| **accent**（強強調） | 体験に不可欠な必須アクション。**同一ビューで 3 個まで** |
| **primary**（中強調） | CTA ほど目立たせない / 同等の primary が複数あるとき |
| **secondary**（弱強調） | 目立たないアクション。**グループ内で唯一のボタンにしない** |
| **negative** | 破壊的/ネガティブ。**控えめに** |
| static color | 色背景/画像の上（明背景=static black / 暗背景=static white） |

- style: **fill**（目立たせる）/ **outline**（secondary 専用）。size は **medium がデフォルト**。最小幅 = 高さ × 2.25。
- ラベルは**動詞・1〜2 語（最大 4 語・20 文字未満）・sentence case**。記号/絵文字なし。装飾アイコン禁止。
- **色を上書きしない**（カスタム色禁止）。追加アクションは split button でなく **button group**。
- **pending** は 5 秒以内の indeterminate のみ・表示前に 1 秒ディレイ。長い処理は progress bar/circle。

---

## 4. カラー

- **Color theme は light / dark / darkest**（OS の device color mode にマッピング）。
- **トークンは target contrast ratio から生成**（背景に対するコントラスト比で値が決まる）。
  index が上がるほど背景とのコントラストが上がる（light は濃く / dark は明るく）。**uniform color space で評価**。
- **Grays**（無彩色）の役割: `gray-50〜200`=背景レイヤー（既定背景 `gray-100`）/ `gray-200,300`=装飾ボーダー /
  `gray-400`=field border・disabled icon / `gray-500`=disabled text / `gray-600`=control border /
  `gray-700〜900`=テキスト（WCAG 最小コントラスト）。
- **13 hue**: red, orange, yellow, chartreuse, celery, green, seafoam, cyan, blue, indigo, purple, fuchsia, magenta。各テーマ 14 shade。
  役割: `*-100`=two-tone 背景 / `*-600〜800`=ボーダー / `*-900`=着色テキスト（accent と negative のみ）/ `*-700〜1100`=アイコン・イラスト。
- **セマンティック**: negative=red / notice=orange / positive=green / informative=blue / **accent=blue**。
  → 意味を色で伝えるときは**必ずテキスト or アイコンを併記**（色覚に依存しない）。
- 色背景/画像上は **transparent white/black**（背景明度 < 50%→white、> 50%→black）。

---

## 5. タイポグラフィ

- 主要書体 **Adobe Clean**（CJK は **Adobe Clean Han** = 簡/繁中・日・韓）、コードは **Source Code Pro**。
- **タイプスケールは比率 1.125（major second）**。`font-size-50`〜`font-size-1300`。**px 直書き禁止**（トークン名で指定）。
- タイプロール: **Heading / Body / Detail / Code**。t-shirt size → font-size トークン対応（抜粋）:
  - Heading: M=`font-size-500` / L=`font-size-700` / XL=`font-size-900` / S=`font-size-300`
  - Body: M=`font-size-200` / L=`font-size-300` / XL=`font-size-400`
- **line-height 倍率**: Heading/Detail = 1.3×（**Han 1.5×**）、Body/Code = 1.5×（**Han 1.7×**）。
- **Bold**=階層/注意（UI 要素名・ボタン）。**Italic** はプレースホルダー/画像キャプションのみ（**CJK はイタリック化しない**）。
  **Underline は link 専用**。全 UX コンテンツは **sentence case**。数値は tabular・表内右揃え。
- 段落幅は約 70 文字（50〜120）。インデント禁止・full-justify 禁止。

---

## 6. デザイントークン（思想）

- **「Design tokens are design decisions, translated into data.」** デザインとエンジニアの共有言語＝ source of truth。
- 種類:
  - **Global**（具体値の土台。例 `gray-100`, `blue-800`）
  - **Alias**（用途/意味付きで別トークンを参照。例 `accent-color-800`, `negative-border-color-default`）
  - **Component-specific**（特定コンポーネント専用。例 `drop-zone-background-color`）
- **使い分け**: **Alias を最優先**。global は alias が無いときのみ。component-specific は対象コンポーネントのみ（流用禁止）。
  → 例: ボタン背景は `accent-background-color-default`（◯）であって `blue-900`（✗）。
- **命名はフラット・3 パート（context → common unit → clarification、広い→具体の順）**。
  例 `checkbox-control-size-small`、`action-button-edge-to-hold-icon-large`。
- **ハードコード値（生 hex / 生 px）を使わない**。これがスケールと製品横断の一貫性の前提。

---

## 7. このプロジェクトへの落とし込み（要点）

- 画面は **application frame**（sticky header + 左 rail + main）で組む。main は **fluid grid**（100% 幅）。
- **header**: ブランド or home のどちらか一方、グローバルアクションは右・一時アクションは左、検索はストア内検索。
- **side nav**: 階層は浅く（3 レベル以内）、first-level のみアイコン可。
- **Button**: accent は必須アクションに限定（1 ビュー 3 個まで）、色は上書きしない。
- **色・タイポ・余白は S2 トークンで指定**（生 hex/px 禁止）。実値は `docs/DESIGN-TOKENS.md`（git 履歴）/ S2 MCP。
- ≥1280px を主対象とし、rail はオフセット配置（< 1280px ではオーバーレイ）。

---

## 出典（spectrum.adobe.com）

原則 / scale: `/page/principles/` `/page/platform-scale/`
レイアウト: `/page/responsive-grid/` `/page/spacing/` `/page/application-frame/` `/page/headers/`
ナビ/パターン: `/page/side-navigation/` `/page/tabs/` `/page/breadcrumbs/` `/page/button/`
カラー: `/page/color-fundamentals/` `/page/color-system/`
タイポ: `/page/typography/` `/page/fonts/` `/page/heading/` `/page/body/`
トークン: `/page/design-tokens/`

数値の一次ソース: `@adobe/spectrum-tokens` v14.13.0 `layout.json`、`adobe/react-spectrum` の `DEFAULT_BREAKPOINTS`。

> 取得方法: `spectrum.adobe.com` は Next.js の client-rendered SPA のため、各ページの RSC フライトデータ
> （`self.__next_f.push`）をデコードして本文を抽出した。ルール・トークン名は各ページ本文の原文ベース（推測値なし）。
