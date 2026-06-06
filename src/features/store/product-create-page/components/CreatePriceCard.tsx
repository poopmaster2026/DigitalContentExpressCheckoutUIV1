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
import type { ProductType } from '@/shared/types/product'

import { TypeBadge } from '../../components/TypeBadge'
import { FormSectionCard } from '../../product-edit-page/components/FormSectionCard'
import type { ProductCreateFormValues } from '../../schemas/productCreateSchema'
import type { ProductStatus } from '../../types/store'

const SCOPE_ITEMS: { value: ProductStatus; label: string }[] = [
  { value: 'published', label: '公開' },
  { value: 'draft', label: '下書き' },
]

type Props = {
  control: Control<ProductCreateFormValues>
  /** 商品タイプ（ルートで確定済み・表示のみ）。 */
  type: ProductType
}

/**
 * 作成フォームの価格カード。タイプ（TypeBadge 表示）/ 価格（¥ 付き Input）/
 * 公開範囲（公開・下書きのピル型セグメント。新規は下書きが既定）。
 */
export function CreatePriceCard({ control, type }: Props) {
  return (
    <FormSectionCard title="価格">
      <div className="flex flex-col gap-2">
        <Label>タイプ</Label>
        <TypeBadge type={type} />
      </div>

      <FormField
        control={control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>価格</FormLabel>
            <FormControl>
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-muted-foreground">
                  ¥
                </span>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  className="pl-7"
                  value={field.value}
                  onChange={(event) => field.onChange(event.target.valueAsNumber || 0)}
                  onBlur={field.onBlur}
                  name={field.name}
                  ref={field.ref}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
    </FormSectionCard>
  )
}
