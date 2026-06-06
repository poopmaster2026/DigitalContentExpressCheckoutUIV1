import { Check } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'

import type { ProductTypeMeta } from '../../productTypeMeta'

type Props = {
  meta: ProductTypeMeta
  onCreate: () => void
}

/**
 * 選択中タイプの詳細パネル。見出し + 説明 + 特徴リスト（lucide/check）+
 * 「作成する」（primary 黒・全幅）。確定ボタンの色（黒）は選択フィードバック（青）と分ける。
 */
export function SelectedTypeDetail({ meta, onCreate }: Props) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      <h2 className="text-2xl font-bold">{meta.label}</h2>
      <p className="text-sm leading-relaxed text-muted-foreground">{meta.detail}</p>
      <ul className="flex flex-col gap-2.5">
        {meta.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm">
            <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <Button type="button" size="lg" className="w-full" onClick={onCreate}>
        作成する
      </Button>
    </div>
  )
}
