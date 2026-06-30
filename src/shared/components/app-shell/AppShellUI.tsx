"use client";

import type { ReactNode } from "react";

import { AppHeader } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";

export function AppShellUI({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-sidebar">
      {/* 全幅ダークヘッダー — デスクトップ・モバイル両方で表示 */}
      <AppHeader />
      <div className="relative flex flex-1 overflow-hidden bg-sidebar">
        <Sidebar />
        {/* sm:ml-52 = サイドバー幅 208px 分のオフセット */}
        <main className="flex flex-1 flex-col overflow-y-auto bg-background [scrollbar-gutter:stable] sm:ml-52 sm:rounded-tr-xl">
          {children}
        </main>
      </div>
    </div>
  );
}
