import type { CSSProperties } from 'react';

interface DoodleProps {
  src: string;
  style?: CSSProperties;
}

export default function Doodle({ src, style = {} }: DoodleProps) {
  return (
    <img
      src={src}
      className="doodle"
      alt=""
      style={{ display: 'block', userSelect: 'none', ...style }}
    />
  );
}
