"use client";

// SideNav / SideNavItem は S2 未提供のため、公式サンプル app/Sidebar.tsx と同じ
// RAC ToggleButtonGroup + style macro で組む。
import { useRef, type ReactNode } from "react";
import { style, focusRing } from "@react-spectrum/s2/style" with { type: "macro" };
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  ToggleButton as RACToggleButton,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "react-aria-components";
import { pressScale } from "@react-spectrum/s2/pressScale";

const sideNavGroup = style({
  marginStart: -4,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  boxSizing: "border-box",
  width: "full",
});

const sideNavItem = style({
  ...focusRing(),
  backgroundColor: "transparent",
  borderStyle: "none",
  width: "full",
  minHeight: 32,
  boxSizing: "border-box",
  padding: 0,
  display: "flex",
  alignItems: "center",
  gap: 8,
  font: "ui",
  fontWeight: { default: "normal", isSelected: "bold" },
  textDecoration: "none",
  borderRadius: "default",
  transition: "default",
});

const sideNavIndicator = style({
  flexShrink: 0,
  width: 2,
  height: "[1lh]",
  borderRadius: "full",
  transition: "default",
  backgroundColor: {
    default: "transparent",
    isHovered: "gray-400",
    isSelected: "gray-800",
  },
});

export function SideNav(props: ToggleButtonGroupProps & { "aria-label": string; children: ReactNode }) {
  return <RACToggleButtonGroup {...props} className={sideNavGroup} />;
}

export function SideNavItem(props: ToggleButtonProps & { children: ReactNode }) {
  const ref = useRef(null);
  return (
    <RACToggleButton
      {...props}
      ref={ref}
      // eslint-disable-next-line react-hooks/refs -- pressScale は press イベント時に ref を遅延参照する S2 公式ユーティリティ
      style={pressScale(ref)}
      className={sideNavItem}
    >
      {(renderProps) => (
        <>
          <span className={sideNavIndicator(renderProps)} />
          {props.children}
        </>
      )}
    </RACToggleButton>
  );
}
