<!--
  "How it works" — a vertical PATH. On scroll-into-view the rail draws in downward (scaleY from the
  top) while the numbered nodes appear in sequence along it. Progressive + a11y: the animated hidden
  state is added by JS only (content is fully visible with no JS and under prefers-reduced-motion),
  and only animates if the timeline starts below the fold (no flash). Semantic ordered list.
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import Prose from './Prose.svelte';
  import type { ProcessStep } from '$lib/content';
  let { steps, dark = false }: { steps: ProcessStep[]; dark?: boolean } = $props();

  let ol: HTMLOListElement;

  onMount(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const r = ol.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // already in view → no animation
    ol.classList.add('tl-anim'); // enable the hidden pre-animation state
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            ol.classList.add('tl-drawn');
            io.disconnect();
          }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(ol);
  });
</script>

<ol bind:this={ol} class="relative mx-auto max-w-2xl">
  <!-- the path rail (decorative) — only when there's an actual sequence to thread. -->
  {#if steps.length > 1}
    <span
      aria-hidden="true"
      class="tl-rail absolute bottom-4 left-[1.375rem] top-4 w-0.5 rounded bg-gradient-to-b from-violet-500 via-violet-400/50 to-violet-300/70"
    ></span>
  {/if}

  {#each steps as step, i (step.title)}
    <li class="tl-node-row relative flex gap-5 pb-9 last:pb-0" style="--tl-d:{i * 0.14}s">
      <span
        class="brand-gradient relative z-10 inline-flex h-11 w-11 shrink-0 rotate-2 items-center justify-center rounded-xl font-display text-base font-bold text-white shadow-sm"
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
