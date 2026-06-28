"use client";

import { usePathname } from "next/navigation";

import { SideNav } from "./components/SideNav";
import { NAV_ENTRIES, NAV_SECTIONS } from "./navEntries";

const NAV_PATHS: Record<string, string> = {
  home: "/store",
  products: "/store/products",
  income: "/store/income",
  customers: "/store/customers",
  analytics: "/store/analytics",
};

function useSelectedKey(): string {
  const pathname = usePathname();
  const matched = NAV_ENTRIES.find((e) => {
    const path = NAV_PATHS[e.key];
    if (!path) return false;
    if (e.key === "home") return pathname === path;
    return pathname === path || pathname.startsWith(path + "/");
  });
  return matched?.key ?? "products";
}

export function SidebarUI() {
  const selectedKey = useSelectedKey();

  return (
    <aside className="absolute top-0 left-0 bottom-0 z-10 hidden sm:flex w-16 flex-col items-center overflow-hidden bg-card rounded-tl-xl py-3 gap-3">
      {/* ナビゲーション（アイコン + ラベル縦並び） */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden">
        <SideNav sections={NAV_SECTIONS} selectedKey={selectedKey} />
      </div>
    </aside>
  );
}
