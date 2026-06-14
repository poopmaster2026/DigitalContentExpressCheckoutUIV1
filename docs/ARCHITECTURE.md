# アーキテクチャガイド

> **このリポジトリ向けの調整メモ**: 本ドキュメントは旧リポ
> `../DigitalContentExpressCheckoutUI/docs/ARCHITECTURE.md` を移植したもの。
> **設計骨格**（`app` / `features` / `shared` / `lib` の層分け・依存方向・
> `queries` / `actions` / `hooks` / `utils` / `types` の責務分離・Container/Presentational・
> UI 4 状態・queryKey ファクトリ・Mutation 規約）は旧リポを踏襲する。
> ただし**デザイン系は全面的に本リポに合わせて差し替え済み**:
>
> | 観点 | 旧リポ | 本リポ（V1） |
> | --- | --- | --- |
> | デザインシステム | shadcn/ui | **React Spectrum S2（`@react-spectrum/s2`）一本** |
> | スタイリング | Tailwind `className` + `cn()` | **`style()` macro + S2 トークン名のみ**（raw hex 禁止） |
> | ファイル名 | PascalCase（`ProductsPage.tsx`） | **kebab-case（`products-page.tsx`）** / export は PascalCase |
> | UI 検証 | Storybook + Vitest | **`npm run build` + `npm run lint`**（Storybook/Vitest 不使用） |
> | Figma 翻訳 | Figma Auto Layout → Tailwind class 表 | **Figma は構成把握のみ。寸法/色は S2 スケール+トークンが正** |
> | データ層 | Supabase | backend 非依存の `api/`（fetch）+ TanStack Query。**現状は mock 直読み（Phase 0）** |
>
> デザイン方針の正は [docs/DESIGN.md](./DESIGN.md)、Spectrum の設計思想は
> [docs/SPECTRUM-GUIDELINES.md](./SPECTRUM-GUIDELINES.md) と [docs/spectrum/](./spectrum/)。
> 技術スタック / ハード制約は [CLAUDE.md](../CLAUDE.md) を参照。

## ディレクトリ構成（詳細）

```
src/
├── app/                          # Next.js App Router（ルーティング定義のみ）
│   ├── layout.tsx                # ルートレイアウト（locale はサーバ側で解決）
│   ├── provider.tsx              # <Provider elementType="html"> + App Router ナビゲーション結線
│   ├── globals.css               # base reset のみ（@layer reset に隔離）。デザイントークンは持たない
│   ├── page.tsx                  # トップ
│   └── store/
│       ├── layout.tsx            # ストア配下の共通レイアウト（app-shell）
│       └── products/
│           └── page.tsx          # 商品一覧画面（features を呼ぶだけ）
│
├── features/                     # 機能単位のモジュール
│   └── products/                 # デジタルコンテンツ（商品）
│
├── shared/                       # 複数 feature をまたいで使う共通物
│   ├── components/
│   │   └── app-shell/            # アプリ外枠（sidebar / account-menu / notifications 等）
│   ├── providers/
│   │   └── query-provider.tsx    # TanStack Query Provider（layout 結線済み）
│   ├── types/
│   │   └── product.ts            # ドメイン基本型（feature から再エクスポート）
│   └── mock/                     # モックデータ（Phase 0 で Container が直読み）
│       ├── products.ts
│       └── notifications.ts
│
└── lib/                          # ライブラリ設定
    └── query-client.ts           # QueryClient 設定（実 API 接続時に本格利用）
```

> **Phase 0（mock 段階）の注意**: TanStack Query は結線済みだが**意図的に未使用**。
> 各 Container（`ProductsPage` 等）は `@/shared/mock/*` を直接読む。実 API 接続時に
> `features/{feature}/api` + `queries`（`queryOptions` + `useQuery`）へ差し替える。
> 未使用は見落としではない（[CLAUDE.md](../CLAUDE.md) の Status 参照）。

## feature モジュール内構成

feature は**小さいうちは flat**に保ち、規模に応じてサブディレクトリへ分割する。
本リポの `products` は現状 flat 寄り。データ層が入る将来形を含めた完全版は次の通り:

```
features/{feature}/
├── {helper}.ts(x)               # feature 直下の単機能ヘルパ（表示マップ・整形・ドメイン関数）
│                                #   例: format.ts（純粋整形）/ display.tsx（表示トークンの単一定義）/ product-menu.ts
│                                #   ※「メニュー項目生成」等の UI ヘルパは product-menu.ts。
│                                #     product-actions.ts は actions/ の Server Actions 専用名なので root に置かない
├── types.ts                     # この feature の型（shared/types を再エクスポート + feature 固有型）
├── api/                         # データアクセス層（fetch ベース。モック → 実 API 差し替え対象）
│   └── {feature}-api.ts
├── queries/                     # TanStack Query の queryOptions + queryKey ファクトリ
│   ├── {feature}-queries.ts
│   └── {feature}-keys.ts
├── actions/                     # Server Actions（'use server'）
│   └── {feature}-actions.ts
├── hooks/                       # この feature 専用フック（impure なロジック）
│   └── use-{feature}.ts
└── {page-name}/                 # ページ単位のディレクトリ
    ├── {page-name}.tsx          # ページ Container（状態・データ取得・組み立て）
    ├── {page-name}-skeleton.tsx # ローディング表示（Skeleton）
    ├── utils.ts                 # ページ固有の純粋ロジック（計算・変換・フィルタ）
    └── {section}.tsx            # セクション（Presentational。props で描画）
```

### 本リポの実例（`features/products/`）

```
features/products/
├── types.ts                     # shared/types/product の再エクスポート + ProductFilters
├── format.ts                    # 価格・売上の表示整形（純粋関数。JSX なし）
├── display.tsx                  # 表示トークンの単一定義: SALE_TYPE_BADGE / THUMB_HUE / KIND_ICON / KIND_ILLUSTRATION（"use client"）
├── product-menu.ts              # 操作メニュー項目の生成（カード/テーブル共用）
└── products-page/
    ├── products-page.tsx        # Container（state + mock 読み + view 切替）
    ├── utils.ts                 # filterProducts / isFiltered / compareProducts（純粋）
    ├── products-card-view.tsx   # セクション: グリッド（CardView）
    ├── products-table.tsx       # セクション: テーブル（TableView）
    ├── products-action-bar.tsx  # セクション: 選択時のアクションバー
    └── products-empty-state.tsx # セクション: 空状態（IllustratedMessage）
```

### 各ディレクトリ / ファイルの配置基準

| 配置先                   | 配置するもの                                      | 配置しないもの            |
| ------------------------ | ------------------------------------------------- | ------------------------- |
| `{helper}.ts(x)`（直下） | 表示マップ・整形・ドメイン関数（単機能）          | UI コンポーネント、ページ状態 |
| `api/`                   | データ取得関数（モック / 実 API。fetch ベース）   | UI コンポーネント、型定義 |
| `types.ts`               | feature 固有の interface / type、shared 型の再エクスポート | ロジック、関数定義 |
| `hooks/`                 | impure なカスタムフック（`useState`, `useRouter` 等） | 純粋な計算ロジック    |
| `queries/`               | `queryOptions` 定義、queryKey ファクトリ          | UI ロジック、型定義       |
| `actions/`               | Server Actions                                    | データ取得（Query 側）    |
| `{page-name}/{page-name}.tsx` | ページ Container（状態・取得・組み立て）     | 純粋な計算ロジック        |
| `{page-name}/utils.ts`   | 純粋な計算・変換・フィルタ・ソート比較            | データ取得、副作用        |
| `{page-name}/{section}.tsx` | props で描画するセクション（Presentational）   | feature レベルの型定義    |

### types と utils の分離ガイド

- **`types.ts`**: 「何であるか」を定義する。interface, type alias, enum。
  ドメイン基本型は `shared/types/` に置き、feature の `types.ts` から再エクスポートして
  依存方向（`app → features → shared`）を保つ。
- **`utils.ts`**: 「何をするか」を定義する。計算関数、変換関数、フィルタリング、ソート比較。

```typescript
// features/products/types.ts — 「何であるか」（shared 型の再エクスポート + 固有型）
export type { Product, ProductStatus, SaleType } from "@/shared/types/product";
export interface ProductFilters {
  status: Key;
  saleType: Key;
  query: string;
}

// features/products/products-page/utils.ts — 「何をするか」（純粋関数）
export function filterProducts(products: Product[], f: ProductFilters): Product[] { ... }
export function compareProducts(a: Product, b: Product, column: SortDescriptor["column"]): number { ... }
```

### hooks の設計指針

hooks にはビジネスロジック（impure な副作用を伴う処理）を配置する。純粋な計算ロジックは
`utils.ts` に分離する。

| 配置先     | 内容                                             | 例                                       |
| ---------- | ------------------------------------------------ | ---------------------------------------- |
| `hooks/`   | `useState`, `useRouter`, `useSearchParams` を使うロジック | `useAuthForm`, `useDateFilter`   |
| `utils.ts` | 入力 → 出力の純粋な計算・変換関数               | `filterProducts`, `compareProducts`      |

**hooks に含めるもの:**

- フォーム状態管理（`useState` / `react-hook-form` + バリデーション + Server Action 呼び出し）
- URL 状態管理（`useSearchParams` + `useRouter`）
- mutation のトリガーと UI フィードバック（toast 表示、ダイアログ制御）

**hooks に含めないもの:**

- 配列の集計・フィルタリング・ソート → `utils.ts`
- 日付フォーマット・通貨フォーマット → `{helper}.ts` / `shared/utils/`
- DTO → ViewModel の変換 → `utils.ts` または `queries/` の `select`

> 単純なローカル状態（タブ切替・フィルタ選択など）だけなら Container 内に直接 `useState`
> で持つ（本リポの `ProductsPage` がこの形）。専用 hook に切り出すのは、ロジックが
> 複数コンポーネントで再利用される / テスト容易性のために分離したいときだけ。

## コンポーネントパターン

### Container / Presentational パターン

**Container（`{page-name}.tsx` / `{section}.tsx` のうちロジックを持つもの）**

- データ取得（mock 直読み → 将来 `useQuery`）
- ローカル状態（`useState`：フィルタ・選択・ソート・view 切替）
- mutations（`useMutation`）・URL 同期（`useSearchParams`, `useRouter`）
- Presentational / セクションへのデータ受け渡し

```tsx
// features/products/products-page/products-page.tsx（抜粋）
"use client";

import { useMemo, useState } from "react";
import { PRODUCTS } from "@/shared/mock/products";       // Phase 0: mock 直読み
import { filterProducts } from "./utils";
import { ProductsCardView } from "./products-card-view";
import { ProductsTable } from "./products-table";

export function ProductsPage() {
  const [view, setView] = useState<Key>("grid");
  const products = useMemo(() => filterProducts(PRODUCTS, { /* ... */ }), [/* ... */]);
  return view === "grid"
    ? <ProductsCardView products={products} isFiltered={/* ... */} />
    : <ProductsTable products={products} isFiltered={/* ... */} />;
}
```

**Presentational（セクション）**

- props のみで描画する。データ取得は持たない。
- 本リポでは `UI` サフィックスは付けない。`{section}.tsx`（例: `products-table.tsx`）の単位で、
  S2 コンポーネント（`TableView` / `CardView` 等）に props を流し込む。

```tsx
// features/products/products-page/products-table.tsx（抜粋）
"use client";

export function ProductsTable({ products, isFiltered }: {
  products: Product[];
  isFiltered: boolean;
}) {
  // S2 の TableView に行データを流すだけ。状態は Container（ProductsPage）が持つ
  return <TableView aria-label="商品一覧" /* ... */>{/* rows */}</TableView>;
}
```

> **旧リポとの違い**: 旧リポは Container を `Xxx.tsx`、ペアの Presentational を `XxxUI.tsx`
> として 1:1 で分けていた。本リポは S2 コンポーネント自体が表示責務を強く持つため、
> セクション = props 駆動の `{section}.tsx` として置き、`UI` サフィックスは付けない。
> セクション内のローカル UI 状態（テーブルの `sortDescriptor`、グリッドの選択など、
> その表示にしか使わない state）はセクション側に持ってよい。

### セクションの分割と共有

- セクションが大きくなったら、意味のある単位で別ファイルのセクションに切り出す
  （目安: 1 ファイルが読みにくくなる / 同じ UI 部品を複数箇所で再利用したいとき）。
- **ページ内セクション間の共有部品は、共有元のセクションを直接 import してよい**
  （例: `products-table.tsx` と `products-card-view.tsx` がともに
  `products-action-bar.tsx` / `products-empty-state.tsx` を使う）。
- **feature をまたぐ共有は禁止**。複数 feature で使う部品は `shared/components/` に置く。
- 種別マップ・整形・操作項目など**表示ロジックの単一定義**は feature 直下のヘルパ
  （`display.tsx` / `format.ts` / `product-menu.ts`）に集約し、
  カード枝・テーブル枝の両方から参照して**表現のブレを防ぐ**。

### Skeleton コンポーネントパターン

`useSuspenseQuery` を使う段階になると `<Suspense>` の fallback にローディング UI が要る。
Skeleton はページ / セクション単位で作り、対象の直下に置く。

```
features/{feature}/{page-name}/
├── {page-name}.tsx
├── {page-name}-skeleton.tsx     # ← ページ単位の Skeleton
└── {section}.tsx
```

Skeleton は **S2 の Skeleton プリミティブ**で組む（`@react-spectrum/s2` の Skeleton 系。
正確な API は `react-spectrum-s2` skill / MCP で確認。**記憶で書かない**）。実レイアウトに
合わせた形状（テキスト幅・カード数）にする。スタイルは `style()` macro + S2 トークンのみ。

### UI 状態の網羅（Default / Empty / Loading / Error）

データ依存 UI は **4 状態を常に意識する**。状態ごとに「どこで分岐するか」を統一する。

| 状態 | 何が表示されるか | 責務の所在（本リポ） |
| --- | --- | --- |
| **Default** | データが 1 件以上ある通常表示 | セクション（props で受け取る） |
| **Empty** | データが空（`length === 0`） | S2 コレクションの `renderEmptyState`（`TableView` / `CardView`）。共通の空状態は `{feature}/{page}/{...}-empty-state.tsx` に切り出す |
| **Loading** | データ取得中 | **Container の外側で `<Suspense fallback={<XxxSkeleton />}>`**（Phase 0 の mock 段階では同期描画のため不要） |
| **Error** | データ取得失敗 | **route segment の `error.tsx`**、または Container の外側で ErrorBoundary |

**ルール:**

- **Empty は表示側の責務** — S2 の `TableView` / `CardView` は `renderEmptyState` を持つ。
  本リポは `renderEmptyState={() => <ProductsEmptyState isFiltered={...} />}` で空状態を出し、
  `ProductsEmptyState` は S2 の `IllustratedMessage`（`Heading` / `Content` + illustration）で組む。
- **Loading は Skeleton で表現** — `useSuspenseQuery` 採用時、`<Suspense>` の fallback に切替。
  セクション内に `isLoading` 分岐を作らない。
- **Error は外側で扱う** — `useSuspenseQuery` のエラーは throw され、`error.tsx` / ErrorBoundary
  がキャッチする。セクション内に `isError` 分岐を作らない。

```tsx
// ❌ NG: isLoading / isError を表示セクションに持ち込む（取得層と密結合する）
export function ProductsTable({ products, isLoading, isError }: Props) {
  if (isLoading) return <Skeleton />;
  if (isError) return <ErrorBanner />;
  // ...
}

// ✅ OK: Empty は renderEmptyState、Loading/Error は外側
export function ProductsTable({ products, isFiltered }: Props) {
  return (
    <TableView renderEmptyState={() => <ProductsEmptyState isFiltered={isFiltered} />}>
      {/* rows */}
    </TableView>
  );
}
```

## スタイリング規約

### React Spectrum S2 + `style()` macro

スタイリングの正は [docs/DESIGN.md](./DESIGN.md)。要点のみ:

- **`style()` macro + S2 トークン名のみ**。raw hex のベタ書き禁止。Tailwind / shadcn / `cn()` /
  CSS Modules / SCSS は不使用。自前のデザイントークン層（CSS 変数）を作らない。
- **モジュール先頭で `style()` を定数に括る**。コンポーネント JSX では生成済みクラス名を
  `className` に渡す。S2 コンポーネントへは**レイアウト系のみ**を `styles` prop で渡す
  （色・内部 padding はコンポーネント内ではカスタム不可。許容プロパティは DESIGN.md 参照）。

```tsx
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

const page = style({ display: "flex", flexDirection: "column", gap: 8, flexGrow: 1, minHeight: 0 });
const boldText = style({ fontWeight: "bold" });

<div className={page}>
  <span className={boldText}>{name}</span>
</div>
```

- **条件付きスタイル**は `cn()` ではなく `style()` の条件オブジェクト（`default` / `isHovered` /
  `isSelected` / variant 等。最後に一致したものが勝つ）か、生成済みクラス名の**テンプレート
  連結**で表現する。

```tsx
// 静的クラス + 動的に選ぶクラスのテンプレート連結（本リポ products-table の手法）
<div className={`${thumbBase} ${THUMB_HUE[p.thumb]}`}>...</div>

// 状態でのスタイル分岐は style() の条件オブジェクト（runtime condition は関数を返す）
const styles = style({
  backgroundColor: { default: "gray-100", isHovered: "gray-200", isSelected: "gray-900" },
});
<div className={styles({ isSelected })} />
```

- アイコンの色は `iconStyle({ color: ... })`、illustration は S2 の illustration を使う。
  外部アイコン（lucide 等）は追加しない。アイコン / イラストの検索は S2 MCP。

### コンポーネント / トークン / アイコンの調べ方

**記憶で S2 の API を書かない。** 必ず次で特定する（[CLAUDE.md](../CLAUDE.md) のハード制約）:

- `react-spectrum-s2` Agent Skill（`.claude/skills/react-spectrum-s2/`、Adobe 公式）
- `react-spectrum-s2` MCP サーバー（`.mcp.json` → `@react-spectrum/mcp`）
- **実ソース（最終的な正）**: `/Users/ryoheiokuma/work/Ours/react-spectrum`（`adobe/react-spectrum`
  のチェックアウト）。トークン・既定 props・内部実装は `packages/@react-spectrum/s2/src/` と
  `…/style/` で直接確認。**読み取り専用**。
- S2 コンポーネントは **client-only**（使うファイルは `"use client";`）。**barrel ではなく
  subpath import**（`@react-spectrum/s2/Button` など）。

### Figma を起点にする場合

- Figma は **構成のイメージ把握にのみ**使う。寸法 / フォント / 色は転記せず、**S2 のスケール・
  トークンが正**。4px グリッド外の任意値や raw hex を持ち込まない。
- 実装は `react-spectrum-s2` skill の「Figma → S2 実装」ガイドに従う。

## 依存関係ルール

```
app → features → shared
         ↓
        lib
```

- `app/` は `features/` と `shared/` を import する（ルーティングと組み立てのみ）。
- `features/` は `shared/` と `lib/` を import する。
- **`features/` 間の直接 import は禁止**（共通部分は `shared/` に）。
- `shared/` は `lib/` のみ import 可能。

## 命名規則

| 対象                   | 規則                               | 例                                       |
| ---------------------- | ---------------------------------- | ---------------------------------------- |
| ディレクトリ           | kebab-case                         | `products-page/`, `app-shell/`           |
| ファイル（全般）       | **kebab-case**                     | `products-page.tsx`, `product-menu.ts`, `query-client.ts` |
| コンポーネントの export | PascalCase                        | `export function ProductsPage()`         |
| 関数 / 変数            | camelCase                          | `filterProducts`, `formatPrice`          |
| 型 / interface         | PascalCase                         | `Product`, `ProductFilters`              |
| 定数マップ             | UPPER_SNAKE                        | `SALE_TYPE_BADGE`, `KIND_ICON`           |
| hooks                  | kebab-case ファイル / `use` prefix export | `use-product-form.ts` → `useProductForm` |

> **旧リポとの違い**: 旧リポはコンポーネントファイルを PascalCase（`ProductsPage.tsx`）に
> していたが、本リポは**ファイル名を一律 kebab-case** に統一し、**export だけ PascalCase**。

## app/ ディレクトリのルール

`app/` はルーティング定義と最小の組み立てのみ。ロジックや UI は `features/` に置く。
`<html>` を手で描画しない（`provider.tsx` の `<Provider elementType="html">` が担う）。

```tsx
// app/store/products/page.tsx
import { ProductsPage } from "@/features/products/products-page/products-page";

export default function Page() {
  return <ProductsPage />;
}
```

## shared モジュール構成

`shared/` には複数の feature をまたいで使うものを配置する。特定 feature にしか使わない
ものは `features/{feature}/` に置く。

```
shared/
├── components/
│   └── app-shell/                # アプリ外枠（sidebar / account-menu / notifications / search-context）
├── providers/
│   └── query-provider.tsx        # TanStack Query Provider（layout 結線済み）
├── types/
│   └── product.ts                # ドメイン基本型（feature が再エクスポート）
└── mock/                         # 開発用モック（Phase 0 で Container が直読み）
    ├── products.ts
    └── notifications.ts
```

> 旧リポにあった `shared/components/ui/`（shadcn 生成物）は**存在しない**。汎用 UI プリミティブは
> S2 コンポーネントをそのまま使う。S2 に無い部品だけ、S2 公式手法（`style()` macro +
> React Aria Components）で作る（DESIGN.md「カスタムコンポーネント」参照）。
> `shared/utils/` / `shared/hooks/` は必要になった時点で追加する（複数 feature 共通の
> フォーマッタ・フックの置き場）。

## queries/ ディレクトリの設計規約（実 API 接続フェーズ）

> Phase 0（mock）では未使用。実 API に繋ぐ段階で `api/` + `queries/` を起こす。

### queries/ に含めるもの・含めないもの

| 含めるもの                              | 含めないもの                                 |
| --------------------------------------- | -------------------------------------------- |
| `queryOptions` 定義                     | React コンポーネント                         |
| queryKey ファクトリ（`xxxKeys`）        | UI に関するロジック（toast、モーダル制御等） |
| API fetch 関数（`fetchXxx`）            | Mutation 定義（→ Container 側に配置）        |
| `select` による DTO → ViewModel 変換    | Server Actions（→ `actions/` に配置）        |

### queryKey ファクトリパターン

queryKey は階層構造のファクトリで管理する。手書きの文字列配列は禁止。

```typescript
// queries/product-keys.ts
export const productKeys = {
  all: ["products"] as const,
  list: (storeId: string) => [...productKeys.all, "list", storeId] as const,
  detail: (productId: string) => [...productKeys.all, "detail", productId] as const,
};
```

| ルール | 理由 |
| --- | --- |
| `as const` で型を固定する | 型推論の精度向上、IDE 補完の改善 |
| パラメータを queryKey に含める | パラメータが変わればキャッシュが分離される |
| ファクトリ関数で生成する | `invalidateQueries` で部分一致（`productKeys.all`）が使える |
| 手書きの `["products", id]` は禁止 | タイポ防止、一箇所で管理 |

### queryOptions 定義パターン

```typescript
// queries/product-queries.ts
import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import type { Product } from "../types";
import { productKeys } from "./product-keys";

async function fetchProducts(storeId: string): Promise<Product[]> {
  return apiClient.get<Product[]>(`/stores/${storeId}/products`);
}

export function productListQueryOptions(storeId: string) {
  return queryOptions({
    queryKey: productKeys.list(storeId),
    queryFn: () => fetchProducts(storeId),
    staleTime: 5 * 60 * 1000, // 5分
  });
}
```

| ルール | 理由 |
| --- | --- |
| `queryOptions()` でラップして export する | 型推論が効く、`useSuspenseQuery` にスプレッドできる |
| `queryKey` は queryKey ファクトリを使う | キー管理の一元化 |
| `staleTime` を明示する（デフォルト: 5分） | 意図しない再フェッチを防ぐ |
| `queryFn` 内で `if (error) throw error` する | ErrorBoundary / `error.tsx` でエラーをキャッチするため |
| fetch のパラメータは引数で受け取る | Server/Client 両方で同じ queryOptions を使えるため |

### select による DTO → ViewModel 変換

API が返す snake_case を、コンポーネントが使う ViewModel に変換する場合は `select` を使う。

```typescript
function toOrderSummary(row: OrderRow): OrderSummary {
  return { id: row.id, buyerEmail: row.buyer_email, amount: row.amount, createdAt: new Date(row.created_at) };
}

export function orderListQueryOptions(storeId: string) {
  return queryOptions({
    queryKey: orderKeys.list(storeId),
    queryFn: () => apiClient.get<OrderRow[]>(`/stores/${storeId}/orders`),
    select: (rows) => rows.map(toOrderSummary), // キャッシュは生データ、消費側で変換
  });
}
```

**理由:** キャッシュには生 DTO が残るので、同じ API から詳細用・サマリー用の ViewModel を
作り分けでき、変換関数の差し替えも容易。

## Mutation パターン（Server Actions + useMutation）

Server Actions を `useMutation` でラップして使う。UI フィードバックは **S2 の toast**
（API は `react-spectrum-s2` skill / MCP で確認。**記憶で書かない**）で出す。

```tsx
// Container 内
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: (values: FormValues) => createProductAction(values),
  onSuccess: (result) => {
    if (result.success) {
      void queryClient.invalidateQueries({ queryKey: productKeys.list(storeId) });
      // S2 の toast で成功表示
      handleClose();
    } else {
      // result.error を S2 の toast（negative）で表示
    }
  },
  onError: () => {
    // ネットワークエラー等の汎用フォールバックを S2 の toast で表示
  },
});
```

### Server Action の戻り値規約

Server Actions は常に `ActionResult` を返す。HTTP エラーではなく結果オブジェクトで成否を判定する。

```typescript
// shared/types/action.ts
export type ActionResult =
  | { success: true; data?: unknown }
  | { success: false; error: string };
```

```typescript
// actions/product-actions.ts
"use server";

export async function createProductAction(input: CreateProductInput): Promise<ActionResult> {
  try {
    await apiClient.post("/products", input);
    return { success: true };
  } catch {
    return { success: false, error: "データの登録に失敗しました" };
  }
}
```

### onSuccess に含めるもの・含めないもの

| 含めるもの | 含めないもの |
| --- | --- |
| `invalidateQueries` によるキャッシュ無効化 | 別の API 呼び出し（→ 別の Mutation を定義） |
| toast（成功 / 失敗）の表示 | ページ全体のリロード |
| `form.reset()` によるフォーム状態のリセット | リトライロジック（→ TanStack Query の `retry` 設定） |
| ダイアログの close / ナビゲーション | |

### キャッシュ無効化と react-hook-form の関係

`useForm` の `defaultValues` はマウント時に一度だけ評価される。`useSuspenseQuery` が古い
キャッシュを返すとフォーム初期値も古くなる。**対策:** Mutation の `onSuccess` で必ず
`invalidateQueries` を呼び、再マウント時に最新データが `defaultValues` に渡るようにする。

## エラーハンドリングパターン

### Mutation のエラー（2 段階）

1. **`result.success` が `false`**: Server Action が返したビジネスエラー → `result.error` を
   toast（negative）で表示。
2. **`onError`**: ネットワークエラーや予期しない例外 → 汎用エラーメッセージを toast で表示。

### Query のエラー

`useSuspenseQuery` のエラーは throw され、**route segment の `error.tsx`** または外側の
ErrorBoundary がキャッチする。セクション内で `isError` を判定しない。

```tsx
// app/store/products/error.tsx（route segment のエラー境界）
"use client";
export default function Error({ reset }: { error: Error; reset: () => void }) {
  // S2 の IllustratedMessage + Button(reset) でエラー UI を組む
}
```

## 変換関数（utils.ts）パターン

ページ固有の計算・変換ロジックは `{page-name}/utils.ts` に置く。

| 変換の種類 | 配置先 | 理由 |
| --- | --- | --- |
| API レスポンス → ViewModel（snake → camel） | `queries/` の `select` | キャッシュと変換を分離できる |
| 配列の集計・ランキング・フィルタ・ソート比較 | `{page-name}/utils.ts` | ページ固有のビジネスロジック |
| 日付・通貨の表示フォーマット | feature 直下の `{helper}.ts` / `shared/utils/` | 単一 feature 内 or 複数 feature で共通利用 |

```typescript
// features/products/products-page/utils.ts（本リポ実例）
export function filterProducts(products: Product[], { status, saleType, query }: ProductFilters): Product[] {
  const q = query.trim();
  return products.filter(
    (p) =>
      (status === "all" || p.status === status) &&
      (saleType === "all" || p.saleType === saleType) &&
      (q === "" || p.name.includes(q)),
  );
}
```

**utils.ts に含めないもの:** 副作用（API 呼び出し・状態更新）、React hooks、UI 固有の表示
フォーマット（→ コンポーネント側 / `{helper}.ts`）。

## 検証（Storybook / Vitest は使わない）

本リポは **Storybook も Vitest も導入しない**（[CLAUDE.md](../CLAUDE.md)）。検証は次で行う:

```bash
npm run build   # S2 macro を含む webpack ビルドが通ること（型・macro 解決の確認）
npm run lint    # eslint
```

> **build cache 注意**: `macro-*.css Module not found` でビルドが落ちたら `rm -rf .next` で
> クリーンビルドする。ビルドは Turbopack 非対応のため `--webpack`（`next.config.ts` の macro
> plugin + `s2-styles` splitChunks を維持）。

- UI の 4 状態（Default / Empty / Loading / Error）は Storybook の Story ではなく、**実コードの
  分岐**（`renderEmptyState`・`Suspense` fallback・`error.tsx`）と**実アプリでの目視**で確認する。
- 純粋ロジック（`utils.ts` のフィルタ・ソート・集計）はテスト基盤が無いぶん、**純粋関数として
  切り出して**入出力を追いやすく保つ（テストを足す場合も同じ境界が効く）。

## ディレクトリ構成の具体例（商品一覧ページ）

```
features/products/
├── types.ts                      # shared 型の再エクスポート + ProductFilters
├── format.ts                     # 価格・売上の整形（純粋関数）
├── display.tsx                   # 表示トークンの単一定義（SALE_TYPE_BADGE / THUMB_HUE / KIND_ICON / KIND_ILLUSTRATION）
├── product-menu.ts               # 操作メニュー項目の生成
└── products-page/
    ├── products-page.tsx         # ページ Container（state + mock 読み + view 切替）
    ├── utils.ts                  # filterProducts / isFiltered / compareProducts
    ├── products-card-view.tsx    # セクション: グリッド（CardView）
    ├── products-table.tsx        # セクション: テーブル（TableView）
    ├── products-action-bar.tsx   # セクション: 選択時アクションバー（カード/テーブル共用）
    └── products-empty-state.tsx  # セクション: 空状態（IllustratedMessage、共用）
```

実 API 接続フェーズで追加する想定:

```
features/products/
├── api/
│   └── products-api.ts           # fetch ベースのデータアクセス
├── queries/
│   ├── product-keys.ts           # queryKey ファクトリ
│   └── product-queries.ts        # queryOptions + fetch 関数
├── actions/
│   └── product-actions.ts        # Server Actions（ActionResult を返す。UI メニューの product-menu.ts とは別物）
└── hooks/
    └── use-product-form.ts        # フォームロジック（react-hook-form + Server Action）
```
