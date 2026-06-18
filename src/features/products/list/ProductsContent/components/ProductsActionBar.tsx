"use client";

import { Eye, EyeOff, Trash2 } from "lucide-react";

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

type ProductsActionBarProps = {
  selectedCount: number;
  onClear: () => void;
};

export function ProductsActionBar({ selectedCount, onClear }: ProductsActionBarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between border-t bg-background/95 px-6 py-3 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:absolute sm:inset-x-auto sm:bottom-4 sm:left-1/2 sm:w-auto sm:-translate-x-1/2 sm:rounded-full sm:px-5 sm:shadow-xl">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted-foreground">{selectedCount}件選択</span>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="gap-1.5">
            <Eye className="h-4 w-4" />
            公開する
          </Button>
          <Button variant="ghost" size="sm" className="gap-1.5">
            <EyeOff className="h-4 w-4" />
            下書きに戻す
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                <Trash2 className="h-4 w-4" />
                削除
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
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={onClear}>
                  削除
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onClear}>
        選択解除
      </Button>
    </div>
  );
}
