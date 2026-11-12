import { CalendarPlus } from 'lucide-react';
import { daysUntil, getAll } from '../lib/store';
import { formatData, nadchodzace, szczegolyUrl } from '../lib/format';
import { url } from '../lib/url';
import NumberTicker from './NumberTicker';
import TerminCard from './TerminCard';
import TypBadge from './TypBadge';

// Ekran startowy: najbliższy termin jako element dominujący (praktyka 2), potem główna akcja.
export default function NajblizszyTermin() {
  const [t, ...reszta] = nadchodzace(getAll());
  const dodaj = (
    <a className="przycisk przycisk--glowny przycisk--szeroki" href={url('/dodaj')}>
      <CalendarPlus size={20} aria-hidden="true" /> Dodaj termin
    </a>
  );

  if (!t) {
    return (
      <>
        <p className="karta">Brak nadchodzących terminów. Dodaj pierwszy, żeby widzieć tu odliczanie.</p>
        {dodaj}
      </>
    );
  }

  const dni = daysUntil(t.data);
  return (
    <>
      <section aria-labelledby="najblizszy">
        <h2 id="najblizszy" className="nadtytul">Najbliższy termin</h2>
        <a className="karta karta--dominujaca border-beam" href={szczegolyUrl(t.id)}>
          <TypBadge typ={t.typ} />
          <span className="dominujaca__przedmiot">{t.przedmiot}</span>
          <span className="dominujaca__kiedy">{formatData(t.data)}, {t.godzina}{t.sala ? ` · ${t.sala}` : ''}</span>
          {dni === 0 ? (
            <span className="dominujaca__licznik"><span className="dominujaca__liczba">Dziś</span></span>
          ) : (
            <span className="dominujaca__licznik">
              <span className="dominujaca__liczba"><NumberTicker value={dni} /></span>
              <span aria-hidden="true">{dni === 1 ? 'dzień' : 'dni'} do terminu</span>
              <span className="sr-only">{dni} {dni === 1 ? 'dzień' : 'dni'} do terminu</span>
            </span>
          )}
          <span className="dominujaca__wiecej" aria-hidden="true">Zobacz szczegóły ›</span>
        </a>
      </section>

      {dodaj}

      {reszta.length > 0 && (
        <section aria-labelledby="nastepne">
          <h2 id="nastepne" className="nadtytul">Następne</h2>
          <ul className="lista">
            {reszta.slice(0, 3).map((n) => <li key={n.id}><TerminCard termin={n} /></li>)}
          </ul>
          <p><a href={url('/terminy')}>Zobacz wszystkie terminy ({reszta.length + 1}) ›</a></p>
        </section>
      )}
    </>
  );
}
