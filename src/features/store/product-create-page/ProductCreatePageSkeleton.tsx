import { Card } from '@/shared/components/ui/card'
import { Skeleton } from '@/shared/components/ui/skeleton'

/** ProductCreatePageUI と同じ寸法・配置のローディング表示。 */
export function ProductCreatePageSkeleton() {
  return (
    <div className="min-h-full bg-surface px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        {/* ActionBar */}
        <div className="flex flex-col gap-3">
          <Skeleton className="h-5 w-24" />
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* 左: フォーム列 */}
          <div className="flex flex-col gap-6">
            <Card className="gap-4 p-6">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-16 w-full rounded-md" />
              <Skeleton className="h-28 w-full rounded-md" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </Card>
            <Card className="gap-4 p-6">
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-8 w-64 rounded-full" />
              <Skeleton className="h-28 w-full rounded-lg" />
            </Card>
            <Card className="gap-4 p-6">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-12 w-full rounded-md" />
              <Skeleton className="h-12 w-32 rounded-full" />
            </Card>
          </div>

          {/* 右: プレビュー列 */}
          <div className="flex flex-col gap-3">
            <Skeleton className="h-4 w-16" />
            <Card className="gap-0 overflow-hidden p-0">
              <Skeleton className="h-72 w-full rounded-none" />
              <div className="flex flex-col gap-3 p-6">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-12 w-full rounded-md" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
