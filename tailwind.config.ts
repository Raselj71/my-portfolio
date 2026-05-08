import type { Config } from 'tailwindcss';

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
        bg: '#0a0a0a',
        surface: '#0f0f12',
        'surface-hover': '#16161a',
        accent: '#38bdf8',
        'accent-soft': '#7dd3fc',
        text: {
          DEFAULT: '#fafafa',
          muted: '#a1a1aa',
          dim: '#71717a',
          faint: '#52525b',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          strong: 'rgba(255,255,255,0.12)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.025em',
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(60% 60% at 50% 0%, rgba(56,189,248,0.18) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
};

export default config;
