"use client";

import { useState } from "react";

export type NavState = "expanded" | "collapsed" | null;

/**
 * サイドナビの開閉状態。null = 未操作（幅に応じた既定挙動）。
 * 初回は data-container の幅で展開/折りたたみを決め、以降は反転する（公式サンプル準拠）。
 */
export function useSidebarToggle() {
  const [state, setState] = useState<NavState>(null);

  const toggle = (containerEl: HTMLElement | null) => {
    setState((prev) => {
      if (prev == null) {
        return containerEl != null && containerEl.offsetWidth > 1024 ? "collapsed" : "expanded";
      }
      return prev === "expanded" ? "collapsed" : "expanded";
    });
  };

  return { state, toggle };
}
