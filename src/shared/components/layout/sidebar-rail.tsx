"use client";

import { usePathname } from "next/navigation";
import { Button, Link } from "react-aria-components";
import { Tooltip, TooltipTrigger } from "@/shared/components/ui/tooltip";
import Add from "@react-spectrum/s2/icons/Add";
import Home from "@react-spectrum/s2/icons/Home";
import ViewGrid from "@react-spectrum/s2/icons/ViewGrid";
import ViewList from "@react-spectrum/s2/icons/ViewList";
import UserGroup from "@react-spectrum/s2/icons/UserGroup";
import ChartBarVert from "@react-spectrum/s2/icons/ChartBarVert";
import More from "@react-spectrum/s2/icons/More";
import Settings from "@react-spectrum/s2/icons/Settings";
import "./sidebar-rail.css";

/**
 * カプセルレール（2026-06-11 改定の Sidebar）— Figma 966:337。
 * キャンバス上に「＋作成」accent 円 → 白カプセルの nav（アイコンのみ・
 * アクティブ = 黒角丸タイル + 白アイコン）→ 下端の小カプセル（⋯ / 設定）。
 * 顧客・分析・設定は /store 外モジュールのため Phase 0 はナビのみ（無効）。
 */

interface NavItem {
  key: string;
  label: string;
  href?: string;
  exact?: boolean;
  icon: typeof Home;
}

const NAV_ITEMS: NavItem[] = [
  { key: "home", label: "ホーム", href: "/store", exact: true, icon: Home },
  { key: "products", label: "商品", href: "/store/products", icon: ViewGrid },
  { key: "orders", label: "注文", href: "/store/orders", icon: ViewList },
  { key: "customers", label: "顧客", icon: UserGroup },
  { key: "analytics", label: "分析", icon: ChartBarVert },
];

function RailLink({ item, pathname }: { item: NavItem; pathname: string }) {
  const Icon = item.icon;
  const isActive = item.href
    ? item.exact
      ? pathname === item.href
      : pathname.startsWith(item.href)
    : false;

  return (
    <TooltipTrigger delay={400}>
      <Link
        {...(item.href ? { href: item.href } : {})}
        isDisabled={!item.href}
        aria-label={item.label}
        aria-current={isActive ? "page" : undefined}
        className="sidebar-rail__link"
        data-active={isActive || undefined}
      >
        <Icon />
      </Link>
      <Tooltip placement="right">{item.label}</Tooltip>
    </TooltipTrigger>
  );
}

export function SidebarRail() {
  const pathname = usePathname();

  return (
    <nav className="sidebar-rail" aria-label="ストアナビゲーション">
      <TooltipTrigger delay={400}>
        {/* TODO: クイック作成ダイアログ（Figma 960:337）実装後に結線する */}
        <Button className="sidebar-rail__create" aria-label="作成">
          <Add />
        </Button>
        <Tooltip placement="right">作成</Tooltip>
      </TooltipTrigger>

      <div className="sidebar-rail__capsule">
        {NAV_ITEMS.map((item) => (
          <RailLink key={item.key} item={item} pathname={pathname} />
        ))}
      </div>

      <div className="sidebar-rail__capsule sidebar-rail__capsule--bottom">
        <TooltipTrigger delay={400}>
          <Button className="sidebar-rail__link sidebar-rail__link--compact" aria-label="その他" isDisabled>
            <More />
          </Button>
          <Tooltip placement="right">その他</Tooltip>
        </TooltipTrigger>
        <RailLink item={{ key: "settings", label: "設定", icon: Settings }} pathname={pathname} />
      </div>
    </nav>
  );
}
