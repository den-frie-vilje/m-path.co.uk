# Decisions (ADRs)

Append-only log of non-obvious choices. Newest at the bottom.

## 1. Stack: mirror the chrishemmings sibling (static SvelteKit + Sveltia), not a DB stack
The site is rebuilt off WordPress/Elementor as an owned, self-hostable **static** SvelteKit 5
site — the same proven stack as the chrishemmings.co.uk sibling: `@sveltejs/adapter-static`
(fully prerendered), Tailwind v4, `marked` for first-party markdown, Sveltia git-CMS at `/admin`,
and the shared nas-sites pull-only deploy model. An earlier exploration of a Postgres + Drizzle +
Better Auth persistence layer (borrowed from the frihedsbrevet-task stack) was **reverted** — the
maintainable, cloud-portable outcome the brief wants is delivered by the static+git-CMS stack, which
needs no database to operate and deploys as a single stateless container.

## 2. Fresh scaffold, generic infra lifted verbatim
Built a fresh SvelteKit skeleton; only the generic infra (deploy/, workflows, pkgx, copy-sveltia,
admin host) is lifted from chrishemmings and renamed. The design/app layer is built fresh from the
m-path source. A residuals audit (grep chrishemmings/hanken/newsreader/navy) gates the first commit.

## 3. Design derived from the EXISTING m-path site, modernised
Per the brief, the design leans toward the existing site, updated — NOT the sibling's navy/orange
palette. Harvested from the live Astra/Elementor CSS (measured, not guessed):
- **Type:** Jost (display/headings) + Montserrat (body) — the site's actual active fonts.
- **Palette:** a vibrant purple→magenta brand — violet `#A230D9` primary, magenta `#D03EDF`
  gradient partner, white-on-purple heroes, warm neutrals (paper/sand/mist), a flat deep-plum
  gravitas surface, and a single gold accent. (Accent evolution: see §6.)
- **Contrast (computed WCAG):** white on violet-500 = 5.3:1 (AA ✓ CTAs); violet-600 `#8f13c9` on
  white = 6.76:1 (AA ✓ links/text); magenta-500 = 3.86:1 → large/gradient text ONLY. Ink
  `#1c1230` on white = 17.8:1.
- **Update:** pill buttons + a signature purple→magenta gradient wash replace the flat Elementor
  squares.

## 4. Markdown-first content
Content is JSON, but every prose field is a **markdown string** (rendered via `marked`), not an
array of bullets — structured arrays only for genuine lists (nav, cards, stats, FAQ). Sveltia edits
these via `static/admin/config.yml` (markdown widget on prose fields).

## 5. Any-cloud deployability: compose AND kubernetes
The static image (rootless nginx) runs identically under Docker Compose (the nas-sites pull-only CD
model) and under Kubernetes (plain manifests in `k8s/`, cert-manager + ingress-nginx, no Helm). No
provider lock-in; the container is stateless. Image: `ghcr.io/den-frie-vilje/m-path`; repo is
PUBLIC `den-frie-vilje/m-path.co.uk` with `main` (production) + `staging` branches. Staging is live
at `https://m-path-co-uk.stage.denfrievilje.dk/` — note `.stage.` (aligned to the shared LE wildcard
`*.stage.denfrievilje.dk`; production origin is the matching `.prod.`). The client-facing apex sits
behind Cloudflare, so CI verifies against the origin host, not the apex.

## 6. Accent evolution: cyan dropped → monochrome → one gold accent; wide-gamut experiment scrapped
The current accent story is the product of several reversals, all grounded in the research pass
(`docs/type-color-principles.md`):
- An early **cyan** accent (`#41fff8`, carried over from the original rave-flyer palette) was
  **dropped** — cyan on magenta is equiluminant + near-complementary → vibrating edges, the worst
  possible pairing. A matching yellow pop went with it.
- The palette then went **monochrome brand** (violet + neutrals) pending research.
- Research allowed exactly one restrained second accent: violet's complement → a **muted gold**
  (`--color-gold-400`, sRGB `#f2b52a`), used in a single role — the primary CTA on violet/plum
  grounds (`.btn-on-violet`, dark text on gold = AA). No cyan/yellow tokens survive in `@theme`.
- A **wide-gamut (display-P3 / OKLCH) gold** was explored (a bolder `oklch(0.85 0.19 92)` layered
  via `@supports (color: oklch(...))`) to render richer on P3 screens. It still ships as a small
  progressive-enhancement `@supports` block, but the "HDR-first" direction was **scrapped** — the
  sRGB fallback is the design; P3 is a barely-perceptible nicety, not a load-bearing choice.

## 7. Hand-designed print / white-paper stylesheet
Each page prints as a professional white paper a teacher can hand to staff/management — a large
`@media print` block in `src/app.css` (plus a `beforeprint` JS hook that expands accordions).
Deliberately hand-built, not a reset: an editorial letterhead masthead (`.print-letterhead`),
a native margin-box running footer (page-number `counter(page) / counter(pages)` + brand line),
a large cover-page title (`h1.page-title`), section-per-page breaks, an OUTLINED process timeline
(borders print reliably, gradient fills don't), YouTube static thumbnails + visible watch URLs,
an editorial press-publications layout (title + URL beneath), logo-size clamping (so intrinsic-size
SVGs don't balloon), and a reusable `.print-hide` utility. See §Print in `docs/design-review.md`.
