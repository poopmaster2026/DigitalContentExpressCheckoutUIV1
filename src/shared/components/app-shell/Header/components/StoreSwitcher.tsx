"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";

import { STORES, DEFAULT_STORE_ID } from "../../stores";

export function StoreSwitcher() {
  return (
    <Select defaultValue={DEFAULT_STORE_ID}>
      <SelectTrigger className="h-8 w-36 border-none bg-transparent text-sm font-medium shadow-none focus:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STORES.map((s) => (
          <SelectItem key={s.id} value={s.id}>
            {s.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
