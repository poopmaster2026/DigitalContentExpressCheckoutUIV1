import { cn } from '@/lib/utils'
import { Badge } from '@/shared/components/ui/badge'
import type { ProductType } from '@/shared/types/product'

import { PRODUCT_TYPE_LABELS } from '../store-dashboard-page/utils'

/** タイプごとのソリッド塗りつぶし色（globals.css の icon-* トークン）。 */
const TYPE_FILL: Record<ProductType, string> = {
  digital: 'bg-icon-green',
  course: 'bg-icon-blue',
  subscription: 'bg-icon-purple',
  booking: 'bg-icon-amber',
  physical: 'bg-icon-teal',
}

type Props = {
  type: ProductType
  className?: string
}

/**
 * 商品タイプを示すソリッド塗りつぶしバッジ（白文字 pill）。
 * デジタルDL=green / コース=blue / サブスク=purple / 予約=amber。
 * 商品一覧・詳細など後続画面でも再利用する。
 */
export function TypeBadge({ type, className }: Props) {
  return (
    <Badge className={cn('border-transparent text-white', TYPE_FILL[type], className)}>
      {PRODUCT_TYPE_LABELS[type]}
    </Badge>
  )
}
