"use client";

import { Button as AriaButton, type ButtonProps as AriaButtonProps } from "react-aria-components";
import "./button.css";

export type ButtonVariant = "accent" | "primary" | "secondary" | "negative";

export interface ButtonProps extends Omit<AriaButtonProps, "className"> {
  /** accent = 主アクション(#007AFF) / primary = 確定(黒) / secondary / negative */
  variant?: ButtonVariant;
  className?: string;
}

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={["ui-button", `ui-button--${variant}`, className].filter(Boolean).join(" ")}
    />
  );
}
