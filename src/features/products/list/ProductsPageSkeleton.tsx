import { Skeleton } from "@/shared/components/ui/skeleton";

const CARDS = Array.from({ length: 10 }, (_, i) => i);

export function ProductsPageSkeleton() {
  return (
    <div className="flex flex-col">
      {/* ヘッダー（ProductsContentUI の header.border-b に合わせる） */}
      <div className="border-b px-4 pt-5 pb-0 sm:px-6">
        {/* タイトル行 */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-7 w-12" />
          <Skeleton className="h-4 w-10" />
          <div className="flex-1" />
          {/* デスクトップ: 検索 + saleType + view toggle + 新規作成 */}
          <div className="hidden items-center gap-2 sm:flex">
            <Skeleton className="h-9 w-56" />
            <Skeleton className="h-9 w-36" />
            <Skeleton className="h-9 w-[72px] rounded-md" />
            <Skeleton className="h-9 w-24" />
          </div>
          {/* モバイル: アイコンボタン */}
          <Skeleton className="h-9 w-9 sm:hidden" />
        </div>

        {/* モバイル検索 */}
        <Skeleton className="mt-4 h-9 w-full sm:hidden" />

        {/* ステータスタブ（実際の Tabs スタイルに合わせた下線タブ風） */}
        <div className="mt-4 flex gap-4">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-16" />
          <Skeleton className="h-7 w-16" />
        </div>
      </div>

      {/* コンテンツ: デフォルト view は grid */}
      <div className="px-4 py-5 sm:px-6">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {CARDS.map((i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-lg border bg-card">
              {/* サムネイル */}
              <Skeleton className="aspect-square w-full rounded-none" />
              {/* カード下部 */}
              <div className="flex flex-col gap-2 p-3">
                <Skeleton className="h-4 w-full" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16 rounded-full" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
