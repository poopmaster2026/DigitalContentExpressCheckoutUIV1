"use client";

import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Heading,
} from "@react-spectrum/s2/Dialog";
import Add from "@react-spectrum/s2/icons/Add";
import CalendarIllustration from "@react-spectrum/s2/illustrations/gradient/generic2/Calendar";
import CardTapPaymentIllustration from "@react-spectrum/s2/illustrations/gradient/generic2/CardTapPayment";
import EducationIllustration from "@react-spectrum/s2/illustrations/gradient/generic2/Education";
import FileTextIllustration from "@react-spectrum/s2/illustrations/gradient/generic2/FileText";
import {
  SelectBox,
  SelectBoxGroup,
  Text,
  type Selection,
} from "@react-spectrum/s2/SelectBoxGroup";
import { size, style } from "@react-spectrum/s2/style" with { type: "macro" };
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";

import type { NavState } from "../hooks/useSidebarToggle";

const LG = `@container (width > ${1024 / 16}rem)`;

const buttonStyles = style({
  marginBottom: 8,
  width: { default: 32, [LG]: 96, state: { expanded: 96, collapsed: 32 } },
});

const textStyles = style({
  opacity: { default: 0, [LG]: 1, state: { expanded: 1, collapsed: 0 } },
  transition: "default",
  transitionDuration: 300,
  whiteSpace: "nowrap",
});

/** サイドナビの「新規作成」ボタン。押すとカテゴリー選択 Dialog を開く。 */
export function NewProductButton({ state }: { state: NavState }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Selection>(new Set());

  return (
    <DialogTrigger
      onOpenChange={(open) => {
        if (!open) setSelected(new Set());
      }}
    >
      <Button
        variant="accent"
        styles={buttonStyles({ state })}
        UNSAFE_style={{
          alignItems: "center",
          justifyContent: "start",
          overflow: "clip",
          transition: "all 300ms",
        }}
      >
        <span className={style({ marginStart: size(6) })}>
          <Add />
        </span>
        <span className={textStyles({ state })}>新規作成</span>
      </Button>
      <Dialog size="M">
        {({ close }) => (
          <>
            <Heading slot="title" UNSAFE_style={{ fontWeight: 700 }}>
              商品カテゴリーを選択
            </Heading>
            <Content>
              <SelectBoxGroup
                aria-label="商品カテゴリー"
                selectionMode="single"
                orientation="horizontal"
                disabledKeys={["course", "booking", "subscription"]}
                selectedKeys={selected}
                onSelectionChange={setSelected}
                styles={style({ width: "full" })}
                UNSAFE_style={
                  {
                    "--select-box-group-width": "9999px",
                  } as React.CSSProperties
                }
              >
                <SelectBox
                  id="digital"
                  textValue="デジタル"
                  UNSAFE_className="sb-digital"
                  UNSAFE_style={{ width: "100%" }}
                >
                  <FileTextIllustration />
                  <Text slot="label" UNSAFE_style={{ fontWeight: 700 }}>
                    デジタル
                  </Text>
                  <Text slot="description">ファイル・PDF・動画</Text>
                </SelectBox>
                <SelectBox
                  id="course"
                  textValue="コース"
                  UNSAFE_className="sb-course"
                  UNSAFE_style={{ width: "100%" }}
                >
                  <EducationIllustration />
                  <Text slot="label" UNSAFE_style={{ fontWeight: 700 }}>
                    コース
                  </Text>
                  <Text slot="description">近日公開予定</Text>
                </SelectBox>
                <SelectBox
                  id="booking"
                  textValue="予約"
                  UNSAFE_className="sb-booking"
                  UNSAFE_style={{ width: "100%" }}
                >
                  <CalendarIllustration />
                  <Text slot="label" UNSAFE_style={{ fontWeight: 700 }}>
                    予約
                  </Text>
                  <Text slot="description">近日公開予定</Text>
                </SelectBox>
                <SelectBox
                  id="subscription"
                  textValue="サブスク"
                  UNSAFE_className="sb-subscription"
                  UNSAFE_style={{ width: "100%" }}
                >
                  <CardTapPaymentIllustration />
                  <Text slot="label" UNSAFE_style={{ fontWeight: 700 }}>
                    サブスク
                  </Text>
                  <Text slot="description">近日公開予定</Text>
                </SelectBox>
              </SelectBoxGroup>
            </Content>
            <ButtonGroup>
              <Button variant="secondary" onPress={close}>
                キャンセル
              </Button>
              <Button
                variant="accent"
                isDisabled={(selected as Set<string>).size === 0}
                onPress={() => {
                  const saleType =
                    selected instanceof Set ? [...selected][0] : null;
                  if (saleType) {
                    close();
                    router.push(`/store/products/new?saleType=${saleType}`);
                  }
                }}
              >
                次へ
              </Button>
            </ButtonGroup>
          </>
        )}
      </Dialog>
    </DialogTrigger>
  );
}
