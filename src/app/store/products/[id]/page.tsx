import { notFound } from "next/navigation";

import { getProductDetail } from "@/features/products/mock";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = getProductDetail(id);
  if (!detail) notFound();
  return <ProductDetailPage detail={detail} />;
}
