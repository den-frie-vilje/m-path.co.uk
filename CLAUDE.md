# M-Path — Project Guidelines

Static marketing site for **M-Path** — Chris Hemmings' men's mental-health & masculinity
programmes for **schools and workplaces**. Rebuilt off WordPress/Elementor as an owned,
self-hostable SvelteKit static site. Sister to chrishemmings.co.uk (shares the stack + deploy
infra; distinct brand + design).

## Working style
Follows **Den Frie Vilje** conventions: verify by measurement (`getComputedStyle` /
`getBoundingClientRect` / computed WCAG ratios), never by eyeballing screenshots; prefer subagents
for multi-file research; binaries via `pkgx`; TypeScript everywhere (no stray `.mjs`/`.js`); RTFM
third-party components before integrating.

## Stack
- SvelteKit 5 (runes) + `@sveltejs/adapter-static` — fully prerendered, single-locale (English).
- Tailwind v4; design tokens in the `@theme` block of `src/app.css`.
- **Type:** Jost (display) + Montserrat (body), self-hosted via `@fontsource`.
- **Palette:** purple→magenta brand (violet `#A230D9`, magenta `#D03EDF`), warm neutrals, a flat
  deep-plum gravitas surface, and ONE gold accent (`--color-gold-400`) for the primary CTA on dark
  grounds. Magenta = large-text/gradient only; violet-600 for text/links on light (AA). Cyan/yellow
  were dropped (see DECISIONS.md §3 + §6, docs/type-color-principles.md).
- `marked` for first-party markdown; `DOMPurify` for any third-party HTML.
- Sveltia CMS at `/admin` (GitHub backend, self-hosted bundle).

## Commands (always via pkgx)
```sh
pkgx pnpm install
pkgx pnpm dev       # vite on :5173
pkgx pnpm build     # static → build/  (prebuild: Sveltia bundle + OG cards + responsive photos)
pkgx pnpm check     # svelte-check + tsc — RUN BEFORE PUSHING (CI runs it before build)
```

## Content model (markdown-first)
All copy lives in `src/content/*.json`, typed + loaded via `src/lib/content`. **Prose fields are
markdown strings** (rendered with `$lib/markdown` → `<Prose>`), not arrays of bullets — reserve
arrays for genuine lists (nav, cards, stats, FAQ, logos). Add a page: new `src/content/<page>.json`
+ type in `src/lib/content/index.ts` + a route + a `config.yml` entry.

## Responsive images (`Photo.svelte`)
Photographs live in `static/img/photos/` — the folder is the opt-in; logos/graphics elsewhere stay
plain `<img>`/SVG. At build each becomes AVIF/WebP `srcset` widths rendered by `<Photo>`. Small
sources are AI-upscaled in CI (linux/amd64); macOS falls back to a sharp Lanczos upscale. Content-
hash gated. Use `<Photo>` ONLY for photographs.

## Deploy
Shared nas-sites pull-only CD (cosign-verified GHCR image). `deploy/` holds the Dockerfile (pkgx
builder → rootless nginx), nginx.conf, Caddyfiles, compose files; `k8s/` holds cloud-agnostic
Kubernetes manifests (any provider). `.github/workflows/deploy-{production,staging}.yml` build +
sign. `/admin` is stripped from the production image (`STRIP_EDITOR=true`).

## Conventions
- Svelte 5 runes only (`$props`, `$state`, `$derived`). Don't name a variable `state`.
- Unlinked endpoint routes must be listed in `svelte.config.js` `prerender.entries`. `robots.txt`
  is a plain `static/` file.
- Verify contrast by computing WCAG ratios; magenta-500 is large-text/gradient only.
