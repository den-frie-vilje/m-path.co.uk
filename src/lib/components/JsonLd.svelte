<!-- Emits a JSON-LD structured-data script into <head>. First-party data only. -->
<script lang="ts">
  let { data }: { data: unknown } = $props();
</script>

<svelte:head>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html `<script type="application/ld+json">${JSON.stringify(data)}<\/script>`}
</svelte:head>
