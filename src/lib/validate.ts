import type { Termin } from './store';

export type Errors = Partial<Record<keyof Termin, string>>;

/** Komunikaty mówią: które pole, dlaczego i jak poprawić (praktyka 6). */
export function validateTermin(v: Partial<Termin>): Errors {
  const e: Errors = {};
  if (!v.przedmiot?.trim()) e.przedmiot = 'Wybierz przedmiot z listy albo wpisz jego nazwę.';
  if (!v.typ) e.typ = 'Wybierz typ terminu: kolokwium, egzamin lub projekt.';
  if (!v.data) e.data = 'Podaj datę w formacie RRRR-MM-DD, np. 2027-01-26.';
  if (!v.godzina) e.godzina = 'Podaj godzinę w formacie GG:MM, np. 09:00.';
  // TODO (L6): kolejne reguły, np. data nie z przeszłości, limit długości notatek
  return e;
}
