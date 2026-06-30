"use client";

import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { deleteProduct } from "../../../api";
import {
  KIND_ILLUSTRATION,
  SALE_TYPE_BADGE,
  STATUS_DISPLAY,
  THUMB_HUE,
} from "../../../display";
import { formatPrice, formatRevenue } from "../../../format";
import { productMenuItems } from "../../../productMenu";
import type { Product } from "../../../types";

import { ProductsEmptyState } from "./ProductsEmptyState";

interface ProductsCardViewProps {
  products: Product[];
  isFiltered: boolean;
  selected: Set<string>;
  onToggle: (id: string) => void;
}

export function ProductsCardView({
  products,
  isFiltered,
  selected,
  onToggle,
}: ProductsCardViewProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const goToDetail = (p: Product) => {
    router.push(`/store/products/${p.id}`);
  };

  const handleMenuAction = async (actionId: string, p: Product) => {
    if (actionId === "edit") {
      goToDetail(p);
    } else if (actionId === "delete") {
      await deleteProduct(p.id);
      await queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("削除しました");
    }
  };

  if (products.length === 0) {
    return <ProductsEmptyState isFiltered={isFiltered} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {products.map((p) => {
        const badge = SALE_TYPE_BADGE[p.saleType];
        const status = STATUS_DISPLAY[p.status];
        const isSelected = selected.has(p.id);
        return (
          <div
            key={p.id}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-xl border border-border-strong bg-card transition-all hover:shadow-sm",
              isSelected && "border-foreground"
            )}
          >
            {/* チェックボックス（選択中 or hover で表示） */}
            <div
              className={cn(
                "absolute left-2.5 top-2.5 z-10 transition-opacity",
                isSelected
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100 focus-within:opacity-100"
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => onToggle(p.id)}
                className="border-border bg-card shadow-xs"
                aria-label={`${p.name}を選択`}
              />
            </div>

            {/* アクションメニュー */}
            <div
              className={cn(
                "absolute right-2 top-2 z-10 transition-opacity",
                "opacity-0 group-hover:opacity-100 focus-within:opacity-100 data-[open=true]:opacity-100"
              )}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-7 w-7 rounded-md border bg-card text-muted-foreground shadow-xs hover:bg-surface"
                    aria-label="操作"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {productMenuItems(p).map((a) => (
                    <DropdownMenuItem
                      key={a.id}
                      variant={a.id === "delete" ? "destructive" : "default"}
                      onClick={() => handleMenuAction(a.id, p)}
                    >
                      {a.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* カバー画像 — 周囲に余白を設けて高級感を出す */}
            <button
              className="block w-full text-left"
              onClick={() => goToDetail(p)}
            >
              <div
                className={cn(
                  "flex aspect-square w-full items-center justify-center overflow-hidden border-b p-3",
                  !p.image ? THUMB_HUE[p.thumb] : "bg-surface/40"
                )}
              >
                {p.image ? (
                  <img
                    src={p.image}
                    alt=""
                    className="h-full w-full rounded-sm object-contain"
                  />
                ) : (
                  KIND_ILLUSTRATION[p.kind]
                )}
              </div>
            </button>

            {/* カード情報 */}
            <button
              className="flex flex-1 flex-col gap-2 p-3 text-left"
              onClick={() => goToDetail(p)}
            >
              {/* タイトル + 価格（縦並び） */}
              <div className="flex flex-col gap-0.5">
                <p className="line-clamp-2 text-base font-bold leading-snug text-foreground">
                  {p.name}
                </p>
                <span className="text-sm font-semibold tabular-nums">
                  {formatPrice(p.price)}
                </span>
              </div>

              {/* バッジ */}
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="outline" className={badge.className}>
                  {badge.label}
                </Badge>
                <span className={cn("inline-flex items-center gap-0.5 text-xs", status.className)}>
                  <img src={status.iconSrc} alt="" className="h-3.5 w-3.5 translate-y-[0.5px]" />
                  {status.label}
                </span>
              </div>

              {/* 売上 / 販売数 — 2カラムで中央揃え */}
              <div className="mt-auto grid grid-cols-2 divide-x border-t pt-2">
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xs font-medium text-muted-foreground">販売</span>
                  <span className="text-sm font-semibold tabular-nums">{p.sales}</span>
                </div>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-xs font-medium text-muted-foreground">売上</span>
                  <span className="text-sm font-semibold tabular-nums">{formatRevenue(p)}</span>
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
