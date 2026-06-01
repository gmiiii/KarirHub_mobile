// Warna token untuk dipakai di props JS (warna ikon, tab bar, status bar).
// Sumber sama dengan className: ../../shared/tokens.js
const tokens = require('../../shared/tokens.js');

export const colors = tokens.colors as Record<string, string>;

export const C = {
  primary: colors.primary,
  primaryContainer: colors['primary-container'],
  onPrimary: colors['on-primary'],
  onPrimaryContainer: colors['on-primary-container'],
  surface: colors.surface,
  surfaceLowest: colors['surface-container-lowest'],
  onSurface: colors['on-surface'],
  onSurfaceVariant: colors['on-surface-variant'],
  outline: colors.outline,
  outlineVariant: colors['outline-variant'],
  tertiary: colors.tertiary,
  error: colors.error,
  warning: colors.warning,
  secondary: colors.secondary,
};
