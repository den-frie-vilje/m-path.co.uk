/** Small shared helpers used across components. */

/** Is this href off-site? (absolute http(s) or protocol-relative). Single source of truth so
 *  every component classifies internal vs external links the same way. */
export function isExternal(href: string): boolean {
  return /^(https?:)?\/\//i.test(href);
}

/** Format an ISO date as e.g. "24 October 2023" (en-GB). Falls back to the raw string if unparseable. */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** ISO YYYY-MM-DD for sitemap <lastmod>, or undefined if the date isn't parseable. */
export function isoDate(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString().slice(0, 10);
}
