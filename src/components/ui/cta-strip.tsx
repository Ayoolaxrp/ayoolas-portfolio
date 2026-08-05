import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Container } from "./container";
import { Heading } from "./heading";
import { CONTACT_ROUTE, PRIMARY_CTA_LABEL } from "@/config/site.config";

/**
 * CTAStrip: bottom-of-page call-to-action. Repeats the primary conversion goal.
 *
 * Spec: COMPONENTS.md §13.
 * - Padding: space.16 vertical.
 * - Headline: text.h2. Subhead: text.body.lg.
 * - CTA: Button primary lg.
 *
 * Variants:
 * - default: surface bg.
 * - accent: accent.primarySoft bg with border.accent.
 *
 * Per D-008 the primary CTA label is exact.
 */
export type CTAStripVariant = "default" | "accent";

export interface CTAStripProps {
  /** Headline (typically the outcome statement). */
  headline: React.ReactNode;
  /** Subhead below the headline. */
  subhead?: React.ReactNode;
  /** CTA label: defaults to "Book a Discovery Call" (D-008). */
  ctaLabel?: string;
  /** CTA href: defaults to /contact. */
  ctaHref?: string;
  /** Visual variant. */
  variant?: CTAStripVariant;
  /** Optional: hide the secondary "Learn more" link. */
  hideSecondary?: boolean;
  /** Optional: secondary link target + label. */
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

const variantClasses: Record<CTAStripVariant, string> = {
  default: "bg-surface",
  accent: "bg-accent-soft border-y border-accent-border",
};

export const CTAStrip: React.FC<CTAStripProps> = ({
  headline,
  subhead,
  ctaLabel = PRIMARY_CTA_LABEL,
  ctaHref = CONTACT_ROUTE,
  variant = "default",
  hideSecondary = false,
  secondaryLabel,
  secondaryHref,
  className,
}) => (
  <section
    className={cn(variantClasses[variant], "py-20 md:py-28", className)}
    aria-labelledby="cta-strip-heading"
  >
    <Container>
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="flex flex-col gap-3 md:max-w-2xl">
          <Heading as="h2" id="cta-strip-heading" variant="h2">
            {headline}
          </Heading>
          {subhead && (
            <p className="text-body-lg text-text-secondary">{subhead}</p>
          )}
        </div>

        <div className="flex flex-col items-start gap-3 md:items-end">
          <Button
            asChild
            size="lg"
            variant="primary"
            className="w-full md:w-auto"
          >
            <Link href={ctaHref}>
              {ctaLabel}
              <ArrowRight className="ml-1" />
            </Link>
          </Button>
          {!hideSecondary && secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="text-body-sm text-text-link underline-offset-4 hover:text-text-link-hover hover:underline"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </Container>
  </section>
);

CTAStrip.displayName = "CTAStrip";
