"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useState } from "react";

import { Button } from "@/shared/components/ui/button";

import { fetchPublicProduct } from "./api";
import { PaymentDialog } from "./PaymentDialog";

interface PublicProductPageProps {
  creatorId: string;
  slug: string;
}

function formatPrice(price: number | null): string {
  if (price === null) return "無料";
  return `¥${price.toLocaleString("ja-JP")}`;
}

export function PublicProductPage({ creatorId, slug }: PublicProductPageProps) {
  const { data: product, isLoading } = useQuery({
    queryKey: ["public-product", creatorId, slug],
    queryFn: () => fetchPublicProduct(creatorId, slug),
  });
  const [paymentOpen, setPaymentOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted border-t-foreground" />
      </div>
    );
  }

  if (!product) notFound();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-4xl px-6 py-4">
          <span className="text-sm text-muted-foreground">{product.creatorName}</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Left: Image */}
          <div className="flex items-start justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg border object-cover shadow-sm"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-lg border bg-muted">
                <span className="text-4xl text-muted-foreground/50">📄</span>
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-2xl font-medium tracking-tight">
                {product.name}
              </h1>
              <p className="text-3xl font-medium">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full bg-cta text-cta-foreground hover:bg-cta-hover"
                onClick={() => setPaymentOpen(true)}
              >
                {product.price === null ? "無料で入手する" : "購入する"}
              </Button>
            </div>

            <div className="border-t pt-6">
              <h2 className="mb-3 text-sm font-medium text-muted-foreground">
                商品について
              </h2>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </main>

      <PaymentDialog
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        product={product}
      />
    </div>
  );
}
