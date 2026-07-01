<!--
  Renders a page's <svelte:head> SEO payload. Pure rendering — the HeadSeo shape is built by
  `$lib/seo` (buildSeo).
-->
<script lang="ts">
  import type { HeadSeo } from '$lib/seo';
  let { seo }: { seo: HeadSeo } = $props();
</script>

<svelte:head>
  <title>{seo.title}</title>
  <meta name="description" content={seo.description} />
  <meta name="theme-color" content={seo.themeColor} />
  <link rel="canonical" href={seo.canonical} />

  <meta property="og:site_name" content={seo.og.siteName} />
  <meta property="og:title" content={seo.og.title} />
  <meta property="og:description" content={seo.og.description} />
  <meta property="og:type" content={seo.og.type} />
  <meta property="og:url" content={seo.og.url} />
  <meta property="og:image" content={seo.og.image} />
  <meta property="og:image:alt" content={seo.og.imageAlt} />

  <meta name="twitter:card" content={seo.twitter.card} />
  <meta name="twitter:title" content={seo.twitter.title} />
  <meta name="twitter:description" content={seo.twitter.description} />
  <meta name="twitter:image" content={seo.twitter.image} />

  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html `<script type="application/ld+json">${seo.jsonLd}<\/script>`}
</svelte:head>
