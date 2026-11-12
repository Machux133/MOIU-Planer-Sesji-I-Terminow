// Znacznik typu: ikona + tekst, kolor tła tylko jako dodatek (praktyka 10).
import { FolderKanban, GraduationCap, PencilLine } from 'lucide-react';
import type { Typ } from '../lib/store';
import { TYP_NAZWA } from '../lib/format';

const IKONA = { egzamin: GraduationCap, kolokwium: PencilLine, projekt: FolderKanban };

export default function TypBadge({ typ }: { typ: Typ }) {
  const Ikona = IKONA[typ];
  return (
    <span className={`znacznik znacznik--${typ}`}>
      <Ikona size={16} aria-hidden="true" />
      {TYP_NAZWA[typ]}
    </span>
  );
}
