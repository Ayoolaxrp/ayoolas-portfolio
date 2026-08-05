import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Stat: display a single metric (number + label).
 *
 * Spec: COMPONENTS.md §14.
 * - Number color: text.primary. Optional `accent` variant.
 * - Label color: text.tertiary.
 * - Vertical layout: number on top, label below.
 *
 * Anti-pattern (enforced by docs):
 * - Do not use Stat for fabricated metrics (V1 has none).
 */
export interface StatProps {
  value: React.ReactNode;
  label: string;
  variant?: "default" | "accent";
  className?: string;
}

export const Stat: React.FC<StatProps> = ({
  value,
  label,
  variant = "default",
  className,
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <div
      className={cn(
        "text-display-md",
        variant === "accent" ? "text-accent" : "text-text-primary",
      )}
    >
      {value}
    </div>
    <div className="text-body-sm text-text-tertiary">{label}</div>
  </div>
);

Stat.displayName = "Stat";
