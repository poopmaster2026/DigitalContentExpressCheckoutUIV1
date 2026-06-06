'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

import { ToggleGroup, ToggleGroupItem } from '@/shared/components/ui/toggle-group'

import { FormSectionCard } from '../../product-edit-page/components/FormSectionCard'

/** 商品ファイルのカテゴリ。デジタルDL タイプの商品で扱う。 */
type FileKind = 'video' | 'audio' | 'image' | 'other'

const FILE_KINDS: { value: FileKind; label: string }[] = [
  { value: 'video', label: '動画' },
  { value: 'audio', label: '音声' },
  { value: 'image', label: '画像' },
  { value: 'other', label: 'その他' },
]

type Props = {
  /** アップロードゾーン押下のプレースホルダ操作（モック）。 */
  onUpload?: () => void
}

/**
 * 商品ファイルカード（デジタルDL タイプ用）。
 * 動画/音声/画像/その他 のカテゴリピル + 破線アップロードゾーン（lucide/upload）。
 * アクティブカテゴリは brand-blue で示す（選択フィードバック）。
 */
export function FileCard({ onUpload }: Props) {
  const [kind, setKind] = useState<FileKind>('video')

  return (
    <FormSectionCard title="商品ファイル">
      <ToggleGroup
        type="single"
        value={kind}
        onValueChange={(value) => {
          if (value) setKind(value as FileKind)
        }}
        className="w-fit gap-1 rounded-full bg-muted p-1"
      >
        {FILE_KINDS.map((item) => (
          <ToggleGroupItem
            key={item.value}
            value={item.value}
            aria-label={item.label}
            className="h-7 rounded-full px-4 text-sm text-muted-foreground data-[state=on]:bg-brand-blue data-[state=on]:text-white"
          >
            {item.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <button
        type="button"
        onClick={onUpload}
        className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted px-6 py-10 text-center transition-colors hover:bg-accent"
      >
        <Upload className="size-6 text-muted-foreground" aria-hidden="true" />
        <span className="text-sm text-muted-foreground">
          クリックまたはドラッグでアップロード
        </span>
      </button>
    </FormSectionCard>
  )
}
