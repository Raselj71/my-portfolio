import { posts } from '@/.velite';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const visible = posts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const items = visible
    .map((post) => {
      const url = `${site.url}${post.url}`;
      const pubDate = new Date(post.date).toUTCString();
      return [
        '    <item>',
        `      <title><![CDATA[${post.title}]]></title>`,
        `      <link>${url}</link>`,
        `      <guid>${url}</guid>`,
        `      <pubDate>${pubDate}</pubDate>`,
        `      <description><![CDATA[${post.summary}]]></description>`,
        '    </item>',
      ].join('\n');
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>${site.name}</title>
    <link>${site.url}</link>
    <description>${site.description}</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
