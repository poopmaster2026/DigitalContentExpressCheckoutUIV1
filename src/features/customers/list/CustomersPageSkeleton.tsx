import { Skeleton } from "@/shared/components/ui/skeleton";

const ROWS = Array.from({ length: 8 }, (_, i) => i);

export function CustomersPageSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="border-b px-4 pt-5 pb-0 sm:px-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-12" />
          <Skeleton className="h-4 w-10" />
          <div className="flex-1" />
          <Skeleton className="hidden h-9 w-64 sm:block" />
        </div>
        <div className="mt-4 flex gap-4">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-20" />
        </div>
      </div>

      <div className="px-4 py-5 sm:px-6">
        <div className="overflow-hidden rounded-lg border bg-card">
          <div className="border-b bg-surface/60 px-4 py-3">
            <div className="flex gap-8">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="ml-auto h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
          {ROWS.map((i) => (
            <div key={i} className="flex items-center gap-8 border-b px-4 py-3 last:border-0">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-7 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="ml-auto h-4 w-8" />
              <Skeleton className="h-4 w-14" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
