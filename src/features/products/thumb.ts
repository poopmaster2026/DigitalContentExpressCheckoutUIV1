import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { ProductThumb } from "./types";

/** 画像が無い商品のプレースホルダー背景（同一 hue の 100 スケール）。カード/テーブル共用。 */
export const THUMB_HUE: Record<ProductThumb, string> = {
  sage: style({ backgroundColor: "celery-100" }),
  sky: style({ backgroundColor: "blue-100" }),
  sand: style({ backgroundColor: "orange-100" }),
  rose: style({ backgroundColor: "pink-100" }),
  lilac: style({ backgroundColor: "purple-100" }),
  mint: style({ backgroundColor: "seafoam-100" }),
};
