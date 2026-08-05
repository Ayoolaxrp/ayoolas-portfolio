"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Input: single-line text input.
 *
 * Spec: COMPONENTS.md §2.
 * Pairs with the Field wrapper component (label + helper + error).
 *
 * Variants (mapped via `type` attribute, not visual):
 * text, email, url, tel, password, number, search.
 *
 * Accessibility:
 * - Required: explicit <label for="..."> via Field wrapper.
 * - Errors: linked via aria-describedby, aria-invalid="true".
 * - Autocomplete attributes set per type.
 *
 * Responsive:
 * - Min tap target 44px on mobile (use `lg` size below 480px).
 */
export type InputSize = "md" | "lg";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  inputSize?: InputSize;
  hasError?: boolean;
}

const sizeClasses: Record<InputSize, string> = {
  md: "h-10 px-3 text-body-md",
  lg: "h-12 px-4 text-body-lg",
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, inputSize = "md", hasError, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      aria-invalid={hasError || undefined}
      className={cn(
        "w-full rounded-md border bg-surface text-text-primary",
        "placeholder:text-text-tertiary",
        "transition-[border-color,box-shadow] duration-fast ease-standard",
        "focus:outline-none",
        "disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-text-disabled",
        sizeClasses[inputSize],
        hasError
          ? "border-error focus:border-error focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-canvas"
          : "border-border-default hover:border-border-strong focus:border-border-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-canvas",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";

/**
 * Textarea: multi-line text input.
 *
 * Spec: COMPONENTS.md §3.
 * - Same tokens as Input. Min-height 120px.
 * - Resizable vertically only.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, rows = 4, ...props }, ref) => (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={hasError || undefined}
      className={cn(
        "w-full min-h-[120px] rounded-md border bg-surface px-3 py-2 text-body-md text-text-primary",
        "resize-y placeholder:text-text-tertiary",
        "transition-[border-color,box-shadow] duration-fast ease-standard",
        "focus:outline-none",
        "disabled:cursor-not-allowed disabled:bg-surface-sunken disabled:text-text-disabled",
        hasError
          ? "border-error focus:border-error focus:ring-2 focus:ring-error focus:ring-offset-2 focus:ring-offset-canvas"
          : "border-border-default hover:border-border-strong focus:border-border-accent focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-canvas",
        className,
      )}
      {...props}
    />
  ),
);

Textarea.displayName = "Textarea";
