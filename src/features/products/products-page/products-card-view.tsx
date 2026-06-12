"use client";

import { useState, type ReactNode } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { CardView, type Selection } from "@react-spectrum/s2/CardView";
import { Card, CardPreview, Content, Text, Image } from "@react-spectrum/s2/Card";
import { ActionBar, ActionButton } from "@react-spectrum/s2/ActionBar";
import { Badge } from "@react-spectrum/s2/Badge";
import Edit from "@react-spectrum/s2/icons/Edit";
import Copy from "@react-spectrum/s2/icons/Copy";
import Delete from "@react-spectrum/s2/icons/Delete";
import Book from "@react-spectrum/s2/illustrations/gradient/generic1/FileText";
import Video from "@react-spectrum/s2/illustrations/gradient/generic1/Video";
import ImageStack from "@react-spectrum/s2/illustrations/gradient/generic1/ImageStack";
import Photo from "@react-spectrum/s2/illustrations/gradient/generic1/Image";
import Document from "@react-spectrum/s2/illustrations/gradient/generic1/Document";
import Education from "@react-spectrum/s2/illustrations/gradient/generic1/Education";
import type { Product, ProductKind, ProductThumb } from "../types";
import { formatPrice } from "../mock";
import { ProductsEmptyState } from "./products-empty-state";

const previewImage = style({
  width: "full",
  aspectRatio: "square",
  objectFit: "cover",
  pointerEvents: "none",
});
const previewBase = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "full",
  aspectRatio: "square",
});

// 画像が無い商品のフォールバック（二調色: 同一 hue の 100 インデックス）
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

// カテゴリーの non-semantic カラー（Spectrum Badge の 8 色以内。
// blue は accent と紛らわしいため不使用、yellow は「無料/割引」専用）
const KIND_BADGE: Record<ProductKind, { label: string; variant: "green" | "indigo" | "seafoam" | "magenta" | "fuchsia" | "purple" }> = {
  book: { label: "レシピ本", variant: "green" },
  video: { label: "動画講座", variant: "indigo" },
  collection: { label: "レシピ集", variant: "seafoam" },
  photo: { label: "写真素材", variant: "magenta" },
  template: { label: "テンプレート", variant: "fuchsia" },
  guide: { label: "ガイド", variant: "purple" },
};

// 左上はチェックボックスと重なるため、ステータスは左下に置く
const overlayBottomStart = style({ position: "absolute", bottom: 16, insetStart: 16 });
const overlayEnd = style({ position: "absolute", top: 16, insetEnd: 16 });
const descriptionRow = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  gridArea: "description",
});

export function ProductsCardView({
  products,
  isFiltered,
}: {
  products: Product[];
  isFiltered: boolean;
}) {
  const [selected, setSelected] = useState<Selection>(new Set());

  return (
    <CardView
      aria-label="商品一覧"
      layout="grid"
      variant="quiet"
      selectionMode="multiple"
      selectionStyle="highlight"
      selectedKeys={selected}
      onSelectionChange={setSelected}
      items={products}
      styles={style({ width: "full", flexGrow: 1, minHeight: 0 })}
      renderEmptyState={() => <ProductsEmptyState isFiltered={isFiltered} />}
      renderActionBar={() => (
        <ActionBar>
          <ActionButton onPress={() => {}}>
            <Edit />
            <Text>編集</Text>
          </ActionButton>
          <ActionButton onPress={() => {}}>
            <Copy />
            <Text>複製</Text>
          </ActionButton>
          <ActionButton onPress={() => {}}>
            <Delete />
            <Text>削除</Text>
          </ActionButton>
        </ActionBar>
      )}
    >
      {(p) => (
        <Card id={p.id} textValue={p.name}>
          <CardPreview>
            {p.image ? (
              <Image src={p.image} alt="" styles={previewImage} />
            ) : (
              <div className={`${previewBase} ${previewHue[p.thumb]}`}>
                {kindIllustration[p.kind]}
              </div>
            )}
            {p.status === "draft" && (
              <Badge variant="neutral" styles={overlayBottomStart}>
                下書き
              </Badge>
            )}
            {p.price === null && (
              <Badge variant="yellow" styles={overlayEnd}>
                無料
              </Badge>
            )}
          </CardPreview>
          <Content>
            <Text slot="title">{p.name}</Text>
            <div className={descriptionRow}>
              <Badge variant={KIND_BADGE[p.kind].variant}>{KIND_BADGE[p.kind].label}</Badge>
              <Text slot="description">{formatPrice(p.price)}</Text>
            </div>
          </Content>
        </Card>
      )}
    </CardView>
  );
}
