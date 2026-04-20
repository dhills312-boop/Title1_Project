export interface School {
  id: string;
  name: string;
  location: string;
  district: string;
  grade: string;
  enrollment: number;
  frlPercent: number;
  classroomsCount: number;
  systemIds: string[];
}

export interface System {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  goalUSD: number;
  raisedUSD: number;
  classroomsSupported: number;
  allocationNote: string;
}

export interface Classroom {
  id: string;
  schoolId: string;
  teacher: string;
  grade: string;
  students: number;
  narrative: string;
  systemProgress: Record<string, number>;
}

export interface Item {
  id: string;
  schoolId: string;
  classroomId: string;
  systemId: string;
  name: string;
  unitCost: number;
  quantityNeeded: number;
  quantityFulfilled: number;
  whyItMatters: string;
}

export interface DonationOptionPreset {
  amountUSD: number;
  label: string;
  impactNote: string;
}

export interface AllocationSlice {
  systemId: string;
  systemName: string;
  pct: number;
  usd: number;
}

export interface Donation {
  id: string;
  schoolId: string;
  amountUSD: number;
  mode: 'system' | 'item' | 'greatest-need';
  systemId?: string;
  itemId?: string;
  createdAt: string;
}
