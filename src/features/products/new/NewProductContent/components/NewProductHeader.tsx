"use client";

import { Badge } from "@react-spectrum/s2/Badge";
import { Button } from "@react-spectrum/s2/Button";
import { Divider } from "@react-spectrum/s2/Divider";
import ChevronLeft from "@react-spectrum/s2/icons/ChevronLeft";
import { Link } from "@react-spectrum/s2/Link";
import { StatusLight } from "@react-spectrum/s2/StatusLight";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useFormContext, useWatch } from "react-hook-form";

import { SALE_TYPE_BADGE } from "../../../display";
import type { SaleType } from "../../../types";
import type { ProductFormValues } from "../../../types/validation";

const backRow = style({ marginBottom: 8 });
const backLink = style({ display: "inline-flex", alignItems: "center", gap: 4 });
const titleRow = style({
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
});
const titleText = style({ font: "heading", marginY: 0 });
const spacer = style({ flexGrow: 1 });
const actions = style({ display: "flex", alignItems: "center", gap: 12 });
const headerDivider = style({ marginTop: 12 });

export function NewProductHeader({
  saleType,
  onCancel,
}: {
  saleType: SaleType;
  onCancel: () => void;
}) {
  const { control } = useFormContext<ProductFormValues>();
  const name = useWatch({ control, name: "name" });
  const badge = SALE_TYPE_BADGE[saleType];

  return (
    <div>
      <div className={backRow}>
        <Link href="/store/products" variant="secondary">
          <span className={backLink}>
            <ChevronLeft />
            商品一覧
          </span>
        </Link>
      </div>
      <div className={titleRow}>
        <h1 className={titleText}>{name || "(無題の商品)"}</h1>
        <Badge variant={badge.variant}>{badge.label}</Badge>
        <StatusLight size="S" variant="neutral">
          下書き
        </StatusLight>
        <div className={spacer} />
        <div className={actions}>
          <Button variant="secondary" fillStyle="outline" onPress={onCancel}>
            キャンセル
          </Button>
          <Button type="submit" variant="accent">
            作成
          </Button>
        </div>
      </div>
      <Divider styles={headerDivider} />
    </div>
  );
}
