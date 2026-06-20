"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { SidebarAccount } from "../Sidebar/components/SidebarAccount";
import { MobileNavButton } from "./components/MobileNavButton";

/**
 * 全幅ダークヘッダー。
 * デスクトップ: ロゴ+ブランド名（左）・アカウント（右）
 * モバイル: ハンバーガー+ブランド名（左）・アカウント（右）
 */
export function AppHeader() {
  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center justify-between bg-sidebar",
        "border-b border-sidebar-border px-3"
      )}
    >
      {/* 左: モバイル=ハンバーガー、デスクトップ=ロゴ+名前 */}
      <div className="flex items-center gap-2">
        <div className="sm:hidden">
          <MobileNavButton />
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/setlink-logo.png"
            alt=""
            width={25}
            height={25}
            className="shrink-0"
            priority
          />
          <span className="text-xl font-bold text-sidebar-primary">SetLink</span>
        </div>
      </div>

      {/* 右: アカウント */}
      <div className="flex items-center gap-1">
        <SidebarAccount />
      </div>
    </header>
  );
}

/** @deprecated MobileTopBar は AppHeader に統合済み */
export { AppHeader as MobileTopBar };
