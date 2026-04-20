'use client';

import { useSearchParams } from 'next/navigation';
import FadeUp from '@/components/FadeUp';
import LineReveal from '@/components/LineReveal';
import AllocationPreview from '@/components/AllocationPreview';
import ReceiptBlock from '@/components/ReceiptBlock';
import { allocate, allocateToSingleSystem } from '@/lib/allocation';
import { CLASSROOMS, getClassroom } from '@/lib/data/classrooms';
import { ITEMS, getItem } from '@/lib/data/items';
import { SCHOOLS, getSchool } from '@/lib/data/schools';
import { SYSTEMS, getSystem } from '@/lib/data/systems';

// GITHUB PAGES DEMO: Keep `/donate/confirm` exportable by resolving its state
// from client-side query params with mock fallbacks instead of a live server flow.
// Remove this mode when wiring real donation confirmation.
export default function ConfirmPage() {
  const searchParams = useSearchParams();
  const fallbackSchool = SCHOOLS[0];
  const fallbackSystem = SYSTEMS[0];
  const fallbackItem = ITEMS[0];
  const fallbackClassroom = CLASSROOMS[0];

  const school = getSchool(searchParams.get('schoolId') ?? '') ?? fallbackSchool;
  const amountValue = searchParams.get('amount');
  const parsedAmount = amountValue ? parseFloat(amountValue) : NaN;
  const amount = Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : 100;
  const rawMode = searchParams.get('mode');
  const mode: 'system' | 'item' | 'greatest-need' =
    rawMode === 'system' || rawMode === 'item' ? rawMode : 'greatest-need';

  const system = getSystem(searchParams.get('systemId') ?? '') ?? fallbackSystem;
  const item = getItem(searchParams.get('itemId') ?? '') ?? fallbackItem;
  const classroom = getClassroom(searchParams.get('classroomId') ?? '') ?? fallbackClassroom;

  const slices =
    mode === 'system' || mode === 'item'
      ? allocateToSingleSystem(amount, system)
      : allocate(amount, school.id);

  let targetLabel = 'Greatest need (school-wide)';
  if (mode === 'system') targetLabel = system.name;
  if (mode === 'item') targetLabel = item.name;

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', paddingTop: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px clamp(24px,5vw,80px)' }}>
      <div style={{ maxWidth: 640, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <FadeUp>
            <div className="eyebrow" style={{ marginBottom: 20 }}>
              Allocation confirmed
            </div>
          </FadeUp>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(30px,5vw,54px)', fontWeight: 400, lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--ink)' }}>
            <LineReveal delay={0.1}>Thank you for funding</LineReveal>
            <LineReveal delay={0.2}>{school.name}.</LineReveal>
          </h1>
          <FadeUp delay={0.28}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.7, color: 'var(--ink-muted)', fontWeight: 300, marginTop: 18 }}>
              Demo confirmation only. This receipt is a static preview for GitHub Pages.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.3}>
          <div style={{ marginBottom: 36 }}>
            <AllocationPreview
              slices={slices}
              amountUSD={amount}
              title="Allocation breakdown"
            />
          </div>
        </FadeUp>

        <FadeUp delay={0.45}>
          <ReceiptBlock
            amountUSD={amount}
            schoolName={`${school.name}, ${school.location}`}
            mode={mode}
            targetLabel={targetLabel}
            studentsImpacted={classroom?.students}
            schoolId={school.id}
          />
        </FadeUp>
      </div>
    </div>
  );
}
