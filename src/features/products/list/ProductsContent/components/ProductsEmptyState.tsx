import { FileText, Search } from "lucide-react";

type ProductsEmptyStateProps = {
  isFiltered: boolean;
};

export function ProductsEmptyState({ isFiltered }: ProductsEmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Search className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold">該当する商品がありません</h3>
        <p className="text-sm text-muted-foreground">
          検索条件やフィルタを変更してお試しください。
        </p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FileText className="h-7 w-7 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold">最初の商品を作成しましょう</h3>
      <p className="text-sm text-muted-foreground">
        サイドバーの「新規作成」からデジタルコンテンツを登録できます。
      </p>
    </div>
  );
}
