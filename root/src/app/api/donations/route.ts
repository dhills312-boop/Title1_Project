import { NextResponse } from 'next/server';
import { getSchool } from '@/lib/data/schools';
import { getSystem } from '@/lib/data/systems';
import { getItem } from '@/lib/data/items';
import { allocate, allocateToSingleSystem } from '@/lib/allocation';

interface DonationBody {
  schoolId: string;
  amountUSD: number;
  mode: 'system' | 'item' | 'greatest-need';
  systemId?: string;
  itemId?: string;
}

// POST /api/donations
// TODO: replace mock response with a real transaction:
//   BEGIN;
//   INSERT INTO donations (school_id, amount_usd, mode, system_id, item_id) VALUES (...) RETURNING id;
//   INSERT INTO donation_allocations (donation_id, system_id, pct, usd) VALUES ... (one per allocation slice);
//   (optional) INSERT INTO item_fulfillments (...) when mode = 'item';
//   UPDATE systems SET raised_usd = raised_usd + slice.usd WHERE id = slice.system_id;
//   COMMIT;
export async function POST(req: Request) {
  const body = (await req.json()) as DonationBody;

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }
  if (!body.schoolId || !getSchool(body.schoolId)) {
    return NextResponse.json({ error: 'school_not_found' }, { status: 404 });
  }
  if (!Number.isFinite(body.amountUSD) || body.amountUSD <= 0) {
    return NextResponse.json({ error: 'invalid_amount' }, { status: 400 });
  }
  if (!['system', 'item', 'greatest-need'].includes(body.mode)) {
    return NextResponse.json({ error: 'invalid_mode' }, { status: 400 });
  }

  const system = body.systemId ? getSystem(body.systemId) : undefined;
  const item = body.itemId ? getItem(body.itemId) : undefined;

  const slices =
    body.mode === 'system' && system
      ? allocateToSingleSystem(body.amountUSD, system)
      : allocate(body.amountUSD, body.schoolId);

  return NextResponse.json(
    {
      donation: {
        id: `mock_${Date.now()}`,
        schoolId: body.schoolId,
        amountUSD: body.amountUSD,
        mode: body.mode,
        systemId: system?.id,
        itemId: item?.id,
        createdAt: new Date().toISOString(),
      },
      allocations: slices,
    },
    { status: 201 },
  );
}
