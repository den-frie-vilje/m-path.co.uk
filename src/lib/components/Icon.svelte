<!--
  Inline SVG icon set (lucide-derived line icons). currentColor + 1.75 stroke so icons inherit text
  colour. Decorative by default (aria-hidden); pass `title` to make it a labelled graphic.
-->
<script lang="ts" module>
  // Path/element markup per icon key. Kept as raw inner SVG so brand icons (facebook/linkedin) can
  // use filled paths while the rest are strokes.
  export const ICONS: Record<string, string> = {
    'message-circle': '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
    lightbulb:
      '<path d="M15 14c.2-1 .7-1.7 1.5-2.5A5.5 5.5 0 1 0 7.5 11.5c.8.8 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    users:
      '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>',
    briefcase:
      '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'graduation-cap':
      '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1 2 3 6 3s6-2 6-3v-5"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    'book-open':
      '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3Z"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    quote:
      '<path d="M3 21c3 0 7-1 7-8V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2c0 2.5-2 4-4 4"/><path d="M14 21c3 0 7-1 7-8V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2c0 2.5-2 4-4 4"/>',
    'external-link':
      '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.98.72 2.91a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.17-1.17a2 2 0 0 1 2.11-.45c.93.35 1.9.59 2.91.72A2 2 0 0 1 22 16.92Z"/>',
    menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    'chevron-down': '<path d="m6 9 6 6 6-6"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    play: '<path d="M6 4v16l14-8z" fill="currentColor" stroke="none"/>',
    facebook:
      '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    twitter:
      '<path d="M4 4l7.5 10L4 20h2l6.3-6.8L17 20h4l-7.9-10.6L20.5 4h-2l-5.8 6.3L8 4z"/>',
    linkedin:
      '<path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05a4.2 4.2 0 0 1 3.75-2C21 8.7 22 11 22 14.2V21h-4v-6c0-1.4-.03-3.3-2-3.3s-2.3 1.5-2.3 3.2V21h-4z"/>'
  };
  const FILLED = new Set(['facebook', 'linkedin', 'twitter']);
</script>

<script lang="ts">
  interface Props {
    name: keyof typeof ICONS | string;
    size?: number;
    class?: string;
    title?: string;
  }
  let { name, size = 24, class: klass = '', title }: Props = $props();
  const markup = $derived(ICONS[name] ?? '<circle cx="12" cy="12" r="3"/>');
  const filled = $derived(FILLED.has(name));
</script>

<svg
  class={klass}
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill={filled ? 'currentColor' : 'none'}
  stroke={filled ? 'none' : 'currentColor'}
  stroke-width="1.75"
  stroke-linecap="round"
  stroke-linejoin="round"
  role={title ? 'img' : 'presentation'}
  aria-hidden={title ? undefined : 'true'}
  aria-label={title}
>
  {#if title}<title>{title}</title>{/if}
  <!-- eslint-disable-next-line svelte/no-at-html-tags -->
  {@html markup}
</svg>
