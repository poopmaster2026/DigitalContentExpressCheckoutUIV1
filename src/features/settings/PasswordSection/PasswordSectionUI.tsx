"use client";

import { Eye, EyeOff, Loader2 } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";

import type { PasswordFormValues } from "../types/validation";

const INPUT_CLASS = "h-11 px-4 text-base focus-visible:ring-1";

interface PasswordSectionUIProps {
  pending: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function PasswordSectionUI({ pending, onSubmit }: PasswordSectionUIProps) {
  const { control, formState: { isValid, isDirty } } = useFormContext<PasswordFormValues>();
  const [show, setShow] = useState({ current: false, new: false, confirm: false });

  return (
    <form onSubmit={onSubmit} noValidate>
      <section className="rounded-xl border border-border bg-card p-6 shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-medium text-card-foreground">パスワード</h2>
          <Button
            type="submit"
            disabled={pending || !isValid || !isDirty}
            className="bg-cta px-6 text-white hover:bg-cta-hover disabled:opacity-70 gap-2"
          >
            {pending && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
            更新する
          </Button>
        </div>

        <Controller
          control={control}
          name="currentPassword"
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Label className="text-sm text-muted-foreground">現在のパスワード</Label>
              <PasswordInput
                field={field}
                invalid={fieldState.invalid}
                show={show.current}
                onToggle={() => setShow((s) => ({ ...s, current: !s.current }))}
                autoComplete="current-password"
              />
              {fieldState.error?.message && (
                <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <Separator />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="newPassword"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground">新しいパスワード</Label>
                <PasswordInput
                  field={field}
                  invalid={fieldState.invalid}
                  show={show.new}
                  onToggle={() => setShow((s) => ({ ...s, new: !s.new }))}
                  autoComplete="new-password"
                />
                {fieldState.error?.message && (
                  <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field, fieldState }) => (
              <div className="flex flex-col gap-2">
                <Label className="text-sm text-muted-foreground">パスワードの確認</Label>
                <PasswordInput
                  field={field}
                  invalid={fieldState.invalid}
                  show={show.confirm}
                  onToggle={() => setShow((s) => ({ ...s, confirm: !s.confirm }))}
                  autoComplete="new-password"
                />
                {fieldState.error?.message && (
                  <p className="text-sm font-medium text-destructive">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />
        </div>

      </section>
    </form>
  );
}

function PasswordInput({
  field,
  invalid,
  show,
  onToggle,
  autoComplete,
}: {
  field: React.InputHTMLAttributes<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };
  invalid: boolean;
  show: boolean;
  onToggle: () => void;
  autoComplete: string;
}) {
  return (
    <div className="relative">
      <Input
        {...field}
        type={show ? "text" : "password"}
        placeholder="••••••••"
        autoComplete={autoComplete}
        aria-invalid={invalid}
        className={`${INPUT_CLASS} pr-12`}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label={show ? "パスワードを非表示" : "パスワードを表示"}
      >
        {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
      </button>
    </div>
  );
}
