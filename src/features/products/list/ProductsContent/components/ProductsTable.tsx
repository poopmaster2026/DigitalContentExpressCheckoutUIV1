"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { useNavigate } from "@/shared/hooks/useNavigate";

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

import { KIND_ICON, SALE_TYPE_BADGE, STATUS_DISPLAY, THUMB_HUE } from "../../../display";
import { formatPrice, formatRevenue } from "../../../format";
import { productMenuItems } from "../../../productMenu";
import type { Product } from "../../../types";

import { ProductsEmptyState } from "./ProductsEmptyState";

const SORT_KEYS = ["name", "price", "sales", "revenue"] as const;
const SORT_DIRS = ["asc", "desc"] as const;
type SortKey = (typeof SORT_KEYS)[number];
type SortDir = (typeof SORT_DIRS)[number];

function compareProducts(a: Product, b: Product, key: SortKey): number {
  switch (key) {
    case "name":
      return a.name.localeCompare(b.name, "ja");
    case "price":
      return (a.price ?? 0) - (b.price ?? 0);
    case "sales":
      return a.sales - b.sales;
    case "revenue":
      return a.revenue - b.revenue;
    default:
      return 0;
  }
}

/** ソート可能な列ヘッダー。状態は親から受け取り、render 中のコンポーネント生成を避ける。 */
function SortButton({
  label,
  col,
  align = "left",
  sortKey,
  sortDir,
  onSort,
}: {
  label: string;
  col: SortKey;
  align?: "left" | "right";
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
}) {
  const active = sortKey === col;
  const Arrow = !active ? ChevronsUpDown : sortDir === "asc" ? ArrowUp : ArrowDown;
  return (
    <button
      className={cn(
        "inline-flex items-center gap-1 rounded-sm py-0.5 text-xs font-medium tracking-wide transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        align === "right" ? "-mr-1 px-1" : "-ml-1 px-1",
        active ? "text-foreground" : "text-muted-foreground"
      )}
      onClick={() => onSort(col)}
    >
      {align === "right" && (
        <Arrow className={cn("h-3 w-3", active ? "opacity-100" : "opacity-40")} />
      )}
      {label}
      {align === "left" && (
        <Arrow className={cn("h-3 w-3", active ? "opacity-100" : "opacity-40")} />
      )}
    </button>
  );
}

type ProductsTableProps = {
  products: Product[];
  isFiltered: boolean;
  selected: Set<string>;
  onToggle: (id: string) => void;
  onToggleAll: (ids: string[]) => void;
};

export function ProductsTable({
  products,
  isFiltered,
  selected,
  onToggle,
  onToggleAll,
}: ProductsTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const navigate = useNavigate();

  // TODO: デジタル以外（course / booking / subscription）の詳細画面は未実装。
  //       実装時はここのガードを外して各 saleType 向けページに振り分ける。
  const goToDetail = (p: Product) => {
    if (p.saleType !== "digital") return;
    setNavigatingId(p.id);
    navigate(`/store/products/${p.id}`);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const rows = [...products].sort((a, b) => {
    const cmp = compareProducts(a, b, sortKey);
    return sortDir === "desc" ? -cmp : cmp;
  });

  if (products.length === 0) {
    return <ProductsEmptyState isFiltered={isFiltered} />;
  }

  const allSelected =
    products.length > 0 && products.every((p) => selected.has(p.id));

  const sortProps = { sortKey, sortDir, onSort: handleSort };

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-surface/60 hover:bg-surface/60">
            <TableHead className="w-10 pl-4">
              <Checkbox
                checked={allSelected}
                onCheckedChange={() => onToggleAll(products.map((p) => p.id))}
                aria-label="すべて選択"
              />
            </TableHead>
            <TableHead className="text-muted-foreground">
              <SortButton label="商品" col="name" {...sortProps} />
            </TableHead>
            <TableHead className="text-muted-foreground">販売形態</TableHead>
            <TableHead className="text-right text-muted-foreground">
              <SortButton label="価格" col="price" align="right" {...sortProps} />
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              <SortButton label="販売数" col="sales" align="right" {...sortProps} />
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              <SortButton label="売上" col="revenue" align="right" {...sortProps} />
            </TableHead>
            <TableHead className="text-muted-foreground">状態</TableHead>
            <TableHead className="w-10 pr-2" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => {
            const badge = SALE_TYPE_BADGE[p.saleType];
            const status = STATUS_DISPLAY[p.status];
            const Icon = KIND_ICON[p.kind];
            const isSelected = selected.has(p.id);
            return (
              <TableRow
                key={p.id}
                data-state={isSelected ? "selected" : undefined}
                data-loading={navigatingId === p.id ? "true" : undefined}
                className="transition-colors hover:bg-surface/50 data-[state=selected]:bg-surface data-[loading=true]:opacity-60 data-[clickable=true]:cursor-pointer"
                data-clickable={p.saleType === "digital" ? "true" : undefined}
                onClick={() => goToDetail(p)}
              >
                <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onToggle(p.id)}
                    aria-label={`${p.name}を選択`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border",
                        !p.image && THUMB_HUE[p.thumb]
                      )}
                    >
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt=""
                          width={36}
                          height={36}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <Icon className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <span className="font-medium text-foreground">{p.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={badge.className}>
                    {badge.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {formatPrice(p.price)}
                </TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">
                  {p.sales}
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  {formatRevenue(p)}
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                    <span
                      className={cn("h-2 w-2 rounded-full", status.dotClassName)}
                    />
                    {status.label}
                  </span>
                </TableCell>
                <TableCell className="pr-2 text-right" onClick={(e) => e.stopPropagation()}>
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
                          onClick={() => {
                            if (a.id === "edit") goToDetail(p);
                          }}
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
    </div>
  );
}
