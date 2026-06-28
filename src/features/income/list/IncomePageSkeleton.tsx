import { Skeleton } from "@/shared/components/ui/skeleton";

export function IncomePageSkeleton() {
  return (
    <div className="flex flex-col">
      {/* header */}
      <header className="border-b px-4 pt-5 pb-0 sm:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-12" />
          <div className="flex-1" />
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="mt-4 flex gap-4 pb-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-14" />
          ))}
        </div>
      </header>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-3 border-b px-4 py-4 sm:grid-cols-4 sm:px-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border bg-card px-4 py-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-2 h-7 w-20" />
          </div>
        ))}
      </div>

      {/* table */}
      <div className="px-4 py-5 sm:px-6">
        <div className="overflow-hidden rounded-lg border bg-card">
          <div className="divide-y">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 flex-1" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="ml-auto h-4 w-16" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
