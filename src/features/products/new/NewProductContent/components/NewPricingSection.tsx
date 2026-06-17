"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useFormContext, useWatch } from "react-hook-form";

import {
  NumberFieldControl,
  SwitchControl,
} from "../../../detail/ProductDetailContent/components/FormFields";
import { SectionHeading } from "../../../detail/ProductDetailContent/components/SectionHeading";
import type { ProductFormValues } from "../../../types/validation";

const section = style({ display: "flex", flexDirection: "column", gap: 24 });
const switchGroup = style({ display: "flex", flexDirection: "column", gap: 16 });

/** 新規作成用の価格・公開セクション。商品 URL（slug 未確定）は表示しない。 */
export function NewPricingSection() {
  const { control } = useFormContext<ProductFormValues>();
  const isFree = useWatch({ control, name: "isFree" });

  return (
    <section className={section}>
      <SectionHeading>価格・公開</SectionHeading>
      <NumberFieldControl
        name="price"
        label="価格"
        isRequired={!isFree}
        isDisabled={isFree}
        minValue={0}
        formatOptions={{
          style: "currency",
          currency: "JPY",
          maximumFractionDigits: 0,
        }}
      />
      <div className={switchGroup}>
        <SwitchControl name="isFree">無料で提供する</SwitchControl>
        <SwitchControl name="published">この商品を公開する</SwitchControl>
      </div>
    </section>
  );
}
