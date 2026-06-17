import { queryOptions } from "@tanstack/react-query";

import { fetchProductDetail, fetchProducts } from ".";

// ---- Queries (reads) ----

export const productListQueryOptions = () =>
  queryOptions({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

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
