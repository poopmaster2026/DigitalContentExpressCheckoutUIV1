"use client";

// S2 公式ドキュメントのサンプルアプリ（adobe/react-spectrum
// packages/dev/s2-docs/pages/s2/home/ExampleApp.tsx + app/Sidebar.tsx）の
// アプリフレーム実装を移植したもの。SideNav は S2 未提供のため、公式サンプルと
// 同じ RAC ToggleButtonGroup + style macro の実装を使う。
import {
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
} from "react";
import { style, size, focusRing } from "@react-spectrum/s2/style" with { type: "macro" };
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  ToggleButton as RACToggleButton,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "react-aria-components";
import { SearchField } from "@react-spectrum/s2/SearchField";
import { Button } from "@react-spectrum/s2/Button";
import { ActionButton, NotificationBadge } from "@react-spectrum/s2/ActionButton";
import { ActionButtonGroup } from "@react-spectrum/s2/ActionButtonGroup";
import { Avatar } from "@react-spectrum/s2/Avatar";
import { Image } from "@react-spectrum/s2/Image";
import { Provider } from "@react-spectrum/s2/Provider";
import { DialogTrigger } from "@react-spectrum/s2/Dialog";
import { Popover } from "@react-spectrum/s2/Popover";
import { MenuTrigger, Menu, MenuSection, MenuItem, SubmenuTrigger } from "@react-spectrum/s2/Menu";
import { Switch } from "@react-spectrum/s2/Switch";
import { Divider } from "@react-spectrum/s2/Divider";
import { Text } from "@react-spectrum/s2/Text";
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
import Settings from "@react-spectrum/s2/icons/Settings";
import Buildings from "@react-spectrum/s2/icons/Buildings";
import ChevronDown from "@react-spectrum/s2/icons/ChevronDown";
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

// ブランド: Figma のロゴ（ours-stan-store デザインファイル 980:2）+ 仕切り + ストア切替
const brand = style({ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 });
// S2 Image はスケルトン用に gray の wrapper 背景を持つため、透過ロゴでは明示的に打ち消す
const logoImage = style({
  height: 24,
  width: "auto",
  display: "block",
  flexShrink: 0,
  backgroundColor: "transparent",
});
const brandDividerWrap = style({
  height: 16,
  display: { default: "none", [SM]: "flex" },
  alignItems: "stretch",
});
const storeSwitcherWrap = style({
  display: { default: "none", [SM]: "contents" },
});
// 操作可能な要素であることが伝わるよう、ストア名は太字（S2 の ui トークンは weight 500）。
// シェブロンはアイコンスロットだとテキストの前に配置されるため、Text 内に含めて右側に置く
const storeSwitcherLabel = style({
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  fontWeight: "bold",
});
// 中央の検索がブランド幅に影響されないよう、左右ゾーンを等幅 flex にする
const toolbarSide = style({
  flexGrow: 1,
  flexBasis: 0,
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  gap: 20,
});
const toolbarSideEnd = style({
  flexGrow: 1,
  flexBasis: 0,
  minWidth: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  gap: 20,
});

const searchWrap = style({
  display: { default: "none", [MD]: "block" },
  width: "full",
  maxWidth: 472,
  minWidth: 272,
  flexShrink: 1,
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

function subscribePrefersDark(callback: () => void) {
  const m = matchMedia("(prefers-color-scheme: dark)");
  m.addEventListener("change", callback);
  return () => m.removeEventListener("change", callback);
}

export function AppShell({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  // 公式サンプルの ColorSchemeProvider 相当: ダークテーマ切替（既定は OS 設定に追従）
  const [colorScheme, setColorScheme] = useState<"light" | "dark" | null>(null);
  const prefersDark = useSyncExternalStore(
    subscribePrefersDark,
    () => matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );
  const isDark = colorScheme == null ? prefersDark : colorScheme === "dark";

  return (
    <AppSearchContext value={{ query, setQuery }}>
    <Provider colorScheme={colorScheme ?? undefined} styles={style({ display: "contents" })}>
    <div data-container className={container}>
      <div className={frame}>
        <div className={toolbar}>
          <div className={toolbarSide}>
            <div className={brand}>
              <Image
                src={isDark ? "/ours-logo-dark.png" : "/ours-logo.png"}
                alt="Ours"
                styles={logoImage}
              />
              <div className={brandDividerWrap}>
                <Divider orientation="vertical" size="S" />
              </div>
              <div className={storeSwitcherWrap}>
                <MenuTrigger>
                  <ActionButton isQuiet aria-label="ストアを切り替え">
                    <Text>
                      <span className={storeSwitcherLabel}>
                        花子のストア
                        <ChevronDown />
                      </span>
                    </Text>
                  </ActionButton>
                  <Menu aria-label="ストア" selectionMode="single" selectedKeys={["hanako"]}>
                    <MenuItem id="hanako">花子のストア</MenuItem>
                    <MenuItem id="atelier">アトリエ花</MenuItem>
                  </Menu>
                </MenuTrigger>
              </div>
            </div>
          </div>
          <div className={searchWrap}>
            <SearchField
              aria-label="商品を検索"
              placeholder="商品を検索"
              value={query}
              onChange={setQuery}
              styles={style({ width: "full" })}
            />
          </div>
          <div className={toolbarSideEnd}>
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
              <Notifications />
              <ActionButton isQuiet aria-label="アプリ">
                <AppsAll />
              </ActionButton>
            </div>
            <AccountMenu
              isDark={isDark}
              onColorSchemeChange={(dark) => setColorScheme(dark ? "dark" : "light")}
            />
          </ActionButtonGroup>
          </div>
        </div>
        <Sidebar />
        <main data-content className={content}>
          {children}
        </main>
      </div>
    </div>
    </Provider>
    </AppSearchContext>
  );
}

// --- 通知（公式サンプル app/Notifications.tsx の移植） ---

const NOTIFICATIONS = [
  {
    author: "田中 さくら",
    avatar: "https://i.pravatar.cc/64?img=5",
    date: "2時間前",
    body: "「やさしい料理の基本」を購入しました。",
  },
  {
    author: "佐藤 はる",
    avatar: "https://i.pravatar.cc/64?img=32",
    date: "6月12日",
    body: "「献立テンプレ30日分」に ★5 のレビューが届きました。",
  },
  {
    author: "鈴木 みなと",
    avatar: "https://i.pravatar.cc/64?img=12",
    date: "6月11日",
    body: "「旬の野菜 動画レッスン」を購入しました。",
  },
];

function Notifications() {
  return (
    <DialogTrigger>
      <ActionButton isQuiet aria-label="3件の通知">
        <Bell />
        <NotificationBadge value={3} />
      </ActionButton>
      <Popover styles={style({ maxWidth: 300 })}>
        <div
          className={style({
            display: "flex",
            flexDirection: "column",
            rowGap: 20,
            overflow: "auto",
            flexGrow: 1,
            minHeight: 0,
          })}
        >
          <h3 className={style({ font: "title-lg", marginY: 0 })}>通知</h3>
          {NOTIFICATIONS.map((n, i) => (
            <div key={i} className={style({ display: "flex", gap: 8 })}>
              <Avatar alt="" src={n.avatar} size={32} />
              <div className={style({ display: "flex", flexDirection: "column", gap: 4 })}>
                <div className={style({ display: "flex", alignItems: "baseline", gap: 8 })}>
                  <span className={style({ font: "ui", fontWeight: "bold" })}>{n.author}</span>
                  <span className={style({ font: "detail" })}>{n.date}</span>
                </div>
                <span className={style({ font: "body-xs" })}>{n.body}</span>
              </div>
            </div>
          ))}
        </div>
      </Popover>
    </DialogTrigger>
  );
}

// --- アカウントメニュー（公式サンプル app/AccountMenu.tsx の移植） ---

function AccountMenu({
  isDark,
  onColorSchemeChange,
}: {
  isDark: boolean;
  onColorSchemeChange: (isDark: boolean) => void;
}) {
  return (
    <MenuTrigger>
      <ActionButton isQuiet aria-label="アカウント">
        <Avatar alt="花子" src="https://i.pravatar.cc/64?img=47" />
      </ActionButton>
      <Popover hideArrow placement="bottom end">
        <div className={style({ paddingTop: 4, display: "flex", flexDirection: "column", gap: 12 })}>
          <div className={style({ display: "flex", gap: 12, alignItems: "center", marginX: 12 })}>
            <Avatar alt="花子" src="https://i.pravatar.cc/64?img=47" size={56} />
            <div>
              <div className={style({ font: "title" })}>花子</div>
              <div className={style({ font: "ui" })}>hanako@ours.jp</div>
              <Switch
                isSelected={isDark}
                onChange={onColorSchemeChange}
                styles={style({ marginTop: 4 })}
              >
                ダークテーマ
              </Switch>
            </div>
          </div>
          <Divider styles={style({ marginX: 12 })} />
          <Menu aria-label="アカウント">
            <MenuSection>
              <SubmenuTrigger>
                <MenuItem>
                  <Buildings />
                  <Text slot="label">ストア</Text>
                  <Text slot="value">花子のストア</Text>
                </MenuItem>
                <Menu selectionMode="single" selectedKeys={["hanako"]}>
                  <MenuItem id="hanako">花子のストア</MenuItem>
                  <MenuItem id="atelier">アトリエ花</MenuItem>
                </Menu>
              </SubmenuTrigger>
              <MenuItem>
                <Settings />
                <Text slot="label">設定</Text>
              </MenuItem>
            </MenuSection>
            <MenuSection>
              <MenuItem>利用規約</MenuItem>
              <MenuItem>ログアウト</MenuItem>
            </MenuSection>
          </Menu>
        </div>
      </Popover>
    </MenuTrigger>
  );
}
