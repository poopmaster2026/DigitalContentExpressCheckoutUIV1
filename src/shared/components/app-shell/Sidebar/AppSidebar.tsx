"use client";

import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/shared/components/ui/sidebar";

import { NAV_SECTIONS } from "./navEntries";

const NAV_PATHS: Record<string, string> = {
  home: "/store",
  products: "/store/products",
  orders: "/store/orders",
  customers: "/store/customers",
  analytics: "/store/analytics",
};

export function AppSidebar() {
  const router = useRouter();
  const entries = NAV_SECTIONS.flatMap((s) => s.entries);

  return (
    <Sidebar
      collapsible="icon"
      className="bg-card border-0 rounded-tl-xl"
      style={
        {
          "--sidebar-background": "var(--card)",
          "--sidebar-foreground": "var(--foreground)",
          "--sidebar-accent": "var(--surface)",
          "--sidebar-accent-foreground": "var(--foreground)",
          "--sidebar-border": "var(--border)",
          "--sidebar-ring": "var(--ring)",
          "--sidebar-primary": "var(--primary)",
          "--sidebar-primary-foreground": "var(--primary-foreground)",
        } as React.CSSProperties
      }
    >
      <SidebarContent className="pt-2">
        <SidebarMenu>
          {entries.map((entry) => (
            <SidebarMenuItem key={entry.key}>
              <SidebarMenuButton
                tooltip={entry.label}
                isActive={entry.key === "products"}
                disabled={entry.disabled}
                aria-disabled={entry.disabled}
                onClick={entry.disabled ? undefined : () => router.push(NAV_PATHS[entry.key] ?? "/")}
                className="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground"
              >
                <entry.icon />
                <span>{entry.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
