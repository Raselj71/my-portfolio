import Image from 'next/image';
import NextLink from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { StackPill } from './StackPill';

export type CaseStudySummary = {
  url: string;
  title: string;
  summary: string;
  role: string;
  period: string;
  stack: string[];
  cover?: string;
};

export function CaseStudyCard({ item }: { item: CaseStudySummary }) {
  return (
    <Reveal>
      <NextLink
        href={item.url}
        className="group flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-border-strong"
      >
        {item.cover && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-hover">
            <Image
              src={item.cover}
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <div className="flex flex-col gap-3 p-6">
          <div className="font-mono text-xs uppercase tracking-wider text-text-dim">
            {item.period}
          </div>
          <h3 className="text-xl font-semibold tracking-tight text-text group-hover:text-accent">
            {item.title}
          </h3>
          <p className="text-text-muted">{item.summary}</p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {item.stack.slice(0, 6).map((s) => (
              <li key={s}>
                <StackPill>{s}</StackPill>
              </li>
            ))}
          </ul>
        </div>
      </NextLink>
    </Reveal>
  );
}
