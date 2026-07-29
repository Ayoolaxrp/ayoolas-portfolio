import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Internal business systems — ${SITE_NAME_LONG}`,
  description:
    "Software designed for how your team actually works. Service detail built in Phase 4.4.",
};

export default function InternalBusinessSystemsPage() {
  return (
    <PageShell
      eyebrow="SERVICES · INTERNAL BUSINESS SYSTEMS"
      title="Software designed for how your team actually works."
      description="The detail page is built in Phase 4.4. It will follow the messaging hierarchy strictly — outcome first, technology last."
      upcoming={[
        "Hero with headline + audience",
        "Who is this for?",
        "What problem does it solve?",
        "How does the engagement work?",
        "What does the client receive?",
        "What outcomes should they expect?",
        "Service-specific FAQ",
        "CTA strip",
      ]}
    />
  );
}
