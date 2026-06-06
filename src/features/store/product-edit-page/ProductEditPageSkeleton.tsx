import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

/** ProductEditPageUI と同じ寸法・配置のローディング表示。 */
export function ProductEditPageSkeleton() {
  return (
    <div className="min-h-full bg-surface px-6 py-12">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        {/* ActionBar */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-24" />
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-9 rounded-md" />
              <Skeleton className="size-9 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </div>
        </div>

        {/* BasicInfoCard */}
        <Card className="gap-4 p-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-28 w-full rounded-md" />
          <Skeleton className="h-28 w-full rounded-lg" />
        </Card>

        {/* PriceStockCard */}
        <Card className="gap-4 p-6">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-12 w-32 rounded-md" />
        </Card>

        {/* PublishSettingsCard */}
        <Card className="gap-4 p-6">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-16 w-full rounded-md" />
          <Skeleton className="h-12 w-48 rounded-md" />
        </Card>
      </div>
    </div>
  )
}
