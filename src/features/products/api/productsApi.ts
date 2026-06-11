import type { Product, ProductStatus } from "../types/product";

/**
 * 商品 API（Phase 0 モック）— メモリ上で CRUD する。実 API 差し替え対象。
 * シードは Figma 966:337 のモックデータ。
 */

const seed: Product[] = [
  { id: "p1", title: "やさしい料理の基本", pricingModel: "paid", price: 1200, sales: 37, status: "published", thumbTint: "green" },
  { id: "p2", title: "旬の野菜 動画レッスン全30本", pricingModel: "paid", price: 9800, sales: 12, status: "published", thumbTint: "blue" },
  { id: "p3", title: "季節のレシピ集", pricingModel: "free", price: 0, sales: 88, status: "published", thumbTint: "amber" },
  { id: "p4", title: "朝食レシピ30", pricingModel: "paid", price: 800, sales: 25, status: "draft", thumbTint: "pink" },
  { id: "p5", title: "献立テンプレ30日分", pricingModel: "paid", price: 1500, sales: 18, status: "published", thumbTint: "purple" },
  { id: "p6", title: "だしの基本ガイドブック", pricingModel: "paid", price: 3000, sales: 6, status: "published", thumbTint: "teal" },
];

let products: Product[] = seed.map((p) => ({ ...p }));
let nextId = seed.length + 1;

const delay = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts(): Promise<Product[]> {
  await delay();
  return products.map((p) => ({ ...p }));
}

/** 複製は即実行・新 draft「◯◯のコピー」（STORE-SCREENS.md §2-6 / §4） */
export async function duplicateProduct(id: string): Promise<Product> {
  await delay();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) throw new Error(`Product not found: ${id}`);
  const source = products[index];
  const copy: Product = {
    ...source,
    id: `p${nextId++}`,
    title: `${source.title}のコピー`,
    sales: 0,
    status: "draft",
  };
  products = [...products.slice(0, index + 1), copy, ...products.slice(index + 1)];
  return { ...copy };
}

export async function updateProductStatus(id: string, status: ProductStatus): Promise<Product> {
  await delay();
  const product = products.find((p) => p.id === id);
  if (!product) throw new Error(`Product not found: ${id}`);
  product.status = status;
  return { ...product };
}

export async function deleteProduct(id: string): Promise<void> {
  await delay();
  products = products.filter((p) => p.id !== id);
}
