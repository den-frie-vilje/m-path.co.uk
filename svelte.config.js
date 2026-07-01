import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // SPA-fallback shell for any route that opts out of prerender.
      // nginx's try_files falls through to /200.html for non-prerendered paths.
      fallback: '200.html',
      strict: false
    }),
    prerender: {
      // `*` crawls all reachable + static page routes. Unlinked endpoint routes
      // (sitemap) are listed explicitly. (robots.txt is a plain static file.)
      entries: ['*', '/sitemap.xml']
    }
  }
};

export default config;
