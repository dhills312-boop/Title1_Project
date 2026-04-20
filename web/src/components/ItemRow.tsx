import Link from 'next/link';
import type { Item, System } from '@/lib/types';

interface ItemRowProps {
  item: Item;
  system: System;
  schoolId: string;
  classroomId: string;
}

export default function ItemRow({ item, system, schoolId, classroomId }: ItemRowProps) {
  const pct = Math.round((item.quantityFulfill ?<Link
      href={`/schools/${schoolId}/classrooms/${classroomId}/items/${item.id}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 16,
        alignItems: 'start',
        padding: '18px 0',
        borderTop: '1px solid var(--rule)',
        color: 'var(--ink)',
      }}
    >
      <div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--ink)', marginBottom: 4 }}>
          {item.name}
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-muted)', letterSpacing: '0.04em' }}>
          Within {system.name} ? ${item.unitCost} per unit
        </div>
      </div>
      <div>
        <div style={{ height: 2, background: 'var(--rule)', marginBottom: 6 }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--ink)' }} />
        </div>
        <div style={{ fontFamily: 'var(--sans)', fontSize: 11, color: 'var(--ink-muted)' }}>
          {item.quantityFulfilled} of {item.quantityNeeded} fulfilled ? {remaining} remaining
        </div>
      </div>
      <div style={{ fontFamily: 'var(--sans)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-muted)' }}>
        Fulfill →
      </div>
    </Link>
  );
}
