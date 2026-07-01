import { Skeleton } from "@/shared/components/ui/skeleton";

import { ProductsGridSkeleton } from "./ProductsContent/components/ProductsGridSkeleton";

/** ページ全体のローディング表示。ProductsContentUI（テーブル）と同じ骨格に合わせる。 */
export function ProductsPageSkeleton() {
  return (
    <div className="flex flex-col">
      {/* ヘッダー（ProductsContentUI に合わせる） */}
      <div className="border-b px-4 pt-5 pb-4 sm:px-6">
        {/* タイトル + 新規作成 */}
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>
        {/* 検索 + Active(ステータス) + Newest(並び替え) */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Skeleton className="h-9 w-full sm:w-80" />
          <Skeleton className="h-9 w-32 rounded-md" />
          <Skeleton className="h-9 w-44 rounded-md" />
        </div>
      </div>

      {/* テーブル */}
      <div className="px-4 py-4 sm:px-6">
        <div className="overflow-hidden rounded-xl border bg-card">
          <ProductsGridSkeleton />
        </div>
      </div>
    </div>
  );
}
