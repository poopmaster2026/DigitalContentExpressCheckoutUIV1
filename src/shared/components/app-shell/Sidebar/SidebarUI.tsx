"use client";

import { ChevronDown, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

import { SidebarAccount } from "./components/SidebarAccount";
import { SideNav } from "./components/SideNav";
import { NAV_SECTIONS } from "./navEntries";

const AVATAR_SRC = "https://i.pravatar.cc/64?img=10";

function resolveSelectedKey(pathname: string): string {
  if (pathname.startsWith("/store/products")) return "products";
  if (pathname.startsWith("/store/orders")) return "orders";
  if (pathname.startsWith("/store/customers")) return "customers";
  if (pathname.startsWith("/store/analytics")) return "analytics";
  if (pathname.startsWith("/store")) return "home";
  return "";
}

export function SidebarUI() {
  const pathname = usePathname();
  const selectedKey = resolveSelectedKey(pathname);
  const isSettingsActive = pathname.startsWith("/settings");

  return (
    <aside className="absolute top-0 left-0 bottom-0 z-10 hidden sm:flex w-52 flex-col overflow-hidden bg-surface-deep border-r border-sidebar-divider rounded-tl-xl py-3 gap-3">
      {/* アカウント (最上部) */}
      <div className="w-full px-2">
        <SidebarAccount>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-foreground/75 transition-all hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarImage src={AVATAR_SRC} alt="" />
              <AvatarFallback className="text-xs">花</AvatarFallback>
            </Avatar>
            <span className="truncate text-sm font-medium">kumaaa1212</span>
            <ChevronDown className="ml-auto h-4 w-4 shrink-0 text-muted-foreground" />
          </button>
        </SidebarAccount>
      </div>

      {/* メインナビゲーション */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        <SideNav sections={NAV_SECTIONS} selectedKey={selectedKey} />
      </div>

      {/* 下部固定: 設定 */}
      <div className="w-full px-2 pb-1">
        <Link
          href="/settings"
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
            isSettingsActive
              ? "bg-foreground/10 font-semibold text-foreground"
              : "font-medium text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
          )}
        >
          <Settings className="h-5 w-5 shrink-0" />
          <span className="truncate text-sm">
            設定
          </span>
        </Link>
      </div>
    </aside>
  );
}
