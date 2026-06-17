"use client";

import ViewGrid from "@react-spectrum/s2/icons/ViewGrid";
import ViewList from "@react-spectrum/s2/icons/ViewList";
import { Picker, PickerItem } from "@react-spectrum/s2/Picker";
import {
  SegmentedControl,
  SegmentedControlItem,
} from "@react-spectrum/s2/SegmentedControl";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { Key } from "react-aria-components";

import { SALE_TYPE_BADGE } from "../display";
import type { Product } from "../types";

import { ProductsCardView } from "./components/ProductsCardView";
import { ProductsTable } from "./components/ProductsTable";

const page = style({
  display: "flex",
  flexDirection: "column",
  gap: 8,
  flexGrow: 1,
  minHeight: 0,
});
const pageTitle = style({ font: "heading", marginY: 0, flexShrink: 0 });
const titleRow = style({
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: 12,
  rowGap: 8,
});
// Picker + SegmentedControl をひとまとめにして、狭幅時に h1 の下へ折り返す
const controlsGroup = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
});
const spacer = style({ flexGrow: 1 });

type Props = {
  products: Product[];
  isFiltered: boolean;
  statusFilter: Key;
  onStatusChange: (key: Key) => void;
  saleTypeFilter: Key;
  onSaleTypeChange: (key: Key) => void;
  view: Key;
  onViewChange: (key: Key) => void;
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
}: Props) {
  return (
    <div className={page}>
      <div className={titleRow}>
        <h1 className={pageTitle}>商品</h1>
        <div className={spacer} />
        <div className={controlsGroup}>
          <Picker
            aria-label="販売形態で絞り込み"
            selectedKey={saleTypeFilter}
            onSelectionChange={(key) => key !== null && onSaleTypeChange(key)}
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
            selectedKey={statusFilter}
            onSelectionChange={(key) => key !== null && onStatusChange(key)}
          >
            <PickerItem id="all">すべての商品</PickerItem>
            <PickerItem id="published">公開中</PickerItem>
            <PickerItem id="draft">下書き</PickerItem>
          </Picker>
          <SegmentedControl
            aria-label="表示形式"
            selectedKey={view}
            onSelectionChange={onViewChange}
          >
            <SegmentedControlItem id="grid" aria-label="グリッド表示">
              <ViewGrid />
            </SegmentedControlItem>
            <SegmentedControlItem id="list" aria-label="リスト表示">
              <ViewList />
            </SegmentedControlItem>
          </SegmentedControl>
        </div>
      </div>

      {view === "grid" ? (
        <ProductsCardView products={products} isFiltered={isFiltered} />
      ) : (
        <ProductsTable products={products} isFiltered={isFiltered} />
      )}
    </div>
  );
}
