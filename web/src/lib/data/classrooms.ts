import type { Classroom } from '../types';

export const CLASSROOMS: Classroom[] = [
  {
    id: 'tarver-5',
    schoolId: 'spring-hill',
    teacher: 'Ms. Tarver',
    grade: '5th Grade',
    students: 22,
    narrative:
      "Ms. Tarver's 5th grade class runs on a daily reading block followed by writing workshop. The room also blends in maker-style materials and flexible grouping, so instructional supplies need to support both literacy growth and hands-on work.",
    systemProgress: {
      'reading-writing': 72,
      organization: 58,
      'stem-engagement': 34,
      'classroom-environment': 65,
      operations: 48,
    },
  },
  {
    id: 'ellis-3',
    schoolId: 'spring-hill',
    teacher: 'Mr. Ellis',
    grade: '3rd Grade',
    students: 24,
    narrative:
      "Mr. Ellis's 3rd grade class is the first year students spend the full day with a single teacher. The room depends on clear systems - labeled bins, folders per student, predictable routines - to keep 24 eight-year-olds focused across six subject blocks.",
    systemProgress: {
      'reading-writing': 68,
      organization: 52,
      'stem-engagement': 28,
      'classroom-environment': 60,
      operations: 42,
    },
  },
  {
    id: 'nguyen-1',
    schoolId: 'spring-hill',
    teacher: 'Ms. Nguyen',
    grade: '1st Grade',
    students: 21,
    narrative:
      "Ms. Nguyen's 1st grade class is where students learn what school feels like. Floor seating, phonics kits, and decodable books carry the year.",
    systemProgress: {
      'reading-writing': 74,
      organization: 55,
      'stem-engagement': 30,
      'classroom-environment': 68,
      operations: 46,
    },
  },
  {
    id: 'patel-4',
    schoolId: 'spring-hill',
    teacher: 'Mr. Patel',
    grade: '4th Grade',
    students: 23,
    narrative:
      "Mr. Patel's 4th grade class shifts from learning-to-read into reading-to-learn. Research notebooks and reference materials drive the work.",
    systemProgress: {
      'reading-writing': 70,
      organization: 56,
      'stem-engagement': 32,
      'classroom-environment': 62,
      operations: 45,
    },
  },
  {
    id: 'dowd-k',
    schoolId: 'spring-hill',
    teacher: 'Ms. Dowd',
    grade: 'Kindergarten',
    students: 19,
    narrative:
      "Ms. Dowd's kindergarten runs on stations, routines, and tactile materials. The room resets four times a day.",
    systemProgress: {
      'reading-writing': 71,
      organization: 54,
      'stem-engagement': 26,
      'classroom-environment': 66,
      operations: 44,
    },
  },
];

export function getClassroom(id: string): Classroom | undefined {
  return CLASSROOMS.find((c) => c.id === id);
}

export function getClassroomsForSchool(schoolId: string): Classroom[] {
  return CLASSROOMS.filter((c) => c.schoolId === schoolId);
}
