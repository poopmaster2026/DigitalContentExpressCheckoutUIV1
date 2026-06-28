"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";

import { useDebounce } from "@/shared/hooks/useDebounce";

import type { Customer } from "../../../types";

export const PAGE_SIZE = 10;

export function useCustomersFilter(all: Customer[]) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isFilterPending, startFilterTransition] = useTransition();

  const statusFilter = searchParams.get("status") ?? "all";
  const pageStr = searchParams.get("page");
  const page = Math.max(1, parseInt(pageStr ?? "1", 10) || 1);

  const searchParamsRef = useRef(searchParams);
  // eslint-disable-next-line react-hooks/refs
  searchParamsRef.current = searchParams;

  const [query, setQuery] = useState(() => searchParams.get("q") ?? "");
  const debouncedQuery = useDebounce(query, 300);
  const isSearchPending = query !== debouncedQuery;

  // debounced query → URL 反映（マウント時はスキップ）
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
      params.delete("page");
      const qs = params.toString();
      router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const updateParam = useCallback(
    (key: string, value: string | null) => {
      startFilterTransition(() => {
        const params = new URLSearchParams(searchParamsRef.current.toString());
        if (value === null) params.delete(key);
        else params.set(key, value);
        params.delete("page");
        const qs = params.toString();
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`);
      });
    },
    [router, pathname]
  );

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

  const onStatusChange = useCallback(
    (s: string) => updateParam("status", s === "all" ? null : s),
    [updateParam]
  );

  const filteredAll = useMemo(() => {
    let result = all;
    if (statusFilter === "subscribed") {
      result = result.filter((c) => c.hasActiveSubscription);
    }
    const q = debouncedQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
      );
    }
    return result;
  }, [all, debouncedQuery, statusFilter]);

  const total = all.length;
  const totalSubscribed = useMemo(
    () => all.filter((c) => c.hasActiveSubscription).length,
    [all]
  );

  const sorted = [...filteredAll].sort((a, b) => b.since.localeCompare(a.since));

  const pageCount = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const clampedPage = Math.min(page, pageCount);
  const paginated = sorted.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE);

  const isFiltered = debouncedQuery.trim() !== "" || statusFilter !== "all";

  return {
    query,
    setQuery,
    statusFilter,
    onStatusChange,
    isSearchPending,
    isFilterPending,
    customers: paginated,
    filteredTotal: filteredAll.length,
    total,
    totalSubscribed,
    isFiltered,
    page: clampedPage,
    pageCount,
    setPage,
  };
}
