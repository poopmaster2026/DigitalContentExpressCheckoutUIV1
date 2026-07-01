"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";

import { useAppSearch } from "@/shared/components/app-shell/search-context";
import { useDebounce } from "@/shared/hooks/useDebounce";

import { productListQueryOptions } from "../../../api/queries";
import { FILTER_ALL, SORT_DEFAULT, type SortValue } from "../../../types";

// TODO: 検証のため12件に設定。本番では20件以上に戻すこと。
export const PAGE_SIZE = 12;

export type StatusCounts = { all: number; published: number; draft: number };

/** URL に常に持たせるデフォルトパラメータ。遷移時に欠けていれば補完する。 */
const DEFAULT_PARAMS: Record<string, string> = {
  status: FILTER_ALL,
  saleType: FILTER_ALL,
};

/**
 * 商品一覧のフィルタ / 表示形式 / 選択状態の状態管理。
 *
 * - status / saleType / q の変更: startFilterTransition 経由 → isFilterPending = true → グリッドがスケルトン表示
 * - view / page の変更: データ取得不要なため transition なしで即時反映（スケルトンが出ない）
 * - status / saleType / view は「all」や「grid」でも URL に残す
 * - q は空のとき URL から削除
 * - page は 1 のとき URL から削除
 */
export function useProductsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterPending, startFilterTransition] = useTransition();

  const status = searchParams.get("status") ?? FILTER_ALL;
  const saleType = searchParams.get("saleType") ?? FILTER_ALL;
  const sort = (searchParams.get("sort") ?? SORT_DEFAULT) as SortValue;
  const queryFromUrl = searchParams.get("q") ?? "";
  const pageStr = searchParams.get("page");
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  // searchParams は毎レンダーで変わるため ref で最新値を保持
  const searchParamsRef = useRef(searchParams);
  // eslint-disable-next-line react-hooks/refs
  searchParamsRef.current = searchParams;

  const [selected, setSelected] = useState<Set<string>>(new Set());

  const { query, setQuery } = useAppSearch();

  // ページ初期表示時に URL の q パラメータを検索ボックスへ反映する
  useEffect(() => {
    if (queryFromUrl) setQuery(queryFromUrl);
    // マウント時のみ実行
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedQuery = useDebounce(query, 300);
  const isSearchPending = query !== debouncedQuery;

  // マウント時: 欠けているデフォルトパラメータを URL に補完する。
  // 以降: debouncedQuery の変化を URL に反映（startFilterTransition でスケルトン表示）。
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      const current = new URLSearchParams(searchParamsRef.current.toString());
      let changed = false;
      for (const [key, defaultVal] of Object.entries(DEFAULT_PARAMS)) {
        if (!current.has(key)) {
          current.set(key, defaultVal);
          changed = true;
        }
      }
      if (changed) router.replace(`${pathname}?${current.toString()}`);
      return;
    }
    startFilterTransition(() => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (debouncedQuery) params.set("q", debouncedQuery);
      else params.delete("q");
      params.delete("page");
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
    });
  }, [debouncedQuery, router, pathname]);

  // allProducts: フィルタなし全件（ステータスタブのバッジ件数用）
  const { data: allProducts } = useSuspenseQuery(productListQueryOptions());

  const filtered =
    debouncedQuery.trim() !== "" || status !== FILTER_ALL || saleType !== FILTER_ALL;

  const statusCounts = useMemo<StatusCounts>(
    () => ({
      all: allProducts.length,
      published: allProducts.filter((p) => p.status === "published").length,
      draft: allProducts.filter((p) => p.status === "draft").length,
    }),
    [allProducts]
  );

  // status / saleType の変更: データ変化あり → startFilterTransition でスケルトン表示
  const updateFilterParam = useCallback(
    (key: string, value: string) => {
      startFilterTransition(() => {
        const params = new URLSearchParams(searchParamsRef.current.toString());
        params.set(key, value);
        params.delete("page");
        const qs = params.toString();
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
      });
    },
    [router, pathname]
  );

  // sort の変更: クライアントサイド再ソート（再フェッチなし）→ transition 不要
  const onSortChange = useCallback(
    (s: string) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (s === SORT_DEFAULT) params.delete("sort");
      else params.set("sort", s);
      params.delete("page");
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
    },
    [router, pathname]
  );

  // page の変更: クライアントサイドスライス（再フェッチなし）→ transition 不要
  const setPage = useCallback(
    (p: number) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (p <= 1) params.delete("page");
      else params.set("page", String(p));
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
    },
    [router, pathname]
  );

  const toggleSelected = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleAll = useCallback((ids: string[]) => {
    setSelected((prev) =>
      prev.size === ids.length ? new Set() : new Set(ids)
    );
  }, []);

  const clearSelected = useCallback(() => setSelected(new Set()), []);

  const onStatusChange = useCallback(
    (s: string) => updateFilterParam("status", s),
    [updateFilterParam]
  );
  const onSaleTypeChange = useCallback(
    (s: string) => updateFilterParam("saleType", s),
    [updateFilterParam]
  );

  return {
    filtered,
    status,
    saleType,
    sort,
    debouncedQuery,
    statusCounts,
    onStatusChange,
    onSaleTypeChange,
    onSortChange,
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
  };
}
