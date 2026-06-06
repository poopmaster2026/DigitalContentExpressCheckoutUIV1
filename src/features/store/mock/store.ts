import type {
  OrderRow,
  StoreDashboardData,
  StoreKpi,
  StoreProductDetail,
  StoreProductRow,
} from '../types/store'

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?w=120&h=120&fit=crop`

/** 概要セクションの KPI（Figma の値に一致）。 */
export const mockKpi: StoreKpi = {
  monthlyRevenue: 48_200,
  revenueDeltaPct: 18,
  monthlySales: 37,
  salesDelta: 5,
  publishedCount: 4,
  draftCount: 1,
}

/** 商品テーブルの行（決定論的・Figma の上位 4 件に一致）。 */
export const mockStoreProducts: StoreProductRow[] = [
  {
    id: 'p1',
    title: 'やさしい料理の基本',
    type: 'digital',
    thumbnailUrl: unsplash('1495521821757-a1efb6729352'),
    price: 1_200,
    soldCount: 37,
    revenue: 44_400,
    status: 'published',
  },
  {
    id: 'p2',
    title: '30日で旬を学ぶ 動画コース',
    type: 'course',
    thumbnailUrl: unsplash('1556910103-1c02745aae4d'),
    price: 9_800,
    soldCount: 12,
    revenue: 117_600,
    status: 'published',
  },
  {
    id: 'p3',
    title: '1対1 献立相談（30分）',
    type: 'booking',
    thumbnailUrl: unsplash('1466637574441-749b8f19452f'),
    price: 3_000,
    soldCount: 3,
    revenue: 9_000,
    status: 'draft',
  },
  {
    id: 'p4',
    title: '季節のレシピ集',
    type: 'digital',
    thumbnailUrl: unsplash('1490645935967-10de6ba17061'),
    price: 0,
    soldCount: 88,
    revenue: 0,
    status: 'published',
  },
  {
    id: 'p5',
    title: '梅仕事スターターキット',
    type: 'digital',
    thumbnailUrl: unsplash('1528825871115-3581a5387919'),
    price: 1_500,
    soldCount: 22,
    revenue: 33_000,
    status: 'published',
  },
  {
    id: 'p6',
    title: 'だしの教科書（PDF）',
    type: 'digital',
    thumbnailUrl: unsplash('1473093295043-cdd812d0e601'),
    price: 800,
    soldCount: 64,
    revenue: 51_200,
    status: 'published',
  },
  {
    id: 'p7',
    title: '季節の常備菜 オンライン講座',
    type: 'course',
    thumbnailUrl: unsplash('1512621776951-a57141f2eefd'),
    price: 6_000,
    soldCount: 9,
    revenue: 54_000,
    status: 'draft',
  },
  {
    id: 'p8',
    title: '私の台所道具リスト',
    type: 'digital',
    thumbnailUrl: unsplash('1556909114-f6e7ad7d3136'),
    price: 500,
    soldCount: 41,
    revenue: 20_500,
    status: 'published',
  },
]

/**
 * 商品詳細/編集画面の編集用フィールド（説明 / カテゴリ / スラッグ）。
 * 一覧行（mockStoreProducts）に id で結合して StoreProductDetail を組み立てる。
 */
const PRODUCT_EDIT_FIELDS: Record<string, Pick<StoreProductDetail, 'description' | 'category' | 'slug'>> = {
  p1: {
    description: '旬の食材で作る、やさしい日々の料理。基本の出汁からていねいに解説します。',
    category: '料理',
    slug: 'yasashii',
  },
  p2: {
    description: '30日間で季節の食材を学ぶ動画コース。毎日のレシピと買い物リスト付き。',
    category: 'コース',
    slug: '30days-shun',
  },
  p3: {
    description: '管理栄養士が 1 対 1 であなたの献立を提案する 30 分のオンライン相談。',
    category: '相談',
    slug: 'kondate-soudan',
  },
  p4: {
    description: '春夏秋冬それぞれの旬を生かしたレシピ集。無料で配布しています。',
    category: '料理',
    slug: 'kisetsu-recipe',
  },
}

/** 詳細画面が必要とするデフォルトの編集フィールド（未登録 id 用フォールバック）。 */
const DEFAULT_EDIT_FIELDS: Pick<StoreProductDetail, 'description' | 'category' | 'slug'> = {
  description: '',
  category: '',
  slug: 'product',
}

/** 一覧行（StoreProductRow）と編集フィールドを結合して詳細データを組み立てる。 */
export function toProductDetail(row: StoreProductRow): StoreProductDetail {
  const extra = PRODUCT_EDIT_FIELDS[row.id] ?? DEFAULT_EDIT_FIELDS
  return { ...row, ...extra }
}

/** id から商品詳細（編集用）を引く。存在しなければ null。 */
export function findProductDetail(productId: string): StoreProductDetail | null {
  const row = mockStoreProducts.find((p) => p.id === productId)
  return row ? toProductDetail(row) : null
}

/** Storybook / 既定表示用の商品詳細（やさしい料理の基本＝公開中・有料）。 */
export const mockProductDetail: StoreProductDetail = toProductDetail(mockStoreProducts[0])

/** Storybook 用の下書き商品詳細（1対1 献立相談＝下書き）。 */
export const mockDraftProductDetail: StoreProductDetail = toProductDetail(mockStoreProducts[2])

/** 最近の注文（Figma の 3 件に一致）。 */
export const mockRecentOrders: OrderRow[] = [
  {
    id: 'o1',
    buyerName: '佐藤 美咲',
    productTitle: 'やさしい料理の基本',
    amount: 1_200,
    status: 'completed',
    createdAt: '2026-06-03T11:00:00+09:00',
  },
  {
    id: 'o2',
    buyerName: '田村 健',
    productTitle: '30日で旬を学ぶ 動画コース',
    amount: 9_800,
    status: 'completed',
    createdAt: '2026-06-02T13:00:00+09:00',
  },
  {
    id: 'o3',
    buyerName: '山本 彩',
    productTitle: '季節のレシピ集',
    amount: 0,
    status: 'completed',
    createdAt: '2026-06-01T09:00:00+09:00',
  },
]

/**
 * 注文一覧（全件）画面の 1 ページぶん（8 件）。完了 / 返金 / 処理中を織り交ぜる。
 * createdAt は 2026-06-03 13:00 を「いま」とした相対表記（2時間前〜1週間前）に揃えてある。
 */
export const mockListOrders: OrderRow[] = [
  {
    id: '1042',
    buyerName: '佐藤 美咲',
    productTitle: 'やさしい料理の基本',
    amount: 1_200,
    status: 'completed',
    createdAt: '2026-06-03T11:00:00+09:00',
  },
  {
    id: '1041',
    buyerName: '田村 健',
    productTitle: '30日で旬を学ぶ 動画コース',
    amount: 9_800,
    status: 'completed',
    createdAt: '2026-06-02T12:00:00+09:00',
  },
  {
    id: '1040',
    buyerName: '山本 彩',
    productTitle: '季節のレシピ集',
    amount: 0,
    status: 'completed',
    createdAt: '2026-06-01T12:00:00+09:00',
  },
  {
    id: '1039',
    buyerName: '鈴木 大輔',
    productTitle: 'だしの教科書（PDF）',
    amount: 800,
    status: 'refunded',
    createdAt: '2026-05-31T12:00:00+09:00',
  },
  {
    id: '1038',
    buyerName: '中村 由依',
    productTitle: '1対1 献立相談（30分）',
    amount: 3_000,
    status: 'processing',
    createdAt: '2026-05-30T12:00:00+09:00',
  },
  {
    id: '1037',
    buyerName: '小林 拓也',
    productTitle: '梅仕事スターターキット',
    amount: 1_500,
    status: 'completed',
    createdAt: '2026-05-29T12:00:00+09:00',
  },
  {
    id: '1036',
    buyerName: '加藤 さくら',
    productTitle: '季節の常備菜 オンライン講座',
    amount: 6_000,
    status: 'completed',
    createdAt: '2026-05-28T12:00:00+09:00',
  },
  {
    id: '1035',
    buyerName: '渡辺 翔',
    productTitle: '私の台所道具リスト',
    amount: 500,
    status: 'refunded',
    createdAt: '2026-05-27T12:00:00+09:00',
  },
]

/** 商品が皆無の空状態（商品一覧の Empty 用）。 */
export const emptyStoreProducts: StoreProductRow[] = []

/** 注文が皆無の空状態（注文一覧の Empty 用）。 */
export const emptyListOrders: OrderRow[] = []

/** ダッシュボードが必要とするデータ一式（モック）。 */
export const mockStoreDashboard: StoreDashboardData = {
  kpi: mockKpi,
  products: mockStoreProducts,
  recentOrders: mockRecentOrders,
}

/** 新規ストア（商品・注文ともに皆無）の空状態。 */
export const emptyStoreDashboard: StoreDashboardData = {
  kpi: {
    monthlyRevenue: 0,
    revenueDeltaPct: null,
    monthlySales: 0,
    salesDelta: null,
    publishedCount: 0,
    draftCount: 0,
  },
  products: [],
  recentOrders: [],
}
