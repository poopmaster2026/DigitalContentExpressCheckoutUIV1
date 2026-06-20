# アーキテクチャガイド（Feature + Layer 構成）

## 技術スタック

| 観点          | 採用技術                                                                   |
| ------------- | -------------------------------------------------------------------------- |
| UI ライブラリ | **shadcn/ui（new-york スタイル）** + Tailwind CSS v4                       |
| アイコン      | **lucide-react**                                                            |
| データ取得    | **TanStack Query v5**（`useSuspenseQuery` / `useQuery`）                   |
| フォーム      | **react-hook-form** + **zod**                                              |
| ルーティング  | **Next.js App Router**（`src/app/`）                                       |
| スタイリング  | **Tailwind CSS v4 utility classes** + `cn()` ヘルパー                     |
| 検証          | `npm run build`（webpack） + `npm run lint`                                |

> **注意**: `--webpack` フラグ必須（`package.json` 参照）。Turbopack は使わない。

---

## ディレクトリ構成

```
src/
├── app/                        # Next.js ルーティングのみ（Server Components）
│   └── store/
│       └── {route}/
│           └── page.tsx        # prefetch + HydrationBoundary のみ
├── features/
│   └── {feature}/              # 機能単位のディレクトリ
│       ├── api/
│       │   └── index.ts        # fetch 関数（非同期 mock wrap → 実 API 差し替え口）
│       ├── types/
│       │   └── index.ts        # ドメイン型（増えたら名前付きファイルに分割）
│       ├── queries.ts          # queryOptions ファクトリ（page.tsx + hooks 共通）
│       ├── components/         # feature 内の複数セクションで使う Presentational 部品
│       ├── hooks/              # feature 共通 hooks（必要時のみ）
│       ├── {helper}.ts(x)      # 表示マップ / 整形 / メニュー生成などの非コンポーネントヘルパ
│       ├── {FeatureName}Page.tsx          # 最上位 Container（Suspense + Skeleton + Content）
│       ├── {FeatureName}PageSkeleton.tsx  # ローディング表示
│       └── {SectionName}/               # セクション単位 Container フォルダ
│           ├── {SectionName}.tsx         # Container（hooks 呼び出し・props 渡し）
│           ├── {SectionName}UI.tsx       # Presentational（props のみで描画）
│           ├── hooks/                    # セクション固有 hooks
│           │   └── use{Logic}.ts
│           └── components/              # Presentational 部品（UI 制御の useState は可）
└── shared/
    ├── components/
    │   ├── ui/                 # shadcn/ui コンポーネント（CLI で生成・直接編集しない）
    │   └── app-shell/          # アプリシェル（Header / Sidebar / Context）
    │       ├── {Shell}.tsx     # Container（useState を持つ）
    │       ├── {Shell}UI.tsx   # Presentational
    │       ├── hooks/
    │       └── components/
    ├── providers/              # React Context / QueryClient Provider
    ├── hooks/                  # 複数 feature で使う汎用 hooks
    └── mock/                   # app-shell など shared 側が消費するモックデータ
```

### feature 直下のルール

- **feature だけが使うもの**はすべて feature 内に置く（`shared/` に上げすぎない）
- **複数 feature で共有するもの**だけ `shared/` に置く
- **feature をまたがる直接 import は禁止**（共通化は `shared/` 経由）

### feature 内の共有 components

複数のセクションで使うコンポーネントは `features/{feature}/components/` に置く。
例: `features/products/components/SectionCard.tsx`（detail と new 両方から使う）。
セクション固有のものは `{SectionName}/components/` に留める。

---

## 命名規則

| 対象                                  | 規則                                     | 例                                                      |
| ------------------------------------- | ---------------------------------------- | ------------------------------------------------------- |
| Container / Presentational            | **PascalCase**                           | `ProductsPage.tsx`, `ProductsContent.tsx`               |
| Presentational                        | 対応 Container に **`UI` サフィックス** | `ProductsContentUI.tsx`                                 |
| api / hooks / 非コンポーネントヘルパ  | **camelCase**（hooks は `use~`）         | `queries.ts`, `useProductsFilter.ts`, `productMenu.ts`  |
| Container フォルダ                    | PascalCase                               | `ProductsContent/`                                      |
| 構造フォルダ / feature 名             | 小文字                                   | `api/`, `types/`, `components/`, `hooks/`, `products/`  |

- Container に「Container」サフィックスは付けない
- `UI` サフィックスは Container に 1:1 対応する Presentational にのみ付ける

---

## TypeScript 型定義規約

### Props は `interface` で定義する

```tsx
// ✅ interface を使う
interface ProductDetailContentProps {
  id: string;
}

// ❌ type alias は使わない
type ProductDetailContentProps = {
  id: string;
};
```

### 非推奨の React 型を使わない

```tsx
// ✅ 正しい
import type { FormEvent } from "react";
onSubmit: (event: FormEvent<HTMLFormElement>) => void;

// ❌ 非推奨（deprecated）
import type { FormEventHandler } from "react";
onSubmit: FormEventHandler<HTMLFormElement>;
```

### 列挙型は `as const` 配列で定義する

```ts
export const SALE_TYPES = ["digital", "course", "booking", "subscription"] as const;
export type SaleType = (typeof SALE_TYPES)[number];

export const VIEW_MODES = ["grid", "table"] as const;
export type ViewMode = (typeof VIEW_MODES)[number];
export const VIEW_DEFAULT: ViewMode = "grid";

export const FILTER_ALL = "all" as const;
```

---

## `"use client"` 規約

### 必要なファイルにのみ付ける

| ファイル種別                                     | `"use client"` |
| ------------------------------------------------ | :------------: |
| `src/app/` の `page.tsx`（Server Component）     | **不要**       |
| `features/` の Container / Presentational         | **必要**       |
| React hooks を使う hooks ファイル（`.ts`）       | **必要**       |
| Context / Provider ファイル                      | **必要**       |
| 純粋データファイル（types / mock / 定数）         | **不要**       |
| `shared/components/ui/` の shadcn コンポーネント | 各ファイルに委ねる |

```
// ✅ Server Component — "use client" なし
// src/app/store/products/page.tsx
export default async function Page() { ... }

// ✅ Client Component
// src/features/products/list/ProductsPage.tsx
"use client";
export function ProductsPage() { ... }

// ✅ Hooks ファイル — React hooks を使うので必要
// src/features/products/list/ProductsContent/hooks/useProductsFilter.ts
"use client";
export function useProductsFilter() { ... }

// ✅ 純粋データ — "use client" 不要
// src/features/products/types/index.ts
export type Product = { ... };
```

---

## 依存方向

```
app → features → shared
         ↓
        lib
```

- `app/` はルーティング・組み立てのみ
- `features/` 間の直接 import は禁止（共通化は `shared/` 経由）
- `shared/` は `lib/` のみ import 可能

---

## page.tsx のパターン（Server Component）

`page.tsx` の責務は **prefetch + HydrationBoundary のみ**。UI の描画はすべて features 側に委ねる。

```tsx
// src/app/store/products/[id]/page.tsx
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/query-client";
import { productDetailQueryOptions } from "@/features/products/api/queries";
import { ProductDetailPage } from "@/features/products/detail/ProductDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productDetailQueryOptions(id));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetailPage id={id} />
    </HydrationBoundary>
  );
}
```

---

## データ取得パターン

### queries.ts — queryOptions ファクトリ

```ts
// features/products/api/queries.ts
import { queryOptions } from "@tanstack/react-query";
import { fetchProducts, fetchProductDetail } from "./index";

export const productListQueryOptions = (filters?: ProductFilters) =>
  queryOptions({
    queryKey: ["products", filters ?? {}],
    queryFn: () => fetchProducts(filters),
  });
```

### hooks での useSuspenseQuery

```tsx
// フィルタなし全件（ステータスタブ用）— queryKey 固定なので再 suspend しない
const { data: allProducts } = useSuspenseQuery(productListQueryOptions());

// フィルタあり（グリッド用）— queryKey が変わるたびに suspend する
// → 専用の Suspense バウンダリ内で使う
const { data: products } = useSuspenseQuery(
  productListQueryOptions({ status, saleType, q: debouncedQuery })
);
```

### Suspense バウンダリの配置

```tsx
// ページ全体のローディング（初回のみ）
<Suspense fallback={<ProductsPageSkeleton />}>
  <ProductsContent />         {/* useSuspenseQuery（フィルタなし全件） */}
</Suspense>

// グリッドだけのローディング（フィルタ変更ごと）
<Suspense fallback={<ProductsGridSkeleton />}>
  <ProductsGridSection ... />  {/* useSuspenseQuery（フィルタあり） */}
</Suspense>
```

---

## Container / Presentational パターン

### Container（`{SectionName}.tsx`）

hooks を呼び、Presentational に props を渡すだけ。

```tsx
"use client";
import { useProductsFilter } from "./hooks/useProductsFilter";
import { ProductsContentUI } from "./ProductsContentUI";

export function ProductsContent() {
  const { statusCounts, statusFilter, onStatusChange, ... } = useProductsFilter();
  return (
    <ProductsContentUI
      statusCounts={statusCounts}
      statusFilter={statusFilter}
      onStatusChange={onStatusChange}
      ...
    />
  );
}
```

### Presentational（`{SectionName}UI.tsx`）

props のみで描画。ビジネスロジックを持たない（UI 表示制御の `useState` は可）。

```tsx
"use client";
interface ProductsContentUIProps {
  statusCounts: StatusCounts;
  statusFilter: string;
  onStatusChange: (key: string) => void;
}

export function ProductsContentUI({ statusCounts, statusFilter, onStatusChange }: ProductsContentUIProps) {
  return ( ... );
}
```

### hooks（`hooks/use{Logic}.ts`）

ビジネスロジック（状態 / フィルタ / データ取得 / mutation 等）を集約。

---

## hooks の抽出基準

同一コンポーネント内の複数 `useState` が 1 つの概念をなす場合はカスタム hook に切り出す。

```ts
// ✅ 良い例: 3つの状態 + 操作をまとめて hook に
// src/features/products/detail/ProductDetailContent/hooks/useProgressAnimation.ts
"use client";
export function useProgressAnimation() {
  const [state, setState] = useState({ pending: false, isSaving: false, progress: 0 });
  const runWithProgress = useCallback((onComplete: () => void, saving = false) => { ... }, []);
  return { pending: state.pending, isSaving: state.isSaving, progress: state.progress, runWithProgress };
}

// ❌ 悪い例: Container に useState を3つ直書き
const [pending, setPending] = useState(false);
const [isSaving, setIsSaving] = useState(false);
const [progress, setProgress] = useState(0);
```

---

## shared/components の構成

### ui/（shadcn/ui）

CLI でインストール・管理するコンポーネント。直接編集しない。
追加: `npx shadcn@latest add <name>` → `src/shared/components/ui/` に展開される。

### app-shell/

アプリ全体を包むシェル（Header / Sidebar / Context）。feature と同じ Container+Presentational パターンに従う。

```
shared/components/app-shell/
├── AppShell.tsx        # Container（SearchContext + SidebarProvider を束ねる）
├── AppShellUI.tsx      # Presentational（全体レイアウト）
├── Header/
│   ├── Header.tsx      # Container
│   └── components/     # Header サブコンポーネント
├── Sidebar/
│   ├── Sidebar.tsx     # Container
│   ├── SidebarUI.tsx   # Presentational
│   └── components/
├── hooks/              # app-shell 固有 hooks
├── search-context.tsx  # AppSearchContext
└── sidebar-context.tsx # SidebarContext
```

### 今後の共有コンポーネント追加方針

複数の feature で使う共通 Presentational コンポーネントが生まれたら、`shared/components/` に機能名フォルダを作って追加する（例: `shared/components/empty-state/`）。
shadcn/ui に存在するものは必ず `ui/` を使い、自作しない。

---

## スタイリング規約（shadcn/ui + Tailwind CSS v4）

- **utility class のみ**。`style` 属性への直接記述は禁止
- **semantic token 経由のみ**（`bg-background`, `text-foreground`, `bg-primary` 等）
- **任意値クラス禁止**: `bg-[#xxx]`, `gap-[10px]` などの `[...]` 形式は使わない
- 条件付きスタイルは `cn()` ヘルパーで管理する
- アイコンは `lucide-react` 固定（`h-4 w-4` または `h-5 w-5`）

```tsx
// ✅ 正しい
className={cn(
  "rounded-xl border border-border bg-card p-6",
  isActive && "ring-2 ring-cta"
)}

// ❌ 任意値禁止
className="bg-[#1c1a19] gap-[10px]"
```

デザイントークンの詳細は [docs/DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) を参照。

---

## Feature 構成の具体例（商品 feature）

```
features/products/
├── api/
│   └── index.ts                       # fetch 関数（mock → 実 API 差し替え口）
├── types/
│   ├── index.ts                       # Product / ProductDetail 型
│   └── validation.ts                  # zod スキーマ + ProductFormValues 型
├── mock.ts                            # Phase 0 モックデータ
├── display.tsx                        # 表示トークン（SALE_TYPE_BADGE / THUMB_HUE 等）
├── format.ts                          # 価格・売上の整形（純粋関数）
├── productMenu.ts                     # 操作メニュー項目の生成
├── components/                        # detail / new 両方から使う共有 Presentational 部品
│   ├── SectionCard.tsx                # フォームセクションカード
│   ├── FormFields.tsx                 # react-hook-form 連携フィールドコントロール群
│   ├── BasicInfoSection.tsx           # 基本情報セクション（名前・説明・カバー画像）
│   └── ContentSection.tsx            # コンテンツセクション（ファイルアップロード等）
├── list/
│   ├── ProductsPage.tsx               # 最上位 Container（Suspense + Skeleton）
│   ├── ProductsPageSkeleton.tsx       # ローディング表示
│   └── ProductsContent/              # 一覧セクション Container フォルダ
│       ├── ProductsContent.tsx        # Container
│       ├── ProductsContentUI.tsx      # Presentational
│       ├── hooks/
│       │   └── useProductsFilter.ts  # フィルタ / ページング / 選択状態
│       └── components/
│           ├── ProductsCardView.tsx
│           ├── ProductsTable.tsx
│           ├── ProductsGridSection.tsx  # useSuspenseQuery（フィルタあり）+ ページネーション
│           ├── ProductsGridSkeleton.tsx
│           ├── ProductsActionBar.tsx
│           └── ProductsEmptyState.tsx
├── detail/
│   ├── ProductDetailPage.tsx          # 最上位 Container（Suspense + Skeleton）
│   ├── ProductDetailPageSkeleton.tsx
│   └── ProductDetailContent/
│       ├── ProductDetailContent.tsx   # Container
│       ├── ProductDetailContentUI.tsx # Presentational
│       ├── hooks/
│       │   ├── useProductDetailForm.ts
│       │   └── useProgressAnimation.ts  # pending / isSaving / progress + runWithProgress
│       └── components/
│           ├── DetailHeader.tsx       # 保存・複製・削除ヘッダー
│           └── PricingSection.tsx     # 価格・公開設定（detail 固有）
└── new/
    ├── NewProductPage.tsx
    └── NewProductContent/
        ├── NewProductContent.tsx
        ├── NewProductContentUI.tsx
        ├── hooks/ （必要時）
        └── components/
            ├── NewProductHeader.tsx
            └── NewPricingSection.tsx
```

---

## 検証

```bash
npm run build   # 型チェック + ビルド（--webpack）
npm run lint    # ESLint
```
