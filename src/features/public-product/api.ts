import { apiClient } from "@/lib/axios";

export interface PublicProduct {
  id: string;
  name: string;
  description: string;
  price: number | null;
  slug: string;
  image: string | null;
  creatorName: string;
}

export async function fetchPublicProduct(
  creatorId: string,
  slug: string
): Promise<PublicProduct | null> {
  return apiClient
    .get<PublicProduct>(`/public/products/${creatorId}/${slug}`)
    .then((res) => res.data)
    .catch(() => null);
}
