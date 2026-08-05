import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Badge: compact label for status, category, or metadata.
 *
 * Spec: COMPONENTS.md §11.
 * - ≤ 1 word ideally. For multi-word labels, the same component handles them.
 * - Variants: default, accent, success, warning, error, info.
 *
 * Usage rule:
 * - Don't use Badge as a button. If clickable, wrap in <a> or <button>.
 */
export const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "rounded-sm px-2 py-0.5",
    "text-caption",
    "font-medium uppercase",
    "border",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-surface text-text-secondary border-border-default",
        accent: "bg-accent-soft text-accent border-accent-border",
        success: "bg-success-soft text-success border-transparent",
        warning: "bg-warning-soft text-warning border-transparent",
        error: "bg-error-soft text-error border-transparent",
        info: "bg-info-soft text-info border-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  ),
);

Badge.displayName = "Badge";

/**
 * Tag: larger variant of Badge, for multi-word labels.
 * Same variants, larger padding.
 */
export const tagVariants = cva(
  [
    "inline-flex items-center gap-2 rounded-md px-3 py-1 text-body-sm border",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-surface text-text-secondary border-border-default",
        accent: "bg-accent-soft text-accent border-accent-border",
        success: "bg-success-soft text-success border-transparent",
        warning: "bg-warning-soft text-warning border-transparent",
        error: "bg-error-soft text-error border-transparent",
        info: "bg-info-soft text-info border-transparent",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface TagProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof tagVariants> {}

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(tagVariants({ variant }), className)}
      {...props}
    />
  ),
);

Tag.displayName = "Tag";
