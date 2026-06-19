"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type SidebarCtx = { isExpanded: boolean; toggle: () => void };

const SidebarContext = createContext<SidebarCtx>({ isExpanded: true, toggle: () => {} });

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <SidebarContext.Provider value={{ isExpanded, toggle: () => setIsExpanded((v) => !v) }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebarContext = () => useContext(SidebarContext);
