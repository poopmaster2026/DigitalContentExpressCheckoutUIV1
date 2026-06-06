import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import { ProductCreatePage } from '@/features/store/product-create-page/ProductCreatePage'
import { ProductCreatePageSkeleton } from '@/features/store/product-create-page/ProductCreatePageSkeleton'
import { isCreatableProductType } from '@/features/store/product-create-page/productTypeMeta'
import { WorkspaceShell } from '@/shared/components/layout/WorkspaceShell'

export const metadata: Metadata = {
  title: '新規商品作成',
}

export default async function Page({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params

  if (!isCreatableProductType(type)) {
    notFound()
  }

  return (
    <WorkspaceShell>
      <Suspense fallback={<ProductCreatePageSkeleton />}>
        <ProductCreatePage type={type} />
      </Suspense>
    </WorkspaceShell>
  )
}
