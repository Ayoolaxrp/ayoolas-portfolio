import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Workflow automation — ${SITE_NAME_LONG}`,
  description:
    "Remove the repetitive work your team shouldn't be doing. Service detail built in Phase 4.4.",
};

export default function WorkflowAutomationPage() {
  return (
    <PageShell
      eyebrow="SERVICES · WORKFLOW AUTOMATION"
      title="Remove the repetitive work your team shouldn't be doing."
      description="The detail page is built in Phase 4.4. It will follow the messaging hierarchy strictly — outcome first, technology last."
      upcoming={[
        "Hero with headline + audience",
        "Who is this for? — specific audience",
        "What problem does it solve? — 2-3 pains",
        "How does the engagement work? — 3-4 steps",
        "What does the client receive? — concrete deliverables",
        "What outcomes should they expect?",
        "Service-specific FAQ (pricing routes to Book a Discovery Call)",
        "CTA strip",
      ]}
    />
  );
}
