import { daysUntil } from './store';
import type { Termin } from './store';

export type Errors = Partial<Record<keyof Termin, string>>;

/** Komunikaty mówią: które pole, dlaczego i jak poprawić (praktyka 6). */
export function validateTermin(v: Partial<Termin>): Errors {
  const e: Errors = {};
  if (!v.przedmiot?.trim()) e.przedmiot = 'Wybierz przedmiot z listy.';
  if (!['kolokwium', 'egzamin', 'projekt'].includes(v.typ ?? '')) e.typ = 'Wybierz typ zaliczenia.';
  if (!v.data) e.data = 'Wybierz datę zaliczenia.';
  else {
    const date = new Date(v.data + 'T00:00:00Z');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(v.data) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== v.data)
      e.data = 'Wybierz poprawną datę.';
    else if (daysUntil(v.data) < 0) e.data = 'Wybierz dzisiejszą lub przyszłą datę.';
  }
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(v.godzina ?? '')) e.godzina = 'Podaj godzinę zaliczenia, np. 10:15.';
  return e;
}