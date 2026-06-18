"use client";

import { cn } from "@/lib/utils";

import type { NavEntry } from "../navEntries";

type SideNavProps = {
  entries: NavEntry[];
  selectedKey: string;
  isExpanded: boolean;
};

export function SideNav({ entries, selectedKey, isExpanded }: SideNavProps) {
  return (
    <nav aria-label="メインナビゲーション" className="flex flex-col gap-1">
      {entries.map((entry) => {
        const isSelected = entry.key === selectedKey;
        return (
          <button
            key={entry.key}
            aria-current={isSelected ? "page" : undefined}
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-2 py-2 text-sm font-medium transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              isSelected
                ? "bg-sidebar-accent text-sidebar-primary font-semibold"
                : "text-sidebar-foreground/70"
            )}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
              <entry.icon className="h-4 w-4" />
            </span>
            {isExpanded && (
              <span className="truncate transition-opacity duration-200">
                {entry.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
