"use client";

import type { FormEvent } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { Loader2, User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";

import { AVATAR_ACCEPTED_TYPES } from "../types/validation";
import type { ProfileFormValues } from "../types/validation";

const INPUT_CLASS = "h-11 px-4 text-base focus-visible:ring-1";

interface ProfileSectionUIProps {
  pending: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function ProfileSectionUI({ pending, onSubmit }: ProfileSectionUIProps) {
  const { control, setValue, trigger, formState: { isValid, isDirty, errors } } = useFormContext<ProfileFormValues>();
  const avatarImage = useWatch({ control, name: "avatarImage" });

  const handleAvatarChange = (file: File) => {
    setValue(
      "avatarImage",
      { url: URL.createObjectURL(file), file },
      { shouldDirty: true }
    );
    trigger("avatarImage");
  };

  const avatarError = (errors.avatarImage as { message?: string } | undefined)?.message;

  return (
    <form onSubmit={onSubmit} noValidate>
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-card-foreground">プロフィール</h2>
          <Button
            type="submit"
            disabled={pending || !isValid || !isDirty}
            className="bg-cta px-6 text-white hover:bg-cta-hover disabled:opacity-70 gap-2"
          >
            {pending && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
            更新する
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground">氏名</Label>
                <Input {...field} autoComplete="name" className={INPUT_CLASS} aria-invalid={fieldState.invalid} />
                {fieldState.error?.message && (
                  <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground">ユーザー名</Label>
                <Input {...field} autoComplete="username" className={INPUT_CLASS} aria-invalid={fieldState.invalid} />
                {fieldState.error?.message && (
                  <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-muted-foreground">メールアドレス</Label>
              <Input {...field} type="email" autoComplete="email" className={INPUT_CLASS} aria-invalid={fieldState.invalid} />
              {fieldState.error?.message && (
                <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        {/* アバター + 更新ボタン */}
        <div className="flex flex-col gap-2">
          <Label>プロフィール画像</Label>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 shrink-0">
              <AvatarImage src={avatarImage?.url ?? undefined} alt="プロフィール画像" />
              <AvatarFallback className="bg-muted text-muted-foreground">
                <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-2">
              <label>
                <Button variant="outline" size="sm" asChild>
                  <span className="cursor-pointer">
                    画像を変更
                    <input
                      type="file"
                      accept={AVATAR_ACCEPTED_TYPES.join(",")}
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleAvatarChange(file);
                      }}
                    />
                  </span>
                </Button>
              </label>
              <p className="text-xs text-muted-foreground">JPG・PNG・WebP・GIF（最大2MB）</p>
              {avatarError && (
                <p className="text-xs text-destructive">{avatarError}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
