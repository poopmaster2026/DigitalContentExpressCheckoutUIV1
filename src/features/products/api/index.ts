import { PRODUCTS, getProductDetail } from "../mock";
import type { Product, ProductDetail } from "../types";

export async function fetchProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function fetchProductDetail(
  id: string
): Promise<ProductDetail | undefined> {
  return getProductDetail(id);
}

// TODO: Phase 1 で実 API に差し替える
// export interface CreateProductInput {
//   name: string;
//   price: number | null;
//   saleType: SaleType;
//   description: string;
//   category: string;
//   slug: string;
// }
//
// export async function createProduct(input: CreateProductInput): Promise<{ id: string }> {
//   const res = await fetch("/api/products", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(input),
//   });
//   if (!res.ok) throw new Error("Failed to create product");
//   return res.json();
// }
