"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";
// TODO: サブスクリプション機能実装後に有効化
// import { Badge } from "@/shared/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { useNavigate } from "@/shared/hooks/useNavigate";

import { formatSince, formatSpent } from "../../../format";
import type { Customer } from "../../../types";

import { CustomersEmptyState } from "./CustomersEmptyState";

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-cyan-100 text-cyan-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
];

function avatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) & 0xffff;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

// TODO: サブスクリプション機能実装後に有効化する
// function CustomerStatusBadges({ customer }: { customer: Customer }) {
//   const badges = [];
//   if (customer.hasActiveSubscription) {
//     badges.push(
//       <Badge key="subscription" variant="outline" className="border-blue-200 bg-blue-50 text-[10px] text-blue-700">
//         サブスク中
//       </Badge>
//     );
//   }
//   if (badges.length === 0) return <span className="text-muted-foreground">—</span>;
//   return <div className="flex flex-wrap gap-1">{badges}</div>;
// }

type SortKey = "name" | "since" | "purchases" | "spent";
type SortDir = "asc" | "desc";

function compare(a: Customer, b: Customer, key: SortKey): number {
  switch (key) {
    case "name":
      return a.name.localeCompare(b.name, "ja");
    case "since":
      return a.since.localeCompare(b.since);
    case "purchases":
      return a.purchases - b.purchases;
    case "spent":
      return a.spent - b.spent;
    default:
      return 0;
  }
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

interface CustomersTableProps {
  customers: Customer[];
  isFiltered: boolean;
}

export function CustomersTable({ customers, isFiltered }: CustomersTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("since");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  };

  const rows = [...customers].sort((a, b) => {
    const cmp = compare(a, b, sortKey);
    return sortDir === "desc" ? -cmp : cmp;
  });

  if (customers.length === 0) {
    return <CustomersEmptyState isFiltered={isFiltered} />;
  }

  const sortProps = { sortKey, sortDir, onSort: handleSort };

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-surface/60 hover:bg-surface/60">
            <TableHead className="pl-4 text-muted-foreground">
              <SortButton label="氏名" col="name" {...sortProps} />
            </TableHead>
            <TableHead className="text-muted-foreground">メール</TableHead>
            {/* TODO: サブスクリプション機能実装後に有効化する */}
            {/* <TableHead className="text-muted-foreground">ステータス</TableHead> */}
            <TableHead className="text-muted-foreground">
              <SortButton label="登録日" col="since" {...sortProps} />
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              <SortButton label="購入数" col="purchases" align="right" {...sortProps} />
            </TableHead>
            <TableHead className="text-right text-muted-foreground">
              <SortButton label="累計金額" col="spent" align="right" {...sortProps} />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((c) => (
            <TableRow
              key={c.id}
              data-loading={navigatingId === c.id ? "true" : undefined}
              className="cursor-pointer transition-colors hover:bg-surface/50 data-[loading=true]:opacity-60"
              onClick={() => {
                setNavigatingId(c.id);
                navigate(`/store/customers/${c.id}`);
              }}
            >
              <TableCell className="pl-4">
                <div className="flex items-center gap-3">
                  <div className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold", avatarColor(c.name))}>
                    {c.name.slice(0, 1)}
                  </div>
                  <span className="font-medium text-foreground">{c.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-muted-foreground">{c.email}</TableCell>
              {/* TODO: サブスクリプション機能実装後に有効化する */}
              {/* <TableCell><CustomerStatusBadges customer={c} /></TableCell> */}
              <TableCell className="text-muted-foreground tabular-nums">
                {formatSince(c.since)}
              </TableCell>
              <TableCell className="text-right tabular-nums text-muted-foreground">
                {c.purchases}
              </TableCell>
              <TableCell className="text-right font-semibold tabular-nums">
                {formatSpent(c.spent)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
