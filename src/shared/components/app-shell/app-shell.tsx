"use client";

import type { ReactNode } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { SearchField } from "@react-spectrum/s2/SearchField";
import { Button } from "@react-spectrum/s2/Button";
import { ActionButton } from "@react-spectrum/s2/ActionButton";
import { Avatar } from "@react-spectrum/s2/Avatar";
import Add from "@react-spectrum/s2/icons/Add";
import Home from "@react-spectrum/s2/icons/Home";
import Images from "@react-spectrum/s2/icons/Images";
import ListBulleted from "@react-spectrum/s2/icons/ListBulleted";
import UserGroup from "@react-spectrum/s2/icons/UserGroup";
import ChartBarVert from "@react-spectrum/s2/icons/ChartBarVert";
import HelpCircle from "@react-spectrum/s2/icons/HelpCircle";
import Bell from "@react-spectrum/s2/icons/Bell";
import ChevronDoubleRight from "@react-spectrum/s2/icons/ChevronDoubleRight";

const shell = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "screen",
  backgroundColor: "layer-1",
});
const header = style({
  display: "flex",
  alignItems: "center",
  gap: 16,
  height: 56,
  paddingX: 16,
  backgroundColor: "base",
  borderBottomWidth: 1,
  borderColor: "gray-200",
});
const brand = style({
  display: "flex",
  alignItems: "baseline",
  gap: 8,
  whiteSpace: "nowrap",
  flexShrink: 0,
});
const storeName = style({
  font: "body-sm",
  color: "neutral-subdued",
  display: { default: "none", sm: "inline" },
});
const searchWrap = style({ flexGrow: 1, display: "flex", justifyContent: "center" });
const body = style({ display: "flex", flexGrow: 1, minHeight: 0 });
const rail = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  width: 64,
  paddingY: 12,
  backgroundColor: "base",
  borderEndWidth: 1,
  borderColor: "gray-200",
});
const main = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minWidth: 0,
  minHeight: 0,
  padding: 24,
});

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={shell}>
      <header className={header}>
        <div className={brand}>
          <span className={style({ font: "title", fontWeight: "bold" })}>Ours</span>
          <span className={storeName}>花子のストア</span>
        </div>
        <div className={searchWrap}>
          <SearchField
            aria-label="検索"
            placeholder="検索"
            styles={style({ width: "full", maxWidth: 440 })}
          />
        </div>
        <ActionButton isQuiet aria-label="ヘルプ">
          <HelpCircle />
        </ActionButton>
        <ActionButton isQuiet aria-label="通知">
          <Bell />
        </ActionButton>
        <Avatar alt="花子" size={32} src="https://i.pravatar.cc/64?img=47" />
      </header>

      <div className={body}>
        <nav className={rail} aria-label="メインナビゲーション">
          <Button variant="accent" aria-label="新規作成">
            <Add />
          </Button>
          <div className={style({ height: 8 })} />
          <ActionButton isQuiet aria-label="ホーム">
            <Home />
          </ActionButton>
          <ActionButton aria-label="商品">
            <Images />
          </ActionButton>
          <ActionButton isQuiet aria-label="注文">
            <ListBulleted />
          </ActionButton>
          <ActionButton isQuiet aria-label="顧客">
            <UserGroup />
          </ActionButton>
          <ActionButton isQuiet aria-label="分析">
            <ChartBarVert />
          </ActionButton>
          <div className={style({ flexGrow: 1 })} />
          <ActionButton isQuiet aria-label="レールを折りたたむ">
            <ChevronDoubleRight />
          </ActionButton>
        </nav>

        <main className={main}>{children}</main>
      </div>
    </div>
  );
}
