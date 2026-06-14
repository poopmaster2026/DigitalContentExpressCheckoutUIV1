import type { Key } from "react-aria-components";

// 商品ドメインの基本型は shared/types に置き、features からは再エクスポートする
// （依存方向 app → features → shared を守る）。
export type {
  Product,
  ProductStatus,
  ProductThumb,
  ProductKind,
  SaleType,
} from "@/shared/types/product";

/** 商品一覧の絞り込み条件（products-page/utils の filterProducts/isFiltered で使用）。 */
export interface ProductFilters {
  status: Key;
  saleType: Key;
  query: string;
}
