<!--
  Page hero — the signature M-Path purple→magenta gradient wash with a soft radial glow and a
  subtle grain. White display heading + lead + CTAs. Optional portrait on the side (md+). a11y: the
  <h1> lives here; gradient contrast verified (white on the darkest stop = 8:1, lightest = 3.9:1 —
  large display text only sits over the lighter end).
-->
<script lang="ts">
  import Button from './Button.svelte';
  import Photo from './Photo.svelte';
  import type { CtaLink } from '$lib/content';

  interface Props {
    eyebrow?: string;
    title: string;
    /** ONE word/phrase in the title to emphasise with a heavy weight (strong 300→700 contrast). */
    highlight?: string;
    lead?: string;
    ctas?: CtaLink[];
    portrait?: { src: string; alt: string };
    /** Full-bleed background photograph with a brand-gradient scrim over it. */
    bg?: { src: string; alt?: string };
    compact?: boolean;
  }
  let { eyebrow, title, highlight, lead, ctas = [], portrait, bg, compact = false }: Props = $props();

  // Split the title around the highlighted word (first occurrence) for the weight-contrast emphasis.
  const parts = $derived.by(() => {
    if (!highlight || compact) return null;
    const i = title.toLowerCase().indexOf(highlight.toLowerCase());
    if (i < 0) return null;
    return { before: title.slice(0, i), word: title.slice(i, i + highlight.length), after: title.slice(i + highlight.length) };
  });
</script>

<section class="brand-gradient grain relative isolate overflow-hidden text-white">
  {#if bg}
    <!-- Background photo + gradient scrim: photo reads on the left/bottom, copy stays legible. -->
    <img
      src={bg.src}
      alt={bg.alt ?? ''}
      class="absolute inset-0 -z-10 h-full w-full object-cover object-center"
      fetchpriority="high"
    />
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 bg-gradient-to-br from-violet-950/92 via-violet-900/80 to-violet-700/60"
    ></div>
    <div
      aria-hidden="true"
      class="absolute inset-0 -z-10 mix-blend-multiply"
      style="background:linear-gradient(120deg,#4a1170cc,#a230d955 60%,#d03edf33)"
    ></div>
  {/if}
  <!-- decorative glows -->
  <div
    aria-hidden="true"
    class="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/15 blur-3xl"
  ></div>
  <div
    aria-hidden="true"
    class="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-magenta-500/40 blur-3xl"
  ></div>

  <div
    class="container-page relative grid items-center gap-10 {portrait
      ? 'md:grid-cols-[1.15fr_0.85fr]'
      : ''} {compact ? 'py-16 sm:py-20' : 'py-20 sm:py-28 lg:py-32'}"
  >
    <div class="max-w-2xl">
      {#if eyebrow}
        <p class="t-eyebrow !text-white/75">{eyebrow}</p>
      {/if}
      <h1 class="page-title {compact ? 't-display' : 't-hero'} mt-5 text-white">
        {#if parts}{parts.before}<span class="turn">{parts.word}</span>{parts.after}{:else}{title}{/if}
      </h1>
      {#if lead}
        <p class="page-lead mt-6 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">{lead}</p>
      {/if}
      {#if ctas.length}
        <div class="mt-8 flex flex-wrap gap-3">
          {#each ctas as cta, i (cta.href)}
            <Button
              href={cta.href}
              label={cta.label}
              variant={i === 0 ? 'on-violet' : 'ghost-on-violet'}
            />
          {/each}
        </div>
      {/if}
    </div>

    {#if portrait}
      <div class="relative mx-auto w-full max-w-sm md:max-w-none">
        <div
          class="overflow-hidden rounded-[2rem] border border-white/20 shadow-2xl ring-1 ring-white/10"
        >
          <Photo
            src={portrait.src}
            alt={portrait.alt}
            sizes="(min-width: 768px) 40vw, 90vw"
            loading="eager"
            fetchpriority="high"
            class="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
    {/if}
  </div>
</section>
