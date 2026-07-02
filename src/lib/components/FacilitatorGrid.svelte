<!-- Facilitator/team grid. Portrait (Photo, or a monogram fallback) + name + role + markdown bio. -->
<script lang="ts">
  import Photo from './Photo.svelte';
  import Prose from './Prose.svelte';
  import { isExternal } from '$lib/util';
  import type { Facilitator } from '$lib/content';
  let { people }: { people: Facilitator[] } = $props();

  const initials = (name: string) =>
    name
      .split(/\s+/)
      .map((n) => n[0])
      .slice(0, 2)
      .join('');
</script>

<!-- 2-col only from lg (each card is a wide photo+text row — 2-up any earlier gets cramped). -->
<ul class="grid gap-8 lg:grid-cols-2">
  {#each people as p (p.name)}
    <li class="flex flex-col gap-5 rounded-2xl border border-line bg-paper-2 p-7 sm:flex-row">
      <div class="shrink-0">
        {#if p.photo}
          <Photo
            src={p.photo}
            alt="{p.name}, {p.role}"
            sizes="112px"
            class="h-28 w-28 rounded-2xl object-cover"
          />
        {:else}
          <div
            class="brand-gradient-soft flex h-28 w-28 items-center justify-center rounded-2xl font-display text-2xl font-semibold text-white"
            aria-hidden="true"
          >
            {initials(p.name)}
          </div>
        {/if}
      </div>
      <div class="min-w-0">
        <h3 class="font-display text-xl font-semibold text-ink">{p.name}</h3>
        <p class="t-eyebrow mt-1 !normal-case !tracking-normal !text-violet-600">{p.role}</p>
        <Prose md={p.bio} class="mt-3 !text-[15.5px] !leading-relaxed" />
        {#if p.links}
          <div class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {#each p.links as l (l.href)}
              <a
                href={l.href}
                class="font-medium text-violet-600 underline-offset-2 hover:underline"
                target={isExternal(l.href) ? '_blank' : undefined}
                rel={isExternal(l.href) ? 'noopener noreferrer' : undefined}>{l.label}</a
              >
            {/each}
          </div>
        {/if}
      </div>
    </li>
  {/each}
</ul>
