"use client";

import { Search } from "lucide-react";

import { Input } from "@/shared/components/ui/input";

import { useAppSearch } from "../../search-context";

export function HeaderSearch() {
  const { query, setQuery } = useAppSearch();
  return (
    <div className="relative hidden flex-1 md:block">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        aria-label="商品を検索"
        placeholder="商品を検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm pl-9"
      />
    </div>
  );
}
