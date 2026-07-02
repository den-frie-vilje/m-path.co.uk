<!--
  Public-site chrome: skip link + header + main landmark + footer.
  Plus a PRINT-ONLY letterhead (top of every printed document) and a beforeprint hook that expands
  all <details> so accordions print fully (CSS alone can't reliably force them open).
-->
<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { site } from '$lib/content';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  let { children } = $props();

  let printedDate = $state('');

  onMount(() => {
    const fmt = () =>
      new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    printedDate = fmt();
    const opened: HTMLDetailsElement[] = [];
    const onBefore = () => {
      printedDate = fmt();
      document.querySelectorAll<HTMLDetailsElement>('details:not([open])').forEach((d) => {
        opened.push(d);
        d.setAttribute('open', '');
      });
    };
    const onAfter = () => {
      opened.forEach((d) => d.removeAttribute('open'));
      opened.length = 0;
    };
    addEventListener('beforeprint', onBefore);
    addEventListener('afterprint', onAfter);
    return () => {
      removeEventListener('beforeprint', onBefore);
      removeEventListener('afterprint', onAfter);
    };
  });
</script>

<a
  href="#main"
  class="sr-only rounded-full bg-white px-4 py-2 font-medium text-violet-700 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
>
  Skip to content
</a>

<!-- Print-only letterhead — a hand-designed white-paper masthead at the top of the printed page. -->
<div class="print-letterhead" aria-hidden="true">
  <div class="pl-brand">
    <img src="/img/m-path-icon.png" alt="{site.brand} logo" class="pl-logo" />
    <div>
      <p class="pl-name">{site.brand}</p>
      <p class="pl-tagline">{site.tagline}</p>
    </div>
  </div>
  <div class="pl-meta">
    {#each site.contacts as c (c.label)}
      <p><span class="pl-label">{c.label}:</span> {c.email}{#if c.phone} · {c.phone}{/if}</p>
    {/each}
    <p class="pl-url">{page.url.href}{#if printedDate} · Printed {printedDate}{/if}</p>
  </div>
</div>

<div class="flex min-h-dvh flex-col">
  <SiteHeader />
  <main id="main" tabindex="-1" class="flex-1 scroll-mt-20 focus:outline-none">
    {@render children()}
  </main>
  <SiteFooter />
</div>
