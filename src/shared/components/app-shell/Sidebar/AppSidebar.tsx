"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
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

  return (
    <Sidebar
      collapsible="icon"
      className="rounded-tl-xl border-r-0 bg-card text-foreground [--sidebar-background:theme(colors.card)] [--sidebar-foreground:theme(colors.foreground)] [--sidebar-accent:theme(colors.surface)] [--sidebar-accent-foreground:theme(colors.foreground)] [--sidebar-border:theme(colors.border)] [--sidebar-ring:theme(colors.ring)]"
    >
      <SidebarContent className="pt-2">
        {NAV_SECTIONS.map((section, i) => (
          <SidebarGroup key={i}>
            {section.label && (
              <SidebarGroupLabel className="text-muted-foreground">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {section.entries.map((entry) => (
                  <SidebarMenuItem key={entry.key}>
                    <SidebarMenuButton
                      tooltip={entry.label}
                      disabled={entry.disabled}
                      onClick={
                        entry.disabled
                          ? undefined
                          : () => router.push(NAV_PATHS[entry.key] ?? "/")
                      }
                      className={cn(
                        entry.disabled && "cursor-not-allowed opacity-40"
                      )}
                    >
                      <entry.icon />
                      <span>{entry.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarTrigger className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground" />
      </SidebarFooter>
    </Sidebar>
  );
}
