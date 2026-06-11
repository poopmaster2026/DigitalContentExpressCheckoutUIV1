import type { thumbTint } from "@/styles/brand-tokens";

export type ProductStatus = "published" | "draft";
export type PricingModel = "paid" | "free";

/** Phase 0 はステータスフィルタのみ（STORE-SCREENS.md §2-2） */
export type ProductStatusFilter = "all" | ProductStatus;

export interface Product {
  id: string;
  title: string;
  pricingModel: PricingModel;
  /** JPY。free のときは 0 */
  price: number;
  sales: number;
  status: ProductStatus;
  /** カバー画像未設定時の pastel サムネ（brand-tokens.ts の thumbTint キー） */
  thumbTint: keyof typeof thumbTint;
}
