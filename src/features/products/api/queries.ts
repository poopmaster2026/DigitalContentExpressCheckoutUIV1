import { queryOptions } from "@tanstack/react-query";

import { fetchProductDetail, fetchProducts, type ProductListParams } from ".";
import { FILTER_ALL } from "../types";

// ---- Queries (reads) ----

export const productListQueryOptions = (params: ProductListParams = {}) => {
  // FILTER_ALL や空文字を除去してキャッシュキーを正規化する
  // → フィルタなし状態と { status:FILTER_ALL, q:"" } が同一キーになり、SSR prefetch が活きる
  const normalized: ProductListParams = {};
  if (params.status && params.status !== FILTER_ALL) normalized.status = params.status;
  if (params.saleType && params.saleType !== FILTER_ALL) normalized.saleType = params.saleType;
  if (params.q) normalized.q = params.q;
  return queryOptions({
    queryKey: ["products", normalized],
    queryFn: () => fetchProducts(normalized),
  });
};


export const productDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["products", id],
    queryFn: () => fetchProductDetail(id),
  });

// ---- Mutations (writes) ----
// TODO: BE ができたら下記コメントを解除し、コンテナで useMutation(createProductMutationOptions()) を使う
//
// import { mutationOptions } from "@tanstack/react-query";
// import { createProduct, updateProduct, deleteProduct, duplicateProduct } from ".";
//
// export const createProductMutationOptions = (onProgress?: (percent: number) => void) =>
//   mutationOptions({
//     mutationFn: (input: CreateProductInput) => createProduct(input, onProgress),
//   });
//
// export const updateProductMutationOptions = (onProgress?: (percent: number) => void) =>
//   mutationOptions({
//     mutationFn: ({ id, input }: { id: string; input: UpdateProductInput }) =>
//       updateProduct(id, input, onProgress),
//   });
//
// export const deleteProductMutationOptions = () =>
//   mutationOptions({
//     mutationFn: (id: string) => deleteProduct(id),
//   });
//
// export const duplicateProductMutationOptions = () =>
//   mutationOptions({
//     mutationFn: (id: string) => duplicateProduct(id),
//   });
