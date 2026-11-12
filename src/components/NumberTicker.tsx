// Licznik „dobiegający” do wartości, wzorowany na Magic UI Number Ticker (magicui.design).
// Dla czytnika ekranu wartość podaje rodzic (sr-only), sam licznik jest aria-hidden.
import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

export default function NumberTicker({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const bezRuchu = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { damping: 60, stiffness: 100 });
  const widoczny = useInView(ref, { once: true });

  useEffect(() => {
    if (widoczny) mv.set(value);
  }, [widoczny, value, mv]);

  useEffect(() => {
    if (bezRuchu) return;
    return spring.on('change', (v) => {
      if (ref.current) ref.current.textContent = String(Math.round(v));
    });
  }, [spring, bezRuchu]);

  return <span ref={ref} aria-hidden="true">{bezRuchu ? value : 0}</span>;
}
