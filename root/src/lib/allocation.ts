import type { AllocationSlice, System } from './types';
import { getSystemsForSchool } from './data/systems';

/**
 * Allocates a contribution across all open systems at a school, weighted by
 * remaining need. A system already at goal gets 0; a system farther from goal
 * gets proportionally more.
 */
export function allocate(amountUSD: number, schoolId: string): AllocationSlice[] {
  const systems = getSystemsForSchool(schoolId);
  const remainingBySystem = systems.map((s) => ({
    system: s,
    remaining: Math.max(0, s.goalUSD - s.raisedUSD),
  }));
  const totalRemaining = remainingBySystem.reduce((sum, r) => sum + r.remaining, 0);

  if (totalRemaining === 0) {
    const even = amountUSD / systems.length;
    return systems.map((s) => ({
      systemId: s.id,
      systemName: s.name,
      pct: Math.round((1 / systems.length) * 100),
      usd: Math.round(even * 100) / 100,
    }));
  }

  const slices: AllocationSlice[] = remainingBySystem.map(({ system, remaining }) => {
    const pct = remaining / totalRemaining;
    return {
      systemId: system.id,
      systemName: system.name,
      pct: Math.round(pct * 100),
      usd: Math.round(amountUSD * pct * 100) / 100,
    };
  });

  return slices.filter((s) => s.usd > 0);
}

export function allocateToSingleSystem(
  amountUSD: number,
  system: System,
): AllocationSlice[] {
  return [
    {
      systemId: system.id,
      systemName: system.name,
      pct: 100,
      usd: amountUSD,
    },
  ];
}
