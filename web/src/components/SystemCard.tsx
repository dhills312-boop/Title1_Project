import Link from 'next/link';
import type { System } from '@/lib/types';
import ProgressBar from './ProgressBar';

interface SystemCardProps {
  system: System;
  schoolId: string;
}

export default function SystemCard({ system, schoolId }: SystemCardProps) {
  const pct = Math.round((system.raisedUSD / system.goalUSD) * 100);
  return (
    <div
      style={{
        borderTop: '1px solid var(--rule)',
        padding: '32px 0',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr auto',
        gap: 40,
        alignItems: 'start',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 28, fontWeight: 500, color: 'var(--ink)', marginBottom: 8 }}>
          {system.name}
        </div>
        <p style={{ fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.65, color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 10, maxWidth: 460 }}>
          {system.description}
        </p>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
          Supports {system.classroomsSupported} classroom{system.classroomsSupported === 1 ? '' : 's'}
        </div>
      </div>
      <div style={{ paddingTop: 8 }}>
        <ProgressBar
          funded={system.raisedUSD}
          total={system.goalUSD}
          label={`${pct}% complete`}
          showAmounts
        />
      </div>
      <div style={{ paddingTop: 8 }}>
        <Link
          href={`/donate?schoolId=${schoolId}&mode=system&systemId=${system.id}`}
          style={{
            display: 'inline-block',
            padding: '12px 22px',
            border: '1px solid var(--ink)',
            color: 'var(--ink)',
            fontFamily: 'var(--sans)',
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          Contribute →
        </Link>
      </div>
    </div>
  );
}
