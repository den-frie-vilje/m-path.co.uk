<!--
  Editorial image + copy split. Photo sits in a rounded frame with a gradient shape peeking behind
  it (distinctive brand device). `flip` puts the image on the right.
-->
<script lang="ts">
  import Photo from './Photo.svelte';
  import Button from './Button.svelte';
  import type { Snippet } from 'svelte';
  import type { CtaLink } from '$lib/content';

  interface Props {
    image: { src: string; alt: string };
    eyebrow?: string;
    heading: string;
    flip?: boolean;
    cta?: CtaLink;
    children: Snippet;
  }
  let { image, eyebrow, heading, flip = false, cta, children }: Props = $props();
</script>

<div class="container-page grid items-center gap-10 md:grid-cols-2 lg:gap-16">
  <div class={flip ? 'md:order-2' : ''}>
    <div class="relative">
      <div
        aria-hidden="true"
        class="brand-gradient absolute -inset-3 -z-10 rotate-2 rounded-[2rem] opacity-20"
      ></div>
      <Photo
        src={image.src}
        alt={image.alt}
        sizes="(min-width: 768px) 45vw, 90vw"
        class="aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-xl"
      />
    </div>
  </div>
  <div class={flip ? 'md:order-1' : ''}>
    {#if eyebrow}<p class="t-eyebrow">{eyebrow}</p>{/if}
    <h2 class="t-h2 mt-3 text-ink">{heading}</h2>
    <div class="mt-4 prose-warm">{@render children()}</div>
    {#if cta}
      <div class="mt-7"><Button href={cta.href} label={cta.label} variant="primary" /></div>
    {/if}
  </div>
</div>
