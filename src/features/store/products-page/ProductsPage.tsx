'use client'

import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { productsListQueryOptions } from '../queries/storeQueries'
import { ProductsPageUI } from './ProductsPageUI'

const STORE_ID = 'hanako'

/**
 * 商品一覧（全件）の Container。商品を取得し、遷移ハンドラを配線して
 * Presentational に渡す。総件数は Figma の「全 42 件中」に合わせた表示値。
 */
export function ProductsPage() {
  const router = useRouter()
  const { data: products } = useSuspenseQuery(productsListQueryOptions(STORE_ID))

  return (
    <ProductsPageUI
      products={products}
      totalCount={42}
      onCreateProduct={() => router.push('/store/products/new')}
      onSelectProduct={(id) => router.push(`/store/products/${id}`)}
      onEditProduct={(id) => router.push(`/store/products/${id}/edit`)}
      onDeleteProduct={(id) => router.push(`/store/products/${id}`)}
    />
  )
}
