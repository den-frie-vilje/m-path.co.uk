<script lang="ts">
  import { workplaces, partners, testimonialsFor } from '$lib/content';
  import { buildSeo, faqJsonLd } from '$lib/seo';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import JsonLd from '$lib/components/JsonLd.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import Prose from '$lib/components/Prose.svelte';
  import CredentialStrip from '$lib/components/CredentialStrip.svelte';
  import ProgrammeAccordion from '$lib/components/ProgrammeAccordion.svelte';
  import ProcessTimeline from '$lib/components/ProcessTimeline.svelte';
  import FaqAccordion from '$lib/components/FaqAccordion.svelte';
  import PhotoFeature from '$lib/components/PhotoFeature.svelte';
  import LogoWall from '$lib/components/LogoWall.svelte';
  import TestimonialCards from '$lib/components/TestimonialCards.svelte';
  import CtaBand from '$lib/components/CtaBand.svelte';

  const seo = buildSeo({ seo: workplaces.seo, path: '/workplaces' });
  const quotes = testimonialsFor('workplace');
</script>

<SeoHead {seo} />
{#if workplaces.faq}<JsonLd data={faqJsonLd(workplaces.faq.items)} />{/if}

<Hero
  eyebrow={workplaces.hero.eyebrow}
  title={workplaces.hero.title}
  highlight={workplaces.hero.highlight}
  lead={workplaces.hero.lead}
  ctas={workplaces.hero.ctas}
/>

{#if workplaces.credentials}
  <Section tone="paper" heading={workplaces.credentials.heading}>
    <CredentialStrip items={workplaces.credentials.items} />
  </Section>
{/if}

{#if workplaces.intro}
  <Section tone="lilac">
    <PhotoFeature
      image={{ src: '/img/photos/chris-nike.png', alt: 'Chris Hemmings speaking at a corporate event' }}
      eyebrow="Through a DE&I lens"
      heading="Targeted support for men benefits the whole workplace"
      flip
    >
      <Prose md={workplaces.intro.body} />
    </PhotoFeature>
  </Section>
{/if}

<Section tone="sand" eyebrow={workplaces.programme.eyebrow} heading={workplaces.programme.heading}>
  <ProgrammeAccordion steps={workplaces.programme.steps} />
</Section>

<Section tone="paper" heading="Organisations we've worked with">
  <LogoWall items={partners} />
</Section>

{#if workplaces.process}
  <Section tone="plum" eyebrow={workplaces.process.eyebrow} heading={workplaces.process.heading}>
    <ProcessTimeline steps={workplaces.process.steps} dark />
  </Section>
{/if}

{#if workplaces.faq}
  <Section tone="paper" heading={workplaces.faq.heading}>
    <FaqAccordion items={workplaces.faq.items} />
  </Section>
{/if}

<Section tone="lilac" eyebrow="Client feedback" heading="Insightful, honest and engaging">
  <TestimonialCards items={quotes} />
  {#if workplaces.note}
    <div class="mx-auto mt-8 max-w-3xl rounded-2xl border border-line bg-paper-2 p-6">
      <Prose md={workplaces.note} class="!text-[15.5px]" />
    </div>
  {/if}
</Section>

<CtaBand heading={workplaces.cta.heading} body={workplaces.cta.body} ctas={workplaces.cta.ctas} />
