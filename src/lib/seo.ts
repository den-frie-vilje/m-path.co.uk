/**
 * Builds the `<svelte:head>` SEO payload (title, meta, Open Graph, Twitter, JSON-LD) from a page's
 * `Seo` content + the shared site config. Pure data — rendered by <SeoHead>.
 */
import { site, type Seo } from '$lib/content';
import { stripMarkdown } from '$lib/markdown';

export interface HeadSeo {
  title: string;
  description: string;
  canonical: string;
  themeColor: string;
  og: {
    siteName: string;
    title: string;
    description: string;
    type: 'website' | 'article';
    url: string;
    image: string;
    imageAlt: string;
  };
  twitter: { card: 'summary_large_image'; title: string; description: string; image: string };
  jsonLd: string;
}

const THEME_COLOR = '#a230d9';

function abs(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return site.url.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`);
}

interface BuildOpts {
  seo: Seo;
  path: string; // route path, e.g. '/schools'
  type?: 'website' | 'article';
  article?: { publishedAt: string; author: string };
}

export function buildSeo({ seo, path, type = 'website', article }: BuildOpts): HeadSeo {
  const title = seo.title ?? `${site.brand} — ${site.tagline}`;
  const description = seo.description || site.defaultSeo.description;
  const canonical = abs(path === '/' ? '' : path);
  const image = abs(seo.image ?? site.defaultSeo.image ?? '/img/og/default.png');

  const graph: Record<string, unknown> =
    type === 'article' && article
      ? {
          '@type': 'Article',
          headline: title,
          description,
          image,
          datePublished: article.publishedAt,
          author: { '@type': 'Person', name: article.author },
          publisher: { '@type': 'Organization', name: site.brand },
          mainEntityOfPage: canonical
        }
      : {
          '@type': 'Organization',
          name: site.brand,
          url: site.url,
          description: site.tagline,
          logo: abs('/apple-touch-icon.png'),
          // General enquiries address (last contact = Workplaces/info@); fall back to the first
          // contact so trimming the list to one entry never drops the email.
          email: (site.contacts.at(-1) ?? site.contacts[0])?.email,
          founder: { '@type': 'Person', name: 'Chris Hemmings' }
        };

  return {
    title,
    description,
    canonical,
    themeColor: THEME_COLOR,
    og: {
      siteName: `${site.brand} | ${site.tagline}`,
      title,
      description,
      type,
      url: canonical,
      image,
      imageAlt: `${site.brand} — ${title}`
    },
    twitter: { card: 'summary_large_image', title, description, image },
    jsonLd: JSON.stringify({ '@context': 'https://schema.org', ...graph })
  };
}

/** FAQPage schema (rich-result eligible) from the page's FAQ items. Answers stripped to plain text. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: stripMarkdown(i.a, 500) }
    }))
  };
}

/** Person schema for the founder page. */
export function personJsonLd(opts: { name: string; description: string; image: string; path: string; sameAs?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: opts.name,
    jobTitle: 'Psychotherapist, speaker & founder',
    description: stripMarkdown(opts.description, 400),
    image: abs(opts.image),
    url: abs(opts.path),
    worksFor: { '@type': 'Organization', name: site.brand, url: site.url },
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {})
  };
}
