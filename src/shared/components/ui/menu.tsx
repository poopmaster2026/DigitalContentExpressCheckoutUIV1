"use client";

import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger,
  Popover,
  Separator,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps as AriaMenuProps,
} from "react-aria-components";
import "./menu.css";

export function Menu<T extends object>(props: Omit<AriaMenuProps<T>, "className">) {
  return (
    <Popover className="ui-menu-popover" placement="bottom end">
      <AriaMenu {...props} className="ui-menu" />
    </Popover>
  );
}

export interface MenuItemProps extends Omit<AriaMenuItemProps, "className"> {
  /** destructive = 削除など（negative 色） */
  variant?: "default" | "destructive";
}

export function MenuItem({ variant = "default", ...props }: MenuItemProps) {
  return (
    <AriaMenuItem {...props} className={`ui-menu-item ui-menu-item--${variant}`} />
  );
}

export function MenuSeparator() {
  return <Separator className="ui-menu-separator" />;
}

export { MenuTrigger };
