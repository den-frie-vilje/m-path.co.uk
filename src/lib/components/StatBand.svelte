<!--
  Impact stats — big Jost numerals. Uses a centered flex-wrap (not a fixed 4-col grid) so ANY count
  (2, 3, 4, 5, 6…) lays out evenly and centred; no empty divider cells when an editor changes the
  number of stats.
-->
<script lang="ts">
  interface Stat {
    value: string;
    label: string;
  }
  let { stats, tone = 'paper' }: { stats: Stat[]; tone?: 'paper' | 'violet' } = $props();
  const onDark = $derived(tone === 'violet');
</script>

{#if stats.length}
  <dl
    class="mx-auto flex max-w-4xl flex-wrap justify-center gap-x-2 gap-y-8 rounded-2xl border py-9 {onDark
      ? 'border-white/15 bg-white/5'
      : 'border-line bg-paper-2'}"
  >
    {#each stats as s (s.label)}
      <div class="flex grow basis-40 flex-col items-center px-5 text-center">
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
{/if}
