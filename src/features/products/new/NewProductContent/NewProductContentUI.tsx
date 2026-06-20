"use client";

import type { FormEventHandler } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";
import { Progress } from "@/shared/components/ui/progress";

import { BasicInfoSection } from "../../detail/ProductDetailContent/components/BasicInfoSection";
import { ContentSection } from "../../detail/ProductDetailContent/components/ContentSection";
import type { SaleType } from "../../types";

import { NewPricingSection } from "./components/NewPricingSection";
import { NewProductHeader } from "./components/NewProductHeader";

interface NewProductContentUIProps {
  saleType: SaleType;
  saving?: boolean;
  progress?: number;
  created: boolean;
  error: string | null;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel: () => void;
}

export function NewProductContentUI({
  saleType,
  saving = false,
  progress = 0,
  created,
  error,
  onSubmit,
  onCancel,
}: NewProductContentUIProps) {
  const shellDetail = { thumb: "sage" as const, saleType };

  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit} noValidate>
      {saving && (
        <Progress
          value={progress}
          className="fixed inset-x-0 top-0 z-50 h-[3px] rounded-none bg-transparent [&>div]:bg-cta [&>div]:transition-all [&>div]:duration-200"
        />
      )}

      <NewProductHeader saleType={saleType} saving={saving} onCancel={onCancel} />

      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-6">
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
