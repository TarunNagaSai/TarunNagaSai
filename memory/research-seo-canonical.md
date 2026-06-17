---
name: research-seo-canonical
description: /research blog content is canonical to tarun.avipra.com only — not cross-posted; SEO is built around owning it on-domain
metadata:
  type: project
---

The `/research` series + topic articles are published **only on tarun.avipra.com** — not cross-posted to Medium/Substack/Dev.to (confirmed 2026-06-16). So the SEO strategy is built around the site owning that content: explicit `alternates.canonical` self-references on every research route, `BlogPosting`/`CreativeWorkSeries` JSON-LD, per-article generated OG images, and `og:type: article` with published/modified dates from `ResearchTopic.publishedAt`.

**Why:** Goal is maximum organic + social clicks to `/research`. Medium has far higher domain authority, so cross-posting without a canonical back to the site would let Medium outrank his own domain. Keeping it native + canonical means his site accrues the SEO value.

**How to apply:** If research articles ever get cross-posted later, the canonical on the external copy must point back to `tarun.avipra.com/research/...`. Note `/writing` is the opposite — those entries are external Medium links by design (see `lib/articles.ts`). Don't conflate the two.
