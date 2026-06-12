"use client";

// S2 公式ドキュメントのサンプルアプリ（adobe/react-spectrum
// packages/dev/s2-docs/pages/s2/home/ExampleApp.tsx + app/Sidebar.tsx）の
// アプリフレーム実装を移植したもの。SideNav は S2 未提供のため、公式サンプルと
// 同じ RAC ToggleButtonGroup + style macro の実装を使う。
import { useRef, useState, type ComponentType, type ReactNode } from "react";
import { style, size, focusRing } from "@react-spectrum/s2/style" with { type: "macro" };
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  ToggleButton as RACToggleButton,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "react-aria-components";
import { SearchField } from "@react-spectrum/s2/SearchField";
import { Button } from "@react-spectrum/s2/Button";
import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { ActionButtonGroup } from "@react-spectrum/s2/ActionButtonGroup";
import { Avatar } from "@react-spectrum/s2/Avatar";
import { createIcon } from "@react-spectrum/s2/Icon";
import { pressScale } from "@react-spectrum/s2/pressScale";
import Add from "@react-spectrum/s2/icons/Add";
import Home from "@react-spectrum/s2/icons/Home";
import Images from "@react-spectrum/s2/icons/Images";
import ListBulleted from "@react-spectrum/s2/icons/ListBulleted";
import UserGroup from "@react-spectrum/s2/icons/UserGroup";
import ChartBarVert from "@react-spectrum/s2/icons/ChartBarVert";
import HelpCircle from "@react-spectrum/s2/icons/HelpCircle";
import Bell from "@react-spectrum/s2/icons/Bell";
import AppsAll from "@react-spectrum/s2/icons/AppsAll";
import SearchIcon from "@react-spectrum/s2/icons/Search";
import { AppSearchContext } from "./search-context";

// 公式サンプルと同じコンテナクエリ（ビューポートではなく data-container 基準）
const XS = `@container (min-width: ${480 / 16}rem)`;
const SM = `@container (min-width: ${640 / 16}rem)`;
const MD = `@container (min-width: ${768 / 16}rem)`;
const LG = `@container (width > ${1024 / 16}rem)`;

type NavState = "expanded" | "collapsed" | null;

const container = style({
  containerType: "inline-size",
  height: "screen",
  position: "relative",
});

const frame = style({
  display: "grid",
  gridTemplateAreas: {
    default: ["toolbar", "content"],
    [SM]: ["toolbar toolbar", "sidebar content"],
  },
  gridTemplateRows: ["auto", "1fr"],
  gridTemplateColumns: {
    default: ["minmax(0, 1fr)"],
    [SM]: ["auto", "minmax(0, 1fr)"],
  },
  height: "full",
  overflow: "clip",
  boxSizing: "border-box",
  backgroundColor: "layer-1",
  isolation: "isolate",
});

const toolbar = style({
  gridArea: "toolbar",
  display: "flex",
  padding: 16,
  paddingStart: 20,
  boxSizing: "border-box",
  gap: 20,
  alignItems: "center",
  width: "full",
});

const brandName = style({
  font: "title",
  whiteSpace: "nowrap",
  display: { default: "none", [SM]: "inline" },
});
const storeName = style({
  font: "ui",
  color: "neutral-subdued",
  whiteSpace: "nowrap",
  display: { default: "none", [SM]: "inline" },
});

const searchWrap = style({
  flexGrow: 1,
  display: { default: "none", [MD]: "block" },
});
const searchSpacer = style({
  flexGrow: 1,
  display: { default: "block", [MD]: "none" },
});

const content = style({
  gridArea: "content",
  backgroundColor: "base",
  boxShadow: "elevated",
  borderRadius: { default: "none", [SM]: "xl" },
  borderBottomRadius: "none",
  marginEnd: { default: 0, [SM]: 16 },
  padding: 20,
  paddingBottom: 0,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  boxSizing: "border-box",
  overflow: "auto",
});

// --- Sidebar（公式サンプルの移植） ---

const sidebar = style({
  gridArea: "sidebar",
  display: { default: "none", [SM]: "flex" },
  flexDirection: "column",
  gap: 8,
  paddingX: 16,
  paddingBottom: 16,
  width: {
    default: 32,
    [LG]: 100,
    state: { expanded: 100, collapsed: 32 },
  },
  overflow: "clip",
  transition: "[width]",
  transitionDuration: 300,
});

const sidebarText = style({
  opacity: {
    default: 0,
    [LG]: 1,
    state: { expanded: 1, collapsed: 0 },
  },
  transition: "default",
  transitionDuration: 300,
  whiteSpace: "nowrap",
});

const createButton = style({
  marginBottom: 8,
  width: { default: 32, [LG]: 96, state: { expanded: 96, collapsed: 32 } },
});

const sideNavGroup = style({
  marginStart: -4,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  boxSizing: "border-box",
  width: "full",
});

const sideNavItem = style({
  ...focusRing(),
  backgroundColor: "transparent",
  borderStyle: "none",
  width: "full",
  minHeight: 32,
  boxSizing: "border-box",
  padding: 0,
  display: "flex",
  alignItems: "center",
  gap: 8,
  font: "ui",
  fontWeight: { default: "normal", isSelected: "bold" },
  textDecoration: "none",
  borderRadius: "default",
  transition: "default",
});

const sideNavIndicator = style({
  flexShrink: 0,
  width: 2,
  height: "[1lh]",
  borderRadius: "full",
  transition: "default",
  backgroundColor: {
    default: "transparent",
    isHovered: "gray-400",
    isSelected: "gray-800",
  },
});

function SideNav(props: ToggleButtonGroupProps & { "aria-label": string; children: ReactNode }) {
  return <RACToggleButtonGroup {...props} className={sideNavGroup} />;
}

function SideNavItem(props: ToggleButtonProps & { children: ReactNode }) {
  const ref = useRef(null);
  return (
    <RACToggleButton
      {...props}
      ref={ref}
      // eslint-disable-next-line react-hooks/refs -- pressScale は press イベント時に ref を遅延参照する S2 公式ユーティリティ
      style={pressScale(ref)}
      className={sideNavItem}
    >
      {(renderProps) => (
        <>
          <span className={sideNavIndicator(renderProps)} />
          {props.children}
        </>
      )}
    </RACToggleButton>
  );
}

// 公式サンプルの PanelIcon（createIcon + 開閉状態でアニメーションする rect）
const panelRect = style({
  transition: "[width]",
  transitionDuration: 300,
  width: {
    default: "[1.5px]",
    [LG]: "[5px]",
    state: { expanded: "[5px]", collapsed: "[1.5px]" },
    isHovered: {
      default: "[5px]",
      [LG]: "[1.5px]",
      state: { expanded: "[1.5px]", collapsed: "[5px]" },
    },
  },
});

interface PanelIconState {
  state: NavState;
  isHovered: boolean;
}

const PanelIconBase = createIcon((props) => {
  const { state, isHovered, ...otherProps } = props as PanelIconState &
    Omit<typeof props, keyof PanelIconState>;
  return (
    <svg viewBox="0 0 20 20" fill="var(--iconPrimary)" {...otherProps}>
      <path
        d="M15.75 18H4.25C3.00977 18 2 16.9907 2 15.75V4.25C2 3.00928 3.00977 2 4.25 2H15.75C16.9902 2 18 3.00928 18 4.25V15.75C18 16.9907 16.9902 18 15.75 18ZM4.25 3.5C3.83691 3.5 3.5 3.83643 3.5 4.25V15.75C3.5 16.1636 3.83691 16.5 4.25 16.5H15.75C16.1631 16.5 16.5 16.1636 16.5 15.75V4.25C16.5 3.83643 16.1631 3.5 15.75 3.5H4.25Z"
        fill="var(--iconPrimary)"
      />
      <rect x={5} y={5} rx={0.5} height={10} className={panelRect({ state, isHovered })} />
    </svg>
  );
});
const PanelIcon = PanelIconBase as ComponentType<PanelIconState>;

function PanelToggleButton({
  state,
  setState,
}: {
  state: NavState;
  setState: (s: NavState) => void;
}) {
  const [isHovered, setHovered] = useState(false);
  return (
    <ActionButton
      isQuiet
      aria-label="サイドバーを切り替え"
      styles={style({ alignSelf: "start" })}
      // @ts-expect-error -- ActionButton は onHoverChange を型公開していないが実装は受け付ける（公式サンプルと同じ）
      onHoverChange={setHovered}
      onPress={(e) => {
        if (state == null) {
          const containerEl = (e.target as HTMLElement).closest("[data-container]");
          setState(
            containerEl instanceof HTMLElement && containerEl.offsetWidth > 1024
              ? "collapsed"
              : "expanded",
          );
        } else {
          setState(state === "expanded" ? "collapsed" : "expanded");
        }
        setHovered(false);
      }}
    >
      <PanelIcon state={state} isHovered={isHovered} />
    </ActionButton>
  );
}

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

function Sidebar() {
  const [state, setState] = useState<NavState>(null);
  return (
    <div className={sidebar({ state })}>
      {/* 公式サンプルと同じ: 開閉状態に追従する accent ボタン */}
      <Button
        variant="accent"
        styles={createButton({ state })}
        UNSAFE_style={{
          alignItems: "center",
          justifyContent: "start",
          overflow: "clip",
          transition: "all 300ms",
        }}
      >
        <span className={style({ marginStart: size(6) })}>
          <Add />
        </span>
        <span className={sidebarText({ state })}>新規作成</span>
      </Button>
      <SideNav
        aria-label="メインナビゲーション"
        orientation="vertical"
        selectedKeys={["products"]}
        disallowEmptySelection
      >
        {NAV_ENTRIES.map((entry) => (
          <SideNavItem key={entry.key} id={entry.key}>
            <entry.icon />
            <span className={sidebarText({ state })}>{entry.label}</span>
          </SideNavItem>
        ))}
      </SideNav>
      <div className={style({ flexGrow: 1 })} />
      <PanelToggleButton state={state} setState={setState} />
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <AppSearchContext value={{ query, setQuery }}>
    <div data-container className={container}>
      <div className={frame}>
        <div className={toolbar}>
          <span className={brandName}>Ours</span>
          <span className={storeName}>花子のストア</span>
          <div className={searchWrap}>
            <SearchField
              aria-label="商品を検索"
              placeholder="商品を検索"
              value={query}
              onChange={setQuery}
              styles={style({ maxWidth: 472, minWidth: 272, marginX: "auto" })}
            />
          </div>
          <div className={searchSpacer} />
          <ActionButtonGroup>
            <div className={style({ display: { default: "contents", [MD]: "none" } })}>
              <ActionButton isQuiet aria-label="検索">
                <SearchIcon />
              </ActionButton>
            </div>
            <div className={style({ display: { default: "none", [XS]: "contents" } })}>
              <ActionButton isQuiet aria-label="ヘルプ">
                <HelpCircle />
              </ActionButton>
              <ActionButton isQuiet aria-label="通知">
                <Bell />
              </ActionButton>
              <ActionButton isQuiet aria-label="アプリ">
                <AppsAll />
              </ActionButton>
            </div>
            <ActionButton isQuiet aria-label="アカウント">
              <Avatar alt="花子" src="https://i.pravatar.cc/64?img=47" />
            </ActionButton>
          </ActionButtonGroup>
        </div>
        <Sidebar />
        <main data-content className={content}>
          {children}
        </main>
      </div>
    </div>
    </AppSearchContext>
  );
}
