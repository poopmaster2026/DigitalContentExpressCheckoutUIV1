"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";

import { productDetailQueryOptions } from "../../api/queries";

import { useProductDetailForm } from "./hooks/useProductDetailForm";
import { ProductDetailContentUI } from "./ProductDetailContentUI";

type ProductDetailContentProps = {
  id: string;
};

export function ProductDetailContent({ id }: ProductDetailContentProps) {
  const router = useRouter();
  const { data: detail } = useSuspenseQuery(productDetailQueryOptions(id));

  if (!detail) notFound();

  const methods = useProductDetailForm(detail);
  const [pending, setPending] = useState(false);
  const [progress, setProgress] = useState(0);

  // 時間のかかる操作に共通のプログレス演出。BE 接続後は useMutation のコールバックに置き換える。
  const runWithProgress = useCallback((onComplete: () => void) => {
    setPending(true);
    setProgress(0);
    const start = performance.now();
    const tick = () => {
      const elapsed = performance.now() - start;
      const p = Math.min(85, (elapsed / 600) * 85);
      setProgress(p);
      if (p < 85) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setPending(false);
        setProgress(0);
        onComplete();
      }, 200);
    }, 800);
  }, []);

  const onSubmit = methods.handleSubmit((values) => {
    runWithProgress(() => {
      // 保存成功後に isDirty をリセットして保存ボタンを再度 disabled に戻す
      methods.reset(values);
      toast.success("保存しました");
    });
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
        progress={progress}
        onSubmit={onSubmit}
        onDuplicate={handleDuplicate}
        onDelete={handleDelete}
      />
    </FormProvider>
  );
}
