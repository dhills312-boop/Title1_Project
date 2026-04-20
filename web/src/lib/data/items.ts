import type { Item } from '../types';

export const ITEMS: Item[] = [
  {
    id: 'item-headphones',
    schoolId: 'spring-hill',
    classroomId: 'tarver-5',
    systemId: 'reading-writing',
    name: 'Over-ear headphones',
    unitCost: 18,
    quantityNeeded: 22,
    quantityFulfilled: 14,
    whyItMatters:
      'Independent reading blocks use audiobooks paired with text. Without headphones, students share sets across rotations and lose minutes each transition.',
  },
  {
    id: 'item-leveled-readers',
    schoolId: 'spring-hill',
    classroomId: 'tarver-5',
    systemId: 'reading-writing',
    name: 'Leveled readers (Grades 3–5)',
    unitCost: 12,
    quantityNeeded: 60,
    quantityFulfilled: 38,
    whyItMatters:
      'Students read at levels spanning three grades. One set per level means every reader finds a book that fits.',
  },
  {
    id: 'item-dry-erase',
    schoolId: 'spring-hill',
    classroomId: 'ellis-3',
    systemId: 'reading-writing',
    name: 'Dry erase boards + markers',
    unitCost: 6,
    quantityNeeded: 24,
    quantityFulfilled: 20,
    whyItMatters:
      'Whole-class response checks in reading and writing. Replaces raised hands with a visible answer from every student.',
  },
  {
    id: 'item-storage-bins',
    schoolId: 'spring-hill',
    classroomId: 'ellis-3',
    systemId: 'organization',
    name: 'Labeled storage bins',
    unitCost: 9,
    quantityNeeded: 30,
    quantityFulfilled: 12,
    whyItMatters:
      'Each bin holds one subject or routine. Clear labeling removes 3–4 minutes of searching per transition.',
  },
  {
    id: 'item-building-blocks',
    schoolId: 'spring-hill',
    classroomId: 'tarver-5',
    systemId: 'stem-engagement',
    name: 'Building block kits',
    unitCost: 35,
    quantityNeeded: 8,
    quantityFulfilled: 3,
    whyItMatters:
      'Weekly STEM blocks pair students in teams of three. Kits are shared across rotations.',
  },
  {
    id: 'item-cleaning-supplies',
    schoolId: 'spring-hill',
    classroomId: 'dowd-k',
    systemId: 'operations',
    name: 'Cleaning supply kit (monthly)',
    unitCost: 22,
    quantityNeeded: 12,
    quantityFulfilled: 5,
    whyItMatters:
      'A kindergarten room resets four times a day. Monthly kits cover sanitizer, wipes, and tissues.',
  },
  {
    id: 'item-flexible-seating',
    schoolId: 'spring-hill',
    classroomId: 'nguyen-1',
    systemId: 'classroom-environment',
    name: 'Floor cushions',
    unitCost: 14,
    quantityNeeded: 21,
    quantityFulfilled: 13,
    whyItMatters:
      '1st graders rotate between chairs, rug, and stations. One cushion per student keeps the floor block working.',
  },
];

export function getItem(id: string): Item | undefined {
  return ITEMS.find((i) => i.id === id);
}

export function getItemsForSystem(schoolId: string, systemId: string): Item[] {
  return ITEMS.filter((i) => i.schoolId === schoolId && i.systemId === systemId);
}

export function getItemsForClassroom(classroomId: string): Item[] {
  return ITEMS.filter((i) => i.classroomId === classroomId);
}
