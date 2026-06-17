"use client";

import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { ActionButtonGroup } from "@react-spectrum/s2/ActionButtonGroup";
import AppsAll from "@react-spectrum/s2/icons/AppsAll";
import HelpCircle from "@react-spectrum/s2/icons/HelpCircle";
import SearchIcon from "@react-spectrum/s2/icons/Search";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

import { AccountMenu } from "./AccountMenu";
import { Notifications } from "./Notifications";

const XS = `@container (min-width: ${480 / 16}rem)`;
const MD = `@container (min-width: ${768 / 16}rem)`;

/** ヘッダー右側のアクション群。狭幅では検索アイコン表示、XS 未満ではヘルプ/通知/アプリを隠す。 */
export function HeaderActions({
  isDark,
  onColorSchemeChange,
}: {
  isDark: boolean;
  onColorSchemeChange: (isDark: boolean) => void;
}) {
  return (
    <ActionButtonGroup>
      <div
        className={style({ display: { default: "contents", [MD]: "none" } })}
      >
        <ActionButton isQuiet aria-label="検索">
          <SearchIcon />
        </ActionButton>
      </div>
      <div
        className={style({ display: { default: "none", [XS]: "contents" } })}
      >
        <ActionButton isQuiet aria-label="ヘルプ">
          <HelpCircle />
        </ActionButton>
        <Notifications />
        <ActionButton isQuiet aria-label="アプリ">
          <AppsAll />
        </ActionButton>
      </div>
      <AccountMenu isDark={isDark} onColorSchemeChange={onColorSchemeChange} />
    </ActionButtonGroup>
  );
}
