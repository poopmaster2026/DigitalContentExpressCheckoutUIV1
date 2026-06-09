import { cn } from '@/lib/utils'
import { Badge } from '@/shared/components/ui/badge'
import type { ProductType } from '@/shared/types/product'

import { PRODUCT_TYPE_LABELS } from '../store-dashboard-page/utils'

const TYPE_FILL: Record<ProductType, string> = {
  digital: 'bg-brand-blue',
}

type Props = {
  type: ProductType
  className?: string
}

export function TypeBadge({ type, className }: Props) {
  return (
    <Badge className={cn('border-transparent text-white', TYPE_FILL[type], className)}>
      {PRODUCT_TYPE_LABELS[type]}
    </Badge>
  )
}
