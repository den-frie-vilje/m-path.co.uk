<!--
  Audience fork — the home page's primary decision. Two large cards route the two distinct buyers
  (schools safeguarding/PSHE leads vs workplace HR/DE&I) to their journey. Distinct M-Path devices:
  the tilted badge-echo behind the icon and a gradient hover.
-->
<script lang="ts">
  import Icon from './Icon.svelte';
  import Prose from './Prose.svelte';
  import type { Audience } from '$lib/content';
  let { audiences }: { audiences: Audience[] } = $props();
</script>

<ul class="grid gap-6 md:grid-cols-2">
  {#each audiences as a (a.href)}
    <li>
      <a
        href={a.href}
        class="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-paper-2 p-8 transition duration-300 hover:-translate-y-1 hover:border-violet-400 hover:shadow-[0_28px_60px_-30px_rgba(162,48,217,0.6)] motion-reduce:hover:translate-y-0 sm:p-10"
      >
        <!-- decorative gradient wash that grows on hover -->
        <span
          aria-hidden="true"
          class="brand-gradient pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
        ></span>

        <div class="flex items-center gap-4">
          {#if a.icon}
            <span
              class="brand-gradient tilt inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-sm"
            >
              <Icon name={a.icon} size={28} />
            </span>
          {/if}
          <p class="t-eyebrow">{a.eyebrow}</p>
        </div>

        <h3 class="t-h3 mt-6 text-ink">{a.title}</h3>
        <div class="mt-3 flex-1"><Prose md={a.blurb} class="!text-[16px]" /></div>

        <span
          class="card-cta mt-6 inline-flex items-center gap-2 font-display text-sm font-semibold text-violet-600 group-hover:text-violet-700"
        >
          {a.cta}
          <Icon
            name="arrow-right"
            size={18}
            class="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0"
          />
        </span>
      </a>
    </li>
  {/each}
</ul>
