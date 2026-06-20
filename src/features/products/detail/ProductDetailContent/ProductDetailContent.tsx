"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";

import { productDetailQueryOptions } from "../../api/queries";

import { useProductDetailForm } from "./hooks/useProductDetailForm";
import { useProgressAnimation } from "./hooks/useProgressAnimation";
import { ProductDetailContentUI } from "./ProductDetailContentUI";

interface ProductDetailContentProps {
  id: string;
}

export function ProductDetailContent({ id }: ProductDetailContentProps) {
  const router = useRouter();
  const { data: detail } = useSuspenseQuery(productDetailQueryOptions(id));

  if (!detail) notFound();

  const methods = useProductDetailForm(detail);
  const { pending, isSaving, progress, runWithProgress } = useProgressAnimation();

  const onSubmit = methods.handleSubmit((values) => {
    runWithProgress(() => {
      // 保存成功後に isDirty をリセットして保存ボタンを再度 disabled に戻す
      methods.reset(values);
      toast.success("保存しました");
    }, true);
  });

  const handleDuplicate = () => {
    runWithProgress(() => toast.success("複製しました"));
  };

  const handleDelete = () => {
    runWithProgress(() => {
      toast.success("削除しました");
      router.push("/store/products");
    });
  };

  return (
    <FormProvider {...methods}>
      <ProductDetailContentUI
        detail={detail}
        pending={pending}
        isSaving={isSaving}
        progress={progress}
        onSubmit={onSubmit}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />
    </FormProvider>
  );
}
