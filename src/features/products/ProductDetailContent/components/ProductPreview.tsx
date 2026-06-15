"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Image } from "@react-spectrum/s2/Image";
import { Badge } from "@react-spectrum/s2/Badge";
import { StatusLight } from "@react-spectrum/s2/StatusLight";
import type { ProductDetail } from "../../types";
import { SALE_TYPE_BADGE, THUMB_HUE, COVER_ILLUSTRATION } from "../../display";
import { formatPrice } from "../../format";
import type { ProductFormValues } from "../hooks/useProductDetailForm";

const caption = style({ font: "ui", color: "neutral-subdued", marginBottom: 8, display: "block" });
// プレビューは「コンテンツのカード」の再現なので一覧カードと同様にソフト影を許容
const card = style({
  backgroundColor: "base",
  borderRadius: "xl",
  boxShadow: "elevated",
  overflow: "hidden",
  width: "full",
  maxWidth: 320,
});
const previewBox = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "full",
  aspectRatio: "square",
  overflow: "hidden",
});
const previewImg = style({ width: "full", height: "full", objectFit: "cover" });
const body = style({ display: "flex", flexDirection: "column", gap: 8, padding: 16 });
const titleText = style({ font: "heading-sm", marginY: 0 });
const metaRow = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 8,
});
const priceText = style({ fontWeight: "bold" });
const descText = style({ font: "body-sm", color: "neutral-subdued", marginY: 0 });

export function ProductPreview({ detail }: { detail: ProductDetail }) {
  const { control } = useFormContext<ProductFormValues>();
  const name = useWatch({ control, name: "name" });
  const description = useWatch({ control, name: "description" });
  const price = useWatch({ control, name: "price" });
  const isFree = useWatch({ control, name: "isFree" });
  const published = useWatch({ control, name: "published" });
  const coverImage = useWatch({ control, name: "coverImage" });
  const badge = SALE_TYPE_BADGE[detail.saleType];
  const excerpt =
    description.length > 90 ? `${description.slice(0, 90)}…` : description;

  return (
    <div>
      <span className={caption}>プレビュー（ストアでの見え方）</span>
      <div className={card}>
        <div className={`${previewBox} ${coverImage ? "" : THUMB_HUE[detail.thumb]}`}>
          {coverImage ? (
            <Image src={coverImage} alt="" styles={previewImg} />
          ) : (
            COVER_ILLUSTRATION[detail.saleType]
          )}
        </div>
        <div className={body}>
          <h3 className={titleText}>{name || "(無題の商品)"}</h3>
          <div className={metaRow}>
            <Badge variant={badge.variant}>{badge.label}</Badge>
            <span className={priceText}>{formatPrice(isFree ? null : price)}</span>
          </div>
          <StatusLight size="S" variant={published ? "positive" : "neutral"}>
            {published ? "公開中" : "下書き"}
          </StatusLight>
          {excerpt && <p className={descText}>{excerpt}</p>}
        </div>
      </div>
    </div>
  );
}
