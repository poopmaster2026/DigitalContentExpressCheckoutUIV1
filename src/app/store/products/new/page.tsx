import { NewProductPage } from "@/features/products/new/NewProductPage";

interface Props {
  searchParams: Promise<{ saleType?: string }>;
}

export default async function Page({ searchParams }: Props) {
  const { saleType } = await searchParams;
  return <NewProductPage saleType={saleType} />;
}
