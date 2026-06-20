"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";

import type { ProductDetail } from "../../../types";
import type { ProductFormValues } from "../../../types/validation";

import { NumberFieldControl, SwitchControl } from "./FormFields";
import { SectionCard } from "./SectionCard";

export function PricingSection({ detail }: { detail: ProductDetail }) {
  const { control } = useFormContext<ProductFormValues>();
  const isFree = useWatch({ control, name: "isFree" });

  return (
    <SectionCard title="価格・公開">
      <div className="flex flex-col gap-5">
        <NumberFieldControl
          name="price"
          label="価格"
          isRequired={!isFree}
          isDisabled={isFree}
          minValue={0}
          formatOptions={{ style: "currency", currency: "JPY", maximumFractionDigits: 0 }}
        />
        <div className="flex flex-col gap-4">
          <SwitchControl name="isFree">無料で提供する</SwitchControl>
          <SwitchControl name="published">この商品を公開する</SwitchControl>
        </div>

        <Separator />

        <div className="flex flex-col gap-1">
          <Label className="text-xs text-muted-foreground">商品URL</Label>
          <a
            href={`/store/products/${detail.id}`}
            className="text-sm text-link underline underline-offset-4 hover:text-link/80"
          >
            {`yourstore.com/p/${detail.slug}`}
          </a>
        </div>
      </div>
    </SectionCard>
  );
}
