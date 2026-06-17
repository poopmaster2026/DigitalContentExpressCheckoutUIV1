# アーキテクチャガイド（Feature + Layer V2 構成）

> **真理ソース**: 本リポのディレクトリ構成・命名規則・責務分離は、rcmr_stadium の
> **neymar V2 構成** `neymar/src/features/docs/directory-structure.md`（Feature + Layer 型 /
> Container・Presentational / `api`・Mapper / TanStack Query）を**踏襲**する。
>
> ただし**技術スタックが異なる**ため、以下を読み替える（＝「やりたいことは違うが、構成は同じ」）:
>
> | 観点          | neymar V2（出典）                                     | 本リポ（V1 / S2）                                                    |
> | ------------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
> | UI ライブラリ | Shopify Polaris                                       | **React Spectrum S2**（`style()` macro + S2 トークン）               |
> | データ取得    | hey-api 生成クライアント（`client/*`）                | **fetch ベースの `api/`（将来）**。Phase 0 は feature 内 mock 直読み |
> | ルーティング  | Next Pages Router（`getStaticProps`）                 | **Next App Router**（`src/app/`）                                    |
> | 権限制御      | `useUserMeStore` + Polaris `<SaveBar editPermission>` | 権限基盤は未導入。**原則のみ継承**（後述）                           |
> | 状態管理      | Zustand                                               | 未使用                                                               |
> | 検証          | `pnpm lint`                                           | **`npm run build` + `npm run lint`**（Storybook / Vitest なし）      |
>
> S2 固有の制約（client-only / subpath import / `style()` macro / 色トークンの決め方）は
> [docs/DESIGN.md](./DESIGN.md)、Spectrum の設計思想は [docs/SPECTRUM-GUIDELINES.md](./SPECTRUM-GUIDELINES.md)。
> 技術スタック / ハード制約は [CLAUDE.md](../CLAUDE.md)。

## ディレクトリ構成

```
features/
└── {feature-name}/
    ├── api/              # データ取得（queryOptions / Mapper）。Phase 0 は未作成（mock 直読み）
    ├── types/            # 型定義（index.ts。増えたら名前付きファイルに分割）
    ├── components/       # Feature 共通 Presentational コンポーネント（必要時のみ）
    ├── hooks/            # Feature 共通 hooks（必要時のみ）
    ├── {helper}.ts(x)    # Feature 共通の非コンポーネント・ヘルパ（表示マップ / 整形 / メニュー生成）
    └── {PageName}Page.tsx                # ページ（feature が単一ページならフォルダを挟まず直下に置く）
        ├── {PageName}Page.tsx            # 最上位 Container（Suspense + Skeleton + Content の組み立て）
        ├── {PageName}PageSkeleton.tsx    # ローディング表示
        └── {SectionName}/                # セクション単位の Container（フォルダにまとめる）
            ├── {SectionName}.tsx         # Container（hooks 呼び出し・データ・props 受け渡し）
            ├── {SectionName}UI.tsx       # Presentational（props のみで描画）
            ├── hooks/                     # セクション固有 hooks（ビジネスロジック）
            │   └── use{Logic}.ts
            └── components/                # Presentational 部品（UI 表示制御の useState は可）
```

> neymar の参照実装（`features/settings/portal/domain/`）と同様、**feature が単一ページのときは
> `{pagename}/` 中間フォルダを設けず、feature 直下に `{PageName}Page.tsx` 以下を置く**。
> 複数ページを持つ feature では `{pagename}/` でページごとに区切る。

### 命名規則

| 対象                                  | 規則                                    | 例                                                                 |
| ------------------------------------- | --------------------------------------- | ------------------------------------------------------------------ |
| Container / Presentational のファイル | **PascalCase**                          | `ProductsPage.tsx`, `ProductsContent.tsx`, `ProductsContentUI.tsx` |
| api / hooks / 非コンポーネントヘルパ  | **camelCase**（hooks は `use~`）        | `productsApi.ts`, `useProductsFilter.ts`, `productMenu.ts`         |
| Container フォルダ                    | PascalCase                              | `ProductsContent/`                                                 |
| 構造フォルダ / feature 名             | 小文字                                  | `api/`, `types/`, `components/`, `hooks/`, `products/`             |
| Presentational                        | 対応 Container に **`UI` サフィックス** | `ProductsContentUI.tsx`                                            |

- Container に「Container」サフィックスは付けない（利用側から見て実装詳細の語が入るのは不自然）。
- `UI` サフィックスは、Container に 1:1 で対応する Presentational に付ける。

### ルール

- **Container はフォルダにまとめる** — `ProductsContent/` に `ProductsContent.tsx`（Container）+
  `ProductsContentUI.tsx`（Presentational）+ `components/` + `hooks/` を同居させる。
- **`components/` には Presentational だけ** — ビジネスロジック（データ取得・mutation 呼び出し・
  API データの状態管理）を入れない。組み立ては親 `~UI` が行い、**`components/` 内のコンポーネント
  同士は import しない**。ただし **UI 表示制御用の `useState`（ソート・選択・開閉など）は許容**する。
- **hooks にはビジネスロジック** — 状態管理・フィルタ・データ取得・mutation 呼び出し等。
- **api には Container 対応の API**（queryOptions / Mapper）を置く。
- **types は `index.ts` 起点**、増えたら対応する名前のファイルに分割する。
- **S2 制約** — S2 コンポーネントを使うファイルは先頭に `"use client";`。barrel ではなく
  subpath import（`@react-spectrum/s2/Button` 等）。スタイルは `style()` macro + S2 トークンのみ。

### 型・mock・データの置き場（feature 固有 / shared の判断）

**「誰が消費するか」で置き場を決める。** 過剰に shared へ上げない:

- **feature だけが使うもの**（ドメイン型・その feature の mock・表示マップ等）は **feature 内に置く**。
  例: 商品の `Product` 型・`PRODUCTS` mock は `features/products/{types,mock}` に置く
  （`shared/types`・`shared/mock` には置かない）。
- **複数 feature で共有するもの**だけ `shared/` に置く。1 feature しか使わないのに `shared/` にあるものは
  feature 内へ下ろす。
- **shared の部品（例: `shared/components/app-shell`）が消費する mock/データ**は、その部品が shared な以上
  `shared/` 側にあってよい（例: `shared/mock/notifications.ts` は app-shell が使うので shared のまま）。
- **再エクスポートで層をまたがない** — 「shared に定義 → feature で `export ... from` して見せる」はしない。
  必要な層に直接定義する。
- 列挙型は **`as const` 配列を単一ソースにして型を導出**する（`export const SALE_TYPES = [...] as const;`
  `export type SaleType = (typeof SALE_TYPES)[number];`）。手書きのユニオンと値リストを二重管理しない。

### Feature 共通の非コンポーネント・ヘルパ

表示マップ・フォーマッタ・メニュー生成のような **feature をまたいで共通だが「コンポーネントでも
api でも hooks でも types でもない」ヘルパ**は、feature 直下に camelCase で置く（本リポの調整）。

```
features/products/
├── display.tsx       # 表示トークンの単一定義（SALE_TYPE_BADGE / THUMB_HUE / KIND_ICON / KIND_ILLUSTRATION）
├── format.ts         # 価格・売上の表示整形（純粋関数）
└── productMenu.ts    # 操作メニュー項目の生成（カード / テーブル共用）
```

- `components/` は **Presentational コンポーネント専用**なので、非コンポーネントのヘルパはそこに
  入れない。これらは複数のセクション（カード / テーブル）から参照し、**表現のブレを防ぐ単一定義**にする。

## 依存方向

```
app → features → shared
         ↓
        lib
```

- `app/` はルーティングと組み立てのみ。`features/` と `shared/` を import する。
- `features/` は `shared/` と `lib/` を import する。**`features/` 間の直接 import は禁止**（共通は `shared/`）。
- `shared/` は `lib/` のみ import 可能。

## pages（`src/app/`）

**`page.tsx` の責務 = fetch（prefetch + dehydrate）のみ。** `<html>` を手で描画しない。

```
src/app/{route}/page.tsx  →  fetch（Server Component）
features/{feature}/       →  消費（Client Component, useSuspenseQuery）
```

### 基本パターン（一覧・詳細共通）

```tsx
// src/app/store/products/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ProductsPage } from "@/features/products/ProductsPage";
import { productListQueryOptions } from "@/features/products/queries";
import { getQueryClient } from "@/lib/query-client";

// async Server Component — サーバーでデータを取得して dehydrate して渡す
export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productListQueryOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    // dehydrate したキャッシュを client に渡す。
    // feature 側の useSuspenseQuery がここで hydrate されたキャッシュを読む
    <HydrationBoundary state={dehydratedState}>
      <ProductsPage />
    </HydrationBoundary>
  );
}
```

動的パラメータがある場合（詳細ページ等）:

```tsx
// src/app/store/products/[id]/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ProductDetailPage } from "@/features/products/ProductDetailPage";
import { productDetailQueryOptions } from "@/features/products/queries";
import { getQueryClient } from "@/lib/query-client";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productDetailQueryOptions(id));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetailPage id={id} />
    </HydrationBoundary>
  );
}
```

### `getQueryClient` の役割

`src/lib/query-client.ts` に定義。サーバーはリクエストごとに新規インスタンス、ブラウザはシングルトンを返す:

```ts
export function getQueryClient() {
  if (isServer) return makeQueryClient();   // サーバー: 毎回新規（リクエスト間でキャッシュを共有しない）
  browserQueryClient ??= makeQueryClient(); // ブラウザ: singleton（re-render で作り直さない）
  return browserQueryClient;
}
```

### `page.tsx` がやらないこと

- S2 コンポーネントの import（client-only なので Server Component と共存できない）
- `"use client"` の宣言
- UI の描画（全て `features/` 側に委譲）

## 実装パターン

### Page コンポーネント（最上位 Container）

ページのトップ。`<Suspense>` と Skeleton を配置し、セクション Container を呼ぶ。
`page.tsx` の `<HydrationBoundary>` の内側に置かれ、`useSuspenseQuery` がキャッシュを読む。

```tsx
// features/products/ProductsPage.tsx
"use client";

import { Suspense } from "react";
import { ProductsContent } from "./ProductsContent/ProductsContent";
import { ProductsPageSkeleton } from "./ProductsPageSkeleton";

export function ProductsPage() {
  return (
    // page.tsx で prefetch 済みのキャッシュがあれば suspend しない（Skeleton は発火しない）。
    // 実 API 接続後にキャッシュが stale になれば Skeleton が機能する
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
```

### Skeleton コンポーネント

ローディング表示。Page 直下に置く。S2 では `style()` macro + S2 トークンで実レイアウトに近い
プレースホルダを組む（raw hex 禁止）。

```tsx
// features/products/ProductsPageSkeleton.tsx
"use client";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

const block = style({ backgroundColor: "gray-100", borderRadius: "default" });
// ...実レイアウト（タイトル + カードグリッド）に合わせた箱を並べる
```

### Container / Presentational 分離

Container にロジック（hooks 呼び出し・データ・状態）、Presentational に UI（props 描画）を分離する。

**Container（`ProductsContent.tsx`）** — hooks を呼び、Presentational に props を渡すだけ:

```tsx
"use client";
import { useProductsFilter } from "./hooks/useProductsFilter";
import { ProductsContentUI } from "./ProductsContentUI";

export function ProductsContent() {
  const f = useProductsFilter();
  return (
    <ProductsContentUI
      products={f.products}
      isFiltered={f.filtered}
      statusFilter={f.statusFilter}
      onStatusChange={f.setStatusFilter}
      saleTypeFilter={f.saleTypeFilter}
      onSaleTypeChange={f.setSaleTypeFilter}
      view={f.view}
      onViewChange={f.setView}
    />
  );
}
```

**Presentational（`ProductsContentUI.tsx`）** — props のみで描画。`useState` 等のロジックは持たない:

```tsx
"use client";
// toolbar（Picker / SegmentedControl）+ ProductsCardView / ProductsTable の切り替えを props で描画
export function ProductsContentUI({
  products,
  isFiltered,
  view,
  onViewChange /* ... */,
}: Props) {
  return (
    <div className={page}>
      {/* title + filters + view 切替 */}
      {view === "grid" ? (
        <ProductsCardView products={products} isFiltered={isFiltered} />
      ) : (
        <ProductsTable products={products} isFiltered={isFiltered} />
      )}
    </div>
  );
}
```

**hooks（`hooks/useProductsFilter.ts`）** — ビジネスロジック（状態 + フィルタ）:

```tsx
"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { productListQueryOptions } from "../../queries";

export function useProductsFilter() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [view, setView] = useState<Key>("grid");
  const { query } = useAppSearch();

  // page.tsx で prefetch + HydrationBoundary 済みのキャッシュを読む（サーバー fetch と二重にならない）
  const { data: allProducts } = useSuspenseQuery(productListQueryOptions());

  const products = useMemo(
    () => filterProducts(allProducts, { ...filters, query }),
    [allProducts, filters, query]
  );
  return { products, filtered: isFiltered({ ...filters, query }), /* ... */ };
}
```

`useSuspenseQuery` は `page.tsx` の `HydrationBoundary` 内でのみ使う。
`prefetchQuery` で取得済みのキャッシュがある限り suspend しないため、Skeleton は発火しない。

### UI 状態の網羅（Default / Empty / Loading / Error）

| 状態        | 責務の所在（本リポ）                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| **Default** | Presentational（`~UI` / `components/`）が props で受けて描画                                                        |
| **Empty**   | S2 コレクションの `renderEmptyState`（`TableView` / `CardView`）→ 共用 `ProductsEmptyState`（`IllustratedMessage`） |
| **Loading** | Page の `<Suspense fallback={<XxxPageSkeleton />}>`（Phase 0 は mock 同期のため未発火）                             |
| **Error**   | route segment の `error.tsx`、または Page 外側の ErrorBoundary                                                      |

Presentational 内に `isLoading` / `isError` 分岐を作らない（Empty のみ Presentational の責務）。

## api/ と queries.ts の設計規約

### ファイル構成

```
features/{feature}/
├── api/
│   └── index.ts      # fetch 関数（非同期）。実 API 接続時にここだけ差し替える
└── queries.ts         # queryOptions ファクトリ。page.tsx と hooks の両方から import する
```

### api/index.ts — fetch 関数

API 呼び出しを非同期関数として export する。現状は mock wrap、実 API 接続時に差し替える唯一の場所:

```ts
// features/products/api/index.ts
import { PRODUCTS, getProductDetail } from "../mock";
import type { Product, ProductDetail } from "../types";

// 実 API 接続時: PRODUCTS 直読みを fetch('/api/products') 等に置き換える
export async function fetchProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function fetchProductDetail(
  id: string
): Promise<ProductDetail | undefined> {
  return getProductDetail(id);
}
```

### queries.ts — queryOptions ファクトリ

`page.tsx`（prefetchQuery）と hooks（useSuspenseQuery）の両方が import する単一ソース:

```ts
// features/products/queries.ts
import { queryOptions } from "@tanstack/react-query";

import { fetchProductDetail, fetchProducts } from "./api";

export const productListQueryOptions = () =>
  queryOptions({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

export const productDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["products", id],
    queryFn: () => fetchProductDetail(id),
  });
```

| ルール | 理由 |
| --- | --- |
| `queryOptions()` でラップして export | 型推論が効き、`prefetchQuery` / `useSuspenseQuery` どちらにも渡せる |
| `queryFn` は `api/index.ts` の関数を呼ぶ | API 差し替えが `api/` だけで完結する |
| `queryKey` はここで一元管理 | page.tsx と hooks でキーが乖離しない |

### api/ に含めるもの・含めないもの

| 含めるもの | 含めないもの |
| --- | --- |
| fetch 関数（非同期）| React コンポーネント |
| 将来: Mapper 関数（DTO → ViewModel 変換） | UI ロジック（toast / モーダル制御）|
| 将来: Mutation 関数 | Zod スキーマ（→ `types/`）|
| | ViewModel 型定義（→ `types/`）|
| | `queryOptions`（→ `queries.ts`）|

### Mutation パターン（将来）

`useMutation` を api 層でカスタムフック化し、`onSuccess` に `invalidateQueries`（キャッシュ操作）を
置く。toast / form.reset / ナビゲーション等の **UI 処理は呼び出し側の `mutate()` コールバック**に置く。

```tsx
// api 層: キャッシュ操作のみ
export const useUpdateProductMutation = () =>
  useMutation({
    mutationFn: (input: UpdateProductInput) =>
      fetch(`/api/products/${input.id}`, { method: "PUT", body: JSON.stringify(input) }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["products"] }),
  });

// 呼び出し側（hooks）: UI 処理のみ
mutation.mutate(values, {
  onSuccess: () => { form.reset(values); },
  onError: () => { /* toast */ },
});
```

### キャッシュ無効化と react-hook-form

`useForm` の `defaultValues` はマウント時に一度だけ評価される。`useSuspenseQuery` が古いキャッシュを
返すと初期値も古くなる。Mutation の `onSuccess` で必ず `invalidateQueries` し、再マウント時に最新値が
`defaultValues` に渡るようにする。

## 編集権限の取り扱い（将来 / 原則のみ継承）

neymar V2 は Polaris `<SaveBar>` / `<Modal>` 等に `editPermission` / `disabled` を**明示的に渡す**ことを
必須とする（ラッパのデフォルトへの暗黙依存＝ fail-open を禁止）。**本リポは権限基盤未導入のため現状
未適用**だが、権限制御を入れる際は次の原則を継承する:

- 権限・活性状態を制御する prop（`isDisabled` 等）を**省略しない**。「省略 = 既定で活性」に暗黙依存しない。
- 値は単一の権限ソースから取得し、同 feature の保存ロジックと UI 活性状態を**同じフラグで揃える**。
- lint / 型チェックでは検出できないため、**権限あり / なし両方のユーザーで挙動を手動確認**する。

## スタイリング規約（S2）

正は [docs/DESIGN.md](./DESIGN.md)。要点:

- **`style()` macro + S2 トークン名のみ**（raw hex 禁止）。Tailwind / shadcn / `cn()` は不使用。
- モジュール先頭で `style()` を定数に括り、JSX では生成済みクラス名を `className` に渡す。
- S2 コンポーネントへは **レイアウト系のみ**を `styles` prop で渡す（色・内部 padding はカスタム不可）。
- 条件付きは `style()` の条件オブジェクト（`default` / `isHovered` / `isSelected` / variant）か、
  生成済みクラス名のテンプレート連結（例: `` `${base} ${HUE[p.thumb]}` ``）で表現する。
- コンポーネント / トークン / アイコンは `react-spectrum-s2` skill・MCP・実ソースで特定する（記憶で書かない）。

## ディレクトリ構成の具体例（商品一覧）

```
features/products/
├── types/
│   └── index.ts                      # Product 系の型 + ProductFilters（feature 内で直接定義。as const で列挙）
├── mock.ts                           # Phase 0 のモックデータ（feature 固有のため shared/mock ではなくここ）
├── display.tsx                       # 表示トークンの単一定義（Badge variant / hue / icon / illustration）
├── format.ts                         # 価格・売上の整形（純粋関数）
├── productMenu.ts                    # 操作メニュー項目の生成（カード / テーブル共用）
├── ProductsPage.tsx                  # 最上位 Container（Suspense + Skeleton + Content）
├── ProductsPageSkeleton.tsx          # ローディング表示
└── ProductsContent/                  # セクション Container（フォルダ化）
    ├── ProductsContent.tsx           # Container（useProductsFilter を呼び props を渡す）
    ├── ProductsContentUI.tsx         # Presentational（toolbar + card/table 切替）
    ├── hooks/
    │   └── useProductsFilter.ts       # filter/saleType/view state + filterProducts/isFiltered
    └── components/                   # Presentational 部品（UI 表示制御の useState は可）
        ├── ProductsCardView.tsx      # グリッド（CardView。選択 state を内部保持）
        ├── ProductsTable.tsx         # テーブル（TableView。ソート state + compareProducts を内部保持）
        ├── ProductsActionBar.tsx     # 選択時アクションバー（カード / テーブル共用）
        └── ProductsEmptyState.tsx    # 空状態（IllustratedMessage、共用）
```

```
features/products/
├── api/
│   └── index.ts                      # fetch 関数（非同期 mock wrap → 実 API 差し替え口）
└── queries.ts                        # queryOptions ファクトリ（page.tsx + hooks の共通 import 先）
```

## 検証

Storybook / Vitest は導入しない。検証は以下で行う:

```bash
npm run build   # S2 macro を含む webpack ビルド + 型チェックが通ること
npm run lint    # eslint
```

> ビルドが `macro-*.css Module not found` で落ちたら `rm -rf .next` でクリーンビルド。
> ビルドは Turbopack 非対応のため `--webpack`（`next.config.ts` の macro plugin +
> `s2-styles` splitChunks を維持）。
