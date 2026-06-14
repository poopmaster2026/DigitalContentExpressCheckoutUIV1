"use client";

// アカウントメニュー（公式サンプル app/AccountMenu.tsx の移植）。
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { Avatar } from "@react-spectrum/s2/Avatar";
import { Popover } from "@react-spectrum/s2/Popover";
import { MenuTrigger, Menu, MenuSection, MenuItem, SubmenuTrigger } from "@react-spectrum/s2/Menu";
import { Switch } from "@react-spectrum/s2/Switch";
import { Divider } from "@react-spectrum/s2/Divider";
import { Text } from "@react-spectrum/s2/Text";
import Settings from "@react-spectrum/s2/icons/Settings";
import Buildings from "@react-spectrum/s2/icons/Buildings";
import { STORES, DEFAULT_STORE_ID, DEFAULT_STORE } from "../../stores";

const AVATAR_SRC = "https://i.pravatar.cc/64?img=47";

const accountName = style({
  font: "title",
  color: { default: "title", forcedColors: "ButtonText" },
});
const accountEmail = style({
  font: "ui",
  color: { default: "body", forcedColors: "ButtonText" },
});

export function AccountMenu({
  isDark,
  onColorSchemeChange,
}: {
  isDark: boolean;
  onColorSchemeChange: (isDark: boolean) => void;
}) {
  return (
    <MenuTrigger>
      <ActionButton isQuiet aria-label="アカウント">
        <Avatar alt="花子" src={AVATAR_SRC} />
      </ActionButton>
      <Popover hideArrow placement="bottom end">
        <div className={style({ paddingTop: 4, display: "flex", flexDirection: "column", gap: 12 })}>
          <div className={style({ display: "flex", gap: 12, alignItems: "center", marginX: 12 })}>
            <Avatar alt="花子" src={AVATAR_SRC} size={56} />
            <div>
              <div className={accountName}>花子</div>
              <div className={accountEmail}>hanako@ours.jp</div>
              <Switch
                isSelected={isDark}
                onChange={onColorSchemeChange}
                styles={style({ marginTop: 4 })}
              >
                ダークテーマ
              </Switch>
            </div>
          </div>
          <Divider styles={style({ marginX: 12 })} />
          <Menu aria-label="アカウント">
            <MenuSection>
              <SubmenuTrigger>
                <MenuItem>
                  <Buildings />
                  <Text slot="label">ストア</Text>
                  <Text slot="value">{DEFAULT_STORE?.name}</Text>
                </MenuItem>
                <Menu selectionMode="single" selectedKeys={[DEFAULT_STORE_ID]}>
                  {STORES.map((s) => (
                    <MenuItem key={s.id} id={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </Menu>
              </SubmenuTrigger>
              <MenuItem>
                <Settings />
                <Text slot="label">設定</Text>
              </MenuItem>
            </MenuSection>
            <MenuSection>
              <MenuItem>利用規約</MenuItem>
              <MenuItem>ログアウト</MenuItem>
            </MenuSection>
          </Menu>
        </div>
      </Popover>
    </MenuTrigger>
  );
}
