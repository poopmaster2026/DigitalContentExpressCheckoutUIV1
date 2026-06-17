import type { Key } from "react-aria-components";

/** 商品一覧の絞り込み条件（filterProducts / isFiltered で使用）。 */
export interface ProductFilters {
  status: Key;
  saleType: Key;
  query: string;
}
