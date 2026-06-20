"use client";

import type { FormEventHandler } from "react";

import { Progress } from "@/shared/components/ui/progress";

import type { ProductDetail } from "../../types";

import { BasicInfoSection } from "./components/BasicInfoSection";
import { ContentSection } from "./components/ContentSection";
import { DetailHeader } from "./components/DetailHeader";
import { PricingSection } from "./components/PricingSection";

type ProductDetailContentUIProps = {
  detail: ProductDetail;
  pending: boolean;
  isSaving: boolean;
  progress: number;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onDuplicate: () => void;
  onDelete: () => void;
};

export function ProductDetailContentUI({
  detail,
  pending,
  isSaving,
  progress,
  onSubmit,
  onDuplicate,
  onDelete,
}: ProductDetailContentUIProps) {
  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit} noValidate>
      {/* 時間のかかる操作中のプログレスバー — 画面最上部 fixed */}
      {pending && (
        <Progress
          value={progress}
          className="fixed inset-x-0 top-0 z-50 h-0.5 rounded-none bg-transparent [&>div]:bg-cta [&>div]:transition-all [&>div]:duration-200"
        />
      )}

      <DetailHeader
        detail={detail}
        pending={pending}
        isSaving={isSaving}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      />

      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-6">
          <BasicInfoSection detail={detail} isDescriptionRequired />
          <ContentSection saleType={detail.saleType} />
          <PricingSection detail={detail} />
        </div>
      </div>
    </form>
  );
}
