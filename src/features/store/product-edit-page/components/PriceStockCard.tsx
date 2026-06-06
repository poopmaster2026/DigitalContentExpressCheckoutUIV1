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
import type { ProductType } from '@/shared/types/product'

import { ProductStatusBadge } from '../../components/StatusBadge'
import { TypeBadge } from '../../components/TypeBadge'
import type { ProductEditFormValues } from '../../schemas/productEditSchema'
import type { ProductStatus } from '../../types/store'
import { FormSectionCard } from './FormSectionCard'

type Props = {
  control: Control<ProductEditFormValues>
  /** 商品タイプ（当画面では表示のみ・編集不可）。 */
  type: ProductType
  /** 販売状況の表示用（フォームの公開範囲に追従）。 */
  status: ProductStatus
}

/**
 * 価格・在庫カード。タイプ（TypeBadge 表示）/ 価格（¥ 付き Input）/ 販売状況（状態バッジ）。
 */
export function PriceStockCard({ control, type, status }: Props) {
  return (
    <FormSectionCard title="価格・在庫">
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

      <div className="flex flex-col gap-2">
        <Label>販売状況</Label>
        <ProductStatusBadge status={status} />
      </div>
    </FormSectionCard>
  )
}
