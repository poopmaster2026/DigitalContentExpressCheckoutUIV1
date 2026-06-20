"use client";

import { useFormContext, useWatch } from "react-hook-form";

import { NumberFieldControl, SwitchControl } from "../../../detail/ProductDetailContent/components/FormFields";
import { SectionCard } from "../../../detail/ProductDetailContent/components/SectionCard";
import type { ProductFormValues } from "../../../types/validation";

export function NewPricingSection() {
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
        />
        <div className="flex flex-col gap-4">
          <SwitchControl name="isFree">無料で提供する</SwitchControl>
          <SwitchControl name="published">この商品を公開する</SwitchControl>
        </div>
      </div>
    </SectionCard>
  );
}
