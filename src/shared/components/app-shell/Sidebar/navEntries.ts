import ChartBarVert from "@react-spectrum/s2/icons/ChartBarVert";
import Home from "@react-spectrum/s2/icons/Home";
import Images from "@react-spectrum/s2/icons/Images";
import ListBulleted from "@react-spectrum/s2/icons/ListBulleted";
import UserGroup from "@react-spectrum/s2/icons/UserGroup";
import type { ComponentType } from "react";

export interface NavEntry {
  key: string;
  label: string;
  icon: ComponentType;
}

/** サイドナビの項目（順序込み）。 */
export const NAV_ENTRIES: NavEntry[] = [
  { key: "home", label: "ホーム", icon: Home },
  { key: "products", label: "商品", icon: Images },
  { key: "orders", label: "注文", icon: ListBulleted },
  { key: "customers", label: "顧客", icon: UserGroup },
  { key: "analytics", label: "分析", icon: ChartBarVert },
];
