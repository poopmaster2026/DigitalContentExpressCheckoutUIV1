'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { createProduct, uploadCover, uploadFile } from '../api/storeApi'
import { storeKeys } from '../queries/storeKeys'
import type { ProductCreateFormValues } from '../schemas/productCreateSchema'
import { ProductCreatePageUI } from './ProductCreatePageUI'
import type { CreatableProductType } from './productTypeMeta'

type Props = {
  type: CreatableProductType
}

export function ProductCreatePage({ type }: Props) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const coverUrlRef = useRef<string | null>(null)
  const fileUrlRef = useRef<string | null>(null)

  const mutation = useMutation({
    mutationFn: (values: ProductCreateFormValues) =>
      createProduct(type, {
        ...values,
        coverUrl: coverUrlRef.current,
        fileUrl: fileUrlRef.current,
      } as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeKeys.all })
      toast.success('商品を作成しました')
      router.push('/store/products')
    },
    onError: (err) => {
      toast.error(err.message || '商品の作成に失敗しました')
    },
  })

  function handleSubmit(values: ProductCreateFormValues) {
    mutation.mutate(values)
  }

  function handleUploadCover() {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpeg,image/png,image/webp,image/gif'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        coverUrlRef.current = await uploadCover(file)
        toast.success('カバー画像をアップロードしました')
      } catch (err: any) {
        toast.error(err.message || 'アップロードに失敗しました')
      }
    }
    input.click()
  }

  function handleUploadFile() {
    const input = document.createElement('input')
    input.type = 'file'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        fileUrlRef.current = await uploadFile(file)
        toast.success('ファイルをアップロードしました')
      } catch (err: any) {
        toast.error(err.message || 'アップロードに失敗しました')
      }
    }
    input.click()
  }

  return (
    <ProductCreatePageUI
      type={type}
      onSubmit={handleSubmit}
      onUploadCover={handleUploadCover}
      onUploadFile={handleUploadFile}
    />
  )
}
