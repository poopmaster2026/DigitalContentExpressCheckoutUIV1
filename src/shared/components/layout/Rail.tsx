'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  HelpCircle,
  Settings,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react'

import { cn } from '@/lib/utils'

type RailItem = {
  key: string
  label: string
  Icon: LucideIcon
  /** リンク先。未設定なら将来の画面用プレースホルダ（非リンク）。 */
  href?: string
}

/**
 * ワークスペースの高レベルナビ。Editor と メール（Email）を実装済み、他は将来の画面用プレースホルダ。
 */
const NAV_ITEMS: RailItem[] = [
  { key: 'store', label: 'ストア', Icon: ShoppingBag, href: '/store' },
]

const BOTTOM_ITEMS: RailItem[] = [
  { key: 'help', label: 'ヘルプ', Icon: HelpCircle },
  { key: 'settings', label: '設定', Icon: Settings },
]

const ACTIVE_CLASS = 'flex size-10 items-center justify-center rounded-lg transition-colors'

/**
 * 極細アイコンレール（幅 56px）。全ワークスペース画面で共通のグローバル左ナビ。
 * 現在の pathname からアクティブ項目を判定し、href 付き項目は Link で遷移する。
 * 下部にヘルプ / 設定を固定する。
 */
export function Rail() {
  const pathname = usePathname()

  return (
    <aside className="flex w-14 shrink-0 flex-col items-center gap-1.5 border-r bg-background py-3">
      {NAV_ITEMS.map(({ key, label, Icon, href }) => {
        const active = href ? pathname.startsWith(href) : false
        const className = cn(
          ACTIVE_CLASS,
          active
            ? 'bg-accent text-foreground'
            : 'text-muted-foreground hover:bg-accent/60 hover:text-foreground',
        )

        if (href) {
          return (
            <Link
              key={key}
              href={href}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className={className}
            >
              <Icon className="size-5" aria-hidden="true" />
            </Link>
          )
        }

        return (
          <button key={key} type="button" aria-label={label} className={className}>
            <Icon className="size-5" aria-hidden="true" />
          </button>
        )
      })}

      <div className="flex-1" />

      {BOTTOM_ITEMS.map(({ key, label, Icon }) => (
        <button
          key={key}
          type="button"
          aria-label={label}
          className="flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent/60 hover:text-foreground"
        >
          <Icon className="size-5" aria-hidden="true" />
        </button>
      ))}
    </aside>
  )
}
