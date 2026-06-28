import { Users } from "lucide-react";

interface CustomersEmptyStateProps {
  isFiltered: boolean;
}

export function CustomersEmptyState({ isFiltered }: CustomersEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface">
        <Users className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          {isFiltered ? "条件に一致する顧客がいません" : "顧客がまだいません"}
        </p>
        <p className="text-xs text-muted-foreground">
          {isFiltered
            ? "検索条件を変えてみてください"
            : "商品が購入されると、ここに顧客が表示されます"}
        </p>
      </div>
    </div>
  );
}
