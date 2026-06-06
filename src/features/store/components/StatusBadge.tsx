import { cn } from '@/lib/utils'
import { Badge } from '@/shared/components/ui/badge'

import type { OrderStatus, ProductStatus } from '../types/store'

/** 商品状態の表示定義（● ＋ テキスト形式）。 */
const PRODUCT_STATUS: Record<ProductStatus, { label: string; dot: string; text: string }> = {
  published: { label: '公開中', dot: 'bg-success', text: 'text-success' },
  draft: { label: '下書き', dot: 'bg-muted-foreground', text: 'text-muted-foreground' },
}

type ProductStatusProps = {
  status: ProductStatus
  className?: string
}

/**
 * 商品の公開状態（● ＋ テキスト）。公開中=success / 下書き=muted。
 */
export function ProductStatusBadge({ status, className }: ProductStatusProps) {
  const { label, dot, text } = PRODUCT_STATUS[status]
  return (
    <span className={cn('inline-flex items-center gap-2 text-sm', text, className)}>
      <span className={cn('size-1.5 shrink-0 rounded-full', dot)} aria-hidden="true" />
      {label}
    </span>
  )
}

/** 注文状態のバッジ定義（後続の注文一覧画面で使う）。 */
const ORDER_STATUS: Record<
  OrderStatus,
  { label: string; variant: 'success' | 'destructive' | 'secondary'; outline?: boolean }
> = {
  completed: { label: '完了', variant: 'success' },
  refunded: { label: '返金', variant: 'destructive', outline: true },
  processing: { label: '処理中', variant: 'secondary' },
}

type OrderStatusProps = {
  status: OrderStatus
  className?: string
}

/**
 * 注文の状態バッジ。完了=success solid / 返金=destructive outline / 処理中=muted。
 * 後続の注文一覧・詳細画面で再利用する。
 */
export function OrderStatusBadge({ status, className }: OrderStatusProps) {
  const { label, variant, outline } = ORDER_STATUS[status]
  if (outline) {
    return (
      <Badge variant="outline" className={cn('border-destructive text-destructive', className)}>
        {label}
      </Badge>
    )
  }
  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  )
}
