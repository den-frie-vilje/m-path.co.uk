/**
 * Admin route — Sveltia CMS host. Sveltia manages its own client-side routing, so disable CSR and
 * prerender a static host page. `trailingSlash: 'always'` emits `admin/index.html` so the `/admin/`
 * directory (which also holds the vendored bundle + config.yml) has a real index.
 */
export const csr = false;
export const prerender = true;
export const trailingSlash = 'always';
