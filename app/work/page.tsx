import type { Metadata } from 'next';
import { caseStudies } from '@/.velite';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Case studies for TaskATask, Sammanté, and Chain VPN.',
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
          Work
        </h1>
        <p className="mt-4 max-w-prose text-text-muted">
          Case studies for the products I've built.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sorted.map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>

    </>
  );
}
