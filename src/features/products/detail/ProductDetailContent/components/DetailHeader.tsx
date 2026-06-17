"use client";

import { AlertDialog, DialogTrigger } from "@react-spectrum/s2/AlertDialog";
import { Badge } from "@react-spectrum/s2/Badge";
import { Button } from "@react-spectrum/s2/Button";
import { Divider } from "@react-spectrum/s2/Divider";
import ChevronLeft from "@react-spectrum/s2/icons/ChevronLeft";
import { Link } from "@react-spectrum/s2/Link";
import { StatusLight } from "@react-spectrum/s2/StatusLight";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useFormContext, useWatch } from "react-hook-form";

import { SALE_TYPE_BADGE } from "../../../display";
import type { ProductDetail } from "../../../types";
import type { ProductFormValues } from "../../../types/validation";

const backRow = style({ marginBottom: 8 });
const backLink = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
});
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

export function DetailHeader({
  detail,
  onDelete,
}: {
  detail: ProductDetail;
  onDelete: () => void;
}) {
  const { control } = useFormContext<ProductFormValues>();
  const name = useWatch({ control, name: "name" });
  const published = useWatch({ control, name: "published" });
  const badge = SALE_TYPE_BADGE[detail.saleType];

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
        <StatusLight size="S" variant={published ? "positive" : "neutral"}>
          {published ? "公開中" : "下書き"}
        </StatusLight>
        <div className={spacer} />
        <div className={actions}>
          <DialogTrigger>
            <Button variant="negative" fillStyle="outline">
              削除
            </Button>
            <AlertDialog
              variant="destructive"
              title="商品を削除"
              primaryActionLabel="削除"
              cancelLabel="キャンセル"
              onPrimaryAction={onDelete}
            >
              「{detail.name}」を削除します。この操作は取り消せません。
            </AlertDialog>
          </DialogTrigger>
          <Button variant="secondary" fillStyle="outline" onPress={() => {}}>
            複製
          </Button>
          <Button type="submit" variant="accent">
            保存
          </Button>
        </div>
      </div>
      <Divider styles={headerDivider} />
    </div>
  );
}
