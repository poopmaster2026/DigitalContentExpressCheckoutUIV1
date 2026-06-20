"use client";

import { Bell } from "lucide-react";

import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { NOTIFICATIONS } from "@/shared/mock/notifications";

export function Notifications({ buttonClassName }: { buttonClassName?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative h-9 w-9", buttonClassName)} aria-label={`${NOTIFICATIONS.length}件の通知`}>
          <Bell className="h-4 w-4" />
          {NOTIFICATIONS.length > 0 && (
            <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              {NOTIFICATIONS.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="border-b px-4 py-3">
          <h3 className="font-semibold">通知</h3>
        </div>
        <ScrollArea className="max-h-80">
          <div className="divide-y">
            {NOTIFICATIONS.map((n, i) => (
              <div key={i} className="flex gap-3 px-4 py-3">
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={n.avatar} alt="" />
                  <AvatarFallback>{n.author[0]}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-medium">{n.author}</span>
                    <span className="text-xs text-muted-foreground">{n.date}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
