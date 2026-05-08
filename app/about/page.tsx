import type { Metadata } from 'next';
import { Section } from '@/components/ui/Section';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Link } from '@/components/ui/Link';
import { skillGroups } from '@/lib/skills';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Software engineer at Dhrubok Infotech Services. Backgrounds in Node.js, Next.js, React Native, and Android.',
};

export default function AboutPage() {
  return (
    <>
      <Section>
        <Eyebrow>About</Eyebrow>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tighter md:text-5xl">
          Software engineer building things that ship.
        </h1>
        <div className="mt-8 max-w-prose space-y-4 text-text-muted">
          <p>
            I&apos;m Rasel — a software engineer based in Dhaka, Bangladesh.
            I currently work at Dhrubok Infotech Services, where I shipped{' '}
            <Link href="/work/sammante">Sammanté</Link>, a multi-tenant SaaS
            for health-insurance providers, between April and July 2025.
          </p>
          <p>
            My day-to-day is mostly Next.js, React, and TypeScript on the web,
            React Native on mobile, and Node on the backend. I also write
            Android apps in Java when the project calls for it.
          </p>
          <p>
            Outside paid work I run a YouTube channel teaching practical
            programming, and I publish notes on this site about things I
            learn while shipping.
          </p>
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Skills</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Tools I work with
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label}>
              <div className="font-mono text-sm uppercase tracking-wider text-text-dim">
                {group.label}
              </div>
              <ul className="mt-2 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-border bg-surface/40 px-3 py-1 text-sm text-text"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>Education</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Bachelor of Computer Science and Engineering
        </h2>
        <p className="mt-4 max-w-prose text-text-muted">
          Green University of Bangladesh. Expected graduation 2026.
        </p>
      </Section>

      <Section className="border-t border-border">
        <Eyebrow>GitHub</Eyebrow>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight">
          Recent activity
        </h2>
        <p className="mt-4 text-sm text-text-dim">
          Live GitHub activity strip lands in Phase 6.
        </p>
      </Section>
    </>
  );
}
