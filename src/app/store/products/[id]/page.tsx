import { notFound } from "next/navigation";

import { fetchProductDetail } from "@/features/products/api";
import { ProductDetailPage } from "@/features/products/ProductDetailPage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const detail = await fetchProductDetail(id);
  if (!detail) notFound();
  return <ProductDetailPage detail={detail} />;
}
