"use client";

import { Building2, LogOut } from "lucide-react";
import type { ReactNode } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { DEFAULT_STORE_ID, STORES } from "../../stores";

const AVATAR_SRC = "https://i.pravatar.cc/64?img=10";

interface SidebarAccountProps {
  children?: ReactNode;
}

export function SidebarAccount({ children }: SidebarAccountProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children ?? (
          <button
            className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            aria-label="アカウントとストア"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={AVATAR_SRC} alt="" />
              <AvatarFallback>花</AvatarFallback>
            </Avatar>
          </button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent side="right" align="start" className="w-64">
        <DropdownMenuLabel className="py-3 font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={AVATAR_SRC} alt="" />
              <AvatarFallback>花</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-foreground">花子</p>
              <p className="truncate text-sm text-muted-foreground">hanako@ours.jp</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          ストアを切り替え
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={DEFAULT_STORE_ID}>
          {STORES.map((s) => (
            <DropdownMenuRadioItem key={s.id} value={s.id} className="py-2.5 text-sm">
              <Building2 className="mr-2 h-4 w-4" />
              {s.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="py-2.5 text-sm">
          <LogOut className="mr-2 h-4 w-4" />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
