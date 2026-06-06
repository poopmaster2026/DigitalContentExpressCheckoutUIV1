import type { ProductType } from '@/shared/types/product'

/** 商品の公開状態。管理画面で表示・絞り込みに使う。 */
export type ProductStatus = 'published' | 'draft'

/** 注文の状態。後続の注文一覧画面でも再利用する。 */
export type OrderStatus = 'completed' | 'refunded' | 'processing'

/**
 * ストアダッシュボードの商品テーブル 1 行ぶんの表示用データ。
 * 共通 Product に管理表示用の情報（販売数・売上・公開状態）を足したもの。
 */
export interface StoreProductRow {
  id: string
  title: string
  type: ProductType
  /** サムネイル画像 URL（未設定の場合はタイプ色のプレースホルダを表示）。 */
  thumbnailUrl?: string
  price: number
  soldCount: number
  revenue: number
  status: ProductStatus
}

/**
 * 商品詳細/編集画面が必要とするデータ。一覧行（StoreProductRow）に
 * 編集フォーム用のフィールド（説明 / カテゴリ / スラッグ）を足したもの。
 */
export interface StoreProductDetail extends StoreProductRow {
  /** 商品説明（Textarea で編集）。 */
  description: string
  /** カテゴリ（任意。Input で編集）。 */
  category: string
  /** 商品ページ URL のスラッグ部分（ours.store/{store}/{slug}）。 */
  slug: string
}

/** 最近の注文 1 行ぶんの表示用データ。 */
export interface OrderRow {
  id: string
  /** 購入者名。アバターの頭文字にも使う。 */
  buyerName: string
  productTitle: string
  amount: number
  status: OrderStatus
  /** 注文日時（ISO 文字列）。相対表記は表示側で算出する。 */
  createdAt: string
}

/** 概要セクションの KPI 3 枚ぶんのデータ。 */
export interface StoreKpi {
  /** 今月の売上（円）。 */
  monthlyRevenue: number
  /** 売上の前月比（%）。プラスで増加。null のとき非表示。 */
  revenueDeltaPct: number | null
  /** 今月の販売数。 */
  monthlySales: number
  /** 販売数の前月比（件）。 */
  salesDelta: number | null
  /** 公開中の商品数。 */
  publishedCount: number
  /** 下書きの商品数。 */
  draftCount: number
}

/** ストアダッシュボードが描画に必要とするデータ一式。 */
export interface StoreDashboardData {
  kpi: StoreKpi
  products: StoreProductRow[]
  recentOrders: OrderRow[]
}
