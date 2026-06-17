"use client";

import { Button } from "@react-spectrum/s2/Button";
import { FileTrigger } from "@react-spectrum/s2/FileTrigger";
import { Image } from "@react-spectrum/s2/Image";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useFormContext, useWatch } from "react-hook-form";

import { THUMB_HUE, COVER_ILLUSTRATION } from "../../../display";
import type { ProductDetail } from "../../../types";
import {
  COVER_IMAGE_ACCEPTED_TYPES,
  type ProductFormValues,
} from "../../../types/validation";

import { TextAreaControl, TextFieldControl } from "./FormFields";
import { SectionHeading } from "./SectionHeading";

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
const metaText = style({ font: "ui", color: "neutral-subdued", marginY: 0 });
const errorText = style({ font: "ui", color: "negative", marginY: 0 });

export function BasicInfoSection({
  detail,
}: {
  detail: Pick<ProductDetail, "thumb" | "saleType">;
}) {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext<ProductFormValues>();
  const coverImage = useWatch({ control, name: "coverImage" });

  const handleCoverImage = (file: File) => {
    setValue(
      "coverImage",
      { url: URL.createObjectURL(file), name: file.name, size: file.size, type: file.type },
      { shouldDirty: true }
    );
    trigger("coverImage");
  };

  const coverImageError = (errors.coverImage as { message?: string } | undefined)
    ?.message;

  return (
    <section className={section}>
      <SectionHeading>基本情報</SectionHeading>
      <TextFieldControl name="name" label="商品名" isRequired />
      <TextAreaControl name="description" label="説明" />
      <div className={field}>
        <span className={fieldLabel}>カバー画像</span>
        <div className={coverRow}>
          <div
            className={`${coverThumb} ${coverImage?.url ? "" : THUMB_HUE[detail.thumb]}`}
          >
            {coverImage?.url ? (
              <Image src={coverImage.url} alt="" styles={coverImg} />
            ) : (
              COVER_ILLUSTRATION[detail.saleType]
            )}
          </div>
          <div className={style({ display: "flex", flexDirection: "column", gap: 8 })}>
            <FileTrigger
              acceptedFileTypes={[...COVER_IMAGE_ACCEPTED_TYPES]}
              onSelect={(files) => {
                const file = files?.[0];
                if (file) handleCoverImage(file);
              }}
            >
              <Button variant="secondary" fillStyle="outline">
                画像を変更
              </Button>
            </FileTrigger>
            <p className={metaText}>JPEG・PNG・WebP・GIF（最大10MB）</p>
            {coverImageError && (
              <p className={errorText}>{coverImageError}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
