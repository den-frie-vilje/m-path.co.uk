<!-- Root layout: global styles only. Site chrome lives in the (site) group. -->
<script lang="ts">
  import '../app.css';
  let { children } = $props();
</script>

{@render children()}
