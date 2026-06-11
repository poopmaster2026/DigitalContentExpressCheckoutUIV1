"use client";

import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import "./icon-button.css";

export interface IconButtonProps extends Omit<AriaButtonProps, "className"> {
  "aria-label": string;
  className?: string;
}

/** quiet なアイコンボタン（行メニュー ⋮ 等）。中身は S2 アイコンを渡す。 */
export function IconButton({ className, ...props }: IconButtonProps) {
  return (
    <AriaButton
      {...props}
      className={["ui-icon-button", className].filter(Boolean).join(" ")}
    />
  );
}
