import { defineConfig, defineCollection, s } from 'velite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

const caseStudy = defineCollection({
  name: 'CaseStudy',
  pattern: 'work/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('work'),
      title: s.string().max(120),
      summary: s.string().max(280),
      role: s.string(),
      period: s.string(),
      stack: s.array(s.string()).min(1),
      cover: s.string().optional(),
      links: s
        .object({
          live: s.string().url().nullable().optional(),
          github: s.string().url().nullable().optional(),
        })
        .optional(),
      featured: s.boolean().default(false),
      order: s.number().default(0),
      status: s.enum(['shipped', 'in-progress', 'archived']).default('shipped'),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      url: `/work/${data.slug}`,
    })),
});

const post = defineCollection({
  name: 'Post',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      slug: s.slug('blog'),
      title: s.string().max(120),
      summary: s.string().max(280),
      date: s.isodate(),
      tags: s.array(s.string()).default([]),
      draft: s.boolean().default(false),
      body: s.mdx(),
      readingTime: s.metadata().transform((m) => m.readingTime),
    })
    .transform((data) => ({
      ...data,
      url: `/blog/${data.slug}`,
    })),
});

export default defineConfig({
  root: 'content',
  output: { data: '.velite', clean: true, assets: 'public/static', base: '/static/' },
  collections: { caseStudies: caseStudy, posts: post },
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
    ],
  },
});
