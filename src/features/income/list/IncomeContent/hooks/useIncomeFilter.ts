"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { INCOME_ENTRIES } from "../../../mock";
import type { IncomeStatus } from "../../../types";

export const PAGE_SIZE = 20;
const FILTER_ALL = "all";

export function useIncomeFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isFilterPending, startFilterTransition] = useTransition();

  const statusFilter = searchParams.get("status") ?? FILTER_ALL;
  const page = Math.max(1, Number(searchParams.get("page") ?? "1"));

  const sorted = [...INCOME_ENTRIES].sort((a, b) =>
    b.orderedAt.localeCompare(a.orderedAt)
  );

  const filtered =
    statusFilter === FILTER_ALL
      ? sorted
      : sorted.filter((e) => e.status === (statusFilter as IncomeStatus));

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, pageCount);
  const entries = filtered.slice((clampedPage - 1) * PAGE_SIZE, clampedPage * PAGE_SIZE);

  const totalRevenue = INCOME_ENTRIES.filter((e) => e.status === "completed").reduce(
    (sum, e) => sum + e.amount,
    0
  );
  const totalRefunded = INCOME_ENTRIES.filter((e) => e.status === "refunded").reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const statusCounts = {
    completed:        INCOME_ENTRIES.filter((e) => e.status === "completed").length,
    refunded:         INCOME_ENTRIES.filter((e) => e.status === "refunded").length,
    awaiting_payment: INCOME_ENTRIES.filter((e) => e.status === "awaiting_payment").length,
    processing:       INCOME_ENTRIES.filter((e) => e.status === "processing").length,
  };

  function setParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "" || value === FILTER_ALL || value === "1") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    if (key !== "page") params.delete("page");
    return params.toString();
  }

  function onStatusChange(value: string) {
    startFilterTransition(() => {
      router.push(`?${setParam("status", value)}`, { scroll: false });
    });
  }

  function setPage(p: number) {
    router.push(`?${setParam("page", String(p))}`, { scroll: false });
  }

  return {
    entries,
    totalRevenue,
    totalRefunded,
    statusCounts,
    totalCount: INCOME_ENTRIES.length,
    filteredCount: filtered.length,
    statusFilter,
    onStatusChange,
    isFilterPending,
    page: clampedPage,
    pageCount,
    setPage,
  };
}
