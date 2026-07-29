import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `AI assistants & dashboards — ${SITE_NAME_LONG}`,
  description:
    "Answers and insights drawn from your business data. Service detail built in Phase 4.4.",
};

export default function AIAssistantsDashboardsPage() {
  return (
    <PageShell
      eyebrow="SERVICES · AI ASSISTANTS & DASHBOARDS"
      title="Answers and insights drawn from your business data."
      description="The detail page is built in Phase 4.4. AI is mentioned only where it specifically makes the system work — never as the lead."
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
