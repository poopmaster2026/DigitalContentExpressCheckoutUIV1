'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Plus, Search } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { Input } from '@/shared/components/ui/input'
import { Pagination } from '../components/Pagination'
import type { StoreProductRow } from '../types/store'
import { ProductsTable } from './components/ProductsTable'
import { PRODUCT_SORT_ITEMS, type ProductSort, searchProducts, sortProducts } from './utils'

const PAGE_SIZE = 8

type Props = {
  products: StoreProductRow[]
  /** ページャに表示する総件数（モックでは products.length を基準に水増しした件数を渡す）。 */
  totalCount?: number
  onCreateProduct?: () => void
  onSelectProduct?: (id: string) => void
  onEditProduct?: (id: string) => void
  onDeleteProduct?: (id: string) => void
}

/**
 * 商品一覧（全件）の Presentational。戻りリンク + 見出し + 新規商品ボタン、
 * 白カード内に タブ / 検索 / 並び替え + 商品テーブル + ページネーション。
 * タブ・検索・並び替え・ページは当画面のローカル UI 状態で扱う。
 */
export function ProductsPageUI({
  products,
  totalCount,
  onCreateProduct,
  onSelectProduct,
  onEditProduct,
  onDeleteProduct,
}: Props) {
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<ProductSort>('newest')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const byStatus = statusFilter === 'all' ? products : products.filter((p) => p.status === statusFilter)
    const bySearch = searchProducts(byStatus, query)
    return sortProducts(bySearch, sort)
  }, [products, statusFilter, query, sort])

  const total = totalCount ?? filtered.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const sortLabel = PRODUCT_SORT_ITEMS.find((item) => item.value === sort)?.label ?? '並び替え'

  function resetToFirstPage<T>(setter: (value: T) => void) {
    return (value: T) => {
      setter(value)
      setPage(1)
    }
  }

  return (
    <div className="min-h-full bg-surface px-6 py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">商品</h1>
          </div>
          <Button onClick={onCreateProduct}>
            <Plus />
            新規商品
          </Button>
        </div>

        <Card className="gap-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-lg font-bold">商品</h2>
            <div className="flex items-center gap-4">
              <div className="relative w-60">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => resetToFirstPage(setQuery)(event.target.value)}
                  placeholder="商品を検索"
                  aria-label="商品を検索"
                  className="h-8 pl-9"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {sortLabel}
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {PRODUCT_SORT_ITEMS.map((item) => (
                    <DropdownMenuItem
                      key={item.value}
                      onClick={() => resetToFirstPage(setSort)(item.value)}
                    >
                      {item.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs font-medium text-foreground hover:bg-accent"
                >
                  {statusFilter === 'all' ? 'すべて' : statusFilter === 'published' ? '公開' : '下書き'}
                  <ChevronDown className="size-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem onClick={() => resetToFirstPage(setStatusFilter)('all')}>
                  すべて
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => resetToFirstPage(setStatusFilter)('published')}>
                  公開
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => resetToFirstPage(setStatusFilter)('draft')}>
                  下書き
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {pageItems.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted-foreground">
              {products.length === 0 ? 'まだ商品がありません' : '該当する商品がありません'}
            </p>
          ) : (
            <ProductsTable
              products={pageItems}
              onSelectProduct={onSelectProduct}
              onEditProduct={onEditProduct}
              onDeleteProduct={onDeleteProduct}
            />
          )}

          {total > 0 ? (
            <Pagination
              totalItems={total}
              pageSize={PAGE_SIZE}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
              className="border-t pt-4"
            />
          ) : null}
        </Card>
      </div>
    </div>
  )
}
