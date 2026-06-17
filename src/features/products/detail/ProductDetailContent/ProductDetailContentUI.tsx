import { InlineAlert, Heading, Content } from "@react-spectrum/s2/InlineAlert";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import type { FormEventHandler } from "react";

import type { ProductDetail } from "../../types";

import { BasicInfoSection } from "./components/BasicInfoSection";
import { ContentSection } from "./components/ContentSection";
import { DetailHeader } from "./components/DetailHeader";
import { PricingSection } from "./components/PricingSection";

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
// フォームは単一カラム（編集面そのもの）。スクロール軸は scrollArea の1本。
// 節の区切りは罫線でなく余白で出すため、節間ギャップ(40)を節内ギャップ(24)より大きく取る。
const formColumn = style({
  display: "flex",
  flexDirection: "column",
  gap: 40,
  maxWidth: 640,
  minWidth: 0,
});
const alertStyle = style({ maxWidth: 640 });

type ProductDetailContentUIProps = {
  detail: ProductDetail;
  saved: boolean;
  error: string | null;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDismissSaved: () => void;
  onDelete: () => void;
};

export function ProductDetailContentUI({
  detail,
  saved,
  error,
  onSubmit,
  onDismissSaved,
  onDelete,
}: ProductDetailContentUIProps) {
  return (
    <form
      className={page}
      onSubmit={onSubmit}
      onChange={onDismissSaved}
      noValidate
    >
      <DetailHeader detail={detail} onDelete={onDelete} />
      <div className={scrollArea}>
        <div className={formColumn}>
          {saved && (
            <InlineAlert variant="positive" styles={alertStyle}>
              <Heading>保存しました</Heading>
              <Content>変更内容を保存しました（モック）。</Content>
            </InlineAlert>
          )}
          {error && (
            <InlineAlert variant="negative" styles={alertStyle}>
              <Heading>保存に失敗しました</Heading>
              <Content>{error}</Content>
            </InlineAlert>
          )}
          <BasicInfoSection detail={detail} />
          {detail.saleType === "digital" && <ContentSection />}
          <PricingSection detail={detail} />
        </div>
      </div>
    </form>
  );
}
