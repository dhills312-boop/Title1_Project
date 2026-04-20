import type { Item } from '../types';

export const ITEMS: Item[] = [
  {
    id: 'item-expo-markers',
    schoolId: 'spring-hill',
    classroomId: 'tarver-5',
    systemId: 'reading-writing',
    name: 'EXPO fine tip dry erase markers (36-count)',
    unitCost: 25,
    quantityNeeded: 1,
    quantityFulfilled: 0,
    whyItMatters:
      'Modeled writing, small-group checks, and table work all rely on fresh markers students can see from across the room.',
  },
  {
    id: 'item-privacy-folders',
    schoolId: 'spring-hill',
    classroomId: 'tarver-5',
    systemId: 'organization',
    name: 'Student desk privacy folders (16-pack)',
    unitCost: 30,
    quantityNeeded: 2,
    quantityFulfilled: 0,
    whyItMatters:
      'Privacy folders create quieter independent work time during tests, writing prompts, and intervention blocks without rearranging the room.',
  },
  {
    id: 'item-building-blocks',
    schoolId: 'spring-hill',
    classroomId: 'tarver-5',
    systemId: 'stem-engagement',
    name: '1,500-piece classic building brick set',
    unitCost: 32,
    quantityNeeded: 1,
    quantityFulfilled: 0,
    whyItMatters:
      'Hands-on building sets support STEM rotations and collaborative problem-solving when students move from reading into applied projects.',
  },
  {
    id: 'item-copy-paper',
    schoolId: 'spring-hill',
    classroomId: 'tarver-5',
    systemId: 'operations',
    name: 'Multipurpose copy paper (5 reams)',
    unitCost: 26,
    quantityNeeded: 1,
    quantityFulfilled: 0,
    whyItMatters:
      'Daily practice packets, intervention printouts, and take-home work all depend on a steady paper supply teachers usually cover themselves.',
  },
  {
    id: 'item-flex-seating-stools',
    schoolId: 'spring-hill',
    classroomId: 'tarver-5',
    systemId: 'classroom-environment',
    name: 'Macaron nesting stools (6-pack)',
    unitCost: 80,
    quantityNeeded: 1,
    quantityFulfilled: 0,
    whyItMatters:
      'Small seating options make it easier to break the room into intervention groups, partner stations, and quick conference moments.',
  },
  {
    id: 'item-presenter-clicker',
    schoolId: 'spring-hill',
    classroomId: 'tarver-5',
    systemId: 'operations',
    name: 'Wireless presentation clicker',
    unitCost: 10,
    quantityNeeded: 1,
    quantityFulfilled: 0,
    whyItMatters:
      'A simple presenter lets instruction keep moving while the teacher circulates instead of returning to the board every transition.',
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
      'Each bin holds one subject or routine. Clear labeling removes 3 to 4 minutes of searching per transition.',
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
