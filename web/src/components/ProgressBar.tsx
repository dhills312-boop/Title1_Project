'use client';

import { useEffect, useRef, useState } from 'react';

interface ProgressBarProps {
  funded: number;
  total: number;
  label: string;
  showAmounts?: boolean;
}

function shouldShowImmediately() {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(max-width: 900px)').matches ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    typeof IntersectionObserver === 'undefined'
  );
}

export default function ProgressBar({ funded, total, label, showAmounts = true }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(() => shouldShowImmediately());
  const pct = total > 0 ? Math.round((funded / total) * 100) : 0;

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
      { threshold: 0.1 },
    );
    obs.observe(el);
    const fallback = window.setTimeout(() => setInView(true), 220);
    return () => {
      window.clearTimeout(fallback);
      obs.disconnect();
    };
  }, [inView]);

  return (
    <div ref={ref} style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)' }}>
          {pct === 100 ? 'Complete' : `$${total - funded} remaining`}
        </span>
      </div>
      <div style={{ height: 3, background: 'var(--rule)' }}>
        <div
          style={{
            height: '100%',
            width: inView ? `${pct}%` : '0%',
            background: pct === 100 ? 'var(--accent)' : 'var(--ink)',
            transition: 'width 1s cubic-bezier(0.22,1,0.36,1) 0.2s',
          }}
        />
      </div>
      {showAmounts && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-muted)' }}>
            ${funded} of ${total}
          </span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-muted)' }}>{pct}%</span>
        </div>
      )}
    </div>
  );
}
