import { queryOptions } from "@tanstack/react-query";
import { fetchProducts } from "../api/productsApi";

export const productKeys = {
  all: ["products"] as const,
};

export function productListQueryOptions() {
  return queryOptions({
    queryKey: productKeys.all,
    queryFn: fetchProducts,
  });
}
