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
    statusCounts,
    onStatusChange,
    onSaleTypeChange,
    isFilterPending,
    isSearchPending,
    query,
    setQuery,
    view,
    setView,
    selected,
    toggleSelected,
    toggleAll,
    clearSelected,
  } = useProductsFilter();

  return (
    <ProductsContentUI
      products={products}
      isFiltered={filtered}
      statusFilter={status}
      onStatusChange={onStatusChange}
      saleTypeFilter={saleType}
      onSaleTypeChange={onSaleTypeChange}
      statusCounts={statusCounts}
      isFilterPending={isFilterPending}
      isSearchPending={isSearchPending}
      query={query}
      onQueryChange={setQuery}
      view={view}
      onViewChange={setView}
      selected={selected}
      onToggleSelected={toggleSelected}
      onToggleAll={toggleAll}
      onClearSelected={clearSelected}
    />
  );
}
