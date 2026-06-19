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
        // absolute 配置: フレックスフローから切り離してコンテンツ幅を固定
        "absolute top-0 left-0 bottom-0 z-10",
        "hidden sm:flex flex-col gap-2 overflow-hidden bg-sidebar px-2 py-4",
        "transition-[width] duration-200 ease-in-out",
        isExpanded ? "w-44" : "w-14"
      )}
    >
      <NewProductButton isExpanded={isExpanded} />
      <div className="flex-1 overflow-hidden">
        <SideNav entries={NAV_ENTRIES} selectedKey="products" isExpanded={isExpanded} />
      </div>
      <PanelToggleButton onToggle={onToggle} />
    </aside>
  );
}
