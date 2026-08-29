# Ayoola's Portfolio

Personal portfolio site for **Awodeyi Ayoolamikun** — built with **Next.js 16** + **Tailwind CSS v4** + **Motion** + **GSAP**.

🌐 **Live site:** https://ayoolaxrp.github.io/ayoolas-portfolio/

## Stack

- **Next.js 16** (App Router, Turbopack) — static export for GitHub Pages
- **TypeScript** + **React 19**
- **Tailwind CSS v4** (PostCSS plugin)
- **Motion** (`framer-motion`) for component-level animation
- **GSAP** for cinematic section transitions
- **Lenis** for smooth scrolling
- **Radix UI primitives** (Slot), **class-variance-authority**, **tailwind-merge**

## Local development

```bash
pnpm install
pnpm dev          # dev server at http://localhost:3000/
pnpm build        # static export → ./out/
pnpm start        # serve ./out/ at http://localhost:3000/
```

## Deployment

GitHub Actions builds the static export and deploys to GitHub Pages on every push to `master`.

The workflow sets `BASE_PATH=/ayoolas-portfolio` before `pnpm build` so the output works under the `/ayoolas-portfolio/` subpath at `https://ayoolaxrp.github.io/ayoolas-portfolio/`.

See `.github/workflows/deploy.yml`.

## Project structure

```
.
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.tsx        # root layout, metadata, fonts
│   │   ├── page.tsx          # homepage
│   │   ├── about/            # /about
│   │   ├── projects/         # /projects + /projects/[slug]
│   │   ├── contact/          # /contact
│   │   ├── privacy/          # /privacy
│   │   ├── terms/            # /terms
│   │   ├── not-found.tsx     # 404 page
│   │   ├── robots.js         # static robots.txt (force-static)
│   │   └── sitemap.js        # static sitemap.xml (force-static)
│   ├── components/
│   │   ├── sections/         # large page sections (hero, portrait, photography, etc.)
│   │   ├── ui/               # primitives (button, input, etc.)
│   │   └── ...
│   ├── config/
│   │   └── site.config.ts    # site identity, navigation, social links
│   ├── lib/                  # data + utilities
│   └── ...
├── public/                   # served at site root (incl. /images/portrait.jpg)
├── next.config.ts            # static export config
└── pnpm-lock.yaml
```

## Configuration

Site-wide values (name, role, tagline, nav links, social handles) live in **`src/config/site.config.ts`**. Change values there — don't edit components directly.

The canonical site URL is `https://ayoolaxrp.github.io/ayoolas-portfolio/` (current GitHub Pages deployment). To override at build time, set `NEXT_PUBLIC_SITE_URL` (consumed by `sitemap.js` and `robots.js`); the `BASE_PATH` env var drives the `/ayoolas-portfolio/` asset prefix.