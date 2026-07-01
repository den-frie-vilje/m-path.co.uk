<!-- Trust/credentials grid — grounded proof points for an institutional buyer. Works on light grounds. -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { Credential } from '$lib/content';
  let { items }: { items: Credential[] } = $props();
</script>

<ul class="mx-auto grid max-w-4xl gap-x-8 gap-y-5 sm:grid-cols-2">
  {#each items as c (c.label)}
    <li class="flex items-start gap-3">
      <span
        class="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600"
      >
        <Icon name={c.icon ?? 'check'} size={17} />
      </span>
      <span class="text-[15.5px] leading-snug text-ink">{c.label}</span>
    </li>
  {/each}
</ul>
