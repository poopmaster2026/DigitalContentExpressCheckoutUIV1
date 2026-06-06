import type { Metadata } from 'next'
import { Suspense } from 'react'

import { ProductEditPage } from '@/features/store/product-edit-page/ProductEditPage'
import { ProductEditPageSkeleton } from '@/features/store/product-edit-page/ProductEditPageSkeleton'
import { WorkspaceShell } from '@/shared/components/layout/WorkspaceShell'

export const metadata: Metadata = {
  title: '商品の編集',
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <WorkspaceShell>
      <Suspense fallback={<ProductEditPageSkeleton />}>
        <ProductEditPage productId={id} />
      </Suspense>
    </WorkspaceShell>
  )
}
