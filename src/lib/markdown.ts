/**
 * Markdown → HTML for CMS-authored prose.
 *
 * Trust boundary: strings passed here are authored by authenticated editors in the /admin CMS
 * and stored in Postgres. They are rendered with `{@html}`. Editors are trusted (first-party),
 * mirroring the chrishemmings sibling's treatment of its git-CMS content. Third-party HTML (were
 * any ever introduced, e.g. an external feed) must be sanitised at its own boundary with DOMPurify,
 * never assumed safe here.
 */
import { marked } from 'marked';

marked.use({
  gfm: true,
  // Clamp every heading into the [h2, h3] band so a body can never emit a second page-level <h1>
  // (the page/section heading owns the only <h1>).
  walkTokens(token) {
    if (token.type === 'heading') {
      token.depth = token.depth <= 2 ? 2 : 3;
    }
  },
  renderer: {
    link(token) {
      const text = this.parser.parseInline(token.tokens);
      const title = token.title ? ` title="${escapeAttr(token.title)}"` : '';
      const external = /^https?:\/\//i.test(token.href);
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${escapeAttr(token.href)}"${title}${attrs}>${text}</a>`;
    }
  }
});

/** Escape a string for safe interpolation into a double-quoted HTML attribute. */
function escapeAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Render a block-level markdown string to an HTML fragment. */
export function renderMarkdown(md: string | null | undefined): string {
  return marked.parse((md ?? '').trim(), { async: false });
}

/** Strip markdown to plain text — for meta descriptions / OG copy / excerpts. */
export function stripMarkdown(md: string | null | undefined, max = 200): string {
  const text = (md ?? '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^[\s]*[-*+]\s+/gm, '') // list markers (keep hyphens inside words)
    .replace(/[#>*_`~]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + '…' : text;
}
