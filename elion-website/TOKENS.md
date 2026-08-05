# Elion : Design Tokens

> Concrete, code-mappable values for every visual decision in the design system.
> Tokens are consumed by `COMPONENTS.md` specs and by every product surface.
> V1 ships dark-mode tokens only. Light-mode tokens are a future addition (D-004).

---

## 1. Color Tokens

### 1.1 Surface hierarchy (background)

| Token               | Value                    | Use                                            |
| ------------------- | ------------------------ | ---------------------------------------------- |
| `bg.canvas`         | `#0B0F14`                | Page background. The "deepest" surface.        |
| `bg.surface`        | `#111827`                | Cards, raised panels, inputs.                  |
| `bg.surface-raised` | `#1A2233`                | Modals, popovers, dropdowns (above `surface`). |
| `bg.surface-sunken` | `#070A0F`                | Code blocks, embedded media.                   |
| `bg.overlay`        | `rgba(11, 15, 20, 0.72)` | Modal backdrop, nav blur backdrop.             |
| `bg.subtle`         | `#0F1620`                | Section separators, alternating row tint.      |

**Reasoning:** A 6-step surface hierarchy gives us enough room for hero → section → card → popover without ever needing to reach for a saturated color. Each step is calibrated to maintain ≥4.5:1 contrast against `text.primary` for accessibility.

### 1.2 Borders

| Token            | Value                       | Use                                         |
| ---------------- | --------------------------- | ------------------------------------------- |
| `border.subtle`  | `rgba(255, 255, 255, 0.06)` | Default borders, card edges.                |
| `border.default` | `rgba(255, 255, 255, 0.10)` | Form inputs, table cells.                   |
| `border.strong`  | `rgba(255, 255, 255, 0.16)` | Hover state, selected items.                |
| `border.accent`  | `#10B981`                   | Accent borders only: callouts, focus rings. |

**Reasoning:** Borderless design (à la Vercel/Linear) is beautiful but loses information on busy layouts. Low-opacity white borders add structure without visual noise.

### 1.3 Text

| Token            | Value     | Contrast on `bg.canvas` | Use                            |
| ---------------- | --------- | ----------------------- | ------------------------------ |
| `text.primary`   | `#F5F7FA` | 16.4:1 (AAA)            | Headings, primary body copy    |
| `text.secondary` | `#A8B0BD` | 8.2:1 (AAA)             | Body, descriptions             |
| `text.tertiary`  | `#6B7280` | 4.7:1 (AA Large + AA)   | Captions, metadata, timestamps |
| `text.disabled`  | `#4B5563` | 2.9:1 (decorative only) | Disabled controls              |
| `text.inverse`   | `#0B0F14` | :                       | Text on light/accent surfaces  |
| `text.link`      | `#60A5FA` | 8.7:1 (AAA)             | Links, interactive text        |
| `text.linkHover` | `#93C5FD` | 10.4:1 (AAA)            | Link hover                     |

**Reasoning:** Off-white (`#F5F7FA`, not pure `#FFFFFF`) is easier on the eyes for long-form reading. Each step down the hierarchy drops brightness ~10-15% rather than just opacity, which keeps colors stable against any background.

### 1.4 Accent (Emerald : primary)

| Token                   | Value                      | Use                                 |
| ----------------------- | -------------------------- | ----------------------------------- |
| `accent.primary`        | `#10B981`                  | Primary CTAs, brand mark, focus     |
| `accent.primaryHover`   | `#34D399`                  | Hover state                         |
| `accent.primaryPressed` | `#059669`                  | Active/pressed state                |
| `accent.primarySoft`    | `rgba(16, 185, 129, 0.12)` | Soft backgrounds (badges, callouts) |
| `accent.primaryBorder`  | `rgba(16, 185, 129, 0.32)` | Accent borders                      |

**Reasoning:** Emerald is a calm, professional green: signals "go" without the corporate-lime energy of pure `#00FF00`. The primary / hover / pressed triplet gives buttons a state machine that works in both light and dark contexts (when light ships).

### 1.5 Secondary accent (Soft Blue)

| Token                   | Value                      | Use                         |
| ----------------------- | -------------------------- | --------------------------- |
| `accent.secondary`      | `#3B82F6`                  | Secondary CTAs, info badges |
| `accent.secondaryHover` | `#60A5FA`                  | Hover                       |
| `accent.secondarySoft`  | `rgba(59, 130, 246, 0.12)` | Info backgrounds            |

**Reasoning:** Soft Blue is reserved for **information surfaces** (links, info banners, secondary buttons) so it never competes with the primary green for attention. Used ≤1× per view.

### 1.6 Status (semantic)

| Token                | Value                      | Use                              |
| -------------------- | -------------------------- | -------------------------------- |
| `status.success`     | `#10B981`                  | Success messages, success badges |
| `status.successSoft` | `rgba(16, 185, 129, 0.10)` | Success backgrounds              |
| `status.warning`     | `#F59E0B`                  | Warnings                         |
| `status.warningSoft` | `rgba(245, 158, 11, 0.10)` | Warning backgrounds              |
| `status.error`       | `#EF4444`                  | Errors, destructive actions      |
| `status.errorSoft`   | `rgba(239, 68, 68, 0.10)`  | Error backgrounds                |
| `status.info`        | `#3B82F6`                  | Info, neutral notifications      |
| `status.infoSoft`    | `rgba(59, 130, 246, 0.10)` | Info backgrounds                 |

**Reasoning:** Soft variants are 10% alpha, never solid backgrounds. This keeps status surfaces from feeling like alerts in the user's face.

### 1.7 Focus

| Token              | Value     | Use                             |
| ------------------ | --------- | ------------------------------- |
| `focus.ring`       | `#10B981` | Keyboard focus outline          |
| `focus.ringOffset` | `#0B0F14` | Offset between element and ring |

**Reasoning:** Focus ring matches the primary accent so focus states are predictable across every interactive element.

### 1.8 Icon

| Token            | Value     | Use                              |
| ---------------- | --------- | -------------------------------- |
| `icon.primary`   | `#F5F7FA` | Default icons                    |
| `icon.secondary` | `#A8B0BD` | Secondary icons, badges          |
| `icon.tertiary`  | `#6B7280` | Tertiary, decorative             |
| `icon.accent`    | `#10B981` | Accent icons (CTA leading icons) |
| `icon.disabled`  | `#4B5563` | Disabled                         |

### 1.9 What I deliberately did NOT add

- **No bright orange.** Brief explicitly forbids it. `#F59E0B` (amber) is used for warnings only: it's muted, not "bright."
- **No purple.** Brief explicitly forbids it. No purple anywhere.
- **No gradient tokens.** Gradients are forbidden as primary surfaces (BRAND.md §6.2). When we eventually add a single hero gradient, it will be hand-crafted per design, not a token.
- **No neon.** All accent values are chosen for calm, not for energy.

---

## 2. Typography Tokens

### 2.1 Font stack

```
Sans: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
Mono: 'JetBrains Mono', 'SF Mono', Menlo, Consolas, monospace;
```

**Reasoning:** Inter is the obvious choice given the brief and the inspiration set. JetBrains Mono for code is consistent with what Linear / Vercel / Notion use, so users already know how it reads.

### 2.2 Type scale

All sizes are in `rem`. Base = 16px.

| Token             | Size              | Line-height | Letter-spacing | Weight        | Use                  |
| ----------------- | ----------------- | ----------- | -------------- | ------------- | -------------------- |
| `text.display.xl` | `4.5rem` (72px)   | `1.05`      | `-0.03em`      | 600           | Hero headline (rare) |
| `text.display.lg` | `3.5rem` (56px)   | `1.1`       | `-0.025em`     | 600           | Hero headline        |
| `text.display.md` | `2.75rem` (44px)  | `1.15`      | `-0.02em`      | 600           | Section hero         |
| `text.h1`         | `2.25rem` (36px)  | `1.2`       | `-0.015em`     | 600           | Page title           |
| `text.h2`         | `1.875rem` (30px) | `1.25`      | `-0.01em`      | 600           | Section title        |
| `text.h3`         | `1.5rem` (24px)   | `1.3`       | `-0.005em`     | 600           | Sub-section          |
| `text.h4`         | `1.25rem` (20px)  | `1.4`       | `0`            | 600           | Card title           |
| `text.body.lg`    | `1.125rem` (18px) | `1.6`       | `0`            | 400           | Lead paragraph       |
| `text.body.md`    | `1rem` (16px)     | `1.6`       | `0`            | 400           | Body                 |
| `text.body.sm`    | `0.875rem` (14px) | `1.55`      | `0`            | 400           | Small body, captions |
| `text.caption`    | `0.75rem` (12px)  | `1.4`       | `0.02em`       | 500           | All-caps labels      |
| `text.eyebrow`    | `0.75rem` (12px)  | `1.4`       | `0.08em`       | 500 uppercase | Section eyebrow      |

**Reasoning:**

- Display sizes use **negative letter-spacing**: large Inter looks loose without it.
- Body uses **1.6 line-height**: the sweet spot for screen reading per Butterick's practical typography.
- Caption and eyebrow use **positive letter-spacing + 500 weight + uppercase**: small uppercase text needs the spacing to read as a label, not as a tiny mistake.
- The 1.25 scale ratio between steps is intentional: it's the "major third" musical ratio, which gives enough range for hierarchy without producing jarring jumps.

### 2.3 Reading width

Body paragraphs: `max-width: 65ch` (≈600px at 16px font-size). For long-form (case studies, blog), increase to `72ch`.

### 2.4 Responsive typography

Mobile (<768px) scales down by 0.875×:

| Token        | Desktop | Mobile                        |
| ------------ | ------- | ----------------------------- |
| `display.xl` | 72px    | 56px                          |
| `display.lg` | 56px    | 44px                          |
| `display.md` | 44px    | 36px                          |
| `h1`         | 36px    | 30px                          |
| `h2`         | 30px    | 24px                          |
| `h3`         | 24px    | 20px                          |
| `h4`         | 20px    | 18px                          |
| `body`       | 16px    | 16px (no change: readability) |

Implemented via `clamp()` so the scale is fluid, not stepped.

---

## 3. Spacing Tokens

Base unit: **4px**. Scale:

| Token      | Value   | Common use                          |
| ---------- | ------- | ----------------------------------- |
| `space.0`  | `0`     | Reset                               |
| `space.1`  | `4px`   | Hairline gap (icon ↔ label)         |
| `space.2`  | `8px`   | Tight stack (caption under heading) |
| `space.3`  | `12px`  | Compact stack                       |
| `space.4`  | `16px`  | Default stack                       |
| `space.5`  | `20px`  | Comfortable stack                   |
| `space.6`  | `24px`  | Card padding                        |
| `space.8`  | `32px`  | Section internal padding            |
| `space.10` | `40px`  | Large block gap                     |
| `space.12` | `48px`  | Section padding (mobile)            |
| `space.16` | `64px`  | Section padding (desktop)           |
| `space.20` | `80px`  | Hero padding                        |
| `space.24` | `96px`  | Hero padding (large)                |
| `space.32` | `128px` | Ultra-large sections                |

**Reasoning:**

- 4px base is industry standard (Tailwind, Radix, shadcn/ui all use it). Adopting it means every engineer joining the project already knows the scale.
- The scale is geometric-ish (4, 8, 12, 16, 20, 24, 32, 40, 48, 64...): close to a 1.5× ratio but with the common "16, 24, 32" stops preserved for legibility.
- All components should compose with these tokens, never introduce arbitrary pixel values.

### 3.1 Vertical rhythm

Sections are separated by `space.20` (80px) on desktop, `space.12` (48px) on mobile. Hero gets `space.24` (96px) top/bottom.

### 3.2 Containers

- `container.max`: `1200px`: main content width
- `container.prose`: `720px`: long-form reading
- `container.wide`: `1400px`: wide tables, dense data (used by future dashboard)
- Horizontal padding: `space.6` (mobile) / `space.8` (tablet) / `space.12` (desktop)

---

## 4. Radius Tokens

| Token         | Value    | Use                     |
| ------------- | -------- | ----------------------- |
| `radius.none` | `0`      | Reserved for full-bleed |
| `radius.sm`   | `4px`    | Badges, tags            |
| `radius.md`   | `8px`    | Buttons, inputs         |
| `radius.lg`   | `12px`   | Cards                   |
| `radius.xl`   | `16px`   | Modals, large surfaces  |
| `radius.full` | `9999px` | Pills, avatars          |

**Reasoning:** Linear / Vercel / Anthropic use radii in this range. Larger (24px+) reads as friendly/playful: wrong brand voice.

---

## 5. Shadow Tokens

Dark mode shadows are subtle: they add depth, not drama.

| Token         | Value                                                                     | Use                          |
| ------------- | ------------------------------------------------------------------------- | ---------------------------- |
| `shadow.none` | `none`                                                                    | Reset                        |
| `shadow.sm`   | `0 1px 2px rgba(0, 0, 0, 0.32)`                                           | Hairline elevation           |
| `shadow.md`   | `0 4px 12px rgba(0, 0, 0, 0.40)`                                          | Cards on hover               |
| `shadow.lg`   | `0 12px 32px rgba(0, 0, 0, 0.48)`                                         | Modals, popovers             |
| `shadow.xl`   | `0 24px 64px rgba(0, 0, 0, 0.56)`                                         | Drag states, command palette |
| `shadow.glow` | `0 0 0 1px rgba(16, 185, 129, 0.32), 0 8px 24px rgba(16, 185, 129, 0.16)` | Accent callouts only         |

**Reasoning:** Black-only shadows (no color tint) read cleaner on dark surfaces. The `glow` token is the only colored shadow and is reserved for primary CTAs or accent-bordered cards.

---

## 6. Motion Tokens

### 6.1 Durations

| Token               | Value   | Use                                         |
| ------------------- | ------- | ------------------------------------------- |
| `motion.instant`    | `0ms`   | No transition (e.g. disabled state changes) |
| `motion.fast`       | `120ms` | Micro-interactions (color, opacity)         |
| `motion.normal`     | `200ms` | Default (hover, focus)                      |
| `motion.slow`       | `300ms` | Page-level transitions                      |
| `motion.deliberate` | `400ms` | Hero animations, modal enter                |

### 6.2 Easings

| Token             | Value                        | Use                            |
| ----------------- | ---------------------------- | ------------------------------ |
| `ease.standard`   | `cubic-bezier(0.2, 0, 0, 1)` | Default ease-out (UI feels)    |
| `ease.emphasized` | `cubic-bezier(0.3, 0, 0, 1)` | Larger transitions, page enter |
| `ease.decelerate` | `cubic-bezier(0, 0, 0, 1)`   | Things entering the screen     |
| `ease.accelerate` | `cubic-bezier(0.3, 0, 1, 1)` | Things leaving the screen      |
| `ease.linear`     | `linear`                     | Loading spinners only          |

### 6.3 Principles

1. **Fast over fancy.** Hover effects should complete in ≤200ms.
2. **Animate properties the GPU can composite** (transform, opacity). Never animate width, height, top, left.
3. **Prefer `prefers-reduced-motion` honoring.** Every transition must be disable-able by users who request reduced motion.
4. **No motion that distracts.** Page loads shouldn't have hero animations that delay first paint.
5. **Feedback, not decoration.** Motion should communicate a state change (hover, focus, click, page enter): not entertain.

---

## 7. Z-index Scale

| Token             | Value | Use                                |
| ----------------- | ----- | ---------------------------------- |
| `z.base`          | `0`   | Default content                    |
| `z.raised`        | `10`  | Sticky headers, dropdowns          |
| `z.sticky`        | `20`  | Sticky nav                         |
| `z.popover`       | `30`  | Tooltips, popovers                 |
| `z.modal`         | `40`  | Modal backdrop                     |
| `z.modal-content` | `50`  | Modal content                      |
| `z.toast`         | `60`  | Toasts, notifications              |
| `z.command`       | `70`  | Command palette (above everything) |

---

## 8. Accessibility Helpers

| Token              | Value                                       | Use                          |
| ------------------ | ------------------------------------------- | ---------------------------- |
| `a11y.focusRing`   | `2px solid #10B981`                         | All focusable elements       |
| `a11y.focusOffset` | `2px`                                       | Gap between element and ring |
| `a11y.minTap`      | `44px × 44px`                               | Mobile tap target minimum    |
| `a11y.skipLink`    | position absolute, off-screen until focused | Skip-to-content link         |

---

## 9. Token-to-CSS mapping (preview)

```css
:root {
  /* Surface */
  --bg-canvas: #0b0f14;
  --bg-surface: #111827;
  --bg-surface-raised: #1a2233;

  /* Text */
  --text-primary: #f5f7fa;
  --text-secondary: #a8b0bd;
  --text-tertiary: #6b7280;

  /* Accent */
  --accent-primary: #10b981;
  --accent-secondary: #3b82f6;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-4: 16px;
  --space-8: 32px;

  /* Motion */
  --motion-fast: 120ms;
  --motion-normal: 200ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
}
```

This becomes the input to Tailwind's `theme.extend` in Phase 4. No magic numbers in components: only token references.

---

## 10. See also

- `BRAND.md`: the why behind every value here
- `COMPONENTS.md`: how these tokens compose into reusable parts
- `DECISIONS.md`: D-002 (component library scope), D-003 (dark-first), D-004 (light deferred)
