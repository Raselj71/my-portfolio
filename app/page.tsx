import { Hero } from '@/components/hero/Hero';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';

export default function HomePage() {
  return (
    <>
      <Hero />

      <Section>
        <Eyebrow>Selected work</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
          Recent case studies
        </h2>
        <p className="mt-4 max-w-prose text-text-muted">
          Three projects with depth. Full list at{' '}
          <Link href="/work">/work</Link>.
        </p>
        <p className="mt-8 text-sm text-text-dim">
          Featured cards land in Phase 4.
        </p>
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
