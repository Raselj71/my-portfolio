import { Inter, Sora } from 'next/font/google';

export const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const fontDisplay = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sora',
  display: 'swap',
});
