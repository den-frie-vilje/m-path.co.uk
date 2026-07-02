# Progress journal

Newest at the top.

## Print white-paper stylesheet
- Every page now prints as a hand-designed white paper (a teacher can hand it to staff/management):
  editorial letterhead masthead, native margin-box running footer (page `n / total` + brand line),
  large cover-page title, section-per-page breaks, an OUTLINED process timeline, YouTube static
  thumbnails + visible watch URLs, editorial press-publications layout (title + URL beneath),
  logo-size clamping, a reusable `.print-hide` utility, and a `beforeprint` JS hook that expands
  accordions. Lives in the big `@media print` block of `src/app.css`. (DECISIONS.md §7.)

## Design identity + microinteractions landed
- **Accent journey settled** (DECISIONS.md §6): early cyan/yellow dropped → monochrome → one muted
  **gold** accent for the primary CTA on dark grounds; the wide-gamut P3/OKLCH gold survives only as
  a progressive `@supports` nicety.
- **Identity layer** in `src/app.css`: flat deep-plum gravitas surface, poster display tier
  (`.t-hero`), the 300→700 "highlighted turn", inline-SVG grain, the 2° badge-tilt token, and the
  PATH-motif numbered journey nodes.
- **Microinteractions** (tasteful, reduced-motion-safe): timeline path-draw, native `<details>`
  accordion slide, header elevation, mobile menu that slides open as an overlay (no content push).
  An over-used scroll-to-reveal was tried then reverted.

## Site complete — build green, deployable
- Full production build passes: every route prerendered (home, about, schools, workplaces,
  chris-hemmings, connect, blog + articles), `/admin`, `sitemap.xml`, `200.html` fallback.
- **Design** (own look, derived from the existing site + modernised): purple→magenta brand,
  Jost + Montserrat, image-led gradient hero, impact StatBand, accessible `details` accordions,
  pill CTAs, gradient devices. a11y: landmarks, skip link, `aria-current`, focus rings,
  reduced-motion, computed WCAG contrast.
- **Content**: markdown-first JSON seeded from the WP scrape; every prose field via `<Prose>`.
  Root-array files (`posts`, `testimonials`, `partners`) wrapped as `{ items: [...] }` so Sveltia
  round-trips them.
- **SEO**: `buildSeo`/`<SeoHead>` + JSON-LD (Organization/Article, FAQPage, Person) — **all sourced
  from the CMS content JSON**, nothing hardcoded. OG cards via `gen-og` (satori → resvg, 1200×630,
  brand gradient + white badge; no URL/CTA chip). Real favicons.
- **Assets**: chris' curated vector org/press logos (non-scaled originals) + full-size M-Path
  workshop/founder photos; responsive AVIF/WebP pipeline (`gen-photos`, hash-gated, AI upscale in
  CI / sharp Lanczos on macOS).
- **CMS**: Sveltia `/admin` (git-backed) with a constrained markdown toolbar (bold/italic/link/
  H2/H3/quote/lists; no image/code embeds).
- **Deploy**: rootless-nginx static image (`ghcr.io/den-frie-vilje/m-path`); compose
  (local/staging/prod) + Caddy front door + the nas-sites pull-only CD; **k8s/** manifests (any
  cloud, cert-manager + ingress-nginx, no Helm); GHA build+sign via the reusable nas-sites workflow.
  Production deploy is content-vs-code gated (content-only Sveltia pushes bypass the reviewer gate;
  code pushes require signed commits + Ole's approval). Staging is LIVE at
  `https://m-path-co-uk.stage.denfrievilje.dk/` (`/admin` + OAuth proxy work there; stripped in prod).

## Fixes logged
- Reverted an initial Postgres/Drizzle/Better-Auth exploration → mirror chris' static+Sveltia stack.
- Front-page stat numbers were clipped by the gradient-clip box (measured) → short numerics +
  inline-block gradient span.
- Staging subdomain aligned to `*.stage.denfrievilje.dk` (was `.staging.`) to match the shared
  Let's Encrypt wildcard.

## Open / next
- Optional: source an official vector M-Path wordmark (current header uses the raster badge);
  supply named school/college testimonials & logos, outcome metrics, pricing tiers, real social
  profile URLs (all flagged as client-supplied — never fabricated).
