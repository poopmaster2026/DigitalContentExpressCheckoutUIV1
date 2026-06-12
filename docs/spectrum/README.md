# Spectrum 完全ドキュメント（spectrum.adobe.com）

Adobe **Spectrum** のデザインガイドライン（`spectrum.adobe.com`）を**全ページ**ドキュメント化したもの。
sitemap.xml の全 114 URL を走査し、各ページの本文を取得した。

## ファイル構成

| ファイル | 内容 |
|---|---|
| `README.md`（本書） | 全ページ目録・取得方法・カバレッジ/欠落の注記 |
| `foundations.md` | 原則・scale・カラー・タイポ・グリッド・spacing・motion・object styles・states・theming・iconography・illustration・tokens・inclusive・i18n・bidi・data-viz |
| `components.md` | 全コンポーネント（A–Z）— 目的 / オプション・バリアント / do's & don'ts |
| `patterns.md` | application frame・headers・side navigation・cards・coach mark・contextual help・bottom nav/tab bar・form errors 等 |
| `content-writing.md` | voice & tone・grammar and mechanics・writing for errors/onboarding/readability 等 UX ライティング |

> プロジェクト向けの**要点サマリ**は `docs/SPECTRUM-GUIDELINES.md`、S2 一本のデザイン方針は `docs/DESIGN.md`。
> 本 `docs/spectrum/` は spectrum.adobe.com の**網羅リファレンス**。

## 重要な前提（S1 と S2）

`spectrum.adobe.com` は主に **Spectrum 1（classic）**。実装は **Spectrum 2（`@react-spectrum/s2`）**。
**考え方・UX パターン・命名思想は S1→S2 で概ね共通**なので本書を指針に使う。
ただし**具体的なトークン実値（hex/px）は S2 が正**で `docs/DESIGN-TOKENS.md`（git 履歴）/ S2 MCP を使う。

## 取得方法（重要）

`spectrum.adobe.com` は S3 + CloudFront 上の **client-rendered Next.js SPA**。通常の取得ではページタイトル
しか返らない。各ページは RSC flight data（`self.__next_f.push([1,"…"])`）を HTML にインライン埋め込みして
プリレンダーしているため、`curl -s 'https://spectrum.adobe.com/page/<slug>/'`（**末尾スラッシュ必須**、無いと 301）
で HTML を取得 → flight data を JSON デコード → `$NN`（T-chunk）参照を解決して本文を抽出した。
- HTTP 200 は存在判定にならない（どの slug でも 200 + 3139 byte の空シェルを返す）。**本文有無は「デコード後 > 3139 byte」で判定**。
- 値・トークン名・do/don't は全て各ページ本文の**原文ベース**（推測値なし）。

## 全ページ目録（sitemap.xml: 114 URL・全て `/page/{slug}`）

URL に section prefix は無く、グルーピングは Spectrum の既知 IA による再構成。

**Meta**: home, principles, whats-new, contact-us, theming
**Foundations**: color, color-fundamentals, color-system, color-palette, color-palette-archive, using-color, color-for-data-visualization, object-styles, typography, fonts, iconography, icons, illustration, motion, spacing, responsive-grid, platform-scale, states, design-tokens, bi-directionality, inclusive-design, international-design, data-visualization-fundamentals
**Components — actions**: action-bar, action-button, action-group, button, button-group, close-button, link, quick-actions(廃止), tool(廃止)
**Components — forms/inputs**: checkbox, checkbox-group, combo-box, dropdown, picker, field-label, help-text, form-errors, radio-button, radio-group, rating, search-field, slider, switch, text-area, text-field
**Components — color pickers**: color-area, color-loupe, color-slider, color-wheel, swatch, swatch-group
**Components — navigation**: breadcrumbs, side-navigation, tabs, tree-view, bottom-navigation-android, tab-bar-ios, application-frame
**Components — containers/overlays**: cards, alert-dialog, popover, tray, tooltip, coach-mark, contextual-help, menu, divider, table
**Components — status/feedback**: alert-banner, in-line-alert, badge, status-light, tag, toast, meter, progress-bar, progress-circle, bar-loader, circle-loader
**Components — content/media**: avatar
**Data visualization**: area-chart, bar-chart, line-chart, donut-chart, scatter-plot, histogram, big-number, axis, legend, scroll-zoom-bar
**Type roles**: heading, body, detail, code
**Content & UX writing**: voice-and-tone, grammar-and-mechanics, in-product-word-list, inclusive-ux-writing, writing-about-people, writing-for-errors, writing-for-onboarding, writing-for-readability, writing-with-visuals, headers
**Resources**: ui-kits, spectrum-xd-plugin, design-tokens

## カバレッジと欠落（明示）

- **本文ありで文書化済み**: 上記の大半（foundations 全・主要コンポーネント・パターン・UX writing）。
- **空プレースホルダ（slug は 200 だが本文ゼロ＝S2 系の新名称で旧サイト未記載）**: accordion, action-menu,
  avatar-group, calendar, color-field, color-handle, color-swatch, date-field, date-picker, date-range-picker,
  dialog, disclosure, drop-zone, form, illustrated-message, list-box, list-view, logic-button（+ エイリアス空ページ
  inline-alert / card / icon → 実体は in-line-alert / cards / iconography）。
- **CloudFront エラーで取得不可（sitemap 未掲載・現行サイトに公開実体なし）**: number-field, well。
- **動的ロードで本文取得不可**: in-product-word-list（用語集本体が playground コレクション。導入文のみ取得）。
- **独立ページとして存在しないパターン**（cards/states/responsive-grid 等の中で扱われる）: drag-and-drop,
  empty-state, object-grid, page-templates, selection, navigation, design-checklist。
- **未文書化（今回のスコープ外）**: data visualization の各チャート（area/bar/line/donut/scatter/histogram/
  big-number/axis/legend/scroll-zoom-bar）と type role 詳細（heading/body/detail/code の個別ページ）は概要のみ。
  必要になったら追補する。
