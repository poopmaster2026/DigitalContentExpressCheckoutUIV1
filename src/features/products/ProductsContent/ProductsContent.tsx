"use client";

import { useProductsFilter } from "./hooks/useProductsFilter";
import { ProductsContentUI } from "./ProductsContentUI";

/** 商品一覧セクションの Container。状態は useProductsFilter に集約し、UI へ props で渡す。 */
export function ProductsContent() {
  const {
    products,
    filtered,
    statusFilter,
    setStatusFilter,
    saleTypeFilter,
    setSaleTypeFilter,
    view,
    setView,
  } = useProductsFilter();

  return (
    <ProductsContentUI
      products={products}
      isFiltered={filtered}
      statusFilter={statusFilter}
      onStatusChange={setStatusFilter}
      saleTypeFilter={saleTypeFilter}
      onSaleTypeChange={setSaleTypeFilter}
      view={view}
      onViewChange={setView}
    />
  );
}
