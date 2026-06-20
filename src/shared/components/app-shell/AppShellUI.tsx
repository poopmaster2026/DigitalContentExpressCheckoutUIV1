"use client";

import type { ReactNode } from "react";

import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";

import { AppHeader } from "./Header/Header";
import { AppSidebar } from "./Sidebar/AppSidebar";

export function AppShellUI({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          "--sidebar-width": "13rem",
          "--sidebar-width-icon": "3.5rem",
        } as React.CSSProperties
      }
      className="flex h-screen min-h-0 flex-col overflow-hidden bg-sidebar"
    >
      {/* 全幅ダークヘッダー — SidebarTrigger が useSidebar() を使うためここに配置 */}
      <AppHeader />

      <div className="flex min-h-0 flex-1 overflow-hidden bg-sidebar">
        <AppSidebar />
        <SidebarInset className="overflow-y-auto rounded-tl-xl rounded-tr-xl [scrollbar-gutter:stable]">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
