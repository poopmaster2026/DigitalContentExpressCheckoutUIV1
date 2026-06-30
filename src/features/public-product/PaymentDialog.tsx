"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import type { PublicProduct } from "./api";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: PublicProduct;
}

function formatPrice(price: number | null): string {
  if (price === null) return "無料";
  return `¥${price.toLocaleString("ja-JP")}`;
}

export function PaymentDialog({
  open,
  onOpenChange,
  product,
}: PaymentDialogProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [email, setEmail] = useState("");

  const handleClose = (v: boolean) => {
    onOpenChange(v);
    if (!v) {
      setTimeout(() => {
        setStep("form");
        setEmail("");
      }, 200);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === "form" ? (
          <>
            <DialogHeader>
              <DialogTitle>購入手続き</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 pt-2">
              <div className="flex items-center justify-between rounded-lg border bg-muted/50 px-4 py-3">
                <span className="text-sm">{product.name}</span>
                <span className="font-medium">{formatPrice(product.price)}</span>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {product.price !== null && (
                <div className="flex flex-col gap-2">
                  <Label htmlFor="card">カード番号</Label>
                  <Input
                    id="card"
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="tabular-nums"
                    disabled
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Input
                        type="text"
                        placeholder="MM / YY"
                        className="tabular-nums"
                        disabled
                      />
                    </div>
                    <div>
                      <Input
                        type="text"
                        placeholder="CVC"
                        className="tabular-nums"
                        disabled
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    テスト環境のため実際の決済は行われません
                  </p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-cta text-cta-foreground hover:bg-cta-hover"
                disabled={!email}
              >
                {product.price === null ? "入手する" : `${formatPrice(product.price)} を支払う`}
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium">購入完了</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {email} にダウンロードリンクを送信しました
              </p>
            </div>
            <Button
              variant="outline"
              className="mt-2"
              onClick={() => handleClose(false)}
            >
              閉じる
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
