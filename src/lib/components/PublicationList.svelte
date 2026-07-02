<!-- Grouped external publication links (outlet → list of articles). -->
<script lang="ts">
  import Icon from './Icon.svelte';
  import type { PublicationGroup } from '$lib/content';
  let { groups }: { groups: PublicationGroup[] } = $props();
</script>

<div class="grid gap-8 md:grid-cols-3">
  {#each groups as group (group.outlet)}
    <div class="rounded-2xl border border-line bg-paper-2 p-6">
      {#if group.logo}
        <img
          src={group.logo}
          alt={group.outlet}
          class="h-9 w-auto max-w-[170px] object-contain"
          loading="lazy"
        />
      {:else}
        <h3 class="font-display text-lg font-semibold text-violet-700">{group.outlet}</h3>
      {/if}
      <ul class="mt-5 space-y-3">
        {#each group.links as link (link.href)}
          <li>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              class="group flex items-start gap-2 text-[15px] leading-snug text-ink transition hover:text-violet-700"
            >
              <Icon
                name="arrow-up-right"
                size={16}
                class="mt-0.5 shrink-0 text-violet-400 group-hover:text-violet-600"
              />
              <span class="underline-offset-2 group-hover:underline">{link.label}</span>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</div>
