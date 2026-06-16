"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useState } from "react";
import { Brand } from "./components/Brand";
import { HeaderSearch } from "./components/HeaderSearch";
import { HeaderActions } from "./components/HeaderActions";
import { HeaderSearchExpanded } from "./components/HeaderSearchExpanded";

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
// 検索が隠れる狭幅（< MD）でアクション群を右端へ押すスペーサー。
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className={toolbar}>
      {isSearchOpen ? (
        // モバイル検索展開時: Brand・スペーサー・通常アクションを隠してフルワイド検索バーを表示
        <HeaderSearchExpanded
          isDark={isDark}
          onColorSchemeChange={onColorSchemeChange}
          onClose={() => setIsSearchOpen(false)}
        />
      ) : (
        <>
          <Brand isDark={isDark} />
          <HeaderSearch />
          <div className={spacer} />
          <HeaderActions
            isDark={isDark}
            onColorSchemeChange={onColorSchemeChange}
            onSearchOpen={() => setIsSearchOpen(true)}
          />
        </>
      )}
    </div>
  );
}
