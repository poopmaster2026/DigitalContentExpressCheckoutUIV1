import { PRODUCTS, getProductDetail } from "../mock";
import type { Product, ProductDetail } from "../types";

// Phase 0: mock データを非同期で返す薄いラッパー。
// Phase 1 で実 API（fetch / axios 等）への差し替えはここだけ行う。

export async function fetchProducts(): Promise<Product[]> {
  return PRODUCTS;
}

export async function fetchProductDetail(
  id: string
): Promise<ProductDetail | undefined> {
  return getProductDetail(id);
}
