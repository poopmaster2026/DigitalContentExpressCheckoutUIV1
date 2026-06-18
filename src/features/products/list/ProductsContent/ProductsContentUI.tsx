"use client";

import { LayoutGrid, List } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/shared/components/ui/toggle-group";
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
    <div className="flex flex-1 flex-col gap-4 overflow-hidden p-5">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">商品</h1>
        <div className="flex-1" />
        <Select
          value={String(saleTypeFilter)}
          onValueChange={(v) => onSaleTypeChange(v)}
        >
          <SelectTrigger className="h-9 w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての形態</SelectItem>
            {Object.entries(SALE_TYPE_BADGE).map(([id, { label }]) => (
              <SelectItem key={id} value={id}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={String(statusFilter)}
          onValueChange={(v) => onStatusChange(v)}
        >
          <SelectTrigger className="h-9 w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての商品</SelectItem>
            <SelectItem value="published">公開中</SelectItem>
            <SelectItem value="draft">下書き</SelectItem>
          </SelectContent>
        </Select>
        <ToggleGroup
          type="single"
          value={String(view)}
          onValueChange={(v) => v && onViewChange(v)}
          aria-label="表示形式"
        >
          <ToggleGroupItem value="grid" aria-label="グリッド表示" className="h-9 w-9">
            <LayoutGrid className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="list" aria-label="リスト表示" className="h-9 w-9">
            <List className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {view === "grid" ? (
        <ProductsCardView products={products} isFiltered={isFiltered} />
      ) : (
        <ProductsTable products={products} isFiltered={isFiltered} />
      )}
    </div>
  );
}
