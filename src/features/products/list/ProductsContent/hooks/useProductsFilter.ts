"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useAppSearch } from "@/shared/components/app-shell/search-context";
import { useDebounce } from "@/shared/hooks/useDebounce";

import { productListQueryOptions } from "../../../api/queries";
import { FILTER_ALL } from "../../../types";

export interface StatusCounts { all: number; published: number; draft: number }

/**
 * 商品一覧のフィルタ / 表示形式 / 選択状態の状態管理。
 *
 * フィルタは URL クエリパラメータで管理し、ブラウザバックで戻れる。
 * フィルタ変更は startTransition 内で URL を更新するため、
 * useSuspenseQuery が新しい queryKey で suspend しても現在の UI を維持したまま
 * isFilterPending が true になる（fetch 完了まで loading 表示）。
 * 検索は 300ms debounce 後に URL + queryKey を更新する。
 */
export function useProductsFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterPending, startFilterTransition] = useTransition();

  const status = searchParams.get("status") ?? FILTER_ALL;
  const saleType = searchParams.get("saleType") ?? FILTER_ALL;
  const queryFromUrl = searchParams.get("q") ?? "";

  // searchParams は毎レンダーで変わるため ref で最新値を保持（useEffect / useCallback 内で参照）
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  const [view, setView] = useState<string>("grid");
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

  // マウント直後は URL の q をそのまま保持する（初回 debouncedQuery="" で q を消さないため）
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    startFilterTransition(() => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (debouncedQuery) params.set("q", debouncedQuery);
      else params.delete("q");
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
    });
  }, [debouncedQuery, router, pathname]);

  // フィルタ条件を queryKey に含めて fetch。
  // startTransition 内での URL 更新 → searchParams 変化 → queryKey 変化 → useSuspenseQuery が
  // 新キーで suspend → React が現在の UI を維持しつつ isFilterPending = true。
  const { data: products = [] } = useSuspenseQuery(
    productListQueryOptions({ status, saleType, q: debouncedQuery })
  );

  // ステータスタブの件数はフィルタなし全件ベース（フィルタに左右されない）
  const { data: allProducts = [] } = useSuspenseQuery(productListQueryOptions());

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

  const updateParam = useCallback(
    (key: string, value: string) => {
      startFilterTransition(() => {
        const params = new URLSearchParams(searchParamsRef.current.toString());
        if (value === FILTER_ALL) params.delete(key);
        else params.set(key, value);
        const qs = params.toString();
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
      });
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

  return {
    products,
    filtered,
    status,
    saleType,
    statusCounts,
    onStatusChange: (s: string) => updateParam("status", s),
    onSaleTypeChange: (s: string) => updateParam("saleType", s),
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
  };
}
