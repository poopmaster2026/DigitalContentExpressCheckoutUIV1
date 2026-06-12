"use client";

import { useState, type ReactNode } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { CardView, type Selection } from "@react-spectrum/s2/CardView";
import { Card, CardPreview, Content, Text, Image } from "@react-spectrum/s2/Card";
import { ActionBar, ActionButton } from "@react-spectrum/s2/ActionBar";
import { ActionMenu, MenuItem } from "@react-spectrum/s2/ActionMenu";
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
import { SALE_TYPE_BADGE } from "../sale-type";
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

// プレビュー上のオーバーレイは例外状態（下書き）のみ。位置は公式 Gallery 例と同じ右上
const overlayTopEnd = style({ position: "absolute", top: 16, insetEnd: 16 });
const descriptionRow = style({
  display: "flex",
  alignItems: "center",
  gap: 8,
  gridArea: "description",
});
// S2 の title トークンは weight 500。日本語（Adobe Clean Han）では欧文より細く
// 見えるため、タイトルだけ bold に引き上げる（公式例の見た目に合わせる）
const titleText = style({ fontWeight: "bold" });

/** 選択時の一括操作バー（公式例どおりアイコンのみ + emphasized）。グリッド/テーブル共用。 */
export function ProductsActionBar() {
  return (
    <ActionBar isEmphasized>
      <ActionButton aria-label="編集" onPress={() => {}}>
        <Edit />
      </ActionButton>
      <ActionButton aria-label="複製" onPress={() => {}}>
        <Copy />
      </ActionButton>
      <ActionButton aria-label="削除" onPress={() => {}}>
        <Delete />
      </ActionButton>
    </ActionBar>
  );
}

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
      selectionMode="multiple"
      selectedKeys={selected}
      onSelectionChange={setSelected}
      items={products}
      // marginX -16 = size M の GridLayout が CardView 内側に持つ 16px の端ガターを
      // 相殺し、カード列をタイトル/テーブルと左右で揃える（公式 Photos の手法）
      styles={style({ width: "full", flexGrow: 1, minHeight: 0, marginX: -16 })}
      renderEmptyState={() => <ProductsEmptyState isFiltered={isFiltered} />}
      renderActionBar={() => <ProductsActionBar />}
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
            {/* オーバーレイは例外状態（下書き）のみ。正常状態（公開中）は無印 */}
            {p.status === "draft" && (
              <Badge variant="neutral" styles={overlayTopEnd}>
                下書き
              </Badge>
            )}
          </CardPreview>
          <Content>
            <Text slot="title">
              <span className={titleText}>{p.name}</span>
            </Text>
            <ActionMenu aria-label="操作" onAction={() => {}}>
              <MenuItem id="edit">編集</MenuItem>
              <MenuItem id="duplicate">複製</MenuItem>
              <MenuItem id="toggle">
                {p.status === "published" ? "下書きに戻す" : "公開する"}
              </MenuItem>
              <MenuItem id="delete">削除</MenuItem>
            </ActionMenu>
            <div className={descriptionRow}>
              <Badge variant={SALE_TYPE_BADGE[p.saleType].variant}>
                {SALE_TYPE_BADGE[p.saleType].label}
              </Badge>
              <Text slot="description">{formatPrice(p.price)}</Text>
            </div>
          </Content>
        </Card>
      )}
    </CardView>
  );
}
