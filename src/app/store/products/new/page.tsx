import { NewProductPage } from "@/features/products/NewProductPage";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ saleType?: string }>;
}) {
  const { saleType } = await searchParams;
  return <NewProductPage saleType={saleType} />;
}
