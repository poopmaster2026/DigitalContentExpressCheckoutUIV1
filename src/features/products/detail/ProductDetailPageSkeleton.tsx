import { Skeleton } from "@/shared/components/ui/skeleton";

export function ProductDetailPageSkeleton() {
  return (
    <div className="flex flex-col">
      {/* sticky ヘッダー */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-6 py-3">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-5 w-48" />
          <div className="flex-1" />
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>

      {/* 本体 */}
      <div className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* 左: カードのスタック */}
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ))}
          </div>

          {/* 右: プレビュー */}
          <div className="lg:w-80 lg:shrink-0">
            <Skeleton className="mb-3 h-3 w-40" />
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
              <Skeleton className="aspect-square w-full rounded-none" />
              <div className="flex flex-col gap-2.5 p-4">
                <Skeleton className="h-4 w-32" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
            <Skeleton className="mt-3 h-8 w-full rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
