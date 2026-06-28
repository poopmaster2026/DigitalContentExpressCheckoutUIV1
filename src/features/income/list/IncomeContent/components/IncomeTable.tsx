"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Badge } from "@/shared/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

import { formatAmount, formatDate } from "../../../format";
import type { IncomeEntry, IncomeStatus } from "../../../types";

const STATUS_MAP: Record<IncomeStatus, { label: string; className: string }> = {
  completed:        { label: "完了",       className: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  refunded:         { label: "返金済",     className: "border-border bg-secondary text-muted-foreground" },
  awaiting_payment: { label: "支払い待ち", className: "border-amber-200 bg-amber-50 text-amber-700" },
  processing:       { label: "処理中",     className: "border-blue-200 bg-blue-50 text-blue-700" },
};

type SortKey = "orderedAt" | "amount";
type SortDir = "asc" | "desc";

function compare(a: IncomeEntry, b: IncomeEntry, key: SortKey): number {
  if (key === "orderedAt") return a.orderedAt.localeCompare(b.orderedAt);
  return a.amount - b.amount;
}

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
      type="button"
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

interface IncomeTableProps {
  entries: IncomeEntry[];
  isFiltered: boolean;
}

export function IncomeTable({ entries, isFiltered }: IncomeTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("orderedAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const rows = [...entries].sort((a, b) => {
    const cmp = compare(a, b, sortKey);
    return sortDir === "desc" ? -cmp : cmp;
  });

  if (entries.length === 0) {
    return (
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="py-16 text-center text-sm text-muted-foreground">
          {isFiltered ? "条件に一致する取引がありません" : "取引がありません"}
        </div>
      </div>
    );
  }

  const sortProps = { sortKey, sortDir, onSort: handleSort };

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-surface/60 hover:bg-surface/60">
            <TableHead className="pl-4 text-muted-foreground">
              <SortButton label="注文日" col="orderedAt" {...sortProps} />
            </TableHead>
            <TableHead className="text-muted-foreground">顧客名</TableHead>
            <TableHead className="text-muted-foreground">商品名</TableHead>
            <TableHead className="text-muted-foreground">ステータス</TableHead>
            <TableHead className="text-right text-muted-foreground">
              <SortButton label="金額" col="amount" align="right" {...sortProps} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((entry) => {
            const s = STATUS_MAP[entry.status];
            return (
              <TableRow key={entry.id} className="transition-colors hover:bg-surface/50">
                <TableCell className="pl-4 tabular-nums text-muted-foreground">
                  {formatDate(entry.orderedAt)}
                </TableCell>
                <TableCell>
                  <Link
                    href={`/store/customers/${entry.customerId}`}
                    className="font-medium text-foreground hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {entry.customerName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/store/products/${entry.productId}`}
                    className="text-foreground hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {entry.productName}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={s.className}>
                    {s.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold tabular-nums">
                  {formatAmount(entry.amount)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
