# Progress journal

Newest at the top.

## Site complete — build green, deployable
- Full production build passes: every route prerendered (home, about, schools, workplaces,
  chris-hemmings, connect, blog + 3 articles), `/admin`, `sitemap.xml`, `200.html` fallback.
- **Design** (own look, derived from the existing site + modernised): purple→magenta brand,
  Jost + Montserrat, image-led gradient hero, impact StatBand, accessible `details` accordions,
  pill CTAs, gradient devices. a11y: landmarks, skip link, `aria-current`, focus rings,
  reduced-motion, computed WCAG contrast.
- **Content**: markdown-first JSON seeded from the WP scrape; every prose field via `<Prose>`.
- **Assets**: chris' curated vector org/press logos (non-scaled originals) + full-size M-Path
  workshop/founder photos; responsive AVIF/WebP pipeline (`gen-photos`) + OG cards (`gen-og`).
- **CMS**: Sveltia `/admin` (git-backed) with a constrained markdown toolbar (bold/italic/link/
  H2/H3/quote/lists; no image/code embeds).
- **Deploy**: rootless-nginx static image; compose (local/staging/prod) + Caddy front door + the
  nas-sites pull-only CD; **k8s/** manifests (any cloud, cert-manager + ingress-nginx, no Helm);
  GHA build+sign (production + staging).

## Fixes logged
- Reverted an initial Postgres/Drizzle/Better-Auth exploration → mirror chris' static+Sveltia stack.
- Front-page stat numbers were clipped by the gradient-clip box (measured) → short numerics +
  inline-block gradient span.

## Open / next
- Review pass in progress (parallel finders → verify). Apply findings.
- Optional: source an official vector M-Path wordmark (current header uses the raster badge);
  create prod/staging GitHub envs + staging OAuth proxy secrets; real social profile URLs.
