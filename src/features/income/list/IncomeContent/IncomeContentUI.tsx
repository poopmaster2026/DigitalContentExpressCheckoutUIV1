"use client";

import { Download } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
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
  { value: FILTER_ALL,          label: "すべて",     countKey: null },
  { value: "completed",         label: "完了",       countKey: "completed"        },
  { value: "refunded",          label: "返金済",     countKey: "refunded"         },
  { value: "awaiting_payment",  label: "支払い待ち", countKey: "awaiting_payment" },
  { value: "processing",        label: "処理中",     countKey: "processing"       },
] as const;

function buildPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "ellipsis", total];
  if (current >= total - 3) return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

function downloadCSV(entries: IncomeEntry[]) {
  const STATUS_LABELS: Record<string, string> = {
    completed: "完了", refunded: "返金済", awaiting_payment: "支払い待ち", processing: "処理中",
  };
  const header = ["注文日", "顧客名", "商品名", "ステータス", "金額（円）"];
  const rows = entries.map((e) => [
    e.orderedAt.slice(0, 10),
    e.customerName,
    e.productName,
    STATUS_LABELS[e.status] ?? e.status,
    String(e.amount),
  ]);
  const csv = [header, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "income.csv";
  a.click();
  URL.revokeObjectURL(url);
}

interface StatusCounts {
  completed: number;
  refunded: number;
  awaiting_payment: number;
  processing: number;
}

interface IncomeContentUIProps {
  entries: IncomeEntry[];
  allEntries: IncomeEntry[];
  totalRevenue: number;
  totalRefunded: number;
  statusCounts: StatusCounts;
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
  allEntries,
  totalRevenue,
  totalRefunded,
  statusCounts,
  totalCount,
  filteredCount,
  statusFilter,
  onStatusChange,
  page,
  pageCount,
  onPageChange,
}: IncomeContentUIProps) {
  const isFiltered = statusFilter !== FILTER_ALL;

  const tabCount = (countKey: string | null): number => {
    if (countKey === null) return totalCount;
    return statusCounts[countKey as keyof StatusCounts] ?? 0;
  };

  return (
    <div className="flex flex-col">
      {/* ── ページヘッダー ── */}
      <header className="border-b px-4 pt-5 pb-0 sm:px-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">収益</h1>
          <div className="flex-1" />
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => downloadCSV(allEntries)}
          >
            <Download className="h-3.5 w-3.5" />
            CSVダウンロード
          </Button>
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
                  <span
                    className={cn(
                      "ml-1.5 rounded-full px-1.5 py-0.5 text-xs tabular-nums",
                      statusFilter === tab.value
                        ? "bg-secondary text-foreground"
                        : "bg-secondary/60 text-muted-foreground"
                    )}
                  >
                    {tabCount(tab.countKey)}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* ── KPI サマリー ── */}
      <div className="grid grid-cols-2 gap-3 border-b px-4 py-4 sm:grid-cols-4 sm:px-6">
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">累計売上（完了分）</p>
          <p className="mt-1 text-xl font-bold tabular-nums">{formatAmount(totalRevenue)}</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">完了件数</p>
          <p className="mt-1 text-xl font-bold tabular-nums">{statusCounts.completed}件</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">返金額</p>
          <p className="mt-1 text-xl font-bold tabular-nums">{formatAmount(totalRefunded)}</p>
        </div>
        <div className="rounded-lg border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground">支払い待ち</p>
          <p className="mt-1 text-xl font-bold tabular-nums">{statusCounts.awaiting_payment}件</p>
        </div>
      </div>

      {/* ── テーブル ── */}
      <div className="px-4 py-5 sm:px-6">
        {isFiltered && (
          <p className="mb-3 text-xs text-muted-foreground">{filteredCount}件</p>
        )}
        <IncomeTable entries={entries} isFiltered={isFiltered} />
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
