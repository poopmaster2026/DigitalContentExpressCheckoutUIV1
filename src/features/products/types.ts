export type ProductStatus = "published" | "draft";

export type ProductThumb = "sage" | "sky" | "sand" | "rose" | "lilac" | "mint";

/** コンテンツ種別。カードプレビューのイラスト選択に使う。 */
export type ProductKind = "book" | "video" | "collection" | "photo" | "template" | "guide";

export interface Product {
  id: string;
  name: string;
  /** null = 無料 */
  price: number | null;
  sales: number;
  revenue: number;
  status: ProductStatus;
  thumb: ProductThumb;
  kind: ProductKind;
}
