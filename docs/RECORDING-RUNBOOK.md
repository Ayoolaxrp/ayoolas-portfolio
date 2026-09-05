# Portfolio Video Evidence — Recording Runbook

You are recording short portfolio evidence videos. You have a working
capture pipeline already in the project at
`~/Projects/elion-app/scripts/capture-evidence.mjs` — DO NOT rewrite
it. Read it, then extend it.

# Goal

Produce three MP4 clips in `~/Projects/elion-app/evidence/` that prove
each site actually works, not just that it loads.

| slug                  | url                           | min length          |
| --------------------- | ----------------------------- | ------------------- |
| `ideas-and-adherents` | https://ideasandadherents.com | 30s                 |
| `personal-portfolio`  | http://localhost:3000         | 30s                 |
| `gadget-cartel`       | http://localhost:3001         | 45s (longer — ecom) |

# Hard rules

1. **Do not fabricate anything.** Only show what is actually on the
   page. If a feature doesn't render, skip it — don't fake it.
2. **Min 30s per clip, 45s for gadget-cartel.** Encode at 30fps,
   1440×900, MP4 / h264.
3. **No actual feature is broken or faked.** If the contact form
   submits, show the submit. If the cart drawer opens, open it.
   If a hover effect matters, trigger it.
4. **Use the existing capture script as your starting point.** Add to
   it, don't replace it.

# What each clip MUST show (the proof)

## ideas-and-adherents (≥30s)

- Hero ("The Impact Agency") — let the hero animation play
- The TR Model section (Thought + Relationships) — scroll smoothly
- All four service lines: Strategy Consultation, Design & Execution,
  Capacity Building, Program Management Retainer
- The about / team section if it exists
- The contact path (footer, contact page, or form — whichever
  exists). If a contact form is present, fill in a test field or two
  to show it's interactive.

## personal-portfolio (≥30s)

- Hero with the founder name and tagline — let the GSAP text reveal
  play in full
- Scroll to Featured Projects — the cards (including the new Ideas &
  Adherents card with the real external link). Hover a card to
  trigger any hover transition
- Open ONE case study (any one) — scroll through it briefly so the
  viewer sees the layout
- Hover the primary nav if it's interactive
- Click into the contact section or the contact page

## gadget-cartel (≥45s — ecom)

- Hero with brand — let any hero animation finish
- Open the shop / product catalogue
- Open ONE product detail page (pick any iPhone / iPad / MacBook)
  — scroll it top to bottom
- Use the shop explorer / filter (any category filter that exists)
  — show the filtered state
- Open the cart drawer (don't add fake items — only add if a real
  Add-to-Cart button works)
- Open the contact form section
- If there's a working search overlay, open it and type one character

# Capture technique — make it feel like a real user is testing

The video must look like one person is exploring the site — moving
their mouse, hovering, clicking, scrolling, occasionally pausing to
read. **Not a slideshow. Not a slide deck. Not a static screenshot
sequence. A real recording of a real interaction.**

Required techniques:

1. **Switch from per-frame screenshots to actual video capture.**
   Use Playwright's CDP `Page.startScreencast` to get a continuous
   stream of frames, then pipe them through ffmpeg as a real MP4.
   Reference: https://playwright.dev/docs/api/class-cdp#cdp-session
   Do NOT fake video by duplicating PNGs. Do NOT pause the browser
   between steps. Do NOT disable animations.

2. **Cursor movement must be visible.** The cursor is part of the
   recording. Move it to where the next interaction will happen
   BEFORE clicking, hover it over interactive elements to trigger
   hover states, occasionally let it drift. Don't leave it pinned
   in one corner. The viewer should feel like they're watching over
   someone's shoulder.

3. **Hover states matter.** Hover the nav, hover product cards,
   hover CTAs — wherever a hover state exists. Hover transitions are
   how sites reveal they're alive. Capture them.

4. **Click interactions, not just scroll.** A `click` step that
   opens a menu, a drawer, a modal, a dropdown. A `fill` step on a
   form input so the cursor blinks in the field. Use real selectors
   that exist on the page.

5. **Smooth-scroll, never instant.** Always:
   `window.scrollTo({ top, behavior: "smooth" })`. Wait long enough
   for the smooth scroll to finish before the next interaction.
   This is what makes it feel like a person, not a teleport.

6. **Let animations play.** Hero text reveals, breathing dots,
   parallax, fade-ins, GSAP ScrollTriggers, Lenis scroll — all of
   it must render. Don't pause the page. Don't set
   `prefers-reduced-motion: reduce` on the context. The recording
   should look like the site is alive.

7. **Hold on each section long enough to read.** Pause 1–3 seconds
   on each key section before moving on. The viewer needs time to
   see what's there.

8. **Vary the rhythm.** Scroll, hover, pause, click, pause, scroll.
   Don't script it like a checklist. Make it feel like exploration.

9. **Output: ≥30s per clip, ≥45s for gadget-cartel, 30fps, h264,
   yuv420p, faststart.** Verify with `ffprobe` before declaring done.

# Step-by-step workflow

1. Read `~/Projects/elion-app/scripts/capture-evidence.mjs` fully.
2. Read each site's structure: `curl <url>` or visit in a browser
   to discover what selectors / sections actually exist. Use real
   selectors — no `[data-fake]` placeholders.
3. Extend the script:
   - Add `interact` step types (click, fill, hover)
   - Switch the encoder to use CDP screencast OR scroll smoothly
     while capturing at intervals
   - Per-clip plan includes the proof points above
4. Run it: `node scripts/capture-evidence.mjs`
5. Verify each MP4 with `ffprobe` — duration must meet the minimum.
6. If a clip is short, extend the plan with more proof points.
   Do NOT loop or stretch the same frame.
7. Print a summary table at the end:
   ```
   | slug | duration | size | notes |
   ```
8. Report back with the three file paths.

# Definition of done

- All three MP4s exist at `~/Projects/elion-app/evidence/<slug>.mp4`
- Durations meet the minimums (30/30/45)
- Each MP4 actually demonstrates the proof points listed above
- Cursor movement and hover transitions are visible
- Animations (hero reveal, breathing dot, smooth scroll) play in
  the recording
- No fabricated interactions
- Capture script is reusable (someone else could re-run it)

When done, reply with:

- The three file paths
- Per-clip proof-points-checklist showing each one with the
  timestamp range where it appears (e.g. "Hero shown 0:00–4:30,
  TR Model 4:30–9:00")
- Any honest "could not demonstrate X because Y" notes — do not
  hide gaps.
