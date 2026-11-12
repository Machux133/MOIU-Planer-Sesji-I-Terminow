import { defineConfig } from 'astro/config';

// Ustawienia pod GitHub Pages. Linki w kodzie budujemy przez src/lib/url.ts
// (korzysta z import.meta.env.BASE_URL), dzięki czemu działają też pod /nazwa-repo/.
export default defineConfig({
  site: 'https://machux133.github.io',
  base: '/MOIU-Planer-Sesji-I-Terminow',
});
