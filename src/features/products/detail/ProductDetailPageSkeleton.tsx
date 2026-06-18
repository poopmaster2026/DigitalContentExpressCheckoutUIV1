import { Skeleton } from "@/shared/components/ui/skeleton";

export function ProductDetailPageSkeleton() {
  return (
    <div className="flex flex-col gap-4 p-5 pt-4">
      {/* ヘッダー */}
      <Skeleton className="h-4 w-20" />
      <div className="flex items-center gap-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-12" />
        <div className="flex-1" />
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
        <Skeleton className="h-8 w-14" />
      </div>
      <Skeleton className="h-px w-full" />

      {/* フォーム */}
      <div className="mt-4 flex flex-col gap-8 max-w-xl">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-20" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-10 w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-4 w-20" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
