"use client";

import type { FormEventHandler } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert";

import type { ProductDetail } from "../../types";

import { BasicInfoSection } from "./components/BasicInfoSection";
import { ContentSection } from "./components/ContentSection";
import { DetailHeader } from "./components/DetailHeader";
import { PricingSection } from "./components/PricingSection";

interface ProductDetailContentUIProps {
  detail: ProductDetail;
  saved: boolean;
  error: string | null;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDismissSaved: () => void;
  onDelete: () => void;
}

export function ProductDetailContentUI({
  detail,
  saved,
  error,
  onSubmit,
  onDismissSaved,
  onDelete,
}: ProductDetailContentUIProps) {
  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit} onChange={onDismissSaved} noValidate>
      <DetailHeader detail={detail} onDelete={onDelete} />

      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-6">
          {saved && (
            <Alert className="border-success/30 bg-success/10 text-success">
              <AlertTitle>保存しました</AlertTitle>
              <AlertDescription className="text-success/90">
                変更内容を保存しました（モック）。
              </AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>保存に失敗しました</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <BasicInfoSection detail={detail} />
          <ContentSection saleType={detail.saleType} />
          <PricingSection detail={detail} />
        </div>
      </div>
    </form>
  );
}
