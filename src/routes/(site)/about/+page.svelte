<script lang="ts">
  import { about } from '$lib/content';
  import { buildSeo } from '$lib/seo';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import Prose from '$lib/components/Prose.svelte';
  import Button from '$lib/components/Button.svelte';
  import FacilitatorGrid from '$lib/components/FacilitatorGrid.svelte';
  import VideoEmbed from '$lib/components/VideoEmbed.svelte';
  import CtaBand from '$lib/components/CtaBand.svelte';

  const seo = buildSeo({ seo: about.seo, path: '/about' });
</script>

<SeoHead {seo} />

<Hero eyebrow={about.hero.eyebrow} title={about.hero.title} lead={about.hero.lead} compact />

<Section tone="paper">
  <div class="mx-auto max-w-3xl">
    <Prose md={about.mission.body} />
  </div>
</Section>

<Section tone="mist">
  <div class="mx-auto max-w-3xl text-center">
    <h2 class="t-h2 text-ink">{about.founder.heading}</h2>
    <div class="mt-4"><Prose md={about.founder.body} class="mx-auto max-w-2xl" /></div>
    <div class="mt-7 flex justify-center">
      <Button href={about.founder.cta.href} label={about.founder.cta.label} variant="primary" />
    </div>
  </div>
</Section>

<Section tone="paper" heading={about.facilitators.heading} lead={about.facilitators.lead}>
  <FacilitatorGrid people={about.facilitators.people} />
</Section>

{#if about.media}
  <Section
    tone="plum"
    eyebrow={about.media.eyebrow}
    heading={about.media.heading}
    lead={about.media.lead}
  >
    <div class="mx-auto max-w-3xl">
      <VideoEmbed id={about.media.video.id} title={about.media.video.title} />
    </div>
  </Section>
{/if}

<CtaBand heading={about.cta.heading} body={about.cta.body} ctas={about.cta.ctas} />
