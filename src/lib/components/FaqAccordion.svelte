<!--
  Objection-handling FAQ. Native <details>/<summary> — keyboard-operable, screen-reader-friendly,
  zero-JS. Answer is markdown → <Prose>. `dark` variant for plum/violet grounds.
-->
<script lang="ts">
  import Prose from './Prose.svelte';
  import Icon from './Icon.svelte';
  import type { Faq } from '$lib/content';
  let { items, dark = false }: { items: Faq[]; dark?: boolean } = $props();
</script>

<div
  class="mx-auto max-w-3xl divide-y overflow-hidden rounded-2xl border {dark
    ? 'divide-white/10 border-white/12 bg-white/[0.04]'
    : 'divide-line border-line bg-paper-2'}"
>
  {#each items as item (item.q)}
    <details class="group">
      <summary
        class="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-[17px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden {dark
          ? 'text-white hover:text-violet-300'
          : 'text-ink hover:text-violet-700'}"
      >
        {item.q}
        <Icon
          name="chevron-down"
          size={20}
          class="shrink-0 transition-transform duration-200 group-open:rotate-180 {dark
            ? 'text-violet-300'
            : 'text-violet-500'}"
        />
      </summary>
      <div class="px-6 pb-6">
        <Prose md={item.a} class="!text-[16px] {dark ? 'on-dark' : ''}" />
      </div>
    </details>
  {/each}
</div>
