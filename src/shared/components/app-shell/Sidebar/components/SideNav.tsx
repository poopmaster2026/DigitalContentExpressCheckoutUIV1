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

interface SideNavProps {
  sections: NavSection[];
  selectedKey: string;
}

export function SideNav({ sections, selectedKey }: SideNavProps) {
  const router = useRouter();
  const entries = sections.flatMap((s) => s.entries);

  return (
    <nav aria-label="メインナビゲーション" className="flex flex-col gap-0.5 px-2 py-1">
      {entries.map((entry) => {
        const isSelected = entry.key === selectedKey;
        const isDisabled = entry.disabled === true;
        return (
          <button
            key={entry.key}
            aria-current={isSelected ? "page" : undefined}
            aria-disabled={isDisabled}
            onClick={isDisabled ? undefined : () => router.push(NAV_PATHS[entry.key] ?? "/")}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              isSelected
                ? "bg-foreground/10 text-foreground font-semibold"
                : isDisabled
                  ? "cursor-not-allowed text-foreground/25"
                  : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
            )}
          >
            <entry.icon className="h-5 w-5 shrink-0" />
            {entry.label}
          </button>
        );
      })}
    </nav>
  );
}
