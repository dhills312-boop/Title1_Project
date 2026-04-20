import Link from 'next/link';

export default function NavBar() {
  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(24px, 5vw, 48px)',
        height: 60,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: '0.01em',
            color: 'var(--ink)',
          }}
        >
          Title I
        </Link>
        <Link
          href="/teacher-preview"
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
          }}
        >
          Teacher Preview
        </Link>
      </div>
      <div
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 'clamp(9px, 2.8vw, 11px)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--ink-muted)',
          textAlign: 'right',
          maxWidth: '48vw',
        }}
      >
        Verified Allocation System
      </div>
    </nav>
  );
}
