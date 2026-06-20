"use client";

import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { useAppSearch } from "../search-context";
import { SidebarAccount } from "../Sidebar/components/SidebarAccount";
import { MobileNavButton } from "./components/MobileNavButton";

/**
 * 全幅ダークヘッダー。
 * デスクトップ: ロゴ+ブランド名（左）・アカウント（右）
 * モバイル: ハンバーガー+ブランド名（左）・アカウント（右）
 */
export function AppHeader() {
  const { query, setQuery } = useAppSearch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <header
      className={cn(
        "flex h-14 shrink-0 items-center gap-4 bg-sidebar",
        "border-b border-sidebar-border px-3"
      )}
    >
      {/* 左: モバイル=ハンバーガー、デスクトップ=ロゴ+名前 */}
      <div className="flex shrink-0 items-center gap-2">
        <div className="sm:hidden">
          <MobileNavButton />
        </div>
        <div className="flex items-center gap-2">
          <Image
            src="/setlink-logo.png"
            alt=""
            width={28}
            height={28}
            className="shrink-0"
            priority
          />
          <span className="text-2xl font-bold text-sidebar-primary">SetLink</span>
        </div>
      </div>

      {/* 中央: グローバル検索 */}
      <div className="hidden flex-1 justify-center sm:flex">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sidebar-foreground/50" />
          <input
            ref={inputRef}
            type="search"
            aria-label="グローバル検索"
            placeholder="検索..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={cn(
              "h-9 w-full rounded-md border border-sidebar-border bg-sidebar-accent/60",
              "pl-9 pr-14 text-sm text-sidebar-foreground",
              "placeholder:text-sidebar-foreground/40",
              "focus:outline-none focus:ring-1 focus:ring-sidebar-ring"
            )}
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 hidden items-center gap-0.5 rounded border border-sidebar-border bg-sidebar-accent px-1.5 py-0.5 text-[10px] text-sidebar-foreground/40 sm:flex">
            <span>⌘</span><span>K</span>
          </kbd>
        </div>
      </div>

      {/* 右: アカウント */}
      <div className="ml-auto flex shrink-0 items-center gap-1 sm:ml-0">
        <SidebarAccount />
      </div>
    </header>
  );
}

/** @deprecated MobileTopBar は AppHeader に統合済み */
export { AppHeader as MobileTopBar };
