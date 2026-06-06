import { z } from 'zod'

/**
 * 新規商品作成フォームのスキーマ。
 * タイプはルートのセグメントで確定するためフォーム入力には含めない。
 */
export const productCreateSchema = z.object({
  title: z.string().trim().min(1, '商品名を入力してください'),
  description: z.string().trim(),
  price: z.number().int().min(0, '価格は0以上で指定してください'),
  status: z.enum(['published', 'draft']),
})

export type ProductCreateFormValues = z.infer<typeof productCreateSchema>
