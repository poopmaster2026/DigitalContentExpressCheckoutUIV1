import { queryOptions } from "@tanstack/react-query";

import { fetchProductDetail, fetchProducts } from "./api";

export const productListQueryOptions = () =>
  queryOptions({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
  });

export const productDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["products", id],
    queryFn: () => fetchProductDetail(id),
  });
