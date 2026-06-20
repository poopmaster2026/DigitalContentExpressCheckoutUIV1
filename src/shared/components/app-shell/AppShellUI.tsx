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
      {/* 全幅ダークヘッダー h-14 = 3.5rem */}
      <AppHeader />

      {/* サイドバー + メインコンテンツ（ヘッダー下） */}
      <SidebarProvider
        defaultOpen={true}
        className="flex-1 overflow-hidden"
        style={{ "--sidebar-top": "3.5rem" } as React.CSSProperties}
      >
        <AppSidebar />
        <SidebarInset className="overflow-y-auto rounded-tl-none rounded-tr-xl bg-background [scrollbar-gutter:stable]">
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
