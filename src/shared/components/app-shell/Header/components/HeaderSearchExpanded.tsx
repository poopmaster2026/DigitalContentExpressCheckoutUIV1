"use client";

import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { ActionButtonGroup } from "@react-spectrum/s2/ActionButtonGroup";
import Cancel from "@react-spectrum/s2/icons/Cancel";
import { SearchField } from "@react-spectrum/s2/SearchField";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };

import { useAppSearch } from "../../search-context";

import { AccountMenu } from "./AccountMenu";

/** モバイル幅（< MD）で検索アイコンを押した時に展開するフルワイド検索バー。 */
export function HeaderSearchExpanded({
  isDark,
  onColorSchemeChange,
  onClose,
}: {
  isDark: boolean;
  onColorSchemeChange: (isDark: boolean) => void;
  onClose: () => void;
}) {
  const { query, setQuery } = useAppSearch();
  return (
    <>
      <SearchField
        aria-label="商品を検索"
        placeholder="商品を検索"
        value={query}
        onChange={setQuery}
        // autoFocus: isSearchOpen=true 時に新規マウントされるため有効
        autoFocus
        styles={style({ flexGrow: 1 })}
      />
      <ActionButtonGroup>
        <ActionButton isQuiet aria-label="検索を閉じる" onPress={onClose}>
          <Cancel />
        </ActionButton>
        <AccountMenu
          isDark={isDark}
          onColorSchemeChange={onColorSchemeChange}
        />
      </ActionButtonGroup>
    </>
  );
}
