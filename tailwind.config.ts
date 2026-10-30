import type { Config } from 'tailwindcss';

const token = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', md: '2rem' },
      screens: { '2xl': '1200px' },
    },
    extend: {
      colors: {
        bg: token('bg'),
        surface: token('surface'),
        surface2: token('surface2'),
        text: token('text'),
        muted: token('muted'),
        dim: token('dim'),
        line: token('line'),
        accent: token('accent'),
        'accent-ink': token('accent-ink'),
        chip: token('chip'),
        'chip-fg': token('chip-fg'),
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-inter)', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.035em',
        tight: '-0.02em',
      },
      borderRadius: {
        card: '16px',
        btn: '10px',
      },
    },
  },
  plugins: [],
};

export default config;
