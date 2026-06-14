import type { Product } from "./types";

const yen = new Intl.NumberFormat("ja-JP");

/** 価格表示（null = 無料）。 */
export const formatPrice = (price: number | null) =>
  price === null ? "無料" : `¥${yen.format(price)}`;

/** 売上表示（無料商品は「—」）。 */
export const formatRevenue = (p: Product) =>
  p.price === null ? "—" : `¥${yen.format(p.revenue)}`;
