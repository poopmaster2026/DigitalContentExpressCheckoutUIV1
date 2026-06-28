import { apiClient } from "@/lib/axios";

import type { Product, ProductDetail } from "../types";

export interface ProductListParams {
  status?: string;
  saleType?: string;
  q?: string;
}

export async function fetchProducts(
  params: ProductListParams = {}
): Promise<Product[]> {
  return apiClient
    .get<Product[]>("/products", { params })
    .then((res) => res.data);
}

export async function fetchProductDetail(
  id: string
): Promise<ProductDetail | null> {
  return apiClient
    .get<ProductDetail>(`/products/${id}`)
    .then((res) => res.data)
    .catch(() => null);
}

export interface CreateProductInput {
  name: string;
  description: string;
  saleType: string;
  category: string;
  slug: string;
  price: number | null;
  published: boolean;
  coverImage?: File;
  contentFile?: File;
}

export function createProduct(
  input: CreateProductInput,
  onProgress?: (percent: number) => void
): Promise<{ id: string }> {
  const body = new FormData();
  body.append("name", input.name);
  body.append("description", input.description);
  body.append("saleType", input.saleType);
  body.append("category", input.category);
  body.append("slug", input.slug);
  if (input.price !== null) body.append("price", String(input.price));
  body.append("published", String(input.published));
  if (input.coverImage) body.append("coverImage", input.coverImage);
  if (input.contentFile) body.append("contentFile", input.contentFile);

  return apiClient
    .post<{ id: string }>("/products", body, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (e.total) onProgress?.(Math.round((e.loaded / e.total) * 100));
      },
    })
    .then((res) => res.data);
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  saleType?: string;
  category?: string;
  slug?: string;
  price?: number | null;
  published?: boolean;
  coverImage?: File;
  contentFile?: File;
}

export function updateProduct(
  id: string,
  input: UpdateProductInput,
  onProgress?: (percent: number) => void
): Promise<void> {
  const body = new FormData();
  if (input.name !== undefined) body.append("name", input.name);
  if (input.description !== undefined)
    body.append("description", input.description);
  if (input.saleType !== undefined) body.append("saleType", input.saleType);
  if (input.category !== undefined) body.append("category", input.category);
  if (input.slug !== undefined) body.append("slug", input.slug);
  if (input.price !== undefined)
    body.append("price", input.price === null ? "" : String(input.price));
  if (input.published !== undefined)
    body.append("published", String(input.published));
  if (input.coverImage) body.append("coverImage", input.coverImage);
  if (input.contentFile) body.append("contentFile", input.contentFile);

  return apiClient
    .patch(`/products/${id}`, body, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (e.total) onProgress?.(Math.round((e.loaded / e.total) * 100));
      },
    })
    .then(() => undefined);
}

export async function deleteProduct(id: string): Promise<void> {
  await apiClient.delete(`/products/${id}`);
}
