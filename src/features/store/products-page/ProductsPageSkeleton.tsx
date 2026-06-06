import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

/** ProductsPageUI と同じ寸法・配置のローディング表示。 */
export function ProductsPageSkeleton() {
  return (
    <div className="min-h-full bg-surface px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-9 w-20" />
          </div>
          <Skeleton className="h-9 w-28 rounded-md" />
        </div>

        <Card className="gap-4 p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-16" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-60 rounded-md" />
              <Skeleton className="h-8 w-24 rounded-md" />
            </div>
          </div>

          <Skeleton className="h-9 w-96 rounded-lg" />

          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-center gap-4 border-b py-7 last:border-b-0">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="h-4 w-48" />
              <Skeleton className="ml-auto h-4 w-16" />
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-16" />
            </div>
          ))}

          <div className="flex items-center justify-between border-t pt-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-8 w-60 rounded-md" />
          </div>
        </Card>
      </div>
    </div>
  )
}
