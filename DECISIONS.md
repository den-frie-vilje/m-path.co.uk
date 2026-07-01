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
  gradient partner, cyan `#41FFF8` + yellow `#FFE250` pops, white-on-purple heroes.
- **Contrast (computed WCAG):** white on violet-500 = 5.3:1 (AA ✓ CTAs); violet-600 `#8f13c9` on
  white = 6.76:1 (AA ✓ links/text); magenta-500 = 3.86:1 → large/gradient text ONLY. Ink
  `#1c1230` on white = 17.8:1.
- **Update:** pill buttons + a signature purple→magenta gradient wash replace the flat Elementor
  squares; cyan/yellow reserved as sparse accents on violet grounds.

## 4. Markdown-first content
Content is JSON, but every prose field is a **markdown string** (rendered via `marked`), not an
array of bullets — structured arrays only for genuine lists (nav, cards, stats, FAQ). Sveltia edits
these via `static/admin/config.yml` (markdown widget on prose fields).

## 5. Any-cloud deployability: compose AND kubernetes
The static image (rootless nginx) runs identically under Docker Compose (the nas-sites pull-only CD
model) and under Kubernetes (plain manifests in `k8s/`, cert-manager + ingress-nginx, no Helm). No
provider lock-in; the container is stateless.
