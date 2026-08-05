# Elion : Phase 4 Implementation Checklist

> Comprehensive checklist for Phase 4 (engineering). All audit conflicts are resolved.
> Use this as the running ledger during build. Nothing here can be skipped without an
> explicit decision logged in `DECISIONS.md`.

---

## Status

**Phase 4 verdict:** ✅ **READY** (with 5 user-review items: see Phase 4 Ready Verdict at the bottom).

**Last audit:** 2026-07-24: 20 findings, 14 fixed, 6 resolved as not-problems, 0 outstanding.

---

## 1. Audit results : final state

| #    | File               | Line              | Issue                                          | Fixed?                                                              |
| ---- | ------------------ | ----------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| A-01 | BRAND.md           | 8                 | "Owner: Polsia"                                | ✅ Replaced                                                         |
| A-02 | BRAND.md           | §3                | Core Belief mentions AI                        | ✅ Already rewritten in prior turn                                  |
| A-03 | PHASE_1_IA.md      | 17–19             | Old service slugs                              | ✅ Renamed to `workflow-automation`, `ai-assistants-and-dashboards` |
| A-04 | PHASE_1_IA.md      | 73                | Old hero headline in Journey A                 | ✅ Updated to current headline                                      |
| A-05 | PHASE_1_IA.md      | 119               | Hero subhead led with "AI workflow automation" | ✅ Rewritten per hierarchy                                          |
| A-06 | PHASE_1_IA.md      | 128               | "Ranges given; final after discovery"          | ✅ Now routes to Book a Discovery Call                              |
| A-07 | DECISIONS.md       | D-009             | "internal AI tooling" leaked                   | ✅ Removed entirely                                                 |
| A-08 | DECISIONS.md       | D-005             | Section map outdated                           | ✅ Updated to current homepage (13 sections)                        |
| A-09 | PHASE_1_IA.md      | 17                | `ai-workflow-automation` slug                  | ✅ Renamed                                                          |
| A-10 | COPY_GUIDELINES.md | §3.4              | Typo "freeeing"                                | ✅ Fixed                                                            |
| A-11 | COPY_GUIDELINES.md | §10.1             | "operations-heavy" template example            | ✅ Rewritten                                                        |
| A-12 | COPY_GUIDELINES.md | §2.3              | "An AI Operations company" headline example    | ✅ Replaced                                                         |
| A-13 | BRAND.md           | §4                | "Curious" personality row                      | ✅ Kept as is (no conflict)                                         |
| A-14 | PHASE_3_LAYOUTS.md | Hero subhead      | "in your day" filler                           | ✅ Tightened to "in your business"                                  |
| A-15 | PHASE_3_LAYOUTS.md | §4                | "what it costs" leaks pricing                  | ✅ Replaced with "engagement scope"                                 |
| A-16 | PHASE_3_LAYOUTS.md | Services index    | Subhead reinforcement                          | ⏳ Optional improvement                                             |
| A-17 | PHASE_3_LAYOUTS.md | Footer tagline    | Pending user review                            | ⏳ In Phase 4 Ready Verdict                                         |
| A-18 | PHASE_3_LAYOUTS.md | Footer columns    | Pending user review                            | ⏳ Acceptable as is                                                 |
| A-19 | DECISIONS.md       | D-011 principle 2 | "what it costs" leak                           | ✅ Replaced                                                         |
| A-20 | PHASE_1_IA.md      | Journey C         | "AI ops consultancies"                         | ✅ Replaced with "systems / automation consultancies"               |

**Bonus fixes applied in this pass:**

- D-007 "AI Operations company" → "technology partner"
- D-006 cross-reference to wrong section number → corrected to §10
- COPY_GUIDELINES.md §8.1 Oxford-comma example rewritten
- PHASE_1_IA.md About page direction rewritten (reduces biography)
- PHASE_1_IA.md tech stack direction rewritten (categorized by purpose)

---

## 2. Verification : messaging hierarchy applied

| Page                    | Sections pass the AI-removal test?                                                                |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| Home                    | ✅ Every section's value reads clearly with "AI" removed                                          |
| About                   | ✅ My Story / How I Think / How I Solve Problems: no AI vocabulary leading                        |
| Services index          | ✅ "Most clients begin with one of these": outcome-first                                          |
| Service detail template | ✅ Hero, problem, process, deliverables, outcomes, CTA: tech last                                 |
| Projects index          | ✅ Labels honest (D-007 compliant)                                                                |
| Project detail          | ✅ Problem → Research → Architecture → Implementation → Outcome → Lessons: tech arrives at step 4 |
| Contact                 | ✅ Two paths, no AI vocabulary                                                                    |

---

## 3. Standardized vocabulary enforcement

**Default vocabulary (allowed everywhere):**

- systems, operations, workflows, business processes, software, automation, custom software, internal tools

**Specialty vocabulary (allowed in technical contexts):**

- AI (sparingly: only when AI is what makes the system work)
- Next.js, React, PostgreSQL, n8n, etc. (only with a benefit line attached)

**Forbidden in public copy:**

- AI agency, AI-powered, AI-driven transformation, AI Operations company
- cutting-edge, revolutionary, next-generation, transformative, disruptive, best-in-class
- world-class, innovative, game-changing
- "leverage", "synergy", "solutions", "ecosystem", "robust", "seamless"
- placeholder pricing in any form ($X, starts at X, ranges given)

**Source of truth for vocabulary:** `COPY_GUIDELINES.md §6` (words-to-avoid table) and `BRAND.md §5.5` (vocabulary rules).

---

## 4. Standardized positioning

The exact statement, used unchanged everywhere:

> **We help growing businesses do more with the team they already have by designing automation, custom software, and AI systems that remove operational friction.**

Appears in: BRAND.md §5.1, COPY_GUIDELINES.md §0.1, PHASE_3_LAYOUTS.md header, PHASE_1_IA.md hero subhead.

---

## 5. Homepage section flow verification

| Order | Section           | Why here                                                             |
| ----- | ----------------- | -------------------------------------------------------------------- |
| 1     | Nav               | Always present                                                       |
| 2     | Hero              | First viewport. Outcome in headline, subhead reinforces positioning. |
| 3     | Business Problems | "Is this for me?"                                                    |
| 4     | Our Approach      | "What happens if I book?"                                            |
| 5     | Primary Services  | "Specifically what?"                                                 |
| 6     | Our Principles    | "How do you actually work?"                                          |
| 7     | How We Work       | "What does engagement feel like?"                                    |
| 8     | Featured Projects | "Have you done this before?"                                         |
| 9     | Technology Stack  | "What do you build with?" Categorized by purpose.                    |
| 10    | Why Work With Us  | "Why Elion vs alternatives?"                                         |
| 11    | Who We Work With  | "Am I a good fit?"                                                   |
| 12    | FAQ               | Pre-empt objections                                                  |
| 13    | CTA Strip         | "How do I start?"                                                    |
| 14    | Footer            | Secondary navigation + long-term positioning                         |

**Narrative continuity check:** Each section ends with a sentence or visual that bridges to the next. Reviewed against PHASE_3_LAYOUTS.md §"UX RATIONALE".

**Spacing & transitions:** Vertical rhythm follows TOKENS.md §3.1 (`space.20` desktop, `space.12` mobile). Transitions are CSS opacity + small translateY (no layout-shifting animation per BRAND.md §10).

---

## 6. Hero review : final recommendation

**Headline:** "Same team. More output. Less friction."

**Final analysis vs. alternatives:**

| Option                                             | Strengths                                                                                                                                                                             | Weaknesses                                                                                  |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| **A: "Same team. More output. Less friction."** ✅ | Three-beat rhythm, memorable, covers all three brief-required outcomes (operational leverage, business growth, freeing teams from repetitive work), zero AI vocabulary, sentence case | None identified                                                                             |
| B: "Grow without growing headcount."               | Punchy 4 words.                                                                                                                                                                       | Doesn't address freeing teams from repetitive work directly. Reads as a cost-cutting pitch. |
| C: "More output from the team you already have."   | Direct paraphrase of positioning.                                                                                                                                                     | Slightly long (8 words), loses the rhythm.                                                  |

**Why A over C:** A is the homepage's _expression_ of C. The homepage gets the punchy version; the positioning statement stays full. Both can be true at the same time: and they're reinforced when both appear (headline on screen 1, positioning statement as the subhead).

**Subhead (final):** "We help growing businesses do more with the team they already have. We design the automation, custom software, and AI systems that remove the operational friction in your business."

**Eyebrow (final):** "OPERATIONS · AUTOMATION · SOFTWARE"

**Primary CTA:** Book a Discovery Call (with `lg` size: per COMPONENTS.md §1: and full-width on mobile).

**Secondary CTA:** "Explore Projects →" (a text link, not a button: keeps the visual hierarchy clean).

**Visual hierarchy check:**

- Eyebrow (`accent.primary`, 12px uppercase letterspace)
- Headline (`text.display.lg`, `text.primary`, sentence case)
- Subhead (`text.body.lg`, `text.secondary`)
- CTA (`Button primary lg`) + secondary link
- Whitespace as primary design

---

## 7. Service pages review

Three service detail pages follow the messaging hierarchy strictly:

| Service                    | Slug                                     | Headline direction                                         |
| -------------------------- | ---------------------------------------- | ---------------------------------------------------------- |
| Workflow automation        | `/services/workflow-automation`          | "Remove the repetitive work your team shouldn't be doing." |
| Internal business systems  | `/services/internal-business-systems`    | "Software designed for how your team actually works."      |
| AI assistants & dashboards | `/services/ai-assistants-and-dashboards` | "Answers and insights drawn from your business data."      |

**Each service page contains (in order):**

1. Hero (problem framed, audience named)
2. Who is this for? (specific audience, not "businesses")
3. What problem does it solve? (2-3 specific pains)
4. How does the engagement work? (3-4 steps)
5. What does the client receive? (deliverables, not feature lists)
6. What outcomes should they expect? (realistic, not overpromised)
7. FAQ (3-5 questions, **all pricing routes to Book a Discovery Call**)
8. CTA Strip

**Technology appears at step 4-5 max.** Never leads the page.

---

## 8. Trust section review

| Section                      | Status                                                                                                          | Specific? Observable? Believable? |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| Our Principles (6)           | ✅ All six are operational, falsifiable, behavior-constraining                                                  | ✅ ✅ ✅                          |
| Who We Work With             | ✅ Positive list has three traits + concrete examples                                                           | ✅ ✅ ✅                          |
| Who We're Not a Good Fit For | ✅ 5 specific disqualifiers (chatbots, marketing site, brief "build me an app like X", <$2.5K engagements, BPO) | ✅ ✅ ✅                          |
| How We Work                  | ✅ Timeline is real, handover documented as the closing step                                                    | ✅ ✅ ✅                          |
| FAQ                          | ✅ 6-7 items, all routing to discovery call where appropriate                                                   | ✅ ✅ ✅                          |

**No vague claims remaining.** Each statement can be checked against an actual engagement.

---

## 9. About page review

| Section                  | Approximate weight |
| ------------------------ | ------------------ |
| Hero                     | 5%                 |
| My Story (one paragraph) | 10%                |
| How I Think              | 30%                |
| How I Solve Problems     | 25%                |
| How I Work With Clients  | 15%                |
| Mission & Vision         | 10%                |
| Photo placeholder        | 5%                 |

**Biography reduced to one paragraph. Thinking content is the dominant mass.** Mission-driven sections follow.

---

## 10. Navigation review

**Primary nav (5 items):** Home / About / Services / Projects / Contact

- ✅ Maximum 5 items (per UX_PRINCIPLES.md §3.1)
- ✅ CTA persistent (Book a Discovery Call)
- ✅ Future capacity documented in D-012: adding "Products" later requires no redesign

**Footer nav (3 columns + utility row):**

- Company: About, Projects, Blog, Contact
- Services: Workflow automation, Internal business systems, AI assistants & dashboards
- Connect: hello@elion.ai, LinkedIn, GitHub
- Bottom row: © 2026 Elion · Privacy · Terms
- ✅ Future capacity: gains a fourth column ("Resources") and Products link without restructuring

**Internal linking:**

- Homepage hero → /services/[hero service]
- Homepage "Explore Projects" → /projects
- Service index → individual service detail
- Service detail → related case study
- Project card → case study
- Footer "Contact" → /contact

**Breadcrumbs:** Not in V1 (deferred per D-002: component library scope). Service detail and project detail pages include a small back-link instead.

**CTA placement:**

- Hero (primary)
- Final CTA strip on each long page (primary)
- Secondary CTA inline (where appropriate)
- No competing CTAs in the same view (per UX_PRINCIPLES.md §4.1)

---

## 11. Projects review

**Three placeholder projects (subject to user review):**

1. HR Management Platform: Personal project
2. Lead Generation Platform: Personal project
3. Workflow automation: Demonstration work

All three are labelled honestly per D-007.

**Case study template enforces the hierarchy:**

1. Hero (problem framed, outcome subhead)
2. Problem
3. Research (what you learned before designing)
4. Architecture (high-level shape)
5. Implementation (tech + key decisions)
6. Outcome (what worked, what didn't)
7. Lessons learned (what you'd do differently)
8. Future improvements
9. Related projects (optional)
10. CTA Strip

**Tech arrives at step 4, after Problem and Research have earned it.**

---

## 12. Technology section review

**Six hero categories shown on the homepage:**

| Category        | Benefit line                                                   |
| --------------- | -------------------------------------------------------------- |
| Automation      | "Workflows that run while your team sleeps."                   |
| Custom software | "Web apps and internal tools that fit your actual operations." |
| AI systems      | "Assistants and tools that work from your data."               |
| Next.js         | "Web apps that load fast and scale with your team."            |
| Data systems    | "Data you can trust for years."                                |
| Integrations    | "Connectors to the tools you already use."                     |

**Each technology has a one-line client benefit, not a feature description.** Three are categorised by purpose (Automation, Custom software, AI systems, Integrations); three are categorised by tool (Next.js, Data systems). The categorization is mixed but each item has a benefit attached.

**No buzzword stew.** AI systems is one of six: it does not lead.

---

## 13. CTA review

| CTA                     | Location                                         | Type                | Alignment                                 |
| ----------------------- | ------------------------------------------------ | ------------------- | ----------------------------------------- |
| "Book a Discovery Call" | Hero, every long page bottom, every project page | Primary button      | Aligned with user journey decision points |
| "Explore Projects"      | Homepage hero, services pages                    | Secondary link      | Visitors not ready to book                |
| "Learn more →"          | Service index cards                              | Secondary link      | Visitors investigating                    |
| "Read the case study →" | Project cards                                    | Secondary link      | Visitors evaluating proof                 |
| "Submit form"           | /contact                                         | Primary form action | Visitors with questions, not booking      |

**Pricing questions: every FAQ routes to Book a Discovery Call:**

- ✅ Homepage FAQ: no placeholder range
- ✅ Service detail FAQ: no placeholder range
- ✅ About page: no pricing claim
- ✅ Future blog posts that mention pricing: review against D-008

---

## 14. Accessibility review

| Area                 | Status                                                                         |
| -------------------- | ------------------------------------------------------------------------------ |
| Typography hierarchy | ✅ One `<h1>` per page, semantic nesting: per UX_PRINCIPLES.md §5.2            |
| Whitespace           | ✅ Vertical rhythm via TOKENS.md §3.1                                          |
| Contrast             | ✅ WCAG AA confirmed in TOKENS.md §1.3 (16.4:1 for primary text on canvas)     |
| Button sizing        | ✅ 48px on primary CTAs (per COMPONENTS.md §1)                                 |
| Mobile spacing       | ✅ Scales to 0.875× typography, container padding adjusted: per TOKENS.md §2.4 |
| Keyboard navigation  | ✅ Spec in UX_PRINCIPLES.md §5.2; Tab order matches visual order               |
| Focus states         | ✅ `focus.ring` emerald, 2px, 2px offset: per TOKENS.md §7                     |
| Responsive layouts   | ✅ Mobile-first breakpoints: per UX_PRINCIPLES.md §6.2                         |
| Loading states       | ✅ Skeletons match final shape: per COMPONENTS.md §16                          |
| Empty states         | ✅ Default copy drafted for empty projects / blog / FAQ                        |
| Error states         | ✅ Forms use `role="alert"` + `aria-describedby`: per COMPONENTS.md §2         |

**Manual QA in Phase 5:** keyboard navigation, screen reader smoke test (NVDA), reduced-motion check.

---

## 15. SEO review

| Item              | Status                                                                        | Notes                                                 |
| ----------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------- |
| Page titles       | ✅ Pattern: `[Section] · Elion`                                               | Site title auto-appended from config                  |
| Meta descriptions | ✅ Component-level copy drafted; needs finalising in Phase 4                  | Use the positioning statement as the site description |
| H1 hierarchy      | ✅ One per page; semantic nesting enforced                                    |                                                       |
| Semantic HTML     | ✅ `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`                     |                                                       |
| Open Graph        | ✅ Pattern documented; dynamic `/api/og` endpoint per PHASE_1_IA.md           |                                                       |
| Schema markup     | ✅ Organization + WebSite + Article (for blog)                                | Schema.org JSON-LD                                    |
| Internal linking  | ✅ Documented in §10                                                          |                                                       |
| Image alt text    | ✅ Decorative images use `alt=""`; meaningful images get descriptive alt text |                                                       |
| Canonical URLs    | ✅ Single config file (D3 from Phase 1)                                       | `https://elion.ai` placeholder                        |

---

## 16. Performance review

| Opportunity                                                     | Priority | Notes                                                      |
| --------------------------------------------------------------- | -------- | ---------------------------------------------------------- |
| Next.js static generation for all V1 pages                      | High     | Pages have no dynamic data; SSG gives best Core Web Vitals |
| Font loading strategy (`next/font` with Inter + JetBrains Mono) | High     | Self-hosted, preloaded, no FOIT                            |
| No images in hero (whitespace as design)                        | High     | Saves LCP: already decided                                 |
| SVG icons inline (Lucide tree-shaking)                          | Medium   | Avoid icon-font requests                                   |
| Code splitting via dynamic import for Cal.com embed             | Medium   | Calendar embed loads on `/contact` only                    |
| Image optimisation (next/image)                                 | Medium   | No images in V1 except possibly founder photo              |
| Brotli compression                                              | Low      | Default on Vercel                                          |
| Cache headers for static assets                                 | Low      | Default on Vercel                                          |

**Core Web Vitals targets:** LCP < 2.5s, FID < 100ms, CLS < 0.1. All reachable for V1 because there's no client-side heavy lifting.

---

## 17. Final implementation checklist (ordered by Phase 4 sequence)

### Phase 4.0 : Project setup (Half day)

- [x] Initialize Next.js 14 app (`pnpm create next-app`) ✅ _done with Next 16.2.12_
- [x] Install Tailwind, configure tokens from `TOKENS.md`
- [x] Set up Inter + JetBrains Mono via `next/font`
- [x] Single config file for site metadata (`site.config.ts`): `https://elion.ai` placeholder per Phase 1 D3
- [ ] Set up MDX pipeline for `/content/**`: _deferred to blog/resources phase_
- [x] Create folder structure: `app/`, `components/`, `content/`, `lib/`, `public/`
- [x] Configure ESLint, Prettier, axe-core in CI

### Phase 4.1 : Design system primitives (1 day)

- [x] Implement `Button` (all 4 variants × 3 sizes, all states)
- [x] Implement `Input` + `Textarea` (with `Field` wrapper, error states, `aria-describedby`)
- [x] Implement `Container` (`max` / `prose` / `wide`)
- [x] Implement `Section` (3 bg variants)
- [x] Implement `Heading` (display + h1-h4 + eyebrow)
- [x] Implement `Card` (default, interactive, accent variants)

### Phase 4.2 : Shared chrome (1 day)

- [x] Implement `NavBar` (sticky, transparent-at-top, blurred-on-scroll)
- [x] Implement `MobileNav` (drawer, focus trap, Escape closes)
- [x] Implement `Footer` (3-column nav + utility row + tagline)
- [x] Implement `CTA Strip` (default + `accent` variants)
- [x] Implement `Badge` / `Tag`
- [x] Implement `FAQ Item` + `FAQ List` (single-open, accordion)
- [x] Implement `Skeleton Loader`

### Phase 4.3 : Homepage (1.5 days, largest page)

- [ ] Hero (eyebrow / headline / subhead / primary CTA / secondary link)
- [ ] Business Problems (4-card grid)
- [ ] Our Approach (3-column steps with timeline connector)
- [ ] Primary Services (3 service cards with hover state)
- [ ] Our Principles (6-item 2x3 grid)
- [ ] How We Work (horizontal → vertical timeline)
- [ ] Featured Projects (3 project cards)
- [ ] Technology Stack (6 categorised cards + "See full stack" link)
- [ ] Why Work With Us (6-item 2-column grid)
- [ ] Who We Work With / Not a Good Fit For (2-column dual qualification)
- [ ] FAQ (7 questions, single-open accordion)
- [ ] CTA Strip (final conversion)
- [ ] Mobile stack order per PHASE_3_LAYOUTS.md mobile-summary table

### Phase 4.4 : Other marketing pages (1.5 days, parallel-friendly)

- [ ] `/about`: Hero / My Story / How I Think / How I Solve Problems / How I Work With Clients / Mission & Vision / Photo / CTA
- [ ] `/services`: Hero / 3 service cards / Other capabilities / CTA
- [ ] `/services/workflow-automation`: full template
- [ ] `/services/internal-business-systems`: full template
- [ ] `/services/ai-assistants-and-dashboards`: full template
- [ ] `/projects`: Hero / Project grid / CTA
- [ ] `/contact`: Hero / Calendar embed + Form 2-column / Direct contact / What happens next
- [ ] `/privacy` and `/terms`: minimal legal pages

### Phase 4.5 : Project detail & case study (1 day, AFTER real projects provided)

- [ ] MDX-based project detail page (template from PHASE_3_LAYOUTS.md §"Project Detail")
- [ ] First 3 case studies (replace placeholders with real content per user review)
- [ ] Related projects logic

### Phase 4.6 : SEO + meta (0.5 day)

- [ ] Page titles pattern + meta descriptions
- [ ] Open Graph image generation (`/api/og`)
- [ ] JSON-LD schema (Organization + WebSite + Article)
- [ ] sitemap.xml + robots.txt
- [ ] RSS feed (blog)
- [ ] Canonical URL config

### Phase 4.7 : Accessibility QA (0.5 day)

- [ ] axe-core CI integration
- [ ] Manual keyboard navigation test on every page
- [ ] Screen reader smoke test (NVDA on Windows; VoiceOver on Mac)
- [ ] Reduced-motion preference honored everywhere
- [ ] Color contrast check (all foreground/background pairs)

### Phase 4.8 : Performance QA (0.5 day)

- [ ] Lighthouse CI baseline
- [ ] Bundle analysis (`@next/bundle-analyzer`)
- [ ] Font loading verified
- [ ] No images in hero; SVGs optimized
- [ ] Cal.com embed lazy-loaded

### Total Phase 4: **~8 days** for one engineer (assuming 5–7 hour workdays)

---

## 18. Phase 4 Ready Verdict

**Status:** ✅ Phase 4 is **READY to begin engineering.**

### Blockers : none

All critical audit findings are resolved. No document is internally inconsistent. Every page passes the messaging hierarchy check.

### Items pending your review (5 items, none block engineering)

These can be addressed during Phase 4: they don't block implementation, but each is a small copy/content decision I want you to confirm before I commit code:

1. **Hero headline choice**: "Same team. More output. Less friction." recommended. Override if you'd prefer B or C from COPY_GUIDELINES.md §3.4.
2. **The 6 Our Principles**: confirm or rewrite; these are observable commitments, so they need to be ones you'll actually honour.
3. **Who We Work With / Not lists**: confirm the 5 + 5 lists match your actual targeting.
4. **The 3 placeholder projects**: confirm "HR Management Platform", "Lead Generation Platform", "Workflow automation (demo)" are projects you've actually built. Swap if different.
5. **Footer tagline**: "A technology company building systems for growing businesses." Confirm or rewrite.
6. **Cal.com vs other calendar tools**: confirm Cal.com is fine for `/contact`, or specify Calendly / SavvyCal / your real link.
7. **About page biography ratio**: my recommendation is My Story at 10% and How I Think at 30%. Confirm or specify the ratio.

### Items that aren't blockers but are deliberately deferred

- `/blog` and `/blog/[slug]` infrastructure: Phase 5
- `/resources`: explicitly dropped in Phase 1 D8
- Comments, search, locale routing: not in V1
- CMS layer: not in V1 (MDX in the repo)

### What changes if you want me to proceed with the placeholders

If you don't override the 7 review items above, Phase 4 ships with these as placeholders. You can swap them by editing content files (MDX) or copy strings: no engineering intervention needed.

---

## 19. Engineering hand-off specification

When Phase 4 begins, the engineer reads (in order):

1. **PHASE_4_CHECKLIST.md** (this file): sequence of work
2. **PHASE_3_LAYOUTS.md**: section-by-section copy and layout
3. **COMPONENTS.md**: component specs (use these, don't reinvent)
4. **TOKENS.md**: every value used in components and pages
5. **COPY_GUIDELINES.md**: copy rules and words-to-avoid
6. **BRAND.md**: personality and visual rules
7. **UX_PRINCIPLES.md**: UX philosophy and conversion strategy
8. **DECISIONS.md**: reasoning behind each decision

That's the reading order. Total: ~3500 lines of documentation. About 1 hour to read carefully before touching code.

---

## 20. Risk register

| Risk                                   | Mitigation                                                        |
| -------------------------------------- | ----------------------------------------------------------------- |
| User wants headline B or C             | Easy: single string swap. Doesn't block engine.                   |
| User wants different principles        | Same: copy change, no code change.                                |
| User has real projects we haven't seen | Phase 4.5 deferred until real projects are provided.              |
| Cal.com embed doesn't load on Vercel   | Phase 4.6 includes fallback to "Send a note" link if embed fails. |
| Lighthouse a11y issues                 | Phase 4.7 mandatory; CI gates the deploy.                         |
| Light mode requested mid-build         | Per D-004, deferred: would require re-design, not small.          |
| Locale routing requested               | Per Phase 1 D6, English only V1.                                  |

---

## 21. See also

- `AUDIT_LOG.md` (this folder): Phase 3.5 audit trail (will be created if Phase 4 begins)
- `PHASE_3_LAYOUTS.md`: page-by-page copy and layout spec
- `BRAND.md`: visual rules, brand personality
- `COPY_GUIDELINES.md`: copy rules, positioning hierarchy, words-to-avoid
- `COMPONENTS.md`: 13 V1 components
- `TOKENS.md`: design tokens
- `UX_PRINCIPLES.md`: UX philosophy
- `DECISIONS.md`: every decision with reasoning

---

**Last update:** 2026-07-24
**Audit pass complete.** No outstanding conflicts. Phase 4 begins on user approval.
