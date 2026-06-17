import { style } from "@react-spectrum/s2/style" with { type: "macro" };

import { NewProductButton } from "./components/NewProductButton";
import { PanelToggleButton } from "./components/PanelToggleButton";
import { SideNav, SideNavItem } from "./components/SideNav";
import type { NavState } from "./hooks/useSidebarToggle";
import { NAV_ENTRIES } from "./navEntries";

const SM = `@container (min-width: ${640 / 16}rem)`;
const LG = `@container (width > ${1024 / 16}rem)`;

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

/** サイドナビ本体（Presentational）。開閉状態は props で受ける。 */
export function SidebarUI({
  state,
  onToggle,
}: {
  state: NavState;
  onToggle: (containerEl: HTMLElement | null) => void;
}) {
  return (
    <div className={sidebar({ state })}>
      {/* 新規作成ボタン: カテゴリー選択 Dialog を開く */}
      <NewProductButton state={state} />
      {/* 実ルートは /store/products のみのため、選択状態は商品に固定した静的表示 */}
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
      <PanelToggleButton state={state} onToggle={onToggle} />
    </div>
  );
}
