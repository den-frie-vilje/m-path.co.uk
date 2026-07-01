<script lang="ts">
  import { home, testimonials, partners } from '$lib/content';
  import { buildSeo } from '$lib/seo';
  import SeoHead from '$lib/components/SeoHead.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import Section from '$lib/components/Section.svelte';
  import StatBand from '$lib/components/StatBand.svelte';
  import AudienceChooser from '$lib/components/AudienceChooser.svelte';
  import CardGrid from '$lib/components/CardGrid.svelte';
  import PhotoFeature from '$lib/components/PhotoFeature.svelte';
  import LogoWall from '$lib/components/LogoWall.svelte';
  import TestimonialCards from '$lib/components/TestimonialCards.svelte';
  import CtaBand from '$lib/components/CtaBand.svelte';

  const seo = buildSeo({ seo: home.seo, path: '/' });
</script>

<SeoHead {seo} />

<Hero
  eyebrow={home.hero.eyebrow}
  title={home.hero.title}
  highlight={home.hero.highlight}
  lead={home.hero.lead}
  ctas={home.hero.ctas}
  bg={home.hero.bg ? { src: home.hero.bg, alt: 'An M-Path workshop in progress' } : undefined}
/>

<!-- Impact band on warm sand, directly under the hero. -->
<div class="bg-sand">
  <div class="container-page py-12 sm:py-16">
    <StatBand stats={home.stats} />
  </div>
</div>

<!-- The audience fork — the page's primary decision. -->
<Section
  tone="paper"
  eyebrow="Choose your path"
  keyline
  heading="Two programmes, one mission"
  lead="We tailor everything to who you are — a school helping boys grow up well, or an organisation bringing men into inclusion."
>
  <AudienceChooser audiences={home.audiences} />
</Section>

<Section tone="sand" eyebrow={home.intro.eyebrow} keyline heading={home.intro.heading} lead={home.intro.lead}>
  <CardGrid items={home.intro.cards} columns={3} />
</Section>

<Section tone="lilac">
  <PhotoFeature
    image={{ src: '/img/photos/mpath-workshop-1.jpg', alt: 'Young people taking part in an M-Path workshop' }}
    eyebrow="Our approach"
    heading="Long-lasting cultural change — not a one-off talk"
    cta={{ label: 'Programmes for schools', href: '/schools' }}
  >
    <p>
      We meet men and boys with compassion, not blame — then challenge them to engage with a changing
      world. Talks earn the buy-in, workshops build the skills, and wellbeing networks keep the work
      going long after we leave the room.
    </p>
  </PhotoFeature>
</Section>

<!-- Reclaimed brand-colour section (plum gravitas) so colour carries through the page middle. -->
<Section
  tone="plum"
  eyebrow={home.services.eyebrow}
  keyline
  heading={home.services.heading}
  lead={home.services.lead}
>
  <CardGrid items={home.services.items} columns={3} dark />
</Section>

<Section tone="paper" heading="Trusted by organisations we've worked with" align="center">
  <LogoWall items={partners} />
</Section>

<Section tone="lilac" eyebrow="What people say" keyline heading="Insightful, honest and engaging">
  <TestimonialCards items={testimonials.slice(0, 3)} />
</Section>

<CtaBand heading={home.cta.heading} body={home.cta.body} ctas={home.cta.ctas} />
