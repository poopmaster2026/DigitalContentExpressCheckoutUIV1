import { ImageIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'

import { formatYen } from '../../store-dashboard-page/utils'

type Props = {
  /** カバー面の塗りつぶし（タイプ色）。 */
  coverFill: string
  /** 商品名（未入力時はプレースホルダ文言）。 */
  title: string
  /** 価格（円）。 */
  price: number
  /** 商品説明（未入力時はプレースホルダ文言）。 */
  description: string
  /** title 未入力で表示するプレースホルダ。 */
  titlePlaceholder?: string
  /** description 未入力で表示するプレースホルダ。 */
  descriptionPlaceholder?: string
  className?: string
}

/**
 * 商品ページの見た目を再現するライブプレビューカード。
 * タイプ選択・作成フォーム双方で、左の入力をそのまま反映して描画する。
 * カバー（タイプ色面 + lucide/image）/ 商品名 / 価格 / 説明 / 購入する（黒ボタン）。
 */
export function ProductPreviewCard({
  coverFill,
  title,
  price,
  description,
  titlePlaceholder = '商品名がここに表示されます',
  descriptionPlaceholder = '商品の説明文がここに表示されます。購入者に届けたい内容を入力してください。',
  className,
}: Props) {
  return (
    <Card className={cn('gap-0 overflow-hidden p-0', className)}>
      <div className={cn('flex h-72 items-center justify-center', coverFill)}>
        <ImageIcon className="size-10 text-white/70" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h3
          className={cn(
            'text-2xl font-bold',
            !title && 'text-muted-foreground',
          )}
        >
          {title || titlePlaceholder}
        </h3>
        <p className="text-2xl font-bold">{formatYen(price)}</p>
        <p
          className={cn(
            'text-sm leading-relaxed text-muted-foreground',
            !description && 'text-muted-foreground',
          )}
        >
          {description || descriptionPlaceholder}
        </p>
        <Button className="w-full">購入する</Button>
      </div>
    </Card>
  )
}
