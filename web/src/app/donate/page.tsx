import { notFound } from 'next/navigation';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import LineReveal from '@/components/LineReveal';
import Rule from '@/components/Rule';
import DonationForm from '@/components/DonationForm';
import AllocationPreview from '@/components/AllocationPreview';
import { getSchool } from '@/lib/data/schools';
import { getSystem } from '@/lib/data/systems';
import { getItem } from '@/lib/data/items';
import { allocate, allocateToSingleSystem } from '@/lib/allocation';

interface DonatePageProps {
  searchParams: Promise<{
    schoolId?: string;
    mode?: string;
    systemId?: string;
    itemId?: string;
    classroomId?: string;
    amount?: string;
  }>;
}

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const params = await searchParams;
  const schoolId = params.schoolId;
  const modeParam = params.mode ?? 'greatest-need';
  const mode: 'system' | 'item' | 'greatest-need' =
    modeParam === 'system' || modeParam === 'item' ? modeParam : 'greatest-need';

  const school = schoolId ? getSchool(schoolId) : undefined;
  if (!school) notFound();

  const system = params.systemId ? getSystem(params.systemId) : undefined;
  const item = params.itemId ? getItem(params.itemId) : undefined;
  const amount = params.amount ? parseFloat(params.amount) : undefined;

  let contextHeader: string;
  let contextSub: string;
  if (mode === 'system' && system) {
    contextHeader = `Contribute to ${system.name}`;
    contextSub = system.description;
  } else if (mode === 'item' && item) {
    contextHeader = `Fulfill ${item.name}`;
    contextSub = item.whyItMatters;
  } else {
    contextHeader = 'Contribute to greatest need';
    contextSub = `Your contribution is split across the ${school.name} systems based on remaining need.`;
  }

  const slices = amount
    ? mode === 'system' && system
      ? allocateToSingleSystem(amount, system)
      : allocate(amount, school.id)
    : null;

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
          <p style={{ fontFamily: 'var(--sans)', fontSize: 15, lineHeight: 1.75, color: 'var(--ink-muted)', fontWeight: 300, marginBottom: 40, maxWidth: 640 }}>
            {contextSub}
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
                systemId={system?.id}
                itemId={item?.id}
                classroomId={params.classroomId}
                currentAmount={amount}
              />
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            {slices ? (
              <AllocationPreview
                slices={slices}
                amountUSD={amount!}
                title={'Preview \u00B7 how this would be allocated'}
                note={
                  mode === 'system'
                    ? `100% goes to ${system!.name}, allocated across the ${system!.classroomsSupported} classrooms it supports.`
                    : mode === 'item'
                      ? `100% goes to fulfilling this item within the ${system?.name ?? 'matching'} system.`
                      : 'Split weighted by remaining need across each system.'
                }
              />
            ) : (
              <div style={{ padding: 32, border: '1px dashed var(--rule)' }}>
                <div className="eyebrow" style={{ color: 'var(--ink-muted)', marginBottom: 12 }}>
                  Allocation preview
                </div>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.7, fontWeight: 300 }}>
                  Select an amount to see how your contribution is allocated across classrooms and systems.
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
              {'\u2190'} Back to campaign
            </Link>
          </div>
        </FadeUp>
      </div>
    </div>
  );
}
