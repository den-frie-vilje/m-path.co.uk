<!-- Full-width CTA band on the brand gradient. Heading + body + buttons. -->
<script lang="ts">
  import Button from './Button.svelte';
  import type { CtaLink } from '$lib/content';
  interface Props {
    heading: string;
    body?: string;
    ctas: CtaLink[];
  }
  let { heading, body, ctas }: Props = $props();
</script>

<section class="brand-gradient relative isolate overflow-hidden text-white">
  <div
    aria-hidden="true"
    class="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl"
  ></div>
  <div class="container-page relative py-16 text-center sm:py-20">
    <h2 class="t-h2 mx-auto max-w-2xl text-white">{heading}</h2>
    {#if body}
      <p class="mx-auto mt-4 max-w-xl text-lg text-white/90">{body}</p>
    {/if}
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      {#each ctas as cta, i (cta.href)}
        <Button href={cta.href} label={cta.label} variant={i === 0 ? 'on-violet' : 'ghost-on-violet'} />
      {/each}
    </div>
  </div>
</section>
