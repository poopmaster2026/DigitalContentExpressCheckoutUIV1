import type { SortDescriptor } from "@react-spectrum/s2/TableView";
import type { Product, ProductFilters } from "../types";

/** ステータス・販売形態・検索語で商品を絞り込む。 */
export function filterProducts(products: Product[], { status, saleType, query }: ProductFilters): Product[] {
  const q = query.trim();
  return products.filter((p) => {
    const okStatus = status === "all" || p.status === status;
    const okSaleType = saleType === "all" || p.saleType === saleType;
    const okQuery = q === "" || p.name.includes(q);
    return okStatus && okSaleType && okQuery;
  });
}

/** いずれかの絞り込みが有効か（空状態の文言切り替えに使う）。 */
export function isFiltered({ status, saleType, query }: ProductFilters): boolean {
  return query.trim() !== "" || status !== "all" || saleType !== "all";
}

/** テーブルのソート比較（列ごと）。 */
export function compareProducts(a: Product, b: Product, column: SortDescriptor["column"]): number {
  switch (column) {
    case "name":
      return a.name.localeCompare(b.name, "ja");
    case "price":
      return (a.price ?? 0) - (b.price ?? 0);
    case "sales":
      return a.sales - b.sales;
    case "revenue":
      return a.revenue - b.revenue;
    default:
      return 0;
  }
}
