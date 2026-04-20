import Link from 'next/link';
import type { Classroom } from '@/lib/types';

interface ClassroomCardProps {
  classroom: Classroom;
  isLast?: boolean;
}

export default function ClassroomCard({ classroom, isLast }: ClassroomCardProps) {
  const avgPct = Math.round(
    Object.values(classroom.systemProgress).reduce((s, v) => s + v, 0) /
      Object.values(classroom.systemProgress).length,
  );
  return (
    <Link
      href={`/schools/${classroom.schoolId}/classrooms/${classroom.id}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: 18,
        alignItems: 'start',
        borderTop: '1px solid var(--rule)',
        borderBottom: isLast ? '1px solid var(--rule)' : 'none',
        padding: '28px 16px',
        color: 'var(--ink)',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 400, color: 'var(--ink)', marginBottom: 4 }}>
          {classroom.teacher}
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
          {classroom.grade} · {classroom.students} students
        </div>
      </div>
      <div>
        <div style={{ height: 2, background: 'var(--rule)', marginBottom: 6 }}>
          <div style={{ height: '100%', width: `${avgPct}%`, background: 'var(--ink)' }} />
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-muted)' }}>
          {avgPct}% across systems
        </div>
      </div>
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, color: 'var(--ink)' }}>
          {Object.keys(classroom.systemProgress).length}
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-muted)' }}>systems active</div>
      </div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
        View →
      </div>
    </Link>
  );
}
