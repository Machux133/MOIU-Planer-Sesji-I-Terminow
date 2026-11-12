/** Buduje link z uwzględnieniem `base` z astro.config.mjs (np. GitHub Pages). */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + (path.startsWith('/') ? path : '/' + path);
}

/** Zdejmuje `base` i końcowy ukośnik, żeby porównywać ścieżki (np. do aria-current). */
export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  let p = pathname.startsWith(base) ? pathname.slice(base.length) : pathname;
  p = p.replace(/\/$/, '');
  return p === '' ? '/' : p;
}
