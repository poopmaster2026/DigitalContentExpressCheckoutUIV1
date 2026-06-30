import type { ReactNode } from "react";

import { AppShell } from "@/shared/components/app-shell/AppShell";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
