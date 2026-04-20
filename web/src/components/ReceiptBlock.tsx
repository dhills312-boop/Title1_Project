import Link from 'next/link';
import Rule from './Rule';

interface ReceiptBlockProps {
  amountUSD: number;
  schoolName: string;
  mode: 'system' | 'item' | 'greatest-need';
  targetLabel: string;
  studentsImpacted?: number;
  schoolId: string;
}

export default function ReceiptBlock({
  amountUSD,
  schoolName,
  mode,
  targetLabel,
  studentsImpacted,
  schoolId,
}: ReceiptBlockProps) {
  const rows: Array<[string, string]> = [
    ['Amount allocated', `$${amountUSD.toLocaleString()}`],
    ['School', schoolName],
    [mode === 'item' ? 'Item' : 'System', targetLabel],
  ];
  if (typeof studentsImpacted === 'number') {
    rows.push(['Students impacted', `${studentsImpacted} students`]);
  }
  rows.push(['Purchase timeline', '14 business days']);
  rows.push(['Receipt published', '30 days from today']);

  return (
    <div>
      <div style={{ background: 'var(--bg-warm)', padding: 44, marginBottom: 36, borderTop: '2px solid var(--ink)' }}>
        <Rule />
        <div style={{ padding: '24px 0' }}>
          {rows.map(([label, value]) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 18,
              }}
            >
              <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', fontWeight: 300 }}>
                {label}
              </span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--ink)', fontWeight: 500 }}>
                {value}
              </span>
            </div>
          ))}
        </div>
        <Rule />
      </div>
      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 14,
          lineHeight: 1.8,
          color: 'var(--ink-muted)',
          textAlign: 'center',
          marginBottom: 44,
          fontWeight: 300,
        }}
      >
        A purchase receipt will be published to this campaign page once the item is fulfilled.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <Link
          href={`/schools/${schoolId}`}
          style={{
            border: '1px solid var(--ink)',
            color: 'var(--ink)',
            fontFamily: 'var(--sans)',
            fontSize: 13,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '13px 28px',
          }}
        >
          View campaign
        </Link>
        <Link
          href="/"
          style={{
            border: '1px solid var(--rule)',
            color: 'var(--ink-muted)',
            fontFamily: 'var(--sans)',
            fontSize: 13,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '13px 28px',
          }}
        >
          Return home
        </Link>
      </div>
    </div>
  );
}