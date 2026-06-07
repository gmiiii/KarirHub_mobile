/**
 * KarirHub design tokens - SATU sumber kebenaran untuk web (Tailwind) & mobile (NativeWind).
 * Sumber: stitch_karirhub_design_system/.../karirhub_ecosystem/DESIGN.md (Material 3).
 * Jangan duplikasi nilai di tempat lain; import file ini dari tailwind.config masing-masing app.
 */

const colors = {
  surface: '#f9f9ff',
  'surface-dim': '#d3daef',
  'surface-bright': '#f9f9ff',
  'surface-container-lowest': '#ffffff',
  'surface-container-low': '#f1f3ff',
  'surface-container': '#e9edff',
  'surface-container-high': '#e1e8fd',
  'surface-container-highest': '#dce2f7',
  'on-surface': '#141b2b',
  'on-surface-variant': '#434655',
  'inverse-surface': '#293040',
  'inverse-on-surface': '#edf0ff',
  outline: '#737686',
  'outline-variant': '#c3c6d7',
  'surface-tint': '#0053db',
  primary: '#004ac6',
  'on-primary': '#ffffff',
  'primary-container': '#2563eb',
  'on-primary-container': '#eeefff',
  'inverse-primary': '#b4c5ff',
  secondary: '#585f67',
  'on-secondary': '#ffffff',
  'secondary-container': '#dce3ec',
  'on-secondary-container': '#5e656d',
  tertiary: '#006329',
  'on-tertiary': '#ffffff',
  'tertiary-container': '#007f36',
  'on-tertiary-container': '#c7ffca',
  error: '#ba1a1a',
  'on-error': '#ffffff',
  'error-container': '#ffdad6',
  'on-error-container': '#93000a',
  'primary-fixed': '#dbe1ff',
  'primary-fixed-dim': '#b4c5ff',
  'on-primary-fixed': '#00174b',
  'on-primary-fixed-variant': '#003ea8',
  'secondary-fixed': '#dce3ec',
  'secondary-fixed-dim': '#c0c7d0',
  'on-secondary-fixed': '#151c23',
  'on-secondary-fixed-variant': '#40484f',
  'tertiary-fixed': '#7ffc97',
  'tertiary-fixed-dim': '#62df7d',
  'on-tertiary-fixed': '#002109',
  'on-tertiary-fixed-variant': '#005320',
  background: '#f9f9ff',
  'on-background': '#141b2b',
  'surface-variant': '#dce2f7',
  // Aksen semantik tambahan (dipakai marketplace)
  warning: '#f59e0b', // amber - rating bintang & status pending
  'on-warning': '#ffffff',
};

// Skala spacing 4/8 - dipakai sebagai key bernama (p-lg, gap-xl, dst).
const spacing = {
  base: '4px',
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
};

const borderRadius = {
  sm: '0.25rem',
  DEFAULT: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  full: '9999px',
};

// fontSize: [size, { lineHeight, letterSpacing, fontWeight }]
const fontSize = {
  'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
  'headline-lg': ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
  'headline-lg-mobile': ['24px', { lineHeight: '32px', fontWeight: '700' }],
  'headline-md': ['24px', { lineHeight: '32px', fontWeight: '600' }],
  'title-lg': ['20px', { lineHeight: '28px', fontWeight: '600' }],
  'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
  'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
  'label-md': ['14px', { lineHeight: '20px', fontWeight: '500' }],
  caption: ['12px', { lineHeight: '16px', fontWeight: '400' }],
};

const boxShadow = {
  // Elevation tonal (lihat DESIGN.md)
  'level-1': '0px 1px 3px rgba(0,0,0,0.05)',
  'level-2': '0px 4px 12px rgba(0,0,0,0.08)',
  'level-3': '0px 20px 25px rgba(0,0,0,0.1)',
};

const fontFamily = {
  sans: ['Inter', 'system-ui', 'sans-serif'],
};

const containers = { 'app-max': '1280px' };

module.exports = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  boxShadow,
  fontFamily,
  containers,
};
