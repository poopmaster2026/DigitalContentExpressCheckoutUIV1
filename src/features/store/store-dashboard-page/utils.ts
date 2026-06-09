import type { ProductType } from '@/shared/types/product'

import type { StoreProductRow } from '../types/store'

/** 商品タイプの日本語ラベル。TypeBadge とテーブルで共有。 */
export const PRODUCT_TYPE_LABELS: Record<ProductType, string> = {
  digital: 'デジタルDL',
}

/** 商品タブの定義（「すべて」のみ — タイプが 1 つなのでフィルタ不要）。 */
export const PRODUCT_TAB_ITEMS: { value: 'all' | ProductType; label: string }[] = [
  { value: 'all', label: 'すべて' },
]

/** 金額を「¥1,200」形式に整形する。 */
export function formatYen(value: number): string {
  return `¥${value.toLocaleString('ja-JP')}`
}

/** タブ value で商品行を絞り込む。「すべて」は全件返す。 */
export function filterProductsByTab(
  products: StoreProductRow[],
  tab: 'all' | ProductType,
): StoreProductRow[] {
  if (tab === 'all') return products
  return products.filter((p) => p.type === tab)
}

/**
 * 商品行の合計（販売数・売上）を算出する。価格 ¥0（無料配布）の売上は revenue が 0。
 */
export function computeProductTotals(products: StoreProductRow[]): {
  soldCount: number
  revenue: number
} {
  return products.reduce(
    (acc, p) => ({ soldCount: acc.soldCount + p.soldCount, revenue: acc.revenue + p.revenue }),
    { soldCount: 0, revenue: 0 },
  )
}

/** ISO 文字列を「2時間前」「昨日」「2日前」のような相対表記にする（now 起点）。 */
export function formatRelativeTime(iso: string, now: Date = new Date()): string {
  const diffMs = now.getTime() - new Date(iso).getTime()
  const diffMinutes = Math.floor(diffMs / 60_000)
  if (diffMinutes < 1) return 'たった今'
  if (diffMinutes < 60) return `${diffMinutes}分前`
  const diffHours = Math.floor(diffMinutes / 60)
  if (diffHours < 24) return `${diffHours}時間前`
  const diffDays = Math.floor(diffHours / 24)
  if (diffDays === 1) return '昨日'
  return `${diffDays}日前`
}

/** 名前の先頭 1 文字をアバターの頭文字として返す。 */
export function nameInitial(name: string): string {
  return name.trim().charAt(0)
}
