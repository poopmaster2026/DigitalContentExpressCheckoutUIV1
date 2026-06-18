"use client";

import { LayoutGrid, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import { Separator } from "@/shared/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet";

import { NAV_ENTRIES } from "../../Sidebar/navEntries";

export function MobileNavButton() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="メニュー" className="h-9 w-9">
          <LayoutGrid className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-left text-base">メニュー</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-2">
          {NAV_ENTRIES.map((entry) => (
            <button
              key={entry.key}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-foreground/80 hover:bg-accent hover:text-foreground"
            >
              <entry.icon className="h-4 w-4" />
              {entry.label}
            </button>
          ))}
        </nav>
        <Separator />
        <div className="p-4">
          <Link href="/store/products/new">
            <Button className="w-full gap-2">
              <Plus className="h-4 w-4" />
              新規作成
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
