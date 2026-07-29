# Elion — Implementation Log

> Living record of every Phase 4 session. Each session appends a new dated section.
> Read this file first if a session is interrupted — it tells the next engineer exactly where to resume.

---

## Session 1 — 2026-07-29 (resumed)

### Date
2026-07-29

### Completed phases
- **Phase 4.0** — Project setup ✅
- **Phase 4.1** — Reusable UI component library (13 components) ✅
- **Phase 4.2** — Navigation, Footer, layout, routing shell ✅

### Summary
Session 1 was interrupted partway through Phase 4.2. The recovery session audited the
repository, identified three issues (missing runtime dependencies, two ref-during-render
lint errors, two missing route families), fixed them, and verified all three quality
gates (`pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build`) pass clean.

The shell is production-ready: every route from PHASE_1_IA §1 is registered with a
minimal `PageShell` placeholder listing the sections that Phase 4.3+ will fill. No page
content has been written — per Session 1 scope, no invented copy.

### Files created (this resume session)
- `src/app/services/page.tsx` — `/services` index stub
- `src/app/services/internal-business-systems/page.tsx` — service detail stub
- `src/app/services/ai-assistants-and-dashboards/page.tsx` — service detail stub
- `src/app/projects/page.tsx` — projects index stub
- `src/app/contact/page.tsx` — contact stub
- `src/app/privacy/page.tsx` — privacy stub
- `src/app/terms/page.tsx` — terms stub
- `src/app/not-found.tsx` — 404 page (not a stub — properly built since it's terminal)
- `.prettierrc`, `.prettierignore` — Prettier config
- `IMPLEMENTATION_LOG.md` — this file

### Files modified (this resume session)
- `package.json` — removed unused MDX deps (deferred until blog/resources phase);
  added `format`, `format:check`, `typecheck` scripts
- `eslint.config.mjs` — added `eslint-config-prettier` to disable formatting rules
- `next.config.ts` — pinned Turbopack root to project (suppresses stray lockfile warning)
- `src/components/ui/container.tsx` — fixed `Ref<HTMLElement>` → `Ref<HTMLDivElement>` type error
- `src/components/ui/section.tsx` — same fix
- `src/components/ui/field.tsx` — replaced ref-based id generation with `React.useId()` to satisfy React 19 `react-hooks/refs` rule
- `src/components/chrome/site-header.tsx` — replaced `setState-in-effect` (close mobile on route change) with explicit `onNavigate` callback on each link
- `src/components/chrome/mobile-nav.tsx` — accepts and propagates `onNavigate` callback
- `src/components/chrome/site-footer.tsx` — replaced `Linkedin`/`Github` lucide imports with inline SVGs (lucide v1.27.0 doesn't ship brand logos)
- All files (32) — Prettier-formatted

### Verification results

| Gate | Command | Result |
|---|---|---|
| Lint | `pnpm lint` | ✅ 0 errors, 0 warnings |
| Type-check | `pnpm exec tsc --noEmit` | ✅ 0 errors |
| Build | `pnpm build` | ✅ Compiled successfully. 13 static routes prerendered. |
| Format | `pnpm format` | ✅ 32 files formatted, no changes needed after |

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

- **Phase 4.3 — Homepage.** All 13 sections per PHASE_3_LAYOUTS.md and D-005 (the
  6-question answer sequence). Sections live in `src/components/sections/` (new folder).
- **Phase 4.4 — Other marketing pages.** About, Services index (full), 3 service detail
  pages (full), Projects index (full), Contact (with calendar embed + form), Privacy, Terms.
- **Phase 4.5 — Project detail & case studies.** After real projects provided.
- **Phase 4.6 — SEO + meta.** OG image generation, JSON-LD, sitemap, robots.txt, RSS.
- **Phase 4.7 — Accessibility QA.** axe-core, manual keyboard tests, screen reader smoke test.
- **Phase 4.8 — Performance QA.** Lighthouse CI, bundle analysis, font loading verification.

### Exact resume point for Session 2

Session 2 begins Phase 4.3. The first file to write is `src/app/page.tsx` — replace the
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

## Original Session 1 — 2026-07-28 (interrupted)

### Date
2026-07-28

### Completed phases (at time of interruption)
- **Phase 4.0** — Project setup ✅
- **Phase 4.1** — Reusable UI component library (13 components) ✅
- **Phase 4.2** — partially: layout chrome + 3 route stubs

### Notes
This session was interrupted while creating route stubs. The full Phase 4.2 deliverable
(PageShell + 7 remaining routes) was completed in the resumed session above.
