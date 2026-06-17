import { createIcon } from "@react-spectrum/s2/Icon";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
// 公式サンプルの PanelIcon（createIcon + 開閉状態でアニメーションする rect）。
import { type ComponentType } from "react";

import type { NavState } from "../hooks/useSidebarToggle";

const LG = `@container (width > ${1024 / 16}rem)`;

const panelRect = style({
  transition: "[width]",
  transitionDuration: 300,
  width: {
    default: "[1.5px]",
    [LG]: "[5px]",
    state: { expanded: "[5px]", collapsed: "[1.5px]" },
    isHovered: {
      default: "[5px]",
      [LG]: "[1.5px]",
      state: { expanded: "[1.5px]", collapsed: "[5px]" },
    },
  },
});

export interface PanelIconState {
  state: NavState;
  isHovered: boolean;
}

const PanelIconBase = createIcon((props) => {
  const { state, isHovered, ...otherProps } = props as PanelIconState &
    Omit<typeof props, keyof PanelIconState>;
  return (
    <svg viewBox="0 0 20 20" fill="var(--iconPrimary)" {...otherProps}>
      <path
        d="M15.75 18H4.25C3.00977 18 2 16.9907 2 15.75V4.25C2 3.00928 3.00977 2 4.25 2H15.75C16.9902 2 18 3.00928 18 4.25V15.75C18 16.9907 16.9902 18 15.75 18ZM4.25 3.5C3.83691 3.5 3.5 3.83643 3.5 4.25V15.75C3.5 16.1636 3.83691 16.5 4.25 16.5H15.75C16.1631 16.5 16.5 16.1636 16.5 15.75V4.25C16.5 3.83643 16.1631 3.5 15.75 3.5H4.25Z"
        fill="var(--iconPrimary)"
      />
      <rect
        x={5}
        y={5}
        rx={0.5}
        height={10}
        className={panelRect({ state, isHovered })}
      />
    </svg>
  );
});

export const PanelIcon = PanelIconBase as ComponentType<PanelIconState>;
