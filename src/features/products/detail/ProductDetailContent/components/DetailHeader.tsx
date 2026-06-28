"use client";

import { ChevronLeft, Copy, Loader2, Trash2 } from "lucide-react";

import { STATUS_DISPLAY } from "../../../display";
import Link from "next/link";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

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

export function DetailHeader({
  detail,
  pending,
  isSaving,
  onDuplicate,
  onDelete,
}: {
  detail: ProductDetail;
  pending: boolean;
  isSaving: boolean;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const { formState: { isDirty, isValid, isSubmitted } } = useFormContext();
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
            <h1 className="truncate text-lg font-medium text-foreground">
              {detail.name}
            </h1>
            <Badge
              variant="outline"
              className={cn("hidden shrink-0 sm:inline-flex", badge.className)}
            >
              {badge.label}
            </Badge>
            {(() => {
              const status = STATUS_DISPLAY[detail.status];
              return (
                <span className={cn("hidden shrink-0 items-center gap-0.5 text-sm sm:inline-flex", status.className)}>
                  <img src={status.iconSrc} alt="" className="h-4 w-4 translate-y-[0.5px]" />
                  {status.label}
                </span>
              );
            })()}
          </div>
        </div>

        <div className="flex-1" />

        {/* 右: 複製・削除・保存を横並び */}
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={pending}
            className="hidden sm:inline-flex"
            onClick={onDuplicate}
          >
            <Copy className="h-4 w-4" />
            複製
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={pending}
            className="hidden text-destructive hover:bg-destructive/10 hover:text-destructive sm:inline-flex"
            onClick={() => setConfirmOpen(true)}
          >
            <Trash2 className="h-4 w-4" />
            削除
          </Button>
          <Button
            type="submit"
            size="sm"
            disabled={pending || !isDirty || (isSubmitted && !isValid)}
            className="relative min-w-[3.5rem] bg-cta text-cta-foreground hover:bg-cta-hover disabled:opacity-70"
          >
            {isSaving && <Loader2 className="absolute h-4 w-4 animate-spin" />}
            <span className={isSaving ? "invisible" : undefined}>保存</span>
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
            <AlertDialogAction variant="destructive" onClick={onDelete}>
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
