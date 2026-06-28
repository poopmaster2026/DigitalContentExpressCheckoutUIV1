import { PublicProductPage } from "@/features/public-product/PublicProductPage";

interface Props {
  params: Promise<{ creatorId: string; slug: string }>;
}

export default async function Page({ params }: Props) {
  const { creatorId, slug } = await params;
  return <PublicProductPage creatorId={creatorId} slug={slug} />;
}
