# Elion : Decision Log

> Running log of every significant design / engineering decision. Newest first.
> Format: `D-NNN | YYYY-MM-DD | Title | Status`

---

## D-014 | 2026-07-24 | Messaging hierarchy: business problem → outcome → solution → technology → next step

**Decision:** Every section, paragraph, and headline in the site follows this five-step hierarchy:

1. **Business problem**: name the visitor's pain first.
2. **Operational outcome**: what changes when the pain goes away.
3. **Solution**: what Elion actually does.
4. **Technology**: only after the value is clear; briefly, supporting the story.
5. **Next step**: the CTA.

Technology supports the story. It never leads it.

**Reasoning:** Visitors who land on the site want to know what they _get_ before they care _how_ it's built. AI-led copy reads as "an AI agency": which Elion is not. Visitors who want a long-term technology partner will be reassured by outcome-led copy; visitors who want a chatbot vendor will scroll past, which is the right outcome.

This hierarchy also operationalises the brief's "outcome-first" mandate. It removes a class of copy debates: any sentence that mentions technology before the value has already lost.

**Alternatives considered:**

- Reverse hierarchy (technology first): rejected: leads with the wrong signal.
- No fixed hierarchy, decide per section: rejected: invites inconsistency.

**Trade-offs:** Some sections need technology mentioned early because the visitor asked a tech question (e.g. "What stack do you use?"). The hierarchy is the _default_, not a hard rule: exceptions are allowed when the visitor's question requires it.

**Future implications:** The "words to avoid" table in COPY_GUIDELINES.md expands: AI / artificial-intelligence / machine-learning terms get used sparingly. "Systems," "operations," "workflows," "business processes," "software" become the default vocabulary.

**Status:** Approved.

---

## D-013 | 2026-07-24 | Use "growing businesses" : not "operations-heavy businesses": as the audience anchor

**Decision:** Public-facing copy refers to the audience as **"growing businesses"** rather than "operations-heavy businesses" or any narrower label.

**Reasoning:** The ideal clients (professional service firms, HR consultancies, recruitment agencies, schools, healthcare providers, logistics, SMEs) experience operational friction but most wouldn't self-identify with a narrow label like "operations-heavy." A wider label that still implies friction (because they're growing, the friction shows) reads as more inclusive without losing specificity.

**Alternatives considered:**

- "Operations-heavy businesses": rejected: over-narrows; many ideal clients don't self-identify this way.
- "SMEs": rejected: too vague; doesn't imply friction.
- "Growing businesses" (chosen): implies friction through the growth problem without excluding non-operations businesses.

**Trade-offs:** Wider net may attract less-ideal prospects. Mitigated by D-010 (Who We're Not a Good Fit For) and D-011 (Our Principles).

**Future implications:** Every audience reference across copy and UX should use this language unless the section explicitly discusses operations.

**Status:** Approved.

---

## D-012 | 2026-07-24 | Reserved navigation capacity for future product offerings

**Decision:** The site architecture (and a deliberate whitespace in the nav) reserves capacity for product offerings (SaaS, tools, internal platforms) that ship in future phases. V1 does not ship products; the architecture does not pretend to.

**Reasoning:** The brief is explicit that Elion intends to become a technology company with products, not only a service business. Communicating this through the site's structure: without inventing product pages or fake product copy: sets the right expectation for the kind of partner Elion will become.

**Implementation:**

- Primary nav today: Home / About / Services / Projects / Contact (5 items).
- A subtle signal in the footer ("A technology company building systems for growing businesses") anchors the long-term positioning without claiming products that don't exist.
- The Services taxonomy is structured to grow: today's three hero services + eight secondary capabilities become expandable categories when SaaS / tools ship.
- The `/projects` surface is engineered to host both case studies (services work) and product write-ups (future products) without restructuring.

**Alternatives considered:**

- Add a "Products" nav item now with a "Coming soon" placeholder: rejected: implies the placeholder is a product page, which is dishonest.
- Add a "What's next" / roadmap page: rejected: premature; revisit when there's a real roadmap to share.
- Communicate the intent only in the About page: rejected: too quiet; the intent is structural, not just tonal.

**Trade-offs:** A footer line about being a "technology company" without shipped products could be read as overreach. Mitigated by what the site _doesn't_ claim: no product pages, no "coming soon" sections.

**Future implications:** When products ship, the nav gains a "Products" item and the Services taxonomy gets refactored. No redesign needed; the structural capacity is already there.

**Status:** Approved.

---

## D-011 | 2026-07-24 | "Our Principles" section introduced : operating principles, not values

**Decision:** A new homepage section **"Our Principles"** explains how Elion approaches automation and software design. The principles are operational and falsifiable: anyone can read them and tell whether a real engagement would honour them.

**Reasoning:** Generic company values ("integrity", "excellence") are noise. Visitors evaluating a technology partner want to know what working with Elion actually looks like. Operating principles (e.g. "we don't deploy systems we wouldn't hand over the keys to," "we design for your team to maintain what we build") are credible because they constrain behaviour in observable ways.

**Six principles (V1):**

1. **Build for handover.** Every system is documented and designed so your team can run it without us.
2. **Show the architecture before we build.** You see what we'd build and what the engagement involves before any work starts.
3. **Plain language in every conversation.** No jargon, no overpromising, no buzzword reports.
4. **Reject work that won't pay off.** If an automation won't actually save your team time, we say so.
5. **You own everything we build.** No vendor lock-in. No proprietary black boxes.
6. **Systems age well.** We optimise for the system being maintainable in year three, not impressive in week one.

**Alternatives considered:**

- Three values (standard corporate shortlist): rejected: too few to be useful.
- Twelve values (aspirational long list): rejected: unmoored from observable behaviour.

**Trade-offs:** Principles that constrain behaviour also constrain sales: if a prospect wants something the principles forbid, they won't convert. Acceptable: the right prospects will respect the constraints.

**Future implications:** Each principle is checked against real engagements. If we ship work that violates one, the principle is wrong, not the engagement.

**Status:** Approved.

---

## D-010 | 2026-07-24 | "Who We Work With" / "Who We're Not a Good Fit For" sections introduced

**Decision:** A new homepage section pairing **"Who We Work With"** (positive qualification) with **"Who We're Not a Good Fit For"** (negative qualification). Together they qualify leads rather than appeal to everyone.

**Reasoning:** Trying to appeal to everyone reads as appealing to no one. Honest qualification: naming the kinds of teams Elion works well with, and naming the kinds of teams that should look elsewhere: is a credibility signal. It says "we know what we're for."

**Positive list (Who We Work With):** Teams of 5-100 with manual, repetitive work that they've outgrown but can't replace without help. Examples (not exhaustive): recruitment agencies, HR consultancies, professional service firms, schools, healthcare providers, logistics companies, growing SMEs. These teams share three traits: leadership that cares about operations, internal data that lives in spreadsheets, and a willingness to invest 2-8 weeks to fix the underlying system.

**Negative list (Who We're Not a Good Fit For):**

- Companies that want a chatbot on their homepage and nothing else.
- Teams that need a marketing site or a redesign.
- Projects where the brief is "build me an app like [consumer product]" with no operational context.
- Engagements scoped under $2,500: the work wouldn't pay off.
- Companies looking for a fully-managed BPO partner.

**Alternatives considered:**

- Positive list only: rejected: half the credibility.
- A single "Who we work with" sentence: rejected: too quiet; the dual list is the point.

**Trade-offs:** Some prospects will disqualify themselves. Acceptable: those prospects are not the right fit, and the ones who stay convert better.

**Future implications:** As engagements diversify, the lists update. The format stays the same.

**Status:** Approved.

---

## D-009 | 2026-07-24 | No references to internal AI tooling or Polsia in public copy

**Decision:** Polsia (the internal AI COO) and any other internal AI tooling are invisible to the public. Public-facing copy (BRAND.md references, marketing site, About page, social, any external surface) does not name Polsia, does not refer to "internal AI tooling," and does not hint that AI is used internally to design the work. Visitors judge Elion by outcomes, not by how the work is organised internally.

**Reasoning:**

- The visitor cares about the result, not the process. Mentioning internal AI tooling implies the work would be different (worse?) without it: which is the opposite of the message we want.
- "We use AI to design AI" is a credibility claim that only lands with a small audience. The broader audience reads it as deflection: "they want credit for using a tool, not for the result."
- Naming internal tools publicly commits to supporting them publicly: versioning, changelogs, security disclosures: which is not a current objective.
- The brief explicitly says Polsia is internal. The constraint was originally about Polsia's name; the user's refinement on 2026-07-24 extended it to all internal-AI-tooling references.

**What this means in practice:**

- ❌ "We use AI internally to design these systems for you."
- ❌ "Our internal AI tooling informs every decision."
- ❌ Any sentence that mentions internal AI process.
- ✅ Just deliver the work. Let the visitor judge by outcomes.

**Alternatives considered:**

- Name Polsia as a "Powered by" or tagline: rejected: turns an internal tool into a public commitment.
- Mention Polsia in a founders' note on the About page: rejected: same problem.
- Refer to "internal AI tooling" without naming Polsia: rejected by user refinement: the visitor doesn't need to know AI is used internally.
- Don't mention internal processes at all: chosen: the visitor cares about outcomes, not how we got there.

**Trade-offs:**

- (-) Some founders want "we use AI to build" as a credibility signal; this decision rules out that signal entirely.
- (+) The work speaks for itself. Any visitor who asks how we work gets the answer in conversation, not on the site.

**Future implications:** If Polsia or other internal tooling ever ships publicly, this decision is revisited. Until then, it's hard rule: no exceptions in public copy.

**Status:** Approved.

---

## D-008 | 2026-07-24 | Primary CTA is "Book a Discovery Call" : exact phrasing, no variation

**Decision:** The primary CTA across the site uses the exact phrase **"Book a Discovery Call"** in the button label. No variants like "Book a Call", "Schedule a Call", "Talk to Us", "Get Started".

**Reasoning:** (Detailed in COPY_GUIDELINES.md §4.1.) The exact phrasing sets the right expectations:

- "Book" is action-oriented.
- "Discovery" signals this is a conversation, not a sales pitch.
- "Call" is specific (not "chat", not "session", not "consultation").

**Alternatives considered:**

- Use "Schedule a Call" or "Book a Call": rejected: sounds transactional.
- Use a generic "Contact Us": rejected: corporate-speak.
- Use "Book a Free Consultation": rejected: "free" implies the work is free; it isn't.

**Trade-offs:** One phrase means every CTA in the codebase reads the same. Repetition is intentional: the CTA gets stronger with consistent exposure.

**Future implications:** When CTAs A/B test (future), this is the control.

**Status:** Approved.

---

## D-007 | 2026-07-24 | Honest project labelling on the homepage

**Decision:** Every project card on the homepage and projects index is **labelled accurately**: "Personal project", "Demonstration work", or "Client work": never "Client work" if it wasn't.

**Reasoning:** Visitors evaluating a technology partner want to know which projects were real engagements. A personal project shown as if it were a client engagement is a small lie that, when discovered, damages trust more than the project would have built it.

**Alternatives considered:**

- Hide personal projects entirely: rejected: they demonstrate thinking.
- Show personal projects without labels: rejected: invites the visitor to assume "client" by default.
- Show only client work: rejected: there are no real client projects in V1.

**Trade-offs:** Personal projects sound less impressive than client work. The trade is honesty for tone, which is the right trade per the brief.

**Future implications:** When real client work is added, the label changes to "Client work" with optional sector / company size. Same component, no redesign.

**Status:** Approved.

---

## D-006 | 2026-07-24 | No "Trusted by" / logo bar / testimonials in V1

**Decision:** No logo bar, no testimonials section, no "trusted by" strip in V1. Trust is built through other mechanisms (see UX_PRINCIPLES.md §1.2).

**Reasoning:**

- The brief explicitly forbids fabricated social proof.
- The honest alternatives (empty placeholders, "coming soon" sections) damage trust more than not having the section.
- Trust can be earned through specificity, strong explanations, transparent communication, and high-quality writing: none of which require social proof.

**Alternatives considered:**

- Show a placeholder "Coming soon: real client logos": rejected: looks unfinished.
- Show generic industry icons: rejected: meaningless.
- Build a "Why Elion" section as the trust substitute: adopted (see homepage Section 10).

**Trade-offs:** Without social proof, the conversion rate from visitor → call may be lower than a competitor with impressive client logos. Acceptable: the visitor who converts is the visitor we want.

**Future implications:** When real client work exists, a "Featured client outcomes" section becomes available: same section ordering, same token system, no redesign.

**Status:** Approved.

---

## D-005 | 2026-07-24 | Homepage section ordering answers 6 questions in sequence

**Decision:** The homepage sections are ordered to answer the visitor's 6 questions in sequence: (1) What is this? (2) Why should I care? (3) What problems? (4) Why trust this company? (5) What happens if we work together? (6) How do I start? Each section answers one and only one question.

**Reasoning:** The site is a guided conversation, not a brochure (UX_PRINCIPLES.md §1.1). Visitors ask questions in a predictable order; sections should answer them in that order. A section that doesn't answer one of these six questions is cut.

**Section-to-question map (current homepage):**

| Section           | Question answered                                      |
| ----------------- | ------------------------------------------------------ |
| Hero              | What is this?                                          |
| Business Problems | Why should I care? (part 1: make them feel seen)       |
| Our Approach      | Why should I care? (part 2: de-risk the decision)      |
| Primary Services  | What specifically?                                     |
| Our Principles    | Why trust this company? (part 1: how we operate)       |
| How We Work       | What happens if we work together?                      |
| Featured Projects | Why trust this company? (part 2: proof through work)   |
| Technology Stack  | Why trust this company? (part 3: technical competence) |
| Why Work With Us  | Why trust this company? (part 4: differentiation)      |
| Who We Work With  | Am I a good fit?                                       |
| FAQ               | Pre-empt objections                                    |
| CTA Strip         | How do I start?                                        |
| Footer            | Secondary navigation + long-term positioning signal    |

**Alternatives considered:**

- Order by visual rhythm (alternate surface levels for aesthetics): rejected: aesthetics subordinated to argument.
- Order by feature importance (most important feature first): rejected: features are not the conversation.

**Trade-offs:** Sometimes the most beautiful section has to come second because it answers a later question. Acceptable trade-off.

**Future implications:** When pages are added, each gets its own 6-question sequence. The homepage's sequence is the canonical example.

**Status:** Approved.

---

## D-004 | 2026-07-24 | Light mode deferred from V1

**Decision:** The V1 design system ships **dark mode only.** Architecture is token-based so light mode can be added in a future phase by introducing a `:root.light` token block.

**Reasoning:**

- Target audience (operations managers, founders) spends most of their day in dark-first tools (Linear, Vercel, Notion, Anthropic). Light is not the default experience in their world.
- Supporting both modes doubles the design-system surface: every color token, every focus ring, every shadow, every component state needs a light variant.
- Brief says "Dark Mode First." Reading literally, that means dark is primary and light is conditional ("if it improves long-term scalability").
- Adding light mode later is mechanical: define a second token block, swap `data-theme="light"` on `<html>`. It does not require a redesign.

**Alternatives considered:**

- Ship dark + light together: rejected: 2× token work, 2× component QA, no clear user demand yet.
- Ship light only: rejected: contradicts the brief and the brand positioning.

**Trade-offs:**

- (+) Faster V1, fewer tokens, no contrast-parity QA across modes.
- (-) If a user prefers light, they have no option. Mitigated by OS-level dark mode being on for ~70% of knowledge workers.

**Future implications:** When light mode ships, every component spec in `COMPONENTS.md` already describes dark-only. Light specs are additive, not replacements.

**Status:** Approved (defaulting on the principle of "challenge and execute"); overridable.

---

## D-003 | 2026-07-24 | Dark-mode-first as a hard constraint, not a stylistic choice

**Decision:** Every default token is defined for dark mode. Light tokens (when added) are explicitly second-class.

**Reasoning:** "Dark mode first" is meaningless if dark is just a toggle on a light-first system. The brand brief, target audience, and competitive set (Linear / Vercel / Notion / Anthropic) all treat dark as the canonical experience.

**Alternatives considered:** "Both equally": rejected. Adds ambiguity, doubles QA, splits design attention.

**Trade-offs:** Designers / devs used to light-first conventions need to mentally invert. Mitigated by the BRAND.md design philosophy ("calm confidence" reads better on dark).

**Future implications:** When the dashboard / admin surfaces ship, they will also be dark-first. Light mode is opt-in everywhere.

**Status:** Approved.

---

## D-002 | 2026-07-24 | V1 component library is scoped to marketing surface only

**Decision:** Phase 2 designs tokens + the 13 components the marketing site needs (see BRAND.md §9.1). The full 30+ component library (forms, tables, modals, drawers, command palette, etc.) is **deferred** to a future phase, scoped when there's a real second product surface to design for (dashboard, admin, or SaaS app).

**Reasoning:**

- A "design system for an ecosystem" without the ecosystem is speculative. Designing 30 components in a vacuum produces 30 components that need to be redesigned when actual usage surfaces exist.
- The brief's own logic ("design for an ecosystem that can support X, Y, Z") is forward-looking: but each of X/Y/Z has its own constraints that we don't know yet.
- Tokens (colors, type, space, motion) are ecosystem-portable. Components are surface-specific. **The right thing to ship first is the part that scales.**
- Each speculative component we ship now has a maintenance cost: it has to be documented, tested, and kept in sync with tokens. With 13 components, that's a 1-person effort. With 30+, it's 2-3 days/quarter of ongoing work that doesn't pay back until the second surface exists.

**Alternatives considered:**

- Ship the full 30+ component library now: rejected: speculative, expensive, will be redesigned.
- Ship only tokens, no components: rejected: Phase 3 has nothing to build with.

**Trade-offs:**

- (+) Faster, more honest, pays off when the second surface exists because tokens are already correct.
- (-) When we build the dashboard, we'll discover some tokens (especially shadows, spacing for dense data UIs) need refinement.

**Future implications:** The 13 V1 components are built with the same tokens as future components. When phase 7+ ships, new components inherit colors/type/space/motion automatically.

**Status:** Approved (defaulting); overridable.

---

## D-001 | 2026-07-24 | Brand inspired by Apple/Stripe/Linear/Vercel/Anthropic, but not imitative

**Decision:** Borrow **principles** (whitespace, type discipline, motion restraint, dark-mode confidence) from the inspiration list. Do not borrow **patterns** (their specific nav layouts, their specific card styles, their specific illustrations).

**Reasoning:** Imitation reads as derivative. Elion is not Linear: different audience, different product surface, different founder voice. The design should _feel_ like it belongs in the same family of tools, not that it copied one of them.

**Alternatives considered:**

- Pick one inspiration and follow it closely: rejected: too derivative.
- Build from first principles with no inspiration: rejected: slower, less grounded, harder to defend choices.

**Trade-offs:** More design judgment required per decision. Mitigated by the documentation in BRAND.md and this decision log.

**Future implications:** When we add new surfaces (dashboard, admin), the same principle applies: borrow restraint, not chrome.

**Status:** Approved.

---
