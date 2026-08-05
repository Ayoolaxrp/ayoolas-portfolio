"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Input, Textarea } from "./input";

/**
 * Field: wrapper that pairs a label, control, helper, and error message.
 *
 * Accessibility:
 * - Label is required (`<label for>` via `htmlFor`).
 * - Error message linked via `aria-describedby`.
 * - `aria-invalid` is set on the control when in error state.
 *
 * Composition:
 * <Field label="Email" error={errors.email?.message}>
 *   <Input id="email" {...register("email")} />
 * </Field>
 */
export interface FieldProps {
  /** Label text. Required for accessibility. */
  label: string;
  /** Optional helper text shown below the input. */
  helper?: string;
  /** Error message: also sets aria-invalid on the control. */
  error?: string;
  /** Field id: used to wire `htmlFor` on the label. */
  id: string;
  /** Marks the field as required visually and for assistive tech. */
  required?: boolean;
  /** Optional className for the wrapper. */
  className?: string;
  /** Render-prop receives ids the child control should use. */
  children: (controlProps: {
    id: string;
    "aria-describedby": string | undefined;
    "aria-invalid": boolean | undefined;
    hasError: boolean;
  }) => React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  label,
  helper,
  error,
  id,
  required,
  className,
  children,
}) => {
  const reactId = React.useId();
  const finalId = id ?? reactId;
  const helperId = `${finalId}-helper`;
  const errorId = `${finalId}-error`;
  const describedBy =
    [error ? errorId : null, helper ? helperId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={finalId}
        className="text-body-sm font-medium text-text-primary"
      >
        {label}
        {required && (
          <span aria-hidden className="ml-1 text-error">
            *
          </span>
        )}
      </label>

      {children({
        id: finalId,
        "aria-describedby": describedBy,
        "aria-invalid": hasError || undefined,
        hasError,
      })}

      {helper && !error && (
        <p id={helperId} className="text-body-sm text-text-tertiary">
          {helper}
        </p>
      )}

      {error && (
        <p id={errorId} role="alert" className="text-body-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
};

/**
 * Convenience wrappers: pre-compose Field + Input / Textarea.
 */
export interface InputFieldProps extends Omit<FieldProps, "children"> {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  as?: "input" | "textarea";
}

export const InputField: React.FC<InputFieldProps> = ({
  as = "input",
  inputProps,
  textareaProps,
  ...field
}) => (
  <Field {...field}>
    {(control) =>
      as === "textarea" ? (
        <Textarea {...textareaProps} {...control} />
      ) : (
        <Input {...inputProps} {...control} />
      )
    }
  </Field>
);

InputField.displayName = "InputField";
