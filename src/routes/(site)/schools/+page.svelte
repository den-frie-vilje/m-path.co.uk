<script lang="ts">
  import { schools, testimonialsFor } from '$lib/content';
  import { buildSeo } from '$lib/seo';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import Prose from '$lib/components/Prose.svelte';
  import CredentialStrip from '$lib/components/CredentialStrip.svelte';
  import ProgrammeAccordion from '$lib/components/ProgrammeAccordion.svelte';
  import VideoEmbed from '$lib/components/VideoEmbed.svelte';
  import ProcessTimeline from '$lib/components/ProcessTimeline.svelte';
  import FaqAccordion from '$lib/components/FaqAccordion.svelte';
  import PhotoFeature from '$lib/components/PhotoFeature.svelte';
  import TestimonialCards from '$lib/components/TestimonialCards.svelte';
  import CtaBand from '$lib/components/CtaBand.svelte';

  const seo = buildSeo({ seo: schools.seo, path: '/schools' });
  const quotes = testimonialsFor('schools');
</script>

<SeoHead {seo} />

<Hero
  eyebrow={schools.hero.eyebrow}
  title={schools.hero.title}
  highlight={schools.hero.highlight}
  lead={schools.hero.lead}
  ctas={schools.hero.ctas}
/>

{#if schools.credentials}
  <Section tone="paper" heading={schools.credentials.heading}>
    <CredentialStrip items={schools.credentials.items} />
  </Section>
{/if}

{#if schools.intro}
  <Section tone="lilac">
    <PhotoFeature
      image={{ src: '/img/photos/mpath-workshop-3.jpg', alt: 'Students in an M-Path school workshop' }}
      eyebrow="For pupils of all genders"
      heading="Transformational when boys are met with understanding"
    >
      <Prose md={schools.intro.body} />
    </PhotoFeature>
  </Section>
{/if}

<Section tone="sand" eyebrow={schools.programme.eyebrow} heading={schools.programme.heading}>
  <ProgrammeAccordion steps={schools.programme.steps} />
</Section>

{#if schools.videos}
  <Section
    tone="paper"
    eyebrow={schools.videos.eyebrow}
    heading={schools.videos.heading}
    lead={schools.videos.lead}
  >
    <div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
      {#each schools.videos.items as v (v.id)}
        <VideoEmbed id={v.id} title={v.title} />
      {/each}
    </div>
  </Section>
{/if}

{#if schools.process}
  <Section tone="plum" eyebrow={schools.process.eyebrow} heading={schools.process.heading}>
    <ProcessTimeline steps={schools.process.steps} dark />
  </Section>
{/if}

{#if schools.faq}
  <Section tone="paper" heading={schools.faq.heading}>
    <FaqAccordion items={schools.faq.items} />
  </Section>
{/if}

<Section tone="lilac" eyebrow="What people say" heading="A dynamic, engaging speaker for schools">
  <TestimonialCards items={quotes} columns={quotes.length > 1 ? 3 : 2} />
  {#if schools.note}
    <div class="mx-auto mt-8 max-w-3xl rounded-2xl border border-line bg-paper-2 p-6">
      <Prose md={schools.note} class="!text-[15.5px]" />
    </div>
  {/if}
</Section>

<CtaBand heading={schools.cta.heading} body={schools.cta.body} ctas={schools.cta.ctas} />
