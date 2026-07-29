import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `${SITE_NAME_LONG} — Same team. More output. Less friction.`,
  description:
    "We help growing businesses do more with the team they already have by designing automation, custom software, and AI systems that remove operational friction.",
};

export default function HomePage() {
  return (
    <PageShell
      eyebrow="HOME"
      title="Same team. More output. Less friction."
      description="The Elion homepage is built in Phase 4.3. The application shell — design tokens, navigation, footer, and layout — is already in place."
      upcoming={[
        "Hero with eyebrow, headline, subhead, and primary CTA",
        "Business problems grid (4 specific pains)",
        "Our approach — 3-step Discover · Design · Build",
        "Primary services — 3 service cards",
        "Our principles — 6 operating principles",
        "How we work — engagement timeline",
        "Featured projects — 3 labelled-honestly project cards",
        "Technology stack — 6 categorised categories",
        "Why work with us — 6 differentiators",
        "Who we work with — qualification (positive + negative)",
        "FAQ — 7 questions, pricing routes to Book a Discovery Call",
        "CTA strip + footer (already shipped)",
      ]}
    />
  );
}
