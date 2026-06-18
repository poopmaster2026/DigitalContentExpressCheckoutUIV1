"use client";

import { Brand } from "./components/Brand";
import { HeaderActions } from "./components/HeaderActions";

export function Header() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-4 border-b bg-sidebar px-4 sm:px-5">
      <Brand />
      <div className="flex-1" />
      <HeaderActions />
    </header>
  );
}
