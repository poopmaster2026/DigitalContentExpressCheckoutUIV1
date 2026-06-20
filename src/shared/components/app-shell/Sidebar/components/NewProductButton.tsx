"use client";

import {
  BookOpen,
  Calendar,
  CreditCard,
  FileText,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { SaleType } from "@/features/products/types";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";

const CATEGORIES: { id: SaleType; label: string; description: string; icon: typeof FileText }[] = [
  { id: "digital", label: "デジタル", description: "ファイル・PDF・動画", icon: FileText },
  { id: "course", label: "コース", description: "近日公開予定", icon: BookOpen },
  { id: "booking", label: "予約", description: "近日公開予定", icon: Calendar },
  { id: "subscription", label: "サブスク", description: "近日公開予定", icon: CreditCard },
];

export function NewProductButton() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<SaleType | null>(null);

  const handleOpen = (v: boolean) => {
    setOpen(v);
    if (!v) setSelected(null);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="新規作成"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-cta text-cta-foreground transition-colors hover:bg-cta-hover"
      >
        <Plus className="h-5 w-5" />
      </button>

      <Dialog open={open} onOpenChange={handleOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>商品カテゴリーを選択</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-2">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isDisabled = cat.id !== "digital";
              return (
                <button
                  key={cat.id}
                  disabled={isDisabled}
                  onClick={() => setSelected(cat.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg border-2 p-4 text-center transition-colors",
                    "disabled:cursor-not-allowed disabled:opacity-40",
                    selected === cat.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40 hover:bg-accent"
                  )}
                >
                  <Icon className="h-8 w-8 text-muted-foreground" />
                  <span className="text-sm font-semibold">{cat.label}</span>
                  <span className="text-xs text-muted-foreground">{cat.description}</span>
                </button>
              );
            })}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpen(false)}>
              キャンセル
            </Button>
            <Button
              disabled={!selected}
              onClick={() => {
                if (selected) {
                  handleOpen(false);
                  router.push(`/store/products/new?saleType=${selected}`);
                }
              }}
            >
              次へ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
