"use client";

import { useQuery } from "@tanstack/react-query";
import { ImageIcon, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// TODO: Phase 1 でグローバル検索 API に差し替える
import { productListQueryOptions } from "@/features/products/api/queries";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";

const CATEGORIES = [
  { key: "products", label: "商品", href: "/store/products" },
  { key: "orders", label: "注文", disabled: true },
  { key: "customers", label: "顧客", disabled: true },
  { key: "analytics", label: "分析", disabled: true },
] as const;

type CategoryKey = (typeof CATEGORIES)[number]["key"];

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | null>(null);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: productResults = [] } = useQuery({
    ...productListQueryOptions({ q: query }),
    enabled: selectedCategory === "products" && query.trim().length > 0,
  });

  useEffect(() => {
    if (!open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedCategory(null);
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    if (selectedCategory) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [selectedCategory]);

  const handleCategoryClick = (key: CategoryKey) => {
    if (selectedCategory === key) return;
    setSelectedCategory(key);
    setQuery("");
  };

  const handleNavigate = (path: string) => {
    onOpenChange(false);
    router.push(path);
  };

  const hasQuery = query.trim().length > 0;
  const results = selectedCategory === "products" ? productResults : [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="top-24 translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl"
      >
        {/* 検索入力 */}
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            type="search"
            placeholder={selectedCategory ? "検索..." : "カテゴリを選択してください"}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={!selectedCategory}
            className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-default disabled:opacity-60"
          />
        </div>

        {/* カテゴリタグ */}
        <div className="flex flex-wrap gap-2 border-b px-4 py-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              disabled={"disabled" in cat && cat.disabled}
              onClick={() => !("disabled" in cat && cat.disabled) && handleCategoryClick(cat.key)}
              className={cn(
                "rounded-full border px-3 py-1 text-sm transition-colors",
                selectedCategory === cat.key
                  ? "border-foreground bg-foreground text-background"
                  : "border-input bg-card hover:bg-accent",
                "disabled" in cat && cat.disabled && "cursor-not-allowed opacity-40"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 結果 or 空状態 */}
        {!selectedCategory || !hasQuery ? (
          <div className="flex flex-col items-center gap-3 py-14 text-muted-foreground">
            <Search className="h-10 w-10 opacity-20" />
            <p className="text-sm">
              {!selectedCategory
                ? "カテゴリを選択して検索"
                : "検索ワードを入力してください"}
            </p>
          </div>
        ) : results.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-muted-foreground">
            「{query}」の検索結果はありません
          </p>
        ) : (
          <ul className="max-h-72 overflow-y-auto">
            {results.slice(0, 8).map((product) => (
              <li key={product.id}>
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm transition-colors hover:bg-accent"
                  onClick={() => handleNavigate(`/store/products/${product.id}`)}
                >
                  <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md bg-muted">
                    {product.image ? (
                      <Image src={product.image} alt="" fill className="object-cover" sizes="36px" />
                    ) : (
                      <ImageIcon className="m-auto h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                  <span className="flex-1 truncate font-medium">{product.name}</span>
                  <span className="text-xs text-muted-foreground">商品</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}
