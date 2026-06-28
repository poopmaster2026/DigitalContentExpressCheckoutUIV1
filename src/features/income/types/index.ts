// TODO: Stripe や BE の実装によってステータスの種類・名称が変わる可能性あり。実 API 接続時に詳細確認すること。
export type IncomeStatus = "completed" | "refunded" | "awaiting_payment" | "processing";

export interface IncomeEntry {
  id: string;
  orderedAt: string; // ISO date string
  customerId: string;
  customerName: string;
  productId: string;
  productName: string;
  amount: number; // 円
  status: IncomeStatus;
}
