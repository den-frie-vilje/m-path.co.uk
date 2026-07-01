<!--
  Programme steps as an accessible accordion built on native <details>/<summary> — keyboard-operable
  and screen-reader-friendly with zero JS, progressively enhanced. First item open by default.
  Body is markdown → <Prose>.
-->
<script lang="ts">
  import Prose from './Prose.svelte';
  import Icon from './Icon.svelte';
  import type { ProgrammeStep } from '$lib/content';
  let { steps }: { steps: ProgrammeStep[] } = $props();
</script>

<div class="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-2xl border border-line bg-paper-2">
  {#each steps as step, i (step.title)}
    <details class="group" open={i === 0}>
      <summary
        class="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-lg font-semibold text-ink transition hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden"
      >
        <span class="flex items-center gap-3">
          <span
            class="brand-gradient inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          >
            {i + 1}
          </span>
          {step.title}
        </span>
        <Icon
          name="chevron-down"
          size={20}
          class="shrink-0 text-violet-500 transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div class="px-6 pb-6 pl-[4.25rem]">
        <Prose md={step.body} class="!text-[16.5px]" />
      </div>
    </details>
  {/each}
</div>
