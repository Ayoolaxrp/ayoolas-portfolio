# Elion : Phase 3: Page Layouts & Copy Direction

> High-fidelity layout, copy, and interaction direction for every page in V1.
> No code in this phase. This is the design spec Phase 4 will build from.
>
> **Notation:**
>
> - **[Component]** = component from COMPONENTS.md
> - **[Section: name]** = named page section
> - **Copy in quotes** = exact text to ship (review and edit in Phase 4)
> - _Italics_ = design notes
> - `[CTA: ...]` = primary or secondary action
>
> **Anchors for every page:**
>
> - Positioning statement (BRAND.md §5.1): "We help growing businesses do more with the team they already have by designing automation, custom software, and AI systems that remove operational friction."
> - Messaging hierarchy (BRAND.md §5.2): problem → outcome → solution → technology → next step.
> - Default vocabulary: systems / operations / workflows / business processes / software. AI used sparingly, last, supporting the story.

---

# HOMEPAGE : High Fidelity

**Page goal:** Answer the visitor's 6 questions in order, end with a booked discovery call.

**Page primary message:** Elion is a long-term technology partner that helps growing businesses build better systems.

**Hero headline:** "Same team. More output. Less friction."

**Primary CTA:** Book a Discovery Call
**Secondary CTA:** Explore Projects

---

## HOMEPAGE : Section 1: Navigation (sticky)

**Purpose:** Always-present site map + persistent conversion entry point.

**Layout:**

```
[Logo "elion"] [Home | About | Services | Projects] [Book a Discovery Call (button, primary)]
```

- Logo on the left, primary nav centered, CTA on the right.
- On mobile: hamburger triggers MobileNav drawer.
- Background: transparent at top, blurred surface when scrolled.
- On `/` specifically, the nav starts transparent and gains its background on scroll.

**Why this exact order:** "Home" is implied (you clicked the logo). "About / Services / Projects" are the three questions a serious prospect asks in order. "Book a Discovery Call" is always within reach. The Contact page is reachable from the footer.

**Future capacity:** The nav is structured to add a "Products" item in a future phase when Elion ships product offerings (D-012). No nav redesign will be required.

---

## HOMEPAGE : Section 2: Hero

**Purpose:** First 5 seconds. Tell the visitor what Elion does and why they should care.

**Layout (desktop):**

```
[Eyebrow: "OPERATIONS · AUTOMATION · SOFTWARE"]

Same team. More output. Less friction.

We help growing businesses do more with the team they already have.
We design the automation, custom software, and AI systems that
remove the operational friction in your business.

[Button: Book a Discovery Call (primary, lg)]
[Link: Explore Projects →]
```

**Layout (mobile):** Stack vertically. Eyebrow → headline → subhead → CTA → secondary link.

**Visual:**

- Eyebrow in `accent.primary` (Emerald).
- Headline in `text.display.lg`, `text.primary`. Sentence case.
- Subhead in `text.body.lg`, `text.secondary`.
- No hero image, no background illustration. Whitespace as the design.
- A subtle accent decoration: a small geometric SVG (single line, emerald accent) in the bottom-right or behind the headline. _Avoid making it look like a logo or mascot._

**Messaging hierarchy check:** Business problem (implicit in "friction"), outcome (more output, same team), solution (we design the systems), technology (automation, custom software, AI systems: last, briefly), next step (CTA).

**Why this headline over alternatives:** Three-beat rhythm. Memorable. Covers operational leverage (more output), business growth (same team), and freeing teams from repetitive work (less friction) in 6 words. Avoids the AI vocabulary trap entirely: the word "AI" appears once, in the subhead, after the value is clear.

**Interaction:**

- Headline animates in (fade-up 16px, 400ms once on load).
- CTA button has a subtle hover state (color shift + shadow lift).
- "Explore Projects" link underlines on hover.

**Conversion logic:** Visitors who click the hero CTA convert immediately. Visitors who don't have a CTA mid-page (Section 11) and a CTA strip (Section 12).

---

## HOMEPAGE : Section 3: Business Problems

**Purpose:** Name the visitor's pain. Make them feel seen.

**Layout:**

```
[Eyebrow: "THE PROBLEMS WE SEE"]

Growing businesses lose hours every week to work that
the right systems should be doing.

[Grid 2x2 (desktop), 1-column (mobile):]

  Card 1                  Card 2
  "Data entry that        "Reports that take
   should be               days to compile
   automated"              because the data
                           lives in five places"

  Card 3                  Card 4
  "Customer follow-up     "Onboarding new
   that depends on        team members who
   someone remembering"    don't know where
                           anything lives"
```

**Visual:**

- Section background: `bg.surface` (slightly raised from canvas) for visual rhythm.
- Each card uses [Card component] with subtle border, no icon (icons are tempting but become cliché in this context: let the words do the work).
- Headlines inside cards: `text.h4`.

**Messaging hierarchy:** This is the "business problem" step. No solution, no technology. Pure pain recognition.

**Why this section:** Without social proof, the homepage has to establish trust through specificity. Naming 4 specific pains the visitor likely has is more credible than a generic "we solve business problems" claim. The cards are written in the language of operations managers, not developers.

**Conversion logic:** None directly. This section exists to move the visitor from "what is Elion?" to "this is for me." The CTA comes after the next section.

---

## HOMEPAGE : Section 4: Our Approach

**Purpose:** De-risk the decision by explaining what an engagement looks like.

**Layout:**

```
[Eyebrow: "HOW WE WORK"]

Every engagement starts the same way.

[3 columns (desktop), stacked (mobile):]

  Step 01                    Step 02                    Step 03
  Discover                   Design                     Build

  15-minute call to          A short document           We build the system
  understand what            outlining what we'd        in 2-8 weeks,
  you're doing now           build, the engagement      then hand it over
  and where systems          scope, and what changes    with documentation.
  could actually help.       for your team.
```

**Visual:**

- Step numbers in `accent.primary`, eyebrow style.
- Step titles in `text.h3`.
- Step descriptions in `text.body.md`, `text.secondary`.
- Vertical timeline connector on desktop (subtle line between steps): skip on mobile.

**Why this section:** The biggest blocker for a first-time call is "I don't know what happens if I book." This section answers that in 30 seconds. The 3-step process is deliberately simple: discovery, design, build: because that's the reality. No "agile transformation framework" jargon.

**Conversion logic:** Soft. Visitors who read this and feel "okay, that's clear" are more likely to click the CTA. No direct CTA in this section.

---

## HOMEPAGE : Section 5: Primary Services

**Purpose:** Show the 3 specific things Elion does. Visitors self-identify with one.

**Layout:**

```
[Eyebrow: "WHAT WE BUILD"]

Three ways to start.

[3 cards (desktop), stacked (mobile):]

  Card 1 (ServiceCard)                 Card 2                  Card 3
  Workflow automation                  Internal business       AI assistants
                                       systems                 & dashboards

  We map the repetitive               Custom dashboards,      Internal assistants
  tasks your team does every          CRMs, and operations    that answer questions
  day and replace them with            software, designed      using your business
  automated workflows.                 for your actual          data. Dashboards
                                       workflows.              that show what's
                                                               actually happening.

  [Learn more →]                       [Learn more →]          [Learn more →]
```

**Visual:**

- Section background: `bg.canvas` (back to base level for rhythm).
- Cards use [Card: feature] variant with subtle hover state.
- Each card title links to the corresponding `/services/[slug]` page.
- "Learn more" is a link, not a button: keeps the hierarchy clean.

**Why this section:** This is the offer made concrete. After "what" (hero) and "why" (problems + approach), this answers "specifically, what?" The 3 cards map to the 3 services in the brief:

- Workflow automation → `/services/workflow-automation`
- Internal business systems → `/services/internal-business-systems`
- AI assistants & dashboards → `/services/ai-assistants-and-dashboards`

**Messaging hierarchy:** Outcome (the result of each card), solution (we map / we design / internal assistants), technology (the link to the service page goes into the specifics).

**Conversion logic:** Click-through to service detail pages. Each service page ends with its own CTA strip.

---

## HOMEPAGE : Section 6: Our Principles

**Purpose:** Show how Elion actually works. Operating principles that constrain behaviour in observable ways: anyone can tell whether a real engagement would honour them.

**Layout:**

```
[Eyebrow: "OUR PRINCIPLES"]

How we approach the work.

[6 items in a 2x3 grid (desktop), 1-column (mobile):]

  01 Build for handover              02 Show the architecture
                                        before we build

  03 Plain language in               04 Reject work that
     every conversation                 won't pay off

  05 You own everything              06 Systems age well
     we build
```

**Each principle: title + 1-sentence description:**

1. **Build for handover.** Every system is documented and designed so your team can run it without us.
2. **Show the architecture before we build.** You see what we'd build and what it costs before any work starts.
3. **Plain language in every conversation.** No jargon, no overpromising, no buzzword reports.
4. **Reject work that won't pay off.** If a system won't actually save your team time, we say so.
5. **You own everything we build.** No vendor lock-in. No proprietary black boxes.
6. **Systems age well.** We optimise for the system being maintainable in year three, not impressive in week one.

**Visual:**

- Number prefix in `accent.primary`, eyebrow style.
- Title in `text.h4`.
- Description (1 sentence) in `text.body.sm`, `text.secondary`.

**Why this section:** Generic company values are noise. Visitors evaluating a technology partner want to know what working with Elion actually looks like. Operating principles are credible because they constrain behaviour in observable ways.

**Messaging hierarchy:** This section is mostly "how we work": it's a sibling of section 4 (Our Approach), but more durable. The principles don't change engagement to engagement.

**Conversion logic:** None directly. Builds trust for the final CTA strip. Visitors who self-select against a principle leave before wasting your time: exactly the qualification D-010 aims for.

---

## HOMEPAGE : Section 7: How We Work (Process)

**Purpose:** Reassure the visitor that this is a real engagement, not a transaction.

**Layout:**

```
[Eyebrow: "WHAT AN ENGAGEMENT LOOKS LIKE"]

Here's what happens after you book a call.

[Timeline-style layout, alternating left/right on desktop:]

  Week 1              Week 2-3            Week 4-8            After
  Discovery           Design              Build               Handover
  (call + research)   (proposal + sign)   (weekly check-ins)  (docs + support)

  [Description]       [Description]       [Description]       [Description]
```

**Visual:**

- Horizontal timeline on desktop, vertical on mobile.
- Each milestone in a [Card] with subtle accent border.
- Week labels in eyebrow style.

**Why this section:** Visitors who are seriously considering booking want to know what they're signing up for. This shows the timeline without overpromising. "After handover" is intentionally vague: it gives you flexibility (some clients want ongoing support, some don't).

**Conversion logic:** None directly. Reinforces the value of booking a call.

---

## HOMEPAGE : Section 8: Featured Projects

**Purpose:** Proof through real work. Honest about scope.

**Layout:**

```
[Eyebrow: "PROJECTS"]

A few things we've built.

[3 project cards (desktop), stacked (mobile):]

  Project Card 1            Project Card 2            Project Card 3
  [Geometric SVG]           [Geometric SVG]           [Geometric SVG]

  HR Management             Lead Generation            Workflow
  Platform                  Platform                   automation

  Personal project          Personal project          Demonstration
                                                       work

  A custom internal         A lead-capture and         An automated lead
  HR system for tracking    routing system for         qualification
  candidates, onboarding,   a recruitment              workflow for a
  and team operations.      business.                  consulting firm.

  Next.js, PostgreSQL,      Next.js, n8n,              n8n, OpenAI,
  Supabase                  Resend                     PostgreSQL

  [Read case study →]       [Read case study →]       [Read case study →]
```

**Visual:**

- Each card has a small geometric SVG (per BRAND.md §6.3: no stock photos).
- Labels explicit: "Personal project", "Demonstration work". **Never** "Client work" if it wasn't.
- Tech stack shown as small badges.
- "Read case study" links to `/projects/[slug]`.

**Critical rule:** No project card says "Client work" if it wasn't a client engagement. Personal and demo work is fine: it's labelled honestly.

**Conversion logic:** Click-through to case studies. Case studies end with a CTA strip.

---

## HOMEPAGE : Section 9: Technology Stack

**Purpose:** Show technical competence without becoming a buzzword list.

**Layout:**

```
[Eyebrow: "TECHNOLOGY"]

What we build with.

[6 hero technologies (desktop), 3x2 grid (mobile):]

  Automation              Custom software          AI systems
  Workflows that run      Web apps and internal    Assistants and
  while your team         tools that fit your      tools that work
  sleeps.                 actual operations.       from your data.

  Next.js                 Data systems             Integrations
  Web apps that load      Data you can trust       Connectors to the
  fast and scale with     for years.               tools you already
  your team.                                       use.
```

**Visual:**

- Each technology in a small [Card] with the name as a heading and the one-line benefit as a body.
- The full tech list (15+ items) lives on a separate `/technology` page linked from "See the full stack →".

**Why this section:** Visitors evaluating a technical partner want to know you use tools they recognize. But the brief is right: a buzzword list is meaningless. Each tech has a one-line **client benefit**, not a feature description.

**What's shown on the homepage (6):** Automation, Custom software, AI systems, Next.js, Data systems, Integrations. Categorised by purpose rather than listed as a tech stew. AI systems is one of six: not the lead.

**Conversion logic:** None directly. Reinforces credibility.

---

## HOMEPAGE : Section 10: Why Work With Us

**Purpose:** Differentiate without boasting. Be specific.

**Layout:**

```
[Eyebrow: "WHY ELION"]

What makes us different.

[2-column grid (desktop), stacked (mobile), 6 items total:]

  01 Fixed-scope            02 You see the
     engagements               architecture before
                              we build

  03 You own                04 We don't take
     everything we build        every project

  05 Plain language         06 Built to be
                                maintained
```

**Visual:**

- Number prefix in `accent.primary`, eyebrow style.
- Title in `text.h4`.
- Description (1-2 sentences) in `text.body.sm`, `text.secondary`.

**Why this section:** Without testimonials, the homepage needs to articulate _why_ you'd choose Elion over alternatives. These 6 differentiators are concrete, not vague:

- "Fixed-scope engagements" → no surprise bills.
- "You see the architecture before we build" → no surprises.
- "You own everything we build" → no vendor lock-in.
- "We don't take every project" → selectivity signals quality.
- "Plain language in every conversation" → operations managers don't want jargon.
- "Built to be maintained" → not throwaway work.

**Conversion logic:** None directly. Builds trust for the final CTA strip.

---

## HOMEPAGE : Section 11: Who We Work With / Who We're Not a Good Fit For

**Purpose:** Qualify leads. Name who the work is for: and who it isn't.

**Layout:**

```
[Eyebrow: "WHO WE WORK WITH"]

[Two-column layout (desktop), stacked (mobile):]

  A good fit                          Not a good fit

  Teams of 5-100 with manual,         Companies that want a
  repetitive work they've             chatbot on their homepage
  outgrown but can't replace          and nothing else.
  without help.

  Recruitment agencies, HR            Teams that need a marketing
  consultancies, professional         site or a redesign.
  service firms, schools,
  healthcare providers,
  logistics companies, growing
  SMEs.

  These teams share three             Projects where the brief is
  traits: leadership that             "build me an app like
  cares about operations,             [consumer product]" with no
  internal data that lives in         operational context.
  spreadsheets, and a willingness
  to invest 2-8 weeks to fix the
  underlying system.

                                      Engagements scoped under
                                      $2,500: the work wouldn't
                                      pay off.

                                      Companies looking for a
                                      fully-managed BPO partner.
```

**Visual:**

- Left column (good fit): subtle emerald accent: small left border in `accent.primary`.
- Right column (not a good fit): neutral: no accent.
- Each item: 1-3 sentences.

**Why this section:** Trying to appeal to everyone reads as appealing to no one. Honest qualification is a credibility signal. It says "we know what we're for."

**Note on the negative list:** Naming what Elion isn't is harder than naming what it is. The negative list is the trust signal: a company willing to talk about who it doesn't serve is a company that's thought about who it does.

**Conversion logic:** None directly. The right prospects read this and feel recognised. The wrong prospects leave before booking a bad-fit call.

---

## HOMEPAGE : Section 12: FAQ

**Purpose:** Answer concerns before the visitor thinks to ask.

**Layout:**

```
[Eyebrow: "QUESTIONS"]

Things people often ask.

[Accordion list, 6-8 items:]

  Q: What does a discovery call look like?
  A: 15 minutes, no prep required. We talk through what your team
     does today and where the right systems would actually help.
     No pitch. No follow-up emails unless you ask.

  Q: How much does a project cost?
  A: Every engagement is scoped to fit the work. After the discovery
     call we send a short document outlining what we'd build, the
     approach, and the cost. If a fixed quote doesn't make sense
     for the work, we'll tell you that too.

  Q: Do I need to be technical?
  A: No. We translate between your operations and the technology.
     You describe the problem; we design the system.

  Q: How long does a project take?
  A: Most projects take 2-8 weeks from kickoff to handover. Smaller
     automations can ship in days; larger systems take longer.

  Q: Do you work with international clients?
  A: Yes. We work asynchronously across time zones and use shared
     documentation to keep everyone aligned.

  Q: What happens after you build something?
  A: We hand over the system with documentation and a short walk-
     through video. Optional ongoing support is available if you
     want it.

  Q: Will I own what you build?
  A: Yes. Every system we build is yours: code, documentation,
     accounts, and access. No vendor lock-in.
```

**Visual:**

- Each item uses [FAQ Item] component.
- Single-open behavior: opening one closes others.
- Border-bottom between items.

**Why this section:** Pre-empts the most common objections. The pricing question routes to the discovery call (no placeholder ranges). The technical-requirements question reassures non-technical buyers.

**Critical rule:** No placeholder pricing in any FAQ, on any page, anywhere on the site. Every pricing question routes to "Book a Discovery Call." This is enforced in COPY_GUIDELINES.md §4.2.

**Conversion logic:** None directly. Reduces last-minute hesitation.

---

## HOMEPAGE : Section 13: CTA Strip

**Purpose:** Final conversion prompt. Visitors who scrolled this far are interested.

**Layout:**

```
Ready to do more with the team you already have?

Book a 15-minute discovery call. We'll figure out where to start.

[Button: Book a Discovery Call (primary, lg)]
```

**Visual:**

- [CTA Strip] component, `accent` variant (subtle emerald background).
- Centered on mobile, left-aligned on desktop.
- Headline in `text.h2`, body in `text.body.lg`.

**Why this section:** Catches visitors who didn't convert from the hero. Located mid-final-viewport so it's visible without scrolling.

**Messaging hierarchy:** Full sequence in one section: outcome (do more with the team you have) → solution (call to figure out where to start) → next step (CTA). No technology.

**Conversion logic:** The whole point of this section.

---

## HOMEPAGE : Section 14: Footer

**Purpose:** Secondary navigation, contact, legal, and a quiet long-term positioning signal.

**Layout:**

```
[Logo "elion"] [A quiet tagline: "A technology company building systems for growing businesses."]

[3 columns: Company | Services | Connect] [Contact email + social]

[Copyright row: © 2026 Elion · Privacy · Terms]
```

- Company column: About, Projects, Blog, Contact.
- Services column: Workflow automation, Internal business systems, AI assistants & dashboards.
- Connect column: hello@elion.ai, LinkedIn, GitHub.
- Bottom row: © 2026 Elion · Privacy · Terms.

**Visual:**

- [Footer] component per COMPONENTS.md §9.
- Background `bg.surface`, one level above canvas.
- The "technology company" tagline is small (`text.body.sm`, `text.tertiary`): quiet but present. It signals long-term intent without claiming products that don't exist yet (D-012).

**Conversion logic:** None. Footer is for navigation, not conversion.

**Future capacity:** The footer architecture supports a fourth column ("Resources") when blog content scales, and a "Products" link in the Connect column when Elion ships product offerings. No redesign required.

---

## HOMEPAGE : Mobile Summary

| Desktop section        | Mobile behavior         |
| ---------------------- | ----------------------- |
| Nav                    | Hamburger → drawer      |
| Hero                   | Stacked, full-width CTA |
| Business Problems      | 1-column cards          |
| Our Approach           | Stacked steps           |
| Primary Services       | Stacked cards           |
| Our Principles         | 1-column                |
| How We Work            | Vertical timeline       |
| Featured Projects      | Stacked cards           |
| Technology Stack       | 3x2 grid                |
| Why Work With Us       | 1-column                |
| Who We Work With / Not | Stacked 2 columns       |
| FAQ                    | Full-width accordion    |
| CTA Strip              | Full-width, stacked     |
| Footer                 | 1-column, stacked nav   |

---

# ABOUT PAGE : Structural Layout

**Page goal:** Build trust through how the founder thinks, solves problems, and works with clients: not through biography.

**Page primary message:** A technology partner who thinks in systems, not features.

**Layout sections:**

1. **Hero**: name, role, one-line tagline.
   - Eyebrow: "ABOUT"
   - Headline: "A technology partner who thinks in systems, not features."
   - Subhead: short positioning statement, no biography.
   - No CTA in hero (the visitor should read first).

2. **My Story (one paragraph)**: origin in 4-6 sentences. The brief: how the founder came to this work, what they believed before founding Elion, why now. **This is the only biographical content.** No childhood, no timeline of past jobs, no "in my free time I enjoy" filler.

3. **How I Think**: the largest section. 4-6 paragraphs on the founder's approach to problems. Topics: systems thinking (problems are usually the system, not the people), long-term orientation (we design for year three), why "automate the boring stuff" is a serious philosophy, when to say no to a project. Written in the founder's voice. Direct, specific, honest.

4. **How I Solve Problems**: the methodology. A 4-step pattern (Observe → Define → Design → Build), each with a paragraph explaining what happens in practice. Not a corporate framework: a real description of how engagements actually move.

5. **How I Work With Clients**: what a client engagement feels like from the inside. Topics: async-first communication, weekly written updates, plain-language reporting, "show your work" architecture reviews. Two to three paragraphs.

6. **Mission & Vision**: two-column layout: mission on the left, vision on the right. Quiet callouts (no decoration). These are the short brand statements, expanded slightly for the About page.

7. **Photo placeholder**: single image slot, labelled "Photo coming soon" if not available. NOT a stock photo.

8. **CTA Strip**: same as homepage, with copy: "Want to talk about your operations? Book a call."

**Why this order:** Hero → Story (who you are, briefly) → How I Think (how you approach problems) → How I Solve Problems (the methodology) → How I Work With Clients (what engagement feels like) → Mission & Vision (the through-line) → CTA. The biography is intentionally small; the thinking is large.

**Conversion logic:** Single CTA strip at the bottom. The About page is for visitors who want to evaluate trust, not for impulse conversions.

---

# SERVICES INDEX PAGE : Structural Layout

**Page goal:** Show the full service surface and route visitors to specific service pages.

**Page primary message:** Three ways to start. Pick the one that fits.

**Layout sections:**

1. **Hero**: headline, subhead, single CTA ("Book a Discovery Call").
   - Eyebrow: "SERVICES"
   - Headline: "Three ways to start."
   - Subhead: "Most clients begin with one of these. We design each engagement to fit your actual operations."
2. **Service overview cards**: 3 cards in a row, each linking to its service detail page. Brief description + "Learn more →".
3. **Other capabilities**: a quieter section listing the secondary services (the other 8 from the original brief): Custom web applications, Lead generation systems, CRM integrations, Business intelligence dashboards, AI chatbots, Internal knowledge bases, API integrations, Custom AI agents.
   - This section **deliberately** has less visual weight than the 3 hero services: they're labeled "Other capabilities" not "Services." They're real but secondary.
4. **CTA Strip**: final conversion.

**Why this order:** Hero → primary services (which the homepage links to) → secondary services (which only the most curious visitor reaches) → CTA. The secondary services section is honest: "We do these too, but we lead with three."

---

# SERVICE DETAIL PAGES : Structural Template (×3)

Three pages: `/services/workflow-automation`, `/services/internal-business-systems`, `/services/ai-assistants-and-dashboards`.

Each follows the same template:

**Layout sections:**

1. **Hero**
   - Eyebrow: "SERVICES · [SERVICE NAME]"
   - Headline: clear value proposition for THIS service.
   - Subhead: who it's for.
   - Primary CTA: Book a Discovery Call.
2. **Who is this for?**
   - Specific description of the audience. Not "businesses": "teams who [specific situation]."
3. **What problem does it solve?**
   - 2-3 specific pains this service addresses. Outcome-first language.
4. **How does the engagement work?**
   - 3-4 step process, service-specific.
5. **What does the client receive?**
   - Concrete deliverables, not feature lists. "An automated workflow that runs every Monday morning" beats "Workflow automation."
6. **What outcomes should they expect?**
   - Realistic outcomes, not overpromises. "Most clients save 5-10 hours a week within the first month."
7. **FAQ** (3-5 questions specific to this service). **All pricing questions route to "Book a Discovery Call."**
8. **CTA Strip**.

**Conversion logic:** Each service page is a high-intent page: visitors who land here already know what they want. The CTA strip is the closer.

---

# PROJECTS INDEX PAGE : Structural Layout

**Page goal:** Showcase real work honestly. Route visitors to case studies.

**Page primary message:** Real problems, real architecture, honest outcomes.

**Layout sections:**

1. **Hero**: quiet. Eyebrow "PROJECTS", headline "A few things we've built.", no subhead, no CTA in hero.
2. **Project list**: grid of project cards. Each card: title, type label (Personal / Demonstration / Experimental), one-line description, tech stack badges, "Read case study →".
3. **CTA Strip**: book a call.

**Critical rule:** Every project is labelled accurately. "Personal project" if it was. "Demonstration work" if it was. **Never** "Client work" if it wasn't.

**Conversion logic:** Click-through to case studies. Case studies are where the conversion happens.

---

# PROJECT DETAIL (CASE STUDY) PAGE : Template

**Page goal:** Demonstrate thoughtful problem-solving.

**Layout sections:**

1. **Hero**
   - Eyebrow: "PROJECT" or "PROJECTS · [TYPE]"
   - Headline: project name.
   - Subhead: one-sentence outcome.
   - Meta row: type, year, duration, role.
2. **Problem**: what was the problem being solved? Specific.
3. **Research**: what did you learn before designing the solution? Even for personal projects, you did research.
4. **Architecture**: high-level technical diagram or description. Not code, but the shape of the solution.
5. **Implementation**: what you built. Tech stack. Key decisions.
6. **Outcome**: what happened. What worked, what didn't.
7. **Lessons learned**: what you'd do differently. This section is gold for credibility because it's honest.
8. **Future improvements**: what's next, if anything.
9. **Related projects** (optional): 2 cards.
10. **CTA Strip**.

**Why this template:** The 8 sections map to how an engineer actually thinks about a project. Showing the full arc (including the messy parts) is more credible than a polished "look what we built" page.

---

# CONTACT PAGE : Structural Layout

**Page goal:** Convert interest into a booked call or a question sent.

**Layout sections:**

1. **Hero**
   - Eyebrow: "CONTACT"
   - Headline: "Let's talk about your operations."
   - Subhead: "Book a 15-minute discovery call, or send us a note. Either way, we read every message."
2. **Two-column layout**
   - Left column: Calendar embed (Cal.com placeholder). Embedded directly, full height.
   - Right column: Contact form (name, email, company, "what are you working on?" textarea, submit).
3. **Direct contact**: email link, LinkedIn, etc. Below the columns.
4. **What happens next**: 2-3 sentences describing what to expect after submitting.

**Why two paths:** Some visitors are ready to book; others have a question first. Forcing one path loses the second group.

---

# MOBILE LAYOUTS : General Patterns

All pages follow the same mobile rules:

- **Nav** → drawer.
- **Multi-column → stacked.**
- **Typography scales down 0.875×** (TOKENS.md §2.4).
- **Buttons** → can be full-width on narrow viewports for one-tap conversion.
- **CTAs** → primary CTA always visible in the first viewport.
- **Footer** → single-column nav.
- **Timeline** → vertical on mobile.
- **Cards** → full-width, not 3-across.

---

# INTERACTION NOTES

## Homepage micro-interactions

- **Hero headline:** fades up 16px on page load, 400ms `ease.emphasized`, once.
- **CTA buttons:** hover lifts shadow, color shift. No layout change.
- **Project cards:** hover increases border opacity, lifts shadow.
- **FAQ items:** expand smoothly on click, single-open behavior.
- **Section anchors:** smooth-scroll to sections if you add `#projects` style anchors later.

## Page transitions

- Page enter: 300ms fade-in via CSS view transitions (when supported) or simple opacity transition.
- No page-load animations that delay first paint.

## Forms

- Submit button shows inline spinner (button width preserved).
- Error messages appear below input with `role="alert"`.
- Success state: form replaced with "Thanks: we'll be in touch within 1 business day."

---

# UX RATIONALE : WHY THIS LAYOUT

## Why this homepage section order

The order follows the messaging hierarchy:

| Order | Section           | Hierarchy step(s)         | Why here                                             |
| ----- | ----------------- | ------------------------- | ---------------------------------------------------- |
| 1     | Nav               | :                         | Always present, doesn't disrupt the flow             |
| 2     | Hero              | Outcome + solution + tech | First viewport. Tells the visitor in 5 seconds.      |
| 3     | Business Problems | Problem                   | "Is this for me?": make them feel seen.              |
| 4     | Our Approach      | Solution (process)        | "What happens if I book?": de-risk the decision.     |
| 5     | Primary Services  | Solution (offer)          | "Specifically what?": the offer made concrete.       |
| 6     | Our Principles    | Solution (how)            | "How do you actually work?": operating principles.   |
| 7     | How We Work       | Solution (engagement)     | Reinforces that this is a real engagement.           |
| 8     | Featured Projects | Proof                     | "Have you done this before?"                         |
| 9     | Technology Stack  | Technology                | Technical credibility, categorised by purpose.       |
| 10    | Why Work With Us  | Differentiation           | "Why Elion vs alternatives?"                         |
| 11    | Who We Work With  | Qualification             | Self-select before the CTA.                          |
| 12    | FAQ               | Objection handling        | Pre-empt remaining concerns.                         |
| 13    | CTA Strip         | Next step                 | Final conversion prompt.                             |
| 14    | Footer            | :                         | Secondary navigation + long-term positioning signal. |

Every section answers one of the visitor's 6 questions; nothing earns its place if it doesn't.

## Why the principles section comes after services

Principles are more durable than services. Showing them after the visitor has seen the services means the principles are read as "and this is how we approach all of it," not "and by the way, here are our values." Trust is earned by the order, not just the words.

## Why the Who We Work With section comes late

Most visitors will already feel the site is for them by section 11. The qualification section is for the visitors who are still uncertain: it gives them a clear answer before they hit the CTA. Visitors who disqualify themselves in section 11 weren't going to convert anyway.

## Why CTAs appear where they do

- **Hero CTA (Section 2):** For visitors ready to convert immediately.
- **Final CTA strip (Section 13):** For visitors who read but didn't convert. Placed at the natural end of the persuasive arc.
- **No CTAs in Sections 3-12:** These sections build trust or qualify. Asking for conversion in the middle of an argument interrupts the argument.

## Why no testimonials section

The brief explicitly forbids fabricated testimonials. The alternative: an empty section with a placeholder: would damage trust. Trust comes from specificity, strong explanations, transparent communication, and the 4 sources listed in UX_PRINCIPLES.md §1.2.

## Why no "Trusted by" logo bar

Same reasoning. No real logos = no logo bar.

## Why project labels are explicit

"Personal project" sounds less impressive than "Client work": but it's honest. Visitors who know the difference (and they do) trust honesty more than polish.

## Why the footer carries a quiet long-term positioning line

Per D-012, the footer carries a small line about being a technology company. This signals long-term intent (Elion will ship products one day) without inventing product pages or "coming soon" placeholders. It's the right way to communicate a future without lying about the present.

---

# WHAT NEEDS YOUR REVIEW BEFORE PHASE 4

1. **The hero headline: "Same team. More output. Less friction."** Confirm or override.
2. **The 6 Our Principles items.** Confirm or override: these are the operating principles you actually want to commit to in writing. Each is observable, falsifiable, and constrains behaviour.
3. **The Who We Work With / Not lists.** Confirm the positive list (5 ideal client types) and negative list (5 disqualifiers) match your actual targeting.
4. **The 3 placeholder projects.** I drafted labels (HR Management Platform, Lead Generation Platform, Workflow automation demo): confirm these are projects you've actually built. If not, swap them for real ones.
5. **The Cal.com placeholder on `/contact`.** Confirm Cal.com is fine, or specify Calendly / SavvyCal / your real link.
6. **The "technology company building systems for growing businesses" footer line.** Confirm or rewrite: this is the long-term positioning signal per D-012.
7. **The About page reduction.** My Story is now one paragraph; How I Think is the largest section. Confirm the ratio feels right or specify the balance you want.

Once you answer those, Phase 4 begins. No code yet until you say go.
