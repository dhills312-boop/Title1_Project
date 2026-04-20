import { notFound } from 'next/navigation';
import FadeUp from '@/components/FadeUp';
import LineReveal from '@/components/LineReveal';
import AllocationPreview from '@/components/AllocationPreview';
import ReceiptBlock from '@/components/ReceiptBlock';
import { getSchool } from '@/lib/data/schools';
import { getSystem } from '@/lib/data/systems';
import { getItem } from '@/lib/data/items';
import { getClassroom } from '@/lib/data/classrooms';
import { allocate, allocateToSingleSystem } from '@/lib/allocation';

interface ConfirmPageProps {
  searchParams: Promise<{
    schoolId?: string;
    mode?: string;
    systemId?: string;
    itemId?: string;
    classroomId?: string;
    amount?: string;
  }>;
}

export default async function ConfirmPage({ searchParams }: ConfirmPageProps) {
  const params = await searchParams;
  const schoolId = params.schoolId;
  const amount = params.amount ? parseFloat(params.amount) : NaN;
  const modeParam = params.mode ?? 'greatest-need';
  const mode: 'system' | 'item' | 'greatest-need' =
    modeParam === 'system' || modeParam === 'item' ? modeParam : 'greatest-need';

  const school = schoolId ? getSchool(schoolId) : undefined;
  if (!school || !Number.isFinite(amount) || amount <= 0) notFound();

  const system = params.systemId ? getSystem(params.systemId) : undefined;
  const item = params.itemId ? getItem(params.itemId) : undefined;
  const classroom = params.classroomId ? getClassroom(params.classroomId) : undefined;

  const slices =
    mode === 'system' && system
      ? allocateToSingleSystem(amount, system)
      : allocate(amount, school.id);

  let targetLabel: string;
  if (mode === 'system' && system) targetLabel = system.name;
  else if (mode === 'item' && item) targetLabel = item.name;
  else targetLabel = 'Greatest need (school-wide)';

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
