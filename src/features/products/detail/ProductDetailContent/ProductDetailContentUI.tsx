"use client";

import type { FormEvent } from "react";

import { BasicInfoSection } from "../../components/BasicInfoSection";
import { ContentSection } from "../../components/ContentSection";
import { SubmitProgressBar } from "../../components/SubmitProgressBar";
import type { ProductDetail } from "../../types";

import { DetailHeader } from "./components/DetailHeader";
import { PricingSection } from "./components/PricingSection";

interface ProductDetailContentUIProps {
  detail: ProductDetail;
  pending: boolean;
  progress: number;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export function ProductDetailContentUI({
  detail,
  pending,
  progress,
  onSubmit,
  onDuplicate,
  onDelete,
}: ProductDetailContentUIProps) {
  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit} noValidate>
      <SubmitProgressBar pending={pending} progress={progress} />

      <DetailHeader
        detail={detail}
        pending={pending}
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
