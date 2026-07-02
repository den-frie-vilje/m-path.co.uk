# M-Path

Static marketing site for **M-Path** — Chris Hemmings' men's mental-health & masculinity programmes
for **schools and workplaces**. Rebuilt off WordPress/Elementor as an owned, self-hostable
SvelteKit static site. Sister to chrishemmings.co.uk (shares the stack + deploy infra; distinct
brand + design).

## Stack

- **SvelteKit 5** (runes) + `@sveltejs/adapter-static` — fully prerendered, single-locale (English);
  `200.html` SPA fallback for opt-out routes.
- **Tailwind v4** — design tokens live in the `@theme` block of `src/app.css`.
- **Type:** Jost (display) + Montserrat (body), self-hosted via `@fontsource`.
- **Palette:** purple→magenta brand (violet `#a230d9`, magenta `#d03edf`) + warm neutrals + a flat
  deep-plum gravitas surface + one gold accent. No database.
- `marked` for first-party markdown; `DOMPurify` for any third-party HTML.
- **Sveltia CMS** at `/admin` (GitHub backend, self-hosted bundle).
- Hand-designed **print / white-paper stylesheet** (`@media print` in `src/app.css`).

## Content model

All copy lives in `src/content/*.json`, typed + loaded via `src/lib/content`. Prose fields are
markdown strings (rendered via `$lib/markdown` → `<Prose>`); arrays are reserved for genuine lists
(nav, cards, stats, FAQ, logos). Root-array files are wrapped as `{ items: [...] }` so Sveltia can
round-trip them. All SEO (`buildSeo`/`<SeoHead>` + JSON-LD) is sourced from this content, never
hardcoded.

## Commands (always via pkgx)

```sh
pkgx pnpm install
pkgx pnpm dev       # vite dev server (:5173)
pkgx pnpm build     # static → build/  (prebuild: Sveltia bundle + OG cards + responsive photos)
pkgx pnpm check     # svelte-check + tsc — RUN BEFORE PUSHING (CI runs it before build)
```

Build-time helpers: `pnpm og` (OG cards, satori→resvg), `pnpm photos` (responsive AVIF/WebP
`srcset`, hash-gated; `pnpm photos:ci` runs the AI-upscale path inside a linux/amd64 container).

## Deploy

Shared **nas-sites pull-only CD**: GitHub Actions builds + Cosign-signs the GHCR image
(`ghcr.io/den-frie-vilje/m-path`); the NAS-side agent verifies the signature and pulls on its own
schedule. `.github/workflows/deploy-{staging,production}.yml` drive the reusable nas-sites workflow.
`main` → production (content-vs-code gated: content-only Sveltia pushes bypass review; code pushes
require signed commits + reviewer approval); `staging` → staging, live at
`https://m-path-co-uk.stage.denfrievilje.dk/`. `/admin` is stripped from the production image
(`STRIP_EDITOR=true`).

- `deploy/` — rootless-nginx Dockerfile, `nginx.conf`, `compose.{local,staging,production}.yml`,
  `Caddyfile.{staging,production}`, env examples.
- `k8s/` — cloud-agnostic Kubernetes manifests (any provider; cert-manager + ingress-nginx, no
  Helm). See [`k8s/README.md`](k8s/README.md).

## More

- [`CLAUDE.md`](CLAUDE.md) — project guidelines / working conventions.
- [`DECISIONS.md`](DECISIONS.md) — decision log (ADRs).
- [`PROGRESS.md`](PROGRESS.md) — status journal.
- [`docs/`](docs/) — design review + typography/colour principles.
