"use client";

import { ArrowDownUp, Loader2, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { SORT_LABELS } from "../../display";
import { FILTER_ALL, PRODUCT_STATUSES, SORT_VALUES, type SortValue } from "../../types";

import { ProductsActionBar } from "./components/ProductsActionBar";
import { ProductsGridSection } from "./components/ProductsGridSection";
import { ProductsGridSkeleton } from "./components/ProductsGridSkeleton";

/** 「Active」ドロップダウン = ステータス絞り込みの選択肢。 */
const STATUS_OPTIONS = [
  { value: FILTER_ALL, label: "すべて" },
  { value: PRODUCT_STATUSES[0], label: "公開中" },
  { value: PRODUCT_STATUSES[1], label: "下書き" },
] as const;

interface ProductsContentUIProps {
  isFiltered: boolean;
  statusFilter: string;
  onStatusChange: (key: string) => void;
  saleTypeFilter: string;
  debouncedQuery: string;
  isFilterPending: boolean;
  isSearchPending: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  sort: SortValue;
  onSortChange: (value: string) => void;
  selected: Set<string>;
  onToggleSelected: (id: string) => void;
  onToggleAll: (ids: string[]) => void;
  onClearSelected: () => void;
  page: number;
  onPageChange: (page: number) => void;
}

export function ProductsContentUI({
  isFiltered,
  statusFilter,
  onStatusChange,
  saleTypeFilter,
  debouncedQuery,
  isFilterPending,
  isSearchPending,
  query,
  onQueryChange,
  sort,
  onSortChange,
  selected,
  onToggleSelected,
  onToggleAll,
  onClearSelected,
  page,
  onPageChange,
}: ProductsContentUIProps) {
  const router = useRouter();
  const goNew = () => router.push("/store/products/new/digital");

  return (
    <div className="flex flex-col">
      {/* ── ページヘッダー ── */}
      <header className="border-b px-4 pt-5 pb-4 sm:px-6">
        {/* タイトル + 新規作成 */}
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight">商品</h1>
          <Button
            onClick={goNew}
            className="gap-1.5 bg-cta text-cta-foreground hover:bg-cta-hover"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">新規作成</span>
          </Button>
        </div>

        {/* 検索 + Active(ステータス) + Newest(並び替え) */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-80">
            {isSearchPending ? (
              <Loader2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
            ) : (
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            )}
            <Input
              type="search"
              inputMode="search"
              aria-label="商品を検索"
              placeholder="商品を検索"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              className="h-9 bg-card pl-9"
            />
          </div>

          {/* Active = ステータス絞り込み */}
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="h-9 w-32" aria-label="ステータスで絞り込み">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Newest = 並び替え（Product に作成日が無いため既存のソート項目に適合） */}
          <Select value={sort} onValueChange={onSortChange}>
            <SelectTrigger className="h-9 w-44" aria-label="並び替え">
              <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORT_VALUES.map((v) => (
                <SelectItem key={v} value={v}>
                  {SORT_LABELS[v]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      {/* ── テーブル（独立した Suspense でここだけローディング） ── */}
      <div className="px-4 py-4 sm:px-6">
        <div className="overflow-hidden rounded-xl border bg-card">
          <Suspense fallback={<ProductsGridSkeleton />}>
            <ProductsGridSection
              status={statusFilter}
              saleType={saleTypeFilter}
              debouncedQuery={debouncedQuery}
              page={page}
              sort={sort}
              selected={selected}
              onToggle={onToggleSelected}
              onToggleAll={onToggleAll}
              onPageChange={onPageChange}
              isFiltered={isFiltered}
              isFilterPending={isFilterPending}
            />
          </Suspense>
        </div>
      </div>

      {/* 一括操作バー */}
      <ProductsActionBar selectedCount={selected.size} onClear={onClearSelected} />
    </div>
  );
}
