"use client";

import { Suspense } from "react";

import { ProductDetailContent } from "./ProductDetailContent/ProductDetailContent";
import { ProductDetailPageSkeleton } from "./ProductDetailPageSkeleton";

/**
 * 商品詳細ページの最上位 Container。
 * page.tsx で prefetch + HydrationBoundary 済みのキャッシュがあれば suspend しない。
 * キャッシュが stale / 未取得の場合に Skeleton が機能する。
 */
export function ProductDetailPage({ id }: { id: string }) {
  return (
    <Suspense fallback={<ProductDetailPageSkeleton />}>
      <ProductDetailContent id={id} />
    </Suspense>
  );
}
