/** 商品一覧の絞り込み条件（filterProducts / isFiltered で使用）。 */
export interface ProductFilters {
  status: string;
  saleType: string;
  query: string;
}
