# Design policy

このプロジェクトのデザインは **React Spectrum S2 (Spectrum 2) 一本**で行う。
Adobe Express 寄せの見た目・独自カラーパレット・React Aria の独立デザイン層は持たない。

## 基本方針

1. **デザインシステムは S2 のみ。** 画面は `@react-spectrum/s2` のコンポーネントで組む。
2. **コンポーネント / トークン / アイコン / イラストは AI 補助で特定する。**
   記憶で API を書かず、必ず次を参照する:
   - `react-spectrum-s2` Agent Skill（`.claude/skills/react-spectrum-s2/`、Adobe 公式）
   - `react-spectrum-s2` MCP サーバー（`.mcp.json` → `@react-spectrum/mcp`）
   - **実ソース（最終的な正）**: `/Users/ryoheiokuma/work/Ours/react-spectrum` は
     本物の `adobe/react-spectrum` モノレポのチェックアウト。トークン・既定 props・
     コンポーネント内部は `packages/@react-spectrum/s2/src/` と `…/style/` で直接確認する。
     app-shell / 商品ページの移植元サンプルは `packages/dev/s2-docs/pages/s2/home/`。読み取り専用。
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

## デザインレビューの観点 —「鮮やかさが足りない」と言われたら

> 結論: 「未熟さ」の正体はパレットではなく、**構図とクローム**。
> 「もう少し鮮やかでも良いかな」と言われる画面の共通点は、色が足りないことではなく、
> **グレーの文字と白地が画面を支配している**こと。S2 はパレット再定義を禁止しているので
> （上記「色」参照）、Adobe 流の解決は「色を足す」ではなく**「写真（コンテンツ）に面積を譲る」**。

レビュー時は次の順で疑う（効果の大きい順）:

1. **コンテンツの専有面積** — カード/タイルの中で写真・プレビューが支配的か。
   メタデータの行数が多いと「グレー文字+白地」が画面を支配して事務的に見える。
   メタデータ圧縮（タイトル+1要素まで）とカードのクローム最小化で写真に面積を返す。
2. **クロームの引き算** — 正常状態（公開中など）にバッジ/ステータスを出さない。
   表示するのは例外状態（下書き・エラー）だけ。無料は価格メタデータの
   プレーンテキスト「無料」で示す（クロームを足さない）。AEM Assets も approved に
   バッジを出さない。
3. **色分けは「色がそれ自体常時必要な情報」の場合のみ** — 写真等のコンテンツが
   彩度を担う画面で色付き Badge を並べると、色は情報ではなく装飾として知覚され
   ノイズになる（Adobe Stock / AEM も種別はプレーンテキスト/アイコン表示）。
   カードの付随メタデータ（価格・日付等）は公式 AssetCard と同じ
   **プレーンテキスト**に寄せる。色付き Badge を常時並べてよいのは、その色が
   **分類の主要軸**として常時意味を持つ場合のみ（本画面の販売形態チップ＝
   下記「色付き要素の使い分け」。販売形態はフィルタの主軸でもある）。それ以外の
   状態表示は例外状態（下書き・エラー等）に限る。non-semantic 色分け（8 色以内、
   blue は accent と紛らわしいため回避、yellow は割引専用）は、色が常時意味を持つ
   画面に限る。
4. **同一機能の重複を消す** — 検索は 1 箇所（ヘッダー）、同義の accent CTA を
   同一ビューに 2 つ置かない。重複は階層を濁し「未整理」に見える。
5. **デモのデータ量** — グリッドがビューポートを満たさない空白は、何よりも雄弁に
   「未完成」と語る。デモ/レビューには十分な件数のモックを用意する。

適用例: `/store/products`（標準カード CardView〔白コンテナ+境界線・チェックボックス選択〕+
例外状態のみ Badge + ヘッダー検索一本化）。

## 色付き要素の使い分け（このプロダクトの正）

衝突を防ぐ本質は「色の割当」ではなく**「形の使い分け」**。
ボタン・チップ・ドットの3形態に役割を固定し、色被り禁止は**同じ形の中だけ**で守る。

| 形 | コンポーネント | 役割 | この画面の割当 |
|---|---|---|---|
| 塗りボタン | Button | アクション | accent 青（新規作成） |
| 塗りチップ | Badge（bold） | 分類メタデータ | **デジタル=`green` / コース=`indigo` / 予約=`orange` / サブスク=`magenta`**（K案・業界連想: green=Shopify/Teachable, indigo=Kajabi の教育青を accent 衝突回避で indigo に, orange=Polaris の期限付き対応, magenta=Patreon/Gumroad のメンバーシップ）。`blue` は accent と紛らわしいため不使用 / `yellow` は割引専用 / `red` は negative 専用。単一定義は `src/features/products/display.tsx` の `SALE_TYPE_BADGE`（カード / テーブル / 詳細 / プレビューで共用）|
| ドット+ラベル | StatusLight | エンティティの状態 | 公開中=`positive`（緑ドット）/ 下書き=`neutral`（灰ドット）。将来: 保留=`notice` / エラー=`negative` |

- 根拠: S2 公式 Card 例は Published を `StatusLight variant="positive"` で表現。
  AEM の公開ステータスもドット系（published=緑）。StatusLight の目的は
  「エンティティの状態」（spectrum.adobe.com）で、Badge の semantic 表に従って
  公開中を青チップにすると accent ボタンと衝突する（Badge 仕様自身が blue 回避を要求）。
- カードのプレビュー上のオーバーレイは**例外状態（下書き等）のみ**。正常状態は無印。
- 形が違えば同系色の併存は許容（チップ=分類、ドット=状態で役割が分かれるため）。
- 同じ状態でも面で形・粒度を変える: グリッドカードは正常状態（公開中）を出さず、例外の
  下書きのみ **プレビュー上に Badge オーバーレイ**で示す（写真主導のカードで状態を控えめに
  載せるため。S2 公式 Gallery 例も CardPreview 上に Badge を重ねる）。テーブルは一覧の
  走査性を優先し、状態列に positive/neutral の StatusLight を常時表示する。「状態＝
  StatusLight」の原則をカードのオーバーレイだけ Badge で破るのは、この意図的な使い分け。

## 操作の手がかり（cursor）

選択・押下できる要素（CardView の Card、TableView の Row、SideNav、Checkbox など）に
`cursor: pointer` は **付けない**。S2 は pointer を**リンク専用**に予約しており、
Card / ListView / Menu / TreeView いずれも `cursor: { default: 'default', isLink: 'pointer' }`
で、選択操作は矢印カーソルのままにするのが Spectrum の仕様。手がかりはホバー背景・
チェックボックス・フォーカスリングで示す。`href` を持つリンク要素だけが pointer になる。

## アイコン / イラスト

- `@react-spectrum/s2/icons` / `@react-spectrum/s2/illustrations` のみを使う。
  lucide 等の外部アイコンは追加しない。S2 アイコン / イラストの検索は S2 MCP を使う。

## Figma を起点にする場合

- Figma は「構成のイメージ把握」にのみ使う。寸法 / フォント / 色は転記せず、
  S2 のスケール・トークンが正。実装は `react-spectrum-s2` skill の
  「Figma → S2 実装」ガイドに従う。

## 過去に捨てた方針（繰り返さない）

これまでの PR で 2 回、別アーキテクチャを作って捨てている。**新しい画面でも繰り返さない**:

- **自前カラートークン層 + 独自 accent（`#007AFF` 等）** — `globals.css` に CSS 変数の
  デザイントークン層を作り Express/Apple 寄せの accent を当てたが撤去。S2 は accent を
  再定義できず二重管理になるため。→ 色は S2 トークンのみ、accent は Spectrum 標準のまま。
- **React Aria Components を独立デザイン層として使う** — 自前 button/chip/status 等を
  RAC + CSS 変数で実装したが撤去。→ 画面は S2 コンポーネントで組み、RAC は「S2 に無い
  部品を S2 公式手法で作るとき」の基盤としてのみ使う。
- **shadcn / Radix / Tailwind / lucide** — 撤去済み・追加禁止。アイコン/イラストは S2。

## 詳細 / 編集フォーム画面の設計原則（`/store/products/[id]`）

調査（旧リポ要件・Adobe(S2) のフォーム実寸・過去 PR の確定判断）を踏まえた、この画面の
**現行デザインで意識し続けること**。作成画面（`/new`）も同じ原則で作る。

- **詳細＝編集フォーム直結**（旧リポ方式）。読み取り専用ビューは別途持たず、開いたら
  そのまま編集できるフォームにする。状態管理は **`react-hook-form` + `zod`** で行う
  （商品名 / 説明 / 価格 / 無料・公開フラグ / カバー画像 / 配信ファイル をすべて RHF 管理下に置く）。
  schema・defaultValues・`useForm` は
  `features/products/ProductDetailContent/hooks/useProductDetailForm.ts` に集約（作成画面で再利用）。
- **構成**は一覧（`ProductsPage` → `ProductsContent`）と同型: `ProductDetailPage`（route エントリ）→
  `ProductDetailContent`（Container）+ `ProductDetailContentUI`（Presentational）+ `components/` + `hooks/`。
- **レイアウト**: 上部に固定のアクションバー（戻り / タイトル / 販売形態 Badge / 公開 StatusLight /
  削除・複製・保存）、その下をスクロール領域に。accent の「保存」は常時見えるよう固定する。
- **フォームは単一カラム**・ラベル上（`labelPosition` 既定 top）。必須/任意は**少数派だけ**マーク。
- **入力部品は S2**: `TextField` / `TextArea` / `NumberField`（価格は
  `formatOptions={{style:'currency',currency:'JPY'}}`）/ `Switch`（公開・無料）/ `DropZone`+`FileTrigger`（ファイル）/
  読み取り値は `LabeledValue`。
- **無料トグルで部品を差し替えない**。`NumberField` を出したまま無料時は `isDisabled` にして高さを固定する
  （差し替えると行の高さが変わり画面がガタつくため）。
- **影はフォーム入力パネルに付けない**（影は一時 UI と「コンテンツのカード」=プレビューに限る）。
- **削除は破壊的扱い**を「色」でなく「確認ステップ」で表す。`AlertDialog variant="destructive"` で確認。
- **二重スクロールを作らない（重要）**: app-shell の content 領域は `overflow:auto`、その親
  `[data-container]`（`AppShellUI`）は `overflow:hidden` で **document 自体はスクロールさせない**。
  ページ内スクロールは**1 本だけ**に保ち、`overflow:auto` を入れ子で増やさない。

## プレビュー（ストアでの見え方をライブ表示）

- **左フォーム / 右プレビューの 2 カラム**。右カラムは `position: sticky; top: 0; alignSelf: start` で
  追従させ、**スクロール軸は左フォームと同じ 1 本**に保つ（プレビュー側に `overflow:auto` を足さない）。
  狭幅（`< lg` = 1024px）では縦積みにして sticky 解除、プレビューをフォーム下に。
- **一覧カードの見え方に寄せる**: カバー画像（無い時はイラスト）/ 商品名 / 販売形態チップ / 価格 /
  公開 StatusLight / 説明の抜粋。`SALE_TYPE_BADGE`・`formatPrice`・`THUMB_HUE` を**再利用**し、
  `useWatch`（FormProvider 配下）で RHF 値をライブ反映する。
- **プレビューカードはソフト影/境界を許容**（入力パネルと違い「コンテンツのカード」の再現なので、
  一覧カードと同じ面の出し方にするのが一貫性として正しい）。raw な影は当てない。

## カバー画像 / アップロードのイラスト（generic2・種別固定）

- **ファイルアップロードの DropZone** は `@react-spectrum/s2/illustrations/gradient/generic2/CloudUpload`
  を使う（generic1 ではなく generic2）。
- **カバー画像が未設定のときのプレースホルダ**は generic2 のイラストを**販売形態で固定**する
  （ランダムにしない）。単一定義は `display.tsx` の `COVER_ILLUSTRATION`:
  デジタル=`FileText` / コース=`Education` / 予約=`Calendar` / サブスク=`CardTapPayment`。

## bulk 選択時のアクションバー（一覧 `/store/products`）

- S2 の **`ActionBar`** を `CardView` / `TableView` の `renderActionBar` で共用する。
  **件数表示・選択解除・Escape・読み上げは S2 が Context 経由で自動注入する**ので、
  `selectedItemCount` / `onClearSelection` や「N 件選択」テキストを**手書きしない**。
- アクションは行メニューと語彙を揃える: **複製 / 公開する / 下書きに戻す / 削除**
  （編集は単一対象の操作なので bulk に入れない）。並びは **安全 → 状態遷移ペア → 破壊的**、削除は末尾。
  アイコンは `Duplicate` / `Publish` / `Revert` / `Delete`。各 `ActionButton` に `aria-label` を付ける。
- ActionBar 内のボタンは**色を持てない**（quiet 固定）。**削除を赤ボタンにしない**。破壊的扱いは
  押下後の `AlertDialog variant="destructive"` で担保する。`isEmphasized`（青背景）で選択モードを明示。

---

# Styling — `style` macro リファレンス

出典: React Spectrum 公式 Styling（https://react-spectrum.adobe.com/styling）。
S2 のスタイルはこの `style` macro で当てる。以下はこのリポで従う規約。

## style macro の基本

ビルド時に走り、Spectrum 2 のデザイントークン（色・余白・サイズ・タイポ等）を
適用したクラス名を返す。

```tsx
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};

<div className={style({backgroundColor: 'red-400', color: 'white'})}>
  {/* ... */}
</div>
```

出力は atomic（プロパティ/値ペアごとに 1 度だけ生成・再利用）でバンドルが小さく保たれる。
スタイルをコンポーネントと同居でき、コンポーネントを消すとスタイルも消える。

> 注意: atomic な性質上、後述の「CSS 最適化」（バンドル + minify）を必ず行う。

## Spectrum コンポーネントの `styles` prop

S2 コンポーネントの `styles` prop は **レイアウト系プロパティのみ**受ける。
**色や内部 padding はコンポーネント内ではカスタムできない。**

```tsx
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};
import {Button} from '@react-spectrum/s2/Button';

<Button styles={style({marginStart: 8})}>Edit</Button>
```

許容プロパティ: `margin` / `marginStart` / `marginEnd` / `marginTop` / `marginBottom` /
`marginX` / `marginY` / `width` / `minWidth` / `maxWidth` / `flexGrow` / `flexShrink` /
`flexBasis` / `justifySelf` / `alignSelf` / `order` / `gridArea` / `gridRow` /
`gridRowStart` / `gridRowEnd` / `gridColumn` / `gridColumnStart` / `gridColumnEnd` /
`position` / `zIndex` / `top` / `bottom` / `inset` / `insetX` / `insetY` /
`insetStart` / `insetEnd` / `visibility`

## 条件付きスタイル

メディアクエリ・UI 状態（hover / press 等）・variant をオブジェクトで定義する。
条件は排他で、**最後に一致したものが勝つ**。

```tsx
<div
  className={style({
    padding: {
      default: 8,
      lg: 32,
      '@media (min-width: 2560px)': 64
    }
  })}
/>
```

上記は「ビューポート > 2560px → 64px / `lg`（1024px）→ 32px / それ以外 → 8px」。
macro は CSS cascade layers を使うため、特異度の問題なく「最後の一致が勝つ」。

### Runtime conditions

variant や UI 状態など実行時条件があると、macro は **関数**を返す。

```tsx
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};

const styles = style({
  backgroundColor: {
    variant: {
      primary: 'accent',
      secondary: 'neutral'
    }
  }
});

function MyComponent({variant}: {variant: 'primary' | 'secondary'}) {
  return <div className={styles({variant})} />
}
```

`is` / `allows` で始まる boolean 条件はネスト無しで直接使える。

```tsx
const styles = style({
  backgroundColor: {
    default: 'gray-100',
    isSelected: 'gray-900',
    allowsRemoving: 'gray-400'
  }
});

<div className={styles({isSelected: true})} />
```

React Aria Components の render props と相性が良い（インラインで書くと条件が補完される）。

```tsx
import {Checkbox} from 'react-aria-components/Checkbox';
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};

<Checkbox
  className={style({
    backgroundColor: {
      default: 'gray-100',
      isHovered: 'gray-200',
      isSelected: 'gray-900'
    }
  })}
/>
```

### ネスト

複数条件が真のときのスタイルはネストで書く。同階層は排他・順序で優先度が決まる。

```tsx
const styles = style({
  backgroundColor: {
    default: 'gray-25',
    isSelected: {
      default: 'neutral',
      isEmphasized: 'accent',
      forcedColors: 'Highlight',
      isDisabled: {
        default: 'gray-400',
        forcedColors: 'GrayText'
      }
    }
  }
});

<div className={styles({isSelected, isEmphasized, isDisabled})} />
```

## スタイルの再利用

同一ファイル内は定数に括って spread する。

```tsx
// component.tsx
const horizontalStack = {
  display: 'flex',
  alignItems: 'center',
  columnGap: 8
} as const;

const styles = style({
  ...horizontalStack,
  columnGap: 4
});
```

別ファイルの自作 macro 関数としても切り出せる。

```ts
// style-utils.ts
export function horizontalStack(gap: number) {
  return {
    display: 'flex',
    alignItems: 'center',
    columnGap: gap
  } as const;
}
```

```tsx
// component.tsx
import {horizontalStack} from './style-utils' with {type: 'macro'};
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};

const styles = style({
  ...horizontalStack(4),
  backgroundColor: 'base'
});
```

## 組み込みユーティリティ

focus ring・color helper・spacing・sizing・animation 等の組み込みがある。
例として `focusRing()` で標準の Spectrum フォーカスリングを付与できる。

```tsx
import {style, focusRing} from '@react-spectrum/s2/style' with {type: 'macro'};
import {Button} from 'react-aria-components/Button';

const buttonStyle = style({
  ...focusRing(),
  // ...other styles
});

<Button className={buttonStyle}>Press me</Button>
```

## CSS 変数の定義

`style` macro 内で CSS 変数を定義し、子要素から参照できる。`type` で CSS プロパティ型を指定する。

```tsx
const parentStyle = style({
  '--rowBackgroundColor': {
    type: 'backgroundColor',
    value: 'gray-400'
  }
});

const childStyle = style({
  backgroundColor: '--rowBackgroundColor'
});
```

## CSS 最適化

`style` macro は CSS のバンドル + minify を前提に最適出力する。

- ランタイムで `<style>` 注入せず、CSS バンドルに抽出する。
- `lightningcss` 等の minifier で重複ルールを除去する。
- S2 コンポーネント + style macro の CSS は **単一バンドルにまとめる**（チャンク分割で重複させない）。
- → 本リポは `next.config.ts` の `s2-styles` splitChunks グループでこれを担保している。

## CSS リセット（このリポの設定）

CSS リセットは非推奨。S2 は CSS Cascade Layers を使うため、
**`@layer` の外のグローバル CSS は S2 の CSS を上書きしてしまう**。
リセットがどうしても要るなら、S2 が使う `_` レイヤより前に自分のレイヤを宣言し、その中に入れる。

```css
/* App.css */
@layer reset, _;
@import "reset.css" layer(reset);
```

→ 本リポの `src/app/globals.css` はこの方針に従い、`body { margin: 0 }` を
`@layer reset`（`_` より前に宣言）に隔離している。グローバルな素の CSS は足さない。

## カスタムコンポーネント

S2 に無い部品は、`style` macro + React Aria Components で Spectrum スタイルに沿って作る。

```tsx
import {Checkbox} from 'react-aria-components/Checkbox';
import {style} from '@react-spectrum/s2/style' with {type: 'macro'};

<Checkbox
  className={style({
    backgroundColor: {
      default: 'gray-100',
      isHovered: 'gray-200',
      isSelected: 'gray-900'
    }
  })}
/>
```

## 開発ツール

- [atomic-css-devtools](https://github.com/astahmer/atomic-css-devtools) 拡張: atomic CSS を非 atomic 表示で確認できる。
- S2 + React Aria Components + style macro をプリセットした [sandbox](https://codesandbox.io/p/devbox/react-spectrum-s2-style-macro-template-h6fpsq)。
- MCP サーバー / Agent Skill のインストールは S2 docs の「Working with AI」を参照。

---

# ビルド / 結線（参考）

- ビルドは webpack（S2 macro が Turbopack 非対応）。`next.config.ts` の macro plugin +
  `s2-styles` splitChunks を維持する。
- S2 コンポーネントは client-only（使うファイルは `"use client";`）。barrel ではなく
  subpath import（`@react-spectrum/s2/Button` など）。
- Provider / layout は結線済み（`src/app/provider.tsx` / `src/app/layout.tsx`）。
- `src/app/globals.css` は base reset（`@layer reset` に隔離）のみの最小スタブ。
  デザイントークンは置かない。
