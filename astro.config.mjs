import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// Ustawienia pod GitHub Pages. Linki w kodzie budujemy przez src/lib/url.ts
// (korzysta z import.meta.env.BASE_URL), dzięki czemu działają też pod /nazwa-repo/.
export default defineConfig({
  site: 'https://machux133.github.io',
  base: '/MOIU-Planer-Sesji-I-Terminow',
  integrations: [react()],
});