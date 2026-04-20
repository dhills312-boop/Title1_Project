import type { System } from '../types';

export const SYSTEMS: System[] = [
  {
    id: 'reading-writing',
    schoolId: 'spring-hill',
    name: 'Reading & Writing',
    description:
      'Daily reading blocks, leveled readers, and writing workshop materials across all grades.',
    goalUSD: 3200,
    raisedUSD: 2240,
    classroomsSupported: 5,
    allocationNote:
      'Funds are split across classrooms based on roster size. Materials rotate between rooms on a 6-week cycle.',
  },
  {
    id: 'organization',
    schoolId: 'spring-hill',
    name: 'Organization',
    description:
      'Storage bins, folders, and labeling supplies that keep each classroom running through the day.',
    goalUSD: 1600,
    raisedUSD: 880,
    classroomsSupported: 5,
    allocationNote:
      'Replenished each quarter. Supports daily instruction across 5 classrooms.',
  },
  {
    id: 'stem-engagement',
    schoolId: 'spring-hill',
    name: 'STEM Engagement',
    description:
      'Building blocks, measurement tools, and hands-on kits used during weekly STEM blocks.',
    goalUSD: 2800,
    raisedUSD: 840,
    classroomsSupported: 3,
    allocationNote:
      'Kits are shared across 3 classrooms. Funds purchase consumable components replaced each semester.',
  },
  {
    id: 'classroom-environment',
    schoolId: 'spring-hill',
    name: 'Classroom Environment',
    description:
      'Rugs, seating alternatives, and display materials that make the room a place students want to be.',
    goalUSD: 2400,
    raisedUSD: 1488,
    classroomsSupported: 5,
    allocationNote:
      'Allocated by classroom on a request basis. Purchases are made through district-approved vendors.',
  },
  {
    id: 'operations',
    schoolId: 'spring-hill',
    name: 'Operations',
    description:
      'Cleaning supplies, tissues, and sanitizer that classrooms depend on weekly.',
    goalUSD: 1200,
    raisedUSD: 540,
    classroomsSupported: 5,
    allocationNote:
      'Replenished monthly. Supports daily operation of all 5 classrooms.',
  },
];

export function getSystem(id: string): System | undefined {
  return SYSTEMS.find((s) => s.id === id);
}

export function getSystemsForSchool(schoolId: string): System[] {
  return SYSTEMS.filter((s) => s.schoolId === schoolId);
}
