import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `About — ${SITE_NAME_LONG}`,
  description:
    "A technology partner who thinks in systems, not features. The about page is built in Phase 4.4.",
};

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="ABOUT"
      title="A technology partner who thinks in systems, not features."
      description="The About page is built in Phase 4.4. It will expand on the founder's approach — systems thinking, long-term orientation, plain language — rather than biography."
      upcoming={[
        "Hero with founder name + one-line tagline",
        "My Story (one paragraph)",
        "How I Think (the largest section)",
        "How I Solve Problems (Observe → Define → Design → Build)",
        "How I Work With Clients",
        "Mission & Vision (two-column)",
        "Photo placeholder",
        "CTA strip — 'Want to talk about your operations?'",
      ]}
    />
  );
}
