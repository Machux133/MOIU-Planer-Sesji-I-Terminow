import { daysUntil, type Przypomnienie, type Termin, type Typ } from './store';
import { url } from './url';

/** Termin jest pilny, gdy zostało do niego tyle dni lub mniej. */
export const PILNY_DNI = 7;

export const TYP_NAZWA: Record<Typ, string> = { egzamin: 'Egzamin', kolokwium: 'Kolokwium', projekt: 'Projekt' };

export const PRZYPOMNIENIE_NAZWA: Record<Przypomnienie, string> = {
  none: 'brak', '1d': '1 dzień przed', '3d': '3 dni przed', '7d': '7 dni przed',
};

/** 2026-12-03 → 03.12.2026 */
export function formatData(data: string): string {
  const [r, m, d] = data.split('-');
  return `${d}.${m}.${r}`;
}

/** Względny opis: „dziś”, „jutro”, „za 5 dni”, „wczoraj”, „3 dni temu”. */
export function dniTekst(n: number): string {
  if (n === 0) return 'dziś';
  if (n === 1) return 'jutro';
  if (n === -1) return 'wczoraj';
  return n > 0 ? `za ${n} dni` : `${-n} dni temu`;
}

export function czyPilny(t: Termin): boolean {
  const n = daysUntil(t.data);
  return n >= 0 && n <= PILNY_DNI;
}

export function nadchodzace(items: Termin[]): Termin[] {
  return items.filter((t) => daysUntil(t.data) >= 0);
}

export function szczegolyUrl(id: string): string {
  return `${url('/termin')}?id=${encodeURIComponent(id)}`;
}
