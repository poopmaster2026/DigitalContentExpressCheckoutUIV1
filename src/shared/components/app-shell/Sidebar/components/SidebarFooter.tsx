"use client";

import { HelpCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { Notifications } from "../../Header/components/Notifications";

import { SidebarAccount } from "./SidebarAccount";

const ICON_CLS =
  "h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground";

export function SidebarFooter() {
  return (
    <div className="flex flex-col items-center gap-1 border-t border-sidebar-border px-1 py-3">
      <Notifications
        buttonClassName="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      />
      <Button variant="ghost" size="icon" aria-label="ヘルプ" className={ICON_CLS}>
        <HelpCircle className="h-4 w-4" />
      </Button>
      <SidebarAccount />
    </div>
  );
}
