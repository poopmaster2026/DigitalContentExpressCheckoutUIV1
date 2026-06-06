import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '@/lib/utils'

import { buildPageItems, pageRange } from './paginationUtils'

type Props = {
  totalItems: number
  pageSize: number
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  className?: string
}

const CELL = 'inline-flex size-8 items-center justify-center rounded-md text-sm transition-colors'

/**
 * 一覧の下部ページャ。左に「全 N 件中 a–b 件」、右にページャ（‹ 1 2 3 … N ›）。
 * 現在ページは brand-blue で塗る。商品一覧・注文一覧で再利用する。
 */
export function Pagination({
  totalItems,
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
  className,
}: Props) {
  const { from, to } = pageRange(totalItems, pageSize, currentPage)
  const items = buildPageItems(currentPage, totalPages)

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <p className="text-sm text-muted-foreground tabular-nums">
        全 {totalItems.toLocaleString('ja-JP')} 件中 {from}–{to} 件
      </p>

      <nav className="flex items-center gap-1" aria-label="ページネーション">
        <button
          type="button"
          aria-label="前のページ"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          className={cn(
            CELL,
            'text-muted-foreground hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40',
          )}
        >
          <ChevronLeft className="size-4" />
        </button>

        {items.map((item, index) =>
          item === 'ellipsis' ? (
            <span
              key={`ellipsis-${index}`}
              aria-hidden="true"
              className="inline-flex size-8 items-center justify-center text-sm text-muted-foreground"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              aria-label={`${item} ページ目`}
              aria-current={item === currentPage ? 'page' : undefined}
              onClick={() => onPageChange?.(item)}
              className={cn(
                CELL,
                'tabular-nums',
                item === currentPage
                  ? 'bg-brand-blue font-medium text-white'
                  : 'text-foreground hover:bg-accent',
              )}
            >
              {item}
            </button>
          ),
        )}

        <button
          type="button"
          aria-label="次のページ"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          className={cn(
            CELL,
            'text-muted-foreground hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40',
          )}
        >
          <ChevronRight className="size-4" />
        </button>
      </nav>
    </div>
  )
}
