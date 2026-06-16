"use client";

import { style, size } from "@react-spectrum/s2/style" with { type: "macro" };
import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { DialogTrigger, Dialog, Content } from "@react-spectrum/s2/Dialog";
import { Button } from "@react-spectrum/s2/Button";
import AppsAll from "@react-spectrum/s2/icons/AppsAll";
import Add from "@react-spectrum/s2/icons/Add";
import { SideNav, SideNavItem } from "../../Sidebar/components/SideNav";
import { NAV_ENTRIES } from "../../Sidebar/navEntries";

/**
 * SM 未満（サイドバー非表示時）のみヘッダーに出るナビゲーションボタン。
 * タップするとサイドバーと同じ構成（新規作成 + ナビ項目）のコンパクトなダイアログが開く。
 */
export function MobileNavButton() {
  return (
    <DialogTrigger>
      <ActionButton isQuiet aria-label="メニュー">
        <AppsAll />
      </ActionButton>
      <Dialog isDismissible size="S" aria-label="ナビゲーション">
        <Content>
          <div className={style({ display: "flex", flexDirection: "column", gap: 12 })}>
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
            <SideNav
              aria-label="メインナビゲーション"
              orientation="vertical"
              selectedKeys={["products"]}
              disallowEmptySelection
            >
              {NAV_ENTRIES.map((entry) => (
                <SideNavItem key={entry.key} id={entry.key}>
                  <entry.icon />
                  <span>{entry.label}</span>
                </SideNavItem>
              ))}
            </SideNav>
          </div>
        </Content>
      </Dialog>
    </DialogTrigger>
  );
}
