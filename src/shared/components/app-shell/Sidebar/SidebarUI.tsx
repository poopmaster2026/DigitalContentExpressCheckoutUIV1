"use client";

import { SideNav } from "./components/SideNav";
import { NAV_SECTIONS } from "./navEntries";

export function SidebarUI() {
  return (
    <aside className="absolute top-0 left-0 bottom-0 z-10 hidden sm:flex w-16 flex-col items-center overflow-hidden bg-card rounded-tl-xl py-3 gap-3">
      {/* ナビゲーション（アイコン + ラベル縦並び） */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        <SideNav sections={NAV_SECTIONS} selectedKey="products" />
      </div>
    </aside>
  );
}
