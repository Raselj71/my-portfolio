import type { Metadata } from 'next';
import { caseStudies } from '@/.velite';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';
import { OtherWorkRow } from '@/components/case-study/OtherWorkRow';
import { otherWork } from '@/content/other-work';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected case studies and other shipped work — web, mobile, and backend.',
};

export default function WorkPage() {
  const sorted = [...caseStudies]
    .filter((c) => c.status !== 'archived')
    .sort((a, b) => a.order - b.order);

  return (
    <>
      <Section>
        <Eyebrow>Work</Eyebrow>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
          Things I&apos;ve shipped.
        </h1>
        <p className="mt-4 max-w-prose text-text-muted">
          Four projects with full case studies, plus a list of smaller work.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sorted.map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Other work</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Smaller projects
        </h2>
        <ul className="mt-8">
          {otherWork.map((item) => (
            <OtherWorkRow key={item.title} item={item} />
          ))}
        </ul>
      </Section>
    </>
  );
}
