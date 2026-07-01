<!--
  "How it works" — a vertical PATH: numbered, tilted journey nodes threaded by a rail that runs
  violet → cyan (disengagement → hope). Semantic ordered list. `dark` variant for plum grounds.
-->
<script lang="ts">
  import Prose from './Prose.svelte';
  import type { ProcessStep } from '$lib/content';
  let { steps, dark = false }: { steps: ProcessStep[]; dark?: boolean } = $props();
</script>

<ol class="relative mx-auto max-w-2xl">
  <!-- the path rail (decorative) -->
  <span
    aria-hidden="true"
    class="absolute bottom-4 left-[1.375rem] top-4 w-0.5 rounded bg-gradient-to-b from-violet-500 via-violet-400/50 to-violet-300/70"
  ></span>

  {#each steps as step, i (step.title)}
    <li class="relative flex gap-5 pb-9 last:pb-0">
      <span
        class="brand-gradient relative z-10 inline-flex h-11 w-11 shrink-0 rotate-2 items-center justify-center rounded-xl font-display text-base font-bold text-white shadow-sm {i ===
        steps.length - 1
          ? 'ring-2 ring-white/40 ring-offset-2'
          : ''} {dark ? 'ring-offset-plum-950' : 'ring-offset-paper'}"
      >
        {i + 1}
      </span>
      <div class="pt-1.5">
        <h3 class="font-display text-lg font-semibold {dark ? 'text-white' : 'text-ink'}">{step.title}</h3>
        <Prose md={step.body} class="mt-1 !text-[15.5px] {dark ? 'on-dark' : ''}" />
      </div>
    </li>
  {/each}
</ol>
