"use client";

import type { ReactNode } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Divider } from "@react-spectrum/s2/Divider";

const wrap = style({ display: "flex", flexDirection: "column", gap: 8 });
const heading = style({ font: "heading-sm", marginY: 0 });

/** フォームのセクション見出し（見出し直下に細い Divider）。 */
export function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className={wrap}>
      <h2 className={heading}>{children}</h2>
      <Divider size="S" />
    </div>
  );
}
