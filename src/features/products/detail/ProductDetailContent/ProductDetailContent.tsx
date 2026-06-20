"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";

import { productDetailQueryOptions } from "../../api/queries";

import { useProductDetailForm } from "./hooks/useProductDetailForm";
import { ProductDetailContentUI } from "./ProductDetailContentUI";

/**
 * 詳細/編集フォームの Container。状態は react-hook-form に集約し（useProductDetailForm）、
 * FormProvider で配下のセクションへ供給する。Phase 0 では保存は永続化せず完了表示のみ。
 * サーバーで prefetchQuery 済みのキャッシュを useSuspenseQuery で消費する。
 */
interface ProductDetailContentProps {
  id: string;
}

export function ProductDetailContent({ id }: ProductDetailContentProps) {
  const router = useRouter();
  const { data: detail } = useSuspenseQuery(productDetailQueryOptions(id));

  if (!detail) notFound();

  const methods = useProductDetailForm(detail);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = methods.handleSubmit(() => {
    // TODO: BE ができたら useMutation に差し替え、onError で setError を呼ぶ
    setSaved(true);
    setError(null);
  });

  return (
    <FormProvider {...methods}>
      <ProductDetailContentUI
        detail={detail}
        saved={saved}
        error={error}
        onSubmit={onSubmit}
        onDismissSaved={() => saved && setSaved(false)}
        onDelete={() => router.push("/store/products")}
      />
    </FormProvider>
  );
}
