"use client";

import Image from "next/image";
import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/lib/utils";
import { THUMB_HUE, COVER_ILLUSTRATION } from "../../../display";
import type { ProductDetail } from "../../../types";
import {
  COVER_IMAGE_ACCEPTED_TYPES,
  type ProductFormValues,
} from "../../../types/validation";

import { TextAreaControl, TextFieldControl } from "./FormFields";
import { SectionHeading } from "./SectionHeading";

type BasicInfoSectionProps = {
  detail: Pick<ProductDetail, "thumb" | "saleType">;
};

export function BasicInfoSection({ detail }: BasicInfoSectionProps) {
  const {
    setValue,
    trigger,
    control,
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

  const coverImageError = (errors.coverImage as { message?: string } | undefined)?.message;

  return (
    <section className="flex flex-col gap-5">
      <SectionHeading>基本情報</SectionHeading>
      <TextFieldControl name="name" label="商品名" isRequired />
      <TextAreaControl name="description" label="説明" />

      <div className="flex flex-col gap-2">
        <Label>カバー画像</Label>
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg",
              !coverImage?.url && THUMB_HUE[detail.thumb]
            )}
          >
            {coverImage?.url ? (
              <Image
                src={coverImage.url}
                alt=""
                width={96}
                height={96}
                className="h-full w-full object-cover"
              />
            ) : (
              COVER_ILLUSTRATION[detail.saleType]
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label>
              <Button variant="outline" size="sm" asChild>
                <span className="cursor-pointer">
                  画像を変更
                  <input
                    type="file"
                    accept={COVER_IMAGE_ACCEPTED_TYPES.join(",")}
                    className="sr-only"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleCoverImage(file);
                    }}
                  />
                </span>
              </Button>
            </label>
            <p className="text-xs text-muted-foreground">JPEG・PNG・WebP・GIF（最大10MB）</p>
            {coverImageError && (
              <p className="text-xs text-destructive">{coverImageError}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
