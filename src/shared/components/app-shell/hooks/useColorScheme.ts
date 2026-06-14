"use client";

import { useState, useSyncExternalStore } from "react";

type ColorScheme = "light" | "dark";

function subscribePrefersDark(callback: () => void) {
  const m = matchMedia("(prefers-color-scheme: dark)");
  m.addEventListener("change", callback);
  return () => m.removeEventListener("change", callback);
}

/**
 * ダークテーマ切替（既定は OS 設定に追従）。公式サンプルの ColorSchemeProvider 相当。
 * - `colorScheme`: S2 `<Provider colorScheme>` に渡す生値（null = OS 追従）
 * - `isDark`: ロゴ切替・Switch 表示に使う実効値
 * - `setDark`: AccountMenu の Switch から light/dark を確定する
 */
export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<ColorScheme | null>(null);
  const prefersDark = useSyncExternalStore(
    subscribePrefersDark,
    () => matchMedia("(prefers-color-scheme: dark)").matches,
    () => false,
  );
  const isDark = colorScheme == null ? prefersDark : colorScheme === "dark";

  return {
    colorScheme,
    isDark,
    setDark: (dark: boolean) => setColorScheme(dark ? "dark" : "light"),
  };
}
