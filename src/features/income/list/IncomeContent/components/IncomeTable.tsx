"use client";

import Link from "next/link";

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

interface IncomeTableProps {
  entries: IncomeEntry[];
  isEmpty: boolean;
}

export function IncomeTable({ entries, isEmpty }: IncomeTableProps) {
  if (isEmpty) {
    return (
      <div className="py-16 text-center text-sm text-muted-foreground">
        該当する取引がありません
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b bg-surface/60 hover:bg-surface/60">
          <TableHead className="pl-6 text-xs text-muted-foreground">注文日</TableHead>
          <TableHead className="text-xs text-muted-foreground">顧客名</TableHead>
          <TableHead className="text-xs text-muted-foreground">商品名</TableHead>
          <TableHead className="text-xs text-muted-foreground">ステータス</TableHead>
          <TableHead className="pr-6 text-right text-xs text-muted-foreground">金額</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries.map((entry) => {
          const s = STATUS_MAP[entry.status];
          return (
            <TableRow key={entry.id} className="border-border/60 last:border-0">
              <TableCell className="pl-6 tabular-nums text-muted-foreground">
                {formatDate(entry.orderedAt)}
              </TableCell>
              <TableCell>
                <Link
                  href={`/store/customers/${entry.customerId}`}
                  className={cn(
                    "font-medium text-foreground hover:underline",
                  )}
                >
                  {entry.customerName}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={`/store/products/${entry.productId}`}
                  className="text-foreground hover:underline"
                >
                  {entry.productName}
                </Link>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={s.className}>
                  {s.label}
                </Badge>
              </TableCell>
              <TableCell className="pr-6 text-right font-semibold tabular-nums">
                {formatAmount(entry.amount)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
