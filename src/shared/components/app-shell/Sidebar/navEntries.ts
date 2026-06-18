import {
  BarChart2,
  Home,
  Images,
  ListOrdered,
  Users,
} from "lucide-react";
import type { ComponentType } from "react";

export interface NavEntry {
  key: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
}

export const NAV_ENTRIES: NavEntry[] = [
  { key: "home", label: "ホーム", icon: Home },
  { key: "products", label: "商品", icon: Images },
  { key: "orders", label: "注文", icon: ListOrdered },
  { key: "customers", label: "顧客", icon: Users },
  { key: "analytics", label: "分析", icon: BarChart2 },
];
