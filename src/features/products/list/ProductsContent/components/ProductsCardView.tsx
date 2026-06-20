"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

type ProductsCardViewProps = {
  products: Product[];
  isFiltered: boolean;
  selected: Set<string>;
  onToggle: (id: string) => void;
};

export function ProductsCardView({
  products,
  isFiltered,
  selected,
  onToggle,
}: ProductsCardViewProps) {
  const router = useRouter();

  // TODO: デジタル以外（course / booking / subscription）の詳細画面は未実装。
  //       実装時はここのガードを外して各 saleType 向けページに振り分ける。
  const goToDetail = (p: Product) => {
    if (p.saleType !== "digital") return;
    router.push(`/store/products/${p.id}`);
  };

  if (products.length === 0) {
    return <ProductsEmptyState isFiltered={isFiltered} />;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((p) => {
        const badge = SALE_TYPE_BADGE[p.saleType];
        const status = STATUS_DISPLAY[p.status];
        const isSelected = selected.has(p.id);
        return (
          <div
            key={p.id}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-colors hover:border-border-strong",
              isSelected && "ring-2 ring-cta ring-offset-1"
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
                      onClick={() => {
                        if (a.id === "edit")
                          goToDetail(p);
                      }}
                    >
                      {a.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* カバー画像 */}
            <button
              className="block w-full text-left"
              onClick={() => goToDetail(p)}
            >
              <div
                className={cn(
                  "relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden border-b",
                  !p.image && THUMB_HUE[p.thumb]
                )}
              >
                {p.image ? (
                  <Image
                    src={p.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
              <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                  {p.name}
                </p>
                <span className="shrink-0 text-sm font-semibold tabular-nums">
                  {formatPrice(p.price)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className={badge.className}>
                  {badge.label}
                </Badge>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className={cn("h-2 w-2 rounded-full", status.dotClassName)}
                  />
                  {status.label}
                </span>
              </div>

              {/* 売上 / 販売数（常時表示） */}
              <div className="mt-auto flex items-center justify-between border-t pt-2 text-xs">
                <span className="text-muted-foreground">
                  販売{" "}
                  <span className="font-medium text-foreground tabular-nums">
                    {p.sales}
                  </span>
                </span>
                <span className="text-muted-foreground">
                  売上{" "}
                  <span className="font-semibold text-foreground tabular-nums">
                    {formatRevenue(p)}
                  </span>
                </span>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}
