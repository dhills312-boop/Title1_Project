import { NextResponse } from 'next/server';
import { getSystem } from '@/lib/data/systems';
import { getItemsForSystem } from '@/lib/data/items';

interface RouteParams {
  params: Promise<{ systemId: string }>;
}

// GET /api/systems/:systemId
// TODO: replace mock with SELECT on systems and items filtered by system_id.
export async function GET(_req: Request, { params }: RouteParams) {
  const { systemId } = await params;
  const system = getSystem(systemId);
  if (!system) {
    return NextResponse.json({ error: 'system_not_found' }, { status: 404 });
  }
  return NextResponse.json({
    system,
    items: getItemsForSystem(system.schoolId, systemId),
  });
}
