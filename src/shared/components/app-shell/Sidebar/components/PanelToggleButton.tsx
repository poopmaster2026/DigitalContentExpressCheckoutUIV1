"use client";

import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useState } from "react";

import type { NavState } from "../hooks/useSidebarToggle";

import { PanelIcon } from "./PanelIcon";

/** サイドバー開閉トグル。hover は icon アニメ用のローカル UI 状態。 */
export function PanelToggleButton({
  state,
  onToggle,
}: {
  state: NavState;
  onToggle: (containerEl: HTMLElement | null) => void;
}) {
  const [isHovered, setHovered] = useState(false);
  return (
    <ActionButton
      isQuiet
      aria-label="サイドバーを切り替え"
      styles={style({ alignSelf: "start" })}
      // @ts-expect-error -- ActionButton は onHoverChange を型公開していないが実装は受け付ける（公式サンプルと同じ）
      onHoverChange={setHovered}
      onPress={(e) => {
        const containerEl = (e.target as HTMLElement).closest(
          "[data-container]"
        );
        onToggle(containerEl instanceof HTMLElement ? containerEl : null);
        setHovered(false);
      }}
    >
      <PanelIcon state={state} isHovered={isHovered} />
    </ActionButton>
  );
}
