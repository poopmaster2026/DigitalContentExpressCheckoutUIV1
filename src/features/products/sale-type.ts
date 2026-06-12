import type { SaleType } from "./types";

/**
 * 販売形態チップの表示定義（カード/テーブル共用）。表示は bold（既定）。
 * 配色は「テーマ調和」案: 最頻出のデジタルを accent と同系の indigo にして
 * アプリのテーマ（accent 青 + ニュートラル）に溶け込ませる。
 * 緑系は不使用 / blue は accent と紛らわしいため不使用 / yellow は割引専用 /
 * red は negative 専用。ステータスは StatusLight（ドット）なので形でも区別される。
 */
export const SALE_TYPE_BADGE: Record<
  SaleType,
  { label: string; variant: "indigo" | "cyan" | "magenta" | "purple" }
> = {
  digital: { label: "デジタル", variant: "indigo" },
  course: { label: "コース", variant: "cyan" },
  booking: { label: "予約", variant: "magenta" },
  subscription: { label: "サブスク", variant: "purple" },
};
