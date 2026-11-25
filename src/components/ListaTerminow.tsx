import { useMemo, useState } from 'react';
import { getAll } from '../lib/store';
import SzczegolyTerminu from './SzczegolyTerminu';
import TerminCard from './TerminCard';

// Lista z filtrem po przedmiocie. Szeroki ekran: lista + szczegóły obok (praktyka 4),
// wąski: karta prowadzi do osobnego ekranu /termin?id=. Stan trzymamy w adresie (?przedmiot=&id=).
export default function ListaTerminow() {
  const wszystkie = useMemo(getAll, []);
  const przedmioty = useMemo(
    () => [...new Set(wszystkie.map((t) => t.przedmiot))].sort((a, b) => a.localeCompare(b, 'pl')),
    [wszystkie],
  );
  const start = new URLSearchParams(location.search);
  const [filtr, setFiltr] = useState(start.get('przedmiot') ?? '');
  const [wybranyId, setWybranyId] = useState(start.get('id') ?? '');

  const widoczne = filtr ? wszystkie.filter((t) => t.przedmiot === filtr) : wszystkie;
  const wybrany = widoczne.find((t) => t.id === wybranyId) ?? widoczne[0];

  function zapiszAdres(przedmiot: string, id: string) {
    const p = new URLSearchParams();
    if (przedmiot) p.set('przedmiot', przedmiot);
    if (id) p.set('id', id);
    history.replaceState(null, '', p.size ? `?${p}` : location.pathname);
  }
  function zmienFiltr(p: string) {
    setFiltr(p);
    zapiszAdres(p, '');
    setWybranyId('');
  }
  function wybierz(id: string) {
    setWybranyId(id);
    zapiszAdres(filtr, id);
  }

  return (
    <>
      {start.get('zapisano') === '1' && wszystkie.some(t => t.id === start.get('id')) && <p role="status" className="karta">Termin zapisany.</p>}
      <div className="filtr filtr--pigulki" role="group" aria-label="Filtr przedmiotu">
        {['', ...przedmioty].map((p) => (
          <button key={p} type="button" className="pigulka" aria-pressed={filtr === p} onClick={() => zmienFiltr(p)}>
            {p || 'Wszystkie'}
          </button>
        ))}
      </div>
      <div className="filtr filtr--lista">
        <label htmlFor="przedmiot">Przedmiot</label>
        <select id="przedmiot" value={filtr} onChange={(e) => zmienFiltr(e.target.value)}>
          <option value="">Wszystkie</option>
          {przedmioty.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>

      <p className="licznik-wynikow" aria-live="polite">Terminów: {widoczne.length}</p>

      <div className="dwa-panele">
        <ul className="lista">
          {widoczne.map((t) => (
            <li key={t.id}><TerminCard termin={t} wybrany={t.id === wybrany?.id} onWybierz={wybierz} /></li>
          ))}
        </ul>
        {wybrany && (
          <aside className="panel-szczegolow karta" aria-label="Szczegóły wybranego terminu">
            <SzczegolyTerminu termin={wybrany} poziom={2} />
          </aside>
        )}
      </div>
    </>
  );
}
