import type { MouseEvent } from 'react';
import { TriangleAlert } from 'lucide-react';
import { daysUntil, type Termin } from '../lib/store';
import { czyPilny, dniTekst, formatData, szczegolyUrl } from '../lib/format';
import SpotlightCard from './SpotlightCard';
import TypBadge from './TypBadge';

interface Props {
  termin: Termin;
  wybrany?: boolean;
  /** Gdy podane: na szerokim ekranie klik otwiera szczegóły w panelu obok zamiast przejścia. */
  onWybierz?: (id: string) => void;
}

export default function TerminCard({ termin: t, wybrany = false, onWybierz }: Props) {
  const pilny = czyPilny(t);
  const dni = dniTekst(daysUntil(t.data));

  function klik(e: MouseEvent<HTMLAnchorElement>) {
    if (onWybierz && matchMedia('(min-width: 48rem)').matches) {
      e.preventDefault();
      onWybierz(t.id);
    }
  }

  return (
    <SpotlightCard className={`karta karta-terminu${pilny ? ' karta--pilna' : ''}${wybrany ? ' karta--wybrana' : ''}`}>
      <div className="karta-terminu__gora">
        <a className="karta-terminu__link" href={szczegolyUrl(t.id)} onClick={klik} aria-current={wybrany ? 'true' : undefined}>
          {t.przedmiot}
        </a>
        {pilny
          ? <span className="pilne"><TriangleAlert size={16} aria-hidden="true" />{dni[0].toUpperCase() + dni.slice(1)}</span>
          : <span className="karta-terminu__dni">{dni}</span>}
      </div>
      <div className="karta-terminu__dol">
        <TypBadge typ={t.typ} />
        <span>{formatData(t.data)}, {t.godzina}</span>
      </div>
    </SpotlightCard>
  );
}
