import { NextResponse } from 'next/server';
import { getClassroom } from '@/lib/data/classrooms';
import { getItemsForClassroom } from '@/lib/data/items';

interface RouteParams {
  params: Promise<{ classroomId: string }>;
}

// GET /api/classrooms/:classroomId
// TODO: replace mock with SELECT on classrooms + classroom_system_progress + items.
export async function GET(_req: Request, { params }: RouteParams) {
  const { classroomId } = await params;
  const classroom = getClassroom(classroomId);
  if (!classroom) {
    return NextResponse.json({ error: 'classroom_not_found' }, { status: 404 });
  }
  return NextResponse.json({
    classroom,
    items: getItemsForClassroom(classroomId),
  });
}
