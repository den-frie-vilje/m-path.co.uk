<script lang="ts">
  import { schools, testimonials } from '$lib/content';
  import { buildSeo } from '$lib/seo';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import Prose from '$lib/components/Prose.svelte';
  import ProgrammeAccordion from '$lib/components/ProgrammeAccordion.svelte';
  import PhotoFeature from '$lib/components/PhotoFeature.svelte';
  import TestimonialCards from '$lib/components/TestimonialCards.svelte';
  import CtaBand from '$lib/components/CtaBand.svelte';

  const seo = buildSeo({ seo: schools.seo, path: '/schools' });
</script>

<SeoHead {seo} />

<Hero
  eyebrow={schools.hero.eyebrow}
  title={schools.hero.title}
  lead={schools.hero.lead}
  ctas={schools.hero.ctas}
/>

{#if schools.intro}
  <Section tone="paper">
    <PhotoFeature
      image={{ src: '/img/photos/mpath-workshop-3.jpg', alt: 'Students in an M-Path school workshop' }}
      eyebrow="For pupils of all genders"
      heading="Transformational when boys are met with understanding"
    >
      <Prose md={schools.intro.body} />
    </PhotoFeature>
  </Section>
{/if}

<Section tone="mist" eyebrow={schools.programme.eyebrow} heading={schools.programme.heading}>
  <ProgrammeAccordion steps={schools.programme.steps} />
  {#if schools.note}
    <div class="mx-auto mt-8 max-w-3xl rounded-2xl border border-line bg-paper-2 p-6">
      <Prose md={schools.note} class="!text-[15.5px]" />
    </div>
  {/if}
</Section>

<Section tone="lilac" eyebrow="What our clients say" heading="Transformational when boys are met with understanding">
  <TestimonialCards items={testimonials.slice(0, 3)} />
</Section>

<CtaBand heading={schools.cta.heading} body={schools.cta.body} ctas={schools.cta.ctas} />
