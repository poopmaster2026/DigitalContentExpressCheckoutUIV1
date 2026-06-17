"use client";

import { ActionButton, Text } from "@react-spectrum/s2/ActionButton";
import { Button } from "@react-spectrum/s2/Button";
import { DialogTrigger, Dialog, Content } from "@react-spectrum/s2/Dialog";
import { Divider } from "@react-spectrum/s2/Divider";
import Add from "@react-spectrum/s2/icons/Add";
import AppsAll from "@react-spectrum/s2/icons/AppsAll";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Button as RACButton } from "react-aria-components";

import { NAV_ENTRIES } from "../../Sidebar/navEntries";

// S2 スペーシングスケール: 0, 4, 8, 12, 16, 20, 24 ... (4の倍数のみ有効)
const navItemClass = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  width: "full",
  paddingY: 12,
  paddingX: 16,
  borderRadius: "default",
  borderStyle: "none",
  font: "ui",
  transition: "default",
  backgroundColor: {
    default: "transparent",
    isHovered: "gray-100",
    isPressed: "gray-200",
  },
});

/**
 * SM 未満（サイドバー非表示時）のみヘッダーに出るナビゲーションボタン。
 * タップするとナビ項目一覧のコンパクトなダイアログが開く。
 * デザイン: アイコン + ラベルを中央揃え、新規作成ボタンは最下部。
 */
export function MobileNavButton() {
  return (
    <DialogTrigger>
      <ActionButton isQuiet aria-label="メニュー">
        <AppsAll />
      </ActionButton>
      <Dialog isDismissible size="S" aria-label="ナビゲーション">
        <Content>
          <div
            className={style({
              display: "flex",
              flexDirection: "column",
              gap: 4,
            })}
          >
            {NAV_ENTRIES.map((entry) => (
              <RACButton key={entry.key} className={navItemClass}>
                <entry.icon />
                <span className={style({ textAlign: "start" })}>
                  {entry.label}
                </span>
              </RACButton>
            ))}
          </div>
          <Divider styles={style({ marginY: 16 })} />
          <div className={style({ display: "flex", justifyContent: "center" })}>
            <Button variant="accent">
              <Add />
              <Text>新規作成</Text>
            </Button>
          </div>
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
