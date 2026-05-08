import type { MetadataRoute } from 'next';
import { caseStudies, posts } from '@/.velite';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/work`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = caseStudies
    .filter((c) => c.status !== 'archived')
    .map((c) => ({
      url: `${site.url}${c.url}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    }));

  const postRoutes: MetadataRoute.Sitemap = posts
    .filter((p) => !p.draft)
    .map((p) => ({
      url: `${site.url}${p.url}`,
      lastModified: new Date(p.date),
      changeFrequency: 'yearly',
      priority: 0.75,
    }));

  return [...staticRoutes, ...workRoutes, ...postRoutes];
}
