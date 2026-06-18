"use client";

import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";
import { SALE_TYPE_BADGE, THUMB_HUE, COVER_ILLUSTRATION } from "../../../display";
import { formatPrice } from "../../../format";
import type { ProductDetail } from "../../../types";
import type { ProductFormValues } from "../../../types/validation";

export function ProductPreview({ detail }: { detail: ProductDetail }) {
  const { control } = useFormContext<ProductFormValues>();
  const name = useWatch({ control, name: "name" });
  const description = useWatch({ control, name: "description" });
  const price = useWatch({ control, name: "price" });
  const isFree = useWatch({ control, name: "isFree" });
  const published = useWatch({ control, name: "published" });
  const coverImage = useWatch({ control, name: "coverImage" });

  const badge = SALE_TYPE_BADGE[detail.saleType];
  const excerpt = description.length > 90 ? `${description.slice(0, 90)}…` : description;

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-muted-foreground">プレビュー（ストアでの見え方）</span>
      <div className="w-full max-w-xs overflow-hidden rounded-xl border bg-card shadow-md">
        {/* カバー */}
        <div
          className={cn(
            "relative flex aspect-square w-full items-center justify-center overflow-hidden",
            !coverImage && THUMB_HUE[detail.thumb]
          )}
        >
          {coverImage ? (
            <Image
              src={coverImage.url}
              alt=""
              fill
              className="object-cover"
            />
          ) : (
            COVER_ILLUSTRATION[detail.saleType]
          )}
        </div>

        {/* 情報 */}
        <div className="flex flex-col gap-2 p-3">
          <h3 className="truncate text-sm font-semibold">{name || "(無題の商品)"}</h3>
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                badge.className
              )}
            >
              {badge.label}
            </span>
            <span className="text-sm font-bold">{formatPrice(isFree ? null : price)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "inline-block h-2 w-2 rounded-full",
                published ? "bg-green-500" : "bg-gray-400"
              )}
            />
            <span className="text-xs text-muted-foreground">
              {published ? "公開中" : "下書き"}
            </span>
          </div>
          {excerpt && <p className="text-xs text-muted-foreground">{excerpt}</p>}
        </div>
      </div>
    </div>
  );
}
