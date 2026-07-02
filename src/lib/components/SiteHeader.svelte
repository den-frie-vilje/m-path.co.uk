<!--
  Site header — M-Path's own chrome. Solid deep-violet bar (suits the white wordmark, high contrast),
  sticky, subtle elevation on scroll. Desktop: inline nav with aria-current + a CTA pill. Mobile: an
  accessible disclosure menu (button aria-expanded/controls, Escape to close, focus returns to the
  toggle). Works with JS off — the panel is a plain <nav> that's simply always reachable via the
  in-page anchor fallback; with JS it collapses behind the toggle.
-->
<script lang="ts">
  import { page } from '$app/state';
  import { site } from '$lib/content';
  import Icon from './Icon.svelte';

  let open = $state(false);
  let toggleEl: HTMLButtonElement | undefined = $state();
  let scrollY = $state(0);
  const scrolled = $derived(scrollY > 8);

  // Active when the path IS the link or a sub-path of it (with a `/` boundary), so '/schools' never
  // lights up for a hypothetical '/schools-extra'.
  const current = (href: string) => {
    const path = page.url.pathname;
    if (href === '/') return path === '/';
    return path === href || path.startsWith(href + '/');
  };

  function close() {
    open = false;
  }
  function onKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape' && open) {
      close();
      toggleEl?.focus();
    }
  }
</script>

<svelte:window on:keydown={onKeydown} bind:scrollY />

<header
  class="site-header sticky top-0 z-50 border-b border-white/10 backdrop-blur transition-shadow duration-300 supports-[backdrop-filter]:bg-violet-900/85 {scrolled
    ? 'bg-violet-900 shadow-[0_10px_30px_-14px_rgba(28,13,46,0.6)]'
    : 'bg-violet-900/95'}"
>
  <div class="container-page flex h-[68px] items-center justify-between gap-4">
    <a href="/" class="flex items-center gap-2" aria-label="{site.brand} — home" onclick={close}>
      <img
        src={site.logoWhite}
        alt="{site.brand} logo"
        class="h-11 w-auto"
        width="31"
        height="44"
      />
    </a>

    <!-- Desktop nav -->
    <nav aria-label="Primary" class="hidden items-center gap-1 navfull:flex">
      {#each site.nav as item (item.href)}
        <a
          href={item.href}
          aria-current={current(item.href) ? 'page' : undefined}
          class="rounded-full px-3.5 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10 hover:text-white aria-[current=page]:bg-white/12 aria-[current=page]:text-white"
        >
          {item.label}
        </a>
      {/each}
      <a href={site.cta.href} class="btn btn-on-violet ml-2 !px-4 !py-2 text-sm">
        {site.cta.label}
      </a>
    </nav>

    <!-- Mobile toggle -->
    <button
      bind:this={toggleEl}
      type="button"
      class="inline-flex h-11 w-11 items-center justify-center rounded-full text-white hover:bg-white/10 navfull:hidden"
      aria-expanded={open}
      aria-controls="mobile-menu"
      onclick={() => (open = !open)}
    >
      <span class="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      <Icon name={open ? 'x' : 'menu'} size={24} />
    </button>
  </div>

  <!-- Mobile panel — absolute overlay that SLIDES open (doesn't push page content down).
       Always in the DOM; `inert` when closed so its links stay out of the tab order. -->
  <nav
    id="mobile-menu"
    aria-label="Primary"
    inert={!open}
    class="menu-panel absolute left-0 right-0 top-full grid navfull:hidden {open ? 'is-open' : ''}"
  >
    <div class="overflow-hidden">
      <div class="border-t border-white/10 bg-violet-900 shadow-xl">
        <ul class="container-page flex flex-col gap-1 py-4">
          {#each site.nav as item (item.href)}
            <li>
              <a
                href={item.href}
                aria-current={current(item.href) ? 'page' : undefined}
                onclick={close}
                class="block rounded-xl px-4 py-3 text-base font-medium text-white/90 hover:bg-white/10 aria-[current=page]:bg-white/12 aria-[current=page]:text-white"
              >
                {item.label}
              </a>
            </li>
          {/each}
          <li class="pt-2">
            <a href={site.cta.href} onclick={close} class="btn btn-on-violet w-full">{site.cta.label}</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
