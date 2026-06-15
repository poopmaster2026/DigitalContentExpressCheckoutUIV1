"use client";

import { useFormContext, useWatch } from "react-hook-form";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { LabeledValue } from "@react-spectrum/s2/LabeledValue";
import { Link } from "@react-spectrum/s2/Link";
import type { ProductDetail } from "../../types";
import { SectionHeading } from "./SectionHeading";
import { NumberFieldControl, SwitchControl } from "./FormFields";
import type { ProductFormValues } from "../hooks/useProductDetailForm";

const section = style({ display: "flex", flexDirection: "column", gap: 24 });
// 2つのトグルは1つのグループとして揃える（バラバラに並べない）
const switchGroup = style({ display: "flex", flexDirection: "column", gap: 16 });

export function PricingSection({ detail }: { detail: ProductDetail }) {
  const { control } = useFormContext<ProductFormValues>();
  const isFree = useWatch({ control, name: "isFree" });

  return (
    <section className={section}>
      <SectionHeading>価格・公開</SectionHeading>
      {/* 無料時も部品を差し替えず disable（高さ固定でガタつかせない） */}
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
      <LabeledValue
        label="商品URL"
        value={
          <Link href={`/store/products/${detail.id}`} variant="secondary">
            {`yourstore.com/p/${detail.slug}`}
          </Link>
        }
      />
    </section>
  );
}
