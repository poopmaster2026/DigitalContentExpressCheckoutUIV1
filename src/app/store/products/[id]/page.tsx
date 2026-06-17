import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { productDetailQueryOptions } from "@/features/products/api/queries";
import { ProductDetailPage } from "@/features/products/detail/ProductDetailPage";
import { getQueryClient } from "@/lib/query-client";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(productDetailQueryOptions(id));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductDetailPage id={id} />
    </HydrationBoundary>
  );
}
