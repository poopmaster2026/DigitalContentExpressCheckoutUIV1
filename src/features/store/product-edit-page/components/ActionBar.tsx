import { Copy, Loader2, Trash2 } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'

import { BackLink } from '../../components/BackLink'
import { ProductStatusBadge } from '../../components/StatusBadge'
import type { ProductStatus } from '../../types/store'

type Props = {
  /** 表示中のタイトル（フォームの編集に追従してライブ更新）。 */
  title: string
  /** 表示中の公開状態（フォームの編集に追従）。 */
  status: ProductStatus
  /** 保存処理中フラグ。Save ボタンにスピナーを出す。 */
  isSaving?: boolean
  onCopy?: () => void
  onDelete?: () => void
}

/**
 * 商品詳細/編集画面のアクションバー（グレー上）。
 * 左: 戻りリンク + 商品名（heading-3 22px bold）+ 公開状態バッジ。
 * 右: 複製 / 削除（ghost icon）+ 保存（primary 黒・type="submit"）。
 */
export function ActionBar({ title, status, isSaving = false, onCopy, onDelete }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <BackLink href="/store/products">商品に戻る</BackLink>
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="truncate text-2xl font-bold">{title}</h1>
          <ProductStatusBadge status={status} className="shrink-0" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onCopy}
            aria-label="商品を複製"
          >
            <Copy />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onDelete}
            aria-label="商品を削除"
          >
            <Trash2 />
          </Button>
          <Button type="submit" size="sm" disabled={isSaving}>
            {isSaving && <Loader2 className="animate-spin" />}
            保存
          </Button>
        </div>
      </div>
    </div>
  )
}
