'use client';

import { useEffect, useRef } from 'react';

interface MorphPath {
  d: string;
  offX: number | string;
  offY: number | string;
}

declare global {
  interface Window {
    paths?: MorphPath[];
    flubber?: {
      interpolate: (
        fromD: string,
        toD: string,
        opts?: { maxSegmentLength?: number },
      ) => (t: number) => string;
    };
  }
}

interface MorphHeroProps {
  accentColor?: string;
}

export default function MorphHero({ accentColor = '#5C7A6E' }: MorphHeroProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const stateRef = useRef({ current: 0, raf: 0, timer: 0 as unknown as ReturnType<typeof setTimeout> | 0 });

  useEffect(() => {
    const MORPH_MS = 1600;
    const HOLD_MS = 3200;

    let cancelled = false;

    function tryStart() {
      if (cancelled) return;
      const paths = window.paths;
      const flubber = window.flubber;
      if (!paths || !flubber || !pathRef.current) {
        setTimeout(tryStart, 80);
        return;
      }
      const st = stateRef.current;

      function applyOffset(p: MorphPath) {
        if (groupRef.current) {
          groupRef.current.setAttribute('transform', `translate(${p.offX}, ${p.offY})`);
        }
      }

      function goTo(idx: number) {
        if (cancelled) return;
        if (st.raf) {
          cancelAnimationFrame(st.raf);
          st.raf = 0;
        }
        if (st.timer) clearTimeout(st.timer as ReturnType<typeof setTimeout>);
        const pathEl = pathRef.current;
        if (!pathEl || !paths || !flubber) return;
        const fromD = pathEl.getAttribute('d') || paths[st.current].d;
        st.current = idx;
        const to = paths[idx];
        if (!fromD || fromD === to.d) {
          pathEl.setAttribute('d', to.d);
          applyOffset(to);
          st.timer = setTimeout(() => goTo((idx + 1) % paths.length), HOLD_MS);
          return;
        }
        const interp = flubber.interpolate(fromD, to.d, { maxSegmentLength: 12 });
        const start = performance.now();
        const prevIdx = (idx - 1 + paths.length) % paths.length;
        const prev = paths[prevIdx];
        function step(now: number) {
          if (cancelled || !pathEl || !paths) return;
          const t = Math.min((now - start) / MORPH_MS, 1);
          const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          pathEl.setAttribute('d', interp(e));
          const ox = +prev.offX + (+to.offX - +prev.offX) * e;
          const oy = +prev.offY + (+to.offY - +prev.offY) * e;
          if (groupRef.current) {
            groupRef.current.setAttribute('transform', `translate(${ox.toFixed(1)},${oy.toFixed(1)})`);
          }
          if (t < 1) {
            st.raf = requestAnimationFrame(step);
          } else {
            st.raf = 0;
            applyOffset(to);
            st.timer = setTimeout(() => goTo((idx + 1) % paths.length), HOLD_MS);
          }
        }
        st.raf = requestAnimationFrame(step);
      }

      pathRef.current.setAttribute('d', paths[0].d);
      applyOffset(paths[0]);
      st.timer = setTimeout(() => goTo(1), HOLD_MS);
    }

    tryStart();

    return () => {
      cancelled = true;
      const st = stateRef.current;
      if (st.timer) clearTimeout(st.timer as ReturnType<typeof setTimeout>);
      if (st.raf) cancelAnimationFrame(st.raf);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 1200 800" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <g ref={groupRef}>
          <path
            ref={pathRef}
            d=""
            fill="none"
            stroke={accentColor}
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.75"
          />
        </g>
      </svg>
    </div>
  );
}
