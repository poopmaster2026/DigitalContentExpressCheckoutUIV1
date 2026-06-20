"use client";

import { PackagePlus, Plus, SearchX } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/shared/components/ui/button";

type ProductsEmptyStateProps = {
  isFiltered: boolean;
};

export function ProductsEmptyState({ isFiltered }: ProductsEmptyStateProps) {
  const router = useRouter();

  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 px-6 py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-surface">
          <SearchX className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold">該当する商品がありません</h3>
          <p className="text-sm text-muted-foreground">
            検索条件やフィルタを変更してお試しください。
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-5 px-6 py-24 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border bg-surface">
        <PackagePlus className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-base font-semibold">最初の商品を作成しましょう</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
          デジタルコンテンツを登録して、販売を始めましょう。作成した商品はここに一覧で表示されます。
        </p>
      </div>
      <Button onClick={() => router.push("/store/products/new")} className="gap-1.5">
        <Plus className="h-4 w-4" />
        最初の商品を作成
      </Button>
    </div>
  );
}
