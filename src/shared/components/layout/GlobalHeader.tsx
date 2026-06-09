import Link from 'next/link'

import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar'

type Props = {
  initials?: string
}

export function GlobalHeader({ initials = 'HT' }: Props) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-card px-5">
      <Link href="/" className="flex items-center gap-2.5">
        <div className="flex gap-0.5">
          <span className="size-2.5 rounded-full bg-brand-blue" />
          <span className="size-2.5 rounded-full bg-brand-red" />
          <span className="size-2.5 rounded-full bg-brand-yellow" />
          <span className="size-2.5 rounded-full bg-brand-green" />
        </div>
        <span className="text-base font-bold tracking-tight text-foreground">Ours</span>
      </Link>

      <Avatar size="sm">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </header>
  )
}
