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
  /** 商品サムネイル画像 URL。無い場合は二調色イラストのプレースホルダー表示。 */
  image?: string;
}
