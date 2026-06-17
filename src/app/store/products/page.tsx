import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { productListQueryOptions } from "@/features/products/api/queries";
import { ProductsPage } from "@/features/products/list/ProductsPage";
import { getQueryClient } from "@/lib/query-client";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productListQueryOptions());

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductsPage />
    </HydrationBoundary>
  );
}
