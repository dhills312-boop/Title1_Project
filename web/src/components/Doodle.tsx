import type { CSSProperties } from 'react';

interface DoodleProps {
  src: string;
  style?: CSSProperties;
}

export default function Doodle({ src, style = {} }: DoodleProps) {
  return (
    <div
      className="doodle-shell"
      aria-hidden="true"
      style={{ display: 'block', userSelect: 'none', position: 'absolute', lineHeight: 0, ...style }}
    >
      <img
        src={src}
        className="doodle"
        alt=""
        style={{
          display: 'block',
          userSelect: 'none',
          width: '100%',
          height: 'auto',
          position: 'relative',
          zIndex: 0,
        }}
      />
      <span className="doodle-shimmer" />
      <style>{`
        .doodle-shell {
          overflow: hidden;
          pointer-events: none;
        }
        .doodle-shimmer {
          position: absolute;
          inset: -8%;
          background: linear-gradient(
            100deg,
            rgba(255,255,255,0) 32%,
            rgba(255,255,255,0.78) 50%,
            rgba(255,255,255,0) 68%
          );
          mix-blend-mode: screen;
          opacity: 0.34;
          transform: translateX(135%);
          animation: doodleSweep 10.5s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes doodleSweep {
          0%, 16% { transform: translateX(135%); }
          52%, 100% { transform: translateX(-135%); }
        }
      `}</style>
    </div>
  );
}
