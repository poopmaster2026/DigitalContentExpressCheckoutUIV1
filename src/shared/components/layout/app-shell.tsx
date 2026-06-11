"use client";

import type { ReactNode } from "react";
import { AppHeader } from "./app-header";
import { SidebarRail } from "./sidebar-rail";
import "./app-shell.css";

/**
 * AppShell — 黒 chrome ヘッダー + カプセルレール（白フローティング）+ キャンバス。
 * Figma 基準: 966:337（サイドバー比較案 — 白フローティングレール）。
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <AppHeader />
      <div className="app-shell__body">
        <SidebarRail />
        <main className="app-shell__content">{children}</main>
      </div>
    </div>
  );
}
