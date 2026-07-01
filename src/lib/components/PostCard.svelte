<!-- Blog post preview card. Cover (or gradient placeholder) + title + excerpt + date. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import { stripMarkdown } from '$lib/markdown';
  import type { Post } from '$lib/content';
  let { post }: { post: Post } = $props();

  const dateLabel = $derived(
    new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
  );
</script>

<article
  class="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper-2 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(162,48,217,0.55)] motion-reduce:hover:translate-y-0"
>
  <a href="/blog/{post.slug}" class="flex h-full flex-col focus-visible:outline-none">
    <div class="aspect-[16/9] overflow-hidden">
      {#if post.cover}
        <img
          src={post.cover}
          alt=""
          loading="lazy"
          decoding="async"
          class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
      {:else}
        <div class="brand-gradient-soft flex h-full w-full items-center justify-center" aria-hidden="true">
          <Icon name="book-open" size={40} class="text-white/70" />
        </div>
      {/if}
    </div>
    <div class="flex flex-1 flex-col p-6">
      <time datetime={post.date} class="text-xs font-medium uppercase tracking-wider text-ink-soft">
        {dateLabel}
      </time>
      <h3
        class="mt-2 font-display text-xl font-semibold leading-snug text-ink group-hover:text-violet-700"
      >
        {post.title}
      </h3>
      <p class="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">
        {stripMarkdown(post.excerpt, 150)}
      </p>
      <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600">
        Read article <Icon name="arrow-right" size={16} />
      </span>
    </div>
  </a>
</article>
