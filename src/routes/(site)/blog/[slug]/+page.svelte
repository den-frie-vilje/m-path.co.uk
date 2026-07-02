<script lang="ts">
  import { site, posts } from '$lib/content';
  import { buildSeo } from '$lib/seo';
  import { stripMarkdown } from '$lib/markdown';
  import { formatDate } from '$lib/util';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Section from '$lib/components/Section.svelte';
  import Prose from '$lib/components/Prose.svelte';
  import PostCard from '$lib/components/PostCard.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const post = $derived(data.post);

  const seo = $derived(
    buildSeo({
      seo: {
        title: `${post.title} | ${site.brand} blog`,
        description: stripMarkdown(post.excerpt, 180),
        image: post.cover ?? site.defaultSeo.image
      },
      path: `/blog/${post.slug}`,
      type: 'article',
      article: { publishedAt: post.date, author: post.author }
    })
  );

  const dateLabel = $derived(formatDate(post.date));
  const more = $derived(posts.filter((p) => p.slug !== post.slug).slice(0, 2));
</script>

<SeoHead {seo} />

<!-- Article header on the brand gradient -->
<header class="brand-gradient-soft text-white">
  <div class="container-page py-16 sm:py-20">
    <a
      href="/blog"
      class="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 transition hover:text-white"
    >
      <Icon name="arrow-right" size={16} class="rotate-180" /> All articles
    </a>
    <p class="mt-6 text-sm font-medium uppercase tracking-wider text-white/70">
      <time datetime={post.date}>{dateLabel}</time> · {post.author}
    </p>
    <h1 class="page-title t-display mt-3 max-w-3xl text-white">{post.title}</h1>
    {#if post.excerpt}
      <p class="page-lead mt-5 max-w-2xl text-lg leading-relaxed text-white/85">{post.excerpt}</p>
    {/if}
  </div>
</header>

{#if post.cover}
  <!-- Cover sits clearly BELOW the header with breathing room (was overlapping it by ~32px). -->
  <div class="bg-mist">
    <div class="container-page pt-12 sm:pt-16">
      <img
        src={post.cover}
        alt=""
        class="mx-auto aspect-[16/9] w-full max-w-3xl rounded-2xl object-cover shadow-xl"
        loading="eager"
      />
    </div>
  </div>
{/if}

<Section tone={post.cover ? 'mist' : 'paper'}>
  <article class="mx-auto max-w-2xl">
    <Prose md={post.body} />
  </article>
</Section>

{#if more.length}
  <Section tone="paper" heading="More from the blog" align="center">
    <ul class="grid gap-8 md:grid-cols-2">
      {#each more as p (p.slug)}
        <li><PostCard post={p} /></li>
      {/each}
    </ul>
  </Section>
{/if}
