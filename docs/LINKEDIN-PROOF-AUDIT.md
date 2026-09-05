# LinkedIn Proof Audit — Public Asset Plan

**Date:** 2026-08-21
**Positioning target:** Software Engineer · AI Automation & Business Systems · Software for operational workflows
**LinkedIn changes:** none — audit only
**Audit goal:** pick the strongest, safest projects for public LinkedIn Featured items

---

## TL;DR

| #   | Project                                | Class                                   | Asset                                            | Risk                     |
| --- | -------------------------------------- | --------------------------------------- | ------------------------------------------------ | ------------------------ |
| 1   | **HRM Lead Generation Pipeline**       | **C — needs source**                    | Architecture case study (after you share source) | Medium (client-named)    |
| 2   | **Multi-tenant RBAC + PostgreSQL RLS** | **B — feature after creating an asset** | Sanitized GitHub repo + walkthrough              | Low (already demo-grade) |
| 3   | **Cold Email Automation (n8n)**        | **B — feature after creating an asset** | Architecture case study + redacted workflow      | Low (your pipeline)      |

**Skip from LinkedIn Featured:** Elion company page, Gadget Cartel, Ideas & Adherents, BIC, Personal Portfolio, Ingenuity HR, AI Automation Systems.

**The single biggest blocker:** the HRM pipeline — the headline project — has no source on this machine. The only evidence is chat history under `~/.config/manicode/projects/Ingenuity_HRM_Cold_Email_System/chats/`. **Cannot publish a credible case study from chat logs alone.** Section 3 below has the structure, gated on you providing the source or an outline.

---

## 1. Project-by-project audit

For each: a short description of what's real, the source location (if any), the public-safety risk, and the A/B/C/D classification per the brief.

### 1.1 HRM Lead Generation Pipeline

- **Source on disk:** none. Only chat sessions under `~/.config/manicode/projects/Ingenuity_HRM_Cold_Email_System/chats/` (≈25 dated sessions, 2026-07-16 → 2026-08).
- **What exists:** a project name, a client identifier (Ingenuity HR), and conversation history. No `package.json`, no `src/`, no `.env.example`, no README, no schema.
- **Portfolio entry:** `lead-generation-platform` in `elion-app/src/lib/projects.ts`. **This entry was written without verified source** — copy was constructed generically and is not safe to publish as a real architecture.
- **Public safety:** client-named ("Ingenuity HR"). Even with a great case study, using the client name without permission exposes the relationship.
- **Class:** **C — needs permission + source.** Strongest possible asset if you can (a) share the real source or architecture notes, (b) confirm client permission to reference the project publicly, and (c) confirm what can be named (use "a Nigerian HR consulting company" if the answer is no).
- **No fabricated technology claims.** I will not fill in Apollo / Hunter / PostgreSQL / Next.js until you point me at code that proves they're actually used.

### 1.2 Multi-tenant RBAC + PostgreSQL RLS (`rbac-demo`)

- **Source on disk:** `~/Projects/rbac-demo/`. Next.js 16 + Supabase + PostgreSQL.
- **Real evidence:** migrations (`20260814000000_init.sql`, `20260814000000_grants.sql`, `20260814000002_disable_rls_phase3.sql`, `20260814000003_phase5_rls.sql`), `src/lib/auth.ts`, `src/proxy.ts`, `supabase/seed.ts`, verification scripts (`phase3`, `phase4`, `phase5`), `docs/WALKTHROUGH.md`, `docs/UUIDs.md`, `docs/OFFLINE.md`.
- **Public safety:** clean — built as a demo, no client name attached, "Elion" is your own company.
- **Strength:** matches your positioning **very** well. "AI Automation & Business Systems" → multi-tenant authorization is exactly business-system software. PostgreSQL RLS as source of truth is technical depth a hiring manager or peer engineer would notice.
- **Class:** **B — feature after creating an asset.** Repo exists; need to sanitize the seed (4 magic UUIDs, magic emails), confirm nothing leaks, and write a public README that walks through the three authorization layers.
- **Tech [Certain]:** Next.js 16, TypeScript, Supabase (Postgres + Auth via `@supabase/ssr`), PostgreSQL RLS, Tailwind CSS v4, Zod.

### 1.3 Cold Email Automation (`cold-email-automation/`)

- **Source on disk:** `~/Projects/cold-email-automation/`. n8n workflow JSON (`workflows/cold-email.json`), Python CLI scripts (`scripts/init_db.py`, `scripts/suppress.py`), SQLite schema, `docker-compose.yml`, `.env.example`, docs (`docs/RUN.md`, `docs/ARCHITECTURE.md`).
- **Real evidence:** 16-node workflow with intake → enrich → suppress → personalize → dry-run → send → reply/bounce handling. Compliance baked in (List-Unsubscribe + RFC 8058 One-Click + physical address footer).
- **Public safety:** clean — this is your own pipeline. The email tools, the workflow shape, the SQLite schema are not client-sensitive.
- **Strength:** directly proves "AI Automation & Business Systems." A real n8n workflow with 16 nodes and a suppression list is exactly the artifact a LinkedIn viewer wants to see.
- **Class:** **B — feature after creating an asset.** Already shipped; need a sanitized export (no SMTP creds, no provider-specific tokens) and a written walkthrough.
- **Tech [Certain]:** n8n, Docker Compose, SQLite, SMTP, Python (suppression scripts), List-Unsubscribe + RFC 8058 compliance headers.

### 1.4 Personal Portfolio (`elion-app/`)

- **Source on disk:** `~/Projects/elion-app/`. Production-ready, evidence videos being captured.
- **Public safety:** clean.
- **Strength:** shows engineering taste, animation craft, content honesty. But it's a portfolio site about a portfolio site — meta and not specifically aligned with the AI Automation & Business Systems positioning.
- **Class:** **D — do not feature.** Useful as your portfolio URL, not as a Featured item. Don't double-feature it.

### 1.5 Elion (the company)

- **Source on disk:** brand work in `elion-app` and `elion-website` subfolder.
- **Public safety:** clean.
- **Strength:** weak for this positioning — company branding is not engineering evidence.
- **Class:** **D — do not feature on LinkedIn Featured.** Better as the headline summary, not a proof item.

### 1.6 Gadget Cartel

- **Source on disk:** `~/Desktop/Gadget Cartel/` (not in `~/Projects/`). Next.js 16 storefront. Audit log on 2026-08-17 covers iOS zoom fixes, orphan image sweep.
- **Public safety:** clean, but e-commerce is not aligned with the AI Automation & Business Systems positioning.
- **Strength:** shows full-stack engineering care, but it's a generic storefront.
- **Class:** **D — do not feature.** Wrong category. Generic ecom work doesn't strengthen the specific positioning.

### 1.7 Ideas & Adherents

- **Source on disk:** none — live site is at https://ideasandadherents.com. You did brand + web for a Lagos-based impact agency.
- **Public safety:** **client permission unclear**. The site is live and your name may or may not be credited.
- **Strength:** medium — brand and web design work, not AI automation or business systems.
- **Class:** **D — do not feature.** Category mismatch, and permission status unknown.

### 1.8 BIC / Babcock Investors Club

- **Source on disk:** `~/Projects/BIC-website/` (8 HTML pages, hand-written, mobile-fix pass documented in README).
- **Public safety:** **club permission unclear**. Likely fine to reference since the README exists publicly, but the work is yours.
- **Strength:** static HTML/CSS — proves front-end care, not AI automation or backend depth.
- **Class:** **D — do not feature.** Category mismatch.

### 1.9 Ingenuity HR Platform

- **Source on disk:** no source — only the same `Ingenuity_HRM_Cold_Email_System` chats. The portfolio entry `ingenuity-hr-platform` is currently paused per your earlier note.
- **Public safety:** client-named, paused commercial discussions.
- **Class:** **D — do not feature.** Same client, same privacy concerns as HRM lead-gen, weaker evidence.

### 1.10 AI Automation Systems (the future Elion product line)

- **Source on disk:** conceptual only — no code.
- **Public safety:** N/A.
- **Class:** **D — do not feature.** Honest about scope as a future product line. Doesn't belong in Featured items.

---

## 2. Top 3 projects to turn into public proof

The picks are constrained by **what is both strong AND safe to publish**:

1. **HRM Lead Generation Pipeline** — strongest possible Featured item, but **blocked** until you provide source + permission. If unblocked, it goes first because it most directly proves "AI Automation & Business Systems · Software for operational workflows."
2. **Multi-tenant RBAC + PostgreSQL RLS** — already a real repo, already demo-grade, already de-named. Becomes the second Featured item because it proves backend engineering depth and authorization-as-a-business-system thinking.
3. **Cold Email Automation (n8n)** — already shipped, your own pipeline. Becomes the third Featured item because it proves you can ship a complete automation system end to end.

If HRM stays blocked, the order becomes RBAC → Cold Email → one of BIC / Gadget Cartel (only if the RBAC + Cold Email pair feels thin).

---

## 3. Recommended asset per project

**Smallest asset that provides strong evidence. The objective is not a huge portfolio — it's three credible LinkedIn Featured items.**

### 3.1 HRM Lead Generation Pipeline

**Asset:** A single public case study page (Markdown, hosted on GitHub Pages or your portfolio) + a redacted architecture diagram.

**Why this asset:** the proof is the _shape_ of the system and the _reasoning_ behind each stage. You can't publish the real data (prospect info, client names) but you can publish a sanitized architecture that shows you understand verification, scoring, and reliability.

**Draft structure** (gated on Section 4 input from you):

```
# HRM Lead Generation Pipeline

> An automated B2B prospecting system built for an HR consulting
> engagement. The case study describes the system architecture;
> no prospect data, internal URLs, or client-identifying details
> are included.

## 1. The business problem
[what the client was paying people to do manually]

## 2. Why the workflow needed automation
[the failure modes of doing this by hand]

## 3. System architecture
[high-level pipeline diagram: discover → enrich → verify → score → store → review]

## 4. Company discovery
[inputs, sources, how a "company" is identified, what counts as a match]

## 5. Website extraction
[what gets pulled from a discovered site, how robots.txt / ToS is respected]

## 6. Contact discovery
[decision-maker identification, sources used, fallbacks]

## 7. Email verification
[verification layers, catch-all handling, role-account handling]

## 8. Lead qualification / scoring
[the actual scoring model — be honest if it's heuristic, not ML]

## 9. Data storage
[schema, what is stored, retention policy]

## 10. Review / export workflow
[how a human reviews scored leads before outreach]

## 11. Reliability and failure handling
[retries, idempotency, what happens when a stage fails]

## 12. Technologies used
[labeled [Certain] / [Likely] / [Guessing]]

## 13. What I personally built
[scope: which stages, which integrations, what I left to others]

## 14. What the system is designed to accomplish
[intended outcomes — be careful: design targets, not measured results]

## 15. What remains private
[prospect data, client name, internal infra, credentials, etc.]
```

### 3.2 Multi-tenant RBAC + PostgreSQL RLS

**Asset:** A public GitHub repository (sanitized) + a `docs/WALKTHROUGH.md` explaining the three authorization layers.

**Steps to make it public:**

1. Sanitize `supabase/seed.ts` (replace magic UUIDs and emails with placeholder values that still demo the flow).
2. Verify no `.env*` is tracked.
3. Confirm no client name anywhere.
4. Add a `LICENSE` (MIT) and a `CONTRIBUTING.md` (optional).
5. Push to a new public repo.
6. Write a short LinkedIn post that opens with: "Multi-tenant authorization is a single-check story in most demos. This one has three independent layers, and PostgreSQL Row Level Security is the source of truth."

### 3.3 Cold Email Automation

**Asset:** A public architecture case study + a redacted workflow export.

**Steps:**

1. Copy `workflows/cold-email.json` to a public repo, scrub any environment-specific values.
2. Publish a Markdown case study with the same structure as the HRM case study (Sections 3–15 adapted).
3. Link to the docs already in `~/Projects/cold-email-automation/docs/`.

---

## 4. Exact information / assets I need from you

Before I can write a credible HRM case study (Section 3.1), I need:

| Item                                                                          | Why                                                            | Source                                                                 |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Real source code or an architecture outline                                   | Without it, any case study is fabricated                       | `~/Projects/hrm-lead-gen/` if it exists elsewhere, or pasted into chat |
| Stage-by-stage truth table (which stages exist, which are stubbed)            | Lets me label each stage [Certain] vs. [Likely] vs. [Guessing] | Code, README, or your description                                      |
| Verification / scoring model                                                  | Lets me describe it honestly                                   | Code or notes                                                          |
| Data schema (table list, fields)                                              | Section 9 needs the real schema                                | Migration files or schema dump                                         |
| Client permission: can we use the name "Ingenuity HR" / "HRM" publicly?       | Privacy gate                                                   | Your decision                                                          |
| If no: anonymized client descriptor (e.g. "a Nigerian HR consulting company") | Lets the case study be published                               | Your decision                                                          |
| Permission to publish performance / quality metrics, if any exist             | The brief says don't fabricate metrics                         | Source numbers from logs                                               |
| Repo hosting choice for public assets (GitHub account to use)                 | Section 5 wiring                                               | Your decision                                                          |

For RBAC (`rbac-demo`) I need:

| Item                                                                    | Why            |
| ----------------------------------------------------------------------- | -------------- |
| Confirm GitHub org/account to push the sanitized repo to                | Repo ownership |
| Confirm magic UUIDs + emails in `seed.ts` are okay to anonymize further | Privacy        |
| Confirm no client data anywhere in the repo                             | Sanity check   |

For Cold Email Automation I need:

| Item                                                        | Why            |
| ----------------------------------------------------------- | -------------- |
| Confirm SMTP creds are nowhere in the tracked workflow JSON | Sanity check   |
| GitHub target repo (same as RBAC? separate?)                | Repo ownership |

---

## 5. What can safely be made public

**HRM Lead Generation Pipeline:**

- The shape of the pipeline (the stage names you confirm).
- The general approach to verification, scoring, and reliability.
- Technologies **with [Certain] labels only**.
- A redacted architecture diagram.
- **Not safe:** prospect data, internal URLs, API keys, the client name (unless permission granted), measured metrics without source numbers.

**RBAC + PostgreSQL RLS:**

- Source code (already demo-grade).
- Schema, RLS policies, the three-layer pattern.
- The walkthrough doc (already exists at `docs/WALKTHROUGH.md`).
- **Not safe:** any non-demo data, real auth provider URLs, real email addresses.

**Cold Email Automation:**

- The workflow shape (16-node pipeline).
- The compliance-on-by-default pattern (List-Unsubscribe + RFC 8058 + physical footer).
- The suppression list design.
- **Not safe:** SMTP creds, real leads, real bounces, real complaint data.

---

## 6. What must remain private

Across all three:

- Real prospect / lead / contact data (anywhere it exists).
- Real client names without permission.
- API keys, tokens, passwords, OAuth client IDs/secrets.
- Private URLs (admin panels, internal dashboards).
- Proprietary scoring models that the client paid for (the algorithm can be described generically, but the exact weights and thresholds are theirs).
- Performance metrics you can't prove — distinguish **measured** (from logs) vs. **design targets** (what the system is designed to achieve) vs. **estimates**.

---

## 7. Recommended order for building the assets

1. **RBAC + RLS repo, sanitized and pushed public.** Lowest risk, fastest to ship, immediately a Featured item.
2. **Cold Email case study + sanitized workflow export.** Your own pipeline, no permission gates.
3. **HRM Lead Gen case study.** Blocked on Section 4. Once unblocked, build last because it needs the most care.

Estimated effort: RBAC push is a few hours; Cold Email case study is a focused day; HRM case study is a focused day **after** you hand me the source.

---

## 8. Metric honesty rules (per the brief)

Every metric I include will be labeled:

- **measured** — from logs / dashboards / recorded output.
- **design target** — what the system is intended to achieve, not what it has achieved.
- **estimate** — a reasonable guess with explicit assumptions.
- **observation** — qualitative notes from running the system, not a number.

I will not write "X% accuracy" without telling you where the number came from.

---

## 9. Open questions before I write a single line of public copy

Please answer (one is enough to unblock each track):

1. **HRM:** do you have the source code anywhere (not on this machine)? Can you paste the README, the stage list, or the schema into chat?
2. **HRM:** client permission to use the name publicly — yes / no / "a Nigerian HR consulting company"?
3. **RBAC:** which GitHub org/account should the sanitized repo live under?
4. **Cold Email:** same GitHub target as RBAC, or separate?
5. **What metrics actually exist?** Anything measured from logs — pipeline throughput, verification rates, lead counts, suppression match rates?

I'll wait for these answers before publishing anything.

---

## Files referenced during this audit

- `~/Projects/elion-app/src/lib/projects.ts` — current portfolio entries
- `~/Projects/rbac-demo/` — RBAC + RLS repo
- `~/Projects/cold-email-automation/` — n8n pipeline + scripts + docs
- `~/.config/manicode/projects/Ingenuity_HRM_Cold_Email_System/chats/` — HRM chat history (no code)
- `~/Desktop/Gadget Cartel/` — ecom storefront
- `~/Projects/BIC-website/` — BIC static site
- `~/Projects/BIC-website-upstream/` — BIC upstream (audit notes)
