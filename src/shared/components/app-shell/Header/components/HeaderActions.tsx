"use client";

import { HelpCircle } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { AccountMenu } from "./AccountMenu";
import { MobileNavButton } from "./MobileNavButton";
import { Notifications } from "./Notifications";

export function HeaderActions() {
  return (
    <div className="flex items-center gap-1">
      <div className="hidden xs:flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="ヘルプ" className="h-9 w-9">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Notifications />
      </div>
      <div className="sm:hidden">
        <MobileNavButton />
      </div>
      <AccountMenu />
    </div>
  );
}
