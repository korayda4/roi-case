export const COLORS = {
  white: '#ffffff',
  slate950: '#0f172a',
  blue800: '#1e3a8a',
  violet950: '#1e0a3c',
  violet600: '#7c3aed',
  rose950: '#2a0a1a',
  rose600: '#db2777',
  emerald950: '#052010',
  emerald600: '#16a34a',
} as const;

export const HERO_CATEGORY_GRADIENTS = {
  arcade: `linear-gradient(135deg, ${COLORS.slate950} 0%, ${COLORS.blue800} 100%)`,
  puzzle: `linear-gradient(135deg, ${COLORS.violet950} 0%, ${COLORS.violet600} 100%)`,
  card: `linear-gradient(135deg, ${COLORS.rose950} 0%, ${COLORS.rose600} 100%)`,
  strategy: `linear-gradient(135deg, ${COLORS.emerald950} 0%, ${COLORS.emerald600} 100%)`,
} as const;
