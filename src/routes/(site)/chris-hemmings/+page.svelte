<script lang="ts">
  import { chris, testimonials } from '$lib/content';
  import { buildSeo } from '$lib/seo';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import Prose from '$lib/components/Prose.svelte';
  import VideoEmbed from '$lib/components/VideoEmbed.svelte';
  import PublicationList from '$lib/components/PublicationList.svelte';
  import TestimonialCards from '$lib/components/TestimonialCards.svelte';
  import CtaBand from '$lib/components/CtaBand.svelte';

  const seo = buildSeo({ seo: chris.seo, path: '/chris-hemmings' });

  const press = [
    { name: 'The BBC', logo: '/img/logos/press/bbc-news.svg' },
    { name: 'The Independent', logo: '/img/logos/press/the-independent.svg' },
    { name: 'The Telegraph', logo: '/img/logos/press/the-telegraph.svg' },
    { name: 'The Guardian', logo: '/img/logos/press/the-guardian.svg' }
  ];
</script>

<SeoHead {seo} />

<Hero
  eyebrow={chris.hero.eyebrow}
  title={chris.hero.title}
  lead={chris.hero.lead}
  portrait={{ src: '/img/photos/chris-hemmings.jpg', alt: 'Chris Hemmings' }}
/>

<Section tone="paper">
  <div class="mx-auto max-w-3xl"><Prose md={chris.bio.body} /></div>
  <div class="mx-auto mt-12 max-w-3xl border-t border-line pt-8">
    <p class="text-center text-sm font-medium uppercase tracking-wider text-ink-soft">
      {chris.press.heading}
    </p>
    <ul class="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
      {#each press as p (p.name)}
        <li>
          <img
            src={p.logo}
            alt={p.name}
            class="h-6 w-auto max-w-[120px] object-contain opacity-60 grayscale sm:h-7"
            loading="lazy"
          />
        </li>
      {/each}
    </ul>
  </div>
</Section>

{#if chris.video}
  <Section
    tone="plum"
    eyebrow={chris.video.eyebrow}
    heading={chris.video.heading}
    lead={chris.video.blurb}
  >
    <div class="mx-auto max-w-3xl">
      <VideoEmbed id={chris.video.id} title={chris.video.title} />
    </div>
  </Section>
{/if}

<Section tone="mist" eyebrow="The book" heading={chris.book.heading}>
  <div class="mx-auto max-w-3xl">
    <p class="t-lead !text-ink">{chris.book.blurb}</p>
    <ul class="mt-8 grid gap-5 sm:grid-cols-3">
      {#each chris.book.reviews as r (r.by)}
        <li class="rounded-2xl border border-line bg-paper p-6">
          <blockquote class="text-[15px] leading-relaxed text-ink">{r.quote}</blockquote>
          <p class="mt-4 font-display font-semibold text-violet-700">{r.by}</p>
        </li>
      {/each}
    </ul>
  </div>
</Section>

<Section
  tone="paper"
  eyebrow="Selected writing"
  heading="As published by the BBC, Independent & Telegraph"
>
  <PublicationList groups={chris.publications} />
</Section>

<Section tone="lilac" eyebrow="Testimonials" heading="A dynamic and engaging speaker">
  <TestimonialCards items={testimonials} columns={2} />
</Section>

<CtaBand heading={chris.cta.heading} body={chris.cta.body} ctas={chris.cta.ctas} />
