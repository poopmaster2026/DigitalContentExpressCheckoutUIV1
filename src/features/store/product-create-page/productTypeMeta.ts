import {
  Calendar,
  FileDown,
  GraduationCap,
  Repeat,
  type LucideIcon,
} from 'lucide-react'

/** 新規作成フローで選べる商品タイプ（物販はこのフローでは対象外）。 */
export type CreatableProductType = 'digital' | 'course' | 'subscription' | 'booking'

/** 新規作成フローのタイプ一覧（タイル / ルート検証で共有）。 */
export const CREATABLE_PRODUCT_TYPES: CreatableProductType[] = [
  'digital',
  'course',
  'subscription',
  'booking',
]

/** ルートの動的セグメント値が作成可能タイプかどうかを判定する。 */
export function isCreatableProductType(value: string): value is CreatableProductType {
  return (CREATABLE_PRODUCT_TYPES as string[]).includes(value)
}

/** タイプタイル / 詳細パネルの表示メタ情報。 */
export interface ProductTypeMeta {
  /** タイプ識別子。 */
  type: CreatableProductType
  /** タイル / 詳細見出しのラベル。 */
  label: string
  /** タイルの 1 行説明。 */
  tileDescription: string
  /** 詳細パネルの説明文。 */
  detail: string
  /** 詳細パネルの特徴リスト（lucide/check 付き）。 */
  features: string[]
  /** IconChip のアイコン。 */
  icon: LucideIcon
  /** IconChip の塗りつぶし色（globals.css の icon-* トークン）。 */
  chipFill: string
  /** プレビューカバーの淡色 tint（icon-* トークンの 15% 透過）。 */
  coverTint: string
}

/** タイプごとの表示メタ情報。タイプ選択・作成フォーム双方で参照する。 */
export const PRODUCT_TYPE_META: Record<CreatableProductType, ProductTypeMeta> = {
  digital: {
    type: 'digital',
    label: 'デジタルダウンロード',
    tileDescription: 'PDF・動画・音声などを販売',
    detail:
      'PDF・動画・音声・画像などのファイルを販売できます。購入者は決済後すぐにダウンロードして利用できます。',
    features: [
      '動画・音声・画像・PDF に対応',
      '購入後すぐにダウンロード可能',
      'ファイルはいつでも差し替え可能',
    ],
    icon: FileDown,
    chipFill: 'bg-icon-green',
    coverTint: 'bg-icon-green/15',
  },
  course: {
    type: 'course',
    label: 'コース',
    tileDescription: 'レッスンや会員限定コンテンツ',
    detail:
      '複数のレッスンをまとめた学習コースを販売できます。受講者は購入後に各レッスンを順番に進められます。',
    features: [
      '複数レッスンをセクションで整理',
      '受講者ごとの進捗管理',
      '会員限定コンテンツとして配信',
    ],
    icon: GraduationCap,
    chipFill: 'bg-icon-blue',
    coverTint: 'bg-icon-blue/15',
  },
  subscription: {
    type: 'subscription',
    label: 'サブスク',
    tileDescription: '継続課金の会員制',
    detail:
      '月額・年額の継続課金で会員制コンテンツを提供できます。会員は購読中いつでもコンテンツにアクセスできます。',
    features: ['月額・年額の継続課金', '購読中はコンテンツへ自由にアクセス', 'いつでも解約・再開が可能'],
    icon: Repeat,
    chipFill: 'bg-icon-purple',
    coverTint: 'bg-icon-purple/15',
  },
  booking: {
    type: 'booking',
    label: '予約',
    tileDescription: '1対1の面談・予約',
    detail:
      '1対1の面談やセッションの予約枠を販売できます。購入者は決済後に空き枠を選んで予約できます。',
    features: ['空き枠から日時を予約', 'オンライン・対面どちらにも対応', '予約確定をメールで自動通知'],
    icon: Calendar,
    chipFill: 'bg-icon-amber',
    coverTint: 'bg-icon-amber/15',
  },
}
