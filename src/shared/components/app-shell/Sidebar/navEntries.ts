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

export interface NavSection {
  /** 展開時のみ表示する小見出し。null の場合は見出しなし（最初のグループ）。 */
  label: string | null;
  entries: NavEntry[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: null,
    entries: [
      { key: "home", label: "ホーム", icon: Home },
      { key: "products", label: "商品", icon: Images },
      { key: "orders", label: "注文", icon: ListOrdered },
      { key: "customers", label: "顧客", icon: Users },
    ],
  },
  {
    label: "ツール",
    entries: [{ key: "analytics", label: "分析", icon: BarChart2 }],
  },
];

/** モバイル Sheet など、フラットな一覧を必要とする場所で使う。 */
export const NAV_ENTRIES: NavEntry[] = NAV_SECTIONS.flatMap((s) => s.entries);
