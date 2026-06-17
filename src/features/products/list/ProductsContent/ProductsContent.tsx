"use client";

import { useProductsFilter } from "./hooks/useProductsFilter";
import { ProductsContentUI } from "./ProductsContentUI";

/** 商品一覧セクションの Container。状態は useProductsFilter に集約し、UI へ props で渡す。 */
export function ProductsContent() {
  const {
    products,
    filtered,
    status,
    saleType,
    onStatusChange,
    onSaleTypeChange,
    view,
    setView,
  } = useProductsFilter();

  return (
    <ProductsContentUI
      products={products}
      isFiltered={filtered}
      statusFilter={status}
      onStatusChange={onStatusChange}
      saleTypeFilter={saleType}
      onSaleTypeChange={onSaleTypeChange}
      view={view}
      onViewChange={setView}
    />
  );
}
