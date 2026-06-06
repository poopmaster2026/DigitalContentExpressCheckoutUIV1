import Image from 'next/image'

import { cn } from '@/lib/utils'
import type { ProductType } from '@/shared/types/product'

/** サムネ未設定時のプレースホルダ色（タイプの icon-* トークン）。 */
const TYPE_TINT: Record<ProductType, string> = {
  digital: 'bg-icon-green/15',
  course: 'bg-icon-blue/15',
  subscription: 'bg-icon-purple/15',
  booking: 'bg-icon-amber/15',
  physical: 'bg-icon-teal/15',
}

type Props = {
  type: ProductType
  title: string
  thumbnailUrl?: string
  className?: string
}

/** 商品テーブルの 40px 角サムネイル。画像が無ければタイプ色の面で代替。 */
export function ProductThumb({ type, title, thumbnailUrl, className }: Props) {
  return (
    <div
      className={cn(
        'relative size-10 shrink-0 overflow-hidden rounded-lg',
        TYPE_TINT[type],
        className,
      )}
    >
      {thumbnailUrl ? (
        <Image src={thumbnailUrl} alt={title} fill sizes="40px" className="object-cover" />
      ) : null}
    </div>
  )
}
