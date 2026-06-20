"use client";

import type { ReactNode } from "react";

import {
  SidebarInset,
  SidebarProvider,
} from "@/shared/components/ui/sidebar";

import { AppHeader } from "./Header/Header";
import { AppSidebar } from "./Sidebar/AppSidebar";

export function AppShellUI({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-sidebar">
      {/* 全幅ダークヘッダー */}
      <AppHeader />
      {/* サイドバー + メインコンテンツ */}
      <SidebarProvider
        defaultOpen={true}
        style={{ flex: 1, minHeight: 0 } as React.CSSProperties}
        className="overflow-hidden"
      >
        <AppSidebar />
        <SidebarInset className="overflow-y-auto rounded-tr-xl bg-background [scrollbar-gutter:stable]">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
