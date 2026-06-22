"use client";

import type { FormEvent } from "react";

import { Progress } from "@/shared/components/ui/progress";

import { BasicInfoSection } from "../../components/BasicInfoSection";
import { ContentSection } from "../../components/ContentSection";
import type { SaleType } from "../../types";

import { NewPricingSection } from "./components/NewPricingSection";
import { NewProductHeader } from "./components/NewProductHeader";

interface NewProductContentUIProps {
  saleType: SaleType;
  pending?: boolean;
  isSaving?: boolean;
  progress?: number;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export function NewProductContentUI({
  saleType,
  pending = false,
  isSaving = false,
  progress = 0,
  onSubmit,
  onCancel,
}: NewProductContentUIProps) {
  const shellDetail = { thumb: "sage" as const, saleType };

  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit} noValidate>
      {pending && (
        <Progress
          value={progress}
          className="fixed inset-x-0 top-0 z-50 h-0.5 rounded-none bg-transparent [&>div]:bg-cta [&>div]:transition-all [&>div]:duration-200"
        />
      )}

      <NewProductHeader saleType={saleType} pending={pending} isSaving={isSaving} onCancel={onCancel} />

      <div className="mx-auto w-full max-w-3xl px-6 py-8">
        <div className="flex flex-col gap-6">
          <BasicInfoSection detail={shellDetail} isDescriptionRequired />
          {saleType === "digital" && <ContentSection saleType={saleType} isRequired />}
          <NewPricingSection />
        </div>
      </div>
    </form>
  );
}
