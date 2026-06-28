"use client";

import { Loader2, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/shared/components/ui/input";
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

import type { Customer } from "../../types";

import { CustomersTable } from "./components/CustomersTable";

const FILTER_ALL = "all";
const FILTER_SUBSCRIBED = "subscribed";

function buildPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "ellipsis", total];
  if (current >= total - 3) return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

interface CustomersContentUIProps {
  customers: Customer[];
  total: number;
  totalSubscribed: number;
  filteredTotal: number;
  query: string;
  onQueryChange: (v: string) => void;
  isSearchPending: boolean;
  isFilterPending: boolean;
  statusFilter: string;
  onStatusChange: (v: string) => void;
  isFiltered: boolean;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export function CustomersContentUI({
  customers,
  total,
  totalSubscribed,
  query,
  onQueryChange,
  isSearchPending,
  statusFilter,
  onStatusChange,
  isFiltered,
  page,
  pageCount,
  onPageChange,
}: CustomersContentUIProps) {
  return (
    <div className="flex flex-col">
      {/* ── ページヘッダー ── */}
      <header className="border-b px-4 pt-5 pb-0 sm:px-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold tracking-tight">顧客</h1>
          <div className="flex-1" />

          {/* 検索 */}
          <div className="relative hidden sm:block">
            {isSearchPending ? (
              <Loader2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            ) : (
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            )}
            <Input
              type="search"
              inputMode="search"
              aria-label="顧客を検索"
              placeholder="名前・メールで検索"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="h-9 w-64 pl-9"
            />
          </div>
        </div>

        {/* モバイル検索 */}
        <div className="relative mt-4 sm:hidden">
          {isSearchPending ? (
            <Loader2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
          ) : (
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          )}
          <Input
            type="search"
            inputMode="search"
            aria-label="顧客を検索"
            placeholder="名前・メールで検索"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* フィルタータブ */}
        <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <Tabs value={statusFilter} onValueChange={onStatusChange}>
            <TabsList variant="line" className="h-auto bg-transparent p-0">
              {[
                { value: FILTER_ALL, label: "すべて", count: total },
                { value: FILTER_SUBSCRIBED, label: "サブスク中", count: totalSubscribed },
              ].map((tab) => (
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
                    {tab.count}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* ── テーブル ── */}
      <div className="px-4 py-5 sm:px-6">
        <CustomersTable customers={customers} isFiltered={isFiltered} />
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
