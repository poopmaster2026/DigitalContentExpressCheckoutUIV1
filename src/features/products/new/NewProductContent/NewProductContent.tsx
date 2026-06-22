"use client";

import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";

import { useNewProductForm } from "../../detail/ProductDetailContent/hooks/useProductDetailForm";
import { useProgressAnimation } from "../../detail/ProductDetailContent/hooks/useProgressAnimation";
import type { SaleType } from "../../types";

import { NewProductContentUI } from "./NewProductContentUI";

interface NewProductContentProps {
  saleType: SaleType;
}

/** 新規商品作成フォームの Container。状態は react-hook-form に集約。 */
export function NewProductContent({ saleType }: NewProductContentProps) {
  const router = useRouter();
  const methods = useNewProductForm();
  const { pending, isSaving, progress, runWithProgress } = useProgressAnimation();

  const onSubmit = methods.handleSubmit(() => {
    // TODO: BE ができたら useMutation に差し替え、onError で toast.error を呼ぶ
    runWithProgress(() => {
      toast.success("商品を作成しました");
      router.push("/store/products");
    }, true);
  });

  return (
    <FormProvider {...methods}>
      <NewProductContentUI
        saleType={saleType}
        pending={pending}
        isSaving={isSaving}
        progress={progress}
        onSubmit={onSubmit}
        onCancel={() => router.push("/store/products")}
      />
    </FormProvider>
  );
}
