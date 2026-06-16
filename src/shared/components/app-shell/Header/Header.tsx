"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Brand } from "./components/Brand";
import { HeaderSearch } from "./components/HeaderSearch";
import { HeaderActions } from "./components/HeaderActions";

const MD = `@container (min-width: ${768 / 16}rem)`;

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
// 検索が隠れる狭幅（< MD）でアクション群を右端へ押すスペーサー（公式 S2 サンプル準拠）。
// 検索ラッパー自身が flexGrow:1 で中央余白を埋めるため、表示時はこのスペーサーは不要。
const spacer = style({
  flexGrow: 1,
  display: { default: "block", [MD]: "none" },
});

/** アプリ上部のツールバー。Brand / 検索 / アクション群を配置する Presentational。 */
export function Header({
  isDark,
  onColorSchemeChange,
}: {
  isDark: boolean;
  onColorSchemeChange: (isDark: boolean) => void;
}) {
  return (
    <div className={toolbar}>
      <Brand isDark={isDark} />
      <HeaderSearch />
      <div className={spacer} />
      <HeaderActions isDark={isDark} onColorSchemeChange={onColorSchemeChange} />
    </div>
  );
}
