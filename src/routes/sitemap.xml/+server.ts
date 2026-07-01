import { site, posts } from '$lib/content';
import type { RequestHandler } from './$types';

export const prerender = true;

const STATIC_PATHS = ['/', '/about', '/schools', '/workplaces', '/chris-hemmings', '/blog', '/connect'];

export const GET: RequestHandler = () => {
  const base = site.url.replace(/\/$/, '');
  const urls = [
    ...STATIC_PATHS.map((p) => ({ loc: base + (p === '/' ? '' : p), lastmod: undefined as string | undefined })),
    ...posts.map((p) => ({ loc: `${base}/blog/${p.slug}`, lastmod: p.date }))
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod.slice(0, 10)}</lastmod>` : ''}</url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
