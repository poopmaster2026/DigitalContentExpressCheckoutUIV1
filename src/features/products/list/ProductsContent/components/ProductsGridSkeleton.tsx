import { cn } from "@/lib/utils";

export function ProductsGridSkeleton() {
  return (
    <div className="px-4 py-5 sm:px-6">
      <div className={cn(
        "grid gap-4",
        "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      )}>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="animate-pulse space-y-2">
            <div className="aspect-square rounded-xl bg-muted" />
            <div className="h-3 w-3/4 rounded bg-muted" />
            <div className="h-3 w-1/2 rounded bg-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
