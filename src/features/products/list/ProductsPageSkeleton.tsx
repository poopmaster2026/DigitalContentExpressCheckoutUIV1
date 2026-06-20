import { Skeleton } from "@/shared/components/ui/skeleton";

const ROWS = Array.from({ length: 8 }, (_, i) => i);

export function ProductsPageSkeleton() {
  return (
    <div className="flex flex-col gap-4 px-4 py-5 sm:px-6">
      <div className="flex items-center gap-3">
        <Skeleton className="h-7 w-20" />
        <div className="flex-1" />
        <Skeleton className="hidden h-9 w-36 sm:block" />
        <Skeleton className="hidden h-9 w-20 sm:block" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex flex-col gap-3 mt-2">
        {ROWS.map((i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-md shrink-0" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}
