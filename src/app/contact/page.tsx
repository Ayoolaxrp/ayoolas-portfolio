import type { Metadata } from "next";

import { PageShell } from "@/components/chrome/page-shell";
import { SITE_NAME_LONG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `Contact — ${SITE_NAME_LONG}`,
  description:
    "Let's talk about your operations. The contact page is built in Phase 4.4 with calendar embed + form.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="CONTACT"
      title="Let's talk about your operations."
      description="The contact page is built in Phase 4.4. It will host a calendar embed (Cal.com by default — swap later) and a non-booking contact form."
      upcoming={[
        "Hero — headline + subhead",
        "Two-column layout — calendar embed (left) + contact form (right)",
        "Direct contact — email, LinkedIn, GitHub",
        "'What happens next' — 2-3 sentences describing what to expect",
      ]}
    />
  );
}
