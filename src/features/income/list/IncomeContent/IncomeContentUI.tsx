"use client";

import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

import { formatAmount } from "../../format";
import type { IncomeEntry } from "../../types";

import { IncomeTable } from "./components/IncomeTable";

const FILTER_ALL = "all";

const STATUS_TABS = [
  { value: FILTER_ALL,          label: "すべて" },
  { value: "completed",         label: "完了" },
  { value: "refunded",          label: "返金済" },
  { value: "awaiting_payment",  label: "支払い待ち" },
  { value: "processing",        label: "処理中" },
] as const;

function buildPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "ellipsis", total];
  if (current >= total - 3) return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

interface IncomeContentUIProps {
  entries: IncomeEntry[];
  totalRevenue: number;
  totalCount: number;
  filteredCount: number;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  isFilterPending: boolean;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function IncomeContentUI({
  entries,
  totalRevenue,
  filteredCount,
  statusFilter,
  onStatusChange,
  page,
  pageCount,
  onPageChange,
}: IncomeContentUIProps) {
  return (
    <div className="flex flex-col">
      {/* ── ページヘッダー ── */}
      <header className="border-b px-4 pt-5 pb-0 sm:px-6">
        <div className="flex items-end justify-between gap-3">
          <h1 className="text-xl font-bold tracking-tight">収益</h1>
          <div className="pb-0.5 text-right">
            <p className="text-xs text-muted-foreground">累計売上（完了分）</p>
            <p className="text-2xl font-bold tabular-nums text-foreground">
              {formatAmount(totalRevenue)}
            </p>
          </div>
        </div>

        {/* フィルタータブ */}
        <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <Tabs value={statusFilter} onValueChange={onStatusChange}>
            <TabsList variant="line" className="h-auto bg-transparent p-0">
              {STATUS_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "h-auto rounded-none border-0 bg-transparent px-2 pb-2.5 pt-0 text-sm font-medium text-muted-foreground shadow-none after:!bottom-0",
                    "data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
                    "hover:text-foreground focus-visible:ring-0 focus-visible:outline-none"
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* ── テーブル ── */}
      <div className="overflow-hidden rounded-none">
        <div className="px-4 py-4 text-xs text-muted-foreground sm:px-6">
          {filteredCount}件
        </div>
        <IncomeTable entries={entries} isEmpty={entries.length === 0} />
      </div>

      {/* ── ページネーション ── */}
      {pageCount > 1 && (
        <div className="border-t px-4 py-4 sm:px-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (page > 1) onPageChange(page - 1); }}
                  aria-disabled={page <= 1}
                  className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
              {buildPageRange(page, pageCount).map((p, i) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === page}
                      onClick={(e) => { e.preventDefault(); onPageChange(p); }}
                      className={p === page ? "!bg-card" : undefined}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (page < pageCount) onPageChange(page + 1); }}
                  aria-disabled={page >= pageCount}
                  className={page >= pageCount ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
