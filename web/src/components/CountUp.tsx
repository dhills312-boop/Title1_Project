'use client';

interface CountUpProps {
  to: string | number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

export default function CountUp({
  to,
  prefix = '',
  suffix = '',
}: CountUpProps) {
  return <span>{prefix + to + suffix}</span>;
}
