import type { Metadata } from 'next';
import { posts } from '@/.velite';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { PostCard } from '@/components/blog/PostCard';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Notes on the things I learn while shipping.',
};

export default function BlogPage() {
  const visible = posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <Section>
      <Eyebrow>Writing</Eyebrow>
      <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
        Notes on building things.
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">
        Short pieces on what I learn from shipping at work and on the side.
      </p>

      <div className="mt-12">
        {visible.length === 0 ? (
          <div className="rounded-md border border-border bg-surface/40 p-8 text-text-muted">
            <p>Writing soon. The first post will land here.</p>
          </div>
        ) : (
          <ul className="flex flex-col">
            {visible.map((post) => (
              <li key={post.slug}>
                <PostCard
                  post={{
                    url: post.url,
                    title: post.title,
                    summary: post.summary,
                    date: post.date,
                    readingTime: `${post.readingTime} min read`,
                  }}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  );
}
