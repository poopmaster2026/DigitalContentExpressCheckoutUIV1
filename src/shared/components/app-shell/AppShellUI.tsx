"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { ReactNode } from "react";

import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

// 公式サンプルと同じコンテナクエリ（ビューポートではなく data-container 基準）
const SM = `@container (min-width: ${640 / 16}rem)`;

const container = style({
  containerType: "inline-size",
  height: "screen",
  position: "relative",
  // アプリ外枠で document 自体はスクロールさせない（スクロールは content 領域に集約）。
  // これがないと、内部に overflow:auto を持つ画面で window と content の二重スクロールが起きる。
  overflow: "hidden",
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
  overflow: "hidden",
});

/** アプリフレーム（Presentational）。toolbar(Header) / sidebar(Sidebar) / content を grid で配置。 */
export function AppShellUI({
  isDark,
  onColorSchemeChange,
  children,
}: {
  isDark: boolean;
  onColorSchemeChange: (isDark: boolean) => void;
  children: ReactNode;
}) {
  return (
    <div data-container className={container}>
      <div className={frame}>
        <Header isDark={isDark} onColorSchemeChange={onColorSchemeChange} />
        <Sidebar />
        <main data-content className={content}>
          {children}
        </main>
      </div>
    </div>
  );
}
