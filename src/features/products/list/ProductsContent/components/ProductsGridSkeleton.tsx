import { Skeleton } from "@/shared/components/ui/skeleton";

/** 一覧テーブルのローディング表示（Figma テーブルの行に合わせた行スケルトン）。 */
export function ProductsGridSkeleton() {
  return (
    <div className="divide-y">
      {/* ヘッダー行 */}
      <div className="flex items-center gap-4 px-6 py-3.5">
        <Skeleton className="h-4 w-4 rounded" />
        <Skeleton className="h-3 w-20" />
      </div>
      {/* データ行 */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-4">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-11 w-11 rounded-lg" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="ml-auto h-6 w-16 rounded-full" />
          <Skeleton className="h-4 w-14" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}
