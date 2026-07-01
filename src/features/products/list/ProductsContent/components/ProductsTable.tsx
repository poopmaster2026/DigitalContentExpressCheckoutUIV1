"use client";

import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { useNavigate } from "@/shared/hooks/useNavigate";

import { deleteProduct } from "../../../api";
import { KIND_ICON, SALE_TYPE_BADGE, STATUS_BADGE, THUMB_HUE } from "../../../display";
import { formatPrice, formatRevenue } from "../../../format";
import { productMenuItems } from "../../../productMenu";
import type { Product } from "../../../types";

import { ProductsEmptyState } from "./ProductsEmptyState";

/** Figma のテーブルレイアウトに合わせたヘッダーラベルの共通スタイル。 */
const HEAD_CLASS = "text-xs font-medium uppercase tracking-wider text-muted-foreground";

interface ProductsTableProps {
  /** 並び替え済みの表示対象（並び替えは親の ProductsGridSection で適用済み）。 */
  products: Product[];
  isFiltered: boolean;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: (ids: string[]) => void;
}

export function ProductsTable({
  products,
  isFiltered,
  selected,
  onToggle,
  onToggleAll,
}: ProductsTableProps) {
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const goToDetail = (p: Product) => {
    setNavigatingId(p.id);
    navigate(`/store/products/${p.id}`);
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

  const allSelected =
    products.length > 0 && products.every((p) => selected.has(p.id));

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b hover:bg-transparent">
          <TableHead className="w-12 pl-6">
            <Checkbox
              checked={allSelected}
              onCheckedChange={() => onToggleAll(products.map((p) => p.id))}
              aria-label="すべて選択"
            />
          </TableHead>
          <TableHead className={HEAD_CLASS}>商品</TableHead>
          <TableHead className={cn("w-32", HEAD_CLASS)}>販売形態</TableHead>
          <TableHead className={cn("w-28", HEAD_CLASS)}>価格</TableHead>
          <TableHead className={cn("w-24", HEAD_CLASS)}>販売数</TableHead>
          <TableHead className={cn("w-28", HEAD_CLASS)}>売上</TableHead>
          <TableHead className={cn("w-28", HEAD_CLASS)}>状態</TableHead>
          <TableHead className="w-12 pr-4" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((p) => {
          const badge = SALE_TYPE_BADGE[p.saleType];
          const status = STATUS_BADGE[p.status];
          const Icon = KIND_ICON[p.kind];
          const isSelected = selected.has(p.id);
          return (
            <TableRow
              key={p.id}
              data-state={isSelected ? "selected" : undefined}
              data-loading={navigatingId === p.id ? "true" : undefined}
              className="cursor-pointer border-b transition-colors hover:bg-surface/50 data-[state=selected]:bg-accent data-[loading=true]:opacity-60"
              onClick={() => goToDetail(p)}
            >
              <TableCell className="py-4 pl-6" onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => onToggle(p.id)}
                  aria-label={`${p.name}を選択`}
                />
              </TableCell>
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border",
                      !p.image && THUMB_HUE[p.thumb]
                    )}
                  >
                    {p.image ? (
                      <img src={p.image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <Icon className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <span className="font-semibold text-foreground">{p.name}</span>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <Badge variant="outline" className={badge.className}>
                  {badge.label}
                </Badge>
              </TableCell>
              <TableCell className="py-4 tabular-nums text-foreground">
                {formatPrice(p.price)}
              </TableCell>
              <TableCell className="py-4 tabular-nums text-muted-foreground">
                {p.sales}
              </TableCell>
              <TableCell className="py-4 font-medium tabular-nums text-foreground">
                {formatRevenue(p)}
              </TableCell>
              <TableCell className="py-4">
                <Badge variant="outline" className={status.className}>
                  {status.label}
                </Badge>
              </TableCell>
              <TableCell className="py-4 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground"
                      aria-label="操作"
                    >
                      <MoreHorizontal className="h-4 w-4" />
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
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
