"use client";

import {
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  LayoutGrid,
  List,
  Plus,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { cn } from "@/lib/utils";
import { useAppSearch } from "@/shared/components/app-shell/search-context";
import { SALE_TYPE_BADGE } from "../../display";
import type { SaleType } from "../../types";
import type { Product } from "../../types";

import { ProductsCardView } from "./components/ProductsCardView";
import { ProductsTable } from "./components/ProductsTable";

const CATEGORIES: {
  id: SaleType;
  label: string;
  description: string;
  icon: typeof FileText;
}[] = [
  { id: "digital", label: "デジタル", description: "ファイル・PDF・動画", icon: FileText },
  { id: "course", label: "コース", description: "近日公開予定", icon: BookOpen },
  { id: "booking", label: "予約", description: "近日公開予定", icon: Calendar },
  { id: "subscription", label: "サブスク", description: "近日公開予定", icon: CreditCard },
];

type ProductsContentUIProps = {
  products: Product[];
  isFiltered: boolean;
  statusFilter: string;
  onStatusChange: (key: string) => void;
  saleTypeFilter: string;
  onSaleTypeChange: (key: string) => void;
  view: string;
  onViewChange: (key: string) => void;
};

export function ProductsContentUI({
  products,
  isFiltered,
  statusFilter,
  onStatusChange,
  saleTypeFilter,
  onSaleTypeChange,
  view,
  onViewChange,
}: ProductsContentUIProps) {
  const { query, setQuery } = useAppSearch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selected, setSelected] = useState<SaleType | null>(null);
  const router = useRouter();

  const handleDialogOpen = (v: boolean) => {
    setDialogOpen(v);
    if (!v) setSelected(null);
  };

  return (
    <div className="flex flex-1 flex-col gap-0 overflow-hidden">
      {/* ページヘッダー */}
      <div className="flex items-center gap-3 border-b bg-muted/30 px-5 py-3">
        <h1 className="text-lg font-bold">商品</h1>

        {/* 検索 */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="商品を検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-9 bg-background"
          />
        </div>

        <div className="flex-1" />

        {/* フィルター */}
        <Select value={saleTypeFilter} onValueChange={onSaleTypeChange}>
          <SelectTrigger className="h-9 w-32 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての形態</SelectItem>
            {Object.entries(SALE_TYPE_BADGE).map(([id, { label }]) => (
              <SelectItem key={id} value={id}>{label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="h-9 w-32 bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべての商品</SelectItem>
            <SelectItem value="published">公開中</SelectItem>
            <SelectItem value="draft">下書き</SelectItem>
          </SelectContent>
        </Select>

        {/* グリッド / リスト 切替 */}
        <div className="flex items-center rounded-lg border bg-background p-0.5 gap-0.5">
          <button
            onClick={() => onViewChange("grid")}
            aria-label="グリッド表示"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
              view === "grid"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => onViewChange("list")}
            aria-label="リスト表示"
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-md transition-colors",
              view === "list"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* 新規作成 */}
        <Button size="sm" onClick={() => setDialogOpen(true)} className="gap-1.5 h-9">
          <Plus className="h-4 w-4" />
          新規作成
        </Button>
      </div>

      {/* コンテンツ */}
      <div className="flex flex-1 overflow-hidden p-5">
        {view === "grid" ? (
          <ProductsCardView products={products} isFiltered={isFiltered} />
        ) : (
          <ProductsTable products={products} isFiltered={isFiltered} />
        )}
      </div>

      {/* 新規作成ダイアログ */}
      <Dialog open={dialogOpen} onOpenChange={handleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>商品カテゴリーを選択</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isDisabled = cat.id !== "digital";
              return (
                <button
                  key={cat.id}
                  disabled={isDisabled}
                  onClick={() => setSelected(cat.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-colors",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    selected === cat.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-accent"
                  )}
                >
                  <Icon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-semibold">{cat.label}</span>
                  <span className="text-xs text-muted-foreground">{cat.description}</span>
                </button>
              );
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleDialogOpen(false)}>
              キャンセル
            </Button>
            <Button
              disabled={!selected}
              onClick={() => {
                if (selected) {
                  handleDialogOpen(false);
                  router.push(`/store/products/new?saleType=${selected}`);
                }
              }}
            >
              次へ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
