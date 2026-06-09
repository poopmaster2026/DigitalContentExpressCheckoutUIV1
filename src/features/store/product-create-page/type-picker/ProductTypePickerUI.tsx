import { BackLink } from '../../components/BackLink'
import {
  CREATABLE_PRODUCT_TYPES,
  PRODUCT_TYPE_META,
  type CreatableProductType,
} from '../productTypeMeta'
import { ProductPreviewCard } from '../components/ProductPreviewCard'
import { SelectedTypeDetail } from './components/SelectedTypeDetail'
import { TypeTile } from './components/TypeTile'

type Props = {
  /** 現在選択中のタイプ。 */
  selectedType: CreatableProductType
  /** タイル選択時に呼ばれる。 */
  onSelectType: (type: CreatableProductType) => void
  /** 「作成する」押下時に呼ばれる（Container で作成フォームへ遷移）。 */
  onCreate: () => void
}

/**
 * 新規商品のタイプ選択（Presentational）。
 * 左: 「何を販売しますか？」+ 2×2 タイプタイル + 選択タイプの詳細 + 作成ボタン。
 * 右: 選択タイプを反映したライブプレビュー（商品ページの見た目）。
 */
export function ProductTypePickerUI({ selectedType, onSelectType, onCreate }: Props) {
  const meta = PRODUCT_TYPE_META[selectedType]

  return (
    <div className="min-h-full bg-surface px-6 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <BackLink href="/store/products">商品に戻る</BackLink>
          <h1 className="text-2xl font-bold">新規商品</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* 左: 選択列 */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold">何を販売しますか？</h2>
            <div className="grid grid-cols-2 gap-4">
              {CREATABLE_PRODUCT_TYPES.map((type) => (
                <TypeTile
                  key={type}
                  meta={PRODUCT_TYPE_META[type]}
                  selected={type === selectedType}
                  onSelect={() => onSelectType(type)}
                />
              ))}
            </div>
            <SelectedTypeDetail meta={meta} onCreate={onCreate} />
          </div>

          {/* 右: ライブプレビュー */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-muted-foreground">プレビュー</p>
            <ProductPreviewCard
              coverFill={meta.chipFill}
              title=""
              price={0}
              description=""
            />
          </div>
        </div>
      </div>
    </div>
  )
}
