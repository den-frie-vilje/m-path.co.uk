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
    <div class="px-4 py-7 text-center">
      <dd>
        <span
          class="inline-block font-display text-5xl font-bold leading-none whitespace-nowrap sm:text-6xl {onDark
            ? 'text-white'
            : 'text-violet-700'}"
        >
          {s.value}
        </span>
      </dd>
      <dt class="mt-2 text-sm font-medium {onDark ? 'text-white/70' : 'text-ink-soft'}">{s.label}</dt>
    </div>
  {/each}
</dl>
