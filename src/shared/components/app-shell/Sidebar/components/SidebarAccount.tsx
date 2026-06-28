"use client";

import { Building2, LogOut, Settings } from "lucide-react";

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

const AVATAR_SRC = "https://i.pravatar.cc/64?img=47";

export function SidebarAccount() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          aria-label="アカウントとストア"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={AVATAR_SRC} alt="" />
            <AvatarFallback>花</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" align="end" className="w-60">
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={AVATAR_SRC} alt="" />
              <AvatarFallback>花</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate font-medium">花子</p>
              <p className="truncate text-xs text-muted-foreground">hanako@ours.jp</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          ストアを切り替え
        </DropdownMenuLabel>
        <DropdownMenuRadioGroup value={DEFAULT_STORE_ID}>
          {STORES.map((s) => (
            <DropdownMenuRadioItem key={s.id} value={s.id}>
              <Building2 className="mr-2 h-4 w-4" />
              {s.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          設定
        </DropdownMenuItem>
        <DropdownMenuItem>利用規約</DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          ログアウト
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
