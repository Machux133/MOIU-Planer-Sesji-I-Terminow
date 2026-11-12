import { useEffect, useState } from 'react';
import { daysUntil, getById, type Termin } from '../lib/store';
import { PRZYPOMNIENIE_NAZWA, czyPilny, dniTekst, formatData } from '../lib/format';
import TypBadge from './TypBadge';

/** Szczegóły jednego terminu. `poziom` 1 na osobnym ekranie, 2 w panelu obok listy. */
export default function SzczegolyTerminu({ termin: t, poziom = 1 }: { termin?: Termin; poziom?: 1 | 2 }) {
  const Naglowek = poziom === 1 ? 'h1' : 'h2';
  if (!t) return <Naglowek>Nie znaleziono terminu</Naglowek>;

  const wiersze: [string, string][] = [
    ['Sala', t.sala || 'brak'],
    ['Zakres materiału', t.zakres || 'brak'],
    ['Notatki', t.notatki || 'brak'],
    ['Przypomnienie', PRZYPOMNIENIE_NAZWA[t.przypomnienie] ?? 'brak'],
  ];
  return (
    <article className="szczegoly">
      <Naglowek className="szczegoly__tytul">{t.przedmiot}</Naglowek>
      <TypBadge typ={t.typ} />
      <p className={`szczegoly__kiedy${czyPilny(t) ? ' szczegoly__kiedy--pilny' : ''}`}>
        <strong>{formatData(t.data)}, {t.godzina}</strong>
        <span>{dniTekst(daysUntil(t.data))}</span>
      </p>
      <dl className="szczegoly__dane">
        {wiersze.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd className={v === 'brak' ? 'brak' : undefined}>{v}</dd>
          </div>
        ))}
      </dl>
      {/* TODO (osoba B, L7): przyciski „Edytuj termin” i „Usuń termin” */}
    </article>
  );
}

/** Wersja dla /termin?id=…: czyta id z adresu. */
export function SzczegolyZAdresu() {
  const [t, setT] = useState<Termin | undefined | null>(null);
  useEffect(() => {
    const znaleziony = getById(new URLSearchParams(location.search).get('id') ?? '');
    setT(znaleziony);
    if (znaleziony) document.title = `${znaleziony.przedmiot} · Planer sesji`;
  }, []);
  return t === null ? null : <SzczegolyTerminu termin={t} />;
}
