"use client";

import { cn } from "@/lib/utils";

import { NAV_ENTRIES } from "./navEntries";
import { NewProductButton } from "./components/NewProductButton";
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
        // padding を両状態で揃えて width だけをトランジション → ガタつき防止
        "hidden sm:flex flex-col shrink-0 gap-2 overflow-hidden bg-sidebar px-2 py-4 transition-[width] duration-200",
        isExpanded ? "w-44" : "w-14"
      )}
    >
      <NewProductButton isExpanded={isExpanded} />
      <div className="flex-1">
        <SideNav entries={NAV_ENTRIES} selectedKey="products" isExpanded={isExpanded} />
      </div>
      <PanelToggleButton onToggle={onToggle} />
    </aside>
  );
}
