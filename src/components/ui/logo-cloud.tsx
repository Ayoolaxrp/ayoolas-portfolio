import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * LogoCloud — row of client/partner/tool logos.
 *
 * Spec: COMPONENTS.md §15.
 * - Horizontal row, wraps on mobile.
 * - Logos rendered at uniform height (32px), grayscale filter applied.
 * - Spacing: space.8 between logos.
 * - States: default (visible), hidden (does not render — used in V1).
 *
 * Per BRAND §6 / D-006: no real logos exist in V1, so this renders nothing.
 * The component is shipped so future client work can be added without refactor.
 */
export interface LogoCloudProps {
  heading?: string;
  /** When true, renders nothing. Per D-006. */
  hidden?: boolean;
  className?: string;
}

export const LogoCloud: React.FC<LogoCloudProps> = ({
  heading,
  hidden = true,
  className,
}) => {
  if (hidden) return null;

  return (
    <section className={cn("py-12", className)}>
      {heading && (
        <p className="eyebrow mb-6 text-center text-text-tertiary">{heading}</p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-8">
        {/* Logos are intentionally not rendered — no real logos in V1. */}
      </div>
    </section>
  );
};

LogoCloud.displayName = "LogoCloud";
