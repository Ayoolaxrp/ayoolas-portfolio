# Elion : UX Principles

> The reasoning behind every layout, hierarchy, and interaction decision.
> Use this when designing new pages, evaluating existing ones, or onboarding a new designer/engineer.

---

## 1. UX Philosophy

### 1.1 The site is a guided conversation, not a brochure.

Every page answers a question in a sequence. The homepage sequence is:

1. What does Elion do?
2. Why should I care?
3. What business problems does Elion solve?
4. Why should I trust this company?
5. What happens if I work with them?
6. How do I get started?

Every section exists to move the visitor one step closer to question #6. If a section doesn't advance that conversation, it's cut.

### 1.2 Trust is earned in the absence of social proof.

We are not using fabricated testimonials, logos, or metrics. So trust has to come from other sources:

- **Clear thinking.** Every claim is specific. "Reports take 3 days to compile" beats "reporting is slow."
- **Strong explanations.** The About page explains how you think, not just what you've done.
- **Excellent UX.** If the website itself feels broken, no amount of copy saves it.
- **Transparent communication.** Pricing ranges, scope clarity, process visibility: no mystery.
- **Honest positioning.** "AI Operations Engineer" not "world-class team of experts."
- **High-quality writing.** No typos, no jargon, no breathless adjectives.
- **Thoughtful project breakdowns.** Real problem → real architecture → real lessons.
- **Professional design.** Restraint signals competence more than polish.
- **Technical competence visible in the work.** Code snippets, architecture diagrams, real numbers.
- **Consistency.** The same standards applied across every page signal that this is a system, not a one-off.

### 1.3 The reader is busy.

CEOs, founders, operations managers: none of them are reading your site for fun. They have a problem and 5 minutes to decide if you're worth a call.

- **Skimmable.** Headings + first sentence of every section should make sense without reading further.
- **Specific.** The first paragraph of any section is the most important.
- **Progressive disclosure.** Hero → problem → approach → services → proof → CTA. Each section adds one new piece of context.
- **Mobile-first.** ~50% of traffic will be on phones. The site must work at 320px width without compromise.

### 1.4 Conversion is a side effect, not the goal.

A page that screams "BOOK NOW" feels desperate. A page that answers questions confidently makes booking a natural next step. We design for the latter.

---

## 2. Information Hierarchy

### 2.1 The hierarchy of attention

Within any page, attention flows top-to-bottom and left-to-right. We lean into this:

1. **First viewport** (above the fold): the single most important thing the visitor needs to know.
2. **Hero section** (1-2 screens): the offer + the primary CTA.
3. **First scroll** (3-5 screens): why it matters to the visitor specifically.
4. **Mid-page**: how we work, who we've worked with, what they're like.
5. **Final scroll**: FAQ, final CTA, footer.

The closer to the top, the more critical the content. The closer to the bottom, the more we expect the visitor is already convinced.

### 2.2 The hierarchy of typography

Type size signals importance. Display sizes are reserved for:

- Hero headline (one per page)
- Section titles that introduce a major shift in topic

Body sizes are reserved for everything else. Eyebrow text (12px uppercase) is reserved for **section labels** ("OUR APPROACH", "PROJECTS"): it gives the eye an anchor.

### 2.3 The hierarchy of color

Color is used to:

1. **Mark primary CTAs** (Emerald, one per view).
2. **Mark secondary CTAs** (Soft Blue, one per view max).
3. **Mark interactive text** (links, accent text).
4. **Indicate state** (success, warning, error).

Color is **not** used to:

- Decorate.
- Compete with the typography hierarchy.
- Convey meaning without a textual backup (accessibility).

---

## 3. Navigation Principles

### 3.1 Primary navigation

Five items max in the top nav:

- Home
- About
- Services
- Projects
- Contact

That's it. Resources, Blog, Pricing, Team: none of these are in V1 primary nav. Blog lives at `/blog` (accessible from footer), Resources is deferred per Phase 1 D8.

### 3.2 Why these five

Each nav item corresponds to a question a serious prospect asks:

| Question                     | Nav item |
| ---------------------------- | -------- |
| What is this?                | Home     |
| Who's behind it?             | About    |
| What do you do specifically? | Services |
| Have you done it before?     | Projects |
| How do I start?              | Contact  |

The order is also the order a visitor would naturally want to answer them. Home → About → Services → Projects → Contact is the path of increasing commitment.

### 3.3 The CTA in the nav

The nav includes one persistent CTA: **Book a Discovery Call.** This is the single highest-leverage conversion action and lives in the nav so it's never more than one click away, no matter where the visitor is on the site.

### 3.4 Footer navigation

The footer repeats the primary nav but adds:

- Blog (for SEO surface)
- Privacy / Terms (legal requirement)
- Contact email (alternate path)
- Social links (LinkedIn primary)

The footer is for visitors who've already decided they're interested but want to find a specific page. It's not designed for first-time discovery.

---

## 4. Conversion Strategy

### 4.1 One primary conversion action

The primary CTA is **Book a Discovery Call.** Every page has exactly one primary CTA button. Secondary CTAs (Explore Projects, Read Case Study, Learn More) support the primary CTA: they don't compete with it.

### 4.2 Where CTAs appear

| Page            | Primary CTA                                            | Secondary CTA           |
| --------------- | ------------------------------------------------------ | ----------------------- |
| Home            | Book a Discovery Call (hero + final CTA strip)         | Explore Projects        |
| About           | Book a Discovery Call (final CTA strip)                | :                       |
| Services index  | Book a Discovery Call (hero)                           | See individual services |
| Service detail  | Book a Discovery Call (hero + final strip)             | See a related project   |
| Projects index  | Book a Discovery Call (final strip)                    | Read a specific project |
| Project detail  | Book a Discovery Call (final strip)                    | See related services    |
| Contact         | Submit form / Open calendar (page-specific)            | :                       |
| Blog            | (no CTA: readers are here for content, not conversion) | Subscribe (future)      |
| Privacy / Terms | (no CTA: legal pages)                                  | :                       |

### 4.3 Why CTAs repeat on long pages

A long page (homepage, services detail) repeats the primary CTA at the top, mid-page, and bottom. Reasoning: visitors don't scroll at the same rate, and a CTA at the top is invisible to someone who lands at the bottom (e.g. via in-page anchor link from another page).

### 4.4 The discovery call

The CTA leads to `/contact`, which has:

- A calendar embed (Cal.com, easy to swap for Calendly or your real link later)
- A contact form (for non-booking inquiries: international visitors, technical questions, partnerships)

The form is **not** a substitute for the calendar: it's an alternative for visitors who aren't ready to commit to a time slot.

### 4.5 What we don't do

- ❌ Exit-intent popups. Annoying, breaks trust.
- ❌ "Limited time offer" copy. Dishonest, breaks trust.
- ❌ Chatbots. Cheap, noisy, and we don't have the team to monitor them.
- ❌ Auto-playing video. Distracting.
- ❌ Two competing CTAs in the same view (e.g. "Subscribe" and "Book a Call" both as primary).

---

## 5. Accessibility Philosophy

### 5.1 Accessibility is a quality requirement, not a checkbox

Every page must be usable by:

- **Keyboard-only users.** Tab through every interactive element. Focus indicators always visible.
- **Screen reader users.** Semantic HTML (no `<div>` soup). ARIA only where HTML can't express semantics.
- **Low-vision users.** Contrast ≥4.5:1 for body text, ≥3:1 for large text and UI components.
- **Motion-sensitive users.** `prefers-reduced-motion: reduce` honored everywhere.
- **Touch users.** Tap targets ≥44×44px on mobile.
- **Slow connections.** Skeleton loaders, not blocking spinners. Static content readable while JS hydrates.

### 5.2 Specific rules

- **One `<h1>` per page.** Subsequent headings nest correctly (`h1 > h2 > h3`).
- **All images have alt text** (decorative images use `alt=""`).
- **Forms have visible labels** (no placeholder-as-label).
- **Errors are linked to inputs** via `aria-describedby`, announced via `role="alert"`.
- **Color is never the only signal.** State uses icon + color + text.
- **Focus order matches visual order.** Never `tabindex="1"` unless you have a very good reason.
- **Skip-to-content link** at the top of every page.

### 5.3 Testing

Phase 5 includes:

- axe-core in CI (catches 80% of issues automatically)
- Manual keyboard navigation test on every page
- Screen reader smoke test (VoiceOver on macOS, NVDA on Windows)
- Reduced-motion test

---

## 6. Mobile-first Considerations

### 6.1 Why mobile-first

~50% of traffic is mobile. If the site works on mobile, the desktop design is usually trivial. The reverse is not true.

### 6.2 Mobile breakpoints

| Name             | Min-width | Tailwind    |
| ---------------- | --------- | ----------- |
| Mobile (default) | 0         | (no prefix) |
| Tablet           | 640px     | `sm:`       |
| Laptop           | 1024px    | `md:`       |
| Desktop          | 1280px    | `lg:`       |
| Wide             | 1536px    | `xl:`       |

We design mobile first, then add `sm:`, `md:`, `lg:` overrides as screen real estate allows. We never design desktop and then "make it fit on mobile": that produces compromised mobile experiences.

### 6.3 Mobile-specific patterns

- **Nav becomes a drawer** below 1024px.
- **Multi-column layouts stack vertically** below the natural breakpoint.
- **Typography scales down 0.875×** (see TOKENS.md §2.4).
- **Tap targets are 44×44px minimum** (buttons use `lg` size below 480px).
- **Horizontal scroll is forbidden** at any width.
- **CTA buttons can be full-width** on mobile for one-tap conversion.

### 6.4 Mobile conversion paths

The mobile CTA path is:

1. Hero CTA (Book a Call) → `/contact` → calendar opens in browser.
2. Bottom CTA strip (Book a Call) → same.

The form on `/contact` works fully on mobile. The calendar embed should be responsive (Cal.com / Calendly both are by default).

---

## 7. Content Hierarchy

### 7.1 The rule of one

Every page has **one** primary message. Everything on the page supports that message.

- Home: "Replace repetitive work with intelligent systems."
- About: "A founder who thinks in systems, not features."
- Services: "Three ways to start."
- Projects: "Real problems, real architecture, honest outcomes."

If a section doesn't support the page's primary message, it's cut or moved to a more appropriate page.

### 7.2 The rule of progressive disclosure

Reveal information in the order a visitor needs it:

1. **Hero.** What's offered. Why care.
2. **Problem.** What pain do you solve. Make them feel seen.
3. **Approach.** How an engagement starts. De-risk the decision.
4. **Services.** What you specifically do.
5. **Proof.** How you've done it before (or, in V1, how you think about doing it).
6. **Process.** What happens if they book a call.
7. **FAQ.** Concerns they haven't asked yet.
8. **CTA.** The next step.

### 7.3 Section-to-section transitions

Each section ends with a sentence or visual that bridges to the next. Examples:

- "Most teams spend hours on repetitive work that software should handle." → bridges to "Here's how we approach it."
- "Here's a recent project." → bridges to "Read the full case study."

The site reads as a continuous argument, not as a stack of disconnected cards.

---

## 8. Interaction Principles

### 8.1 Animation communicates feedback, not decoration

- **Hover** → color or shadow change, never layout shift.
- **Click** → brief scale-down (`0.98`) and color change.
- **Focus** → ring appears (always visible, never subtle).
- **Page enter** → fade-in over 300ms.
- **Section enter** → fade-up 16px over 300ms (only on first viewport).
- **Loading** → skeleton that matches final shape, never a generic spinner.

### 8.2 Micro-interactions worth designing well

- **Button hover.** Color shifts, not layout shift. Subtle shadow lift.
- **Card hover.** Border becomes slightly stronger. Shadow lifts. Cursor changes (only on interactive cards).
- **Input focus.** Border becomes accent color. Ring appears.
- **Nav scroll.** Background becomes blurred, border appears.
- **Form submission.** Button shows spinner, button width preserved.

### 8.3 Micro-interactions to avoid

- ❌ Parallax scrolling (heavy on mobile, breaks on slower devices).
- ❌ Auto-rotating carousels (annoying, accessibility nightmare).
- ❌ Page transitions that delay first paint.
- ❌ Animated illustrations on first load.
- ❌ Anything that loops indefinitely.

### 8.4 The 200ms rule

Most interactions should complete in ≤200ms. If an animation takes longer than that, the user has time to wonder "is this loading or broken?": that's a failure state.

Exceptions: page-level transitions (≤400ms), first-viewport reveals (≤400ms once on load).

---

## 9. Decision-Making Framework

When evaluating a design choice, ask:

1. **Does it support the page's primary message?** (Rule of one.)
2. **Does it move the visitor toward booking a call?** (Conversion.)
3. **Does it work without JavaScript?** (Accessibility + performance.)
4. **Does it work at 320px width?** (Mobile-first.)
5. **Will it still make sense in 5 years?** (Longevity.)
6. **Does it require maintenance?** (Ecosystem cost.)
7. **Is it honest?** (Trust.)

If the answer to any of these is "no" and the alternative is viable, choose the alternative.

---

## 10. See also

- `BRAND.md`: the personality that informs these principles
- `TOKENS.md`: the values these principles reference
- `COMPONENTS.md`: the components these principles shape
- `DECISIONS.md`: the reasoning behind specific calls
