"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Switch } from "@/shared/components/ui/switch";
import { Textarea } from "@/shared/components/ui/textarea";

import type { ProductFormValues } from "../types/validation";

type StringField = "name" | "description";
type BoolField = "isFree" | "published";

export function TextFieldControl({
  name,
  label,
  isRequired,
}: {
  name: StringField;
  label: string;
  isRequired?: boolean;
}) {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={name}>
            {label}
            {isRequired && <span className="ml-1 text-destructive">*</span>}
          </Label>
          <Input
            id={name}
            {...field}
            autoComplete="off"
            aria-invalid={fieldState.invalid}
            className={cn(fieldState.invalid && "border-destructive")}
          />
          {fieldState.error?.message && (
            <p className="text-xs text-destructive">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}

export function TextAreaControl({
  name,
  label,
  isRequired,
}: {
  name: StringField;
  label: string;
  isRequired?: boolean;
}) {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={name}>
            {label}
            {isRequired && <span className="ml-1 text-destructive">*</span>}
          </Label>
          <Textarea
            id={name}
            {...field}
            rows={4}
            autoComplete="off"
            aria-invalid={fieldState.invalid}
            className={cn(fieldState.invalid && "border-destructive")}
          />
          {fieldState.error?.message && (
            <p className="text-xs text-destructive">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}

function formatWithCommas(value: number | null | undefined): string {
  if (value === null || value === undefined) return "";
  return value.toLocaleString("ja-JP");
}


interface PriceInputFieldProps {
  field: {
    value: number | null | undefined;
    onChange: (v: number) => void;
    onBlur: () => void;
    name: string;
  };
  fieldState: { invalid: boolean; error?: { message?: string } };
  id: string;
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}

function PriceInputField({
  field,
  fieldState,
  id,
  label,
  isRequired,
  isDisabled,
}: PriceInputFieldProps) {
  const [display, setDisplay] = useState<string>(
    field.value ? formatWithCommas(field.value) : ""
  );
  // 半角数字チェックはUI上の入力正規化なのでローカル state で管理
  // (setError はフォーム全体の状態を書き換えるため Controller の render 内では使わない)
  const [inputError, setInputError] = useState<string>("");

  // フォームが外部からリセットされた場合（detail 画面の初期ロード等）に display を同期する
  useEffect(() => {
    setDisplay(field.value ? formatWithCommas(field.value) : "");
  }, [field.value]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const halfWidth = e.target.value.replace(/[０-９]/g, (c) =>
      String.fromCharCode(c.charCodeAt(0) - 0xfee0)
    );
    if (/[^0-9,]/.test(halfWidth)) {
      setInputError("半角数字で入力してください");
      return;
    }
    setInputError("");
    const raw = halfWidth.replace(/,/g, "").replace(/^0+(\d)/, "$1");
    setDisplay(raw === "" ? "" : formatWithCommas(Number(raw)));
    field.onChange(raw === "" ? 0 : Number(raw));
  }

  function handleBlur() {
    field.onBlur();
    if (display !== "") setDisplay(formatWithCommas(field.value ?? 0));
  }

  const errorMessage = inputError || fieldState.error?.message;
  const isInvalid = !!inputError || fieldState.invalid;

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id}>
        {label}
        {isRequired && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          ¥
        </span>
        <Input
          id={id}
          type="text"
          inputMode="numeric"
          disabled={isDisabled}
          value={display}
          onChange={handleChange}
          onBlur={handleBlur}
          name={field.name}
          aria-invalid={isInvalid}
          className={cn("pl-7", isInvalid && "border-destructive")}
        />
      </div>
      {errorMessage && (
        <p className="text-xs text-destructive">{errorMessage}</p>
      )}
    </div>
  );
}

export function NumberFieldControl({
  name,
  label,
  isRequired,
  isDisabled,
}: {
  name: "price";
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
}) {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <PriceInputField
          field={field}
          fieldState={fieldState}
          id={name}
          label={label}
          isRequired={isRequired}
          isDisabled={isDisabled}
        />
      )}
    />
  );
}

export function SwitchControl({
  name,
  children,
}: {
  name: BoolField;
  children: ReactNode;
}) {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className="flex items-center gap-3">
          <Switch
            id={name}
            checked={field.value}
            onCheckedChange={field.onChange}
            name={field.name}
          />
          <Label htmlFor={name} className="cursor-pointer font-normal">
            {children}
          </Label>
        </div>
      )}
    />
  );
}
