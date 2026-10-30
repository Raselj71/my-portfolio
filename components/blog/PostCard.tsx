import NextLink from 'next/link';
import { PostMeta } from './PostMeta';

export type PostSummary = {
  url: string;
  title: string;
  summary: string;
  date: string;
  readingTime?: number;
};

export function PostCard({ post }: { post: PostSummary }) {
  return (
    <NextLink
      href={post.url}
      className="group block border-b border-line py-8 transition-colors first:border-t hover:bg-surface2"
    >
      <PostMeta date={post.date} readingTime={post.readingTime} />
      <h3 className="mt-2 font-display font-display text-2xl font-semibold tracking-tight text-text group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 max-w-prose text-muted">{post.summary}</p>
    </NextLink>
  );
}
