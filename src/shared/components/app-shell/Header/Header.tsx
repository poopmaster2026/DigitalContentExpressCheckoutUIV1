"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Brand } from "./components/Brand";
import { HeaderSearch } from "./components/HeaderSearch";
import { HeaderActions } from "./components/HeaderActions";

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
      <div className={toolbarSide}>
        <Brand isDark={isDark} />
      </div>
      <HeaderSearch />
      <div className={toolbarSideEnd}>
        <HeaderActions isDark={isDark} onColorSchemeChange={onColorSchemeChange} />
      </div>
    </div>
  );
}
