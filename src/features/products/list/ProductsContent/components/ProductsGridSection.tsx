"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { productListQueryOptions } from "@/features/products/api/queries";
import { VIEW_MODES, type ViewMode } from "@/features/products/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";

import { PAGE_SIZE } from "../hooks/useProductsFilter";

import { ProductsCardView } from "./ProductsCardView";
import { ProductsGridSkeleton } from "./ProductsGridSkeleton";
import { ProductsTable } from "./ProductsTable";

function buildPageRange(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "ellipsis", total];
  if (current >= total - 3) return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}

interface ProductsGridSectionProps {
  status: string;
  saleType: string;
  debouncedQuery: string;
  page: number;
  view: ViewMode;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: (ids: string[]) => void;
  onPageChange: (page: number) => void;
  isFiltered: boolean;
  isFilterPending: boolean;
}

export function ProductsGridSection({
  status,
  saleType,
  debouncedQuery,
  page,
  view,
  selected,
  onToggle,
  onToggleAll,
  onPageChange,
  isFiltered,
  isFilterPending,
}: ProductsGridSectionProps) {
  const { data: products = [] } = useSuspenseQuery(
    productListQueryOptions({ status, saleType, q: debouncedQuery })
  );

  // フィルタ変更中はスケルトンを表示（startFilterTransition による React Transition で
  // isFilterPending = true になっている間、現在の DOM ではなくスケルトンを描画する）
  if (isFilterPending) return <ProductsGridSkeleton />;

  const pageCount = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const clampedPage = Math.min(page, pageCount);
  const paginatedProducts = products.slice(
    (clampedPage - 1) * PAGE_SIZE,
    clampedPage * PAGE_SIZE
  );

  return (
    <>
      {/* モバイル: 常にカードグリッド（横パディングは親が提供） */}
      <div className="py-2 sm:hidden">
        <ProductsCardView
          products={paginatedProducts}
          isFiltered={isFiltered}
          selected={selected}
          onToggle={onToggle}
        />
      </div>
      {/* デスクトップ: グリッドは親パディングに委ねる、テーブルはカード端まで伸ばす */}
      <div className="hidden sm:block">
        {view === VIEW_MODES[0] ? (
          <ProductsCardView
            products={paginatedProducts}
            isFiltered={isFiltered}
            selected={selected}
            onToggle={onToggle}
          />
        ) : (
          <ProductsTable
            products={paginatedProducts}
            isFiltered={isFiltered}
            selected={selected}
            onToggle={onToggle}
            onToggleAll={onToggleAll}
          />
        )}
      </div>

      {pageCount > 1 && (
        <div className="border-t px-4 py-4 sm:px-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (clampedPage > 1) onPageChange(clampedPage - 1); }}
                  aria-disabled={clampedPage <= 1}
                  className={clampedPage <= 1 ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
              {buildPageRange(clampedPage, pageCount).map((p, i) =>
                p === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${i}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === clampedPage}
                      onClick={(e) => { e.preventDefault(); onPageChange(p); }}
                      className={p === clampedPage ? "!bg-card" : undefined}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (clampedPage < pageCount) onPageChange(clampedPage + 1); }}
                  aria-disabled={clampedPage >= pageCount}
                  className={clampedPage >= pageCount ? "pointer-events-none opacity-50" : undefined}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
