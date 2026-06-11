"use client";

import {
  ToggleButton,
  ToggleButtonGroup,
  type ToggleButtonGroupProps,
  type ToggleButtonProps,
} from "react-aria-components";
import "./chip-group.css";

export interface ChipGroupProps extends Omit<ToggleButtonGroupProps, "className"> {
  "aria-label": string;
}

/** ピル型ステータスチップ（単一選択・選択 = 黒ピル）。Figma 966:337 のツールバー。 */
export function ChipGroup(props: ChipGroupProps) {
  return (
    <ToggleButtonGroup
      selectionMode="single"
      disallowEmptySelection
      {...props}
      className="ui-chip-group"
    />
  );
}

export function Chip(props: Omit<ToggleButtonProps, "className">) {
  return <ToggleButton {...props} className="ui-chip" />;
}
