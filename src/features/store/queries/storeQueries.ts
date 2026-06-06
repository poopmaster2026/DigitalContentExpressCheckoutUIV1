import { queryOptions } from '@tanstack/react-query'

import {
  fetchStoreDashboard,
  fetchStoreOrders,
  fetchStoreProduct,
  fetchStoreProducts,
} from '../api/storeApi'
import { storeKeys } from './storeKeys'

/**
 * ストアダッシュボード（KPI / 商品 / 最近の注文）の queryOptions。
 */
export function storeDashboardQueryOptions(storeId: string) {
  return queryOptions({
    queryKey: storeKeys.dashboard(storeId),
    queryFn: () => fetchStoreDashboard(),
    staleTime: 5 * 60 * 1000, // 5分
  })
}

/**
 * 商品一覧（全件）の queryOptions。
 */
export function productsListQueryOptions(storeId: string) {
  return queryOptions({
    queryKey: storeKeys.products(storeId),
    queryFn: () => fetchStoreProducts(),
    staleTime: 5 * 60 * 1000, // 5分
  })
}

/**
 * 商品詳細（編集用）の queryOptions。id で 1 件を引く。
 */
export function productDetailQueryOptions(productId: string) {
  return queryOptions({
    queryKey: storeKeys.productDetail(productId),
    queryFn: () => fetchStoreProduct(productId),
    staleTime: 5 * 60 * 1000, // 5分
  })
}

/**
 * 注文一覧（全件）の queryOptions。
 */
export function ordersListQueryOptions(storeId: string) {
  return queryOptions({
    queryKey: storeKeys.orders(storeId),
    queryFn: () => fetchStoreOrders(),
    staleTime: 5 * 60 * 1000, // 5分
  })
}
