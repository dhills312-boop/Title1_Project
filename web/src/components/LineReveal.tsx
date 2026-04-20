'use client';

import type { CSSProperties, ReactNode } from 'react';

interface LineRevealProps {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}

export default function LineReveal({ children, delay = 0, style = {} }: LineRevealProps) {
  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <div
        style={{
          transform: 'translateY(112%)',
          opacity: 0,
          animation: `lineRevealIn 0.82s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
        }}
      >
        {children}
      </div>
      <style>{`
        @keyframes lineRevealIn {
          from {
            opacity: 0;
            transform: translateY(112%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
