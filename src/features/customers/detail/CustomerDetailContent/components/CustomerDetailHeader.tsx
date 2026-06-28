"use client";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

// TODO: サブスクリプション機能実装後に有効化
// import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";

import type { Customer } from "../../../types";

interface CustomerDetailHeaderProps {
  customer: Customer;
}

export function CustomerDetailHeader({ customer }: CustomerDetailHeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-6 py-3">
        <Button
          asChild
          variant="ghost"
          size="icon-sm"
          className="shrink-0 text-muted-foreground hover:text-foreground"
        >
          <Link href="/store/customers" aria-label="顧客一覧に戻る">
            <ChevronLeft />
          </Link>
        </Button>
        <div className="flex min-w-0 items-center gap-2.5">
          <h1 className="truncate text-lg font-semibold text-foreground">{customer.name}</h1>
          {/* TODO: サブスクリプション機能実装後に有効化する */}
          {/*
          {customer.hasActiveSubscription && (
            <Badge variant="outline" className="shrink-0 border-blue-200 bg-blue-50 text-blue-700">
              サブスク中
            </Badge>
          )}
          */}
        </div>
      </div>
    </header>
  );
}
