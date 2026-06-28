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
  /** true の場合はクリック不可（未実装ページ）。 */
  disabled?: boolean;
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
      // TODO: ホーム画面を実装したら disabled を外す
      { key: "home", label: "ホーム", icon: Home, disabled: true },
      { key: "products", label: "商品", icon: Images },
      { key: "income", label: "収益", icon: ListOrdered },
      { key: "customers", label: "顧客", icon: Users },
    ],
  },
  {
    label: "ツール",
    entries: [
      // TODO: 分析画面を実装したら disabled を外す
      { key: "analytics", label: "分析", icon: BarChart2, disabled: true },
    ],
  },
];

/** モバイル Sheet など、フラットな一覧を必要とする場所で使う。 */
export const NAV_ENTRIES: NavEntry[] = NAV_SECTIONS.flatMap((s) => s.entries);
