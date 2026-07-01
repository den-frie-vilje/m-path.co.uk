<!--
  Link-styled button. Renders an <a> (all CTAs on this static site are navigations or mailto/tel).
  External + mailto/tel links get safe rel + the right affordance; internal links preload on hover.
  Variants map to the .btn-* classes in app.css.
-->
<script lang="ts">
  import Icon from './Icon.svelte';

  interface Props {
    href: string;
    label: string;
    variant?: 'primary' | 'outline' | 'on-violet' | 'ghost-on-violet';
    icon?: string;
    class?: string;
  }
  let { href, label, variant = 'primary', icon, class: klass = '' }: Props = $props();

  const external = $derived(/^https?:\/\//i.test(href));
  const isMail = $derived(/^(mailto|tel):/i.test(href));
  const trailingIcon = $derived(icon ?? (external ? 'arrow-up-right' : isMail ? undefined : 'arrow-right'));
</script>

<a
  {href}
  class="btn btn-{variant} {klass}"
  rel={external ? 'noopener noreferrer' : undefined}
  target={external ? '_blank' : undefined}
>
  {label}
  {#if trailingIcon}
    <Icon name={trailingIcon} size={18} />
  {/if}
</a>
