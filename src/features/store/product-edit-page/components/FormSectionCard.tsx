import { cn } from '@/lib/utils'
import { Card } from '@/shared/components/ui/card'

type Props = {
  /** カード見出し（基本情報 / 価格・在庫 / 公開設定）。 */
  title: string
  children: React.ReactNode
  className?: string
}

/**
 * 編集フォームの各セクションを包む白カード。
 * 見出し（18px bold）＋ フィールド群（gap-4）を縦に積む。Figma の各 *Card に対応。
 */
export function FormSectionCard({ title, children, className }: Props) {
  return (
    <Card className={cn('gap-4 p-6', className)}>
      <h2 className="text-lg font-bold">{title}</h2>
      {children}
    </Card>
  )
}
