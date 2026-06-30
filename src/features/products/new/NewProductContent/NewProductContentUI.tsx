"use client";

import type { FormEvent } from "react";

import { BasicInfoSection } from "../../components/BasicInfoSection";
import { ContentSection } from "../../components/ContentSection";
import { SubmitProgressBar } from "@/shared/components/SubmitProgressBar";
import type { SaleType } from "../../types";

import { NewPricingSection } from "./components/NewPricingSection";
import { NewProductHeader } from "./components/NewProductHeader";

interface NewProductContentUIProps {
  saleType: SaleType;
  pending?: boolean;
  progress?: number;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
}

export function NewProductContentUI({
  saleType,
  pending = false,
  progress = 0,
  onSubmit,
  onCancel,
}: NewProductContentUIProps) {
  const shellDetail = { thumb: "sage" as const, saleType };

  return (
    <form className="flex flex-1 flex-col" onSubmit={onSubmit} noValidate>
      <SubmitProgressBar pending={pending} progress={progress} />

      <NewProductHeader saleType={saleType} pending={pending} onCancel={onCancel} />

      <div className="mx-auto w-full max-w-4xl px-6 py-8">
        <div className="flex flex-col gap-6">
          <BasicInfoSection detail={shellDetail} isDescriptionRequired />
          {saleType === "digital" && <ContentSection saleType={saleType} isRequired />}
          <NewPricingSection />
        </div>
      </div>
    </form>
  );
}
