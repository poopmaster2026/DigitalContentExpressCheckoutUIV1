"use client";

import { Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

import { SidebarAccount } from "./components/SidebarAccount";
import { SideNav } from "./components/SideNav";
import { NAV_SECTIONS } from "./navEntries";

const AVATAR_SRC = "https://i.pravatar.cc/64?img=47";

export function SidebarUI() {
  const pathname = usePathname();
  const isSettingsActive = pathname.startsWith("/settings");

  return (
    <aside className="absolute top-0 left-0 bottom-0 z-10 hidden sm:flex w-16 flex-col items-center overflow-hidden bg-card rounded-tl-xl py-3 gap-3">
      {/* メインナビゲーション */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        <SideNav sections={NAV_SECTIONS} selectedKey="products" />
      </div>

      {/* 下部固定: 設定 + アカウント */}
      <div className="w-full px-1.5 pb-1 flex flex-col gap-1">
        {/* 設定 */}
        <Link
          href="/settings"
          title="設定"
          className={cn(
            "flex w-full flex-col items-center gap-1 rounded-lg px-0.5 py-2 transition-colors hover:bg-surface",
            isSettingsActive && "bg-surface"
          )}
        >
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
              isSettingsActive && "bg-foreground/8"
            )}
          >
            <Settings
              className={cn(
                "h-5 w-5",
                isSettingsActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </span>
          <span
            className={cn(
              "w-full truncate text-center text-[10px] leading-snug",
              isSettingsActive ? "font-medium text-foreground" : "text-muted-foreground"
            )}
          >
            設定
          </span>
        </Link>

        {/* アカウント */}
        <SidebarAccount>
          <button className="flex w-full flex-col items-center gap-1 rounded-lg px-0.5 py-2 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg">
              <Avatar className="h-6 w-6">
                <AvatarImage src={AVATAR_SRC} alt="" />
                <AvatarFallback className="text-[10px]">花</AvatarFallback>
              </Avatar>
            </span>
          </button>
        </SidebarAccount>
      </div>
    </aside>
  );
}
