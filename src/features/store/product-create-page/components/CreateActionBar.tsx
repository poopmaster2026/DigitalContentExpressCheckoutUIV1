import { Loader2 } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'

import { BackLink } from '../../components/BackLink'
import { ProductStatusBadge } from '../../components/StatusBadge'
import type { ProductStatus } from '../../types/store'

type Props = {
  /** 表示中のタイトル（フォームの商品名に追従。未入力時は「新規 〔タイプ名〕」）。 */
  title: string
  /** 表示中の公開状態（フォームの公開範囲に追従）。 */
  status: ProductStatus
  /** 保存処理中フラグ。Save ボタンにスピナーを出す。 */
  isSaving?: boolean
}

/**
 * 新規商品作成のアクションバー。
 * 左: 戻りリンク + タイトル（heading-3 22px bold）+ 公開状態バッジ。
 * 右: 保存（primary 黒・type="submit"）。
 */
export function CreateActionBar({ title, status, isSaving = false }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <BackLink href="/store/products/new">商品に戻る</BackLink>
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="truncate text-2xl font-bold">{title}</h1>
          <ProductStatusBadge status={status} className="shrink-0" />
        </div>
        <Button type="submit" size="sm" disabled={isSaving}>
          {isSaving && <Loader2 className="animate-spin" />}
          保存
        </Button>
      </div>
    </div>
  )
}
