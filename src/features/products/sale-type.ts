import type { SaleType } from "./types";

/**
 * 販売形態チップの表示定義（カード/テーブル共用）。表示は bold（既定）。
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
