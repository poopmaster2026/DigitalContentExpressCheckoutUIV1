import { Check } from 'lucide-react'

import { cn } from '@/lib/utils'

import type { ProductTypeMeta } from '../../productTypeMeta'

type Props = {
  meta: ProductTypeMeta
  selected: boolean
  onSelect: () => void
}

/**
 * 販売タイプのタイル。IconChip（タイプ色）+ ラベル + 1 行説明。
 * 選択中は brand-blue の 2px リング + 右上の lucide/check（選択フィードバック）。
 */
export function TypeTile({ meta, selected, onSelect }: Props) {
  const Icon = meta.icon
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        'flex flex-1 cursor-pointer flex-col gap-2 rounded-xl border bg-card p-4 text-left transition-all',
        'hover:bg-accent',
        selected ? 'border-2 border-brand-blue' : 'border-border',
      )}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'flex size-7 items-center justify-center rounded-lg',
            meta.chipFill,
          )}
        >
          <Icon className="size-4 text-white" aria-hidden="true" />
        </span>
        {selected ? (
          <Check className="size-5 text-brand-blue" aria-hidden="true" />
        ) : null}
      </div>
      <span className="font-medium">{meta.label}</span>
      <span className="text-xs text-muted-foreground">{meta.tileDescription}</span>
    </button>
  )
}
