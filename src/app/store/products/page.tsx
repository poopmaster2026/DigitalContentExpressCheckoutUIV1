import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ProductsPage } from '@/features/store/products-page/ProductsPage'
import { ProductsPageSkeleton } from '@/features/store/products-page/ProductsPageSkeleton'
import { WorkspaceShell } from '@/shared/components/layout/WorkspaceShell'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: '商品一覧',
}

export default function Page() {
  return (
    <WorkspaceShell>
      <Suspense fallback={<ProductsPageSkeleton />}>
        <ProductsPage />
      </Suspense>
    </WorkspaceShell>
  )
}
