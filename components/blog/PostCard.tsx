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
      className="group block border-b border-border py-8 transition-colors first:border-t hover:bg-surface/30"
    >
      <PostMeta date={post.date} readingTime={post.readingTime} />
      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text group-hover:text-accent">
        {post.title}
      </h3>
      <p className="mt-2 max-w-prose text-text-muted">{post.summary}</p>
    </NextLink>
  );
}
