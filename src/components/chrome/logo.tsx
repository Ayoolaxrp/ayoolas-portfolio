import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/config/site.config";

/**
 * Logo: wordmark only (BRAND §7).
 *
 * Variants:
 * - default: Inter Semi Bold, natural case ("Awodeyi Ayoolamikun"),
 *   tight letter-spacing.
 * - mono: Inter, all uppercase, wider letter-spacing (for tight contexts).
 *
 * Color: text.primary.
 * Never rotates, never placed on busy imagery, no tagline.
 */
export interface LogoProps {
  variant?: "default" | "mono";
  href?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
} as const;

export const Logo: React.FC<LogoProps> = ({
  variant = "default",
  href = "/",
  size = "md",
  className,
}) => {
  const inner = (
    <span
      className={cn(
        "font-semibold text-text-primary",
        variant === "default" ? "tracking-tight" : "tracking-widest uppercase",
        sizeClasses[size],
        className,
      )}
      aria-label={`${SITE_NAME} home`}
    >
      {SITE_NAME}
    </span>
  );

  if (!href) return inner;

  return (
    <Link href={href} className="inline-flex">
      {inner}
    </Link>
  );
};

Logo.displayName = "Logo";
