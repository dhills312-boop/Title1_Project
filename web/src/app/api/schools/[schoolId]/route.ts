import { NextResponse } from 'next/server';
import { getSchool } from '@/lib/data/schools';
import { getSystemsForSchool } from '@/lib/data/systems';
import { getClassroomsForSchool } from '@/lib/data/classrooms';

interface RouteParams {
  params: Promise<{ schoolId: string }>;
}

// GET /api/schools/:schoolId
// TODO: replace mock with joined query across schools + systems + classrooms.
export async function GET(_req: Request, { params }: RouteParams) {
  const { schoolId } = await params;
  const school = getSchool(schoolId);
  if (!school) {
    return NextResponse.json({ error: 'school_not_found' }, { status: 404 });
  }
  return NextResponse.json({
    school,
    systems: getSystemsForSchool(schoolId),
    classrooms: getClassroomsForSchool(schoolId),
  });
}
