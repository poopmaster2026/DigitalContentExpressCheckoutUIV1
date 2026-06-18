"use client";

import { cn } from "@/lib/utils";

import { NAV_ENTRIES } from "./navEntries";
import { PanelToggleButton } from "./components/PanelToggleButton";
import { SideNav } from "./components/SideNav";

type SidebarUIProps = {
  isExpanded: boolean;
  onToggle: () => void;
};

export function SidebarUI({ isExpanded, onToggle }: SidebarUIProps) {
  return (
    <aside
      className={cn(
        "hidden sm:flex flex-col gap-2 overflow-hidden bg-sidebar pb-4 transition-[width] duration-300",
        isExpanded ? "w-44 px-3 pt-4" : "w-14 px-2 pt-4"
      )}
    >
      <div className="flex-1">
        <SideNav entries={NAV_ENTRIES} selectedKey="products" isExpanded={isExpanded} />
      </div>
      <PanelToggleButton onToggle={onToggle} />
    </aside>
  );
}
