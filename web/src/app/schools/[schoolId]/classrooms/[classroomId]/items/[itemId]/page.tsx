import { ITEMS } from '@/lib/data/items';

export function generateStaticParams() {
  return ITEMS.map(i => ({
    schoolId: i.schoolId,
    classroomId: i.classroomId,
    itemId: i.id,
  }));
}

import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import LineReveal from '@/components/LineReveal';
import MiniDoodles from '@/components/MiniDoodles';
import Rule from '@/components/Rule';
import ProgressBar from '@/components/ProgressBar';
import DonationForm from '@/components/DonationForm';
import { getSchool } from '@/lib/data/schools';
import { getClassroom } from '@/lib/data/classrooms';
import { getSystem } from '@/lib/data/systems';
import { getItem } from '@/lib/data/items';

interface ItemPageProps {
  params: Promise<{ schoolId: string; classroomId: string; itemId: string }>;
}

export default async function ItemPage({ params }: ItemPageProps) {
  const { schoolId, classroomId, itemId } = await params;
  const school = getSchool(schoolId);
  const classroom = getClassroom(classroomId);
  const item = getItem(itemId);
  if (!school || !classroom || !item || item.classroomId !== classroomId) notFound();

  const system = getSystem(item.systemId);
  if (!system) notFound();

  const remaining = item.quantityNeeded - item.quantityFulfilled;
  const remainingUSD = remaining * item.unitCost;

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', paddingTop: 60, position: 'relative', overflow: 'hidden' }}>
      <MiniDoodles />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)', position: 'relative', zIndex: 1 }}>
        <FadeUp>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            Item fulfillment {'\u00B7'} Inside {system.name}
          </div>
        </FadeUp>
        <FadeUp delay={0.05}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', marginBottom: 8 }}>
            <Link href={`/schools/${school.id}`} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{school.name}</Link>
            {' \u00B7 '}
            <Link href={`/schools/${school.id}/classrooms/${classroom.id}`} style={{ textDecoration: 'underline', textUnderlineOffset: 3 }}>{classroom.teacher}&apos;s {classroom.grade}</Link>
          </p>
        </FadeUp>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 20,
            alignItems: 'end',
            marginBottom: 32,
          }}
        >
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,5vw,60px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 0 }}>
            <LineReveal delay={0.1}>{item.name}</LineReveal>
          </h1>
          <FadeUp delay={0.14}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
              <img
                src="/uploads/IMG_8198.PNG"
                alt=""
                style={{ width: 72, height: 72, objectFit: 'contain', mixBlendMode: 'multiply', opacity: 0.76 }}
              />
              <img
                src="/uploads/IMG_8199.PNG"
                alt=""
                style={{ width: 72, height: 72, objectFit: 'contain', mixBlendMode: 'multiply', opacity: 0.7 }}
              />
            </div>
          </FadeUp>
        </div>

        <Rule />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(28px, 6vw, 60px)',
            paddingTop: 40,
          }}
        >
          <div>
            <FadeUp delay={0.1}>
              <p style={{ fontFamily: 'var(--sans)', fontSize: 15, lineHeight: 1.8, color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 32 }}>
                {item.whyItMatters}
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <ProgressBar
                funded={item.quantityFulfilled}
                total={item.quantityNeeded}
                label={`${item.quantityFulfilled} of ${item.quantityNeeded} fulfilled`}
                showAmounts={false}
              />
            </FadeUp>

            <FadeUp delay={0.25}>
              <div style={{ marginTop: 24, padding: 20, background: 'var(--bg-warm)' }}>
                <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 8 }}>
                  Within the {system.name} system
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13, lineHeight: 1.7, color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 12 }}>
                  {system.allocationNote}
                </p>
                <Link
                  href={`/donate?schoolId=${school.id}&mode=system&systemId=${system.id}`}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--sans)',
                    fontSize: 12,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--ink)',
                    textDecoration: 'underline',
                    textUnderlineOffset: 4,
                  }}
                >
                  Contribute to the system instead {'\u2192'}</Link>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={0.3}>
            <div style={{ background: 'var(--bg-warm)', padding: 'clamp(22px, 4vw, 36px)', borderTop: '2px solid var(--ink)' }}>
              <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 16 }}>
                Fulfill this specific item
              </div>
              <div style={{ fontFamily: 'var(--serif)', fontSize: 44, fontWeight: 500, lineHeight: 1, marginBottom: 6 }}>
                ${remainingUSD}
              </div>
              <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)', marginBottom: 24 }}>
                to fully fulfill ({remaining} units {'\u00B7'} ${item.unitCost})
              </div>
              <DonationForm
                schoolId={school.id}
                mode="item"
                itemId={item.id}
                classroomId={classroom.id}
              />
            </div>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}
