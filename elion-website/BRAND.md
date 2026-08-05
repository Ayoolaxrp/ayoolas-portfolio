# Elion : Brand Guide

> The single source of truth for what Elion looks like, sounds like, and feels like.
> Every product surface (marketing site, client dashboard, admin portal, internal tools) inherits from this document.

**Version:** 0.2 (Phase 3.5: post-positioning audit)
**Last updated:** 2026-07-24
**Owner:** Founder (strategy / business) → Engineering (execution)

---

## 1. Mission

Help growing businesses accomplish more with the team they already have by designing automation, custom software, and AI systems that remove operational friction.

## 2. Vision

Become a long-term technology partner that helps growing businesses build better systems: first through engagements, then through products that help teams operate more intelligently.

## 3. Core Belief

Growing businesses lose hours every week to work that software should be doing. The right systems let the team focus on the work that actually matters. Technology supports the business: it doesn't lead it.

## 4. Brand Personality

If Elion were a person, it would be:

| Trait                       | What it means in design                                                                |
| --------------------------- | -------------------------------------------------------------------------------------- |
| Thoughtful                  | Nothing is decorative. Every element earns its place.                                  |
| Reliable                    | The interface does what it says. State is always explicit.                             |
| Calm                        | Motion is quiet. Transitions don't demand attention.                                   |
| Highly competent            | Details are precise. Spacing is consistent.                                            |
| Curious                     | The brand is willing to learn in public (blog, case studies).                          |
| Disciplined                 | The design system constrains choice.                                                   |
| Modern                      | We use current tools and patterns.                                                     |
| Approachable                | Plain language. No jargon in user-facing copy.                                         |
| Confident without arrogance | We don't boast. We show our work.                                                      |
| Long-term                   | We design for the system being maintainable in year three, not impressive in week one. |

## 5. Messaging Principles

### 5.1 Positioning statement (anchor for every page)

> **We help growing businesses do more with the team they already have by designing automation, custom software, and AI systems that remove operational friction.**

Every page, section, and headline reinforces this statement or it gets cut.

### 5.2 Messaging hierarchy (every section follows this order)

1. **Business problem**: name the visitor's pain first.
2. **Operational outcome**: what changes when the pain goes away.
3. **Solution**: what Elion actually does.
4. **Technology**: only after the value is clear; briefly, supporting the story.
5. **Next step**: the CTA.

Technology supports the story. It never leads it.

### 5.3 Voice

- **Direct, not clever.** A button says "Book a Discovery Call," not "Let's Talk."
- **Plain language.** No "leverage," "synergy," "solutions," "ecosystem," "best-in-class."
- **Specific over general.** "Reports take 3 days to compile" beats "reporting is slow."
- **Active voice.** "We design" beats "systems are designed."
- **Short sentences.** Avoid subordinate clauses when a period will do.

### 5.4 Tone

- **Warm but not chatty.** Friendly, professional, never cute.
- **Honest about uncertainty.** "We don't know yet" is acceptable. "We're not sure yet" is better.
- **Never boastful.** Don't say "world-class." Show work that is.
- **Calm confidence.** No chasing trends. No breathless adjectives. Restraint signals competence.

### 5.5 Vocabulary: how we describe ourselves

We position Elion as a **long-term technology partner**, not an "AI agency." Default to:

- **Systems**: durable, designed, owned by the client.
- **Operations**: the visitor's daily work, in their language.
- **Workflows**: concrete sequences the visitor can point at.
- **Business processes**: outcomes, not technical artefacts.
- **Software**: what gets built; descriptive, not magical.

Use **AI** sparingly, only when AI is specifically what makes the system work. The visitor should understand the value before they encounter the word.

### 5.6 What we never say

- "AI agency"
- "AI-powered solution"
- "AI-driven transformation"
- "Freelancer"
- "Web developer"
- "Programmer" (in user-facing copy)
- "Just" (as in "just send an email": patronizing)
- "Game-changing," "revolutionary," "next-generation," "cutting-edge" (when describing ourselves)

### 5.7 What we say instead

| Don't say                         | Say                                                               |
| --------------------------------- | ----------------------------------------------------------------- |
| AI agency                         | Technology partner / systems builder / long-term partner          |
| AI-powered solution               | Automated workflow / AI assistant / intelligent system (specific) |
| AI-driven transformation          | Systems that remove operational friction                          |
| Web developer                     | Systems builder, technology partner                               |
| Freelancer                        | Founder (in your own bio); Elion (referring to the company)       |
| We'll revolutionize your business | We'll help your team spend less time on repetitive work           |
| Best-in-class                     | Show evidence. Let the reader decide.                             |

## 6. Visual Rules

### 6.1 What's allowed

- Generous whitespace
- Large, confident typography
- Subtle motion (≤200ms for micro-interactions, ≤400ms for page-level)
- One accent color per surface (Emerald primary, Soft Blue secondary, used sparingly)
- Soft shadows that suggest depth without screaming
- Glass / blur effects only when there's a clear layering reason (modal over content, nav over hero)
- Asymmetric grids where they help clarity

### 6.2 What's forbidden

- Bright neon colors
- Cyberpunk / "matrix" / futuristic themes
- Robot illustrations
- Stock photos of people in suits shaking hands
- Generic AI brain / chip / network illustrations
- Gradients used as decoration (gradients are allowed only for subtle depth, never as a primary surface)
- Animated backgrounds
- Loading spinners as a primary loading state (use skeletons or progress bars)
- Auto-playing video or audio

### 6.3 Photography

Until we have real photography, **do not use stock photos.** Use:

- Abstract geometric shapes (SVG)
- Code snippets (real, readable, with file names)
- Architecture diagrams (when they explain something)
- Founder's actual headshot (when one exists)

## 7. Logo Guidance

V1 uses a **wordmark only.** No logomark yet.

- **Default:** Inter Semi Bold, all lowercase, tight letter-spacing: `elion`
- **Mono variant:** Inter, all uppercase, wider letter-spacing: `ELION` (for headers, very small contexts)
- **Logo spacing:** optical: minimum 1× x-height of clear space on all sides
- **Logo color:** `text.primary` on dark surfaces; `text.primary` on light surfaces (when light mode ships)
- **Never:** rotate the logo, place it on busy imagery, use a stroke variant, add a tagline inside it

When a logomark is designed in a future phase, it should be:

- Geometric, not figurative (no neural-network nodes, no AI brains)
- Single-color
- Mono and pair-friendly with the wordmark

## 8. Iconography

### Recommendation: **Lucide** (open-source, MIT, tree-shakeable, 1,500+ icons)

**Why:**

- Matches Linear / Vercel / Notion's icon language (the audience already knows it).
- Stroke-based, scales cleanly, stays legible at 16px.
- Open license (no per-seat cost for future internal tools).
- Strong semantic naming (`User`, `Building2`, `Workflow`) that doesn't fight code review.

**Sizing rules:**

- `16px` for inline-with-text
- `20px` for buttons, list items
- `24px` for nav, feature cards
- `32px+` for hero / decorative

**Color rules:**

- Default: `icon.primary` (`text.secondary` on dark)
- Hover: `icon.hover` (`text.primary`)
- Active: `accent.primary` (Emerald)
- Disabled: `icon.disabled` (`text.disabled`)

**Never:**

- Two different icon styles in the same view
- Filled icons next to outline icons (mix = chaos)
- Decorative icons that don't carry meaning

## 9. Component Philosophy

A component is approved when:

1. It exists in **tokens** (colors, spacing, type): no hardcoded values
2. It has a **purpose statement** ("used when X")
3. It has **clear variants** (primary/secondary/ghost, size scale)
4. It has documented **states** (default, hover, focus, active, disabled, loading, error)
5. It's accessible (keyboard, screen reader, contrast)
6. It's responsive (works at 320px through 1920px+)

### 9.1 V1 component inventory

The marketing site in V1 needs:

- Button (primary, secondary, ghost, link variants; sm/md/lg)
- Input (text, email, textarea, with label + error + helper)
- Container (max-width wrappers)
- Section (vertical rhythm primitive)
- Heading (display, h1-h4, eyebrow)
- Card (base, feature, project)
- NavBar
- Footer
- MobileNav (drawer)
- Badge / Tag
- FAQ Item (accordion)
- FAQ List
- CTA Strip (bottom-of-page prompt)
- Stat (number + label)
- Logo Cloud
- Skeleton loader

The full 30+ component library (forms, tables, modals, drawers, command palette, etc.) is a **future phase**, scoped when we have a real second surface (dashboard, admin) to design for. See DECISIONS.md D-002.

## 10. Don'ts (visual)

- Don't use a gradient as a hero background.
- Don't center-align body copy.
- Don't use Title Case for headings (`Build Better Systems`, not `Build better systems`). Sentence case is the convention per COPY_GUIDELINES.md §3.3.
- Don't use Inter for code (use JetBrains Mono or system mono).
- Don't show a spinner as the only loading state on a form submission.
- Don't animate text appearance (type-on, fade-up paragraphs).
- Don't use emoji in production UI.
- Don't use hover effects that shift layout (scale, translate up). Hover should change color / shadow / opacity, not geometry.

## 11. Do's (visual)

- Use a single accent color per section.
- Use `<h2>` for section titles, `<h3>` for sub-sections.
- Set `max-width: 65ch` on body paragraphs for comfortable reading.
- Use 8px base spacing unit.
- Group related metadata with consistent vertical rhythm.
- Show real data and real code where possible.
- Use whitespace as a primary design element.
- Show loading skeletons that match the final layout shape (not generic rectangles).

## 12. Future Brand Evolution

The brand will need to evolve when:

- The company ships a SaaS product (logo + color may need to differentiate from the services arm; nav gains a "Products" item; see D-012).
- The team grows beyond founder + 1 (introduce team page patterns, bios).
- International expansion requires locale-aware copy patterns.
- The blog becomes a primary surface (article design becomes a focus area).

Until then, **don't redesign what works.** Restraint is a feature.

### 12.1 Long-term positioning as a technology company

Elion's long-term intent is to be a **technology company that ships products**, not only a service business. The site's architecture (and a deliberate whitespace in the footer: see D-012) reserves capacity for that future without inventing products that don't exist today.

**What the site does today to signal this:**

- Footer carries a quiet line about being a technology company.
- The services taxonomy is structured to grow (services expand into product categories when SaaS / tools ship).
- `/projects` hosts both case studies and future product write-ups without restructuring.

**What the site does NOT do:**

- Invent product pages, fake product names, or "coming soon" placeholders.
- Claim to be a product company before products exist.
- Reposition services as products: services and products are different surfaces.

---

## 13. See also

- `TOKENS.md`: concrete color, type, space, motion values
- `COMPONENTS.md`: V1 component specifications
- `DECISIONS.md`: reasoning log for every decision in this document
