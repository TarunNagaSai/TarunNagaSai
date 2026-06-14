# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Next.js dev server (App Router, HMR).
- `npm run build` — production build. All routes are statically prerendered; build will fail if any data import or MDX file is malformed.
- `npm run start` — serve the production build locally.
- `npm run lint` — `next lint` (eslint-config-next). No test runner is configured.

If you hit `Cannot find module './XXX.js'` from `.next/server/...`, delete `.next/` and re-run dev — it's a stale build cache from mixing `next build` and `next dev`.

## Architecture

Single-author portfolio site. Next.js 14 App Router + TypeScript + Tailwind + MDX. All content is co-located in the repo; there's no CMS or database.

### Data flow

Static data lives in `lib/` and is the source of truth for everything rendered:

- `lib/site.ts` — `SITE` constant: name, URLs, email, social handles, display strings, stats. **Update personal info here only** — it propagates to Hero, Footer, Contact, metadata, etc.
- `lib/projects.ts` — `projects[]` array (work entries) + `getProject(slug)` / `getFeaturedProjects()` helpers. Each project has a `slug` that must match a file in `content/projects/<slug>.mdx`.
- `lib/articles.ts` — same shape as projects but for writing entries; external links only (Medium, etc.), no MDX bodies.
- `lib/research.ts` — `research[]` (`ResearchProject`) + `getResearchProject(slug)`. Listing-only: no MDX bodies, no `[slug]` route. Some slugs intentionally overlap with `lib/projects.ts` (e.g. `rust-gc-vm`).
- `lib/services.ts` — `services[]` (`Service`) rendered on `/services` and the home snippet. Copy is outcome-focused on purpose — keep tool/tech names out, the work itself is the proof. `skillAnchor` ties a service to an about-page skill.
- `lib/testimonials.ts` — `testimonials[]` for the home carousel. **Currently placeholders** — replace with real quotes before going public; keep each ~25–55 words or the section's visual rhythm breaks.
- `lib/mdx.ts` — async helpers `loadCaseStudy(slug)` and `listCaseStudySlugs()` reading from `content/projects/`. Currently the `[slug]` route imports the MDX module directly (`await import('@/content/projects/${slug}.mdx')`) rather than going through this helper.
- `lib/utils.ts` — `cn()` for Tailwind class merging (clsx + tailwind-merge).

Adding a project = append to `lib/projects.ts` + create `content/projects/<slug>.mdx`. Adding an article = append to `lib/articles.ts` only. Research, services, and testimonials are each a single data file with no MDX bodies and no per-item route.

### Routing

`app/` (App Router). Routes: `/`, `/about`, `/contact`, `/work`, `/work/[slug]`, `/writing`, `/research`, `/services`, `/card`, `/not-found`. `app/work/[slug]/page.tsx` uses `generateStaticParams()` over `projects[]` so every slug is prerendered at build time. The dynamic page tries to import the MDX module by slug and falls back to a "coming soon" message if the file is absent — case-study MDX is **optional**, the project listing is canonical. `/card` is a noindex profile-card page (`robots: { index: false }`).

`app/icon.tsx` and `app/opengraph-image.tsx` generate the favicon and OG image at build time via Next's image generation APIs.

### Components

Buckets under `components/`:

- `layout/` — `Header` (with mobile hamburger overlay using Framer Motion + `useReducedMotion`), `Footer`, `Container` (the canonical width wrapper; sizes: `prose | default | wide`).
- `home/` — landing-page sections (`Hero`, `AboutSnippet`, `SelectedWork`, `FeaturedWriting`, `ContactStrip`, `WhatCanIDo`, `Testimonials`). These pull from the `lib/` data files.
- `about/` — `SkillRadar` (skill scores are a local `SKILLS` array inside the component, not in `lib/`) and `MobileHero`.
- `card/` — `ProfileCard`, used only by the noindex `/card` route.
- `work/` — `ProjectCard` and `CaseStudyHeader`.
- `ui/` — small primitives (`Tag`, `ArrowLink`, `BackLink`, `Reveal` — Framer Motion fade-up wrapper).

`Container` is the only width primitive — don't add raw `max-w-*` to page sections, wrap with `<Container size="...">` instead. Padding is `px-6 sm:px-8`.

### Styling

Tailwind config (`tailwind.config.ts`) defines the design system:

- **Colors** are semantic tokens, not raw palette: `bg`, `fg`, `muted`, `subtle`, `border`, `accent`. Use these — don't reach for `text-gray-*` etc.
- **Type scale** uses `clamp()` for fluid sizing: `text-display`, `text-h1`, `text-h2`. Body text uses standard Tailwind sizes with `sm:` breakpoints.
- **Font** is Geist Sans + Geist Mono via `next/font` (CSS vars `--font-geist-sans` / `--font-geist-mono`).
- Default breakpoint is `sm:` (640px) — mobile-first. The site is designed to look intentional at 320px, 375px, 768px, and up.

`app/globals.css` defines `prose-custom` (used by case studies) and `hairline` (the thin accent rule).

### MDX

Configured in `next.config.mjs` via `@next/mdx` with `remark-gfm`. `mdx-components.tsx` (root) is the global override for MDX rendering. `pageExtensions` includes `md` / `mdx`, so MDX files can be routes themselves — but in this project MDX is used purely for case-study bodies under `content/projects/`, not for routing.

### Animations

Framer Motion throughout. Convention: client components use `'use client'` + `useReducedMotion()` to disable transforms when the user has reduced motion enabled. The shared ease curve is `[0.16, 1, 0.3, 1]`. `components/ui/Reveal.tsx` is the canonical fade-up wrapper — prefer it over hand-rolled `motion.div`s for section reveals.

### Path alias

`@/*` resolves to the repo root (`tsconfig.json` `paths`). Import from `@/components/...`, `@/lib/...`, `@/content/...`.

## Deployment

`vercel.json` declares the framework as Next.js — deploys to Vercel. There is no environment variable surface; the site is fully static.
