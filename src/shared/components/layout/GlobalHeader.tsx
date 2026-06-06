import Image from 'next/image'
import Link from 'next/link'

import { Avatar, AvatarFallback } from '@/shared/components/ui/avatar'

type Props = {
  /** アカウントアバターのイニシャル（暗黙のデフォルト 'HT'）。 */
  initials?: string
}

/**
 * 全ワークスペース画面で共通のグローバルヘッダー（高さ 56px）。
 * 左: ロゴ（logo.png + 「Ours」） / 右: アカウントアバター。
 *
 * 画面固有の操作（保存・公開・デバイス切替など）はここに置かず、各画面のツールバーに寄せる。
 * アバターのイニシャルは画面側のデータ（編集中プロフィール名など）から渡す。
 */
export function GlobalHeader({ initials = 'HT' }: Props) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b bg-background px-5">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Ours"
          width={32}
          height={28}
          priority
          className="shrink-0 object-contain"
        />
        <span className="text-base font-bold tracking-tight">Ours</span>
      </Link>

      <Avatar size="sm">
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </header>
  )
}
