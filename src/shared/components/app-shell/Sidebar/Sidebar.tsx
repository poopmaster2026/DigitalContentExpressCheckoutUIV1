"use client";

import { useSidebarContext } from "../sidebar-context";
import { SidebarUI } from "./SidebarUI";

export function Sidebar() {
  const { isExpanded, toggle } = useSidebarContext();
  return <SidebarUI isExpanded={isExpanded} onToggle={toggle} />;
}
