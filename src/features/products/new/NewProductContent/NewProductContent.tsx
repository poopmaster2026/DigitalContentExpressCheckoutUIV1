"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";

import { useNewProductForm } from "../../detail/ProductDetailContent/hooks/useProductDetailForm";
import type { SaleType } from "../../types";

import { NewProductContentUI } from "./NewProductContentUI";

type NewProductContentProps = {
  saleType: SaleType;
};

/** 新規商品作成フォームの Container。状態は react-hook-form に集約。 */
export function NewProductContent({ saleType }: NewProductContentProps) {
  const router = useRouter();
  const methods = useNewProductForm();
  const [created, setCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = methods.handleSubmit(() => {
    // TODO: BE ができたら useMutation に差し替え、onError で setError を呼ぶ
    setCreated(true);
    setError(null);
    setTimeout(() => router.push("/store/products"), 1200);
  });

  return (
    <FormProvider {...methods}>
      <NewProductContentUI
        saleType={saleType}
        created={created}
        error={error}
        onSubmit={onSubmit}
        onCancel={() => router.push("/store/products")}
      />
    </FormProvider>
  );
}
