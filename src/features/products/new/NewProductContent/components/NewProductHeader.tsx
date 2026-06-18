"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/lib/utils";
import { SALE_TYPE_BADGE } from "../../../display";
import type { SaleType } from "../../../types";
import type { ProductFormValues } from "../../../types/validation";

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
    <div className="shrink-0">
      <div className="mb-2">
        <Link
          href="/store/products"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          商品一覧
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold">{name || "(無題の商品)"}</h1>
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
            badge.className
          )}
        >
          {badge.label}
        </span>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
          <span className="text-sm text-muted-foreground">下書き</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onCancel}>
            キャンセル
          </Button>
          <Button type="submit" size="sm">
            作成
          </Button>
        </div>
      </div>
      <Separator className="mt-4" />
    </div>
  );
}
