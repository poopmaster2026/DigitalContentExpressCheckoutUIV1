"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, duplicateProduct, updateProductStatus } from "../api/productsApi";
import { productKeys } from "../queries/productQueries";
import type { ProductStatus } from "../types/product";

/** 行メニューの操作（複製 / 公開↔下書き / 削除）。成功時に一覧を再取得する。 */
export function useProductMutations() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: productKeys.all });

  const duplicate = useMutation({
    mutationFn: duplicateProduct,
    onSuccess: invalidate,
  });

  const setStatus = useMutation({
    mutationFn: ({ id, status }: { id: string; status: ProductStatus }) =>
      updateProductStatus(id, status),
    onSuccess: invalidate,
  });

  const remove = useMutation({
    mutationFn: deleteProduct,
    onSuccess: invalidate,
  });

  return { duplicate, setStatus, remove };
}
