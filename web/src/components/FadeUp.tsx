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
        transform: 'translateY(0)',
        opacity: 1,
        transition: `transform 0.75s cubic-bezier(0.22,1,0.36,1) ${delay}s, opacity 0.6s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
