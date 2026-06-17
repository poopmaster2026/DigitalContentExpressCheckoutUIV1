import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { ActionButtonGroup } from "@react-spectrum/s2/ActionButtonGroup";
import HelpCircle from "@react-spectrum/s2/icons/HelpCircle";
import SearchIcon from "@react-spectrum/s2/icons/Search";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

import { AccountMenu } from "./AccountMenu";
import { MobileNavButton } from "./MobileNavButton";
import { Notifications } from "./Notifications";

const XS = `@container (min-width: ${480 / 16}rem)`;
const SM = `@container (min-width: ${640 / 16}rem)`;
const MD = `@container (min-width: ${768 / 16}rem)`;

/**
 * ヘッダー右側のアクション群。
 * - 検索アイコン: < MD (768px) でのみ表示。押すと検索バー展開。
 * - ヘルプ・通知: XS (480px) 以上で表示。
 * - モバイルナビ (AppsAll): サイドバーが消える < SM (640px) でのみ表示。押すとナビポップオーバー。
 */
export function HeaderActions({
  isDark,
  onColorSchemeChange,
  onSearchOpen,
}: {
  isDark: boolean;
  onColorSchemeChange: (isDark: boolean) => void;
  onSearchOpen: () => void;
}) {
  return (
    <ActionButtonGroup>
      <div
        className={style({ display: { default: "contents", [MD]: "none" } })}
      >
        <ActionButton isQuiet aria-label="検索" onPress={onSearchOpen}>
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
      </div>
      <div
        className={style({ display: { default: "contents", [SM]: "none" } })}
      >
        <MobileNavButton />
      </div>
      <AccountMenu isDark={isDark} onColorSchemeChange={onColorSchemeChange} />
    </ActionButtonGroup>
  );
}
