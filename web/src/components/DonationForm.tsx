'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DONATION_PRESETS } from '@/lib/data/donationOptions';

interface DonationFormProps {
  schoolId: string;
  mode: 'system' | 'item' | 'greatest-need';
  systemId?: string;
  itemId?: string;
  classroomId?: string;
  currentAmount?: number;
}

export default function DonationForm({
  schoolId,
  mode,
  systemId,
  itemId,
  classroomId,
  currentAmount,
}: DonationFormProps) {
  const router = useRouter();
  const [preset, setPreset] = useState<number | null>(currentAmount ?? null);
  const [custom, setCustom] = useState<string>('');

  const amount = custom ? parseFloat(custom) : preset;
  const ready = !!amount && amount > 0;

  function continueToConfirm() {
    if (!ready) return;
    const params = new URLSearchParams({
      schoolId,
      amount: String(amount),
      mode,
    });
    if (systemId) params.set('systemId', systemId);
    if (itemId) params.set('itemId', itemId);
    if (classroomId) params.set('classroomId', classroomId);
    router.push(`/donate/confirm?${params.toString()}`);
  }

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <div
          style={{
            fontFamily: 'var(--sans)',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ink-muted)',
            marginBottom: 12,
          }}
        >
          Amount
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 10 }}>
          {DONATION_PRESETS.map((p) => {
            const active = preset === p.amountUSD && !custom;
            return (
              <button
                key={p.amountUSD}
                type="button"
                onClick={() => {
                  setPreset(p.amountUSD);
                  setCustom('');
                }}
                style={{
                  padding: '11px 0',
                  border: `1px solid ${active ? 'var(--ink)' : 'var(--rule)'}`,
                  background: active ? 'var(--ink)' : 'transparent',
                  color: active ? 'var(--bg)' : 'var(--ink)',
                  fontFamily: 'var(--sans)',
                  fontSize: 14,
                  cursor: 'pointer',
                }}
              >
                {p.label}
              </button>
            );
          })}
        </div>
        <input
          type="number"
          min="1"
          placeholder="Other amount"
          value={custom}
          onChange={(e) => {
            setCustom(e.target.value);
            setPreset(null);
          }}
          style={{
            width: '100%',
            padding: '11px 14px',
            border: '1px solid var(--rule)',
            background: 'transparent',
            fontFamily: 'var(--sans)',
            fontSize: 14,
            color: 'var(--ink)',
            outline: 'none',
          }}
        />
      </div>
      <button
        type="button"
        onClick={continueToConfirm}
        disabled={!ready}
        style={{
          width: '100%',
          padding: '17px',
          background: ready ? 'var(--ink)' : 'var(--rule)',
          border: 'none',
          color: ready ? 'var(--bg)' : 'var(--ink-muted)',
          fontFamily: 'var(--sans)',
          fontSize: 13,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          cursor: ready ? 'pointer' : 'default',
        }}
      >
        {ready ? `Review $${amount} allocation →` : 'Select an amount'}
      </button>
      <p
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 11,
          color: 'var(--ink-muted)',
          lineHeight: 1.65,
          marginTop: 16,
          fontWeight: 300,
        }}
      >
        100% of your contribution goes to the classroom need you select. No fees.
      </p>
    </div>
  );
}
