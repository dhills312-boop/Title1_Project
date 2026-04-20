'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}

export default function FadeUp({ children, delay = 0, style = {} }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

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

  return (
    <div
      ref={ref}
      style={{
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        opacity: inView ? 1 : 0,
        transition: `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
