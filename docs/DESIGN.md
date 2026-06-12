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

## デザインレビューの観点 —「鮮やかさが足りない」と言われたら

> 結論: 「未熟さ」の正体はパレットではなく、**構図とクローム**。
> 「もう少し鮮やかでも良いかな」と言われる画面の共通点は、色が足りないことではなく、
> **グレーの文字と白地が画面を支配している**こと。S2 はパレット再定義を禁止しているので
> （上記「色」参照）、Adobe 流の解決は「色を足す」ではなく**「写真（コンテンツ）に面積を譲る」**。

レビュー時は次の順で疑う（効果の大きい順）:

1. **コンテンツの専有面積** — カード/タイルの中で写真・プレビューが支配的か。
   メタデータの行数が多いと「グレー文字+白地」が画面を支配して事務的に見える。
   quiet カード化・メタデータ圧縮（タイトル+1要素まで）で写真に面積を返す。
2. **クロームの引き算** — 正常状態（公開中など）にバッジ/ステータスを出さない。
   表示するのは例外状態（下書き・エラー・無料）だけ。AEM Assets も approved に
   バッジを出さない。
3. **彩度は non-semantic Badge で足す** — カテゴリー等の色分け（8 色以内、
   blue は accent と紛らわしいため回避、yellow は割引/無料専用、ラベル併記必須）が
   Spectrum の枠内で「意味のある彩度」を足す唯一の正攻法。
4. **同一機能の重複を消す** — 検索は 1 箇所（ヘッダー）、同義の accent CTA を
   同一ビューに 2 つ置かない。重複は階層を濁し「未整理」に見える。
5. **デモのデータ量** — グリッドがビューポートを満たさない空白は、何よりも雄弁に
   「未完成」と語る。デモ/レビューには十分な件数のモックを用意する。

適用例: `/store/products`（quiet CardView + カテゴリー Badge + ヘッダー検索一本化）。

## アイコン / イラスト

- `@react-spectrum/s2/icons` / `@react-spectrum/s2/illustrations` のみを使う。
  lucide 等の外部アイコンは追加しない。S2 アイコン / イラストの検索は S2 MCP を使う。

## Figma を起点にする場合

- Figma は「構成のイメージ把握」にのみ使う。寸法 / フォント / 色は転記せず、
  S2 のスケール・トークンが正。実装は `react-spectrum-s2` skill の
  「Figma → S2 実装」ガイドに従う。

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
