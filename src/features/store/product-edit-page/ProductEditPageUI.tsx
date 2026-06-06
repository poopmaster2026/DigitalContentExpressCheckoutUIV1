'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { Form } from '@/shared/components/ui/form'

import {
  productEditSchema,
  type ProductEditFormValues,
} from '../schemas/productEditSchema'
import type { StoreProductDetail } from '../types/store'
import { ActionBar } from './components/ActionBar'
import { BasicInfoCard } from './components/BasicInfoCard'
import { PriceStockCard } from './components/PriceStockCard'
import { PublishSettingsCard } from './components/PublishSettingsCard'

type Props = {
  product: StoreProductDetail
  /** ストアのスラッグ（商品ページ URL の組み立てに使う）。 */
  storeSlug?: string
  /** 保存中フラグ。Container の mutation.isPending を渡す。 */
  isSaving?: boolean
  /** バリデーション通過後に呼ばれる。Container で保存処理を実行する。 */
  onSubmit: (values: ProductEditFormValues) => void
  onCopy?: () => void
  onDelete?: () => void
  onUploadCover?: () => void
}

/**
 * 商品詳細/編集の Presentational + フォーム状態。
 * react-hook-form + zodResolver(productEditSchema) で入力を管理し、
 * アクションバー（保存 / 複製 / 削除）と 3 枚の編集カードを縦に積む。
 * データ取得・mutation は持たず、通過後に props.onSubmit(values) を呼ぶ。
 */
export function ProductEditPageUI({
  product,
  storeSlug = 'hanako',
  isSaving = false,
  onSubmit,
  onCopy,
  onDelete,
  onUploadCover,
}: Props) {
  const form = useForm<ProductEditFormValues>({
    resolver: zodResolver(productEditSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      status: product.status,
      category: product.category,
    },
  })

  const title = useWatch({ control: form.control, name: 'title' })
  const status = useWatch({ control: form.control, name: 'status' })
  const productUrl = `ours.store/${storeSlug}/${product.slug}`

  return (
    <div className="min-h-full bg-surface px-6 py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-full max-w-3xl flex-col gap-6"
        >
          <ActionBar
            title={title || product.title}
            status={status}
            isSaving={isSaving}
            onCopy={onCopy}
            onDelete={onDelete}
          />

          <BasicInfoCard control={form.control} onUploadCover={onUploadCover} />
          <PriceStockCard control={form.control} type={product.type} status={status} />
          <PublishSettingsCard control={form.control} productUrl={productUrl} />
        </form>
      </Form>
    </div>
  )
}
