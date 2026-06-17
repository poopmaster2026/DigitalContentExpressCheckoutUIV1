"use client";

import { Suspense } from "react";

import { ProductsContent } from "./ProductsContent/ProductsContent";
import { ProductsPageSkeleton } from "./ProductsPageSkeleton";

/**
 * 商品一覧ページの最上位 Container。
 * Phase 0（mock 同期読み）では Suspense は suspend しないが、Phase 1 で
 * useProductsFilter を useSuspenseQuery 化した際に Skeleton が機能するよう骨格を用意しておく。
 */
export function ProductsPage() {
  return (
    <Suspense fallback={<ProductsPageSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
