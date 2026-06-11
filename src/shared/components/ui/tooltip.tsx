"use client";

import {
  Tooltip as AriaTooltip,
  TooltipTrigger,
  type TooltipProps as AriaTooltipProps,
} from "react-aria-components";
import type { ReactNode } from "react";
import "./tooltip.css";

export interface TooltipProps extends Omit<AriaTooltipProps, "children" | "className"> {
  children: ReactNode;
}

/** 黒地・小型のツールチップ（アイコンのみの nav 等で必須）。 */
export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <AriaTooltip {...props} className="ui-tooltip">
      {children}
    </AriaTooltip>
  );
}

export { TooltipTrigger };
