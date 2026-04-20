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
  const glowPathRef = useRef<SVGPathElement>(null);
  const shimmerPathRef = useRef<SVGPathElement>(null);
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
        const glowEl = glowPathRef.current;
        const shimmerEl = shimmerPathRef.current;
        if (!pathEl || !paths || !flubber) return;
        const fromD = pathEl.getAttribute('d') || paths[st.current].d;
        st.current = idx;
        const to = paths[idx];
        if (!fromD || fromD === to.d) {
          pathEl.setAttribute('d', to.d);
          glowEl?.setAttribute('d', to.d);
          shimmerEl?.setAttribute('d', to.d);
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
          const nextD = interp(e);
          pathEl.setAttribute('d', nextD);
          glowEl?.setAttribute('d', nextD);
          shimmerEl?.setAttribute('d', nextD);
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
      glowPathRef.current?.setAttribute('d', paths[0].d);
      shimmerPathRef.current?.setAttribute('d', paths[0].d);
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
        <defs>
          <linearGradient id="morph-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
            <stop offset="42%" stopColor={accentColor} stopOpacity="0" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="58%" stopColor={accentColor} stopOpacity="0" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="morph-spark" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="45%" stopColor={accentColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </radialGradient>
          <filter id="morph-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g className="morph-float">
        <g ref={groupRef}>
          <path
            ref={glowPathRef}
            d=""
            fill="none"
            stroke={accentColor}
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.16"
            filter="url(#morph-glow)"
          />
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
          <path
            ref={shimmerPathRef}
            d=""
            fill="none"
            stroke="url(#morph-shimmer)"
            strokeWidth="5.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.95"
            strokeDasharray="180 1500"
            className="morph-shimmer-path"
          />
          <circle r="10" fill="url(#morph-spark)" opacity="0.9" className="morph-spark morph-spark-a" />
          <circle r="7" fill="url(#morph-spark)" opacity="0.55" className="morph-spark morph-spark-b" />
          <circle r="5" fill={accentColor} opacity="0.4" className="morph-spark morph-spark-c" />
        </g>
        </g>
      </svg>
      <style>{`
        .morph-float {
          animation: morphFloat 7.2s ease-in-out infinite;
          transform-origin: center;
        }
        .morph-shimmer-path {
          animation: morphDash 2.8s linear infinite;
        }
        .morph-spark {
          pointer-events: none;
        }
        .morph-spark-a {
          animation: morphSparkA 4.6s ease-in-out infinite;
        }
        .morph-spark-b {
          animation: morphSparkB 5.3s ease-in-out infinite;
        }
        .morph-spark-c {
          animation: morphSparkC 6.1s ease-in-out infinite;
        }
        @keyframes morphFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.012); }
        }
        @keyframes morphDash {
          0% { stroke-dashoffset: 1560; }
          100% { stroke-dashoffset: -1560; }
        }
        @keyframes morphSparkA {
          0%, 100% { transform: translate(360px, 168px); opacity: 0.2; }
          20% { opacity: 0.9; }
          50% { transform: translate(603px, 320px); opacity: 0.45; }
          80% { opacity: 0.8; }
        }
        @keyframes morphSparkB {
          0%, 100% { transform: translate(815px, 222px); opacity: 0.12; }
          35% { opacity: 0.58; }
          50% { transform: translate(688px, 438px); opacity: 0.2; }
          75% { opacity: 0.5; }
        }
        @keyframes morphSparkC {
          0%, 100% { transform: translate(468px, 522px); opacity: 0.1; }
          30% { opacity: 0.36; }
          50% { transform: translate(760px, 586px); opacity: 0.18; }
          85% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}
