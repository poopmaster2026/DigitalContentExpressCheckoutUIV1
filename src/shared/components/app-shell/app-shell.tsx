"use client";

// アプリフレーム（公式サンプル adobe/react-spectrum
// packages/dev/s2-docs/pages/s2/home/ExampleApp.tsx の移植）。Sidebar / Notifications /
// AccountMenu は公式サンプルと同じくサブモジュールに分割している。
import { useState, useSyncExternalStore, type ReactNode } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { SearchField } from "@react-spectrum/s2/SearchField";
import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { ActionButtonGroup } from "@react-spectrum/s2/ActionButtonGroup";
import { Image } from "@react-spectrum/s2/Image";
import { Provider } from "@react-spectrum/s2/Provider";
import { Picker, PickerItem } from "@react-spectrum/s2/Picker";
import HelpCircle from "@react-spectrum/s2/icons/HelpCircle";
import AppsAll from "@react-spectrum/s2/icons/AppsAll";
import SearchIcon from "@react-spectrum/s2/icons/Search";
import { AppSearchContext } from "./search-context";
import { Sidebar } from "./sidebar";
import { Notifications } from "./notifications";
import { AccountMenu } from "./account-menu";

// 公式サンプルと同じコンテナクエリ（ビューポートではなく data-container 基準）
const XS = `@container (min-width: ${480 / 16}rem)`;
const SM = `@container (min-width: ${640 / 16}rem)`;
const MD = `@container (min-width: ${768 / 16}rem)`;

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

const brand = style({ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 });
// S2 Image はスケルトン用に gray の wrapper 背景を持つため、透過ロゴでは明示的に打ち消す
const logoImage = style({
  height: 24,
  width: "auto",
  display: "block",
  flexShrink: 0,
  backgroundColor: "transparent",
});
// ブランドとストア切替の区切り。色は S2 Divider の既定トークン（gray-200）に合わせる。
// marginStart はサイドバー展開時のコンテンツパネル左端に縦のラインを揃えるための値
const brandDivider = style({
  width: 2,
  height: 16,
  borderRadius: "full",
  backgroundColor: "gray-200",
  flexShrink: 0,
  marginStart: 20,
  display: { default: "none", [SM]: "block" },
});
const storeSwitcherWrap = style({
  display: { default: "none", [SM]: "contents" },
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
                  <div className={brandDivider} role="separator" aria-orientation="vertical" />
                  <div className={storeSwitcherWrap}>
                    <Picker isQuiet aria-label="ストアを切り替え" defaultSelectedKey="hanako">
                      <PickerItem id="hanako">花子のストア</PickerItem>
                      <PickerItem id="atelier">アトリエ花</PickerItem>
                    </Picker>
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
