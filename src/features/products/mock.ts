import type { Product } from "./types";

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=600&q=80&auto=format&fit=crop`;

/**
 * Phase 0 のモックデータ（販売形態: デジタル / コース / 予約 / サブスク）。
 * products feature 固有のため shared/mock ではなくこの feature 内に置く。
 * 画像は販売形態・コンテンツ種別（電子書籍 / 動画講座 / 相談 / 会員制）に合わせた
 * デジタルコンテンツ系のビジュアル。実 API 接続までの仮データ。
 */
export const PRODUCTS: Product[] = [
  { id: "1", name: "やさしい料理の基本", price: 1200, sales: 37, revenue: 44400, status: "published", thumb: "sage", kind: "book", saleType: "digital", image: unsplash("photo-1544716278-ca5e3f4abd8c") },
  { id: "2", name: "旬の野菜 動画レッスン全30本", price: 9800, sales: 12, revenue: 117600, status: "published", thumb: "sky", kind: "video", saleType: "course", image: unsplash("photo-1516321318423-f06f85e504b3") },
  { id: "3", name: "季節のレシピ集", price: null, sales: 88, revenue: 0, status: "published", thumb: "sand", kind: "collection", saleType: "digital", image: unsplash("photo-1456513080510-7bf3a84b82f8") },
  { id: "4", name: "朝食レシピ30", price: 800, sales: 25, revenue: 20000, status: "draft", thumb: "rose", kind: "photo", saleType: "digital", image: unsplash("photo-1488190211105-8b0e65b80b4e") },
  { id: "5", name: "献立テンプレ30日分", price: 1500, sales: 18, revenue: 27000, status: "published", thumb: "lilac", kind: "template", saleType: "digital", image: unsplash("photo-1517842645767-c639042777db") },
  { id: "6", name: "だしの基本ガイドブック", price: 3000, sales: 6, revenue: 18000, status: "published", thumb: "mint", kind: "guide", saleType: "digital", image: unsplash("photo-1481627834876-b7833e8f5570") },
  { id: "7", name: "鮭の作り置きレシピ", price: 980, sales: 42, revenue: 41160, status: "published", thumb: "sage", kind: "book", saleType: "digital", image: unsplash("photo-1499750310107-5fef28a66643") },
  { id: "8", name: "パスタの基礎 動画講座", price: 6800, sales: 21, revenue: 142800, status: "published", thumb: "sky", kind: "video", saleType: "course", image: unsplash("photo-1522202176988-66273c2fd55f") },
  { id: "9", name: "サラダの教科書", price: 1400, sales: 53, revenue: 74200, status: "published", thumb: "sage", kind: "book", saleType: "digital", image: unsplash("photo-1434030216411-0b793f4b4173") },
  { id: "10", name: "おうちピザ完全ガイド", price: 2200, sales: 0, revenue: 0, status: "draft", thumb: "sand", kind: "guide", saleType: "digital", image: unsplash("photo-1531403009284-440f080d1e12") },
  { id: "11", name: "ふわふわパンケーキの科学", price: 1100, sales: 64, revenue: 70400, status: "published", thumb: "rose", kind: "book", saleType: "digital", image: unsplash("photo-1498050108023-c5249f4df085") },
  { id: "12", name: "栄養バランス献立表", price: null, sales: 131, revenue: 0, status: "published", thumb: "lilac", kind: "template", saleType: "digital", image: unsplash("photo-1492724441997-5dc865305da7") },
  { id: "13", name: "週末BBQプランブック", price: 1800, sales: 15, revenue: 27000, status: "published", thumb: "sand", kind: "collection", saleType: "digital", image: unsplash("photo-1515378791036-0648a3ef77b2") },
  { id: "14", name: "朝のトーストアレンジ50", price: 600, sales: 92, revenue: 55200, status: "published", thumb: "mint", kind: "photo", saleType: "digital", image: unsplash("photo-1557804506-669a67965ba0") },
  { id: "15", name: "卵料理マスター講座", price: 4800, sales: 0, revenue: 0, status: "draft", thumb: "sky", kind: "video", saleType: "course", image: unsplash("photo-1519389950473-47ba0277781c") },
  { id: "16", name: "1対1 料理相談（60分）", price: 5000, sales: 9, revenue: 45000, status: "published", thumb: "rose", kind: "video", saleType: "booking", image: unsplash("photo-1542744173-8e7e53415bb0") },
  { id: "17", name: "花子のキッチン 月額会員", price: 980, sales: 76, revenue: 74480, status: "published", thumb: "lilac", kind: "collection", saleType: "subscription", image: unsplash("photo-1521737711867-e3b97375f902") },
];
