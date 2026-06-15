"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Image } from "@react-spectrum/s2/Image";
import { Button } from "@react-spectrum/s2/Button";
import { FileTrigger } from "@react-spectrum/s2/FileTrigger";
import type { ProductDetail } from "../../types";
import { THUMB_HUE, COVER_ILLUSTRATION } from "../../display";
import { SectionHeading } from "./SectionHeading";
import { TextFieldControl, TextAreaControl } from "./FormFields";
import type { ProductFormValues } from "../hooks/useProductDetailForm";

const section = style({ display: "flex", flexDirection: "column", gap: 24 });
const field = style({ display: "flex", flexDirection: "column", gap: 8 });
const fieldLabel = style({ font: "ui", color: "neutral-subdued" });
const coverRow = style({ display: "flex", alignItems: "center", gap: 16 });
const coverThumb = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 96,
  height: 96,
  borderRadius: "default",
  overflow: "hidden",
  flexShrink: 0,
});
const coverImg = style({ width: "full", height: "full", objectFit: "cover" });

export function BasicInfoSection({ detail }: { detail: ProductDetail }) {
  const { control, setValue } = useFormContext<ProductFormValues>();
  const coverImage = useWatch({ control, name: "coverImage" });

  return (
    <section className={section}>
      <SectionHeading>基本情報</SectionHeading>
      <TextFieldControl name="name" label="商品名" isRequired />
      <TextAreaControl name="description" label="説明" />
      <div className={field}>
        <span className={fieldLabel}>カバー画像</span>
        <div className={coverRow}>
          {/* 未設定時は販売形態で固定の generic2 イラストを表示（COVER_ILLUSTRATION） */}
          <div className={`${coverThumb} ${coverImage ? "" : THUMB_HUE[detail.thumb]}`}>
            {coverImage ? (
              <Image src={coverImage} alt="" styles={coverImg} />
            ) : (
              COVER_ILLUSTRATION[detail.saleType]
            )}
          </div>
          <FileTrigger
            acceptedFileTypes={["image/*"]}
            onSelect={(files) => {
              const file = files?.[0];
              if (file)
                setValue("coverImage", URL.createObjectURL(file), {
                  shouldDirty: true,
                });
            }}
          >
            <Button variant="secondary" fillStyle="outline">
              画像を変更
            </Button>
          </FileTrigger>
        </div>
      </div>
    </section>
  );
}
