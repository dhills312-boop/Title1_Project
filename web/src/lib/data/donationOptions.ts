import type { DonationOptionPreset } from '../types';

export const DONATION_PRESETS: DonationOptionPreset[] = [
  {
    amountUSD: 25,
    label: '$25',
    impactNote: 'Covers one classroom supply kit for a week.',
  },
  {
    amountUSD: 50,
    label: '$50',
    impactNote: 'Fulfills two item-level needs across systems.',
  },
  {
    amountUSD: 100,
    label: '$100',
    impactNote: 'Supports one full system block for a classroom.',
  },
  {
    amountUSD: 250,
    label: '$250',
    impactNote: 'Meaningful progress across all 5 systems.',
  },
];
