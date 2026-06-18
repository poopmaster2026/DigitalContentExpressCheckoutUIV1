"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import { cn } from "@/lib/utils";
import { SALE_TYPE_BADGE } from "../../../display";
import type { ProductDetail } from "../../../types";
import type { ProductFormValues } from "../../../types/validation";

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
          <span className={cn("inline-block h-2 w-2 rounded-full", published ? "bg-green-500" : "bg-gray-400")} />
          <span className="text-sm text-muted-foreground">{published ? "公開中" : "下書き"}</span>
        </div>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-destructive hover:text-destructive border-destructive/30">
                削除
              </Button>
            </AlertDialogTrigger>
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
          <Button type="button" variant="outline" size="sm">
            複製
          </Button>
          <Button type="submit" size="sm">
            保存
          </Button>
        </div>
      </div>

      <Separator className="mt-4" />
    </div>
  );
}
