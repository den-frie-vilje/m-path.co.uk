/**
 * Open Graph image generator — pure TypeScript, no native image tooling.
 *
 * Renders one 1200×630 PNG per page into `static/img/og/<slug>.png` using satori (HTML/CSS → SVG) +
 * @resvg/resvg-js (SVG → PNG). Runs in `prebuild`, so it works identically locally and in the
 * Docker/CI build (pure JS + native resvg — no ImageMagick). Card copy is pulled from the page
 * content JSON, so cards refresh whenever an editor changes a title/description and the site rebuilds.
 *
 * Brand: the M-Path purple→magenta gradient with the white badge mark, Jost display + Montserrat body.
 */
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import satori from 'satori';
import { html } from 'satori-html';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p: string) => readFileSync(resolve(root, p));
const readJson = (p: string) => JSON.parse(read(p).toString('utf8'));

const site = readJson('src/content/site.json');
const pages: Record<string, { file: string; eyebrow: string }> = {
  home: { file: 'src/content/home.json', eyebrow: "Men's mental health & masculinity" },
  about: { file: 'src/content/about.json', eyebrow: 'About us' },
  schools: { file: 'src/content/schools.json', eyebrow: 'For schools & colleges' },
  workplaces: { file: 'src/content/workplaces.json', eyebrow: 'For workplaces' },
  'chris-hemmings': { file: 'src/content/chris-hemmings.json', eyebrow: 'Founder' },
  blog: { file: 'src/content/blog.json', eyebrow: 'Blog' },
  connect: { file: 'src/content/connect.json', eyebrow: 'Get in touch' }
};

const FONTS = [
  { name: 'Montserrat', weight: 400 as const, file: 'montserrat/files/montserrat-latin-400-normal.woff' },
  { name: 'Montserrat', weight: 500 as const, file: 'montserrat/files/montserrat-latin-500-normal.woff' },
  { name: 'Jost', weight: 600 as const, file: 'jost/files/jost-latin-600-normal.woff' },
  { name: 'Jost', weight: 700 as const, file: 'jost/files/jost-latin-700-normal.woff' }
].map((f) => ({
  name: f.name,
  weight: f.weight,
  style: 'normal' as const,
  data: read(`node_modules/@fontsource/${f.file}`)
}));

function dataUri(publicPath: string): string {
  const rel = publicPath.replace(/^\//, 'static/');
  const ext = rel.split('.').pop()!.toLowerCase();
  const mime = ext === 'png' ? 'image/png' : ext === 'svg' ? 'image/svg+xml' : 'image/jpeg';
  return `data:${mime};base64,${read(rel).toString('base64')}`;
}
const badge = dataUri(site.logoWhite);

const NBSP = String.fromCharCode(160);
function noOrphans(text: string): string {
  const words = text.trim().split(' ');
  if (words.length < 2) return text;
  const last = words.pop();
  return `${words.join(' ')}${NBSP}${last}`;
}

interface Card {
  slug: string;
  eyebrow: string;
  title: string;
  subtitle: string;
}

function markup(card: Card): string {
  // No URL/CTA chip: an OG card is itself always presented as a link when shared, so a "m-path.co.uk"
  // button is redundant — and dropping it frees the vertical space that cramped a 3-line lead. Header
  // pinned to the top; the eyebrow/title/lead block is vertically centred in the remaining space, so
  // it stays balanced whether the lead runs one line or three.
  return `
  <div style="display:flex;flex-direction:column;width:1200px;height:630px;padding:70px;background:linear-gradient(130deg,#4a1170 0%,#a230d9 55%,#d03edf 100%);font-family:'Montserrat';">
    <div style="display:flex;align-items:center;">
      <img src="${badge}" width="70" height="99" style="width:70px;height:99px;" />
      <span style="color:#ffffff;font-family:'Jost';font-size:30px;font-weight:600;margin-left:22px;letter-spacing:0.5px;">${site.brand}</span>
    </div>
    <div style="display:flex;flex-direction:column;flex:1;justify-content:center;">
      <div style="color:#ffd6f6;font-size:24px;font-weight:500;letter-spacing:4px;text-transform:uppercase;">${card.eyebrow}</div>
      <div style="color:#ffffff;font-family:'Jost';font-size:74px;font-weight:700;letter-spacing:-1.5px;line-height:1.03;margin-top:20px;">${noOrphans(card.title)}</div>
      <div style="color:#f4e9fb;font-size:30px;font-weight:400;line-height:1.3;margin-top:24px;max-width:960px;">${noOrphans(card.subtitle)}</div>
    </div>
  </div>`;
}

function truncate(s: string, n: number): string {
  const t = (s ?? '').replace(/\s+/g, ' ').trim();
  return t.length > n ? t.slice(0, n - 1).trimEnd() + '…' : t;
}

async function renderCard(card: Card): Promise<void> {
  const svg = await satori(html(markup(card)) as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: FONTS
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
  writeFileSync(resolve(root, `static/img/og/${card.slug}.png`), png);
  console.log(`og: wrote static/img/og/${card.slug}.png (${(png.length / 1024).toFixed(1)} KB)`);
}

mkdirSync(resolve(root, 'static/img/og'), { recursive: true });

// Per-page cards.
for (const [slug, { file, eyebrow }] of Object.entries(pages)) {
  const c = readJson(file);
  const title = c.hero?.title ?? site.brand;
  const subtitle = truncate(c.hero?.lead ?? c.seo?.description ?? site.tagline, 130);
  await renderCard({ slug, eyebrow, title, subtitle });
}

// Default fallback card.
await renderCard({
  slug: 'default',
  eyebrow: "Men's mental health & masculinity",
  title: 'Engaging men in cultural change',
  subtitle: truncate(site.defaultSeo.description, 130)
});
