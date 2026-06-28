"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";

import { createProduct } from "../../api";
import { useNewProductForm } from "../../detail/ProductDetailContent/hooks/useProductDetailForm";
import { useSubmitProgress } from "../../hooks/useSubmitProgress";
import type { SaleType } from "../../types";

import { NewProductContentUI } from "./NewProductContentUI";

interface NewProductContentProps {
  saleType: SaleType;
}

export function NewProductContent({ saleType }: NewProductContentProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const methods = useNewProductForm();
  const { pending, progress, run } = useSubmitProgress();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await run(async (onProgress) => {
        const contentFileObj = (
          data.contentFile as unknown as { file?: File } | null
        )?.file;
        const coverImageFile = (
          data.coverImage as unknown as { file?: File } | null
        )?.file;

        await createProduct(
          {
            name: data.name,
            description: data.description,
            saleType,
            category: saleType,
            slug:
              data.name
                .toLowerCase()
                .replace(/[^a-z0-9　-鿿]+/g, "-")
                .replace(/^-|-$/g, "") || "product",
            price: data.isFree ? null : data.price,
            published: data.published,
            coverImage: coverImageFile,
            contentFile: contentFileObj,
          },
          onProgress,
        );
        await queryClient.invalidateQueries({ queryKey: ["products"] });
      });
      toast.success("商品を作成しました");
      router.push("/store/products");
    } catch {
      toast.error("作成に失敗しました");
    }
  });

  return (
    <FormProvider {...methods}>
      <NewProductContentUI
        saleType={saleType}
        pending={pending}
        progress={progress}
        onSubmit={onSubmit}
        onCancel={() => router.push("/store/products")}
      />
    </FormProvider>
  );
}
