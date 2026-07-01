<script lang="ts">
  import { workplaces, partners, testimonials } from '$lib/content';
  import { buildSeo } from '$lib/seo';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import Prose from '$lib/components/Prose.svelte';
  import ProgrammeAccordion from '$lib/components/ProgrammeAccordion.svelte';
  import PhotoFeature from '$lib/components/PhotoFeature.svelte';
  import LogoWall from '$lib/components/LogoWall.svelte';
  import TestimonialCards from '$lib/components/TestimonialCards.svelte';
  import CtaBand from '$lib/components/CtaBand.svelte';

  const seo = buildSeo({ seo: workplaces.seo, path: '/workplaces' });
</script>

<SeoHead {seo} />

<Hero
  eyebrow={workplaces.hero.eyebrow}
  title={workplaces.hero.title}
  lead={workplaces.hero.lead}
  ctas={workplaces.hero.ctas}
/>

{#if workplaces.intro}
  <Section tone="paper">
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

<Section tone="mist" eyebrow={workplaces.programme.eyebrow} heading={workplaces.programme.heading}>
  <ProgrammeAccordion steps={workplaces.programme.steps} />
  {#if workplaces.note}
    <div class="mx-auto mt-8 max-w-3xl rounded-2xl border border-line bg-paper-2 p-6">
      <Prose md={workplaces.note} class="!text-[15.5px]" />
    </div>
  {/if}
</Section>

<Section tone="paper" heading="Organisations we've worked with">
  <LogoWall items={partners} />
</Section>

<Section tone="lilac" eyebrow="Client feedback" heading="Insightful, honest and engaging">
  <TestimonialCards items={testimonials.slice(0, 3)} />
</Section>

<CtaBand heading={workplaces.cta.heading} body={workplaces.cta.body} ctas={workplaces.cta.ctas} />
