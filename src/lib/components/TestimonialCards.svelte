<!-- Testimonial quote cards with attribution + optional org link. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import { renderMarkdown } from '$lib/markdown';
  import type { Testimonial } from '$lib/content';
  let { items, columns = 3 }: { items: Testimonial[]; columns?: 2 | 3 } = $props();
  const cols = $derived(columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3');
</script>

<ul class="grid gap-6 {cols}">
  {#each items as t, i (i)}
    <li class="flex h-full flex-col rounded-2xl border border-line bg-paper-2 p-7">
      <Icon name="quote" size={28} class="text-violet-400" />
      <blockquote class="prose-warm mt-4 flex-1 !text-[17px] !leading-relaxed">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
        {@html renderMarkdown(t.quote)}
      </blockquote>
      {#if t.author || t.org}
        <footer class="mt-6 border-t border-line pt-4 text-sm">
          {#if t.author}<p class="font-semibold text-ink">{t.author}</p>{/if}
          {#if t.org}
            {#if t.href}
              <a
                href={t.href}
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 font-medium text-violet-600 hover:text-violet-700"
              >
                {t.org}<Icon name="external-link" size={13} />
              </a>
            {:else}
              <p class="text-ink-soft">{t.org}</p>
            {/if}
          {/if}
        </footer>
      {/if}
    </li>
  {/each}
</ul>
