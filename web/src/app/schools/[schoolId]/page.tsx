import { SCHOOLS } from '@/lib/data/schools';

export function generateStaticParams() {
  return SCHOOLS.map(s => ({ schoolId: s.id }));
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import LineReveal from '@/components/LineReveal';
import CountUp from '@/components/CountUp';
import MiniDoodles from '@/components/MiniDoodles';
import Doodle from '@/components/Doodle';
import Rule from '@/components/Rule';
import SystemCard from '@/components/SystemCard';
import ClassroomCard from '@/components/ClassroomCard';
import { getSchool } from '@/lib/data/schools';
import { getSystemsForSchool } from '@/lib/data/systems';
import { getClassroomsForSchool } from '@/lib/data/classrooms';

interface CampaignPageProps {
  params: Promise<{ schoolId: string }>;
}

export default async function CampaignPage({ params }: CampaignPageProps) {
  const { schoolId } = await params;
  const school = getSchool(schoolId);
  if (!school) notFound();

  const systems = getSystemsForSchool(schoolId);
  const classrooms = getClassroomsForSchool(schoolId);
  const totalGoal = systems.reduce((s, sys) => s + sys.goalUSD, 0);
  const totalRaised = systems.reduce((s, sys) => s + sys.raisedUSD, 0);
  const pct = Math.round((totalRaised / totalGoal) * 100);

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', paddingTop: 60, position: 'relative', overflow: 'hidden' }}>
      <MiniDoodles />
      <Doodle src="/uploads/IMG_8204.JPG" style={{ right: '-60px', top: '200px', width: '340px', zIndex: 0 }} />
      <Doodle src="/uploads/IMG_8202.JPG" style={{ left: '-50px', bottom: '200px', width: '380px', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)', position: 'relative', zIndex: 1 }}>
        <div style={{ marginBottom: 48 }}>
          <FadeUp>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <span className="eyebrow">Spring 2026 Campaign {'\u00B7'} Active</span>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5C8A5C' }} />
            </div>
          </FadeUp>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(24px, 5vw, 60px)',
              alignItems: 'end',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 18,
                  marginBottom: 16,
                  padding: '16px 20px',
                  background: 'rgba(237,234,226,0.94)',
                  borderTop: '1px solid var(--ink)',
                  borderBottom: '1px solid var(--rule)',
                  backdropFilter: 'blur(4px)',
                  maxWidth: '100%',
                }}
              >
                <img
                  src="/uploads/IMG_8198.PNG"
                  alt=""
                  style={{
                    width: 88,
                    height: 88,
                    objectFit: 'contain',
                    mixBlendMode: 'multiply',
                    opacity: 0.78,
                    flexShrink: 0,
                  }}
                />
                <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5.5vw,72px)', fontWeight: 400, lineHeight: 1.02, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 0 }}>
                  <LineReveal delay={0.05}>{school.name}</LineReveal>
                </h1>
              </div>
              <FadeUp delay={0.3}>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
                  {school.district} {'\u00B7'} Grades {school.grade} {'\u00B7'} {school.enrollment} students
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={0.2}>
              <div
                style={{
                  textAlign: 'right',
                  display: 'inline-flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifySelf: 'end',
                  padding: '18px 20px',
                  background: 'rgba(237,234,226,0.92)',
                  borderTop: '1px solid var(--ink)',
                  borderBottom: '1px solid var(--rule)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 500, color: 'var(--ink)' }}>
                  <CountUp to={String(pct)} suffix="%" />
                </div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: 4 }}>
                  of total need funded
                </div>
              </div>
            </FadeUp>
          </div>
        </div>

        <Rule />
        <div
          style={{
            padding: '24px 20px',
            marginBottom: 24,
            background: 'rgba(237,234,226,0.88)',
            borderTop: '1px solid var(--rule)',
            borderBottom: '1px solid var(--rule)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ height: 4, background: 'var(--rule)', marginBottom: 12 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: 'var(--ink)' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }}>
              ${totalRaised.toLocaleString()} funded
            </span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)' }}>
              ${(totalGoal - totalRaised).toLocaleString()} remaining of ${totalGoal.toLocaleString()}
            </span>
          </div>
        </div>

        <div style={{ paddingTop: 48 }}>
          <FadeUp>
            <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 12 }}>
              Systems in this campaign - contribute toward one
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.7, fontWeight: 300, marginBottom: 24, maxWidth: 620 }}>
              Each system groups the needs across every classroom. Contribute to a system and your funds are allocated across the classrooms it supports.
            </p>
          </FadeUp>
          <div>
            {systems.map((s) => (
              <SystemCard key={s.id} system={s} schoolId={school.id} />
            ))}
            <div style={{ borderTop: '1px solid var(--rule)' }} />
          </div>
          <div style={{ marginTop: 20 }}>
            <Link
              href={`/donate?schoolId=${school.id}&mode=greatest-need`}
              style={{
                display: 'inline-block',
                padding: '16px 32px',
                background: 'var(--ink)',
                color: 'var(--bg)',
                fontFamily: 'var(--sans)',
                fontSize: 13,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Contribute to greatest need {'\u2192'}</Link>
          </div>
        </div>

        <div style={{ marginTop: 80 }}>
          <FadeUp>
            <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 12 }}>
              Classrooms at this school
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.65, fontWeight: 300, marginBottom: 16, maxWidth: 620 }}>
              Classrooms are supported through systems. Select a classroom to see how each system shows up in the room.
            </p>
          </FadeUp>
          {classrooms.map((c, i) => (
            <ClassroomCard key={c.id} classroom={c} isLast={i === classrooms.length - 1} />
          ))}
        </div>

        <FadeUp delay={0.2}>
          <div style={{ marginTop: 64, padding: 32, background: 'var(--bg-warm)', borderTop: '2px solid var(--rule)' }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>
              Allocation transparency
            </div>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 14, lineHeight: 1.7, color: 'var(--ink-muted)', fontWeight: 300 }}>
              100% of your contribution goes to the system you select. Funds are allocated across the classrooms each system supports, weighted by remaining need. Purchases are fulfilled through district-approved vendors within 14 business days.
            </p>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
