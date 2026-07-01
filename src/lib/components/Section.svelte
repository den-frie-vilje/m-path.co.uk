<!--
  Section wrapper: vertical rhythm + ground tone + an optional centered heading block.
  tone: 'paper' (white) | 'mist' (alt grey) | 'lilac' (faint violet) | 'violet' (dark, white text)
  | 'gradient' (brand purple→magenta, white text). The tone sets the text colour context so nested
  eyebrow/heading read correctly.
-->
<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    // paper (white) · sand (warm alt) · mist (cool lilac alt) · lilac (raised) ·
    // plum (flat deep gravitas) · violet (deep aubergine gradient) · gradient (energetic wash)
    tone?: 'paper' | 'sand' | 'mist' | 'lilac' | 'plum' | 'violet' | 'gradient';
    eyebrow?: string;
    heading?: string;
    lead?: string;
    align?: 'center' | 'left';
    id?: string;
    class?: string;
    children: Snippet;
  }
  let {
    tone = 'paper',
    eyebrow,
    heading,
    lead,
    align = 'center',
    id,
    class: klass = '',
    children
  }: Props = $props();

  const grounds: Record<string, string> = {
    paper: 'bg-paper text-ink',
    sand: 'bg-sand text-ink',
    mist: 'bg-mist text-ink',
    lilac: 'bg-paper-2 text-ink',
    plum: 'surface-plum grain text-white',
    violet: 'brand-gradient-soft grain text-white',
    gradient: 'brand-gradient grain text-white'
  };
  const onDark = $derived(tone === 'plum' || tone === 'violet' || tone === 'gradient');
</script>

<section {id} class="section-y relative isolate overflow-hidden {grounds[tone]} {klass}">
  <div class="container-page relative z-10">
    {#if eyebrow || heading || lead}
      <div class="{align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} mb-10 sm:mb-14">
        {#if eyebrow}
          <p class="t-eyebrow {onDark ? '!text-violet-300' : ''}">{eyebrow}</p>
        {/if}
        {#if heading}
          <h2 class="t-h2 mt-3 {onDark ? 'text-white' : 'text-ink'}">{heading}</h2>
        {/if}
        {#if lead}
          <p class="t-lead mt-4 {onDark ? '!text-white/80' : ''}">{lead}</p>
        {/if}
      </div>
    {/if}
    {@render children()}
  </div>
</section>
