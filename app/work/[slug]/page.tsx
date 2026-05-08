import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/.velite';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { StackPill } from '@/components/case-study/StackPill';
import { MDX } from '@/lib/mdx-components';

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Params;
}): Metadata {
  const item = caseStudies.find((c) => c.slug === params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.summary,
    openGraph: {
      title: item.title,
      description: item.summary,
      images: item.cover ? [{ url: item.cover }] : undefined,
    },
  };
}

export default function CaseStudyPage({ params }: { params: Params }) {
  const item = caseStudies.find((c) => c.slug === params.slug);
  if (!item) notFound();

  return (
    <Section>
      <Eyebrow>{item.period}</Eyebrow>
      <h1 className="mt-4 max-w-3xl text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
        {item.title}
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">{item.summary}</p>

      <div className="mt-6 flex flex-col gap-3 border-y border-border py-6 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-text-muted">
          <span className="font-mono uppercase tracking-wider text-text-dim">
            Role
          </span>
          <span className="ml-3">{item.role}</span>
        </div>
        <div className="flex gap-3 text-sm">
          {item.links?.live && (
            <Link href={item.links.live} target="_blank" variant="ghost">
              Live ↗
            </Link>
          )}
          {item.links?.github && (
            <Link href={item.links.github} target="_blank" variant="ghost">
              GitHub ↗
            </Link>
          )}
        </div>
      </div>

      <ul className="mt-6 flex flex-wrap gap-2">
        {item.stack.map((s) => (
          <li key={s}>
            <StackPill>{s}</StackPill>
          </li>
        ))}
      </ul>

      <article className="prose-portfolio mt-12 max-w-3xl">
        <MDX code={item.body} />
      </article>

      <div className="mt-16 border-t border-border pt-8">
        <Link href="/work">← All work</Link>
      </div>
    </Section>
  );
}
