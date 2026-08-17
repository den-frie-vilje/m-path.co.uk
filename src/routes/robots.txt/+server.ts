/**
 * robots.txt — per-environment content, prerendered at build time.
 *
 * Production build (PUBLIC_ALLOW_INDEXING=true in `.env.production`): allow crawling, disallow the
 * /admin editor, advertise the sitemap.
 *
 * Staging + dev builds (PUBLIC_ALLOW_INDEXING=false): disallow everything so search engines never
 * surface m-path-co-uk.stage.denfrievilje.dk instead of the real domain. No sitemap advert either —
 * staging URLs are duplicates of production content.
 *
 * Belt-and-braces with deploy/Caddyfile.staging, which stamps `X-Robots-Tag: noindex, nofollow` on
 * every staging response.
 *
 * `$env/static/public`, not dynamic: static env is sourced from the committed `.env.[mode]` files
 * at build time and hard-fails on a missing declaration, so a mis-applied mode can never silently
 * fall back to production values (that's how staging images shipped production robots.txt on
 * skovbyesexologi.com until 2026-07-29 — the Dockerfile's `pnpm build -- --mode` swallowed the mode
 * flag and dynamic env masked it). Fail-closed on top: only the literal "true" bakes the indexable
 * variant.
 */
import { PUBLIC_ALLOW_INDEXING } from '$env/static/public';
import { SITE_URL } from '$lib/seo';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
  const allowIndexing = PUBLIC_ALLOW_INDEXING === 'true';
  const base = SITE_URL;

  const body = allowIndexing
    ? ['User-agent: *', 'Allow: /', 'Disallow: /admin', '', `Sitemap: ${base}/sitemap.xml`, ''].join(
        '\n'
      )
    : [
        '# Staging build. Crawlable ON PURPOSE, so that the noindex on every',
        '# response is actually read. Nothing here may enter an index.',
        'User-agent: *',
        'Allow: /',
        'Disallow: /admin',
        ''
      ].join('\n');

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
