'use client';

interface ProgressBarProps {
  funded: number;
  total: number;
  label: string;
  showAmounts?: boolean;
}

export default function ProgressBar({ funded, total, label, showAmounts = true }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((funded / total) * 100) : 0;

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)' }}>
          {pct === 100 ? 'Complete' : `$${total - funded} remaining`}
        </span>
      </div>
      <div style={{ height: 3, background: 'var(--rule)' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: pct === 100 ? 'var(--accent)' : 'var(--ink)',
            transition: 'width 1s cubic-bezier(0.22,1,0.36,1) 0.2s',
          }}
        />
      </div>
      {showAmounts && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-muted)' }}>
            ${funded} of ${total}
          </span>
          <span style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-muted)' }}>{pct}%</span>
        </div>
      )}
    </div>
  );
}
