'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import FadeUp from '@/components/FadeUp';
import LineReveal from '@/components/LineReveal';
import Rule from '@/components/Rule';
import DonationForm from '@/components/DonationForm';
import AllocationPreview from '@/components/AllocationPreview';
import { allocate, allocateToSingleSystem } from '@/lib/allocation';
import { ITEMS, getItem } from '@/lib/data/items';
import { SCHOOLS, getSchool } from '@/lib/data/schools';
import { SYSTEMS, getSystem } from '@/lib/data/systems';

// GITHUB PAGES DEMO: Read query params on the client and fall back to mock data
// so `/donate` can be exported as a static page. Remove this mode when wiring the
// real donation flow to a live backend.
export default function DonatePage() {
  const searchParams = useSearchParams();
  const fallbackSchool = SCHOOLS[0];
  const fallbackSystem = SYSTEMS[0];
  const fallbackItem = ITEMS[0];

  const schoolId = searchParams.get('schoolId') ?? fallbackSchool.id;
  const rawMode = searchParams.get('mode');
  const mode: 'system' | 'item' | 'greatest-need' =
    rawMode === 'system' || rawMode === 'item' ? rawMode : 'greatest-need';

  const school = getSchool(schoolId) ?? fallbackSchool;
  const system = getSystem(searchParams.get('systemId') ?? '') ?? fallbackSystem;
  const item = getItem(searchParams.get('itemId') ?? '') ?? fallbackItem;
  const amountValue = searchParams.get('amount');
  const parsedAmount = amountValue ? parseFloat(amountValue) : NaN;
  const amount = Number.isFinite(parsedAmount) && parsedAmount > 0 ? parsedAmount : undefined;

  let contextHeader: string;
  let contextSub: string;
  let previewTitle = 'Allocation preview';
  let previewNote = 'Select an amount to see how your contribution is allocated across classrooms and systems.';
  let slices = null as ReturnType<typeof allocate> | null;

  if (mode === 'system') {
    contextHeader = `Contribute to ${system.name}`;
    contextSub = system.description;
    if (amount) {
      slices = allocateToSingleSystem(amount, system);
      previewTitle = 'Preview · how this would be allocated';
      previewNote = `100% goes to ${system.name}, allocated across the ${system.classroomsSupported} classrooms it supports.`;
    }
  } else if (mode === 'item') {
    contextHeader = `Fulfill ${item.name}`;
    contextSub = item.whyItMatters;
    if (amount) {
      slices = allocateToSingleSystem(amount, system);
      previewTitle = 'Preview · how this would be allocated';
      previewNote = `100% goes to fulfilling this item within the ${system.name} system.`;
    }
  } else {
    contextHeader = 'Contribute to greatest need';
    contextSub = `Your contribution is split across the ${school.name} systems based on remaining need.`;
    if (amount) {
      slices = allocate(amount, school.id);
      previewTitle = 'Preview · how this would be allocated';
      previewNote = 'Split weighted by remaining need across each system.';
    }
  }

  return (
    <div className="screen-enter" style={{ minHeight: '100vh', paddingTop: 60, position: 'relative' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(40px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <FadeUp>
          <div className="eyebrow" style={{ marginBottom: 16 }}>
            {school.name}
          </div>
        </FadeUp>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,5vw,56px)', fontWeight: 400, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 16 }}>
          <LineReveal delay={0.05}>{contextHeader}</LineReveal>
        </h1>
        <FadeUp delay={0.15}>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 15, lineHeight: 1.75, color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 16, maxWidth: 640 }}>
            {contextSub}
          </p>
          <p style={{ fontFamily: 'var(--sans)', fontSize: 12, lineHeight: 1.7, color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 40, maxWidth: 640 }}>
            Demo preview only. This GitHub Pages version shows allocation behavior without a live donation backend.
          </p>
        </FadeUp>

        <Rule />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(28px, 6vw, 60px)',
            paddingTop: 40,
          }}
        >
          <FadeUp delay={0.2}>
            <div style={{ background: 'var(--bg-warm)', padding: 'clamp(22px, 4vw, 32px)', borderTop: '2px solid var(--ink)' }}>
              <DonationForm
                schoolId={school.id}
                mode={mode}
                systemId={mode === 'system' ? system.id : undefined}
                itemId={mode === 'item' ? item.id : undefined}
                classroomId={mode === 'item' ? item.classroomId : undefined}
                currentAmount={amount}
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            {slices ? (
              <AllocationPreview
                slices={slices}
                amountUSD={amount!}
                title={previewTitle}
                note={previewNote}
              />
            ) : (
              <div style={{ padding: 32, border: '1px dashed var(--rule)' }}>
                <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 12 }}>
                  {previewTitle}
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.7, fontWeight: 300 }}>
                  {previewNote}
                </p>
              </div>
            )}
          </FadeUp>
        </div>

        <FadeUp delay={0.4}>
          <div style={{ marginTop: 40 }}>
            <Link
              href={`/schools/${school.id}`}
              style={{
                fontFamily: 'var(--sans)',
                fontSize: 12,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}
            >
              ← Back to campaign
            </Link>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
