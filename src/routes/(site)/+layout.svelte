<!-- Public-site chrome: skip link + header + main landmark + footer. -->
<script lang="ts">
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  let { children } = $props();
</script>

<a
  href="#main"
  class="sr-only rounded-full bg-white px-4 py-2 font-medium text-violet-700 focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100]"
>
  Skip to content
</a>

<div class="flex min-h-dvh flex-col">
  <SiteHeader />
  <main id="main" tabindex="-1" class="flex-1 scroll-mt-20 focus:outline-none">
    {@render children()}
  </main>
  <SiteFooter />
</div>
