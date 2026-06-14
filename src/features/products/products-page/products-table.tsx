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
import { Badge } from "@react-spectrum/s2/Badge";
import { StatusLight } from "@react-spectrum/s2/StatusLight";
import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { MenuTrigger, Menu, MenuItem } from "@react-spectrum/s2/Menu";
import { Image } from "@react-spectrum/s2/Image";
import More from "@react-spectrum/s2/icons/More";
import type { Product, ProductKind, ProductThumb } from "../types";
import { formatPrice, formatRevenue } from "../format";
import { SALE_TYPE_BADGE, THUMB_HUE, KIND_ICON } from "../display";
import { productMenuItems } from "../product-menu";
import { compareProducts } from "./utils";
import { ProductsActionBar } from "./products-action-bar";
import { ProductsEmptyState } from "./products-empty-state";

const thumbBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: "sm",
  flexShrink: 0,
  overflow: "hidden",
});
const thumbImage = style({
  width: "full",
  height: "full",
  objectFit: "cover",
});
// 二調色サムネイル: 共有の背景 hue（THUMB_HUE）+ 同一 hue のアイコン
const thumbIcon = {
  sage: iconStyle({ color: "celery" }),
  sky: iconStyle({ color: "blue" }),
  sand: iconStyle({ color: "orange" }),
  rose: iconStyle({ color: "pink" }),
  lilac: iconStyle({ color: "purple" }),
  mint: iconStyle({ color: "seafoam" }),
} satisfies Record<ProductThumb, unknown>;
const productCell = style({ display: "flex", alignItems: "center", gap: 12 });
// 商品名・価格は一覧での視認性を優先して太字（プロダクト判断。S2 既定より太い）
const boldText = style({ fontWeight: "bold" });

function KindIcon({
  kind,
  styles,
}: {
  kind: ProductKind;
  styles: (typeof thumbIcon)[ProductThumb];
}) {
  const Icon = KIND_ICON[kind];
  return <Icon styles={styles} />;
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
      selectionMode="multiple"
      sortDescriptor={sortDescriptor ?? undefined}
      onSortChange={setSortDescriptor}
      renderActionBar={() => <ProductsActionBar />}
      styles={style({ width: "full", flexGrow: 1, minHeight: 0, marginTop: 8 })}
    >
      <TableHeader>
        <Column id="name" isRowHeader allowsSorting minWidth={260}>
          商品
        </Column>
        <Column id="saleType" align="center" width={130}>
          販売形態
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
                {p.image ? (
                  <div className={thumbBase}>
                    <Image src={p.image} alt="" styles={thumbImage} />
                  </div>
                ) : (
                  <div className={`${thumbBase} ${THUMB_HUE[p.thumb]}`}>
                    <KindIcon kind={p.kind} styles={thumbIcon[p.thumb]} />
                  </div>
                )}
                <span className={boldText}>{p.name}</span>
              </div>
            </Cell>
            <Cell align="center">
              <Badge variant={SALE_TYPE_BADGE[p.saleType].variant}>
                {SALE_TYPE_BADGE[p.saleType].label}
              </Badge>
            </Cell>
            <Cell align="end">
              <span className={boldText}>{formatPrice(p.price)}</span>
            </Cell>
            <Cell align="end">{p.sales}</Cell>
            <Cell align="end">{formatRevenue(p)}</Cell>
            <Cell>
              {/* 状態は塗りチップではなく StatusLight（ドット+ラベル）。
                  S2 公式 Card 例の Published 表現・AEM の公開ステータスと同じ */}
              <StatusLight size="S" variant={p.status === "published" ? "positive" : "neutral"}>
                {p.status === "published" ? "公開中" : "下書き"}
              </StatusLight>
            </Cell>
            <Cell align="end">
              <MenuTrigger>
                <ActionButton isQuiet aria-label="操作">
                  <More />
                </ActionButton>
                <Menu onAction={() => {}}>
                  {productMenuItems(p).map((a) => (
                    <MenuItem key={a.id} id={a.id}>
                      {a.label}
                    </MenuItem>
                  ))}
                </Menu>
              </MenuTrigger>
            </Cell>
          </Row>
        )}
      </TableBody>
    </TableView>
  );
}
