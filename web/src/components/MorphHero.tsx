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

const FALLBACK_PATH =
  'M 240 390 C 300 330, 360 300, 430 300 C 500 300, 560 332, 600 380 C 640 428, 694 468, 766 470 C 840 472, 908 434, 960 366';

export default function MorphHero({ accentColor = '#5C7A6E' }: MorphHeroProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const glowPathRef = useRef<SVGPathElement>(null);
  const shimmerPathRef = useRef<SVGPathElement>(null);
  const groupRef = useRef<SVGGElement>(null);
  const stateRef = useRef({ current: 0, raf: 0, timer: 0 as unknown as ReturnType<typeof setTimeout> | 0 });

  useEffect(() => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      return;
    }

    const MORPH_MS = 1600;
    const HOLD_MS = 3200;

    let cancelled = false;

    function tryStart() {
      if (cancelled) return;
      const paths = window.paths;
      const flubber = window.flubber;
      if (!pathRef.current) {
        setTimeout(tryStart, 80);
        return;
      }
      if (paths && !flubber) {
        pathRef.current.setAttribute('d', paths[0]?.d || FALLBACK_PATH);
        glowPathRef.current?.setAttribute('d', paths[0]?.d || FALLBACK_PATH);
        shimmerPathRef.current?.setAttribute('d', paths[0]?.d || FALLBACK_PATH);
        if (paths[0]) {
          if (groupRef.current) {
            groupRef.current.setAttribute('transform', `translate(${paths[0].offX}, ${paths[0].offY})`);
          }
        }
        return;
      }
      if (!paths || !flubber) {
        pathRef.current.setAttribute('d', FALLBACK_PATH);
        glowPathRef.current?.setAttribute('d', FALLBACK_PATH);
        shimmerPathRef.current?.setAttribute('d', FALLBACK_PATH);
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
      <div className="morph-desktop-shell" style={{ width: '100%', height: '100%' }}>
        <svg viewBox="0 0 1200 800" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          <defs>
            <linearGradient id="morph-shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
              <stop offset="42%" stopColor={accentColor} stopOpacity="0" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="58%" stopColor={accentColor} stopOpacity="0" />
              <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
            </linearGradient>
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
                d={FALLBACK_PATH}
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
                d={FALLBACK_PATH}
                fill="none"
                stroke={accentColor}
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.75"
              />
              <path
                ref={shimmerPathRef}
                d={FALLBACK_PATH}
                fill="none"
                stroke="url(#morph-shimmer)"
                strokeWidth="5.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.95"
                strokeDasharray="180 1500"
                className="morph-shimmer-path"
              />
            </g>
          </g>
        </svg>
      </div>
      <div
        className="morph-mobile-fallback"
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <img
          src="/uploads/IMG_8203.JPG"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            mixBlendMode: 'multiply',
            opacity: 0.82,
            filter: 'sepia(0.36) saturate(0.62) hue-rotate(92deg) brightness(0.84)',
          }}
        />
        <div
          className="morph-mobile-shimmer"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.88) 50%, rgba(255,255,255,0) 62%)',
            mixBlendMode: 'screen',
            opacity: 0.6,
            transform: 'translateX(-125%)',
          }}
        />
      </div>
      <style>{`
        .morph-desktop-shell {
          width: 100%;
          height: 100%;
        }
        .morph-float {
          animation: morphFloat 7.2s ease-in-out infinite;
          transform-origin: center;
        }
        .morph-shimmer-path {
          animation: morphDash 13.5s linear infinite;
        }
        .morph-mobile-shimmer {
          animation: mobileShimmer 6.8s ease-in-out infinite;
        }
        @keyframes morphFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.012); }
        }
        @keyframes morphDash {
          0% { stroke-dashoffset: 1560; }
          100% { stroke-dashoffset: -1560; }
        }
        @keyframes mobileShimmer {
          0%, 12% { transform: translateX(-125%); }
          44%, 100% { transform: translateX(125%); }
        }
        @media (max-width: 767px) {
          .morph-desktop-shell {
            display: none;
          }
          .morph-mobile-fallback {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
