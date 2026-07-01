import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
  server: {
    // Listen on 0.0.0.0 so the dev preview is reachable from other devices on the LAN (e.g. a phone).
    host: true
  }
});
