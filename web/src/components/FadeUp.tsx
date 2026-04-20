'use client';

import type { CSSProperties, ReactNode } from 'react';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  style?: CSSProperties;
}

export default function FadeUp({ children, delay = 0, style = {} }: FadeUpProps) {
  return (
    <div
      style={{
        transform: 'translateY(18px)',
        opacity: 0,
        animation: `fadeUpIn 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s forwards`,
        ...style,
      }}
    >
      {children}
      <style>{`
        @keyframes fadeUpIn {
          from {
            opacity: 0;
            transform: translateY(18px);
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
