"use client";

import type { FormEventHandler } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";

import { BasicInfoSection } from "../../detail/ProductDetailContent/components/BasicInfoSection";
import { ContentSection } from "../../detail/ProductDetailContent/components/ContentSection";
import type { SaleType } from "../../types";

import { NewPricingSection } from "./components/NewPricingSection";
import { NewProductHeader } from "./components/NewProductHeader";

interface NewProductContentUIProps {
  saleType: SaleType;
  created: boolean;
  error: string | null;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
}

export function NewProductContentUI({
  saleType,
  created,
  error,
  onSubmit,
  onCancel,
}: NewProductContentUIProps) {
  const shellDetail = { thumb: "sage" as const, saleType };

  return (
    <form
      className="flex flex-1 flex-col overflow-hidden p-5 pt-4"
      onSubmit={onSubmit}
      noValidate
    >
      <NewProductHeader saleType={saleType} onCancel={onCancel} />

      <div className="mt-6 flex-1 overflow-auto">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 pb-10">
          {created && (
            <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
              <AlertTitle>商品を作成しました</AlertTitle>
              <AlertDescription>新しい商品を作成しました（モック）。</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>作成に失敗しました</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <BasicInfoSection detail={shellDetail} />
          {saleType === "digital" && <ContentSection saleType={saleType} />}
          <NewPricingSection />
        </div>
      </div>
    </form>
  );
}
