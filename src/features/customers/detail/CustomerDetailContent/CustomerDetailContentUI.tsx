"use client";

import { CalendarDays, Mail, Phone, RefreshCw } from "lucide-react";

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

import { formatSince, formatSpent } from "../../format";
import type { Customer, Order, OrderStatus, Subscription } from "../../types";

import { CustomerDetailHeader } from "./components/CustomerDetailHeader";

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

const ORDER_STATUS_MAP: Record<OrderStatus, { label: string; className: string }> = {
  completed:        { label: "完了",      className: "border-emerald-200 bg-emerald-50 text-emerald-700" },
  refunded:         { label: "返金済",    className: "border-border bg-secondary text-muted-foreground" },
  awaiting_payment: { label: "支払い待ち", className: "border-amber-200 bg-amber-50 text-amber-700" },
  processing:       { label: "処理中",    className: "border-blue-200 bg-blue-50 text-blue-700" },
};

function SectionCard({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-base font-semibold text-card-foreground">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

interface CustomerDetailContentUIProps {
  customer: Customer;
  orders: Order[];
  subscription: Subscription | null;
}

export function CustomerDetailContentUI({
  customer,
  orders,
  subscription,
}: CustomerDetailContentUIProps) {
  const sortedOrders = [...orders].sort((a, b) => b.orderedAt.localeCompare(a.orderedAt));

  return (
    <div className="flex flex-1 flex-col">
      <CustomerDetailHeader customer={customer} />

      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-6">

          {/* ── 顧客情報 ── */}
          <SectionCard title="顧客情報">
            <div className="px-6 py-5">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
                {/* アバター + 基本情報 */}
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-2xl font-bold",
                    avatarColor(customer.name)
                  )}>
                    {customer.name.slice(0, 1)}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p className="text-lg font-semibold text-foreground">{customer.name}</p>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Mail className="h-3.5 w-3.5 shrink-0" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                      <span>登録日: {formatSince(customer.since)}</span>
                    </div>
                    {customer.phone && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        <span>{customer.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 区切り線（デスクトップ縦・モバイル横）*/}
                <div className="hidden h-auto w-px bg-border sm:block" />
                <div className="block h-px bg-border sm:hidden" />

                {/* 統計 */}
                <div className="flex gap-8 sm:flex-col sm:gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">購入数</p>
                    <p className="text-2xl font-bold tabular-nums">{customer.purchases}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">累計金額</p>
                    <p className="text-2xl font-bold tabular-nums">{formatSpent(customer.spent)}</p>
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* ── 最近の注文 ── */}
          <SectionCard
            title="最近の注文"
            aside={
              <span className="text-sm text-muted-foreground">{orders.length}件</span>
            }
          >
            {sortedOrders.length === 0 ? (
              <div className="py-12 text-center text-sm text-muted-foreground">
                注文はまだありません
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-0 bg-surface/60 hover:bg-surface/60">
                    <TableHead className="pl-6 text-xs text-muted-foreground">注文日</TableHead>
                    <TableHead className="text-xs text-muted-foreground">商品名</TableHead>
                    <TableHead className="text-xs text-muted-foreground">ステータス</TableHead>
                    <TableHead className="pr-6 text-right text-xs text-muted-foreground">金額</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedOrders.map((order) => {
                    const s = ORDER_STATUS_MAP[order.status];
                    return (
                      <TableRow key={order.id} className="border-border/60 last:border-0">
                        <TableCell className="pl-6 tabular-nums text-muted-foreground">
                          {formatSince(order.orderedAt)}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {order.productName}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={s.className}>
                            {s.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="pr-6 text-right font-semibold tabular-nums">
                          {formatSpent(order.amount)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </SectionCard>

          {/* ── サブスクリプション ── */}
          {subscription && (
            <SectionCard title="サブスクリプション">
              <div className="px-6 py-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                      <RefreshCw className="h-4 w-4 text-violet-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{subscription.planName}</p>
                      <p className="text-sm text-muted-foreground">
                        次回更新: {formatSince(subscription.nextBillingDate)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold tabular-nums">{formatSpent(subscription.amount)}<span className="text-xs text-muted-foreground">/月</span></p>
                    <Badge variant="outline" className="mt-1 border-blue-200 bg-blue-50 text-[10px] text-blue-700">
                      有効
                    </Badge>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

        </div>
      </div>
    </div>
  );
}
