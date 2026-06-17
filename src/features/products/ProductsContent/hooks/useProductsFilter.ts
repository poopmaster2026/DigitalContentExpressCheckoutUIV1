"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { Key } from "react-aria-components";

import { useAppSearch } from "@/shared/components/app-shell/search-context";

import { productListQueryOptions } from "../../queries";
import type { Product, ProductFilters } from "../../types";

/** ステータス・販売形態・検索語で商品を絞り込む。 */
function filterProducts(
  products: Product[],
  { status, saleType, query }: ProductFilters
): Product[] {
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

/** 絞り込み条件のローカル状態（status / saleType をまとめて保持。query はヘッダー検索由来）。 */
type FilterState = Pick<ProductFilters, "status" | "saleType">;

const INITIAL_FILTERS: FilterState = { status: "all", saleType: "all" };

/**
 * 商品一覧のフィルタ / 表示形式の状態管理（ビジネスロジック）。
 * 同じ ProductFilters に属する status / saleType は 1 つの filters オブジェクトに集約する。
 * view は「絞り込み」ではなく表示モードなので別 state に分離する。
 * サーバーで prefetchQuery 済みのキャッシュを useSuspenseQuery で消費する。
 * 実 API 接続時は fetchProducts の実装だけ差し替えれば良い。
 */
export function useProductsFilter() {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [view, setView] = useState<Key>("grid");
  const { query } = useAppSearch();

  const { data: allProducts } = useSuspenseQuery(productListQueryOptions());

  const products = useMemo(
    () => filterProducts(allProducts, { ...filters, query }),
    [allProducts, filters, query]
  );

  const filtered = isFiltered({ ...filters, query });

  // 内部表現（filters オブジェクト）は隠し、UI へは個別の値 + コールバックで公開する
  // （ProductsContentUI の props 形状を変えずに済む）。
  return {
    products,
    filtered,
    status: filters.status,
    saleType: filters.saleType,
    onStatusChange: (status: Key) => setFilters((f) => ({ ...f, status })),
    onSaleTypeChange: (saleType: Key) =>
      setFilters((f) => ({ ...f, saleType })),
    view,
    setView,
  };
}
