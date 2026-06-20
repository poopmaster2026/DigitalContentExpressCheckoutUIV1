"use client";

import { useState, type ReactNode } from "react";

import { AppShellUI } from "./AppShellUI";
import { AppSearchContext } from "./search-context";

export function AppShell({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState<string>("");

  return (
    <AppSearchContext value={{ query, setQuery }}>
      <AppShellUI>{children}</AppShellUI>
    </AppSearchContext>
  );
}
