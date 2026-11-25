// Dane: terminy.json to dane startowe; przy pierwszym wejściu kopiujemy je do localStorage,
// a dalej wszystkie operacje (dodanie, edycja, usunięcie) działają na localStorage.
import seed from '../data/terminy.json';

export type Typ = 'kolokwium' | 'egzamin' | 'projekt';
export type Przypomnienie = 'none' | '1d' | '3d' | '7d';

export interface Termin {
  id: string;
  przedmiot: string;
  typ: Typ;
  data: string; // RRRR-MM-DD
  godzina: string; // GG:MM
  sala: string;
  zakres: string;
  notatki: string;
  przypomnienie: Przypomnienie;
}

const KEY = 'planer-sesji:terminy';

function read(): Termin[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as Termin[];
  } catch {
    /* localStorage niedostępny lub uszkodzony: wracamy do danych startowych */
  }
  return structuredClone(seed) as Termin[];
}

function write(items: Termin[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function sortByDate(items: Termin[]): Termin[] {
  return [...items].sort((a, b) => (a.data + a.godzina).localeCompare(b.data + b.godzina));
}

export function getAll(): Termin[] {
  return sortByDate(read());
}

export function getById(id: string): Termin | undefined {
  return read().find((t) => t.id === id);
}

/** Dodaje nowy termin albo nadpisuje istniejący o tym samym id. */
export function save(termin: Omit<Termin, 'id'> & { id?: string }): Termin {
  const items = read();
  const id = termin.id ?? crypto.randomUUID();
  const full: Termin = { ...termin, id };
  const idx = items.findIndex((t) => t.id === id);
  if (idx >= 0) items[idx] = full;
  else items.push(full);
  write(items);
  return full;
}

export function remove(id: string): Termin | undefined {
  const items = read();
  const removed = items.find((t) => t.id === id);
  write(items.filter((t) => t.id !== id));
  return removed; // zwracamy usunięty termin, żeby dało się zrobić „Cofnij”
}

/** Ile dni zostało do terminu (ujemne = już minął). */
export function daysUntil(data: string, now: Date = new Date()): number {
  const target = new Date(data + 'T00:00:00');
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}
