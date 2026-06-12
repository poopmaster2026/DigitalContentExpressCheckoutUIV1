"use client";

import type { ReactNode } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { CardView } from "@react-spectrum/s2/CardView";
import { Card, CardPreview, Content, Footer, Text } from "@react-spectrum/s2/Card";
import { ActionMenu, MenuItem } from "@react-spectrum/s2/ActionMenu";
import { StatusLight } from "@react-spectrum/s2/StatusLight";
import { Badge } from "@react-spectrum/s2/Badge";
import Book from "@react-spectrum/s2/illustrations/gradient/generic1/FileText";
import Video from "@react-spectrum/s2/illustrations/gradient/generic1/Video";
import ImageStack from "@react-spectrum/s2/illustrations/gradient/generic1/ImageStack";
import Photo from "@react-spectrum/s2/illustrations/gradient/generic1/Image";
import Document from "@react-spectrum/s2/illustrations/gradient/generic1/Document";
import Education from "@react-spectrum/s2/illustrations/gradient/generic1/Education";
import type { Product, ProductKind, ProductThumb } from "../types";
import { formatPrice } from "../mock";
import { ProductsEmptyState } from "./products-empty-state";

const previewBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "full",
  aspectRatio: "2/1",
});

// 二調色プレビュー背景（同一 hue の 100 インデックス）
const previewHue: Record<ProductThumb, string> = {
  sage: style({ backgroundColor: "celery-100" }),
  sky: style({ backgroundColor: "blue-100" }),
  sand: style({ backgroundColor: "orange-100" }),
  rose: style({ backgroundColor: "pink-100" }),
  lilac: style({ backgroundColor: "purple-100" }),
  mint: style({ backgroundColor: "seafoam-100" }),
};

const kindIllustration: Record<ProductKind, ReactNode> = {
  book: <Book />,
  video: <Video />,
  collection: <ImageStack />,
  photo: <Photo />,
  template: <Document />,
  guide: <Education />,
};

const freeBadge = style({ position: "absolute", top: 16, insetEnd: 16 });

export function ProductsCardView({
  products,
  isFiltered,
}: {
  products: Product[];
  isFiltered: boolean;
}) {
  return (
    <CardView
      aria-label="商品一覧"
      layout="grid"
      items={products}
      styles={style({ width: "full", flexGrow: 1, minHeight: 0 })}
      renderEmptyState={() => <ProductsEmptyState isFiltered={isFiltered} />}
    >
      {(p) => (
        <Card id={p.id} textValue={p.name}>
          <CardPreview>
            <div className={`${previewBase} ${previewHue[p.thumb]}`}>
              {kindIllustration[p.kind]}
            </div>
            {p.price === null && (
              <Badge variant="yellow" styles={freeBadge}>
                無料
              </Badge>
            )}
          </CardPreview>
          <Content>
            <Text slot="title">{p.name}</Text>
            <ActionMenu aria-label="操作" onAction={() => {}}>
              <MenuItem id="edit">編集</MenuItem>
              <MenuItem id="duplicate">複製</MenuItem>
              <MenuItem id="toggle">
                {p.status === "published" ? "下書きに戻す" : "公開する"}
              </MenuItem>
              <MenuItem id="delete">削除</MenuItem>
            </ActionMenu>
            <Text slot="description">
              {formatPrice(p.price)}・販売 {p.sales}件
            </Text>
          </Content>
          <Footer>
            <StatusLight size="S" variant={p.status === "published" ? "positive" : "neutral"}>
              {p.status === "published" ? "公開中" : "下書き"}
            </StatusLight>
          </Footer>
        </Card>
      )}
    </CardView>
  );
}
