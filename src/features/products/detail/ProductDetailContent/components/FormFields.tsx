"use client";

import { NumberField } from "@react-spectrum/s2/NumberField";
import { style } from "@react-spectrum/s2/style" with { type: "macro" };
import { Switch } from "@react-spectrum/s2/Switch";
import { TextArea } from "@react-spectrum/s2/TextArea";
import { TextField } from "@react-spectrum/s2/TextField";
import type { ReactNode } from "react";
import { Controller, useFormContext } from "react-hook-form";

import type { ProductFormValues } from "../../../types/validation";

// フォーム幅（maxWidth 640）の中で各フィールドを全幅に伸ばす
const fieldStyle = style({ width: "full" });

type StringField = "name" | "description";
type BoolField = "isFree" | "published";

/** react-hook-form Controller × S2 TextField。 */
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
        <TextField
          label={label}
          isRequired={isRequired}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          styles={fieldStyle}
        />
      )}
    />
  );
}

/** react-hook-form Controller × S2 TextArea。 */
export function TextAreaControl({
  name,
  label,
}: {
  name: StringField;
  label: string;
}) {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextArea
          label={label}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          styles={fieldStyle}
        />
      )}
    />
  );
}

/** react-hook-form Controller × S2 NumberField。 */
export function NumberFieldControl({
  name,
  label,
  isRequired,
  isDisabled,
  minValue,
  formatOptions,
}: {
  name: "price";
  label: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  minValue?: number;
  formatOptions?: Intl.NumberFormatOptions;
}) {
  const { control } = useFormContext<ProductFormValues>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <NumberField
          label={label}
          isRequired={isRequired}
          isDisabled={isDisabled}
          minValue={minValue}
          formatOptions={formatOptions}
          value={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
          isInvalid={fieldState.invalid}
          errorMessage={fieldState.error?.message}
          styles={fieldStyle}
        />
      )}
    />
  );
}

/** react-hook-form Controller × S2 Switch。 */
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
        <Switch
          isSelected={field.value}
          onChange={field.onChange}
          onBlur={field.onBlur}
          name={field.name}
        >
          {children}
        </Switch>
      )}
    />
  );
}
