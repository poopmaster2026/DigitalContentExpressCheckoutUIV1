"use client";

import type { FormEventHandler } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import type { ProductDetail } from "../../types";

import { BasicInfoSection } from "./components/BasicInfoSection";
import { ContentSection } from "./components/ContentSection";
import { DetailHeader } from "./components/DetailHeader";
import { PricingSection } from "./components/PricingSection";
import { ProductPreview } from "./components/ProductPreview";

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
      className="flex flex-1 flex-col overflow-hidden p-5 pt-4"
      onSubmit={onSubmit}
      onChange={onDismissSaved}
      noValidate
    >
      <DetailHeader detail={detail} onDelete={onDelete} />

      <div className="mt-6 flex flex-1 gap-10 overflow-auto">
        {/* 左: フォーム */}
        <div className="flex w-full max-w-xl flex-col gap-10 pb-10">
          {saved && (
            <Alert variant="default" className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
              <AlertTitle>保存しました</AlertTitle>
              <AlertDescription>変更内容を保存しました（モック）。</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>保存に失敗しました</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <BasicInfoSection detail={detail} />
          {detail.saleType === "digital" && <ContentSection />}
          <PricingSection detail={detail} />
        </div>

        {/* 右: プレビュー（lg以上でスティッキー） */}
        <div className="hidden lg:block lg:sticky lg:top-0 lg:self-start lg:pt-1">
          <ProductPreview detail={detail} />
        </div>
      </div>
    </form>
  );
}
