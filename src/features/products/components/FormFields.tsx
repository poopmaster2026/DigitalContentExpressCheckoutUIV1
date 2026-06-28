"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";

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
  const { field, fieldState } = useController({ control, name });

  const [editing, setEditing] = useState(false);
  const [rawText, setRawText] = useState("");
  const [inputError, setInputError] = useState("");

  const display = editing ? rawText : formatWithCommas(field.value);
  const errorMessage = inputError || fieldState.error?.message;
  const isInvalid = !!inputError || fieldState.invalid;

  function handleFocus() {
    setEditing(true);
    setRawText(field.value ? String(field.value) : "");
  }

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
    setRawText(raw);
    field.onChange(raw === "" ? 0 : Number(raw));
  }

  function handleBlur() {
    setEditing(false);
    setInputError("");
    field.onBlur();
  }

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={name}>
        {label}
        {isRequired && <span className="ml-1 text-destructive">*</span>}
      </Label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          ¥
        </span>
        <Input
          id={name}
          type="text"
          inputMode="numeric"
          disabled={isDisabled}
          value={display}
          onFocus={handleFocus}
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
