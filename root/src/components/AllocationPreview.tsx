import type { AllocationSlice } from '@/lib/types';

interface AllocationPreviewProps {
  slices: AllocationSlice[];
  amountUSD: number;
  title?: string;
  note?: string;
}

export default function AllocationPreview({
  slices,
  amountUSD,
  title = 'How your contribution is allocated',
  note,
}: AllocationPreviewProps) {
  return (
    <div style={{ background: 'var(--bg-warm)', padding: 32, borderTop: '2px solid var(--ink)' }}>
      <div
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          marginBottom: 20,
        }}
      >
        {title}
      </div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 500, lineHeight: 1, marginBottom: 24 }}>
        ${amountUSD.toLocaleString()}
      </div>
      <div className="rule" />
      <div style={{ padding: '20px 0' }}>
        {slices.map((slice) => (
          <div
            key={slice.systemId}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: 14,
            }}
          >
            <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink)' }}>
              {slice.systemName}
            </span>
            <span style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)' }}>
                {slice.pct}%
              </span>
              <span
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 17,
                  color: 'var(--ink)',
                  fontWeight: 500,
                  minWidth: 70,
                  textAlign: 'right',
                }}
              >
                ${slice.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="rule" />
      {note && (
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 12,
            lineHeight: 1.65,
            color: 'var(--ink-muted)',
            marginTop: 20,
            fontWeight: 300,
          }}
        >
          {note}
        </p>
      )}
    </div>
  );
}