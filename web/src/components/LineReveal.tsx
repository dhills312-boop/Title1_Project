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
          transform: 'translateY(0)',
          opacity: 1,
          transition: `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 0.5s ease ${delay}s`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
