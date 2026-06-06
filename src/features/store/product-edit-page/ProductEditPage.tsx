'use client'

import { notFound, useRouter } from 'next/navigation'
import { useQueryClient, useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { toast } from 'sonner'

import { updateProduct, deleteProduct, duplicateProduct, uploadCover } from '../api/storeApi'
import { storeKeys } from '../queries/storeKeys'
import type { ProductEditFormValues } from '../schemas/productEditSchema'
import { productDetailQueryOptions } from '../queries/storeQueries'
import { ProductEditPageUI } from './ProductEditPageUI'

type Props = {
  productId: string
}

export function ProductEditPage({ productId }: Props) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: product } = useSuspenseQuery(productDetailQueryOptions(productId))

  if (!product) {
    notFound()
  }

  const updateMutation = useMutation({
    mutationFn: (values: ProductEditFormValues) => updateProduct(productId, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeKeys.all })
      toast.success('商品を保存しました')
    },
    onError: (err) => {
      toast.error(err.message || '保存に失敗しました')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeKeys.all })
      toast.success('商品を削除しました')
      router.push('/store/products')
    },
    onError: (err) => {
      toast.error(err.message || '削除に失敗しました')
    },
  })

  function handleSubmit(values: ProductEditFormValues) {
    updateMutation.mutate(values)
  }

  const duplicateMutation = useMutation({
    mutationFn: () => duplicateProduct(productId),
    onSuccess: (copy) => {
      queryClient.invalidateQueries({ queryKey: storeKeys.all })
      toast.success('商品を複製しました')
      router.push(`/store/products/${copy.id}`)
    },
    onError: (err) => {
      toast.error(err.message || '複製に失敗しました')
    },
  })

  function handleCopy() {
    duplicateMutation.mutate()
  }

  function handleDelete() {
    deleteMutation.mutate()
  }

  function handleUploadCover() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpeg,image/png,image/webp,image/gif'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        const url = await uploadCover(file)
        await updateProduct(productId, { coverUrl: url } as any)
        queryClient.invalidateQueries({ queryKey: storeKeys.productDetail(productId) })
        toast.success('カバー画像を更新しました')
      } catch (err: any) {
        toast.error(err.message || 'アップロードに失敗しました')
      }
    }
    input.click()
  }

  return (
    <ProductEditPageUI
      product={product}
      onSubmit={handleSubmit}
      onCopy={handleCopy}
      onDelete={handleDelete}
      onUploadCover={handleUploadCover}
    />
  )
}
