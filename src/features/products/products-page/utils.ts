import type { SortDescriptor } from "react-aria-components";
import type { Product, ProductStatusFilter } from "../types/product";

/** 無料商品の売上は集計対象外（表では — 表示） */
export function productRevenue(product: Product): number | null {
  return product.pricingModel === "free" ? null : product.price * product.sales;
}

export function formatJPY(amount: number): string {
  return amount.toLocaleString("ja-JP", { style: "currency", currency: "JPY" });
}

export function formatPrice(product: Product): string {
  return product.pricingModel === "free" ? "無料" : formatJPY(product.price);
}

export function formatRevenue(product: Product): string {
  const revenue = productRevenue(product);
  return revenue === null ? "—" : formatJPY(revenue);
}

export function filterProducts(
  products: Product[],
  status: ProductStatusFilter,
  query: string,
): Product[] {
  const normalized = query.trim();
  return products.filter(
    (p) =>
      (status === "all" || p.status === status) &&
      (normalized === "" || p.title.includes(normalized)),
  );
}

function sortValue(product: Product, column: SortDescriptor["column"]): string | number {
  switch (column) {
    case "price":
      return product.price;
    case "sales":
      return product.sales;
    case "revenue":
      return productRevenue(product) ?? -1;
    default:
      return product.title;
  }
}

export function sortProducts(products: Product[], descriptor?: SortDescriptor): Product[] {
  if (!descriptor) return products;
  return products.toSorted((a, b) => {
    const first = sortValue(a, descriptor.column);
    const second = sortValue(b, descriptor.column);
    const cmp =
      typeof first === "string" || typeof second === "string"
        ? String(first).localeCompare(String(second), "ja")
        : first - second;
    return descriptor.direction === "descending" ? -cmp : cmp;
  });
}
