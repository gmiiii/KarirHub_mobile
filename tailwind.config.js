// Token Material 3 (tokens.js), sinkron dengan repo KarirHub_web. Untuk RN: fontSize
// & radius didefinisikan dalam px (NativeWind), warna & spacing diimpor agar konsisten.
const tokens = require('./tokens.js');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  // 'class' mencegah error NativeWind web: "Cannot manually set color scheme,
  // as dark mode is type 'media'". App tidak memakai dark mode.
  darkMode: 'class',
  theme: {
    extend: {
      colors: tokens.colors,
      spacing: tokens.spacing,
      borderRadius: {
        sm: 4,
        DEFAULT: 8,
        md: 12,
        lg: 16,
        xl: 24,
        full: 9999,
      },
      fontSize: {
        // [fontSize, lineHeight] dalam px — weight diatur via class font-*
        'display-lg': ['40px', '44px'],
        'headline-lg': ['30px', '36px'],
        'headline-md': ['24px', '30px'],
        'title-lg': ['20px', '28px'],
        'body-lg': ['18px', '28px'],
        'body-md': ['16px', '24px'],
        'label-md': ['14px', '20px'],
        caption: ['12px', '16px'],
      },
    },
  },
  plugins: [],
};
