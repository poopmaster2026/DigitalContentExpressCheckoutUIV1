/**
 * Store feature の queryKey ファクトリ。手書きの文字列配列は禁止。
 * ダッシュボード以外（商品一覧・注文一覧など）の後続画面でもここに追記する。
 */
export const storeKeys = {
  all: ['store'] as const,
  dashboard: (storeId: string) => [...storeKeys.all, 'dashboard', storeId] as const,
  products: (storeId: string) => [...storeKeys.all, 'products', storeId] as const,
  productDetail: (productId: string) => [...storeKeys.all, 'product', productId] as const,
  orders: (storeId: string) => [...storeKeys.all, 'orders', storeId] as const,
}
