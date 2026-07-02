<script lang="ts">
  import { connect, site } from '$lib/content';
  import { buildSeo } from '$lib/seo';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import Button from '$lib/components/Button.svelte';
  import Icon from '$lib/components/Icon.svelte';

  const seo = buildSeo({ seo: connect.seo, path: '/connect' });
</script>

<SeoHead {seo} />

<Hero eyebrow={connect.hero.eyebrow} title={connect.hero.title} lead={connect.hero.lead} compact />

<Section tone="paper">
  <div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
    {#each connect.columns as col (col.heading)}
      <div class="rounded-2xl border border-line bg-paper-2 p-8">
        <h2 class="font-display text-xl font-semibold text-violet-700">{col.heading}</h2>
        <ul class="mt-5 space-y-4 text-[15px]">
          {#if col.phone}
            <li>
              <a
                href={col.phoneHref}
                class="flex items-center gap-3 text-ink transition hover:text-violet-700"
              >
                <span class="brand-gradient inline-flex h-10 w-10 items-center justify-center rounded-full text-white">
                  <Icon name="phone" size={18} />
                </span>
                {col.phone}
              </a>
            </li>
          {/if}
          <li>
            <a
              href="mailto:{col.email}"
              class="flex items-center gap-3 text-ink transition hover:text-violet-700"
            >
              <span class="brand-gradient inline-flex h-10 w-10 items-center justify-center rounded-full text-white">
                <Icon name="mail" size={18} />
              </span>
              {col.email}
            </a>
          </li>
        </ul>
      </div>
    {/each}
  </div>

  <div class="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
    {#each connect.links as link, i (link.href)}
      <Button href={link.href} label={link.label} variant={i === 0 ? 'primary' : 'outline'} />
    {/each}
  </div>

  <div class="mt-10 flex justify-center gap-3">
    {#each site.socials as s (s.label)}
      <a
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-violet-600 transition hover:bg-violet-500 hover:text-white"
      >
        <span class="sr-only">{s.label}</span>
        <Icon name={s.icon} size={18} />
      </a>
    {/each}
  </div>
</Section>
