import {
  BookOpen,
  Calendar,
  CreditCard,
  File,
  FileText,
  GraduationCap,
  ImageIcon,
  LayoutGrid,
  Play,
} from "lucide-react";
import type { ReactNode } from "react";

import type { ProductKind, ProductThumb, SaleType } from "./types";

/** 販売形態チップの表示定義。className はカード・テーブル・詳細・プレビューで共用。 */
export const SALE_TYPE_BADGE: Record<
  SaleType,
  { label: string; className: string }
> = {
  digital: {
    label: "デジタル",
    className:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
  },
  course: {
    label: "コース",
    className:
      "bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800",
  },
  booking: {
    label: "予約",
    className:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800",
  },
  subscription: {
    label: "サブスク",
    className:
      "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400 dark:border-pink-800",
  },
};

/** 画像なし商品のプレースホルダー背景色。 */
export const THUMB_HUE: Record<ProductThumb, string> = {
  sage: "bg-green-100 dark:bg-green-900/40",
  sky: "bg-sky-100 dark:bg-sky-900/40",
  sand: "bg-amber-100 dark:bg-amber-900/40",
  rose: "bg-rose-100 dark:bg-rose-900/40",
  lilac: "bg-violet-100 dark:bg-violet-900/40",
  mint: "bg-teal-100 dark:bg-teal-900/40",
};

/** カードプレビュー用アイコン（種別ごと）。 */
export const KIND_ILLUSTRATION: Record<ProductKind, ReactNode> = {
  book: <BookOpen className="h-12 w-12 text-gray-400 dark:text-gray-500" />,
  video: <Play className="h-12 w-12 text-gray-400 dark:text-gray-500" />,
  collection: (
    <LayoutGrid className="h-12 w-12 text-gray-400 dark:text-gray-500" />
  ),
  photo: (
    <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
  ),
  template: <File className="h-12 w-12 text-gray-400 dark:text-gray-500" />,
  guide: (
    <GraduationCap className="h-12 w-12 text-gray-400 dark:text-gray-500" />
  ),
};

/** カバー画像未設定時のプレースホルダー（詳細・プレビュー用）。販売形態で固定。 */
export const COVER_ILLUSTRATION: Record<SaleType, ReactNode> = {
  digital: (
    <FileText className="h-16 w-16 text-gray-400 dark:text-gray-500" />
  ),
  course: (
    <GraduationCap className="h-16 w-16 text-gray-400 dark:text-gray-500" />
  ),
  booking: (
    <Calendar className="h-16 w-16 text-gray-400 dark:text-gray-500" />
  ),
  subscription: (
    <CreditCard className="h-16 w-16 text-gray-400 dark:text-gray-500" />
  ),
};

/** テーブルサムネイル用アイコン（lucide-react）。 */
export const KIND_ICON: Record<
  ProductKind,
  ComponentType<{ className?: string }>
> = {
  book: BookOpen,
  video: Play,
  collection: LayoutGrid,
  photo: ImageIcon,
  template: File,
  guide: GraduationCap,
};

type ComponentType<P> = (props: P) => ReactNode;
