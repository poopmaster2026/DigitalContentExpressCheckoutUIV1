import type { StoreProductRow } from '../types/store'

/** 商品一覧の並び替えキー。Figma の「並び替え」ドロップダウンに対応。 */
export type ProductSort = 'newest' | 'sales-desc' | 'revenue-desc' | 'price-asc' | 'price-desc'

/** 並び替えの選択肢（value はソート判定に使う）。 */
export const PRODUCT_SORT_ITEMS: { value: ProductSort; label: string }[] = [
  { value: 'newest', label: '新着順' },
  { value: 'sales-desc', label: '販売数が多い順' },
  { value: 'revenue-desc', label: '売上が高い順' },
  { value: 'price-asc', label: '価格が安い順' },
  { value: 'price-desc', label: '価格が高い順' },
]

/** タイトルにキーワードを含む商品だけを残す（前後空白は無視）。 */
export function searchProducts(products: StoreProductRow[], query: string): StoreProductRow[] {
  const keyword = query.trim()
  if (!keyword) return products
  return products.filter((product) => product.title.includes(keyword))
}

/** 並び替えキーに従って新しい配列を返す（元配列は変更しない）。 */
export function sortProducts(products: StoreProductRow[], sort: ProductSort): StoreProductRow[] {
  const sorted = [...products]
  switch (sort) {
    case 'sales-desc':
      return sorted.sort((a, b) => b.soldCount - a.soldCount)
    case 'revenue-desc':
      return sorted.sort((a, b) => b.revenue - a.revenue)
    case 'price-asc':
      return sorted.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return sorted.sort((a, b) => b.price - a.price)
    case 'newest':
    default:
      return sorted
  }
}
