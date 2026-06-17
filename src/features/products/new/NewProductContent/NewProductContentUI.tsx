"use client";

import { InlineAlert, Heading, Content } from "@react-spectrum/s2/InlineAlert";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { FormEventHandler } from "react";

import { BasicInfoSection } from "../../detail/ProductDetailContent/components/BasicInfoSection";
import { ContentSection } from "../../detail/ProductDetailContent/components/ContentSection";
import type { SaleType } from "../../types";

import { NewPricingSection } from "./components/NewPricingSection";
import { NewProductHeader } from "./components/NewProductHeader";

const page = style({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  minHeight: 0,
});
const scrollArea = style({
  flexGrow: 1,
  minHeight: 0,
  overflow: "auto",
  paddingTop: 24,
  paddingBottom: 24,
});
const formColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: 40,
  maxWidth: 640,
  minWidth: 0,
});
const alertStyle = style({ maxWidth: 640 });

type Props = {
  saleType: SaleType;
  created: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
};

export function NewProductContentUI({
  saleType,
  created,
  onSubmit,
  onCancel,
}: Props) {
  const shellDetail = { thumb: "sage" as const, saleType };

  return (
    <form className={page} onSubmit={onSubmit} noValidate>
      <NewProductHeader saleType={saleType} onCancel={onCancel} />
      <div className={scrollArea}>
        <div className={formColumn}>
          {created && (
            <InlineAlert variant="positive" styles={alertStyle}>
              <Heading>商品を作成しました</Heading>
              <Content>新しい商品を作成しました（モック）。</Content>
            </InlineAlert>
          )}
          <BasicInfoSection detail={shellDetail} />
          {saleType === "digital" && <ContentSection />}
          <NewPricingSection />
        </div>
      </div>
    </form>
  );
}
