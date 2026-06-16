"use client";

import { style, size } from "@react-spectrum/s2/style" with { type: "macro" };
import { ActionButton, Text } from "@react-spectrum/s2/ActionButton";
import { DialogTrigger, Dialog, Content } from "@react-spectrum/s2/Dialog";
import { Button } from "@react-spectrum/s2/Button";
import { Divider } from "@react-spectrum/s2/Divider";
import AppsAll from "@react-spectrum/s2/icons/AppsAll";
import Add from "@react-spectrum/s2/icons/Add";
import { NAV_ENTRIES } from "../../Sidebar/navEntries";

/**
 * SM 未満（サイドバー非表示時）のみヘッダーに出るナビゲーションボタン。
 * タップするとナビ項目のコンパクトなダイアログが開く。
 */
export function MobileNavButton() {
  return (
    <DialogTrigger>
      <ActionButton isQuiet aria-label="メニュー">
        <AppsAll />
      </ActionButton>
      <Dialog isDismissible size="S" aria-label="ナビゲーション">
        <Content>
          <div className={style({ display: "flex", flexDirection: "column", gap: 4 })}>
            <Button
              variant="accent"
              UNSAFE_style={{
                alignItems: "center",
                justifyContent: "start",
                overflow: "clip",
              }}
            >
              <span className={style({ marginStart: size(6) })}>
                <Add />
              </span>
              <span>新規作成</span>
            </Button>
            <Divider styles={style({ marginY: 8 })} />
            {NAV_ENTRIES.map((entry) => (
              <ActionButton
                key={entry.key}
                isQuiet
                styles={style({ width: "full" })}
                UNSAFE_style={{ justifyContent: "flex-start" }}
              >
                <entry.icon />
                <Text>{entry.label}</Text>
              </ActionButton>
            ))}
          </div>
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
