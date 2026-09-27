export type ThemeMode = 'blue' | 'pink' | 'red';

export interface ThemeColors {
  id: ThemeMode;
  name: string;
  badgeLabel: string;
  accentColor: string;
  primaryBg: string;
  cardBg: string;
  accentText: string;
  buttonClass: string;
  borderLight: string;
  heroGradient: string;
}

export const THEMES: Record<ThemeMode, ThemeColors> = {
  blue: {
    id: 'blue',
    name: 'Biru Karismatik',
    badgeLabel: 'Royal Blue',
    accentColor: '#2563EB',
    primaryBg: 'bg-slate-50',
    cardBg: 'bg-white',
    accentText: 'text-blue-600',
    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25',
    borderLight: 'border-blue-100',
    heroGradient: 'from-blue-900 via-indigo-950 to-slate-950',
  },
  pink: {
    id: 'pink',
    name: 'Pink Hangat',
    badgeLabel: 'Rose Petal',
    accentColor: '#E11D48',
    primaryBg: 'bg-rose-50/50',
    cardBg: 'bg-white',
    accentText: 'text-rose-600',
    buttonClass: 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-500/25',
    borderLight: 'border-rose-100',
    heroGradient: 'from-rose-950 via-slate-900 to-stone-950',
  },
  red: {
    id: 'red',
    name: 'Merah Berani',
    badgeLabel: 'Crimson Ruby',
    accentColor: '#DC2626',
    primaryBg: 'bg-red-50/40',
    cardBg: 'bg-white',
    accentText: 'text-red-600',
    buttonClass: 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/25',
    borderLight: 'border-red-100',
    heroGradient: 'from-red-950 via-neutral-900 to-stone-950',
  },
};
