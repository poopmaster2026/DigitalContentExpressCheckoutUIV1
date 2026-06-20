"use client";

import { Search, X } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";

import { useAppSearch } from "../../search-context";

import { AccountMenu } from "./AccountMenu";

export function HeaderSearchExpanded({ onClose }: { onClose: () => void }) {
  const { query, setQuery } = useAppSearch();
  return (
    <>
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          aria-label="商品を検索"
          placeholder="商品を検索"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
          autoFocus
        />
      </div>
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="検索を閉じる" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
        <AccountMenu />
      </div>
    </>
  );
}
