import { Skeleton } from "@/shared/components/ui/skeleton";

export function CustomerDetailPageSkeleton() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ヘッダー */}
      <div className="border-b px-6 py-3">
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-6">
          {/* 顧客情報 */}
          <div className="rounded-xl border bg-card shadow-sm">
            <div className="border-b px-6 py-4">
              <Skeleton className="h-5 w-20" />
            </div>
            <div className="px-6 py-5">
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-5 w-28" />
                  <Skeleton className="h-4 w-44" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            </div>
          </div>

          {/* 最近の注文 */}
          <div className="rounded-xl border bg-card shadow-sm">
            <div className="border-b px-6 py-4">
              <Skeleton className="h-5 w-24" />
            </div>
            <div className="flex flex-col divide-y">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex items-center gap-6 px-6 py-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-5 w-14 rounded-full" />
                  <Skeleton className="ml-auto h-4 w-16" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
