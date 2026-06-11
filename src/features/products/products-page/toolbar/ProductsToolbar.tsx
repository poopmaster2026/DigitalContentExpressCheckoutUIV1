"use client";

import { Chip, ChipGroup } from "@/shared/components/ui/chip-group";
import { SearchField } from "@/shared/components/ui/search-field";
import type { ProductStatusFilter } from "../../types/product";

interface ProductsToolbarProps {
  statusFilter: ProductStatusFilter;
  onStatusFilterChange: (filter: ProductStatusFilter) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

/** ステータスチップ（すべて / 公開中 / 下書き）+ 検索ピル */
export function ProductsToolbar({
  statusFilter,
  onStatusFilterChange,
  query,
  onQueryChange,
}: ProductsToolbarProps) {
  return (
    <div className="products-toolbar">
      <ChipGroup
        aria-label="状態で絞り込み"
        selectedKeys={[statusFilter]}
        onSelectionChange={(keys) => {
          const key = [...keys][0];
          if (key) onStatusFilterChange(key as ProductStatusFilter);
        }}
      >
        <Chip id="all">すべて</Chip>
        <Chip id="published">公開中</Chip>
        <Chip id="draft">下書き</Chip>
      </ChipGroup>
      <SearchField
        aria-label="商品を検索"
        placeholder="商品を検索"
        value={query}
        onChange={onQueryChange}
        className="products-toolbar__search"
      />
    </div>
  );
}
