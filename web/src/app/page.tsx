import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import LineReveal from '@/components/LineReveal';
import CountUp from '@/components/CountUp';
import MorphHero from '@/components/MorphHero';
import MiniDoodles from '@/components/MiniDoodles';
import Doodle from '@/components/Doodle';
import Rule from '@/components/Rule';
import { SCHOOLS } from '@/lib/data/schools';
import { getSystemsForSchool } from '@/lib/data/systems';
import { getClassroomsForSchool } from '@/lib/data/classrooms';

export default function LandingPage() {
  const school = SCHOOLS[0];
  const systems = getSystemsForSchool(school.id);
  const classrooms = getClassroomsForSchool(school.id);
  const totalGoal = systems.reduce((s, sys) => s + sys.goalUSD, 0);
  const schoolMarks = [
    {
      src: '/uploads/IMG_8198.PNG',
      label: school.name,
      sub: school.location,
    },
    {
      src: '/uploads/IMG_8199.PNG',
      label: school.district,
      sub: `${classrooms.length} classrooms`,
    },
    {
      src: '/uploads/IMG_8198.PNG',
      label: 'Verified Campaign',
      sub: `${systems.length} systems live`,
    },
  ];

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', paddingTop: 60, position: 'relative', overflow: 'hidden' }}>
      <MiniDoodles />
      <Doodle src="/uploads/IMG_8201.JPG" style={{ left: '-80px', top: '80px', width: '480px', zIndex: 0 }} />
      <Doodle src="/uploads/IMG_8208.JPG" style={{ right: '-60px', top: '220px', width: '360px', zIndex: 0 }} />
      <Doodle src="/uploads/IMG_8207.JPG" style={{ left: '-40px', top: '820px', width: '280px', zIndex: 0 }} />
      <Doodle src="/uploads/IMG_8206.JPG" style={{ right: '-80px', top: '1100px', width: '500px', zIndex: 0 }} />
      <Doodle src="/uploads/IMG_8209.JPG" style={{ left: '-30px', top: '1500px', width: '360px', zIndex: 0 }} />
      <Doodle src="/uploads/IMG_8210.JPG" style={{ right: '-60px', bottom: '80px', width: '300px', zIndex: 0 }} />

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, minHeight: 'calc(100vh - 60px)', alignItems: 'center' }}>
          <div style={{ paddingRight: 60 }}>
            <FadeUp>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
                <div style={{ width: 28, height: 1, background: 'var(--accent)' }} />
                <span className="eyebrow">Title I Verified · {school.district}</span>
              </div>
            </FadeUp>

            <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(52px,7.5vw,120px)', fontWeight: 400, lineHeight: 0.97, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 36 }}>
              <LineReveal delay={0.1}>Real</LineReveal>
              <LineReveal delay={0.18}>classrooms.</LineReveal>
              <LineReveal delay={0.26} style={{ color: 'var(--ink-muted)', fontStyle: 'italic', display: 'block' }}>
                <em>Real systems.</em>
              </LineReveal>
            </h1>

            <FadeUp delay={0.5}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 17, lineHeight: 1.75, color: 'var(--ink-muted)', maxWidth: 420, marginBottom: 44, fontWeight: 300 }}>
                Contribute toward a classroom system — reading, organization, operations. Every dollar is allocated transparently across the classrooms it supports.
              </p>
            </FadeUp>

            <FadeUp delay={0.65}>
              <Link
                href={`/schools/${school.id}`}
                style={{
                  display: 'inline-block',
                  border: '1px solid var(--ink)',
                  color: 'var(--ink)',
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '16px 40px',
                }}
              >
                See current campaign →
              </Link>
            </FadeUp>
          </div>

          <div style={{ height: 'clamp(380px,55vh,640px)', position: 'relative' }}>
            <MorphHero accentColor="#5C7A6E" />
            <FadeUp delay={0.5}>
              <div
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 24,
                  transform: 'translateX(-50%)',
                  width: 'min(100%, 560px)',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: 12,
                  padding: 12,
                  background: 'rgba(237,234,226,0.82)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(26,22,18,0.08)',
                }}
              >
                {schoolMarks.map((mark, index) => (
                  <div
                    key={mark.label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '10px 12px',
                      border: '1px solid var(--rule)',
                      background: 'rgba(255,255,255,0.22)',
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        border: '1px solid rgba(26,22,18,0.08)',
                        background: 'rgba(255,255,255,0.28)',
                        padding: 5,
                      }}
                    >
                      <img
                        src={mark.src}
                        alt=""
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          mixBlendMode: 'multiply',
                          opacity: index === 1 ? 0.72 : 0.8,
                        }}
                      />
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: 11,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--ink)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {mark.label}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: 11,
                          color: 'var(--ink-muted)',
                          marginTop: 3,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {mark.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)', position: 'relative', zIndex: 1 }}>
        <Rule />
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '56px clamp(24px,5vw,80px)', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
          {[
            [String(school.enrollment), 'Students enrolled'],
            [String(classrooms.length), 'Classrooms in system'],
            [`$${totalGoal.toLocaleString()}`, 'Total need identified'],
            [`${school.frlPercent}%`, 'Free & reduced lunch'],
          ].map(([value, label], i) => {
            const prefix = value.startsWith('$') ? '$' : '';
            const suffix = value.endsWith('%') ? '%' : '';
            const numeric = value.replace(/[$%,]/g, '');
            const isNum = !isNaN(parseFloat(numeric));
            return (
              <FadeUp key={label} delay={i * 0.1}>
                <div style={{ padding: '0 32px', borderLeft: i > 0 ? '1px solid var(--rule)' : 'none' }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,52px)', fontWeight: 500, lineHeight: 1, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
                    {isNum ? (
                      <CountUp to={value.replace(/[$%]/g, '')} prefix={prefix} suffix={suffix} />
                    ) : (
                      value
                    )}
                  </div>
                  <div style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)', marginTop: 8, fontWeight: 300 }}>
                    {label}
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)', position: 'relative', zIndex: 1 }}>
        <Rule />
      </div>

      <div style={{ maxWidth: 1300, margin: '0 auto', padding: '80px clamp(24px,5vw,80px) 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 100, alignItems: 'start', position: 'relative', zIndex: 1 }}>
        <div>
          <FadeUp>
            <div className="eyebrow" style={{ marginBottom: 20 }}>How it works</div>
          </FadeUp>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,4vw,64px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 60 }}>
            <LineReveal delay={0.05}>Radical</LineReveal>
            <LineReveal delay={0.15}>transparency.</LineReveal>
            <LineReveal delay={0.25} style={{ color: 'var(--ink-muted)', fontStyle: 'italic', display: 'block' }}>
              <em>One system</em>
            </LineReveal>
            <LineReveal delay={0.35}>at a time.</LineReveal>
          </h2>
          <FadeUp delay={0.3}>
            <img
              src="/uploads/IMG_8211.JPG"
              alt=""
              style={{ width: '100%', maxWidth: 420, display: 'block', opacity: 0.6 }}
            />
          </FadeUp>
        </div>
        <div style={{ paddingTop: 56 }}>
          {[
            ['01', 'A Title I school submits verified classroom systems through the district portal.'],
            ['02', 'Systems group the needs across every classroom — reading, organization, operations.'],
            ['03', 'Donors contribute to a system. Funds allocate across the classrooms it supports.'],
            ['04', 'Purchases are made through approved vendors. Receipts published within 30 days.'],
          ].map(([num, text], i) => (
            <FadeUp key={num} delay={0.1 * i}>
              <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', marginBottom: 40, alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--serif)', fontSize: 22, color: 'var(--accent)', fontWeight: 500, paddingTop: 1 }}>{num}</span>
                <span style={{ fontFamily: 'var(--sans)', fontSize: 16, lineHeight: 1.7, color: 'var(--ink-muted)', fontWeight: 300 }}>{text}</span>
              </div>
            </FadeUp>
          ))}
          <FadeUp delay={0.5}>
            <Link
              href={`/schools/${school.id}`}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--sans)',
                fontSize: 13,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--ink)',
                textDecoration: 'underline',
                textUnderlineOffset: 5,
              }}
            >
              View active campaign →
            </Link>
          </FadeUp>
        </div>
      </div>

      <div style={{ background: 'var(--bg-warm)', borderTop: '1px solid var(--rule)', padding: '32px clamp(24px,5vw,80px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, position: 'relative', zIndex: 1 }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 16, color: 'var(--ink-muted)', fontStyle: 'italic' }}>
          Currently active: {school.name}, {school.location}
        </span>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
          Verified 501(c)(3) · {school.district}
        </div>
      </div>
    </div>
  );
}
