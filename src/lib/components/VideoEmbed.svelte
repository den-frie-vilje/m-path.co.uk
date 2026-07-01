<!--
  Privacy-friendly, lazy YouTube embed. Shows the poster + a play button; loads the iframe only on
  click (no third-party JS / cookies until the user opts in — good for perf/LCP and privacy). Uses
  youtube-nocookie. Accessible: real <button>, focus ring, descriptive label. Decorative tilt echoes
  the badge on the play chip only.
-->
<script lang="ts">
  import Icon from './Icon.svelte';
  interface Props {
    id: string;
    title: string;
    class?: string;
  }
  let { id, title, class: klass = '' }: Props = $props();
  let playing = $state(false);
  const poster = $derived(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);
</script>

<div class="relative aspect-video overflow-hidden rounded-2xl bg-plum-950 shadow-xl {klass}">
  {#if playing}
    <iframe
      class="absolute inset-0 h-full w-full"
      src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1&rel=0"
      {title}
      loading="lazy"
      allow="accelerated-2d-canvas; autoplay; encrypted-media; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
  {:else}
    <button
      type="button"
      onclick={() => (playing = true)}
      class="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none"
      aria-label="Play video: {title}"
    >
      <img
        src={poster}
        alt=""
        class="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        loading="lazy"
      />
      <span
        aria-hidden="true"
        class="absolute inset-0 bg-plum-950/35 transition group-hover:bg-plum-950/20 group-focus-visible:ring-2 group-focus-visible:ring-inset group-focus-visible:ring-white"
      ></span>
      <span
        aria-hidden="true"
        class="brand-gradient absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl text-white shadow-lg ring-1 ring-white/25 transition duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100"
      >
        <Icon name="play" size={28} class="ml-0.5" />
      </span>
    </button>
  {/if}
</div>
