import type { Metadata } from 'next'

import { ProductTypePickerPage } from '@/features/store/product-create-page/type-picker/ProductTypePickerPage'
import { WorkspaceShell } from '@/shared/components/layout/WorkspaceShell'

export const metadata: Metadata = {
  title: '新規商品',
}

export default function Page() {
  return (
    <WorkspaceShell>
      <ProductTypePickerPage />
    </WorkspaceShell>
  )
}
