"use client";

import type { ReactNode } from "react";
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
import type { ProductKind } from "./types";

/** コンテンツ種別ごとのプレビュー表現（カード/テーブル共用の単一定義）。 */

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
