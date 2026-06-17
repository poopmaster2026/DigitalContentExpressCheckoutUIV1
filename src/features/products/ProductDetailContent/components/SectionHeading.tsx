"use client";

import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { ReactNode } from "react";

const heading = style({ font: "heading-sm", marginY: 0 });

/** フォームのセクション見出し。節の区切りは罫線でなく余白で表現する（Spectrum: 面の区別は色・余白、線/影は例外）。 */
export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className={heading}>{children}</h2>;
}
