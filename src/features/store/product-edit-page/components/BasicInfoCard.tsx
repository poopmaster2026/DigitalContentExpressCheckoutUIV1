import { ImagePlus } from 'lucide-react'
import type { Control } from 'react-hook-form'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Textarea } from '@/shared/components/ui/textarea'

import type { ProductEditFormValues } from '../../schemas/productEditSchema'
import { FormSectionCard } from './FormSectionCard'

type Props = {
  control: Control<ProductEditFormValues>
  /** カバー画像アップロードのプレースホルダ操作（モック）。 */
  onUploadCover?: () => void
}

/**
 * 基本情報カード。商品名（Input）/ 説明（Textarea）/ カバー画像（破線ドロップゾーン）。
 */
export function BasicInfoCard({ control, onUploadCover }: Props) {
  return (
    <FormSectionCard title="基本情報">
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>商品名</FormLabel>
            <FormControl>
              <Input placeholder="商品名を入力" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>説明</FormLabel>
            <FormControl>
              <Textarea
                rows={4}
                placeholder="商品の説明を入力"
                className="min-h-28"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-2">
        <Label>カバー画像</Label>
        <button
          type="button"
          onClick={onUploadCover}
          className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-muted px-6 py-8 text-center transition-colors hover:bg-accent"
        >
          <ImagePlus className="size-5 text-muted-foreground" aria-hidden="true" />
          <span className="text-sm text-muted-foreground">
            クリックまたはドラッグでアップロード
          </span>
        </button>
      </div>
    </FormSectionCard>
  )
}
