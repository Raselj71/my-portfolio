import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';

export default function HomePage() {
  return (
    <Section>
      <Eyebrow>Software Engineer</Eyebrow>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text md:text-6xl">
        Redesign in progress.
      </h1>
      <p className="mt-4 max-w-prose text-text-muted">
        Real homepage lands in Phase 3.
      </p>
    </Section>
  );
}
