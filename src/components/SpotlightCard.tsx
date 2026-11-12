// Podświetlenie podążające za kursorem, wzorowane na React Bits Spotlight Card (reactbits.dev).
// Pozycję kursora przekazujemy do CSS przez zmienne --x/--y, resztę robi .spotlight w global.css.
import type { MouseEvent, ReactNode } from 'react';

export default function SpotlightCard({ className = '', children }: { className?: string; children: ReactNode }) {
  function ruch(e: MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - r.top}px`);
  }
  return <div className={`spotlight ${className}`} onMouseMove={ruch}>{children}</div>;
}
