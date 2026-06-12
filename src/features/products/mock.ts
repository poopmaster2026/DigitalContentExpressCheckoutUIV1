import type { Product } from "./types";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

/** Phase 0 のモックデータ（販売形態: デジタル / コース / 予約 / サブスク）。実 API 接続までの仮データ。 */
export const PRODUCTS: Product[] = [
  { id: "1", name: "やさしい料理の基本", price: 1200, sales: 37, revenue: 44400, status: "published", thumb: "sage", kind: "book", saleType: "digital", image: unsplash("photo-1556909114-f6e7ad7d3136") },
  { id: "2", name: "旬の野菜 動画レッスン全30本", price: 9800, sales: 12, revenue: 117600, status: "published", thumb: "sky", kind: "video", saleType: "course", image: unsplash("photo-1512621776951-a57141f2eefd") },
  { id: "3", name: "季節のレシピ集", price: null, sales: 88, revenue: 0, status: "published", thumb: "sand", kind: "collection", saleType: "digital", image: unsplash("photo-1490645935967-10de6ba17061") },
  { id: "4", name: "朝食レシピ30", price: 800, sales: 25, revenue: 20000, status: "draft", thumb: "rose", kind: "photo", saleType: "digital", image: unsplash("photo-1484723091739-30a097e8f929") },
  { id: "5", name: "献立テンプレ30日分", price: 1500, sales: 18, revenue: 27000, status: "published", thumb: "lilac", kind: "template", saleType: "digital", image: unsplash("photo-1504674900247-0877df9cc836") },
  { id: "6", name: "だしの基本ガイドブック", price: 3000, sales: 6, revenue: 18000, status: "published", thumb: "mint", kind: "guide", saleType: "digital", image: unsplash("photo-1547592180-85f173990554") },
  { id: "7", name: "鮭の作り置きレシピ", price: 980, sales: 42, revenue: 41160, status: "published", thumb: "sage", kind: "book", saleType: "digital", image: unsplash("photo-1467003909585-2f8a72700288") },
  { id: "8", name: "パスタの基礎 動画講座", price: 6800, sales: 21, revenue: 142800, status: "published", thumb: "sky", kind: "video", saleType: "course", image: unsplash("photo-1473093295043-cdd812d0e601") },
  { id: "9", name: "サラダの教科書", price: 1400, sales: 53, revenue: 74200, status: "published", thumb: "sage", kind: "book", saleType: "digital", image: unsplash("photo-1540189549336-e6e99c3679fe") },
  { id: "10", name: "おうちピザ完全ガイド", price: 2200, sales: 0, revenue: 0, status: "draft", thumb: "sand", kind: "guide", saleType: "digital", image: unsplash("photo-1565299624946-b28f40a0ae38") },
  { id: "11", name: "ふわふわパンケーキの科学", price: 1100, sales: 64, revenue: 70400, status: "published", thumb: "rose", kind: "book", saleType: "digital", image: unsplash("photo-1567620905732-2d1ec7ab7445") },
  { id: "12", name: "栄養バランス献立表", price: null, sales: 131, revenue: 0, status: "published", thumb: "lilac", kind: "template", saleType: "digital", image: unsplash("photo-1546069901-ba9599a7e63c") },
  { id: "13", name: "週末BBQプランブック", price: 1800, sales: 15, revenue: 27000, status: "published", thumb: "sand", kind: "collection", saleType: "digital", image: unsplash("photo-1555939594-58d7cb561ad1") },
  { id: "14", name: "朝のトーストアレンジ50", price: 600, sales: 92, revenue: 55200, status: "published", thumb: "mint", kind: "photo", saleType: "digital", image: unsplash("photo-1482049016688-2d3e1b311543") },
  { id: "15", name: "卵料理マスター講座", price: 4800, sales: 0, revenue: 0, status: "draft", thumb: "sky", kind: "video", saleType: "course", image: unsplash("photo-1525351484163-7529414344d8") },
  { id: "16", name: "1対1 料理相談（60分）", price: 5000, sales: 9, revenue: 45000, status: "published", thumb: "rose", kind: "video", saleType: "booking", image: unsplash("photo-1556910103-1c02745aae4d") },
  { id: "17", name: "花子のキッチン 月額会員", price: 980, sales: 76, revenue: 74480, status: "published", thumb: "lilac", kind: "collection", saleType: "subscription", image: unsplash("photo-1498837167922-ddd27525d352") },
];

const yen = new Intl.NumberFormat("ja-JP");

export const formatPrice = (price: number | null) =>
  price === null ? "無料" : `¥${yen.format(price)}`;

export const formatRevenue = (p: Product) =>
  p.price === null ? "—" : `¥${yen.format(p.revenue)}`;
