# Spectrum — Foundations（spectrum.adobe.com）

> 取得方法・S1/S2 の前提は `README.md` 参照。値・トークン名は原文ベース。
>
> **既に `docs/SPECTRUM-GUIDELINES.md` で詳説済み**（重複回避のため本書では再掲しない）:
> principles / platform-scale / color-fundamentals / color-system / typography / fonts / design-tokens /
> responsive-grid / spacing。以下はそれ以外の Foundation ページ。

## Motion
モーションは体験に意味と生命感を与える。purposeful / intuitive / seamless であるべき。

- **3原則**: Purposeful（状態/ビュー間の関連提示・注意喚起・フィードバックのみ）/ Intuitive（加速・重力・量感など現実の特性を反映）/ Seamless（意図が伝わる最小限）。
- **Easing（3種）**:
  - ease-out `cubic-bezier(0, 0, 0.40, 1)` — フェードイン/出現用。最も一般的。
  - ease-in `cubic-bezier(0.50, 0, 1, 1)` — 退出/フェードアウト用。
  - ease-in-out `cubic-bezier(0.45, 0, 0.40, 1)` — 画面内移動用。大きな動きに。
- **Duration トークン**（Micro=小さい動き、Macro=大きい動き）:

| Token | 時間 | 種別 | | Token | 時間 | 種別 |
|---|---|---|---|---|---|---|
| duration-100 | 130ms | Micro | | duration-600 | 300ms | Macro |
| duration-200 | 160ms | Micro | | duration-700 | 350ms | Macro |
| duration-300 | 190ms | Micro | | duration-800 | 400ms | Macro |
| duration-400 | 220ms | Micro | | duration-900 | 450ms | Macro |
| duration-500 | 250ms | Macro | | duration-1000 | 500ms | Macro |

## Object styles
形状/効果が意図や操作の手がかりを伝える。

- **Rounding**: Default = **desktop 4px / mobile 5px**（scale 連動）/ Small（checkbox 等、border 連動で内側 square・外側 round）/ Full（控えめに。最も一般的なのは basic button、CTA 強調）。
- **Border width**（desktop/mobile 同一）: **1px**（最一般: text field/tag/popover, table/small divider）/ **2px**（basic button・medium divider・slider/tabs。**キーボードフォーカス装飾も 2px**）/ **4px**（large divider 専用）。
- **Drop shadow**: 大半は色差/オーバーレイで区別。シャドウは「浮いて dismiss 可能な一時コンポーネント（dropdown menu 等）」限定。dark/darkest は opacity を上げる。

## States
コンポーネント/操作対象のステータスや可能性を伝える。2種: ユーザー起因（hover/down/focus）と オプション起因（disabled/selected/dragged/error）。

- **Default** / **Hover**（カーソル乗せ）/ **Down**（押下）。
- **Keyboard focus**: hover + 追加表示、最も一般的に **2px の青いリング**。
- **Disabled**（存在するが非インタラクティブ・後で利用可能を示唆）/ **Selected** / **Dragged** / **Error**（視覚 + 文章の両方で伝える。`writing-for-errors` 参照）。

## Theming
theme = 色・rounding・shadow・typography 等あらゆる視覚側面の意図的カスタマイズ。**コンポーネントの options と一般寸法はテーマ間で不変**。color theme は色だけのサブセット。

- **Spectrum (default)**: ミニマル・細い border・**青アクセント**。プロ向けアプリ + マーケ/ドキュメントにも対応。Adobe 体験の大多数。
- **Spectrum for Adobe Express**: より親しみやすい・太いタイポ・大きめ rounding・**indigo アクセント**。実装は現状 Spectrum CSS と Spectrum Web Components のみ。

## Iconography
clear / minimal / consistent。focused & rational。

- **Sizes**: **desktop 18px / mobile 22px**。全アイコン pixel-snapped・各サイズ最適化。
- **Color**: モノクロ。interactive state と color theme で変化。
- **Stroke width**: desktop = **1px または 2px**、mobile = **1.5px または 2px**（細い方が水平/垂直線で最一般、太い方は視覚的重みが要るとき）。
- Workflow icons（操作/ナビ用、プラットフォーム内同一サイズ）/ UI icons（コンポーネント部品、矢印・× 等、可変サイズ）。
- **Do/Don't**: fill を尊重（outline 化しない）/ **任意拡大しない（pixel-snapped）** / アイコン内文字は標準概念のみ（bold/italic/underline 等）。

## Illustration
独自のビジュアルボイス。2スタイル:
- **Filled**: color-filled + 線、時にテクスチャ。editorial・playful。onboarding 等の導入に多用。
- **Outline**: 線・グレー・時々アクセント1色。informational・functional。empty state やエラーメッセージ向け。

## Using color
色は意味やコンテンツ階層の強化に意図的に使う。

- **Theme color token**（テーマごと別値・text/icon/border 等大半に使用）vs **Static color token**（全テーマ同一色値・色を背景に使い上に黒/白の text/icon を載せる場合）。
- **Background layers（アプリフレーム用、3種）**:

| Layer | Light | Dark/darkest |
|---|---|---|
| Background base | gray-200 | gray-50 |
| Background layer 1 | gray-100 | gray-75 |
| Background layer 2 | gray-50 | gray-100 |

  大きなレイアウト領域用（コンポーネント背景には使わない）。alias token でテーマごとに別 gray を参照。
- **App framing**: プロ編集アプリ = header/footer/toolbar/panel に layer 1、content に layer 2、周囲に base。軽量/コンテンツアプリ = frame 全体に layer 2、コンテンツ領域に layer 1（base 不使用）。
- **Color backgrounds**: 控えめに。solid color + 黒/白文字（コントラスト WCAG min・大半は白文字、yellow/orange/chartreuse/cyan は黒文字）/ two-tone（同 hue、背景 100 index・icon/illustration は light で 900）。**色だけで伝えない**（label/icon 併用）。
- **Interactive states**: default→hover→down で color index を段階増。focus = hover + focus indicator。変化量は perceptually linear。
- **Don'ts**: 独自色を作らない / 色関数で Spectrum 色を改変しない / チャートには data-viz 専用色を使う。

## Color for data visualization
- **Categorical**（非数値・互いに区別。Spectrum 6-color palette は CVD 最適化。**最大 6 色**）。
- **Sequential**（数値・light→dark。5 palettes: Viridis / Magma / Rose / Cerulean / Forest）。
- **Diverging**（負値や両極 + 中央ベースライン。3 palettes: Orange-yellow-seafoam / Red-yellow-blue / Red-blue）。
- 大きい数ほど暗い色。複数チャート間で色を一貫。categorical を sequential データに使わない（逆も）。

## Data visualization fundamentals
- **3つのゴール**: To explore（パターン発見）/ To monitor（dashboard・leading indicator）/ To explain（"なぜ"）。
- **Metric の scale**: Categorical（順序なし: 国名）/ Ordinal（順序: 順位）/ Interval（意味ある 0 なし: 温度・時刻）/ Ratio（true zero あり: 身長）。
- Dimension（質的値・分類用）/ Bin（連続→離散の等区間）/ Mean・Median・Mode。

## Inclusive design
視覚・色覚・聴覚・運動・集中・理解の差を前提に。最小 web page **320px** まで対応。

- 完璧はないと仮定（context help・エラー予防）/ 適応の余地（十分なターゲット・全要素にラベル・mouse/keyboard/pen/finger/voice/AccessibilityAPI 操作可・最小 320px）/ 選択肢（caption・大フォント・高コントラスト等の OS 設定尊重・**全タスクをキーボードのみで論理順に完了可**）/ 注意散漫を避ける / 一貫性。
- **Animation**: **1 秒に 3 回以上の点滅を避ける**（光感受性発作防止）。
- **Color**: 色/位置だけで参照しない、Adobe Color/色覚 soft-proof でテスト。
- **Fonts/text**: 1ページ1カラム、幅 **80 文字（CJK 40 文字）以内**、line length **最大 50–75 文字**、left-align・justify 回避。
- **Keyboard**: Spectrum 組込み focus を使う、全アクションをキーボードで、論理的 tab order。

## International design
翻訳を超え文化差を踏まえる。約200か国・6500言語。

- **Text expansion**: 長さの異なるテキストを流せるレイアウト。
- **Iconography/metaphor**: ✓/× は文化依存（日本は ✗=不正解、肯定は ○）、実物アイコン（mailbox 等）・ハンドジェスチャ・動物は地域差。**画像/アイコンに文字を埋め込まない**。
- **Imagery**: 服装・宗教/政治・季節（Thanksgiving 等）・慣習に配慮。
- **Colors**: 色で対象を参照しない。色の意味は文化で異なる（赤=西洋で danger/東洋で幸運、white=西洋で純粋/中国で喪）。**どの色も文化横断で一貫した意味を持たない前提**。
- **Typography**: **Adobe Clean** 標準。CJK は字形複雑でやや大きめ・line-height 調整。日本のユーザーは多量・詳細を好む傾向 → modular design。CJK は斜体を多用せず emphasis dots 等。

## Bi-directionality
RTL（Arabic 系・Hebrew 系）向けに UI を mirror する。

- **UI mirroring**: 各コンポーネントを反対側へ。**時間を表すコンポーネントは mirror しない**（ビデオプレーヤー等）。方向性の流れを持つ合成画像は専用 RTL 版。
- **Iconography mirroring**: **動きを表すアイコンは mirror**（back 等）/ **時間経過アイコンは mirror しない**（clock 等）/ **checkmark・slash は決して mirror しない**。

## 出典
spectrum.adobe.com の各ページ: `/page/{motion, object-styles, states, theming, iconography, illustration, using-color, color-for-data-visualization, data-visualization-fundamentals, inclusive-design, international-design, bi-directionality}/`
