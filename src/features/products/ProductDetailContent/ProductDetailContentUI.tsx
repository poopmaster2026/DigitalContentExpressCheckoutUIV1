"use client";

import type { FormEventHandler } from "react";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { InlineAlert, Heading, Content } from "@react-spectrum/s2/InlineAlert";
import type { ProductDetail } from "../types";
import { DetailHeader } from "./components/DetailHeader";
import { BasicInfoSection } from "./components/BasicInfoSection";
import { ContentSection } from "./components/ContentSection";
import { PricingSection } from "./components/PricingSection";
import { ProductPreview } from "./components/ProductPreview";

// ヘッダー固定 + 下を1本だけスクロール（content 領域 / window の二重スクロールにしない）
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
// 左フォーム / 右プレビューの2カラム。狭幅(lg未満)では縦積み。スクロール軸は scrollArea の1本
const grid = style({
  display: "grid",
  gridTemplateColumns: { default: "minmax(0, 1fr)", lg: "minmax(0, 1fr) 340px" },
  columnGap: 32,
  rowGap: 32,
  alignItems: "start",
});
const formColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: 32,
  maxWidth: 640,
  minWidth: 0,
});
const previewColumn = style({
  position: { default: "static", lg: "sticky" },
  top: 0,
  alignSelf: "start",
});
const alertStyle = style({ maxWidth: 640 });

type Props = {
  detail: ProductDetail;
  saved: boolean;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDismissSaved: () => void;
  onDelete: () => void;
};

export function ProductDetailContentUI({
  detail,
  saved,
  onSubmit,
  onDismissSaved,
  onDelete,
}: Props) {
  return (
    <form className={page} onSubmit={onSubmit} onChange={onDismissSaved} noValidate>
      <DetailHeader detail={detail} onDelete={onDelete} />
      <div className={scrollArea}>
        <div className={grid}>
          <div className={formColumn}>
            {saved && (
              <InlineAlert variant="positive" styles={alertStyle}>
                <Heading>保存しました</Heading>
                <Content>変更内容を保存しました（モック）。</Content>
              </InlineAlert>
            )}
            <BasicInfoSection detail={detail} />
            {detail.saleType === "digital" && <ContentSection />}
            <PricingSection detail={detail} />
          </div>
          <div className={previewColumn}>
            <ProductPreview detail={detail} />
          </div>
        </div>
      </div>
    </form>
  );
}
