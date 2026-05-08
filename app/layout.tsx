import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { fontSans, fontMono } from '@/lib/fonts';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
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
      className={`${fontSans.variable} ${fontMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg text-text antialiased">
        <Nav />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
