"use client";

import { useSidebarToggle } from "./hooks/useSidebarToggle";
import { SidebarUI } from "./SidebarUI";

/** サイドナビの Container。開閉状態を useSidebarToggle に集約し UI へ渡す。 */
export function Sidebar() {
  const { state, toggle } = useSidebarToggle();
  return <SidebarUI state={state} onToggle={toggle} />;
}
