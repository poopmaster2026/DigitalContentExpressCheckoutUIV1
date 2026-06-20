"use client";

import { LayoutGrid, Loader2, Plus, Search, Table2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/shared/components/ui/toggle-group";

import { SALE_TYPE_BADGE } from "../../display";
import { FILTER_ALL } from "../../types";
import type { Product } from "../../types";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";

import { ProductsActionBar } from "./components/ProductsActionBar";
import { ProductsCardView } from "./components/ProductsCardView";
import { ProductsTable } from "./components/ProductsTable";
import type { StatusCounts } from "./hooks/useProductsFilter";

type ProductsContentUIProps = {
  products: Product[];
  isFiltered: boolean;
  statusFilter: string;
  onStatusChange: (key: string) => void;
  saleTypeFilter: string;
  onSaleTypeChange: (key: string) => void;
  statusCounts: StatusCounts;
  isFilterPending: boolean;
  isSearchPending: boolean;
  query: string;
  onQueryChange: (value: string) => void;
  view: string;
  onViewChange: (key: string) => void;
  selected: Set<string>;
  onToggleSelected: (id: string) => void;
  onToggleAll: (ids: string[]) => void;
  onClearSelected: () => void;
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
};

const STATUS_TABS = [
  { value: FILTER_ALL, label: "すべて", countKey: "all" },
  { value: "published", label: "公開中", countKey: "published" },
  { value: "draft", label: "下書き", countKey: "draft" },
] as const satisfies ReadonlyArray<{ value: string; label: string; countKey: keyof StatusCounts }>;

function buildPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "ellipsis", total];
  if (current >= total - 3) return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

export function ProductsContentUI({
  products,
  isFiltered,
  statusFilter,
  onStatusChange,
  saleTypeFilter,
  onSaleTypeChange,
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
  pageCount,
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
          <h1 className="text-xl font-bold tracking-tight">商品</h1>
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

            <Select value={saleTypeFilter} onValueChange={onSaleTypeChange}>
              <SelectTrigger className="h-9 w-36 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={FILTER_ALL}>すべての形態</SelectItem>
                {Object.entries(SALE_TYPE_BADGE).map(([id, { label }]) => (
                  <SelectItem key={id} value={id}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <ToggleGroup
              type="single"
              value={view}
              onValueChange={(v) => v && onViewChange(v)}
              variant="outline"
              className="h-9 bg-card"
            >
              <ToggleGroupItem value="grid" aria-label="カード表示" className="h-9 px-2.5 data-[state=on]:bg-sidebar data-[state=on]:text-white">
                <LayoutGrid className="h-4 w-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="table" aria-label="テーブル表示" className="h-9 px-2.5 data-[state=on]:bg-sidebar data-[state=on]:text-white">
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
            <TabsList className="h-auto gap-1 bg-transparent p-0">
              {STATUS_TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "relative rounded-none border-0 border-b-2 border-transparent bg-transparent px-1 pb-2.5 pt-0 text-sm font-medium text-muted-foreground shadow-none",
                    "data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none",
                    "hover:text-foreground focus-visible:ring-0"
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

      {/* ── コンテンツ ── */}
      <div className={cn("px-4 py-5 sm:px-6 transition-opacity duration-150", isFilterPending && "pointer-events-none opacity-50")}>
        {/* デスクトップ: view 切替。モバイル: カード固定 */}
        <div className="sm:hidden">
          <ProductsCardView
            products={products}
            isFiltered={isFiltered}
            selected={selected}
            onToggle={onToggleSelected}
          />
        </div>
        <div className="hidden sm:block">
          {view === "grid" ? (
            <ProductsCardView
              products={products}
              isFiltered={isFiltered}
              selected={selected}
              onToggle={onToggleSelected}
            />
          ) : (
            <ProductsTable
              products={products}
              isFiltered={isFiltered}
              selected={selected}
              onToggle={onToggleSelected}
              onToggleAll={onToggleAll}
            />
          )}
        </div>
      </div>

      {/* ページネーション */}
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

      {/* 一括操作バー（view 横断で 1 箇所） */}
      <ProductsActionBar
        selectedCount={selected.size}
        onClear={onClearSelected}
      />
    </div>
  );
}
