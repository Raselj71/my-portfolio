import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://codewithrasel.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://codewithrasel.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://codewithrasel.com/contact',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.7,
    },
    {
        url: 'https://codewithrasel.com/services',
        lastModified: new Date(),
        changeFrequency: 'never',
        priority: 0.5,
      },

      {
        url: 'https://codewithrasel.com/work',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
  ]
}