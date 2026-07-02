/**
 * Content access layer.
 *
 * All site copy lives in `src/content/*.json` and is imported here at build time (single-locale,
 * English; the site is fully prerendered). Prose fields are **markdown strings** (rendered via
 * `$lib/markdown`), not arrays of bullets — structured arrays are reserved for genuine lists (nav,
 * services, facilitators, logos, links). Components never import the JSON directly; they go through
 * the typed accessors below. Editable via Sveltia (`static/admin/config.yml`).
 */
import siteData from '../../content/site.json';
import homeData from '../../content/home.json';
import aboutData from '../../content/about.json';
import schoolsData from '../../content/schools.json';
import workplacesData from '../../content/workplaces.json';
import connectData from '../../content/connect.json';
import chrisData from '../../content/chris-hemmings.json';
import blogData from '../../content/blog.json';
import postsData from '../../content/posts.json';
import testimonialsData from '../../content/testimonials.json';
import partnersData from '../../content/partners.json';

// ── shared shapes ────────────────────────────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
}

export interface CtaLink {
  label: string;
  href: string;
}

export interface IconCard {
  /** lucide-ish key resolved by <Icon>; falls back to a dot. */
  icon?: string;
  title: string;
  /** markdown */
  body: string;
}

export interface Service {
  title: string;
  /** markdown */
  body: string;
  icon?: string;
  href?: string;
}

export interface ProgrammeStep {
  title: string;
  /** markdown */
  body: string;
}

export interface Facilitator {
  name: string;
  role: string;
  /** markdown */
  bio: string;
  photo?: string; // static path under /img/photos or a plain /img path
  links?: CtaLink[];
}

export interface Testimonial {
  /** markdown */
  quote: string;
  author?: string;
  org?: string;
  href?: string;
  /** audience filter: 'workplace' | 'general' (speaking/education-relevant). */
  tag?: 'workplace' | 'general';
}

export interface Credential {
  icon?: string;
  label: string;
}

export interface Faq {
  q: string;
  /** markdown */
  a: string;
}

export interface ProcessStep {
  title: string;
  /** markdown */
  body: string;
}

export interface VideoRef {
  /** YouTube id */
  id: string;
  title: string;
}

export interface Partner {
  name: string;
  logo: string; // /img/logos/*
  href?: string;
  kind?: 'school' | 'organisation' | 'press';
}

export interface PublicationGroup {
  outlet: string;
  logo?: string; // /img/logos/press/*
  links: CtaLink[];
}

export interface Post {
  slug: string;
  title: string;
  /** markdown */
  excerpt: string;
  /** markdown (full article) */
  body: string;
  cover?: string;
  author: string;
  date: string; // ISO
}

export interface Seo {
  title?: string;
  description: string;
  image?: string; // absolute or /img path
}

// ── site (shared) ────────────────────────────────────────────────────────────────────────────────
export interface SiteContent {
  brand: string;
  tagline: string;
  url: string;
  logo: string;
  logoWhite: string;
  nav: NavItem[];
  footerNav: NavItem[];
  cta: CtaLink;
  contacts: {
    label: string;
    phone?: string;
    phoneHref?: string;
    email: string;
  }[];
  socials: { label: string; icon: string; href: string }[];
  footerBlurb: string; // markdown
  defaultSeo: Seo;
}

// ── page shapes ──────────────────────────────────────────────────────────────────────────────────
export interface Stat {
  value: string;
  label: string;
}

export interface Audience {
  icon?: string;
  eyebrow: string;
  title: string;
  /** markdown */
  blurb: string;
  cta: string;
  href: string;
}

export interface HomeContent {
  seo: Seo;
  hero: { eyebrow?: string; title: string; highlight?: string; lead: string; ctas: CtaLink[]; bg?: string };
  stats: Stat[];
  audiences: Audience[];
  intro: { eyebrow: string; heading: string; lead: string; cards: IconCard[] };
  services: { eyebrow: string; heading: string; lead?: string; items: Service[] };
  cta: { heading: string; body: string; ctas: CtaLink[] };
}

export interface AboutContent {
  seo: Seo;
  hero: { eyebrow?: string; title: string; lead: string };
  mission: { body: string }; // markdown
  founder: { heading: string; body: string; cta: CtaLink };
  facilitators: { heading: string; lead?: string; people: Facilitator[] };
  media?: { eyebrow?: string; heading: string; lead?: string; video: VideoRef };
  cta: { heading: string; body: string; ctas: CtaLink[] };
}

export interface ProgrammePageContent {
  seo: Seo;
  hero: { eyebrow?: string; title: string; highlight?: string; lead: string; ctas?: CtaLink[]; contactEmail?: string };
  intro?: { body: string };
  credentials?: { heading: string; items: Credential[] };
  programme: { eyebrow: string; heading: string; steps: ProgrammeStep[] };
  videos?: { eyebrow?: string; heading: string; lead?: string; items: VideoRef[] };
  process?: { eyebrow: string; heading: string; steps: ProcessStep[] };
  faq?: { heading: string; items: Faq[] };
  note?: string; // markdown (e.g. "prices on request")
  cta: { heading: string; body: string; ctas: CtaLink[] };
}

export interface ConnectContent {
  seo: Seo;
  hero: { title: string; lead: string };
  columns: { heading: string; phone?: string; phoneHref?: string; email: string }[];
  links: CtaLink[];
}

export interface ChrisContent {
  seo: Seo;
  hero: { eyebrow?: string; title: string; lead: string };
  bio: { body: string };
  video?: { eyebrow?: string; heading: string; blurb?: string; id: string; title: string };
  press: { heading: string; outlets: string[] };
  book: { heading: string; blurb: string; reviews: { by: string; quote: string }[] };
  publications: PublicationGroup[];
  cta: { heading: string; body: string; ctas: CtaLink[] };
}

export interface BlogContent {
  seo: Seo;
  hero: { title: string; lead: string };
}

// ── typed accessors ──────────────────────────────────────────────────────────────────────────────
export const site = siteData as SiteContent;
export const home = homeData as HomeContent;
export const about = aboutData as AboutContent;
export const schools = schoolsData as ProgrammePageContent;
export const workplaces = workplacesData as ProgrammePageContent;
export const connect = connectData as ConnectContent;
export const chris = chrisData as ChrisContent;
export const blog = blogData as BlogContent;
// testimonials/partners/posts are stored as `{ items: [...] }` (object root) so the Sveltia file
// collections round-trip cleanly; the site consumes the arrays.
export const posts = (postsData as { items: Post[] }).items;
export const testimonials = (testimonialsData as { items: Testimonial[] }).items;
export const partners = (partnersData as { items: Partner[] }).items;

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

/** Testimonials for an audience: 'general' items always show; 'workplace' only on workplace surfaces. */
export function testimonialsFor(audience: 'schools' | 'workplace'): Testimonial[] {
  return testimonials.filter((t) =>
    audience === 'workplace' ? true : t.tag !== 'workplace'
  );
}
