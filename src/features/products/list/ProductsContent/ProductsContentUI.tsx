"use client";

import { LayoutGrid, Loader2, Plus, Search, Table2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";

import { FILTER_ALL, PRODUCT_STATUSES, VIEW_MODES, type ViewMode } from "../../types";

import { ProductsActionBar } from "./components/ProductsActionBar";
import { ProductsGridSection } from "./components/ProductsGridSection";
import { ProductsGridSkeleton } from "./components/ProductsGridSkeleton";
import type { StatusCounts } from "./hooks/useProductsFilter";

interface ProductsContentUIProps {
  isFiltered: boolean;
  statusFilter: string;
  onStatusChange: (key: string) => void;
  saleTypeFilter: string;
  onSaleTypeChange: (key: string) => void;
  debouncedQuery: string;
  statusCounts: StatusCounts;
  isFilterPending: boolean;
  isSearchPending: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  view: ViewMode;
  onViewChange: (key: ViewMode) => void;
  selected: Set<string>;
  onToggleSelected: (id: string) => void;
  onToggleAll: (ids: string[]) => void;
  onClearSelected: () => void;
  page: number;
  onPageChange: (page: number) => void;
}

const STATUS_TABS = [
  { value: FILTER_ALL, label: "すべて", countKey: "all" },
  { value: PRODUCT_STATUSES[0], label: "公開中", countKey: "published" },
  { value: PRODUCT_STATUSES[1], label: "下書き", countKey: "draft" },
] as const satisfies ReadonlyArray<{ value: string; label: string; countKey: keyof StatusCounts }>;

export function ProductsContentUI({
  isFiltered,
  statusFilter,
  onStatusChange,
  saleTypeFilter,
  onSaleTypeChange,
  debouncedQuery,
  statusCounts,
  isFilterPending,
  isSearchPending,
  query,
  onQueryChange,
  view,
  onViewChange,
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
      <header className="border-b px-4 pt-5 pb-0 sm:px-6">
        {/* タイトル行 */}
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-medium tracking-tight">商品</h1>
          <span className="text-sm text-muted-foreground">
            {statusCounts.all}件
          </span>
          <div className="flex-1" />

          {/* デスクトップ操作群 */}
          <div className="hidden items-center gap-2 sm:flex">
            <div className="relative">
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
                className="h-9 w-56 pl-9"
              />
            </div>


            <ToggleGroup
              type="single"
              value={view}
              onValueChange={(v) => v && onViewChange(v as ViewMode)}
              variant="outline"
              className="h-9 bg-card"
            >
              <ToggleGroupItem value={VIEW_MODES[0]} aria-label="カード表示" className="h-9 px-2.5 data-[state=on]:bg-sidebar data-[state=on]:text-white">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value={VIEW_MODES[1]} aria-label="テーブル表示" className="h-9 px-2.5 data-[state=on]:bg-sidebar data-[state=on]:text-white">
                <Table2 className="h-4 w-4" />
              </ToggleGroupItem>
            </ToggleGroup>

            <Button onClick={goNew} className="gap-1.5 bg-cta text-cta-foreground hover:bg-cta-hover">
              <Plus className="h-4 w-4" />
              新規作成
            </Button>
          </div>

          {/* モバイル新規作成 */}
          <Button onClick={goNew} size="icon" className="sm:hidden bg-cta text-cta-foreground hover:bg-cta-hover" aria-label="新規作成">
            <Plus className="h-4 w-4" />
          </Button>
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
            aria-label="商品を検索"
            placeholder="商品を検索"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* ステータスタブ（横スクロール可） */}
        <div className="-mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
          <Tabs value={statusFilter} onValueChange={onStatusChange}>
            <TabsList variant="line" className="h-auto gap-2 bg-transparent p-0">
              {STATUS_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "h-auto rounded-none border-0 bg-transparent px-3 pb-2.5 pt-0 text-sm font-medium text-muted-foreground shadow-none after:!bottom-0",
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
                    {statusCounts[tab.countKey]}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* ── グリッド（独立した Suspense でここだけローディング） ── */}
      <Suspense fallback={<ProductsGridSkeleton />}>
        <ProductsGridSection
          status={statusFilter}
          saleType={saleTypeFilter}
          debouncedQuery={debouncedQuery}
          page={page}
          view={view}
          selected={selected}
          onToggle={onToggleSelected}
          onToggleAll={onToggleAll}
          onPageChange={onPageChange}
          isFiltered={isFiltered}
          isFilterPending={isFilterPending}
        />
      </Suspense>

      {/* 一括操作バー（view 横断で 1 箇所） */}
      <ProductsActionBar
        selectedCount={selected.size}
        onClear={onClearSelected}
      />
    </div>
  );
}
