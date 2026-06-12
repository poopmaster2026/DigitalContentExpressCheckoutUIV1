import type { Product } from "./types";

/** Phase 0 のモックデータ（デジタルDL商品）。実 API 接続までの仮データ。 */
export const PRODUCTS: Product[] = [
  { id: "1", name: "やさしい料理の基本", price: 1200, sales: 37, revenue: 44400, status: "published", thumb: "sage", kind: "book" },
  { id: "2", name: "旬の野菜 動画レッスン全30本", price: 9800, sales: 12, revenue: 117600, status: "published", thumb: "sky", kind: "video" },
  { id: "3", name: "季節のレシピ集", price: null, sales: 88, revenue: 0, status: "published", thumb: "sand", kind: "collection" },
  { id: "4", name: "朝食レシピ30", price: 800, sales: 25, revenue: 20000, status: "draft", thumb: "rose", kind: "photo" },
  { id: "5", name: "献立テンプレ30日分", price: 1500, sales: 18, revenue: 27000, status: "published", thumb: "lilac", kind: "template" },
  { id: "6", name: "だしの基本ガイドブック", price: 3000, sales: 6, revenue: 18000, status: "published", thumb: "mint", kind: "guide" },
];

const yen = new Intl.NumberFormat("ja-JP");

export const formatPrice = (price: number | null) =>
  price === null ? "無料" : `¥${yen.format(price)}`;

export const formatRevenue = (p: Product) =>
  p.price === null ? "—" : `¥${yen.format(p.revenue)}`;
