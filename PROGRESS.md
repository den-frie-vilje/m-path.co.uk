# Progress journal

Newest at the top.

## Scaffold + design system (in progress)
- Fresh SvelteKit 5 static scaffold (adapter-static, Tailwind v4, marked/DOMPurify, Sveltia).
- Reverted an initial Postgres/Drizzle/Better-Auth exploration → mirror the chrishemmings static
  stack instead (DECISIONS §1).
- Harvested the real m-path design from live Astra/Elementor CSS: Jost + Montserrat; purple→magenta
  palette; computed WCAG ratios. Wrote `src/app.css` tokens (DECISIONS §3).
- Deep content/design scrape → `docs/content-scrape.md` + `docs/design-scrape.md` (subagent).
- Deploy infra (Dockerfile/nginx/Caddy/compose/workflows) + k8s manifests (subagent).

## Next
- Content JSON (home/about/schools/workplaces/connect/chris-hemmings/blog) from the scrape.
- Routes + components (updated design).
- Sveltia `config.yml`; OG + photo scripts.
- `pnpm check` + build + smoke test; /code-review at pivotal points.
