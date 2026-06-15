import type { Key } from "react-aria-components";

/**
 * 商品ドメインの型。products feature 固有のため shared ではなくここで定義する
 * （複数 feature で共有する必要が出たときに shared/types へ引き上げる）。
 * 値の列挙は `as const` 配列を単一ソースにして型を導出する。
 */

export const PRODUCT_STATUSES = ["published", "draft"] as const;
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export const PRODUCT_THUMBS = ["sage", "sky", "sand", "rose", "lilac", "mint"] as const;
export type ProductThumb = (typeof PRODUCT_THUMBS)[number];

/** コンテンツ種別。カードプレビューのイラスト選択に使う。 */
export const PRODUCT_KINDS = ["book", "video", "collection", "photo", "template", "guide"] as const;
export type ProductKind = (typeof PRODUCT_KINDS)[number];

/** 販売形態。カードのチップ表示と色分けに使う。 */
export const SALE_TYPES = ["digital", "course", "booking", "subscription"] as const;
export type SaleType = (typeof SALE_TYPES)[number];

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
  saleType: SaleType;
  /** 商品サムネイル画像 URL。無い場合は二調色イラストのプレースホルダー表示。 */
  image?: string;
}

/** デジタル商品の配信ファイル。 */
export interface ProductFile {
  name: string;
  /** バイト数（表示は整形する）。 */
  size: number;
}

/**
 * 詳細/編集画面で扱う商品。一覧用の Product に編集対象の追加項目を足したもの。
 * 一覧（Product）は最小構成のため、詳細はこの型で読み込む。
 */
export interface ProductDetail extends Product {
  /** 商品説明。 */
  description: string;
  /** カテゴリ。 */
  category: string;
  /** 購入者向け公開ページの slug。 */
  slug: string;
  /** デジタル配信ファイル（saleType === "digital" のとき）。 */
  contentFile?: ProductFile;
}

/** 商品一覧の絞り込み条件（products-page/utils の filterProducts/isFiltered で使用）。 */
export interface ProductFilters {
  status: Key;
  saleType: Key;
  query: string;
}
