"use client";

import { useTheme } from "next-themes";

/** next-themes ラッパー。AccountMenu の Switch に互換 API を提供する。 */
export function useColorScheme() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return {
    isDark,
    setDark: (dark: boolean) => setTheme(dark ? "dark" : "light"),
  };
}
