"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { cn } from "@/lib/utils";
import { SALE_TYPE_BADGE, THUMB_HUE, KIND_ICON } from "../../../display";
import { formatPrice, formatRevenue } from "../../../format";
import { productMenuItems } from "../../../productMenu";
import type { Product } from "../../../types";

import { ProductsActionBar } from "./ProductsActionBar";
import { ProductsEmptyState } from "./ProductsEmptyState";

type SortKey = "name" | "price" | "sales" | "revenue";
type SortDir = "asc" | "desc";

function compareProducts(a: Product, b: Product, key: SortKey): number {
  switch (key) {
    case "name": return a.name.localeCompare(b.name, "ja");
    case "price": return (a.price ?? 0) - (b.price ?? 0);
    case "sales": return a.sales - b.sales;
    case "revenue": return a.revenue - b.revenue;
    default: return 0;
  }
}

export function ProductsTable({
  products,
  isFiltered,
}: {
  products: Product[];
  isFiltered: boolean;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const router = useRouter();

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

  const toggleAll = () => {
    setSelected((prev) =>
      prev.size === products.length ? new Set() : new Set(products.map((p) => p.id))
    );
  };

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

  const SortButton = ({ label, col }: { label: string; col: SortKey }) => (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-2 h-8 gap-1 font-medium"
      onClick={() => handleSort(col)}
    >
      {label}
      <ArrowUpDown className={cn("h-3.5 w-3.5", sortKey === col ? "opacity-100" : "opacity-40")} />
    </Button>
  );

  return (
    <div className="relative flex-1 overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10">
              <Checkbox
                checked={selected.size === products.length && products.length > 0}
                onCheckedChange={toggleAll}
                aria-label="すべて選択"
              />
            </TableHead>
            <TableHead><SortButton label="商品" col="name" /></TableHead>
            <TableHead className="text-center">販売形態</TableHead>
            <TableHead className="text-right"><SortButton label="価格" col="price" /></TableHead>
            <TableHead className="text-right"><SortButton label="販売数" col="sales" /></TableHead>
            <TableHead className="text-right"><SortButton label="売上" col="revenue" /></TableHead>
            <TableHead>状態</TableHead>
            <TableHead className="w-10 text-right" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p) => {
            const badge = SALE_TYPE_BADGE[p.saleType];
            const Icon = KIND_ICON[p.kind];
            return (
              <TableRow
                key={p.id}
                className="cursor-pointer"
                onClick={() => router.push(`/store/products/${p.id}`)}
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selected.has(p.id)}
                    onCheckedChange={() => toggle(p.id)}
                    aria-label={`${p.name}を選択`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md",
                        !p.image && THUMB_HUE[p.thumb]
                      )}
                    >
                      {p.image ? (
                        <Image src={p.image} alt="" width={36} height={36} className="h-full w-full object-cover" />
                      ) : (
                        <Icon className="h-4 w-4 text-gray-500" />
                      )}
                    </div>
                    <span className="font-medium">{p.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                      badge.className
                    )}
                  >
                    {badge.label}
                  </span>
                </TableCell>
                <TableCell className="text-right font-medium">{formatPrice(p.price)}</TableCell>
                <TableCell className="text-right">{p.sales}</TableCell>
                <TableCell className="text-right font-medium">{formatRevenue(p)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "inline-block h-2 w-2 rounded-full",
                        p.status === "published" ? "bg-green-500" : "bg-gray-400"
                      )}
                    />
                    <span className="text-sm text-muted-foreground">
                      {p.status === "published" ? "公開中" : "下書き"}
                    </span>
                  </div>
                </TableCell>
                <TableCell
                  className="text-right"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8" aria-label="操作">
                        <MoreHorizontal className="h-4 w-4" />
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <ProductsActionBar
        selectedCount={selected.size}
        onClear={() => setSelected(new Set())}
      />
    </div>
  );
}
