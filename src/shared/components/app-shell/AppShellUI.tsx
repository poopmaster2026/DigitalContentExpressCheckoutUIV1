"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

import { Header } from "./Header/Header";
import { Sidebar } from "./Sidebar/Sidebar";
import { useSidebarContext } from "./sidebar-context";

export function AppShellUI({ children }: { children: ReactNode }) {
  const { isExpanded } = useSidebarContext();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-sidebar">
      <Header />
      {/*
        サイドバーを absolute 配置にすることでフレックスフローから切り離し、
        main の width を固定させる。main の margin-left だけが変化するため
        コンテンツ幅のリフロー（ガタつき）が発生しない。
      */}
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar />
        <main
          className={cn(
            "flex flex-1 flex-col overflow-y-auto bg-background [scrollbar-gutter:stable]",
            "sm:rounded-tl-xl sm:shadow-lg",
            "sm:transition-[margin-left] sm:duration-200 sm:ease-in-out",
            isExpanded ? "sm:ml-44" : "sm:ml-14"
          )}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
