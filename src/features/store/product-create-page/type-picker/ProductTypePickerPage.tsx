'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import type { CreatableProductType } from '../productTypeMeta'
import { ProductTypePickerUI } from './ProductTypePickerUI'

/**
 * 新規商品のタイプ選択 Container。
 * 選択中タイプを state で持ち、「作成する」で作成フォーム（/store/products/new/[type]）へ遷移する。
 */
export function ProductTypePickerPage() {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<CreatableProductType>('digital')

  function handleCreate() {
    router.push(`/store/products/new/${selectedType}`)
  }

  return (
    <ProductTypePickerUI
      selectedType={selectedType}
      onSelectType={setSelectedType}
      onCreate={handleCreate}
    />
  )
}
