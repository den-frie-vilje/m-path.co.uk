<!--
  Grid of icon cards (Challenge/Educate/Support, and the services list). Modern card: rounded, hairline
  border, gradient icon chip, hover lift (reduced-motion safe). Whole card is a link when `href` is set.
-->
<script lang="ts">
  import Icon from './Icon.svelte';
  import Prose from './Prose.svelte';
  import type { IconCard, Service } from '$lib/content';

  interface Props {
    items: (IconCard | Service)[];
    columns?: 2 | 3;
  }
  let { items, columns = 3 }: Props = $props();
  const cols = $derived(columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3');
</script>

<ul class="grid gap-6 {cols}">
  {#each items as item (item.title)}
    {@const href = 'href' in item && item.href ? item.href : undefined}
    <li class="h-full">
      <svelte:element
        this={href ? 'a' : 'div'}
        href={href}
        class="group flex h-full flex-col rounded-2xl border border-line bg-paper-2 p-7 transition duration-200 hover:-translate-y-1 hover:border-violet-400 hover:shadow-[0_18px_40px_-24px_rgba(162,48,217,0.55)] motion-reduce:hover:translate-y-0"
      >
        {#if item.icon}
          <span
            class="brand-gradient mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-sm"
          >
            <Icon name={item.icon} size={24} />
          </span>
        {/if}
        <h3 class="t-h3 text-ink group-hover:text-violet-700">{item.title}</h3>
        <div class="mt-2">
          <Prose md={item.body} class="!text-[16.5px] !leading-relaxed" />
        </div>
        {#if href}
          <span
            class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-violet-600 group-hover:text-violet-700"
          >
            Learn more <Icon name="arrow-right" size={16} />
          </span>
        {/if}
      </svelte:element>
    </li>
  {/each}
</ul>
