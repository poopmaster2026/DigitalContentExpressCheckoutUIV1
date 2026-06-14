"use client";

import { useMemo, useState } from "react";
import type { Key } from "react-aria-components";
import { useAppSearch } from "@/shared/components/app-shell/search-context";
import { PRODUCTS } from "@/shared/mock/products";
import type { Product, ProductFilters } from "../../types";

/** ステータス・販売形態・検索語で商品を絞り込む。 */
function filterProducts(products: Product[], { status, saleType, query }: ProductFilters): Product[] {
  const q = query.trim();
  return products.filter((p) => {
    const okStatus = status === "all" || p.status === status;
    const okSaleType = saleType === "all" || p.saleType === saleType;
    const okQuery = q === "" || p.name.includes(q);
    return okStatus && okSaleType && okQuery;
  });
}

/** いずれかの絞り込みが有効か（空状態の文言切り替えに使う）。 */
function isFiltered({ status, saleType, query }: ProductFilters): boolean {
  return query.trim() !== "" || status !== "all" || saleType !== "all";
}

/**
 * 商品一覧のフィルタ / 表示形式の状態管理（ビジネスロジック）。
 * Phase 0 は mock を直読みする。Phase 1 で `PRODUCTS` 直読みを
 * `useSuspenseQuery(productListQueryOptions())` に差し替える（state とフィルタはそのまま）。
 */
export function useProductsFilter() {
  const [statusFilter, setStatusFilter] = useState<Key>("all");
  const [saleTypeFilter, setSaleTypeFilter] = useState<Key>("all");
  const [view, setView] = useState<Key>("grid");
  const { query } = useAppSearch();

  const products = useMemo(
    () => filterProducts(PRODUCTS, { status: statusFilter, saleType: saleTypeFilter, query }),
    [statusFilter, saleTypeFilter, query],
  );

  const filtered = isFiltered({ status: statusFilter, saleType: saleTypeFilter, query });

  return {
    products,
    filtered,
    statusFilter,
    setStatusFilter,
    saleTypeFilter,
    setSaleTypeFilter,
    view,
    setView,
  };
}
