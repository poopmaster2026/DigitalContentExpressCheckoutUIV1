import { z } from 'zod'

/**
 * 商品詳細/編集フォームのスキーマ。
 * タイプ・スラッグ（商品ページURL）は当画面では編集不可のため含めない。
 */
export const productEditSchema = z.object({
  title: z.string().trim().min(1, '商品名を入力してください'),
  description: z.string().trim(),
  price: z.number().int().min(0, '価格は0以上で指定してください'),
  status: z.enum(['published', 'draft']),
  category: z.string().trim(),
})

export type ProductEditFormValues = z.infer<typeof productEditSchema>
