import { Skeleton } from "@/shared/components/ui/skeleton";

export function NewProductPageSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-4xl items-center gap-4 px-6 py-3">
          <Skeleton className="size-8 rounded-md" />
          <Skeleton className="h-5 w-32" />
          <div className="flex-1" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div>
      <div className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="flex flex-col gap-6">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
