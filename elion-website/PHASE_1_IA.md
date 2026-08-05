# Phase 1 : Information Architecture, Content Strategy, User Journeys

**Project:** Elion (working name)
**Founder:** Ayoolamikun Awodeyi
**Goal:** Convert business owners into booked discovery calls.
**Trust principle:** No fabricated testimonials, logos, metrics, awards. Honest copy wins.

---

## 1. Site Map

### Top-level navigation (public site)

```
Home                  /
About                 /about
Services              /services
  └ Workflow Automation                 /services/workflow-automation
  └ Internal Business Systems           /services/internal-business-systems
  └ AI Assistants & Dashboards          /services/ai-assistants-and-dashboards
  └ (secondary services index)          /services#more
Projects              /projects
  └ Project detail (one per project)     /projects/[slug]
Blog                  /blog
  └ Post                                /blog/[slug]
  └ Category                            /blog/category/[slug]
Resources             /resources
Contact               /contact
Privacy               /privacy
Terms                  /terms
404                   /not-found
```

### System pages

```
/api/og             # dynamic OG image generation
/robots.txt
/sitemap.xml
/feed.xml           # RSS feed for the blog
```

### Admin / authoring surfaces (later)

```
/admin              # CMS dashboard (deferred: Phase 5)
```

For V1, content lives in the repo as MDX files under `content/`. A CMS layer can be added later without changing the public site.

---

## 2. Page purposes

| Page              | Purpose                                                                                             | Primary conversion action              |
| ----------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Home              | Establish credibility, explain the offer, route to discovery call                                   | Book Discovery Call                    |
| About             | Build trust through how the founder thinks, solves problems, and works with clients (not biography) | Book Discovery Call                    |
| Services (index)  | Show full capability surface, not just the 3 homepage heroes                                        | Click into a service                   |
| Services (detail) | Explain a specific service: who it's for, what's included, what's the process                       | Book Discovery Call                    |
| Projects (index)  | Show real work with full case-study structure                                                       | Read a project / Book a call           |
| Projects (detail) | Long-form case study (Problem → Research → Architecture → Implementation → Lessons → Future)        | Book Discovery Call                    |
| Blog              | SEO surface for educational content; builds authority over time                                     | Subscribe / Read related / Book a call |
| Resources         | Curated list of tools, templates, frameworks (later: Phase 5 polish)                                | Download / Read                        |
| Contact           | Calendar embed + form + direct contact                                                              | Book Discovery Call                    |
| Privacy / Terms   | Legal                                                                                               | none                                   |

---

## 3. Three User Journeys

### Journey A : "The CEO With a Pain" (primary)

**Persona:** Founder/CEO of a 20–100 person services company (HR, recruitment, training, logistics). Knows they have repetitive operational work. Doesn't know what "AI ops" actually means.

1. Lands on `/` from a Google search on "workflow automation for HR companies" or a LinkedIn post.
2. Hero: headline reads "Same team. More output. Less friction." → clicks "Book a Discovery Call" **OR** keeps scrolling.
3. "Business Problems" section names their exact pain (e.g. "Your team spends 8 hours a week moving data between spreadsheets"). They feel seen.
4. "Our Approach" section describes how an engagement starts (no jargon: a discovery call, a process audit, a fixed scope).
5. "Primary Services" shows three concrete things. They self-identify with one.
6. "Our Principles" reassures them that the work would be done thoughtfully (handover, ownership, plain language).
7. "How We Work" shows the timeline.
8. "Featured Projects" shows real (not fabricated) work: labelled honestly (personal, experimental, or demonstration).
9. "Who We Work With" confirms they fit.
10. "FAQ" answers "How much does this cost?", "Do I need to be technical?", "How long does a project take?".
11. CTA: "Book a Discovery Call": calendar embed on `/contact`.
12. Outcome: discovery call booked.

**Critical sections for this journey:** Hero, Business Problems, Our Approach, Primary Services, Our Principles, Featured Projects, Who We Work With, FAQ, CTA.

### Journey B : "The Recruiter / Ops Manager Vetting Credibility" (secondary)

**Persona:** Operations Manager evaluating whether this is a real partner or a freelancer with a fancy site.

1. Lands on `/` from a referral ("check out this person").
2. Hero → CTA → they ignore it. They click **About**.
3. `/about`: founder story is honest, specific, and shows systems thinking. They read it fully.
4. They click **Projects** to see actual work.
5. `/projects/[slug]`: each project has the full case-study structure. They can tell real from made-up.
6. They notice: no testimonials section, no "trusted by" logos, no fake metrics. **This is a positive signal**: it reads as honest rather than sparse.
7. They click **Contact**, see a calendar embed, book a call.
8. Outcome: discovery call booked, with a higher trust floor than Journey A.

**Critical sections for this journey:** About (story + values + thinking), Projects (full case studies), Contact (calendar).

### Journey C : "The International Comparator" (tertiary)

**Persona:** Overseas company looking at 3-5 systems / automation consultancies, comparing approach, communication, and breadth of capability.

1. Lands on `/` from a list post or a search.
2. They scan: do you work with international clients? (FAQ / About)
3. They check `/services/[slug]` for clarity on what's included.
4. They check `/blog`: even one or two thoughtful posts signals "this person thinks in writing, which means they think at all".
5. They look for a way to ask a non-booking question (contact form, not just calendar). I'll add a contact form on `/contact` for this.
6. Outcome: either books a call, sends a question, or bookmarks for later.

**Critical sections:** FAQ (international scope), Services detail (specific deliverables), Blog (depth signal), Contact (non-booking form).

---

## 4. Content Strategy : What's Where, and What's Missing

### Homepage copy direction

- **Hero headline (decided):** "Same team. More output. Less friction." Three-beat rhythm, outcome-led, no AI vocabulary. See COPY_GUIDELINES.md §3.4 for the analysis of alternatives.
- **Hero subhead:** 1 sentence reinforcing the positioning statement. "We help growing businesses do more with the team they already have. We design the automation, custom software, and AI systems that remove the operational friction in your business." Per messaging hierarchy: outcome first, solution second, technology third.
- **Business Problems:** 4-6 specific operational pains (data entry, lead routing, reporting, internal handoffs, customer follow-up, onboarding). Each pain is one short paragraph. No "in today's fast-paced world" filler.
- **Our Approach:** 3 steps: Discover, Design, Build. Each step is ~30 words. Plain language.
- **Primary Services:** the 3 hero services, each with a 2-sentence description and a "Learn more →" link to the service detail page.
- **Featured Projects:** 3-4 real projects, labelled accurately (e.g. "Personal project", "Demonstration work", "Internal tool"). Each shows: project name, one-line outcome, tech stack, link to case study.
- **Technology Stack:** 6 hero categories (Automation, Custom software, AI systems, Next.js, Data systems, Integrations) each with a 1-line benefit to the client. Categorised by purpose, not listed as a tech stew. Link to `/technology` for the full list.
- **Why Work With Us:** 4-6 differentiators grounded in reality: not "world-class team" (you don't have a team), but things like "Fixed-scope engagements", "You see the architecture before we build", "We build systems you'll actually maintain".
- **FAQ:** 6-8 questions. The real ones:
  - What does a discovery call look like? (15 min, no prep needed)
  - How much does a project cost? (Routes to Book a Discovery Call: NO placeholder ranges anywhere on the site, per D-008.)
  - Do I need to be technical? (No.)
  - How long does a project take? (2-8 weeks typical.)
  - Do you work with international clients? (Yes.)
  - What happens after you build something? (Handover, documentation, optional support.)
  - Will I own what you build? (Yes: every system, code, documentation, accounts.)
- **CTA:** final "Book a Discovery Call" with calendar embed.

### Homepage copy that will NOT exist in V1

- Testimonials section: built but hidden, per your spec.
- "Trusted by" logo bar: none yet.
- "Years in business" stat: instead use "since 2020" or whatever the real year is, or omit.
- Specific revenue/cost-savings metrics: only included if they're real.

### About page direction

- **Approach:** Reduce biography, increase thinking. The About page exists to build trust through how the founder thinks, solves problems, and works with clients: not through their life story.
- **Story:** ONE paragraph (4-6 sentences). Origin: how the founder came to this work, what they believed before founding Elion, why now. No childhood, no timeline of past jobs, no "in my free time I enjoy" filler.
- **How I Think:** the largest section. 4-6 paragraphs on the founder's approach to problems (systems thinking, long-term orientation, when to say no).
- **How I Solve Problems:** 4-step pattern (Observe → Define → Design → Build), each with a paragraph of what happens in practice.
- **How I Work With Clients:** what a client engagement feels like: async-first, written updates, plain-language reporting, architecture reviews.
- **Mission & Vision:** two-column layout, quiet callouts.
- **Photo placeholder:** "Photo coming soon" if you don't have a headshot ready. NOT a stock photo.

See PHASE_3_LAYOUTS.md §"About Page" for the full section ordering.

### Projects direction

For V1, I'll build the structure with **placeholder project slugs** but mark each as either "Personal", "Demonstration", or "Experimental": never "Client". When real client work is added later, the structure already supports it.

### Blog direction

- 1-2 launch posts to ship V1 with: one "Why I started Elion" post and one "How to evaluate AI automation for your business" guide. Both from your voice, marked clearly as opinion/guidance, not case studies.

### Copy voice

- Direct, not clever.
- Short sentences over long ones.
- Active voice ("we design" not "solutions are designed").
- No buzzwords: "leverage", "synergy", "solutions", "ecosystem", "best-in-class".
- Specific over general ("reports take 3 days to compile" not "reporting is slow").

---

## 5. IA Decisions That Need Your Sign-off

I want explicit approval on these before Phase 2. Defaults are listed: if any of them are wrong, tell me now.

### D1. Three hero services (homepage) : which 3?

Default: **Workflow Automation, Internal Business Systems, AI Assistants & Dashboards.**
Other services land on `/services` and individual `/services/[slug]` pages, not the homepage.
→ Approve or replace.

### D2. CTA target on the homepage "Book a Discovery Call" button.

Default: opens `/contact` which has a **calendar embed** (Cal.com placeholder, swap to your real link later) AND a contact form.
→ Approve, or specify "calendar only" / "form only".

### D3. Domain for OG metadata, footer, canonical URLs.

Default: `https://elion.ai`: placeholder. Single config file (`site.config.ts`) so it's a one-line change when you finalize a domain.
→ Tell me the real domain, or approve the placeholder.

### D4. Projects page in V1.

Default: ship with **3 placeholder projects** clearly labelled (Personal / Demonstration / Experimental). Real projects can replace them by editing MDX files. The full case-study structure (Problem → Research → Architecture → Implementation → Lessons → Future) is built but the placeholder copy is honest stubs.
→ Approve, or ask me to ship the projects page empty.

### D5. Testimonials / "Trusted by" / case-study metrics in V1.

Default: **built but hidden** (the component exists, the section doesn't render). First testimonial added by editing `content/testimonials/*.mdx` when real ones exist.
→ Approve, or request I remove the component entirely.

### D6. Internationalization.

Default: **English only, V1.** No `/[locale]/` route structure yet. Reason: adds 2× the work for V1 and you haven't said there's demand.
→ Approve, or ask me to add locale routing.

### D7. CMS in V1.

Default: **MDX files in the repo** (`content/blog/*.mdx`, `content/projects/*.mdx`). No CMS UI. Reason: you control the content, it's portable, and adding Sanity/Contentful later doesn't require a rewrite.
→ Approve, or specify a CMS now.

### D8. Pages I'm proposing to DROP from your original spec.

- `/resources`: defer to Phase 5. Empty page is worse than no page. The blog already covers long-form content.
- `/admin`: defer to a future version. MDX is the admin surface for V1.
  → Approve drops, or ask to keep them as stubs.

### D9. Bottom-of-page "book a call" prompt.

Default: **yes, every primary page ends with a CTA strip** ("Ready to stop doing repetitive work? Book a 15-minute discovery call."). Same calendar embed.
→ Approve.

### D10. Footer content.

Default: minimal: logo, 3-column nav (Company/Services/Resources), contact email, social links (LinkedIn primary, GitHub secondary, X optional), copyright, privacy/terms links.
→ Approve or specify.

---

## 6. What I'm NOT doing in Phase 1

- No fonts picked (Phase 2).
- No colors locked (Phase 2: your palette is approved, but token mapping happens in design system).
- No components built (Phase 3).
- No Next.js scaffold (Phase 4).
- No copy written (Phase 3: but copy direction is in §4 above).

---

## 7. What I need from you to proceed to Phase 2

1. **Answer D1–D10.** Just say "approve all" if the defaults are fine, or call out the ones you want changed.
2. **Confirm Phase 1 is acceptable.** If anything in §1–§6 is wrong, say so.
3. **(Optional but valuable)** A 3-4 sentence version of your origin story in your own words. I have your brief version but it'll read more like you if it comes from you. If you don't have time, I'll write from the brief and you correct it in Phase 3.

Once I have answers, Phase 2 begins: branding tokens, type scale, spacing scale, base components (Button, Card, Container, Section, NavBar, Footer). I'll deliver those as a design-system document + a static HTML preview (or a Storybook page, if you'd prefer to interact with it).
