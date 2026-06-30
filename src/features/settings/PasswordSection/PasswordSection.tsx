"use client";

import { FormProvider } from "react-hook-form";
import { toast } from "sonner";

import { SubmitProgressBar } from "@/shared/components/SubmitProgressBar";
import { useSubmitProgress } from "@/shared/hooks/useSubmitProgress";

import { updatePassword } from "../api";

import { usePasswordForm } from "./hooks/usePasswordForm";
import { PasswordSectionUI } from "./PasswordSectionUI";

export function PasswordSection() {
  const methods = usePasswordForm();
  const { pending, progress, run } = useSubmitProgress();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await run(async (onProgress) => {
        onProgress(40);
        await updatePassword(data); // TODO: BE - replace mock with real API
        onProgress(100);
      });
      toast.success("パスワードを更新しました");
      methods.reset();
    } catch {
      toast.error("更新に失敗しました");
    }
  });

  return (
    <FormProvider {...methods}>
      <SubmitProgressBar pending={pending} progress={progress} />
      <PasswordSectionUI pending={pending} onSubmit={onSubmit} />
    </FormProvider>
  );
}
