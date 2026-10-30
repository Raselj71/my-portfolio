import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { fontSans, fontDisplay } from '@/lib/fonts';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { ThemeScript } from '@/components/theme/ThemeScript';
import { defaultMetadata } from '@/lib/metadata';
import './globals.css';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen bg-bg font-sans text-text antialiased">
        <Nav />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
