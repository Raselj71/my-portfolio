import { caseStudies } from '@/.velite';
import { Hero } from '@/components/hero/Hero';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { CaseStudyCard } from '@/components/case-study/CaseStudyCard';

export default function HomePage() {
  const featured = caseStudies
    .filter((c) => c.featured)
    .sort((a, b) => a.order - b.order)
    .slice(0, 3);

  return (
    <>
      <Hero />

      <Section>
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Recent case studies
            </h2>
          </div>
          <Link href="/work" className="hidden md:inline-flex">
            See all →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <CaseStudyCard key={item.slug} item={item} />
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/work">See all work →</Link>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Get in touch</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Have a role or project in mind?
        </h2>
        <p className="mt-4 max-w-prose text-text-muted">
          I&apos;m open to senior frontend, full-stack, and mobile roles.
        </p>
        <div className="mt-8">
          <Link href="/contact" variant="primary">
            Contact me →
          </Link>
        </div>
      </Section>
    </>
  );
}
