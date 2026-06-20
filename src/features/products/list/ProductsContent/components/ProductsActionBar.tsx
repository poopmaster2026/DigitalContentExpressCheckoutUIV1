"use client";

import { Eye, EyeOff, Trash2, X } from "lucide-react";

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

interface ProductsActionBarProps {
  selectedCount: number;
  onClear: () => void;
}

export function ProductsActionBar({ selectedCount, onClear }: ProductsActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4 sm:bottom-6">
      <div className="pointer-events-auto flex w-full max-w-2xl items-center gap-2 rounded-xl border bg-card/95 p-2 pl-4 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-card/80 sm:w-auto sm:rounded-full">
        <span className="text-sm font-medium tabular-nums">
          {selectedCount}件選択
        </span>
        <Separator orientation="vertical" className="mx-1 hidden h-5 sm:block" />

        <div className="flex flex-1 items-center justify-end gap-1 sm:flex-none">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline">公開する</span>
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <EyeOff className="h-4 w-4" />
            <span className="hidden sm:inline">下書きに戻す</span>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="hidden sm:inline">削除</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>選択した商品を削除</AlertDialogTitle>
                <AlertDialogDescription>
                  選択した{selectedCount}件の商品を削除します。この操作は取り消せません。
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>キャンセル</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={onClear}>
                  削除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Separator orientation="vertical" className="mx-1 hidden h-5 sm:block" />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground"
            onClick={onClear}
            aria-label="選択解除"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
