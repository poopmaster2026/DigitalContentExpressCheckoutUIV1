"use client";

import { useProductsFilter } from "./hooks/useProductsFilter";
import { ProductsContentUI } from "./ProductsContentUI";

/** 商品一覧セクションの Container。状態は useProductsFilter に集約し、UI へ props で渡す。 */
export function ProductsContent() {
  const {
    filtered,
    status,
    saleType,
    view,
    debouncedQuery,
    statusCounts,
    onStatusChange,
    onSaleTypeChange,
    onViewChange,
    isFilterPending,
    isSearchPending,
    query,
    setQuery,
    selected,
    toggleSelected,
    toggleAll,
    clearSelected,
    page,
    setPage,
  } = useProductsFilter();

  return (
    <ProductsContentUI
      isFiltered={filtered}
      statusFilter={status}
      onStatusChange={onStatusChange}
      saleTypeFilter={saleType}
      onSaleTypeChange={onSaleTypeChange}
      debouncedQuery={debouncedQuery}
      statusCounts={statusCounts}
      isFilterPending={isFilterPending}
      isSearchPending={isSearchPending}
      query={query}
      onQueryChange={setQuery}
      view={view}
      onViewChange={onViewChange}
      selected={selected}
      onToggleSelected={toggleSelected}
      onToggleAll={toggleAll}
      onClearSelected={clearSelected}
      page={page}
      onPageChange={setPage}
    />
  );
}
