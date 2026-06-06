'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { Form } from '@/shared/components/ui/form'

import {
  productCreateSchema,
  type ProductCreateFormValues,
} from '../schemas/productCreateSchema'
import { CreateActionBar } from './components/CreateActionBar'
import { CreateBasicInfoCard } from './components/CreateBasicInfoCard'
import { CreatePriceCard } from './components/CreatePriceCard'
import { FileCard } from './components/FileCard'
import { ProductPreviewCard } from './components/ProductPreviewCard'
import { PRODUCT_TYPE_META, type CreatableProductType } from './productTypeMeta'

type Props = {
  /** 作成する商品タイプ（ルートで確定済み）。 */
  type: CreatableProductType
  /** 既定値（Storybook の入力済み variant 等で使う。未指定なら空フォーム）。 */
  defaultValues?: Partial<ProductCreateFormValues>
  /** 保存中フラグ。Container の mutation.isPending を渡す。 */
  isSaving?: boolean
  /** バリデーション通過後に呼ばれる。Container で作成処理を実行する。 */
  onSubmit: (values: ProductCreateFormValues) => void
  onUploadCover?: () => void
  onUploadFile?: () => void
}

/**
 * 新規商品作成の Presentational + フォーム状態。
 * react-hook-form + zodResolver(productCreateSchema) で入力を管理し、
 * 左にフォーム（基本情報 / 商品ファイル / 価格）、右に入力を反映したライブプレビューを並べる。
 * データ取得・mutation は持たず、通過後に props.onSubmit(values) を呼ぶ。
 */
export function ProductCreatePageUI({
  type,
  defaultValues,
  isSaving = false,
  onSubmit,
  onUploadCover,
  onUploadFile,
}: Props) {
  const meta = PRODUCT_TYPE_META[type]
  const form = useForm<ProductCreateFormValues>({
    resolver: zodResolver(productCreateSchema),
    defaultValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      price: defaultValues?.price ?? 0,
      status: defaultValues?.status ?? 'draft',
    },
  })

  const title = useWatch({ control: form.control, name: 'title' })
  const description = useWatch({ control: form.control, name: 'description' })
  const price = useWatch({ control: form.control, name: 'price' })
  const status = useWatch({ control: form.control, name: 'status' })

  const barTitle = title || `新規 ${meta.label}`

  return (
    <div className="min-h-full bg-surface px-6 py-12">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto flex w-full max-w-5xl flex-col gap-6"
        >
          <CreateActionBar title={barTitle} status={status} isSaving={isSaving} />

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            {/* 左: フォーム列 */}
            <div className="flex flex-col gap-6">
              <CreateBasicInfoCard control={form.control} onUploadCover={onUploadCover} />
              <FileCard onUpload={onUploadFile} />
              <CreatePriceCard control={form.control} type={type} />
            </div>

            {/* 右: ライブプレビュー列 */}
            <div className="flex flex-col gap-3 lg:sticky lg:top-12">
              <p className="text-xs font-medium text-muted-foreground">プレビュー</p>
              <ProductPreviewCard
                coverFill={meta.chipFill}
                title={title}
                price={price}
                description={description}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
