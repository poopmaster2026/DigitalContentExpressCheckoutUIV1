"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useNavigationStart } from "@/shared/providers/navigation-progress-provider";

export function useNavigate() {
  const router = useRouter();
  const startNavigation = useNavigationStart();
  return useCallback(
    (href: string) => { startNavigation(); router.push(href); },
    [router, startNavigation]
  );
}
