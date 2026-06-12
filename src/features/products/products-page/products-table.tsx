"use client";

import { useState } from "react";
import { style, iconStyle } from "@react-spectrum/s2/style" with { type: "macro" };
import {
  TableView,
  TableHeader,
  Column,
  TableBody,
  Row,
  Cell,
  type SortDescriptor,
} from "@react-spectrum/s2/TableView";
import { StatusLight } from "@react-spectrum/s2/StatusLight";
import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { MenuTrigger, Menu, MenuItem } from "@react-spectrum/s2/Menu";
import More from "@react-spectrum/s2/icons/More";
import FileText from "@react-spectrum/s2/icons/FileText";
import Video from "@react-spectrum/s2/icons/Video";
import Images from "@react-spectrum/s2/icons/Images";
import ImageIcon from "@react-spectrum/s2/icons/Image";
import File from "@react-spectrum/s2/icons/File";
import Education from "@react-spectrum/s2/icons/Education";
import type { Product, ProductKind, ProductThumb } from "../types";
import { formatPrice, formatRevenue } from "../mock";
import { ProductsEmptyState } from "./products-empty-state";

const thumbBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "default",
  flexShrink: 0,
});
// 二調色サムネイル（同一 hue: 背景 100 + アイコン）
const thumbHue: Record<ProductThumb, string> = {
  sage: style({ backgroundColor: "celery-100" }),
  sky: style({ backgroundColor: "blue-100" }),
  sand: style({ backgroundColor: "orange-100" }),
  rose: style({ backgroundColor: "pink-100" }),
  lilac: style({ backgroundColor: "purple-100" }),
  mint: style({ backgroundColor: "seafoam-100" }),
};
const thumbIcon = {
  sage: iconStyle({ color: "celery" }),
  sky: iconStyle({ color: "blue" }),
  sand: iconStyle({ color: "orange" }),
  rose: iconStyle({ color: "pink" }),
  lilac: iconStyle({ color: "purple" }),
  mint: iconStyle({ color: "seafoam" }),
} satisfies Record<ProductThumb, unknown>;
const productCell = style({ display: "flex", alignItems: "center", gap: 12 });

function KindIcon({
  kind,
  styles,
}: {
  kind: ProductKind;
  styles: (typeof thumbIcon)[ProductThumb];
}) {
  switch (kind) {
    case "book":
      return <FileText styles={styles} />;
    case "video":
      return <Video styles={styles} />;
    case "collection":
      return <Images styles={styles} />;
    case "photo":
      return <ImageIcon styles={styles} />;
    case "template":
      return <File styles={styles} />;
    case "guide":
      return <Education styles={styles} />;
  }
}

function compareProducts(a: Product, b: Product, column: SortDescriptor["column"]) {
  switch (column) {
    case "name":
      return a.name.localeCompare(b.name, "ja");
    case "price":
      return (a.price ?? 0) - (b.price ?? 0);
    case "sales":
      return a.sales - b.sales;
    case "revenue":
      return a.revenue - b.revenue;
    default:
      return 0;
  }
}

export function ProductsTable({
  products,
  isFiltered,
}: {
  products: Product[];
  isFiltered: boolean;
}) {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor | null>(null);

  let rows = products;
  if (sortDescriptor) {
    rows = [...products].sort((a, b) => {
      const cmp = compareProducts(a, b, sortDescriptor.column);
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }

  return (
    <TableView
      aria-label="商品一覧"
      sortDescriptor={sortDescriptor ?? undefined}
      onSortChange={setSortDescriptor}
      styles={style({ width: "full", flexGrow: 1, minHeight: 0 })}
    >
      <TableHeader>
        <Column id="name" isRowHeader allowsSorting minWidth={260}>
          商品
        </Column>
        <Column id="price" align="end" allowsSorting width={120}>
          価格
        </Column>
        <Column id="sales" align="end" allowsSorting width={110}>
          販売数
        </Column>
        <Column id="revenue" align="end" allowsSorting width={140}>
          売上
        </Column>
        <Column id="status" width={140}>
          状態
        </Column>
        <Column id="actions" align="end" width={56} textValue="操作">
          {""}
        </Column>
      </TableHeader>
      <TableBody
        items={rows}
        renderEmptyState={() => <ProductsEmptyState isFiltered={isFiltered} />}
      >
        {(p) => (
          <Row id={p.id}>
            <Cell>
              <div className={productCell}>
                <div className={`${thumbBase} ${thumbHue[p.thumb]}`}>
                  <KindIcon kind={p.kind} styles={thumbIcon[p.thumb]} />
                </div>
                <span>{p.name}</span>
              </div>
            </Cell>
            <Cell>{formatPrice(p.price)}</Cell>
            <Cell>{p.sales}</Cell>
            <Cell>{formatRevenue(p)}</Cell>
            <Cell>
              <StatusLight variant={p.status === "published" ? "positive" : "neutral"} size="S">
                {p.status === "published" ? "公開中" : "下書き"}
              </StatusLight>
            </Cell>
            <Cell>
              <MenuTrigger>
                <ActionButton isQuiet aria-label="操作">
                  <More />
                </ActionButton>
                <Menu onAction={() => {}}>
                  <MenuItem id="edit">編集</MenuItem>
                  <MenuItem id="duplicate">複製</MenuItem>
                  <MenuItem id="toggle">
                    {p.status === "published" ? "下書きに戻す" : "公開する"}
                  </MenuItem>
                  <MenuItem id="delete">削除</MenuItem>
                </Menu>
              </MenuTrigger>
            </Cell>
          </Row>
        )}
      </TableBody>
    </TableView>
  );
}
