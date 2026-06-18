"use client";

import { HelpCircle, Search } from "lucide-react";

import { Button } from "@/shared/components/ui/button";

import { AccountMenu } from "./AccountMenu";
import { MobileNavButton } from "./MobileNavButton";
import { Notifications } from "./Notifications";

export function HeaderActions({ onSearchOpen }: { onSearchOpen: () => void }) {
  return (
    <div className="flex items-center gap-1">
      {/* 検索アイコン: md未満でのみ表示 */}
      <Button
        variant="ghost"
        size="icon"
        aria-label="検索"
        className="h-9 w-9 md:hidden"
        onClick={onSearchOpen}
      >
        <Search className="h-4 w-4" />
      </Button>
      {/* ヘルプ・通知: xs以上で表示 */}
      <div className="hidden xs:flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="ヘルプ" className="h-9 w-9">
          <HelpCircle className="h-4 w-4" />
        </Button>
        <Notifications />
      </div>
      {/* モバイルナビ: sm未満でのみ表示 */}
      <div className="sm:hidden">
        <MobileNavButton />
      </div>
      <AccountMenu />
    </div>
  );
}
