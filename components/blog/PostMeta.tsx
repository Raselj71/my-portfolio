export function PostMeta({
  date,
  readingTime,
}: {
  date: string;
  readingTime?: string;
}) {
  const formatted = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <div className="font-mono text-xs uppercase tracking-wider text-text-dim">
      <time dateTime={date}>{formatted}</time>
      {readingTime && <span className="ml-3">· {readingTime}</span>}
    </div>
  );
}
