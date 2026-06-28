export interface Customer {
  id: string;
  name: string;
  email: string;
  since: string; // ISO date string
  purchases: number;
  spent: number; // 円
  phone?: string;
  hasActiveSubscription: boolean;
  tags: string[];
}

// TODO: Stripe や BE の実装によってステータスの種類・名称が変わる可能性あり。実 API 接続時に詳細確認すること。
export type OrderStatus = "completed" | "refunded" | "awaiting_payment" | "processing";

export interface Order {
  id: string;
  customerId: string;
  productId: string;
  productName: string;
  amount: number; // 円
  status: OrderStatus;
  orderedAt: string; // ISO date string
}

export interface Subscription {
  id: string;
  customerId: string;
  planName: string;
  amount: number; // 円/月
  nextBillingDate: string; // ISO date string
  status: "active" | "canceled";
}
