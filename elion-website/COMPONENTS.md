# Elion : V1 Component Library

> Specifications for the 13 components the marketing site needs in V1.
> Each component uses **only** tokens from `TOKENS.md`. No hardcoded values.
> Full 30+ component library (forms, tables, modals, drawers, command palette) is deferred per `DECISIONS.md` D-002.

For each component:

- **Purpose**: when to use it
- **Anatomy**: what it's made of
- **Variants**: the shapes it takes
- **States**: default / hover / focus / active / disabled / loading / error
- **Accessibility**: keyboard, screen reader, contrast
- **Responsive**: how it adapts

---

## 1. Button

### Purpose

Primary call-to-action trigger. Drives conversions (Book a Discovery Call, Submit, Learn More).

### Anatomy

A `<button>` (or `<a>` styled as button) with optional leading icon, label, optional trailing icon.

### Variants

| Variant     | Background       | Border           | Text                  | When to use                            |
| ----------- | ---------------- | ---------------- | --------------------- | -------------------------------------- |
| `primary`   | `accent.primary` | none             | `text.inverse`        | The ONE most important action per view |
| `secondary` | `bg.surface`     | `border.default` | `text.primary`        | Supporting actions                     |
| `ghost`     | transparent      | none             | `text.primary`        | Tertiary actions                       |
| `link`      | transparent      | none             | `text.link` underline | Inline links styled as buttons         |

### Sizes

| Size | Height | Padding-x        | Font           |
| ---- | ------ | ---------------- | -------------- |
| `sm` | `32px` | `space.3` (12px) | `text.body.sm` |
| `md` | `40px` | `space.4` (16px) | `text.body.md` |
| `lg` | `48px` | `space.5` (20px) | `text.body.lg` |

### States

- **Hover (primary):** bg → `accent.primaryHover`, transition `motion.fast` `ease.standard`
- **Pressed:** bg → `accent.primaryPressed`, scale `0.98` (transform only, not size)
- **Disabled:** bg → `bg.subtle`, text → `text.disabled`, cursor `not-allowed`
- **Loading:** label replaced with spinner, button width preserved
- **Focus:** 2px `focus.ring` with 2px offset

### Accessibility

- Keyboard: Enter / Space activate. Tab focuses.
- Screen reader: announce button role + label. Loading state announces "submitting" via `aria-busy`.
- Color contrast: primary button = 4.6:1, secondary = 8.2:1, ghost = 16.4:1 (all WCAG AA on dark canvas).

### Responsive

- On mobile (< 480px), `lg` size becomes the default for primary CTAs to maintain ≥44px tap target.
- Full-width button option (`fullWidth` prop) for narrow viewports.

### Anti-patterns

- ❌ Two `primary` buttons in the same view (only one "most important action" per view)
- ❌ Buttons that shift layout on hover (no scale transforms on parent)
- ❌ Icon-only buttons without `aria-label`

---

## 2. Input

### Purpose

Single-line text input for forms. Pairs with `Field` wrapper (label + helper + error).

### Anatomy

`<label>` (visually hidden or visible) + `<input>` + optional leading icon + optional trailing adornment (clear button, password reveal).

### Variants

- `text` (default)
- `email`
- `url`
- `tel`
- `password`
- `number`
- `search`

All variants share styling. Differ only in inputmode / autocomplete / type attribute.

### Sizes

| Size | Height | Padding-x | Font           |
| ---- | ------ | --------- | -------------- |
| `md` | `40px` | `space.3` | `text.body.md` |
| `lg` | `48px` | `space.4` | `text.body.lg` |

### States

- **Default:** bg `bg.surface`, border `border.default`, text `text.primary`
- **Hover:** border `border.strong`
- **Focus:** border `border.accent`, ring 2px `focus.ring`
- **Error:** border `status.error`, helper text in `status.error`
- **Disabled:** bg `bg.surface-sunken`, text `text.disabled`, cursor `not-allowed`

### Accessibility

- Label is required (`<label for="...">` OR `aria-label`).
- Error messages linked via `aria-describedby`.
- `aria-invalid="true"` when in error state.
- Autocomplete attributes set per variant (email, tel, etc).

### Responsive

- Full-width by default in forms.
- Min tap target 44px on mobile (use `lg` size below 480px).

---

## 3. Textarea

### Purpose

Multi-line text input. Used for "tell us about your project" type fields.

### Spec

- Same tokens as Input but min-height `120px`.
- Resizable vertically only (no horizontal resize).
- Auto-grow optional via prop (caps at 6 lines).
- Same states as Input.

---

## 4. Container

### Purpose

Width-and-padding primitive that holds page content.

### Spec

- `max-width: var(--container-max)` (1200px)
- Centered with `margin-inline: auto`
- Horizontal padding: `space.6` mobile / `space.8` tablet / `space.12` desktop
- Renders as `<div>` by default; pass `as="section"` etc. for semantic override.

### Variants

- `max` (1200px): default
- `prose` (720px): for blog posts, case studies
- `wide` (1400px): for tables, dense data (future dashboard)

---

## 5. Section

### Purpose

Vertical rhythm primitive that wraps every page section. Enforces consistent padding and background.

### Spec

- Vertical padding: `space.12` (48px) mobile / `space.20` (80px) desktop
- Horizontal padding: handled by Container inside
- Background: inherits from parent (default); pass `bg="surface"` to elevate to `bg.surface`

### Variants

- `default`: `bg.canvas`
- `surface`: `bg.surface` (alt row for visual rhythm)
- `sunken`: `bg.surface-sunken` (code-heavy sections)

---

## 6. Heading

### Purpose

Typography primitive wrapping `<h1>`–`<h4>`, display sizes, eyebrow text.

### Spec

- All values from `text.*` tokens in TOKENS.md §2.2.
- Renders the correct semantic tag by default (`display` → `<h1>`, `h2` → `<h2>`, etc.)
- `eyebrow` renders `<p>` (not a heading) with uppercase letter-spacing.
- `textAlign` prop: `left` (default), `center`, `right`.

### Usage rule

- One `<h1>` per page.
- Section titles use `<h2>`.
- Sub-section titles use `<h3>`.
- Card titles use `<h4>`.

---

## 7. Card

### Purpose

Base container for grouping content. Foundation for feature cards, project cards, etc.

### Anatomy

`<div>` with bg `bg.surface`, border `border.subtle`, radius `radius.lg`, padding `space.6`, optional hover state.

### Variants

- `default`: flat
- `interactive`: hover lifts shadow from `shadow.sm` to `shadow.md`
- `accent`: border `border.accent`, optional `shadow.glow`

### States

- **Default:** as above
- **Hover (interactive only):** shadow `shadow.md`, border `border.default`, transition `motion.fast`

### Accessibility

- If the entire card is clickable, it must be wrapped in an `<a>` (not have an `<a>` _inside_ a `<div>`).
- If the card has a title, use `<h3>` semantically.

---

## 8. NavBar

### Purpose

Top-level site navigation. Sticky on scroll.

### Anatomy

Logo (left) → primary nav links (center) → CTA (right) → mobile menu trigger (right, mobile only).

### Spec

- Height: `64px` desktop, `56px` mobile.
- Background: `bg.overlay` with `backdrop-filter: blur(12px)` when scrolled, transparent at top of page.
- Border-bottom: `border.subtle`, appears only after scroll (>16px scrolled).
- Max content width via Container.

### States

- **At top of page:** transparent background, no border.
- **Scrolled:** blurred bg, border-bottom, `motion.normal` transition.
- **Mobile:** CTA hidden, menu trigger visible.

### Accessibility

- `<nav>` semantic.
- Mobile menu: `<button aria-expanded>` + `<dialog>` or `<div role="dialog" aria-modal>`.
- Keyboard: Escape closes mobile menu. Tab cycles through links.

---

## 9. Footer

### Purpose

Site footer with secondary navigation, contact, legal.

### Anatomy

Logo + tagline → 3-column nav (Company / Services / Resources) → contact email + social icons → copyright row → privacy/terms links.

### Spec

- Background: `bg.surface` (one level above canvas).
- Padding: `space.20` top, `space.8` bottom.
- 3-column grid on desktop, single-column on mobile.

### Accessibility

- `<footer>` semantic.
- All links have descriptive text (no "Click here").

---

## 10. MobileNav (Drawer)

### Purpose

Slide-in navigation for mobile viewports.

### Spec

- Slides in from right, width `320px` (or `100%` if viewport < 320px).
- Background `bg.surface-raised`, shadow `shadow.lg`.
- Backdrop: `bg.overlay`.
- Animation: `motion.slow` `ease.emphasized`.
- Closes on: link click, backdrop click, Escape key, focus leaving.

### Accessibility

- `role="dialog" aria-modal="true"`.
- Focus trap inside drawer while open.
- Focus returns to the menu trigger on close.
- Body scroll locked while open.

---

## 11. Badge / Tag

### Purpose

Compact label for status, category, or metadata.

### Anatomy

`<span>` with bg `bg.surface`, border, radius `radius.sm`, padding `space.1 space.2`, font `text.caption` uppercase.

### Variants

- `default`: `bg.surface`, `text.secondary`
- `accent`: `accent.primarySoft`, `accent.primary`
- `success`: `status.successSoft`, `status.success`
- `warning`: `status.warningSoft`, `status.warning`
- `error`: `status.errorSoft`, `status.error`
- `info`: `status.infoSoft`, `accent.secondary`

### Usage rule

- ≤ 1 word (e.g. "New", "Beta", "Demo").
- For multi-word labels use `<Tag>` (same component, larger size).
- Don't use Badge as a button. If clickable, wrap in `<a>` or `<button>`.

---

## 12. FAQ Item (Accordion)

### Purpose

Single question + answer in a vertical list.

### Anatomy

`<button>` (question, full width) → expanding `<div>` (answer).

### Spec

- Question: `text.h4`, `text.primary`.
- Answer: `text.body.md`, `text.secondary`.
- Border-bottom between items (`border.subtle`).
- Chevron icon rotates 180° on open.
- Animation: `motion.normal` height/opacity.

### States

- Closed: shows question + chevron-down.
- Open: shows answer + chevron-up, height auto.

### Accessibility

- `<button aria-expanded>` for question.
- Answer `id` linked via `aria-controls`.
- Single-open behavior by default (opening one closes others): overridable.

---

## 13. CTA Strip

### Purpose

Bottom-of-page call-to-action. Repeats the primary conversion goal.

### Anatomy

Section → Container → 2-column grid (headline + subhead left, CTA button right).

### Spec

- Background: `bg.surface`.
- Padding: `space.16` vertical.
- Headline: `text.h2`.
- Subhead: `text.body.lg`, `text.secondary`.
- CTA: Button `primary` `lg`.

### Variants

- `default`: surface bg
- `accent`: `accent.primarySoft` bg with `border.accent`

### Responsive

- Stacks vertically on mobile (headline above, CTA below).

---

## 14. Stat

### Purpose

Display a single metric (number + label).

### Anatomy

Large number (`text.display.md`) + label (`text.body.sm`, `text.tertiary`).

### Spec

- Number color: `text.primary`.
- Optional `accent` variant: number color `accent.primary`.
- Label color: `text.tertiary`.
- Vertical layout: number on top, label below.

### Anti-patterns

- ❌ Using Stat for fabricated metrics (V1 has none: this component is for future real data).

---

## 15. Logo Cloud

### Purpose

Row of client / partner / tool logos. Hidden in V1 per `BRAND.md` (no real logos yet), but component is built.

### Spec

- Horizontal row, wraps on mobile.
- Logos rendered at uniform height (32px), grayscale filter applied.
- Spacing: `space.8` between logos.
- Section has optional `heading` prop.

### States

- `default`: visible
- `hidden`: does not render (used in V1)

---

## 16. Skeleton Loader

### Purpose

Loading state for content. Matches the shape of the final content.

### Anatomy

`<div>` with bg `bg.subtle`, animated `pulse` keyframe (opacity `0.6 ↔ 1` over `motion.slow`).

### Spec

- Honors `prefers-reduced-motion: reduce`: falls back to static.
- Border-radius matches the element it represents.
- Never use a spinner in place of a skeleton for content loading (spinners are for actions).

### Accessibility

- `aria-busy="true"` on the parent.
- `aria-label="Loading"` on the skeleton container.

---

## Component composition rules

1. **Never override component styling with raw CSS.** Use props / variants.
2. **Components compose tokens, not values.** A Button has no `#10B981`: it has `bg-accent-primary`.
3. **One component, one purpose.** A Button is not also a link. An Input is not also a select. Compose at the page level.
4. **Variants are explicit.** No "smart" components that change behavior based on context.

---

## What this list does NOT include (deferred per D-002)

- Dropdown / Select
- Checkbox / Radio / Toggle
- Table
- Modal (large, with focus trap)
- Tooltip / Popover
- Pagination
- Tabs
- Breadcrumbs
- Search input (full)
- Command palette
- Toast / Notification

When the dashboard / admin surfaces ship, those components get designed in their own phase with their own constraints. This list grows from 13 → ~30 when there's a real second surface.

---

## See also

- `BRAND.md`: brand personality and rules
- `TOKENS.md`: every value used here
- `DECISIONS.md`: D-002 (component scope), D-003, D-004
