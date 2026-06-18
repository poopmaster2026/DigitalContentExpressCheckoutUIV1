"use client";

import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { SALE_TYPE_BADGE, THUMB_HUE, KIND_ILLUSTRATION } from "../../../display";
import { formatPrice } from "../../../format";
import { productMenuItems } from "../../../productMenu";
import type { Product } from "../../../types";

import { ProductsActionBar } from "./ProductsActionBar";
import { ProductsEmptyState } from "./ProductsEmptyState";

export function ProductsCardView({
  products,
  isFiltered,
}: {
  products: Product[];
  isFiltered: boolean;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const router = useRouter();

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (products.length === 0) {
    return <ProductsEmptyState isFiltered={isFiltered} />;
  }

  return (
    <div className="relative flex-1">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((p) => {
          const badge = SALE_TYPE_BADGE[p.saleType];
          const isSelected = selected.has(p.id);
          return (
            <div
              key={p.id}
              className={cn(
                "group relative rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md",
                isSelected && "ring-2 ring-primary"
              )}
            >
              {/* チェックボックス */}
              <div className="absolute left-2.5 top-2.5 z-10">
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => toggle(p.id)}
                  className="border-white/80 bg-white/80 backdrop-blur data-[state=checked]:border-primary data-[state=checked]:bg-primary"
                  aria-label={`${p.name}を選択`}
                />
              </div>

              {/* カバー画像 */}
              <button
                className="block w-full"
                onClick={() => router.push(`/store/products/${p.id}`)}
              >
                <div
                  className={cn(
                    "relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-t-xl",
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
                  {/* 下書きオーバーレイ */}
                  {p.status === "draft" && (
                    <span className="absolute right-2 top-2 rounded-full border border-gray-200 bg-white/90 px-2 py-0.5 text-xs font-medium text-gray-600 backdrop-blur">
                      下書き
                    </span>
                  )}
                </div>

                {/* カード情報 */}
                <div className="p-3">
                  <p className="truncate text-sm font-semibold leading-tight">{p.name}</p>
                  <div className="mt-1.5 flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                        badge.className
                      )}
                    >
                      {badge.label}
                    </span>
                    <span className="text-sm font-bold">{formatPrice(p.price)}</span>
                  </div>
                </div>
              </button>

              {/* アクションメニュー */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-1.5 top-1.5 z-10 h-7 w-7 rounded-full bg-white/80 text-gray-700 shadow-sm backdrop-blur opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white"
                    aria-label="操作"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {productMenuItems(p).map((a) => (
                    <DropdownMenuItem
                      key={a.id}
                      onClick={() => {
                        if (a.id === "edit") router.push(`/store/products/${p.id}`);
                      }}
                    >
                      {a.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        })}
      </div>

      <ProductsActionBar
        selectedCount={selected.size}
        onClear={() => setSelected(new Set())}
      />
    </div>
  );
}
