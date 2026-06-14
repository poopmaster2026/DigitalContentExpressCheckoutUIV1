# アーキテクチャガイド（Feature + Layer V2 構成）

> **真理ソース**: 本リポのディレクトリ構成・命名規則・責務分離は、rcmr_stadium の
> **neymar V2 構成** `neymar/src/features/docs/directory-structure.md`（Feature + Layer 型 /
> Container・Presentational / `api`・Mapper / TanStack Query）を**踏襲**する。
>
> ただし**技術スタックが異なる**ため、以下を読み替える（＝「やりたいことは違うが、構成は同じ」）:
>
> | 観点 | neymar V2（出典） | 本リポ（V1 / S2） |
> | --- | --- | --- |
> | UI ライブラリ | Shopify Polaris | **React Spectrum S2**（`style()` macro + S2 トークン） |
> | データ取得 | hey-api 生成クライアント（`client/*`） | **fetch ベースの `api/`（将来）**。Phase 0 は `@/shared/mock/*` 直読み |
> | ルーティング | Next Pages Router（`getStaticProps`） | **Next App Router**（`src/app/`） |
> | 権限制御 | `useUserMeStore` + Polaris `<SaveBar editPermission>` | 権限基盤は未導入。**原則のみ継承**（後述） |
> | 状態管理 | Zustand | 未使用 |
> | 検証 | `pnpm lint` | **`npm run build` + `npm run lint`**（Storybook / Vitest なし） |
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

| 対象 | 規則 | 例 |
| --- | --- | --- |
| Container / Presentational のファイル | **PascalCase** | `ProductsPage.tsx`, `ProductsContent.tsx`, `ProductsContentUI.tsx` |
| api / hooks / 非コンポーネントヘルパ | **camelCase**（hooks は `use~`） | `productsApi.ts`, `useProductsFilter.ts`, `productMenu.ts` |
| Container フォルダ | PascalCase | `ProductsContent/` |
| 構造フォルダ / feature 名 | 小文字 | `api/`, `types/`, `components/`, `hooks/`, `products/` |
| Presentational | 対応 Container に **`UI` サフィックス** | `ProductsContentUI.tsx` |

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

ルーティングの責務だけを持つ。`<html>` を手で描画しない（`provider.tsx` の
`<Provider elementType="html">` が担う）。

```tsx
// src/app/store/products/page.tsx
import { ProductsPage } from "@/features/products/ProductsPage";

export default function Page() {
  return <ProductsPage />;
}
```

## 実装パターン

### Page コンポーネント（最上位 Container）

ページのトップ。Suspense と Skeleton を配置し、セクション Container を呼ぶ。

```tsx
// features/products/ProductsPage.tsx
"use client";

import { Suspense } from "react";
import { ProductsContent } from "./ProductsContent/ProductsContent";
import { ProductsPageSkeleton } from "./ProductsPageSkeleton";

export function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
```

> **Phase 0（mock）の注意**: mock は同期読みのため、この `Suspense` は実際には suspend しない
> （Skeleton も発火しない）。**構造を先に用意**しておき、Phase 1 で `useSuspenseQuery` に差し替えた
> 瞬間に Skeleton が機能するようにしておく（neymar の Page → Suspense → Content と同じ骨格）。

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
export function ProductsContentUI({ products, isFiltered, view, onViewChange /* ... */ }: Props) {
  return (
    <div className={page}>
      {/* title + filters + view 切替 */}
      {view === "grid"
        ? <ProductsCardView products={products} isFiltered={isFiltered} />
        : <ProductsTable products={products} isFiltered={isFiltered} />}
    </div>
  );
}
```

**hooks（`hooks/useProductsFilter.ts`）** — ビジネスロジック（状態 + フィルタ）:

```tsx
"use client";
import { useMemo, useState } from "react";
import { PRODUCTS } from "@/shared/mock/products"; // Phase 0: mock 直読み（Phase 1 で useSuspenseQuery 化）

export function useProductsFilter() {
  const [statusFilter, setStatusFilter] = useState<Key>("all");
  const [saleTypeFilter, setSaleTypeFilter] = useState<Key>("all");
  const [view, setView] = useState<Key>("grid");
  const { query } = useAppSearch();
  const products = useMemo(() => filterProducts(PRODUCTS, { status: statusFilter, saleType: saleTypeFilter, query }), [/* ... */]);
  return { products, filtered: isFiltered(/* ... */), statusFilter, setStatusFilter, /* ... */ view, setView };
}
```

> Phase 1 では `useProductsFilter` 内の `PRODUCTS` 直読みを
> `useSuspenseQuery(productListQueryOptions())` に差し替える。state とフィルタロジックはそのまま残る。

### UI 状態の網羅（Default / Empty / Loading / Error）

| 状態 | 責務の所在（本リポ） |
| --- | --- |
| **Default** | Presentational（`~UI` / `components/`）が props で受けて描画 |
| **Empty** | S2 コレクションの `renderEmptyState`（`TableView` / `CardView`）→ 共用 `ProductsEmptyState`（`IllustratedMessage`） |
| **Loading** | Page の `<Suspense fallback={<XxxPageSkeleton />}>`（Phase 0 は mock 同期のため未発火） |
| **Error** | route segment の `error.tsx`、または Page 外側の ErrorBoundary |

Presentational 内に `isLoading` / `isError` 分岐を作らない（Empty のみ Presentational の責務）。

## api/ ディレクトリの設計規約（Phase 1 target）

> Phase 0（mock）では `api/` を作らず、hooks が `@/shared/mock/*` を直読みする。
> TanStack Query は結線済みだが意図的に未使用（[CLAUDE.md](../CLAUDE.md) Status）。実 API 接続時に下記へ移行する。

### api/ に含めるもの・含めないもの

| 含めるもの | 含めないもの |
| --- | --- |
| `queryOptions` 定義（Query） | React コンポーネント |
| `useMutation` 定義（Mutation） | UI ロジック（toast / モーダル制御） |
| Mapper 関数（DTO → ViewModel 変換） | Zod スキーマ（→ `types/`） |
| `invalidateQueries`（キャッシュ無効化） | ViewModel 型定義（→ `types/`） |

### ファイル構成

```
api/
├── {pageName}Api.ts        # Query / Mutation 定義（ページ単位で 1 ファイル）
└── {entityName}Mapper.ts   # DTO → ViewModel 変換（エンティティ単位）
```

Api ファイルが Mapper を import する（逆方向の依存は禁止）。
本リポは hey-api を使わず、**fetch ベースのクライアント**（`src/lib/api/` 等。実装時に用意）を `queryFn` で呼ぶ。

### Query 定義パターン（fetch + select に Mapper）

```tsx
// api/productsApi.ts
import { queryOptions } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { productKeys } from "./productKeys";
import { toProducts } from "./productMapper";

export const productListQueryOptions = (storeId: string) =>
  queryOptions({
    queryKey: productKeys.list(storeId),
    queryFn: async ({ signal }) => apiClient.get(`/stores/${storeId}/products`, { signal }),
    select: toProducts, // キャッシュは生 DTO、消費側で ViewModel に変換
  });
```

| ルール | 理由 |
| --- | --- |
| `queryOptions()` でラップして export | 型推論が効き、`useSuspenseQuery` にスプレッドできる |
| `queryKey` は **ファクトリ**で生成（手書き禁止） | キー管理の一元化・部分一致 invalidate |
| `queryFn` に `signal` を渡す | アンマウント時にリクエストをキャンセル |
| 取得失敗時は throw する | ErrorBoundary / `error.tsx` でキャッチ |
| `select` に Mapper を渡す | 生 DTO をキャッシュし、消費側で ViewModel に変換（差し替え容易） |

queryKey は階層ファクトリで管理する:

```tsx
// api/productKeys.ts
export const productKeys = {
  all: ["products"] as const,
  list: (storeId: string) => [...productKeys.all, "list", storeId] as const,
  detail: (productId: string) => [...productKeys.all, "detail", productId] as const,
};
```

### Mapper（DTO → ViewModel）

OpenAPI 由来の snake_case DTO を FE 全体に散りばめず、必ず Mapper で camelCase の ViewModel に変換する。

```tsx
// api/productMapper.ts
import type { Product } from "../types";
export const toProduct = (dto: ProductDto): Product => ({ id: dto.id, name: dto.name, /* ... */ });
export const toProducts = (dtos: ProductDto[]): Product[] => dtos.map(toProduct);
```

| ファイル名 | 関数名 | 一覧用 | サマリー用 |
| --- | --- | --- | --- |
| `{entity}Mapper.ts` | `to{Entity}` | `to{Entity}s` / `to{Entity}List` | `to{Entity}Summary` |

Mapper に含めるもの: snake→camel 変換、日付文字列→Date、ネスト変換、配列 map。
含めないもの: 副作用、UI フォーマット、バリデーション（→ Zod / types）、デフォルト補完（→ hooks）。

### Mutation パターン

`useMutation` を api 層でカスタムフック化し、`onSuccess` に `invalidateQueries`（キャッシュ操作）を
置く。toast / form.reset / ナビゲーション等の **UI 処理は呼び出し側の `mutate()` コールバック**に置く。

```tsx
// api 層: キャッシュ操作のみ（コンポーネントがアンマウントされても実行される）
export const useUpdateProductMutation = (storeId: string) =>
  useMutation({
    mutationFn: (input: UpdateProductInput) => apiClient.put(`/products/${input.id}`, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: productKeys.list(storeId) }),
  });

// 呼び出し側（hooks）: UI 処理のみ
mutation.mutate(values, {
  onSuccess: () => { form.reset(values); showToast("保存しました"); },
  onError:   () => { showToast("更新に失敗しました", true); },
});
```

`queryClient` は `useQueryClient` フックではなく `lib` のシングルトンを import する
（Mutation 定義のスコープでフックは使えないため）。

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
│   └── index.ts                      # Product 系の型 + ProductFilters
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

実 API 接続フェーズ（Phase 1）で追加:

```
features/products/
└── api/
    ├── productsApi.ts                # queryOptions（+ 将来 useMutation）
    ├── productKeys.ts                # queryKey ファクトリ
    └── productMapper.ts              # DTO → ViewModel 変換
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
