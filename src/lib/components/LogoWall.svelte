<!-- Partner/organisation logo wall. Greyscale at rest, colour on hover/focus; accessible names. -->
<script lang="ts">
  import type { Partner } from '$lib/content';
  let { items }: { items: Partner[] } = $props();
</script>

<!-- Centred flex-wrap so any number of partners stays balanced (no ragged trailing grid row). -->
<ul class="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14">
  {#each items as p (p.name)}
    <li class="flex items-center justify-center">
      <svelte:element
        this={p.href ? 'a' : 'div'}
        href={p.href}
        target={p.href ? '_blank' : undefined}
        rel={p.href ? 'noopener noreferrer' : undefined}
        class="group inline-flex items-center justify-center rounded-lg p-2"
        aria-label={p.href ? `${p.name} (opens in a new tab)` : undefined}
      >
        <img
          src={p.logo}
          alt={p.name}
          loading="lazy"
          decoding="async"
          class="h-12 w-auto max-w-[140px] object-contain opacity-70 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0"
        />
      </svelte:element>
    </li>
  {/each}
</ul>
