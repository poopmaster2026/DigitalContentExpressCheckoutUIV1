"use client";

import { useMemo, useState } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import {
  SegmentedControl,
  SegmentedControlItem,
  type Key,
} from "@react-spectrum/s2/SegmentedControl";
import { SearchField } from "@react-spectrum/s2/SearchField";
import { Picker, PickerItem } from "@react-spectrum/s2/Picker";
import { Button } from "@react-spectrum/s2/Button";
import { Text } from "@react-spectrum/s2/Text";
import Add from "@react-spectrum/s2/icons/Add";
import ViewGrid from "@react-spectrum/s2/icons/ViewGrid";
import ViewList from "@react-spectrum/s2/icons/ViewList";
import { PRODUCTS } from "../mock";
import { ProductsCardView } from "./products-card-view";
import { ProductsTable } from "./products-table";

const page = style({
  display: "flex",
  flexDirection: "column",
  gap: 16,
  flexGrow: 1,
  minHeight: 0,
});
const pageTitle = style({ font: "heading" });
const titleRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
});
const toolbar = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
});

export function ProductsPage() {
  const [filter, setFilter] = useState<Key>("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<Key>("grid");

  const products = useMemo(() => {
    const q = query.trim();
    return PRODUCTS.filter((p) => {
      const okStatus = filter === "all" || p.status === filter;
      const okQuery = q === "" || p.name.includes(q);
      return okStatus && okQuery;
    });
  }, [filter, query]);

  const isFiltered = query.trim() !== "" || filter !== "all";

  return (
    <div className={page}>
      <div className={titleRow}>
        <h1 className={pageTitle}>商品</h1>
        <Button variant="accent" onPress={() => {}}>
          <Add />
          <Text>新規商品</Text>
        </Button>
      </div>

      <div className={toolbar}>
        <SearchField
          aria-label="商品を検索"
          placeholder="商品を検索"
          value={query}
          onChange={setQuery}
          styles={style({ width: 280 })}
        />
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
        <div className={style({ flexGrow: 1 })} />
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
