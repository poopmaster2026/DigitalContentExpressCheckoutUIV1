"use client";

import { useState, type ReactNode } from "react";

import { AppShellUI } from "./AppShellUI";
import { AppSearchContext } from "./search-context";
import { SidebarProvider } from "./sidebar-context";

export function AppShell({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState<string>("");

  return (
    <AppSearchContext value={{ query, setQuery }}>
      <SidebarProvider>
        <AppShellUI>{children}</AppShellUI>
      </SidebarProvider>
    </AppSearchContext>
  );
}
