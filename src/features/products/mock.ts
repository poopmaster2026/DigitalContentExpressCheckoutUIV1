import type { Product } from "./types";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

/** Phase 0 のモックデータ（デジタルDL商品）。実 API 接続までの仮データ。 */
export const PRODUCTS: Product[] = [
  { id: "1", name: "やさしい料理の基本", price: 1200, sales: 37, revenue: 44400, status: "published", thumb: "sage", kind: "book", image: unsplash("photo-1556909114-f6e7ad7d3136") },
  { id: "2", name: "旬の野菜 動画レッスン全30本", price: 9800, sales: 12, revenue: 117600, status: "published", thumb: "sky", kind: "video", image: unsplash("photo-1512621776951-a57141f2eefd") },
  { id: "3", name: "季節のレシピ集", price: null, sales: 88, revenue: 0, status: "published", thumb: "sand", kind: "collection", image: unsplash("photo-1490645935967-10de6ba17061") },
  { id: "4", name: "朝食レシピ30", price: 800, sales: 25, revenue: 20000, status: "draft", thumb: "rose", kind: "photo", image: unsplash("photo-1484723091739-30a097e8f929") },
  { id: "5", name: "献立テンプレ30日分", price: 1500, sales: 18, revenue: 27000, status: "published", thumb: "lilac", kind: "template", image: unsplash("photo-1504674900247-0877df9cc836") },
  { id: "6", name: "だしの基本ガイドブック", price: 3000, sales: 6, revenue: 18000, status: "published", thumb: "mint", kind: "guide", image: unsplash("photo-1547592180-85f173990554") },
];

const yen = new Intl.NumberFormat("ja-JP");

export const formatPrice = (price: number | null) =>
  price === null ? "無料" : `¥${yen.format(price)}`;

export const formatRevenue = (p: Product) =>
  p.price === null ? "—" : `¥${yen.format(p.revenue)}`;
