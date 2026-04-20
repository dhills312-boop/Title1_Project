import type { School } from '../types';

export const SCHOOLS: School[] = [
  {
    id: 'spring-hill',
    name: 'Spring Hill Elementary School',
    location: 'Baltimore, MD',
    district: 'Fayette County Schools',
    grade: 'K–5',
    enrollment: 398,
    frlPercent: 91,
    classroomsCount: 5,
    systemIds: [
      'reading-writing',
      'organization',
      'stem-engagement',
      'classroom-environment',
      'operations',
    ],
  },
];

export function getSchool(id: string): School | undefined {
  return SCHOOLS.find((s) => s.id === id);
}
