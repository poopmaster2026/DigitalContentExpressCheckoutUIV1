"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { useRouter } from "next/navigation";
import type { ProductDetail } from "../types";
import { useProductDetailForm } from "./hooks/useProductDetailForm";
import { ProductDetailContentUI } from "./ProductDetailContentUI";

/**
 * 詳細/編集フォームの Container。状態は react-hook-form に集約し（useProductDetailForm）、
 * FormProvider で配下のセクションへ供給する。Phase 0 では保存は永続化せず完了表示のみ。
 */
export function ProductDetailContent({ detail }: { detail: ProductDetail }) {
  const router = useRouter();
  const methods = useProductDetailForm(detail);
  const [saved, setSaved] = useState(false);

  const onSubmit = methods.handleSubmit(() => setSaved(true));

  return (
    <FormProvider {...methods}>
      <ProductDetailContentUI
        detail={detail}
        saved={saved}
        onSubmit={onSubmit}
        onDismissSaved={() => saved && setSaved(false)}
        onDelete={() => router.push("/store/products")}
      />
    </FormProvider>
  );
}
