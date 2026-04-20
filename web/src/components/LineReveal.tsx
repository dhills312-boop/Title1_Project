'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface LineRevealProps {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}

function shouldShowImmediately() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(max-width: 900px)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    typeof IntersectionObserver === 'undefined'
  );
}

export default function LineReveal({ children, delay = 0, style = {} }: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(() => shouldShowImmediately());

  useEffect(() => {
    if (inView) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    const fallback = window.setTimeout(() => setInView(true), 220);
    return () => {
      window.clearTimeout(fallback);
      obs.disconnect();
    };
  }, [inView]);

  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }}>
      <div
        style={{
          transform: inView ? 'translateY(0)' : 'translateY(105%)',
          opacity: inView ? 1 : 0,
          transition: `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 0.5s ease ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
