import type { SaleType } from "./types";

/**
 * 販売形態チップの表示定義（カード/テーブル共用）。
 * 色味は公式 Gallery 例の yellow「Free」Badge と同じ濃さ（bold）。
 * コースの blue は accent と紛らわしいため indigo で代替。
 * ステータスは塗りチップではなく StatusLight（ドット）で表現するため、
 * チップの色はこの4色（+ 割引専用の yellow）だけで衝突しない。
 */
export const SALE_TYPE_BADGE: Record<
  SaleType,
  { label: string; variant: "green" | "indigo" | "orange" | "purple" }
> = {
  digital: { label: "デジタル", variant: "green" },
  course: { label: "コース", variant: "indigo" },
  booking: { label: "予約", variant: "orange" },
  subscription: { label: "サブスク", variant: "purple" },
};
