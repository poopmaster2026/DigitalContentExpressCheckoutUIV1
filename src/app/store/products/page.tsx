import type { Metadata } from "next";
import { ProductsPage } from "@/features/products/products-page/ProductsPage";

export const metadata: Metadata = {
  title: "商品 | Digital Content Express Checkout",
};

export default function StoreProductsPage() {
  return <ProductsPage />;
}
