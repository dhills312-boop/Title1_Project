import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import LineReveal from '@/components/LineReveal';
import MiniDoodles from '@/components/MiniDoodles';
import Doodle from '@/components/Doodle';
import Rule from '@/components/Rule';
import ProgressBar from '@/components/ProgressBar';
import ItemRow from '@/components/ItemRow';
import { getSchool } from '@/lib/data/schools';
import { getClassroom } from '@/lib/data/classrooms';
import { getSystem, getSystemsForSchool } from '@/lib/data/systems';
import { getItemsForClassroom } from '@/lib/data/items';

interface ClassroomPageProps {
  params: Promise<{ schoolId: string; classroomId: string }>;
}

export default async function ClassroomPage({ params }: ClassroomPageProps) {
  const { schoolId, classroomId } = await params;
  const school = getSchool(schoolId);
  const classroom = getClassroom(classroomId);
  if (!school || !classroom || classroom.schoolId !== schoolId) notFound();

  const systems = getSystemsForSchool(schoolId);
  const items = getItemsForClassroom(classroomId);

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', paddingTop: 60, position: 'relative', overflow: 'hidden' }}>
      <MiniDoodles />
      <Doodle src="/uploads/IMG_8208.JPG" style={{ right: '-40px', top: '100px', width: '300px', zIndex: 0 }} />
      <Doodle src="/uploads/IMG_8203.JPG" style={{ left: '-40px', bottom: '200px', width: '280px', zIndex: 0 }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)', position: 'relative', zIndex: 1 }}>
        <FadeUp>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            {school.name} · {classroom.grade}
          </div>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            alignItems: 'end',
          }}
        >
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,5.5vw,68px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.025em', color: 'var(--ink)', marginBottom: 0 }}>
            <LineReveal delay={0.05}>{classroom.teacher}&apos;s Classroom</LineReveal>
          </h1>
          <FadeUp delay={0.12}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <img
                src="/uploads/IMG_8198.PNG"
                alt=""
                style={{ width: 84, height: 84, objectFit: 'contain', mixBlendMode: 'multiply', opacity: 0.78 }}
              />
              <img
                src="/uploads/IMG_8199.PNG"
                alt=""
                style={{ width: 84, height: 84, objectFit: 'contain', mixBlendMode: 'multiply', opacity: 0.72 }}
              />
            </div>
          </FadeUp>
        </div>

        <div style={{ height: 48 }} />
        <Rule />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(28px, 6vw, 80px)',
            paddingTop: 48,
          }}
        >
          <div>
            <FadeUp delay={0.1}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 16, lineHeight: 1.85, color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 40 }}>
                {classroom.narrative}
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 24 }}>
                System progress in this classroom
              </div>
              {systems.map((system) => {
                const pct = classroom.systemProgress[system.id] ?? 0;
                return (
                  <ProgressBar
                    key={system.id}
                    funded={pct}
                    total={100}
                    label={system.name}
                    showAmounts={false}
                  />
                );
              })}
            </FadeUp>
          </div>

          <FadeUp delay={0.3}>
            <div style={{ background: 'var(--bg-warm)', padding: 'clamp(22px, 4vw, 36px)', borderTop: '2px solid var(--ink)' }}>
              <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 20 }}>
                Contribute to this classroom through a system
              </div>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.7, color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 20 }}>
                This classroom is supported through systems. Pick the system you want to back — your contribution is allocated to the classrooms it supports, weighted by need.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {systems.map((system) => (
                  <Link
                    key={system.id}
                    href={`/donate?schoolId=${school.id}&mode=system&systemId=${system.id}`}
                    style={{
                      padding: '12px 16px',
                      border: '1px solid var(--rule)',
                      color: 'var(--ink)',
                      fontFamily: 'var(--sans)',
                      fontSize: 13,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{system.name}</span>
                    <span style={{ fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      Contribute →
                    </span>
                  </Link>
                ))}
              </div>
              <div style={{ height: 24 }} />
              <Link
                href={`/donate?schoolId=${school.id}&mode=greatest-need`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px',
                  background: 'var(--ink)',
                  color: 'var(--bg)',
                  fontFamily: 'var(--sans)',
                  fontSize: 13,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Contribute to greatest need →
              </Link>
            </div>
          </FadeUp>
        </div>

        {items.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <FadeUp>
              <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 10 }}>
                Specific items in this classroom
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.65, fontWeight: 300, marginBottom: 16, maxWidth: 620 }}>
                Each item sits inside a system. Fulfilling an item is a secondary way to contribute — most donors should contribute to the system instead.
              </p>
            </FadeUp>
            {items.map((item) => {
              const system = getSystem(item.systemId)!;
              return (
                <ItemRow
                  key={item.id}
                  item={item}
                  system={system}
                  schoolId={school.id}
                  classroomId={classroom.id}
                />
              );
            })}
            <div style={{ borderTop: '1px solid var(--rule)' }} />
          </div>
        )}
      </div>
    </div>
  );
}
