"use client";

import { useMemo, useState } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import {
  SegmentedControl,
  SegmentedControlItem,
  type Key,
} from "@react-spectrum/s2/SegmentedControl";
import { Picker, PickerItem } from "@react-spectrum/s2/Picker";
import ViewGrid from "@react-spectrum/s2/icons/ViewGrid";
import ViewList from "@react-spectrum/s2/icons/ViewList";
import { useAppSearch } from "@/shared/components/app-shell/search-context";
import { PRODUCTS } from "../mock";
import { SALE_TYPE_BADGE } from "../sale-type";
import { ProductsCardView } from "./products-card-view";
import { ProductsTable } from "./products-table";

// 公式 Photos ページのリズム: タイトル行 marginBottom 8 + CardView 内蔵の上オフセット
const page = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  flexGrow: 1,
  minHeight: 0,
});
const pageTitle = style({ font: "heading", marginY: 0 });
const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});
const spacer = style({ flexGrow: 1 });

export function ProductsPage() {
  const [filter, setFilter] = useState<Key>("all");
  const [saleTypeFilter, setSaleTypeFilter] = useState<Key>("all");
  const [view, setView] = useState<Key>("grid");
  const { query } = useAppSearch();

  const products = useMemo(() => {
    const q = query.trim();
    return PRODUCTS.filter((p) => {
      const okStatus = filter === "all" || p.status === filter;
      const okSaleType = saleTypeFilter === "all" || p.saleType === saleTypeFilter;
      const okQuery = q === "" || p.name.includes(q);
      return okStatus && okSaleType && okQuery;
    });
  }, [filter, saleTypeFilter, query]);

  const isFiltered = query.trim() !== "" || filter !== "all" || saleTypeFilter !== "all";

  return (
    <div className={page}>
      <div className={titleRow}>
        <h1 className={pageTitle}>商品</h1>
        <div className={spacer} />
        <Picker
          aria-label="販売形態で絞り込み"
          selectedKey={saleTypeFilter}
          onSelectionChange={(key) => key !== null && setSaleTypeFilter(key)}
          styles={style({ width: 160 })}
        >
          <PickerItem id="all">すべての形態</PickerItem>
          {Object.entries(SALE_TYPE_BADGE).map(([id, { label }]) => (
            <PickerItem key={id} id={id}>
              {label}
            </PickerItem>
          ))}
        </Picker>
        <Picker
          aria-label="ステータスで絞り込み"
          selectedKey={filter}
          onSelectionChange={(key) => key !== null && setFilter(key)}
          styles={style({ width: 160 })}
        >
          <PickerItem id="all">すべての商品</PickerItem>
          <PickerItem id="published">公開中</PickerItem>
          <PickerItem id="draft">下書き</PickerItem>
        </Picker>
        <SegmentedControl
          aria-label="表示形式"
          selectedKey={view}
          onSelectionChange={setView}
        >
          <SegmentedControlItem id="grid" aria-label="グリッド表示">
            <ViewGrid />
          </SegmentedControlItem>
          <SegmentedControlItem id="list" aria-label="リスト表示">
            <ViewList />
          </SegmentedControlItem>
        </SegmentedControl>
      </div>

      {view === "grid" ? (
        <ProductsCardView products={products} isFiltered={isFiltered} />
      ) : (
        <ProductsTable products={products} isFiltered={isFiltered} />
      )}
    </div>
  );
}
