"use client";

import type { ReactNode } from "react";
import { useState } from "react";
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
  minValue?: number;
}

function PriceInputField({
  field,
  fieldState,
  id,
  label,
  isRequired,
  isDisabled,
  minValue,
}: PriceInputFieldProps) {
  const [display, setDisplay] = useState<string>(
    field.value ? formatWithCommas(field.value) : ""
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    // 先頭の余分なゼロを除去
    const normalized = raw.replace(/^0+(\d)/, "$1");
    setDisplay(normalized === "" ? "" : formatWithCommas(Number(normalized)));
    if (normalized === "") {
      // 空のまま表示を維持し、フォームには 0 を保持（blur 時に確定）
      return;
    }
    const num = Number(normalized);
    if (minValue !== undefined && num < minValue) return;
    field.onChange(num);
  }

  function handleBlur() {
    field.onBlur();
    // フォーカスを外したとき、空なら 0 に確定してフォームに反映
    if (display === "") {
      field.onChange(0);
      setDisplay("");
    } else {
      setDisplay(formatWithCommas(field.value ?? 0));
    }
  }

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
          aria-invalid={fieldState.invalid}
          className={cn("pl-7", fieldState.invalid && "border-destructive")}
        />
      </div>
      {fieldState.error?.message && (
        <p className="text-xs text-destructive">{fieldState.error.message}</p>
      )}
    </div>
  );
}

export function NumberFieldControl({
  name,
  label,
  isRequired,
  isDisabled,
  minValue,
}: {
  name: "price";
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  minValue?: number;
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
          minValue={minValue}
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
