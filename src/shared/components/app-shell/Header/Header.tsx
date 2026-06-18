"use client";

import { useState } from "react";

import { Brand } from "./components/Brand";
import { HeaderActions } from "./components/HeaderActions";
import { HeaderSearch } from "./components/HeaderSearch";
import { HeaderSearchExpanded } from "./components/HeaderSearchExpanded";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-sidebar px-4 sm:px-5">
      {isSearchOpen ? (
        <HeaderSearchExpanded onClose={() => setIsSearchOpen(false)} />
      ) : (
        <>
          <Brand />
          <HeaderSearch />
          <div className="flex-1 md:hidden" />
          <HeaderActions onSearchOpen={() => setIsSearchOpen(true)} />
        </>
      )}
    </header>
  );
}
