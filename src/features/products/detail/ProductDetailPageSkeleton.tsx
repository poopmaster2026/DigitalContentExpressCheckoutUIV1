import { Skeleton } from "@/shared/components/ui/skeleton";

export function ProductDetailPageSkeleton() {
  return (
    <div className="flex flex-col">
      {/* sticky ヘッダー（DetailHeader に合わせる: sticky top-0, max-w-5xl） */}
      <div className="sticky top-0 z-20 border-b bg-background">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-6 py-3">
          {/* 左: 戻るボタン + 商品名 + badge + status */}
          <div className="flex min-w-0 items-center gap-3">
            <Skeleton className="size-8 shrink-0 rounded-md" />
            <Skeleton className="h-5 w-48" />
            <Skeleton className="hidden h-5 w-16 rounded-full sm:block" />
            <Skeleton className="hidden h-4 w-14 sm:block" />
          </div>
          <div className="flex-1" />
          {/* 右: 複製・削除・保存 */}
          <div className="flex shrink-0 items-center gap-2">
            <Skeleton className="hidden h-8 w-16 rounded-md sm:block" />
            <Skeleton className="hidden h-8 w-14 rounded-md sm:block" />
            <Skeleton className="h-8 w-14 rounded-md" />
          </div>
        </div>
      </div>

      {/* 本体（実際は単一カラム max-w-3xl） */}
      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-sm"
            >
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
