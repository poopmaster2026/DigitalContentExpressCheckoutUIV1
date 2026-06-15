import type { ProductDetail } from "./types";
import { ProductDetailContent } from "./ProductDetailContent/ProductDetailContent";

/**
 * 商品 詳細/編集ページの最上位エントリ（route から呼ばれる）。
 * 詳細データは route（server）で解決して渡す。Container は ProductDetailContent。
 */
export function ProductDetailPage({ detail }: { detail: ProductDetail }) {
  return <ProductDetailContent detail={detail} />;
}
