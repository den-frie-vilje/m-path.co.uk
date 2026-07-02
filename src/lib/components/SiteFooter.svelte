<!-- Site footer — deep violet, white wordmark, contact columns (schools / workplaces), nav, socials. -->
<script lang="ts">
  import { site } from '$lib/content';
  import Icon from './Icon.svelte';
  // Baked at build/prerender time — refreshes on every deploy, never goes stale by hand.
  const year = new Date().getFullYear();
</script>

<footer class="site-footer bg-violet-950 text-white/80">
  <div class="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
    <div class="max-w-sm">
      <img src={site.logoWhite} alt="{site.brand} logo" class="h-16 w-auto" width="45" height="64" />
      <p class="mt-5 text-sm leading-relaxed text-white/70">{site.footerBlurb}</p>
      <ul class="mt-6 flex gap-3">
        {#each site.socials as s (s.label)}
          <li>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-violet-500"
            >
              <span class="sr-only">{s.label}</span>
              <Icon name={s.icon} size={18} />
            </a>
          </li>
        {/each}
      </ul>
    </div>

    <nav aria-label="Footer">
      <h2 class="font-display text-sm font-semibold uppercase tracking-wider text-white/50">Explore</h2>
      <ul class="mt-4 space-y-2.5 text-sm">
        {#each site.footerNav as item (item.href)}
          <li>
            <a href={item.href} class="text-white/75 transition hover:text-white">{item.label}</a>
          </li>
        {/each}
      </ul>
    </nav>

    <div>
      <h2 class="font-display text-sm font-semibold uppercase tracking-wider text-white/50">Contact</h2>
      <ul class="mt-4 space-y-5 text-sm">
        {#each site.contacts as c (c.label)}
          <li>
            <p class="font-medium text-white">{c.label}</p>
            {#if c.phone}
              <a
                href={c.phoneHref}
                class="mt-1 flex items-center gap-2 text-white/75 transition hover:text-white"
              >
                <Icon name="phone" size={15} />{c.phone}
              </a>
            {/if}
            <a
              href="mailto:{c.email}"
              class="mt-1 flex items-center gap-2 text-white/75 transition hover:text-white"
            >
              <Icon name="mail" size={15} />{c.email}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>

  <div class="border-t border-white/10">
    <div
      class="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/50 sm:flex-row"
    >
      <p>© {year} {site.brand}. All rights reserved.</p>
      <p>Men's mental health &amp; masculinity programmes for schools and workplaces.</p>
    </div>
  </div>
</footer>
