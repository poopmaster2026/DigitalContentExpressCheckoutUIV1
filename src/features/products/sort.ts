import type { Product, SortValue } from "./types";

/**
 * 商品配列を SortValue に従って並び替える純粋関数（元配列は破壊しない）。
 * Product に作成日時が無いため、"新着順" は既存の名前 / 価格 / 販売数 / 売上に適合させている。
 * 想定外の値は既定（売上が高い順）にフォールバックする。
 */
export function sortProducts(products: Product[], sort: SortValue): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "name_asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "ja"));
    case "price_asc":
      return sorted.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    case "price_desc":
      return sorted.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    case "sales_desc":
      return sorted.sort((a, b) => b.sales - a.sales);
    case "revenue_desc":
    default:
      return sorted.sort((a, b) => b.revenue - a.revenue);
  }
}
