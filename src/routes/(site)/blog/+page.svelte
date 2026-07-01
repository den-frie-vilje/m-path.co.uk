<script lang="ts">
  import { blog, posts } from '$lib/content';
  import { buildSeo } from '$lib/seo';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import PostCard from '$lib/components/PostCard.svelte';

  const seo = buildSeo({ seo: blog.seo, path: '/blog' });
</script>

<SeoHead {seo} />

<Hero title={blog.hero.title} lead={blog.hero.lead} compact />

<Section tone="paper">
  <ul class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {#each posts as post (post.slug)}
      <li><PostCard {post} /></li>
    {/each}
  </ul>
</Section>
