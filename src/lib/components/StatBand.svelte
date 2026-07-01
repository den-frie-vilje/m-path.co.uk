<!-- Impact stats — a compact, distinctive band (big Jost numerals over a hairline-divided row). -->
<script lang="ts">
  interface Stat {
    value: string;
    label: string;
  }
  let { stats, tone = 'paper' }: { stats: Stat[]; tone?: 'paper' | 'violet' } = $props();
  const onDark = $derived(tone === 'violet');
</script>

<dl
  class="grid grid-cols-2 divide-y divide-line rounded-2xl border {onDark
    ? 'border-white/15 bg-white/5'
    : 'border-line bg-paper-2'} sm:grid-cols-4 sm:divide-x sm:divide-y-0"
>
  {#each stats as s (s.label)}
    <div class="px-6 py-7 text-center">
      <dd class="brand-gradient-text font-display text-4xl font-bold leading-none sm:text-5xl">
        {s.value}
      </dd>
      <dt class="mt-2 text-sm font-medium {onDark ? 'text-white/70' : 'text-ink-soft'}">{s.label}</dt>
    </div>
  {/each}
</dl>
