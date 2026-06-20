"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import type { NavSection } from "../navEntries";

const NAV_PATHS: Record<string, string> = {
  home: "/store",
  products: "/store/products",
  orders: "/store/orders",
  customers: "/store/customers",
  analytics: "/store/analytics",
};

type SideNavProps = {
  sections: NavSection[];
  selectedKey: string;
};

export function SideNav({ sections, selectedKey }: SideNavProps) {
  const router = useRouter();
  const entries = sections.flatMap((s) => s.entries);

  return (
    <nav aria-label="メインナビゲーション" className="flex flex-col gap-0.5 px-1.5 py-1">
      {entries.map((entry) => {
        const isSelected = entry.key === selectedKey;
        return (
          <button
            key={entry.key}
            aria-current={isSelected ? "page" : undefined}
            title={entry.label}
            onClick={() => router.push(NAV_PATHS[entry.key] ?? "/")}
            className={cn(
              "flex w-full flex-col items-center gap-1 rounded-lg px-0.5 py-2 transition-colors",
              "hover:bg-sidebar-accent",
              isSelected && "bg-sidebar-accent"
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                isSelected && "bg-sidebar-foreground/10"
              )}
            >
              <entry.icon
                className={cn(
                  "h-5 w-5",
                  isSelected ? "text-sidebar-primary" : "text-sidebar-foreground"
                )}
              />
            </span>
            <span
              className={cn(
                "w-full truncate text-center text-[10px] leading-snug",
                isSelected
                  ? "font-semibold text-sidebar-primary"
                  : "text-sidebar-foreground"
              )}
            >
              {entry.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
