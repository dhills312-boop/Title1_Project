import Link from 'next/link';

export default function NavBar() {
  return (
    <nav
      className="title1-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 clamp(20px, 5vw, 48px)',
        height: 60,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--rule)',
      }}
    >
      <div className="title1-nav-left" style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        <Link
          href="/"
          className="title1-nav-brand"
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
          className="title1-nav-preview"
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
        className="title1-nav-badge"
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
      <style>{`
        @media (max-width: 640px) {
          .title1-nav {
            padding-inline: 16px !important;
            height: 72px !important;
            align-items: flex-start !important;
            padding-top: 10px !important;
          }
          .title1-nav-left {
            gap: 14px !important;
            align-items: flex-start !important;
          }
          .title1-nav-brand {
            font-size: 17px !important;
            line-height: 0.95 !important;
            display: inline-block !important;
            max-width: 52px;
          }
          .title1-nav-preview {
            font-size: 10px !important;
            letter-spacing: 0.1em !important;
            line-height: 1.25 !important;
            max-width: 88px;
          }
          .title1-nav-badge {
            font-size: 10px !important;
            letter-spacing: 0.08em !important;
            line-height: 1.2 !important;
            max-width: 132px !important;
          }
        }
        @media (max-width: 420px) {
          .title1-nav-badge {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}
