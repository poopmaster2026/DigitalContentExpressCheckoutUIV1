"use client";

import { FormProvider } from "react-hook-form";
import { toast } from "sonner";

import { SubmitProgressBar } from "@/shared/components/SubmitProgressBar";
import { useSubmitProgress } from "@/shared/hooks/useSubmitProgress";

import { updateProfile } from "../api";

import { useProfileForm } from "./hooks/useProfileForm";
import { ProfileSectionUI } from "./ProfileSectionUI";

export function ProfileSection() {
  const methods = useProfileForm();
  const { pending, progress, run } = useSubmitProgress();

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await run(async (onProgress) => {
        onProgress(40);
        await updateProfile(data); // TODO: BE - replace mock with real API
        onProgress(100);
      });
      toast.success("プロフィールを更新しました");
      methods.reset(data);
    } catch {
      toast.error("更新に失敗しました");
    }
  });

  return (
    <FormProvider {...methods}>
      <SubmitProgressBar pending={pending} progress={progress} />
      <ProfileSectionUI pending={pending} onSubmit={onSubmit} />
    </FormProvider>
  );
}
