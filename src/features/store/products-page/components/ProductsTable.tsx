'use client'

import { MoreHorizontal } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

import { ProductStatusBadge } from '../../components/StatusBadge'
import { ProductThumb } from '../../store-dashboard-page/components/ProductThumb'
import { formatYen } from '../../store-dashboard-page/utils'
import type { StoreProductRow } from '../../types/store'

type Props = {
  products: StoreProductRow[]
  onSelectProduct?: (id: string) => void
  onEditProduct?: (id: string) => void
  onDeleteProduct?: (id: string) => void
}

const GRID = 'grid grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_1fr_40px] items-center gap-4'

/**
 * 商品一覧（全件）のテーブル。列見出し + 商品行（合計行なし・ダッシュボードより高い行）。
 * 行クリックで商品詳細へ、⋮ メニューで編集・削除を呼べる。共通セル部品を再利用する。
 */
export function ProductsTable({
  products,
  onSelectProduct,
  onEditProduct,
  onDeleteProduct,
}: Props) {
  return (
    <div className="flex flex-col">
      <div className={`${GRID} border-b pb-4 text-xs font-medium text-muted-foreground`}>
        <span>商品</span>
        <span className="text-center">価格</span>
        <span className="text-center">販売数</span>
        <span className="text-center">売上</span>
        <span className="text-center">状態</span>
        <span className="sr-only">操作</span>
      </div>

      <ul className="flex flex-col">
        {products.map((product) => (
          <li
            key={product.id}
            onClick={() => onSelectProduct?.(product.id)}
            className={`${GRID} cursor-pointer border-b py-3 transition-colors last:border-b-0 hover:bg-accent/40`}
          >
            <div className="flex min-w-0 items-center gap-3">
              <ProductThumb
                type={product.type}
                title={product.title}
                thumbnailUrl={product.thumbnailUrl}
              />
              <span className="truncate font-medium">{product.title}</span>
            </div>
            <span className="text-center text-sm font-medium tabular-nums">
              {formatYen(product.price)}
            </span>
            <span className="text-center text-sm font-medium tabular-nums">{product.soldCount}</span>
            <span className="text-center text-sm font-medium tabular-nums">
              {product.revenue > 0 ? formatYen(product.revenue) : '—'}
            </span>
            <div className="flex justify-center">
              <ProductStatusBadge status={product.status} />
            </div>
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger
                  aria-label={`${product.title} の操作`}
                  onClick={(event) => event.stopPropagation()}
                  className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <MoreHorizontal className="size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEditProduct?.(product.id)}>
                    編集
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => onDeleteProduct?.(product.id)}
                  >
                    削除
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
