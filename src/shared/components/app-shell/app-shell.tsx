"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import { style, focusRing } from "@react-spectrum/s2/style" with { type: "macro" };
import { Button as RACButton } from "react-aria-components/Button";
import { SearchField } from "@react-spectrum/s2/SearchField";
import { Button } from "@react-spectrum/s2/Button";
import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { Avatar } from "@react-spectrum/s2/Avatar";
import { Text } from "@react-spectrum/s2/Text";
import Add from "@react-spectrum/s2/icons/Add";
import Home from "@react-spectrum/s2/icons/Home";
import Images from "@react-spectrum/s2/icons/Images";
import ListBulleted from "@react-spectrum/s2/icons/ListBulleted";
import UserGroup from "@react-spectrum/s2/icons/UserGroup";
import ChartBarVert from "@react-spectrum/s2/icons/ChartBarVert";
import HelpCircle from "@react-spectrum/s2/icons/HelpCircle";
import Bell from "@react-spectrum/s2/icons/Bell";
import ChevronDoubleLeft from "@react-spectrum/s2/icons/ChevronDoubleLeft";
import ChevronDoubleRight from "@react-spectrum/s2/icons/ChevronDoubleRight";

// アプリフレーム: フレーム全体 = layer-1、コンテンツ = layer-2 の角丸パネル
const shell = style({
  display: "flex",
  flexDirection: "column",
  height: "screen",
  backgroundColor: "layer-1",
});
const header = style({
  display: "flex",
  alignItems: "center",
  gap: 16,
  height: 64,
  paddingX: 20,
});
const brand = style({
  display: "flex",
  alignItems: "baseline",
  gap: 8,
  whiteSpace: "nowrap",
  flexShrink: 0,
});
const storeName = style({
  font: "body-sm",
  color: "neutral-subdued",
  display: { default: "none", sm: "inline" },
});
const searchWrap = style({ flexGrow: 1, display: "flex", justifyContent: "center" });
const body = style({ display: "flex", flexGrow: 1, minHeight: 0 });
const nav = style({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  paddingX: 12,
  paddingBottom: 12,
  flexShrink: 0,
});
const navCollapsed = style({ alignItems: "center", width: 64 });
const navExpanded = style({ alignItems: "stretch", width: 224 });
const createWrap = style({ display: "flex", marginBottom: 12, marginStart: 4 });
const spacer = style({ flexGrow: 1 });
const main = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minWidth: 0,
  minHeight: 0,
  backgroundColor: "layer-2",
  borderRadius: "xl",
  padding: 24,
  marginEnd: 16,
  marginBottom: 16,
});

// 展開時のナビ行（S2 公式のカスタムコンポーネント手法: RAC Button + style macro）
const navItem = style({
  ...focusRing(),
  display: "flex",
  alignItems: "center",
  gap: 12,
  height: 40,
  paddingX: 8,
  borderRadius: "default",
  borderStyle: "none",
  font: "ui",
  fontWeight: { default: "normal", isActive: "bold" },
  color: "neutral",
  textAlign: "start",
  transition: "default",
  backgroundColor: {
    default: "transparent",
    isHovered: "gray-100",
    isPressed: "gray-200",
  },
});
const navIndicator = style({
  width: 2,
  height: 20,
  borderRadius: "full",
  flexShrink: 0,
  backgroundColor: { default: "transparent", isActive: "neutral" },
});

interface NavEntry {
  key: string;
  label: string;
  icon: ComponentType;
}

const NAV_ENTRIES: NavEntry[] = [
  { key: "home", label: "ホーム", icon: Home },
  { key: "products", label: "商品", icon: Images },
  { key: "orders", label: "注文", icon: ListBulleted },
  { key: "customers", label: "顧客", icon: UserGroup },
  { key: "analytics", label: "分析", icon: ChartBarVert },
];

const ACTIVE_KEY = "products";

function NavItem({ entry, isActive }: { entry: NavEntry; isActive: boolean }) {
  const Icon = entry.icon;
  return (
    <RACButton
      aria-current={isActive ? "page" : undefined}
      className={(renderProps) => navItem({ ...renderProps, isActive })}
    >
      <span className={navIndicator({ isActive })} />
      <Icon />
      <span>{entry.label}</span>
    </RACButton>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [isNavExpanded, setNavExpanded] = useState(true);

  return (
    <div className={shell}>
      <header className={header}>
        <div className={brand}>
          <span className={style({ font: "title", fontWeight: "bold" })}>Ours</span>
          <span className={storeName}>花子のストア</span>
        </div>
        <div className={searchWrap}>
          <SearchField
            aria-label="検索"
            placeholder="検索"
            styles={style({ width: "full", maxWidth: 440 })}
          />
        </div>
        <ActionButton isQuiet aria-label="ヘルプ">
          <HelpCircle />
        </ActionButton>
        <ActionButton isQuiet aria-label="通知">
          <Bell />
        </ActionButton>
        <Avatar alt="花子" size={32} src="https://i.pravatar.cc/64?img=47" />
      </header>

      <div className={body}>
        <nav
          className={`${nav} ${isNavExpanded ? navExpanded : navCollapsed}`}
          aria-label="メインナビゲーション"
        >
          <div className={createWrap}>
            <Button variant="accent" aria-label={isNavExpanded ? undefined : "新規作成"}>
              <Add />
              {isNavExpanded && <Text>新規作成</Text>}
            </Button>
          </div>
          {NAV_ENTRIES.map((entry) =>
            isNavExpanded ? (
              <NavItem key={entry.key} entry={entry} isActive={entry.key === ACTIVE_KEY} />
            ) : (
              <ActionButton
                key={entry.key}
                isQuiet={entry.key !== ACTIVE_KEY}
                aria-label={entry.label}
                aria-current={entry.key === ACTIVE_KEY ? "page" : undefined}
              >
                <entry.icon />
              </ActionButton>
            ),
          )}
          <div className={spacer} />
          <ActionButton
            isQuiet
            aria-label={isNavExpanded ? "ナビゲーションを折りたたむ" : "ナビゲーションを展開する"}
            onPress={() => setNavExpanded((v) => !v)}
            styles={style({ alignSelf: "start" })}
          >
            {isNavExpanded ? <ChevronDoubleLeft /> : <ChevronDoubleRight />}
          </ActionButton>
        </nav>

        <main className={main}>{children}</main>
      </div>
    </div>
  );
}
