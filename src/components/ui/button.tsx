import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Button — primary call-to-action trigger.
 *
 * Spec: COMPONENTS.md §1.
 * - 4 variants: primary, secondary, ghost, link
 * - 3 sizes: sm (32px), md (40px), lg (48px)
 * - States: default, hover, pressed, disabled, loading, focus
 * - Primary CTA across the site is "Book a Discovery Call" (D-008)
 *
 * Accessibility:
 * - Renders as <button> by default; `asChild` renders as child element (typically <a>).
 * - Loading state announces via aria-busy.
 * - Icon-only buttons MUST have aria-label.
 *
 * Anti-patterns (enforced by docs):
 * - No two primary buttons in the same view.
 * - No layout-shifting hover (no scale transforms on parent).
 */
export const buttonVariants = cva(
  [
    // Base — every button shares this.
    "inline-flex items-center justify-center gap-2",
    "rounded-md font-medium",
    "transition-[background-color,border-color,box-shadow,color] duration-fast ease-standard",
    "select-none whitespace-nowrap",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
    "disabled:cursor-not-allowed disabled:opacity-60",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-accent text-text-inverse",
          "hover:bg-accent-hover",
          "active:bg-accent-pressed active:scale-[0.98]",
          "disabled:bg-subtle disabled:text-text-disabled",
        ].join(" "),
        secondary: [
          "bg-surface text-text-primary border border-border-default",
          "hover:border-border-strong hover:bg-surface-raised",
          "active:scale-[0.98]",
          "disabled:bg-subtle disabled:text-text-disabled",
        ].join(" "),
        ghost: [
          "bg-transparent text-text-primary",
          "hover:bg-subtle",
          "active:scale-[0.98]",
          "disabled:text-text-disabled",
        ].join(" "),
        link: [
          "bg-transparent text-text-link underline-offset-4",
          "hover:text-text-link-hover hover:underline",
          "disabled:text-text-disabled disabled:no-underline",
        ].join(" "),
      },
      size: {
        sm: "h-8 px-3 text-body-sm",
        md: "h-10 px-4 text-body-md",
        lg: "h-12 px-5 text-body-lg",
        icon: "h-10 w-10 p-0",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * When true, the button renders as its child element (e.g. <a>).
   * Useful when the action navigates rather than submits.
   */
  asChild?: boolean;
  /** Shows a spinner and disables interaction. Announces via aria-busy. */
  loading?: boolean;
  /** Leading icon — render as a React node, sized automatically. */
  leadingIcon?: React.ReactNode;
  /** Trailing icon — render as a React node, sized automatically. */
  trailingIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      disabled,
      leadingIcon,
      trailingIcon,
      children,
      type,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        // Slot forwards type; for native <button>, default to "button".
        type={asChild ? undefined : (type ?? "button")}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        {...props}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" aria-hidden />
            <span className="sr-only">Loading</span>
            {children}
          </>
        ) : (
          <>
            {leadingIcon}
            {children}
            {trailingIcon}
          </>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";
