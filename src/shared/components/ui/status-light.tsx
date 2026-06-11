"use client";

import type { ReactNode } from "react";
import "./status-light.css";

export type StatusLightVariant = "positive" | "neutral";

/** ● + テキストの状態表示（公開中 = positive / 下書き = neutral）。 */
export function StatusLight({
  variant,
  children,
}: {
  variant: StatusLightVariant;
  children: ReactNode;
}) {
  return (
    <span className={`ui-status-light ui-status-light--${variant}`}>
      <span className="ui-status-light__dot" aria-hidden="true" />
      {children}
    </span>
  );
}
