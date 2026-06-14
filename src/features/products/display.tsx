"use client";

import type { ReactNode } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import FileTextIllustration from "@react-spectrum/s2/illustrations/gradient/generic1/FileText";
import VideoIllustration from "@react-spectrum/s2/illustrations/gradient/generic1/Video";
import ImageStackIllustration from "@react-spectrum/s2/illustrations/gradient/generic1/ImageStack";
import ImageIllustration from "@react-spectrum/s2/illustrations/gradient/generic1/Image";
import DocumentIllustration from "@react-spectrum/s2/illustrations/gradient/generic1/Document";
import EducationIllustration from "@react-spectrum/s2/illustrations/gradient/generic1/Education";
import FileTextIcon from "@react-spectrum/s2/icons/FileText";
import VideoIcon from "@react-spectrum/s2/icons/Video";
import ImagesIcon from "@react-spectrum/s2/icons/Images";
import ImageIcon from "@react-spectrum/s2/icons/Image";
import FileIcon from "@react-spectrum/s2/icons/File";
import EducationIcon from "@react-spectrum/s2/icons/Education";
import type { ProductKind, ProductThumb, SaleType } from "./types";

/**
 * 商品の表示トークンの単一定義（カード / テーブル共用）。
 * 販売形態チップ・サムネイル背景 hue・コンテンツ種別の visual をここに集約し、
 * カード枝・テーブル枝の両方から参照して表現のブレを防ぐ。
 */

/**
 * 販売形態チップの表示定義。表示は bold（既定）。
 * 配色は他サービスの業界連想に合わせた K 案:
 * デジタル=green（Shopify Active / Teachable）、コース=indigo（Kajabi の教育青を
 * accent 衝突回避で indigo に）、予約=orange（Polaris の「期限のある対応」）、
 * サブスク=magenta（Patreon / Gumroad のメンバーシップ・ピンク連想）。
 * blue は accent と紛らわしいため不使用 / yellow は割引専用 / red は negative 専用。
 * ステータスは StatusLight（ドット）なので形でも区別される。
 */
export const SALE_TYPE_BADGE: Record<
  SaleType,
  { label: string; variant: "green" | "indigo" | "orange" | "magenta" }
> = {
  digital: { label: "デジタル", variant: "green" },
  course: { label: "コース", variant: "indigo" },
  booking: { label: "予約", variant: "orange" },
  subscription: { label: "サブスク", variant: "magenta" },
};

/** 画像が無い商品のプレースホルダー背景（同一 hue の 100 スケール）。 */
export const THUMB_HUE: Record<ProductThumb, string> = {
  sage: style({ backgroundColor: "celery-100" }),
  sky: style({ backgroundColor: "blue-100" }),
  sand: style({ backgroundColor: "orange-100" }),
  rose: style({ backgroundColor: "pink-100" }),
  lilac: style({ backgroundColor: "purple-100" }),
  mint: style({ backgroundColor: "seafoam-100" }),
};

/** カードプレビュー用イラスト（gradient illustration）。 */
export const KIND_ILLUSTRATION: Record<ProductKind, ReactNode> = {
  book: <FileTextIllustration />,
  video: <VideoIllustration />,
  collection: <ImageStackIllustration />,
  photo: <ImageIllustration />,
  template: <DocumentIllustration />,
  guide: <EducationIllustration />,
};

/** テーブルサムネイル用アイコン（line icon）。色は呼び出し側が styles で渡す。 */
export const KIND_ICON: Record<ProductKind, typeof FileTextIcon> = {
  book: FileTextIcon,
  video: VideoIcon,
  collection: ImagesIcon,
  photo: ImageIcon,
  template: FileIcon,
  guide: EducationIcon,
};
