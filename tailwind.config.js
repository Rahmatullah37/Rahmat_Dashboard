/** @type {import('tailwindcss').Config} */
// Every colour is a CSS variable so the whole dashboard can be re-themed live
// from the sidebar (see src/context/ThemeContext.tsx and src/styles/globals.css).
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['var(--font)'] },
      colors: {
        surface: v('surface'),
        card: v('card'),
        ink: v('ink'),
        muted: v('muted'),
        line: v('line'),
        chip: v('chip'),
        accent: v('accent-text'),
        brand: { DEFAULT: v('brand'), 2: v('brand-2'), soft: 'rgb(var(--brand) / 0.12)' },
      },
      borderRadius: { lg: 'calc(var(--r-md) - 4px)', xl: 'var(--r-md)', '2xl': 'var(--r-lg)' },
      boxShadow: { card: 'var(--shadow)' },
    },
  },
  plugins: [],
};
