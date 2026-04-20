import { NextResponse } from 'next/server';
import { SCHOOLS } from '@/lib/data/schools';

// GET /api/schools
// TODO: replace mock with: SELECT id, name, location, district, grade_range, enrollment, frl_percent, classrooms_count FROM schools;
export async function GET() {
  return NextResponse.json({ schools: SCHOOLS });
}
