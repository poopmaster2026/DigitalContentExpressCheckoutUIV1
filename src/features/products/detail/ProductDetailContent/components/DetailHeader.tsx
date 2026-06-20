"use client";

import { ChevronLeft, Copy, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

import { SALE_TYPE_BADGE } from "../../../display";
import type { ProductDetail } from "../../../types";
import type { ProductFormValues } from "../../../types/validation";

export function DetailHeader({
  detail,
  saving,
  onDelete,
}: {
  detail: ProductDetail;
  saving: boolean;
  onDelete: () => void;
}) {
  const { control } = useFormContext<ProductFormValues>();
  const name = useWatch({ control, name: "name" });
  const published = useWatch({ control, name: "published" });
  const badge = SALE_TYPE_BADGE[detail.saleType];
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-6 py-3">
        {/* 左: 戻る + 商品名 + 状態 */}
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
          <div className="flex min-w-0 items-center gap-2.5">
            <h1 className="truncate text-lg font-semibold text-foreground">
              {name || "(無題の商品)"}
            </h1>
            <Badge
              variant="outline"
              className={cn("hidden shrink-0 sm:inline-flex", badge.className)}
            >
              {badge.label}
            </Badge>
            <span className="hidden shrink-0 items-center gap-1.5 sm:inline-flex">
              <span
                className={cn(
                  "inline-block h-1.5 w-1.5 rounded-full",
                  published ? "bg-success" : "bg-muted-foreground/50"
                )}
              />
              <span className="text-sm text-muted-foreground">
                {published ? "公開中" : "下書き"}
              </span>
            </span>
          </div>
        </div>

        <div className="flex-1" />

        {/* 右: 複製・削除・保存を横並び */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
          >
            <Copy className="h-4 w-4" />
            複製
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="hidden text-destructive hover:bg-destructive/10 hover:text-destructive sm:inline-flex"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            削除
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={saving}
            className="relative min-w-[3.5rem] bg-cta text-cta-foreground hover:bg-cta-hover disabled:opacity-70"
          >
            {saving && <Loader2 className="absolute h-4 w-4 animate-spin" />}
            <span className={saving ? "invisible" : undefined}>保存</span>
          </Button>
        </div>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>商品を削除</AlertDialogTitle>
            <AlertDialogDescription>
              「{detail.name}」を削除します。この操作は取り消せません。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>キャンセル</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={onDelete}
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
