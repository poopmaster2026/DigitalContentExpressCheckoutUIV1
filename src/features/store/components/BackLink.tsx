import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'

type Props = {
  href: string
  children: React.ReactNode
  className?: string
}

/**
 * 一覧/詳細画面の先頭に置く戻りリンク。lucide/arrow-left（20px）+ secondary テキスト。
 * 商品一覧・注文一覧・詳細など複数画面で再利用する。
 */
export function BackLink({ href, children, className }: Props) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground',
        className,
      )}
    >
      <ArrowLeft className="size-5" aria-hidden="true" />
      {children}
    </Link>
  )
}
