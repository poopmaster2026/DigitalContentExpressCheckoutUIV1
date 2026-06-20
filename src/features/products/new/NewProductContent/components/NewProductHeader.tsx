"use client";

import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

import { SALE_TYPE_BADGE } from "../../../display";
import type { SaleType } from "../../../types";
import type { ProductFormValues } from "../../../types/validation";

export function NewProductHeader({
  saleType,
  saving = false,
  onCancel,
}: {
  saleType: SaleType;
  saving?: boolean;
  onCancel: () => void;
}) {
  const { formState: { isValid } } = useFormContext<ProductFormValues>();
  const badge = SALE_TYPE_BADGE[saleType];

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-6 py-3">
        {/* 左: 戻る + badge + 状態 */}
        <div className="flex min-w-0 items-center gap-3">
          <Button
            asChild
            variant="ghost"
            size="icon-sm"
            className="shrink-0 text-muted-foreground hover:text-foreground"
          >
            <Link href="/store/products" aria-label="商品一覧に戻る">
              <ChevronLeft />
            </Link>
          </Button>
          <Badge
            variant="outline"
            className={cn("shrink-0", badge.className)}
          >
            {badge.label}
          </Badge>
          <span className="hidden shrink-0 items-center gap-1.5 sm:inline-flex">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-muted-foreground/50" />
            <span className="text-sm text-muted-foreground">下書き</span>
          </span>
        </div>

        <div className="flex-1" />

        {/* 右: キャンセル・作成 */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onCancel}
          >
            キャンセル
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={saving || !isValid}
            className="relative min-w-[3.5rem] bg-cta text-cta-foreground hover:bg-cta-hover disabled:opacity-70"
          >
            {saving && <Loader2 className="absolute h-4 w-4 animate-spin" />}
            <span className={saving ? "invisible" : undefined}>作成</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
