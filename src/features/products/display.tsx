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

import type { ProductKind, ProductStatus, ProductThumb, SaleType } from "./types";

export const STATUS_DISPLAY: Record<
  ProductStatus,
  { label: string; iconSrc: string; className: string }
> = {
  published: {
    label: "公開中",
    iconSrc: "/icons/status-published.svg",
    className: "text-success font-bold",
  },
  draft: {
    label: "下書き",
    iconSrc: "/icons/status-draft.svg",
    className: "text-muted-foreground font-bold",
  },
};

/**
 * 販売形態チップの表示定義。className はカード・テーブル・詳細・プレビューで共用。
 * 販売形態は「状態」ではなく「分類」なので色では叫ばせない。warm なニュートラルで
 * 静かに分け、画面で色が立つのは黒 CTA・公開ステータス・リンクだけに保つ。
 */
export const SALE_TYPE_BADGE: Record<
  SaleType,
  { label: string; className: string }
> = {
  digital: {
    label: "デジタル",
    className: "border-cta/25 bg-cta/10 text-cta",
  },
  course: {
    label: "コース",
    className: "border-success/25 bg-success/10 text-success",
  },
  booking: {
    label: "予約",
    className: "border-warning/25 bg-warning/10 text-warning",
  },
  subscription: {
    label: "サブスク",
    className: "border-link/25 bg-link/10 text-link",
  },
};

/**
 * 画像なし商品のプレースホルダー背景色。
 * クール系のパステルを排し、warm な surface ランプ内で僅かに差をつけるだけにする。
 */
export const THUMB_HUE: Record<ProductThumb, string> = {
  sage: "bg-surface",
  sky: "bg-surface-muted",
  sand: "bg-surface",
  rose: "bg-surface-muted",
  lilac: "bg-surface",
  mint: "bg-surface-muted",
};

/** カードプレビュー用アイコン（種別ごと）。 */
export const KIND_ILLUSTRATION: Record<ProductKind, ReactNode> = {
  book: <BookOpen className="h-10 w-10 text-muted-foreground/70" />,
  video: <Play className="h-10 w-10 text-muted-foreground/70" />,
  collection: <LayoutGrid className="h-10 w-10 text-muted-foreground/70" />,
  photo: <ImageIcon className="h-10 w-10 text-muted-foreground/70" />,
  template: <File className="h-10 w-10 text-muted-foreground/70" />,
  guide: <GraduationCap className="h-10 w-10 text-muted-foreground/70" />,
};

/** カバー画像未設定時のプレースホルダー（詳細・プレビュー用）。販売形態で固定。 */
export const COVER_ILLUSTRATION: Record<SaleType, ReactNode> = {
  digital: <FileText className="h-16 w-16 text-muted-foreground/70" />,
  course: <GraduationCap className="h-16 w-16 text-muted-foreground/70" />,
  booking: <Calendar className="h-16 w-16 text-muted-foreground/70" />,
  subscription: <CreditCard className="h-16 w-16 text-muted-foreground/70" />,
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
