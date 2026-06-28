import { ProductDetailPage } from "@/features/products/detail/ProductDetailPage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  return <ProductDetailPage id={id} />;
}
