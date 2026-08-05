# Elion : Implementation Log

> Living record of every Phase 4 session. Each session appends a new dated section.
> Read this file first if a session is interrupted: it tells the next engineer exactly where to resume.

---

## Session 1 : 2026-07-29 (resumed)

### Date

2026-07-29

### Completed phases

- **Phase 4.0**: Project setup ✅
- **Phase 4.1**: Reusable UI component library (13 components) ✅
- **Phase 4.2**: Navigation, Footer, layout, routing shell ✅

### Summary

Session 1 was interrupted partway through Phase 4.2. The recovery session audited the
repository, identified three issues (missing runtime dependencies, two ref-during-render
lint errors, two missing route families), fixed them, and verified all three quality
gates (`pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`) pass clean.

The shell is production-ready: every route from PHASE_1_IA §1 is registered with a
minimal `PageShell` placeholder listing the sections that Phase 4.3+ will fill. No page
content has been written: per Session 1 scope, no invented copy.

### Files created (this resume session)

- `src/app/services/page.tsx`: `/services` index stub
- `src/app/services/internal-business-systems/page.tsx`: service detail stub
- `src/app/services/ai-assistants-and-dashboards/page.tsx`: service detail stub
- `src/app/projects/page.tsx`: projects index stub
- `src/app/contact/page.tsx`: contact stub
- `src/app/privacy/page.tsx`: privacy stub
- `src/app/terms/page.tsx`: terms stub
- `src/app/not-found.tsx`: 404 page (not a stub: properly built since it's terminal)
- `.prettierrc`, `.prettierignore`: Prettier config
- `IMPLEMENTATION_LOG.md`: this file

### Files modified (this resume session)

- `package.json`: removed unused MDX deps (deferred until blog/resources phase);
  added `format`, `format:check`, `typecheck` scripts
- `eslint.config.mjs`: added `eslint-config-prettier` to disable formatting rules
- `next.config.ts`: pinned Turbopack root to project (suppresses stray lockfile warning)
- `src/components/ui/container.tsx`: fixed `Ref<HTMLElement>` → `Ref<HTMLDivElement>` type error
- `src/components/ui/section.tsx`: same fix
- `src/components/ui/field.tsx`: replaced ref-based id generation with `React.useId()` to satisfy React 19 `react-hooks/refs` rule
- `src/components/chrome/site-header.tsx`: replaced `setState-in-effect` (close mobile on route change) with explicit `onNavigate` callback on each link
- `src/components/chrome/mobile-nav.tsx`: accepts and propagates `onNavigate` callback
- `src/components/chrome/site-footer.tsx`: replaced `Linkedin`/`Github` lucide imports with inline SVGs (lucide v1.27.0 doesn't ship brand logos)
- All files (32): Prettier-formatted

### Verification results

| Gate       | Command                  | Result                                                  |
| ---------- | ------------------------ | ------------------------------------------------------- |
| Lint       | `pnpm lint`              | ✅ 0 errors, 0 warnings                                 |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors                                             |
| Build      | `pnpm build`             | ✅ Compiled successfully. 13 static routes prerendered. |
| Format     | `pnpm format`            | ✅ 32 files formatted, no changes needed after          |

### Routes registered (13 static)

```
/                                            (homepage stub)
/_not-found                                   (terminal 404)
/about
/contact
/privacy
/projects
/services
/services/ai-assistants-and-dashboards
/services/internal-business-systems
/services/workflow-automation
/terms
```

### Decisions made during implementation

1. **MDX pipeline deferred.** The pre-resume session installed MDX dependencies but did
   not wire them into `next.config.ts` and did not create `mdx-components.tsx`. Since
   `/blog` and `/resources` are explicitly deferred (per your earlier instruction "Do not
   create these routes"), the unused MDX packages were removed from `package.json` to keep
   the lockfile honest. They will be re-added intentionally when blog/resources ships.

2. **Inline SVGs for LinkedIn & GitHub.** `lucide-react@1.27.0` (the current latest on the
   registry) does not ship brand logo icons. Rather than adding a separate icon package
   (`simple-icons`, `react-icons`) for two icons, I shipped inline SVGs in
   `site-footer.tsx` using brand-standard monochrome glyphs. Documented inline.

3. **`turbopack.root` pinned.** Next detected a stray `package-lock.json` at `C:\Users\User\`
   (a leftover from earlier exploration) and warned that workspace root inference was
   unreliable. Pinned `turbopack.root` to the project directory in `next.config.ts`.

4. **`React.useId()` replaces counter-based id generation in `Field`.** The pre-resume
   implementation used `React.useRef + counter` to generate fallback ids. React 19's
   stricter lint rule (`react-hooks/refs`) flagged accessing `ref.current` during render.
   `React.useId()` is the correct primitive and is SSR-safe.

5. **Close-on-route-change lifted from effect to event handler.** Same root cause:
   `react-hooks/set-state-in-effect`. Resolved by adding `onNavigate` callback that fires
   from each link's `onClick`, avoiding the effect entirely. This is also a better
   pattern (responsive to user intent, not just route change).

### Remaining work (Phase 4.3 onward)

- **Phase 4.3: Homepage.** All 13 sections per PHASE_3_LAYOUTS.md and D-005 (the
  6-question answer sequence). Sections live in `src/components/sections/` (new folder).
- **Phase 4.4: Other marketing pages.** About, Services index (full), 3 service detail
  pages (full), Projects index (full), Contact (with calendar embed + form), Privacy, Terms.
- **Phase 4.5: Project detail & case studies.** After real projects provided.
- **Phase 4.6: SEO + meta.** OG image generation, JSON-LD, sitemap, robots.txt, RSS.
- **Phase 4.7: Accessibility QA.** axe-core, manual keyboard tests, screen reader smoke test.
- **Phase 4.8: Performance QA.** Lighthouse CI, bundle analysis, font loading verification.

### Exact resume point for Session 2

Session 2 begins Phase 4.3. The first file to write is `src/app/page.tsx`: replace the
`PageShell` placeholder with a real `<HomePage>` composition. Recommended structure:

```
src/app/page.tsx                          # composes the homepage sections
src/components/sections/
  hero.tsx
  business-problems.tsx
  our-approach.tsx
  primary-services.tsx
  our-principles.tsx
  how-we-work.tsx
  featured-projects.tsx
  technology-stack.tsx
  why-work-with-us.tsx
  who-we-work-with.tsx
  faq.tsx
  cta-strip.tsx                           # may reuse src/components/ui/cta-strip.tsx
```

All required primitives (Container, Section, Heading, Button, Card, FAQList, CTAStrip,
Badge, Stat) already exist in `src/components/ui/`. New section components are
compositions of those primitives plus the section copy from `elion-website/PHASE_3_LAYOUTS.md`.

---

## Session 3 : 2026-08-03 (PORTFOLIO PIVOT)

### Date

2026-08-03

### What happened

User directive: this project is **not** an Elion company site: it is the **personal
portfolio of Ayoolamikun Awodeyi (Ayoola)**. "Elion" is one of the projects featured on
the portfolio (a startup he founded, in development). The folder-name typo in the brief
("Alien") was confirmed to refer to this workspace.

**The `elion-website/` docs describe the old (superseded) direction.** They were left on
disk untouched: nothing was deleted. Read Session 3 notes below first, then use the
brief + code as source of truth, not those docs.

### What was completed

- **Identity pivot**: `src/config/site.config.ts` rewritten: name, role, nav (Home /
  About / Projects / Contact), CTA ("Get in touch"), footer columns (Explore / Focus /
  Connect). Social links are **placeholders** (email/github/linkedin): swap at the
  top of that file; they flow everywhere (header, footer, contact, JSON-LD).
- **Animation stack**: installed `gsap@3.15.0` + `lenis@1.3.25`. New
  `src/components/anim/` (`smooth-scroll.tsx` Lenis provider synced to GSAP ticker;
  `reveal.tsx` ScrollTrigger fade-up). Reduced-motion users get zero animation.
- **Homepage** (`src/app/page.tsx`): flow per user: Hero → About Me → What I Build →
  Featured Projects → Skills & Technologies → Experience → Contact. Sections in
  `src/components/sections/`. Hero has GSAP entrance; What I Build has 4 expandable
  cards (AI Automation, Full-Stack, Trading & Financial, Internal Business Platforms).
- **Projects**: `src/lib/projects.ts` holds 6 real projects with honest statuses
  (Email Automation Platform ≈90%, Elion in development, Lead Gen active, Ingenuity HR
  paused, AI Automation experiments, Portfolio live). `/projects` renders full case
  studies (problem / solution / architecture / features / challenges / lessons).
- **About**: story, how-I-work, values, interests, recognition (Conrad Challenge
  National Finalist, Duke of Edinburgh Bronze, MVP nominations, Microsoft certs).
- **Contact**: client-side form composing a `mailto:` link (no backend; nothing
  stored). Direct email/GitHub/LinkedIn.
- **Legal + SEO**: privacy/terms are real minimal pages; `sitemap.ts`, `robots.ts`,
  Person JSON-LD on homepage, per-page metadata.
- **Dead code removed**: `/services` + 3 service detail routes deleted (per user:
  fold into homepage "What I Build"); `page-shell.tsx` deleted (all pages real now).
- **Bug fix**: `duration-fast/normal/slow/deliberate` were NOT real Tailwind v4
  utilities (easings were; durations weren't) → hover transitions had no duration.
  Defined proper `@utility` classes in `globals.css`.
- **A11y**: mobile-nav now stops Lenis while drawer is open (background scroll lock
  via `src/lib/scroll.ts`); collapsed card content is `aria-hidden`+`inert`;
  semantic headings; skip-link; focus rings; reduced-motion honored.

### Verification results

| Gate       | Command                  | Result                          |
| ---------- | ------------------------ | ------------------------------- |
| Lint       | `pnpm lint`              | ✅ 0 errors                     |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors                     |
| Build      | `pnpm build`             | ✅ 11 static routes prerendered |
| Format     | `pnpm format:check`      | ✅ clean                        |

### Routes (11 static)

```
/  /about  /projects  /contact  /privacy  /terms  /_not-found  /robots.txt  /sitemap.xml
```

### Decisions

1. **Portfolio beats company site.** All Elion-company copy/config replaced by the
   personal portfolio direction per the brief. `elion-website/` docs retained as
   historical record, clearly marked superseded.
2. **GSAP + Lenis over Three.js.** Brief asked for GSAP/ScrollTrigger/Lenis: installed
   and used. Three.js skipped (would not genuinely enhance; perf cost). Framer Motion
   remains installed but unused by the new sections (GSAP drives scroll work).
3. **No fabricated data.** Project statuses/descriptions come verbatim from the user's
   brief. Placeholder social/domain values marked with TODO.
4. **Homepage sections are single-page flow** (no /services routes): per explicit user
   instruction. The 4 "What I Build" cards link to case studies on `/projects#slug`.

### Remaining work

- Replace placeholder social links + `SITE_URL` in `site.config.ts` with real values.
- OG image generation, real favicon/avatar, real project screenshots/links.
- Performance/Lighthouse + axe-core QA passes (Phase 4.7/4.8 equivalents).
- Optional: animated stats counters, blog, GitHub activity feed (deferred).

---

## Session 4 : 2026-08-03 (Portfolio V2 Refinement)

### Date

2026-08-03

### What happened

User brief: refine the portfolio to feel like "the portfolio of an engineer that
companies actively want to hire" (Vercel / Linear / Stripe / Framer / Raycast
calibre). Do not restart; improve the existing state. Keep Next.js, Tailwind,
dark theme, GSAP, Lenis, nav, responsive, a11y, and existing animations.

### What was completed

- **Em dash sweep (repo-wide).** Replaced every em dash character across `src/`,
  `elion-website/`, and this log with colons / periods / normal sentence
  structure. Verified: zero remain. Applied via a one-off Node script for
  comments/docs plus hand-edits for user-facing copy.
- **Animation layer** : added `src/components/anim/`:
  - `text-reveal.tsx` (word-by-word masked reveal; renders `<span>` so it can live
    inside headings; words stay in the a11y tree; reduced-motion safe)
  - `parallax.tsx` (scroll-scrubbed vertical depth)
  - `tilt-card.tsx` (physical mouse-tilt + glare; pointer-only, reduced-motion safe)
  - Refined Lenis config (`lerp: 0.085` + easing for a smoother glide).
- **Hero rebuild** : layered premium backdrop: animated drifting grid
  (`gridDrift` keyframe), two floating gradient-mesh blobs, cursor-following
  radial glow (rAF-throttled, pointer-only), scroll parallax on the backdrop,
  staggered entrance, and a word-by-word text reveal headline with a gradient
  accent. Readability preserved; fully static under reduced motion.
- **About section (homepage)** : richer: Babcock University + Data Science minor,
  "why I build", philosophy card, current-focus list, link to full story.
- **Photography section** : dedicated profile-photo slot with animated entrance,
  monogram placeholder, and an easy swap path (`/public/images/portrait.jpg`).
  Photo rendering is a client component (`portrait.tsx`) that fades in on load
  and keeps the placeholder on error.
- **Skills section** : interactive 10-category explorer (Frontend, Backend,
  Automation, AI, Cloud, Databases, DevOps, Tools, Languages, Trading) with
  hover/click selection and `aria-pressed` toggle buttons (listbox removed).
- **Featured Projects** : cards now use `TiltCard` (hover lift + tilt + glare),
  a top lighting edge, and deeper shadows for a physical feel.
- **Contact CTA + Contact page** : premium details: Availability, Current focus,
  Preferred work, Response time (dl/dt grid); form unchanged (mailto, nothing
  stored).
- **About page rewrite** : full story + education card, philosophy (4 cards),
  career timeline (image-capable, placeholder slots), expandable achievement
  cards (Conrad Challenge, Basketball, 3 Microsoft certs, Leveling Up course)
  with credential/date/verification placeholders, qualifications grid (8 groups).
- **Projects page rewrite** : every project is now a full case study: Overview,
  Problem, Goals, Role, Architecture (per-layer), Key features, Challenges &
  solutions, Lessons, Technologies (accent badges), Visuals (placeholder
  galleries), and link rows (GitHub / demo / docs / case study / video) that
  only render when links exist.
- **Data layer** : `src/lib/projects.ts` expanded to a full case-study schema;
  new `src/lib/about.ts` (education, timeline, achievements, qualifications,
  skill categories, values, interests). All placeholders marked TODO.
- **A11y fixes** : TextReveal no longer hides headline words from screen
  readers and renders valid HTML inside `<h1>`; hero cursor-glow listeners fully
  cleaned up; skills toggles use `aria-pressed`.

### Verification results

| Gate       | Command                  | Result                          |
| ---------- | ------------------------ | ------------------------------- |
| Lint       | `pnpm lint`              | ✅ 0 errors                     |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors                     |
| Build      | `pnpm build`             | ✅ 11 static routes prerendered |
| Format     | `pnpm format:check`      | ✅ clean                        |

### Routes (11 static)

```
/  /about  /projects  /contact  /privacy  /terms  /_not-found  /robots.txt  /sitemap.xml
```

### Remaining work (owner TODO items)

- **Real links**: social + domain in `site.config.ts` (still placeholders).
- **Assets** (all placeholders marked in code): professional portrait at
  `/public/images/portrait.jpg`, project screenshots in `/public/images/projects/`,
  certificate images + dates + verification URLs, timeline images.
- **Project links**: GitHub / demo / docs / video URLs per project (data model
  supports them; only existing links render).
- Lighthouse + axe-core QA pass; OG image generation.

---

## Original Session 1 : 2026-07-28 (interrupted)

### Date

2026-07-28

### Completed phases (at time of interruption)

- **Phase 4.0**: Project setup ✅
- **Phase 4.1**: Reusable UI component library (13 components) ✅
- **Phase 4.2**: partially: layout chrome + 3 route stubs

### Notes

This session was interrupted while creating route stubs. The full Phase 4.2 deliverable
(PageShell + 7 remaining routes) was completed in the resumed session above.

---

## Session 5 : 2026-08-04 (Premium Elevation)

### Date

2026-08-04

### What happened

User brief: elevate the portfolio to world-class premium personal-brand quality
(Iman Gadzhi / Apple-level polish reference) without a redesign. Luxury, editorial,
cinematic motion, whitespace, restraint. Also supplied the real social links.

### What was completed

- **Real links**: `site.config.ts` now uses `awodeyiayoola@gmail.com`,
  `https://www.linkedin.com/in/awodeyi-ayoolamikun-a0b5661a9/`, and
  `https://github.com/Ayoolaxrp`. They flow into header, footer, contact,
  and the command palette automatically. `SITE_URL` still placeholder.
- **Cinematic atmosphere** (`src/components/anim/atmosphere.tsx`): two planes
  (deep drifting grid + breathing aurora blobs + radial wash behind content;
  stepped film grain + vignette + top light over content). GSAP scrub parallax
  on the deep plane; reduced-motion safe.
- **Custom cursor** (`custom-cursor.tsx`): dot + trailing ring, magnetic pull on
  `[data-magnetic]`, text mode via `[data-cursor-text]`, hidden over form
  fields (native I-beam kept), pointer-fine + reduced-motion gated, rAF loop
  idles when hidden. Native cursor hidden via `.cursor-premium`.
- **Preloader** (`preloader.tsx`): ~1.2s once-per-session wordmark intro with
  hairline fill, then the veil lifts. Skipped for reduced motion.
- **Command palette** (`command-palette.tsx` + `lib/command-palette.ts`):
  Cmd/Ctrl+K or header button. Searchable nav, copy-email, external links.
  Keyboard: arrows, Enter, Escape; focus managed; glass panel.
- **Navigation**: header is now glass (blur + translucent canvas) that shrinks
  on scroll, nav links have animated accent underlines, primary CTA is
  magnetic, Cmd+K trigger added. Mobile drawer closes with a real exit
  animation (panel slides out, backdrop fades) and staggered link entry.
- **Reveal variants**: `Reveal` now supports `mask` (clip-path wipe) and
  `blur` (focus pull) in addition to the default fade.
- **Hero polish**: availability badge with breathing dot, quiet scroll
  indicator, cursor-following radial glow (rAF-throttled, fine pointers),
  magnetic CTAs, deeper backdrop parallax.
- **Skills**: category rail got chapter numbers, hover slide + glow; chips
  cascade in with a staggered animation; panel header with icon + summary.
- **Project detail pages** (`/projects/[slug]`): every project is now a full
  editorial case study with a sticky table of contents (scroll-spy + reading
  progress line), Overview / Problem / Research / Goals & role / Architecture /
  Challenges / Metrics / Lessons / Next steps / Visuals, and Previous/Next
  project navigation. Data model extended with `research`, `metrics`, and
  `future` (all honest, non-fabricated). `/projects` is now an editorial index
  linking to detail pages. All old `/projects#slug` anchors updated. Sitemap
  includes the six project routes (17 static routes total).
- **Contact**: click-to-copy email with inline feedback, magnetic channel
  cards, pulsing availability dot.
- **Footer**: back-to-top (client component), refined spacing.
- **Buttons**: `btn-shine` light sweep on primary CTAs.
- **About + 404**: interactive philosophy cards (hover lift + wash), a serif
  pull-quote in the story; the 404 is now on-brand with a serif accent.

### Verification results

| Gate       | Command                  | Result                          |
| ---------- | ------------------------ | ------------------------------- |
| Lint       | `pnpm lint`              | ✅ 0 errors, 0 warnings         |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors                     |
| Build      | `pnpm build`             | ✅ 17 static routes prerendered |
| Format     | `pnpm format:check`      | ✅ clean                        |

### Routes (17 static)

```
/  /about  /projects  /projects/[slug] (x6)  /contact  /privacy  /terms
/_not-found  /robots.txt  /sitemap.xml
```

### Decisions

1. **Project detail pages over anchors.** The brief demanded a mini-documentary
   experience per project: dedicated routes with sticky TOC, reading progress,
   and prev/next navigation deliver that properly. Anchors would not.
2. **Custom cursor is opt-in by capability.** Fine pointers + no reduced motion
   only; text inputs keep the native I-beam.
3. **No fabricated data.** New `research`/`metrics`/`future` fields restate only
   what the project copy already claimed (stage counts, completion, routes).
4. **Framer Motion remains unused.** GSAP + Lenis already cover the motion
   brief; no reason to add a second runtime.

### Remaining work (owner TODO items)

- `SITE_URL` in `site.config.ts` still a placeholder: set the real domain when
  deployed; JSON-LD, sitemap, and OG metadata follow it.
- Real portrait at `/public/images/portrait.jpg`, project screenshots in
  `/public/images/projects/`, certificate + timeline images.
- Project links (GitHub / demo / docs) per project.
- OG image generation; Lighthouse + axe-core QA pass.
- Optional per brief, deferred: image lightbox, animated favicon, hover sounds.

---

## Session 6 : 2026-08-04 (Final 10% Polish Pass)

### Date

2026-08-04

### What happened

User brief: refine, do not redesign. Focus on fixing UX issues, improving
storytelling, and eliminating bugs. Specific items: custom cursor lag, glass
header clash, a broken hero headline line, accurate About timeline, certificate
preview/lightbox/download, expanded interests, Windows-first shortcuts, em dash
sweep, and animation/performance polish.

### What was completed

- **Custom cursor cohesion fix.** The ring was lagging the dot because (a) a
  CSS `transition-transform` fought the rAF loop (double smoothing) and (b)
  the lerp was too low (0.16). Rewrote the component: ONE rAF loop drives
  both dot and ring on the same tick, scale is lerped inside the loop (no
  transform transition on the ring at all), the ring lerp is now 0.34 for
  near-locked tracking, and on the first visible frame the ring snaps to the
  dot so they never enter desynchronized. Magnetic pull preserved.
- **Glass header refinement.** Scrolled state is now `bg-canvas/88` +
  `backdrop-blur-2xl` + `backdrop-saturate-150` with a deeper shadow, plus a
  soft gradient fade div under the bar that masks content sliding beneath.
  The saturate filter now transitions with the rest of the glass.
- **Hero headline bug fixed.** The gradient line ("turn difficult problems")
  was invisible: `background-clip: text` on a wrapper span does not survive
  GSAP's per-word transforms, so the text rendered transparent. `TextReveal`
  gained a `wordClassName` prop and the gradient now applies to each word
  span individually. Verified in the browser: all three lines render.
- **Accurate About timeline.** Rebuilt `TIMELINE` in `lib/about.ts` with the
  real milestones: 2022 Microsoft Word, 2023 PowerPoint, 2023 Basketball
  MVP Nomination, 2023 Best Sportsman Award, 2024 Microsoft Excel, 2024
  Conrad Challenge National Finalist (with a Conrad branding slot, TODO asset).
  Achievement cards updated with years and matching stories.
- **Leveling Up description.** "Ayoola's Guide to Leveling Up" is now
  described as a book and companion course on growth, discipline, faith,
  productivity, and self-improvement (timeline + achievements).
- **Certificate preview / lightbox / download.** New `CertificatesGrid` in
  `src/components/sections/certificates-grid.tsx`: reusable card + lightbox.
  Hover lift + image zoom + View affordance; lightbox has focus trap, Escape
  close, focus restore, scroll + Lenis lock; Download links that switch to a
  disabled "Pending" state while the asset is missing (404-safe). Data in
  `lib/about.ts` (`CERTIFICATES`); drop images at
  `public/images/certificates/<id>.png`.
- **Interests expanded to 27.** New `InterestsGrid` (server component): every
  interest is a chip with a lucide icon and a quiet hover (lift + accent
  wash + icon tint). No client JS, no hydration cost.
- **Windows-first shortcuts.** Header trigger and palette kbd now read
  "Ctrl + K" (removed the mac Command glyph and "Command K" aria-label);
  docs/comments updated. Cmd+K still works on mac keyboards.
- **Values polish.** Numbered rows, hover lift + accent border, better
  rhythm. Content untouched.
- **Em dash sweep re-verified.** Zero em dashes across `src/`.

### Verification results

| Gate       | Command                  | Result                          |
| ---------- | ------------------------ | ------------------------------- |
| Lint       | `pnpm lint`              | ✅ 0 errors                     |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors                     |
| Build      | `pnpm build`             | ✅ 17 static routes prerendered |
| Format     | `pnpm format:check`      | ✅ clean                        |

### Routes (17 static)

```
/  /about  /projects  /projects/[slug] (x6)  /contact  /privacy  /terms
/_not-found  /robots.txt  /sitemap.xml
```

### Decisions

1. **Per-word gradient over wrapper clip.** `background-clip: text` on a
   parent is unreliable once animated children get their own transforms.
   Applying the gradient to each word span (via `wordClassName`) is robust
   and keeps the serif italic styling on the line wrapper.
2. **Server-rendered interests.** 27 chips need no interactivity beyond CSS
   hover: shipping them as a server component avoids 27 client islands.
3. **Download gated on asset presence.** The card footer shows "Pending"
   until the certificate image actually exists, so a missing asset never
   produces a broken download click.

### Remaining work (owner TODO items)

- Drop certificate images at `public/images/certificates/<id>.png`; add the
  official Conrad Challenge logo at `public/images/logos/conrad-challenge.svg`.
- `SITE_URL` in `site.config.ts` still a placeholder: set the real domain
  when deployed.
- Real portrait, project screenshots, and per-project links.
- OG image generation; Lighthouse + axe-core QA pass.

---

## Session 7 : 2026-08-04 (Launch & Latency Fix)

### Date

2026-08-04

### What happened

User brief: launch the site and verify it renders fully on all fronts; the
scroll and cursor features felt off and very slow, remove the latency; wire in
the three Microsoft certification images (pastede with their original names);
and sweep the site for stray/ample spaces.

### What was completed

- **Launch & full render verification.** Started the dev server and verified
  every route in a real browser: `/`, `/about`, `/projects`, all six
  `/projects/[slug]` case studies, `/contact`, `/privacy`, `/terms`, and the
  branded 404. All render correctly with zero console errors or warnings.
  `pnpm build` passes: 17 static routes prerendered.
- **Scroll latency fixed.** Lenis `lerp` raised 0.085 → 0.12 (higher lerp =
  snappier response; 0.085 felt floaty and laggy). Wheel/touch multipliers and
  the easing curve unchanged.
- **Cursor latency fixed.** Ring lerp raised 0.34 → 0.5 (near-locked
  tracking), scale lerp 0.18 → 0.28 (crisper grow-over-interactive). Also
  removed `hidden md:block` from the cursor container: it was possible for
  the pair to silently vanish on a narrow window on a fine-pointer machine
  while the native cursor was hidden via `.cursor-premium`.
- **Certificate images wired.** The three pasted Microsoft Office Specialist
  images were mapped from their original filenames to the certificate ids
  and copied into `public/images/certificates/`:
  - `microsoft-office-specialist-word-office-2016.png` → `microsoft-word.png`
  - `microsoft-office-specialist-powerpoint-office-2016.png` → `microsoft-powerpoint.png`
  - `microsoft-office-specialist-excel-associate-office-2019.png` → `microsoft-excel.png`
    Verified in the browser: all three cards show the real image (200,
    image/png), so the card preview, lightbox, and Download links all activate
    automatically (no more "Pending" state).
- **Whitespace sweep.** Zero doubled spaces in visible text: ran
  `document.body.innerText.match(/\S  +\S/g)` in the browser on /, /about,
  /projects, and /contact (all returned null), plus grep sweeps for `&nbsp;`
  and trailing whitespace in source (zero hits). No stray/ample spaces found
  in any rendered copy.
- **React warning eliminated.** Every `<Button asChild>` was triggering
  "Invalid prop `type` supplied to `React.Fragment`": Button always wrapped
  its children in an implicit `<>` fragment, so Radix `Slot` cloned the
  Fragment itself with every Button prop. `Button` now injects the
  spinner/icons into the child element via `cloneElement` when `asChild`
  (Slot typed as a button primitive). Verified: zero console messages across
  a fresh reload of every route.

### Verification results

| Gate       | Command                  | Result                                 |
| ---------- | ------------------------ | -------------------------------------- |
| Lint       | `pnpm lint`              | ✅ 0 errors                            |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors                            |
| Build      | `pnpm build`             | ✅ 17 static routes prerendered        |
| Format     | `pnpm format:check`      | ✅ clean                               |
| Browser    | route-by-route pass      | ✅ all routes render, 0 console errors |

### Routes (17 static)

```
/  /about  /projects  /projects/[slug] (x6)  /contact  /privacy  /terms
/_not-found  /robots.txt  /sitemap.xml
```

### Decisions

1. **Higher lerp beats prettier lerp.** The 0.085 glide looked premium but
   read as "slow" in practice. 0.12 keeps the glide while feeling immediate.
2. **Cursor pair is always mounted.** Capability gating (fine pointer + no
   reduced motion) decides visibility, not a CSS breakpoint class, so the
   native cursor can never be hidden with nothing to replace it.
3. **Cert years kept as earn years.** The image filenames say Office 2016 /
   2019 (exam versions); the card years stay 2022 / 2023 / 2024 (when the
   certs were earned, matching the timeline).

### Remaining work (owner TODO items)

- Add the official Conrad Challenge logo at
  `public/images/logos/conrad-challenge.svg`.
- `SITE_URL` in `site.config.ts` still a placeholder: set the real domain
  when deployed.
- Real portrait, project screenshots, and per-project links.
- OG image generation; Lighthouse + axe-core QA pass.

---

## Session 8 : 2026-08-04 (Header lock & full-name brand)

### Date

2026-08-04

### What happened

User brief: the persistent header let content show through / overlap when
scrolling: lock it in place with zero overlap. Also stop branding the site
"Ayoola": use the full name "Ayoolamikun Awodeyi" everywhere.

### What was completed

- **Header overlap fixed.** The scrolled state was `bg-canvas/88` +
  `backdrop-blur-2xl` + `backdrop-saturate-150`: 12% of scrolling content bled
  through the glass. Now it is a fully opaque `bg-canvas` + border + shadow
  once scrolled (verified in browser: rgba(5,7,11,0.996), nothing shows
  through). Header stays sticky/locked at `top-0`; the decorative fade div
  below the bar is retained. Unneeded backdrop-filter transitions removed.
- **Full-name brand.** `SITE_NAME` and `SITE_NAME_SHORT` in
  `site.config.ts` are now `Ayoolamikun Awodeyi`, so the wordmark, the
  browser/page titles ("Ayoolamikun Awodeyi · Software Engineer & AI
  Automation Builder"), and every derived surface use the full name. The
  JSON-LD `alternateName: "Ayoola"` was removed. "Ayoola's Guide to Leveling
  Up" (the actual book title) is intentionally kept.
- **Long-name layout.** Header and mobile-drawer logos render at `text-lg`
  (full `text-xl` from md up) so the 20-character lowercase wordmark never
  crowds the nav or the hamburger. Preloader stagger is capped
  (`min(index * 45, 700)ms`) and the wordmark is responsive
  (`text-2xl sm:text-3xl`) so every letter settles before the veil lifts.

### Verification results

| Gate       | Command                  | Result                                                                      |
| ---------- | ------------------------ | --------------------------------------------------------------------------- |
| Lint       | `pnpm lint`              | ✅ 0 errors                                                                 |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors                                                                 |
| Build      | `pnpm build`             | ✅ 17 static routes prerendered                                             |
| Format     | `pnpm format:check`      | ✅ clean                                                                    |
| Browser    | scroll + title checks    | ✅ solid header on scroll, full name in logo/title/footer, 0 console errors |

### Routes (17 static)

```
/  /about  /projects  /projects/[slug] (x6)  /contact  /privacy  /terms
/_not-found  /robots.txt  /sitemap.xml
```

### Decisions

1. **Solid over glass.** The glass header looked premium but violated "no
   overlap". A fully opaque scrolled header guarantees nothing shows through
   while the transparent-at-top state is preserved for the hero.
2. **Sticky, not fixed.** `position: sticky` already locks the header in
   place during scroll; no markup change needed, only the background.
3. **Book title preserved.** "Ayoola's Guide to Leveling Up" is the real
   product name, not site branding, so it stays.

---

## Session 9 : 2026-08-04 (Header always solid, name order)

### Date

2026-08-04

### What happened

User reported the header still overlapped elements and asked for the full
name written as "Awodeyi Ayoolamikun".

### What was completed

- **Header is now always solid.** The previous fix only made the bar opaque
  once scrolled; the transparent-at-top state let the hero backdrop (drifting
  grid, breathing blobs) show through the header area, which read as
  overlap. The header is now a permanently opaque `bg-canvas` bar with a
  hairline border at all times and any scroll position: nothing can show
  through or collide with it (verified in browser at scroll 0 and 500px).
  The decorative fade div under the bar was removed.
- **Name order corrected.** Every visible full-name surface now reads
  "Awodeyi Ayoolamikun" exactly as requested: `SITE_NAME` /
  `SITE_NAME_SHORT` / `SITE_NAME_LONG` in `site.config.ts` (logo, page
  titles, footer copyright, JSON-LD), the metadata keyword in `layout.tsx`,
  the homepage About intro (now sourced from `SITE_NAME_LONG`), and the
  portrait alt/caption in `photography.tsx`. No "Ayoolamikun Awodeyi"
  strings remain in `src/`. The book title and GitHub handle are untouched.

### Verification results

| Gate       | Command                  | Result                                                                                                |
| ---------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| Lint       | `pnpm lint`              | ✅ 0 errors                                                                                           |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors                                                                                           |
| Build      | `pnpm build`             | ✅ 17 static routes prerendered                                                                       |
| Format     | `pnpm format:check`      | ✅ clean                                                                                              |
| Browser    | header + name checks     | ✅ solid header at scroll 0 and 500px, logo/title/footer read "Awodeyi Ayoolamikun", 0 console errors |

### Routes (17 static)

```
/  /about  /projects  /projects/[slug] (x6)  /contact  /privacy  /terms
/_not-found  /robots.txt  /sitemap.xml
```

### Decisions

1. **Permanently opaque beats conditional.** Any transparent state allows
   something to bleed through somewhere; the user asked twice for no
   overlap, so the bar is solid unconditionally.
2. **Name sourced from config.** The homepage About intro now imports
   `SITE_NAME_LONG`, so a future name change updates everywhere at once.

---

## Session 10 : 2026-08-04 (Command palette removed, snappier scroll)

### Date

2026-08-04

### What happened

User brief: remove the Ctrl/Cmd+K command palette feature entirely, and fix
remaining latency in the scroll animations.

### What was completed

- **Command palette removed.** Deleted `src/components/chrome/command-palette.tsx`
  and `src/lib/command-palette.ts` (the event bus). Removed the `CommandPalette`
  mount from the root layout and the header's "Ctrl K" trigger button along
  with its keyboard shortcut. Zero references remain in `src/`; the header
  right side is now just the primary CTA + hamburger.
- **Scroll latency fixed.** Lenis `lerp` raised 0.12 → 0.18 (near-instant
  wheel response with a hint of glide; lower values read as lag). Anchor and
  sticky-TOC scrolling (`scrollToTarget`) shortened 1.1s → 0.75s. All GSAP
  scroll scrubs were audited and are 1:1 (`scrub: true`), so no other
  smoothing lag exists.

### Verification results

| Gate       | Command                  | Result                            |
| ---------- | ------------------------ | --------------------------------- |
| Lint       | `pnpm lint`              | ✅ 0 errors                       |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors                       |
| Build      | `pnpm build`             | ✅ 17 static routes prerendered   |
| Format     | `pnpm format:check`      | ✅ clean                          |
| Browser    | header + console checks  | ✅ no Ctrl K UI, 0 console errors |

### Routes (17 static)

```
/  /about  /projects  /projects/[slug] (x6)  /contact  /privacy  /terms
/_not-found  /robots.txt  /sitemap.xml
```

### Decisions

1. **Delete, don't hide.** The palette had one trigger and one listener;
   removing both files and all wiring keeps the bundle smaller and the
   header cleaner.
2. **Snappy over glide.** The user twice reported scroll latency; 0.18 is
   the highest lerp that still reads as intentionally smooth rather than
   native-janky.
