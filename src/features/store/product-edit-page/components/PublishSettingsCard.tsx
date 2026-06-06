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
import { ToggleGroup, ToggleGroupItem } from '@/shared/components/ui/toggle-group'

import type { ProductEditFormValues } from '../../schemas/productEditSchema'
import type { ProductStatus } from '../../types/store'
import { FormSectionCard } from './FormSectionCard'

const SCOPE_ITEMS: { value: ProductStatus; label: string }[] = [
  { value: 'published', label: '公開' },
  { value: 'draft', label: '下書き' },
]

type Props = {
  control: Control<ProductEditFormValues>
  /** 商品ページ URL（表示のみ・brand-blue リンク）。 */
  productUrl: string
}

/**
 * 公開設定カード。公開範囲（公開/下書きのピル型セグメント）/ カテゴリ（Input）/
 * 商品ページURL（brand-blue のリンク表示）。
 */
export function PublishSettingsCard({ control, productUrl }: Props) {
  return (
    <FormSectionCard title="公開設定">
      <FormField
        control={control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>公開範囲</FormLabel>
            <FormControl>
              <ToggleGroup
                type="single"
                value={field.value}
                onValueChange={(value) => {
                  if (value) field.onChange(value)
                }}
                className="w-fit gap-0.5 rounded-full border border-border p-1"
              >
                {SCOPE_ITEMS.map((item) => (
                  <ToggleGroupItem
                    key={item.value}
                    value={item.value}
                    aria-label={item.label}
                    className="h-7 rounded-full px-3.5 text-sm text-muted-foreground data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                  >
                    {item.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>カテゴリ</FormLabel>
            <FormControl>
              <Input placeholder="任意" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-2">
        <Label>商品ページURL</Label>
        <a
          href={`https://${productUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit text-sm text-brand-blue transition-colors hover:text-brand-blue-hover hover:underline"
        >
          {productUrl}
        </a>
      </div>
    </FormSectionCard>
  )
}
