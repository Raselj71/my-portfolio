import type { Metadata } from 'next';
import { site } from './site';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.author, url: site.links.linkedin }],
  openGraph: {
    type: 'website',
    siteName: site.name,
    url: site.url,
    title: site.title,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};
