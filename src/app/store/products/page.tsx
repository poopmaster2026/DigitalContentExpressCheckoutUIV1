import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { ProductsPage } from "@/features/products/ProductsPage";
import { productListQueryOptions } from "@/features/products/queries";
import { getQueryClient } from "@/lib/query-client";

export default async function Page() {
  const qc = getQueryClient();
  await qc.prefetchQuery(productListQueryOptions());
  return (
    <HydrationBoundary state={dehydrate(qc)}>
      <ProductsPage />
    </HydrationBoundary>
  );
}
