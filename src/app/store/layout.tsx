"use client";

import type { ReactNode } from "react";
import { AppShell } from "@/shared/components/app-shell/app-shell";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
