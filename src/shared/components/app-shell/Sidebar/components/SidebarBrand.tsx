"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

export function SidebarBrand({ isExpanded }: { isExpanded: boolean }) {
  return (
    <div className="flex h-9 items-center gap-2 px-1">
      <Image
        src="/setlink-logo.png"
        alt=""
        width={28}
        height={28}
        className="block shrink-0"
        priority
      />
      <span
        className={cn(
          "overflow-hidden truncate text-base font-medium transition-[opacity,max-width] duration-200 ease-in-out",
          isExpanded ? "max-w-full opacity-100" : "max-w-0 opacity-0"
        )}
      >
        SetLink
      </span>
    </div>
  );
}
