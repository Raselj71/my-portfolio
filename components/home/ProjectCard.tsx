import Image from 'next/image';
import NextLink from 'next/link';
import type { Project } from '@/lib/projects';
import { cn } from '@/lib/cn';
import { BrowserFrame } from './BrowserFrame';

const media: Record<Project['slug'], { src: string; alt: string }> = {
  'task-a-task': { src: '/screens/tat-screen.png', alt: 'TaskATask dashboard' },
  sammante: { src: '/work/sammante/cover.png', alt: 'Sammanté admin: roles and privileges' },
  'chain-vpn': { src: '/work/chain-vpn/admin.png', alt: 'Chain VPN admin console dashboard' },
};

export function ProjectCard({ project }: { project: Project }) {
  const wide = project.media === 'phone';
  const shot = media[project.slug];

  return (
    <article
      className={cn(
        'reveal flex flex-col overflow-hidden rounded-card border border-line bg-surface transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent',
        wide && 'md:col-span-2 md:flex-row',
      )}
    >
      {project.media === 'phone' ? (
        <div className="flex min-h-[220px] items-end justify-center overflow-hidden bg-surface2 md:min-h-[300px] md:w-[44%]">
          <Image
            src={shot.src}
            alt={shot.alt}
            width={1080}
            height={1920}
            sizes="190px"
            className="relative block w-[150px] rounded-t-[20px] shadow-[0_-10px_40px_rgba(0,0,0,.18)] md:left-[12%] md:w-[190px]"
          />
        </div>
      ) : (
        <BrowserFrame
          src={shot.src}
          alt={shot.alt}
          overlay={
            project.media === 'browser-phone'
              ? { src: '/work/chain-vpn/app.png', alt: 'Chain VPN app, connected' }
              : undefined
          }
        />
      )}

      <div className="flex-1 p-6">
        <div className="flex flex-col gap-0.5 text-xs text-dim sm:flex-row sm:justify-between">
          <span>{project.kind}</span>
          <span>{project.period}</span>
        </div>
        <h3 className="mt-2 font-display text-[19px] font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 max-w-[56ch] text-[15px] leading-[1.55] text-muted">
          {project.description}
        </p>
        <ul className="mt-3.5 flex flex-wrap gap-1.5">
          {project.tags.map((t) => (
            <li
              key={t}
              className="rounded-full bg-chip px-2.5 py-1 text-xs text-chip-fg"
            >
              {t}
            </li>
          ))}
        </ul>
        <ul className="mt-4 flex flex-wrap gap-4 text-[13px] font-semibold text-accent">
          {project.links.map((l) =>
            l.external ? (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noreferrer" className="hover:underline">
                  {l.label} ↗
                </a>
              </li>
            ) : (
              <li key={l.label}>
                <NextLink href={l.href} className="hover:underline">
                  {l.label}
                </NextLink>
              </li>
            ),
          )}
        </ul>
      </div>
    </article>
  );
}
