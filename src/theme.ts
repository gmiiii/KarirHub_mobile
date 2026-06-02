// Warna token untuk dipakai di props JS (warna ikon, tab bar, status bar).
// Sumber sama dengan className: ../../shared/tokens.js
const tokens = require('../../shared/tokens.js');
import { Easing } from 'react-native-reanimated';

export const colors = tokens.colors as Record<string, string>;

export const C = {
  primary: colors.primary,
  primaryContainer: colors['primary-container'],
  onPrimary: colors['on-primary'],
  onPrimaryContainer: colors['on-primary-container'],
  primaryFixed: colors['primary-fixed'],
  onPrimaryFixedVariant: colors['on-primary-fixed-variant'],
  surface: colors.surface,
  surfaceLowest: colors['surface-container-lowest'],
  onSurface: colors['on-surface'],
  onSurfaceVariant: colors['on-surface-variant'],
  outline: colors.outline,
  outlineVariant: colors['outline-variant'],
  tertiary: colors.tertiary,
  error: colors.error,
  errorContainer: colors['error-container'],
  onErrorContainer: colors['on-error-container'],
  warning: colors.warning,
  secondary: colors.secondary,
};

/**
 * Spec motion bersama (selaras dengan web: 220ms gerak, 150ms press,
 * easing ease-out eksponensial = cubic-bezier(0.22,1,0.36,1)).
 * Reduced-motion ditangani per-komponen via useReducedMotion().
 */
export const MOTION = {
  duration: 220,
  press: 150,
  easing: Easing.out(Easing.exp),
  pressScale: 0.93,
};
