"use client";

import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";

import { deleteProduct, updateProduct } from "../../api";
import { productDetailQueryOptions } from "../../api/queries";
import { useSubmitProgress } from "../../hooks/useSubmitProgress";

import { useProductDetailForm } from "./hooks/useProductDetailForm";
import { ProductDetailContentUI } from "./ProductDetailContentUI";

interface ProductDetailContentProps {
  id: string;
}

export function ProductDetailContent({ id }: ProductDetailContentProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: detail } = useSuspenseQuery(productDetailQueryOptions(id));
  const { pending, progress, run, setPending } = useSubmitProgress();

  if (detail === null) notFound();

  const methods = useProductDetailForm(detail);

  const onSubmit = methods.handleSubmit(async (values) => {
    try {
      await run(async (onProgress) => {
        const contentFileObj = (
          values.contentFile as unknown as { file?: File } | null
        )?.file;

        await updateProduct(
          id,
          {
            name: values.name,
            description: values.description,
            price: values.isFree ? null : values.price,
            published: values.published,
            contentFile: contentFileObj,
          },
          onProgress,
        );
        methods.reset(values);
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      });
      toast.success("保存しました");
    } catch {
      toast.error("保存に失敗しました");
    }
  });

  const handleDuplicate = () => {
    toast.info("複製機能は準備中です");
  };

  const handleDelete = async () => {
    setPending(true);
    try {
      await deleteProduct(id);
      queryClient.removeQueries({ queryKey: ["products", id] });
      toast.success("削除しました");
      router.push("/store/products");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch {
      toast.error("削除に失敗しました");
      setPending(false);
    }
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
