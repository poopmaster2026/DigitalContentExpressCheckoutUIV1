"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/shared/components/app-shell/AppShell";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
