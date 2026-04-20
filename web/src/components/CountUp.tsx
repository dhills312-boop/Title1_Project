'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  to: string | number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 1600,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const raw = parseFloat(String(to).replace(/[^0-9.]/g, ''));
  const hasComma = String(to).includes(',');
  const [display, setDisplay] = useState(prefix + '0' + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let rafId = 0;
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const cur = Math.round(raw * ease);
      setDisplay(prefix + (hasComma ? cur.toLocaleString() : cur) + suffix);
      if (p < 1) rafId = requestAnimationFrame(tick);
      else setDisplay(prefix + to + suffix);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, raw, hasComma, prefix, suffix, to, duration]);

  return <span ref={ref}>{display}</span>;
}