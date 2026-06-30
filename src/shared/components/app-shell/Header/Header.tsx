"use client";

import { Copy, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

// TODO: 仮の表示。実際のストアURLに差し替える
const STORE_URL = "setlink/kumaaa1212";

function StoreUrlButton() {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://${STORE_URL}`);
    toast.success("URLをコピーしました");
  };
  return (
    <button
      onClick={handleCopy}
      className="hidden items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-white transition-colors hover:bg-white/10 sm:flex"
      aria-label="ストアURLをコピー"
    >
      <span>{STORE_URL}</span>
      <Copy className="h-3.5 w-3.5 shrink-0 opacity-70" />
    </button>
  );
}

import { MobileNavButton } from "./components/MobileNavButton";
import { SearchModal } from "./components/SearchModal";

/**
 * 全幅ダークヘッダー。
 * デスクトップ: ロゴ+ブランド名（左）・アカウント（右）
 * モバイル: ハンバーガー+ブランド名（左）・アカウント（右）
 */
export function AppHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
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
            <span className="text-2xl font-medium text-white">SetLink</span>
          </div>
        </div>

        {/* 中央: グローバル検索ボタン */}
        <div className="hidden flex-1 justify-center sm:flex">
          <button
            onClick={() => setSearchOpen(true)}
            className={cn(
              "relative flex h-11 w-full max-w-sm items-center gap-2 rounded-md",
              "border border-white/15 bg-white/10 px-3",
              "text-sm text-sidebar-foreground/40",
              "transition-colors hover:bg-white/15"
            )}
          >
            <Search className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left">検索...</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-sidebar-border bg-sidebar-accent px-1.5 py-0.5 text-[10px] text-sidebar-foreground/40 sm:flex">
              <span>⌘</span><span>K</span>
            </kbd>
          </button>
        </div>

        {/* 右: ストアURL */}
        <StoreUrlButton />

      </header>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}

/** @deprecated MobileTopBar は AppHeader に統合済み */
export { AppHeader as MobileTopBar };
