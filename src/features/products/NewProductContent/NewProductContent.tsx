"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider } from "react-hook-form";

import { useNewProductForm } from "../ProductDetailContent/hooks/useProductDetailForm";
import type { SaleType } from "../types";

import { NewProductContentUI } from "./NewProductContentUI";

/** 新規商品作成フォームの Container。状態は react-hook-form に集約。 */
export function NewProductContent({ saleType }: { saleType: SaleType }) {
  const router = useRouter();
  const methods = useNewProductForm();
  const [created, setCreated] = useState(false);

  const onSubmit = methods.handleSubmit(() => {
    setCreated(true);
    setTimeout(() => router.push("/store/products"), 1200);
  });

  return (
    <FormProvider {...methods}>
      <NewProductContentUI
        saleType={saleType}
        created={created}
        onSubmit={onSubmit}
        onCancel={() => router.push("/store/products")}
      />
    </FormProvider>
  );
}
