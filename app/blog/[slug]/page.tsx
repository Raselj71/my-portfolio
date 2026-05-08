import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { posts } from '@/.velite';
import { Section } from '@/components/ui/Section';
import { Link } from '@/components/ui/Link';
import { PostMeta } from '@/components/blog/PostMeta';
import { MDX } from '@/lib/mdx-components';

type Params = { slug: string };

export function generateStaticParams() {
  return posts.filter((p) => !p.draft).map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post || post.draft) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function PostPage({ params }: { params: Params }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post || post.draft) notFound();

  return (
    <Section>
      <PostMeta date={post.date} readingTime={post.readingTime} />
      <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
        {post.title}
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">{post.summary}</p>

      <article className="mt-12 max-w-3xl">
        <MDX code={post.body} />
      </article>

      <div className="mt-16 border-t border-border pt-8">
        <Link href="/blog">← All posts</Link>
      </div>
    </Section>
  );
}
