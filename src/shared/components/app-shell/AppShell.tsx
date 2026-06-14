"use client";

// アプリフレームの最上位 Container（公式サンプル ExampleApp.tsx 相当）。
// 検索状態 / カラースキームを保持し、Provider 群を張って AppShellUI を描画する。
import { useState, type ReactNode } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Provider } from "@react-spectrum/s2/Provider";
import { AppSearchContext } from "./search-context";
import { useColorScheme } from "./hooks/useColorScheme";
import { AppShellUI } from "./AppShellUI";

export function AppShell({ children }: { children: ReactNode }) {
  const [query, setQuery] = useState("");
  const { colorScheme, isDark, setDark } = useColorScheme();

  return (
    <AppSearchContext value={{ query, setQuery }}>
      <Provider colorScheme={colorScheme ?? undefined} styles={style({ display: "contents" })}>
        <AppShellUI isDark={isDark} onColorSchemeChange={setDark}>
          {children}
        </AppShellUI>
      </Provider>
    </AppSearchContext>
  );
}
