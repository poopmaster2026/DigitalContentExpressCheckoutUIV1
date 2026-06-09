import { FileDown, type LucideIcon } from 'lucide-react'

export type CreatableProductType = 'digital'

export const CREATABLE_PRODUCT_TYPES: CreatableProductType[] = ['digital']

export function isCreatableProductType(value: string): value is CreatableProductType {
  return (CREATABLE_PRODUCT_TYPES as string[]).includes(value)
}

export interface ProductTypeMeta {
  type: CreatableProductType
  label: string
  tileDescription: string
  detail: string
  features: string[]
  icon: LucideIcon
  chipFill: string
  coverTint: string
}

export const PRODUCT_TYPE_META: Record<CreatableProductType, ProductTypeMeta> = {
  digital: {
    type: 'digital',
    label: 'デジタルダウンロード',
    tileDescription: 'PDF・動画・音声などを販売',
    detail:
      'PDF・動画・音声・画像などのファイルを販売できます。購入者は決済後すぐにダウンロードして利用できます。',
    features: [
      '動画・音声・画像・PDF に対応',
      '購入後すぐにダウンロード可能',
      'ファイルはいつでも差し替え可能',
    ],
    icon: FileDown,
    chipFill: 'bg-brand-blue',
    coverTint: 'bg-brand-blue/15',
  },
}
