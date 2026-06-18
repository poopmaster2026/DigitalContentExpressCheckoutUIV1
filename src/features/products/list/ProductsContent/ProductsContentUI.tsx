"use client";

import { LayoutGrid, List } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/lib/utils";
import { SALE_TYPE_BADGE } from "../../display";
import type { Product } from "../../types";

import { ProductsCardView } from "./components/ProductsCardView";
import { ProductsTable } from "./components/ProductsTable";

type ProductsContentUIProps = {
  products: Product[];
  isFiltered: boolean;
  statusFilter: string;
  onStatusChange: (key: string) => void;
  saleTypeFilter: string;
  onSaleTypeChange: (key: string) => void;
  view: string;
  onViewChange: (key: string) => void;
};

export function ProductsContentUI({
  products,
  isFiltered,
  statusFilter,
  onStatusChange,
  saleTypeFilter,
  onSaleTypeChange,
  view,
  onViewChange,
}: ProductsContentUIProps) {
  return (
    <div className="flex flex-col">
      {/* ページヘッダー */}
      <div className="flex flex-wrap items-center gap-3 border-b bg-muted/30 px-5 py-3">
        <h1 className="text-lg font-bold">商品</h1>
        <div className="flex-1" />

        <Select value={saleTypeFilter} onValueChange={onSaleTypeChange}>
          <SelectTrigger className="h-9 w-40 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての形態</SelectItem>
            {Object.entries(SALE_TYPE_BADGE).map(([id, { label }]) => (
              <SelectItem key={id} value={id}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="h-9 w-40 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての商品</SelectItem>
            <SelectItem value="published">公開中</SelectItem>
            <SelectItem value="draft">下書き</SelectItem>
          </SelectContent>
        </Select>

        {/* グリッド / リスト 切替 */}
        <div className="flex items-center rounded-lg border bg-background p-0.5 gap-0.5">
          <button
            onClick={() => onViewChange("grid")}
            aria-label="グリッド表示"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
              view === "grid"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            aria-label="リスト表示"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
              view === "list"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="p-5">
        {view === "grid" ? (
          <ProductsCardView products={products} isFiltered={isFiltered} />
        ) : (
          <ProductsTable products={products} isFiltered={isFiltered} />
        )}
      </div>
    </div>
  );
}
